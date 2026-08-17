import { useEffect, useRef } from "react";
import { getInterpolatedCorners } from "@/lib/trackingData";
import { getHomographyMatrix } from "@/lib/homography";
import { TriaCanvasEngine } from "@/lib/tria-os/TriaCanvasEngine";


export type HeroStage = "boot" | "lock" | "portfolio";

export interface ChromaHomographyRendererProps {
  videoSrc: string;
  videoSrcLoop?: string;
  videoFrontLoopSrc?: string;
  videoReverseSrc?: string;
  stage: HeroStage;
  rotationProgress: number; // 0.0 (3/4 angle) to 1.0 (front-facing)
  currentTextureSrc: string;
  nextTextureSrc?: string;
  textureBlend?: number; // 0.0 to 1.0
  onVideoLoaded?: () => void;
  preloadTextures?: string[];
}

export default function ChromaHomographyRenderer({
  videoSrc,
  videoSrcLoop,
  videoFrontLoopSrc = "/videos/front-loop.mp4",
  videoReverseSrc = "/videos/hero-reverse.mp4",
  stage,
  rotationProgress,
  currentTextureSrc,
  nextTextureSrc = "",
  textureBlend = 0,
  onVideoLoaded,
  preloadTextures = [],
}: ChromaHomographyRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoLoopRef = useRef<HTMLVideoElement>(null);
  const videoFrontLoopRef = useRef<HTMLVideoElement>(null);
  const videoReverseRef = useRef<HTMLVideoElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);

  // TRIA OS Offscreen Engine State
  const triaCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const triaEngineRef = useRef<TriaCanvasEngine | null>(null);
  const triaTexRef = useRef<WebGLTexture | null>(null);

  // Shader state
  const bgProgramRef = useRef<WebGLProgram | null>(null);
  const fgProgramRef = useRef<WebGLProgram | null>(null);

  // Video Texture State (Units 0 & 1)
  const videoTexRef = useRef<WebGLTexture | null>(null);
  const videoPrevTexRef = useRef<WebGLTexture | null>(null);

  // Texture Cache Map for all project slides (Units 2 & 3)
  const textureCacheRef = useRef<Map<string, WebGLTexture>>(new Map());
  const gifElementsRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const fallbackTexRef = useRef<WebGLTexture | null>(null);

  const requestRef = useRef<number>(0);

  // Sync latest props into refs for the continuous WebGL loop
  const stageRef = useRef(stage);
  const prevStageRef = useRef(stage);
  const rotationProgressRef = useRef(rotationProgress);
  const currentTextureSrcRef = useRef(currentTextureSrc);
  const nextTextureSrcRef = useRef(nextTextureSrc);
  const textureBlendRef = useRef(textureBlend);

  useEffect(() => {
    prevStageRef.current = stageRef.current;
    stageRef.current = stage;
    rotationProgressRef.current = rotationProgress;
    currentTextureSrcRef.current = currentTextureSrc;
    nextTextureSrcRef.current = nextTextureSrc;
    textureBlendRef.current = textureBlend;
  }, [stage, rotationProgress, currentTextureSrc, nextTextureSrc, textureBlend]);

  // Stage Trigger for TRIA OS
  useEffect(() => {
    if (stage === "lock" || stage === "portfolio") {
      triaEngineRef.current?.jumpToLock();
    }
  }, [stage]);

  // Helper to safely play a video element without unhandled promise rejections
  const playSafe = (vid: HTMLVideoElement | null) => {
    if (!vid) return;
    if (vid.paused) {
      const p = vid.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {});
      }
    }
  };

  // Initialize WebGL, Shaders, Texture Cache, and TRIA OS Engine
  useEffect(() => {
    // Create TRIA Canvas Engine
    if (!triaCanvasRef.current) {
      const offscreen = document.createElement("canvas");
      offscreen.width = 1920;
      offscreen.height = 1080;
      triaCanvasRef.current = offscreen;
      triaEngineRef.current = new TriaCanvasEngine(offscreen, {
        speed: 1.35,
        initialStage: "kernel",
        autoLock: false,
      });
      // Paint a valid first frame immediately so the hero never begins as an empty canvas.
      triaEngineRef.current.updateAndRender(performance.now());
    }
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: false, premultipliedAlpha: false });
    if (!gl) return;
    glRef.current = gl;

    // --- Background Quad Shader (Perspective Homography + Project Crossfade) ---
    const bgVs = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      uniform mat3 u_homography;
      uniform vec2 u_resolution;

      void main() {
        v_uv = a_position;
        vec3 warped = u_homography * vec3(a_position, 1.0);
        vec2 clipSpace = (warped.xy / u_resolution) * 2.0 - vec2(warped.z);
        clipSpace.y = -clipSpace.y;
        gl_Position = vec4(clipSpace, 0.0, warped.z);
      }
    `;
    const bgFs = `
      precision mediump float;
      varying vec2 v_uv;
      uniform sampler2D u_tex1;
      uniform sampler2D u_tex2;
      uniform float u_blend;

      void main() {
        vec4 c1 = texture2D(u_tex1, v_uv);
        vec4 c2 = texture2D(u_tex2, v_uv);
        gl_FragColor = mix(c1, c2, u_blend);
      }
    `;

    // --- Foreground Quad Shader (Dual-Texture Crossfade + Green Screen Key) ---
    const fgVs = `
      attribute vec2 a_position;
      varying vec2 v_uv;

      void main() {
        v_uv = a_position;
        vec2 clipPos = a_position * 2.0 - 1.0;
        gl_Position = vec4(clipPos.x, -clipPos.y, 0.0, 1.0);
      }
    `;
    const fgFs = `
      precision mediump float;
      varying vec2 v_uv;
      uniform sampler2D u_video;
      uniform sampler2D u_video_prev;
      uniform float u_video_crossfade;

      void main() {
        vec4 cur = texture2D(u_video, v_uv);
        vec4 prev = texture2D(u_video_prev, v_uv);
        vec4 fg = mix(prev, cur, u_video_crossfade);

        // Professional Broadcast despill & chroma key
        float greenness = fg.g - max(fg.r, fg.b);
        float mask = smoothstep(0.04, 0.22, greenness);

        if (greenness > 0.0) {
          fg.g = max(fg.r, fg.b) * 0.85;
        }

        gl_FragColor = vec4(fg.rgb, 1.0 - mask);
      }
    `;

    const compileShader = (src: string, type: number) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
      }
      return s;
    };

    const createProgram = (vs: string, fs: string) => {
      const p = gl.createProgram()!;
      gl.attachShader(p, compileShader(vs, gl.VERTEX_SHADER));
      gl.attachShader(p, compileShader(fs, gl.FRAGMENT_SHADER));
      gl.linkProgram(p);
      return p;
    };

    bgProgramRef.current = createProgram(bgVs, bgFs);
    fgProgramRef.current = createProgram(fgVs, fgFs);

    // Setup Geometry Buffer (0-1 quad)
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1]),
      gl.STATIC_DRAW
    );

    // Helper to create linear textures
    const createLinearTexture = (color = [20, 20, 20, 255]) => {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        1,
        1,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        new Uint8Array(color)
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      return tex;
    };

    videoTexRef.current = createLinearTexture([0, 0, 0, 255]);
    videoPrevTexRef.current = createLinearTexture([0, 0, 0, 255]);
    triaTexRef.current = createLinearTexture([5, 30, 25, 255]);
    fallbackTexRef.current = createLinearTexture([18, 18, 18, 255]);

    // Synchronously create a crisp 1920x1080 canvas texture for the Portfolio Overview Intro
    const introCanvas = document.createElement("canvas");
    introCanvas.width = 1920;
    introCanvas.height = 1080;
    const ctx = introCanvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#F7F5F2";
      ctx.fillRect(0, 0, 1920, 1080);

      // Browser Header Bar
      ctx.fillStyle = "#EAE7E1";
      ctx.fillRect(0, 0, 1920, 64);
      ctx.strokeStyle = "rgba(22, 22, 22, 0.12)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 64);
      ctx.lineTo(1920, 64);
      ctx.stroke();

      // Traffic light buttons
      ctx.fillStyle = "#FF5F56";
      ctx.beginPath(); ctx.arc(48, 32, 7, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#FFBD2E";
      ctx.beginPath(); ctx.arc(72, 32, 7, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#27C93F";
      ctx.beginPath(); ctx.arc(96, 32, 7, 0, Math.PI * 2); ctx.fill();

      // URL bar
      ctx.fillStyle = "#F7F5F2";
      ctx.fillRect(560, 16, 800, 32);
      ctx.strokeRect(560, 16, 800, 32);
      ctx.fillStyle = "#666666";
      ctx.font = "500 13px monospace";
      ctx.textAlign = "center";
      ctx.fillText("https://triadesign.studio/selected-works", 960, 37);

      ctx.fillStyle = "#888888";
      ctx.font = "500 12px monospace";
      ctx.textAlign = "right";
      ctx.fillText("ARCHIVE // 2024—2026", 1840, 37);

      // Main Section Header
      ctx.textAlign = "left";
      ctx.fillStyle = "#B89B73";
      ctx.font = "600 14px monospace";
      ctx.fillText("PORTFOLIO // SELECTED COMMERCIAL WORKS", 140, 130);

      ctx.fillStyle = "#161616";
      ctx.font = "400 52px serif";
      ctx.fillText("Websites Engineered for Category Leaders.", 140, 188);

      ctx.fillStyle = "#666666";
      ctx.font = "400 20px sans-serif";
      ctx.fillText("Below are some of the bespoke websites, platforms, and digital systems we build.", 140, 230);

      ctx.strokeStyle = "rgba(22, 22, 22, 0.12)";
      ctx.beginPath();
      ctx.moveTo(140, 260);
      ctx.lineTo(1780, 260);
      ctx.stroke();

      // 6 Case Studies Grid
      const cases = [
        { num: "01 // SCIENCE PUBLICATION", title: "Biologue", desc: "Decoding the biology of everyday life through an immersive digital publication.", col: 0, row: 0 },
        { num: "02 // SPECIALTY COFFEE & E-COMMERCE", title: "Bean Broze", desc: "A sensory digital storefront capturing the golden hour of specialty coffee in Abu Dhabi.", col: 1, row: 0 },
        { num: "03 // MEDICAL & AESTHETIC PRACTICE", title: "Dr. Najib Atallah", desc: "Precision medical portfolio with interactive before/after anatomical case studies.", col: 0, row: 1 },
        { num: "04 // LEGAL ADVOCACY & ARBITRATION", title: "Ayman Rikan Ghanem", desc: "Authoritative digital presence for high-stakes corporate litigation across the UAE.", col: 1, row: 1 },
        { num: "05 // COMMUNITY & CULTURE", title: "Sila — Al Qou' Majlis", desc: "Civic digital portal uniting heritage, community programs, and local initiatives.", col: 0, row: 2 },
        { num: "06 // AI APPLICATION & SAAS", title: "Job Marksman", desc: "Tactical AI career acceleration suite delivering precise ATS alignment & analytics.", col: 1, row: 2 }
      ];

      cases.forEach(c => {
        const x = 140 + c.col * 850;
        const y = 300 + c.row * 180;
        const w = 790;
        const h = 150;

        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(x, y, w, h);
        ctx.strokeStyle = "rgba(22, 22, 22, 0.1)";
        ctx.strokeRect(x, y, w, h);

        ctx.fillStyle = "#B89B73";
        ctx.fillRect(x, y, 6, h);

        ctx.fillStyle = "#B89B73";
        ctx.font = "600 12px monospace";
        ctx.fillText(c.num, x + 32, y + 40);

        ctx.fillStyle = "#161616";
        ctx.font = "400 28px serif";
        ctx.fillText(c.title, x + 32, y + 78);

        ctx.fillStyle = "#666666";
        ctx.font = "400 14px sans-serif";
        ctx.fillText(c.desc, x + 32, y + 112);

        ctx.fillStyle = "#B89B73";
        ctx.font = "400 22px serif";
        ctx.textAlign = "right";
        ctx.fillText("→", x + w - 32, y + 78);
        ctx.textAlign = "left";
      });

      // Bottom Scroll Cue Banner
      ctx.fillStyle = "#161616";
      ctx.fillRect(140, 970, 1640, 60);
      ctx.fillStyle = "#F7F5F2";
      ctx.font = "500 14px monospace";
      ctx.textAlign = "center";
      ctx.fillText("↓ SCROLL DOWN TO VIEW CASE PROJECTS ↓", 960, 1006);

      const introTex = gl.createTexture();
      if (introTex) {
        gl.bindTexture(gl.TEXTURE_2D, introTex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, introCanvas);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        textureCacheRef.current.set("/images/projects/portfolio-intro-screen.svg", introTex);
      }
    }

    // Preload provided textures into WebGL
    const allImagesToPreload = preloadTextures;

    allImagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.crossOrigin = "anonymous";
      if (src.endsWith(".gif")) {
        gifElementsRef.current.set(src, img);
      }
      img.onload = () => {
        const tex = gl.createTexture();
        if (!tex) return;
        gl.bindTexture(gl.TEXTURE_2D, tex);

        if (!src.endsWith(".gif") && !src.endsWith(".svg")) {
          // Force 16:9 aspect ratio (object-fit: cover) to prevent stretching on the laptop screen
          const offscreen = document.createElement("canvas");
          offscreen.width = 1920;
          offscreen.height = 1080;
          const ctx = offscreen.getContext("2d");
          if (ctx) {
            const imgRatio = img.width / img.height;
            const canvasRatio = 1920 / 1080;
            let drawWidth = 1920;
            let drawHeight = 1080;
            let offsetX = 0;
            let offsetY = 0;
            
            if (imgRatio > canvasRatio) { 
              drawWidth = 1080 * imgRatio;
              offsetX = (1920 - drawWidth) / 2;
            } else { 
              drawHeight = 1920 / imgRatio;
              offsetY = (1080 - drawHeight) / 2;
            }
            
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, offscreen);
          } else {
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
          }
        } else {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        }

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        textureCacheRef.current.set(src, tex);
      };
    });

    // Setup Blend State
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    return () => {
      // gl.getExtension("WEBGL_lose_context")?.loseContext(); // Removed for StrictMode
    };
  }, []);

  // Continuous High-Performance WebGL Render & Bidirectional Playback Loop
  useEffect(() => {
    const gl = glRef.current;
    const video = videoRef.current;
    const videoLoop = videoLoopRef.current;
    const videoFrontLoop = videoFrontLoopRef.current;
    const videoReverse = videoReverseRef.current;
    const bgProg = bgProgramRef.current;
    const fgProg = fgProgramRef.current;

    if (!gl || !video || !bgProg || !fgProg) return;

    let isRunning = true;
    let rotationFinished = false;
    let isReversing = false;

    // Zero-lag Hardware Frame Presentation Tracker
    let videoPresentedTime = -1;
    let videoRevPresentedTime = -1;

    const setupRVFC = (vid: HTMLVideoElement, isRev: boolean) => {
      if (!("requestVideoFrameCallback" in vid)) return;
      const callback = (_now: DOMHighResTimeStamp, metadata: any) => {
        if (isRev) {
          videoRevPresentedTime = metadata.mediaTime;
        } else {
          videoPresentedTime = metadata.mediaTime;
        }
        if (isRunning) {
          vid.requestVideoFrameCallback(callback);
        }
      };
      vid.requestVideoFrameCallback(callback);
    };

    setupRVFC(video, false);
    if (videoReverse) setupRVFC(videoReverse, true);

    // Crossfade State Manager for Video-to-Video Transitions
    let crossfadeStartTime = -1;
    const crossfadeDuration = 380; // ms
    let crossfadeFromVideo: HTMLVideoElement | null = null;
    let lastRenderedStage: HeroStage | null = null;

    const startVideoCrossfade = (fromVid: HTMLVideoElement | null) => {
      crossfadeFromVideo = fromVid;
      crossfadeStartTime = performance.now();
    };

    if (videoLoop) playSafe(videoLoop);

    const render = () => {
      if (!isRunning) return;
      const now = performance.now();

      const currentStage = stageRef.current;
      const blend = textureBlendRef.current;
      const curTexSrc = currentTextureSrcRef.current;
      const nextTexSrc = nextTextureSrcRef.current;

      const is3DLock = currentStage === "boot" || currentStage === "lock";
      const isPortfolio = currentStage === "portfolio";

      // Detect stage changes to trigger video transitions and crossfades
      if (lastRenderedStage !== currentStage) {
        if (lastRenderedStage && is3DLock && lastRenderedStage === "portfolio") {
          // Reversing portfolio -> lock
          isReversing = true;
          rotationFinished = false;
          videoRevPresentedTime = -1;
          if (videoReverse) {
            videoReverse.currentTime = 0.01;
            videoReverse.playbackRate = 4.2;
            playSafe(videoReverse);
          }
          if (videoFrontLoop && !videoFrontLoop.paused) videoFrontLoop.pause();
          if (!video.paused) video.pause();
          startVideoCrossfade(videoFrontLoop || video);
        } else if (
          lastRenderedStage &&
          isPortfolio &&
          (lastRenderedStage === "lock" || lastRenderedStage === "boot")
        ) {
          // Entering portfolio rotation from lock
          isReversing = false;
          rotationFinished = false;
          videoPresentedTime = -1;
          video.currentTime = 0.001;
          video.playbackRate = 4.2;
          playSafe(video);
          startVideoCrossfade(videoLoop);
        }
        lastRenderedStage = currentStage;
      }

      // 1. Playback Management
      let activeFrame = 1;
      let activeVideo: HTMLVideoElement | null = video;

      if (isReversing && videoReverse) {
        const curRevTime =
          videoRevPresentedTime >= 0
            ? videoRevPresentedTime
            : videoReverse.currentTime;
        const REVERSE_END_TIME = 248 / 30; // ~8.266s

        if (curRevTime < REVERSE_END_TIME - 0.08) {
          activeFrame = Math.max(1, Math.min(248, 248 - curRevTime * 30));
          activeVideo = videoReverse;
        } else {
          // Finished reverse rotation back to 3/4 lock screen
          isReversing = false;
          videoReverse.pause();
          videoReverse.currentTime = 0;
          videoRevPresentedTime = -1;
          activeFrame = 1;
          if (videoLoop) {
            videoLoop.currentTime = 0;
            playSafe(videoLoop);
            startVideoCrossfade(videoReverse);
            activeVideo = videoLoop;
          }
        }
      } else if (is3DLock) {
        rotationFinished = false;
        videoPresentedTime = -1;
        if (!video.paused) video.pause();
        if (videoFrontLoop && !videoFrontLoop.paused) videoFrontLoop.pause();

        playSafe(videoLoop);
        activeVideo = videoLoop;
        activeFrame = 1;
      } else if (isPortfolio) {
        isReversing = false;
        if (videoReverse && !videoReverse.paused) videoReverse.pause();

        const curTime =
          videoPresentedTime >= 0 ? videoPresentedTime : video.currentTime;
        const ROTATION_END_TIME = 248 / 30; // ~8.266s

        if (!rotationFinished && curTime < ROTATION_END_TIME - 0.08) {
          playSafe(video);
          if (video.playbackRate !== 4.2) video.playbackRate = 4.2;
          activeFrame = Math.max(1, Math.min(248, curTime * 30));
          activeVideo = video;
        } else {
          if (!rotationFinished) {
            // Rotation just reached front view: trigger smooth crossfade into front-loop video
            rotationFinished = true;
            if (!video.paused) video.pause();
            if (videoFrontLoop) {
              videoFrontLoop.currentTime = 0.001;
              playSafe(videoFrontLoop);
              startVideoCrossfade(video);
            }
          }
          activeFrame = 248;
          if (videoLoop && !videoLoop.paused) videoLoop.pause();

          if (videoFrontLoop) {
            playSafe(videoFrontLoop);
            activeVideo = videoFrontLoop;
          } else {
            activeVideo = video;
          }
        }
      }

      // 2. Compute Video Crossfade Factor & Upload Video Textures (Units 0 & 1)
      let videoCrossfadeFactor = 1.0;
      if (crossfadeStartTime > 0) {
        const elapsed = now - crossfadeStartTime;
        const t = Math.min(1.0, elapsed / crossfadeDuration);
        videoCrossfadeFactor =
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        if (
          crossfadeFromVideo &&
          crossfadeFromVideo.readyState >= 2 &&
          videoPrevTexRef.current
        ) {
          gl.activeTexture(gl.TEXTURE1);
          gl.bindTexture(gl.TEXTURE_2D, videoPrevTexRef.current);
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            crossfadeFromVideo
          );
        }

        if (t >= 1.0) {
          crossfadeStartTime = -1;
          crossfadeFromVideo = null;
          videoCrossfadeFactor = 1.0;
        }
      }

      if (activeVideo && activeVideo.readyState >= 2 && videoTexRef.current) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, videoTexRef.current);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          activeVideo
        );
      }

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.clearColor(0.968, 0.96, 0.949, 1.0); // #F7F5F2
      gl.clear(gl.COLOR_BUFFER_BIT);

      // 3. Render and Upload TRIA OS Dynamic Canvas (Unit 2)
      const isShowingTriaOS =
        is3DLock ||
        isReversing ||
        (isPortfolio && !rotationFinished && activeFrame < 120);
      if (
        isShowingTriaOS &&
        triaEngineRef.current &&
        triaCanvasRef.current &&
        triaTexRef.current
      ) {
        triaEngineRef.current.updateAndRender(performance.now());
        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_2D, triaTexRef.current);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          triaCanvasRef.current
        );
      }

      // 4. Draw Background Quad with Perspective Homography (Units 2 & 3)
      gl.useProgram(bgProg);
      const posLoc = gl.getAttribLocation(bgProg, "a_position");
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      const corners = getInterpolatedCorners(activeFrame);
      const hMatrix = getHomographyMatrix(corners);
      gl.uniformMatrix3fv(
        gl.getUniformLocation(bgProg, "u_homography"),
        false,
        hMatrix
      );
      gl.uniform2f(gl.getUniformLocation(bgProg, "u_resolution"), 1920, 1080);

      const t1Tex =
        textureCacheRef.current.get(curTexSrc) || fallbackTexRef.current;
      const t2Tex =
        textureCacheRef.current.get(nextTexSrc) ||
        t1Tex ||
        fallbackTexRef.current;

      if (is3DLock && !isReversing) {
        // Still 3/4 angle: TRIA OS dynamic canvas (Unit 2)
        if (triaTexRef.current) {
          gl.activeTexture(gl.TEXTURE2);
          gl.bindTexture(gl.TEXTURE_2D, triaTexRef.current);
          gl.uniform1i(gl.getUniformLocation(bgProg, "u_tex1"), 2);
          gl.uniform1f(gl.getUniformLocation(bgProg, "u_blend"), 0.0);
        }
      } else if (isReversing || (isPortfolio && !rotationFinished)) {
        // Rotating transition: smooth crossfade TRIA OS (Unit 2) to Project 1 slide (Unit 3)
        const lockToProjectBlend = Math.min(
          1.0,
          Math.max(0.0, (activeFrame - 20) / 80)
        );
        if (triaTexRef.current && t1Tex) {
          gl.activeTexture(gl.TEXTURE2);
          gl.bindTexture(gl.TEXTURE_2D, triaTexRef.current);
          gl.uniform1i(gl.getUniformLocation(bgProg, "u_tex1"), 2);

          gl.activeTexture(gl.TEXTURE3);
          gl.bindTexture(gl.TEXTURE_2D, t1Tex);
          gl.uniform1i(gl.getUniformLocation(bgProg, "u_tex2"), 3);

          gl.uniform1f(
            gl.getUniformLocation(bgProg, "u_blend"),
            lockToProjectBlend
          );
        }
      } else if (isPortfolio && rotationFinished) {
        // Front-Facing Portfolio Showcase: crossfade between cached project textures (Units 2 & 3)
        // Refresh animated GIF texture if the active project uses a GIF
        if (curTexSrc.endsWith(".gif")) {
          const gifEl = gifElementsRef.current.get(curTexSrc);
          if (gifEl && gifEl.complete && t1Tex) {
            gl.bindTexture(gl.TEXTURE_2D, t1Tex);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, gifEl);
          }
        }
        if (nextTexSrc.endsWith(".gif")) {
          const gifEl = gifElementsRef.current.get(nextTexSrc);
          if (gifEl && gifEl.complete && t2Tex) {
            gl.bindTexture(gl.TEXTURE_2D, t2Tex);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, gifEl);
          }
        }

        if (t1Tex) {
          gl.activeTexture(gl.TEXTURE2);
          gl.bindTexture(gl.TEXTURE_2D, t1Tex);
          gl.uniform1i(gl.getUniformLocation(bgProg, "u_tex1"), 2);

          if (t2Tex) {
            gl.activeTexture(gl.TEXTURE3);
            gl.bindTexture(gl.TEXTURE_2D, t2Tex);
            gl.uniform1i(gl.getUniformLocation(bgProg, "u_tex2"), 3);
          }

          gl.uniform1f(gl.getUniformLocation(bgProg, "u_blend"), blend);
        }
      }

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // 5. Draw Foreground Video with Real-time Chroma Key & Video Crossfade (Units 0 & 1)
      if (activeVideo && videoTexRef.current) {
        gl.useProgram(fgProg);
        const posLocFg = gl.getAttribLocation(fgProg, "a_position");
        gl.enableVertexAttribArray(posLocFg);
        gl.vertexAttribPointer(posLocFg, 2, gl.FLOAT, false, 0, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, videoTexRef.current);
        gl.uniform1i(gl.getUniformLocation(fgProg, "u_video"), 0);

        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(
          gl.TEXTURE_2D,
          videoPrevTexRef.current || videoTexRef.current
        );
        gl.uniform1i(gl.getUniformLocation(fgProg, "u_video_prev"), 1);

        gl.uniform1f(
          gl.getUniformLocation(fgProg, "u_video_crossfade"),
          videoCrossfadeFactor
        );

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      <video
        ref={videoRef}
        src={videoSrc}
        style={{ display: "none" }}
        playsInline
        muted
        preload="auto"
        onLoadedData={onVideoLoaded}
      />
      {videoSrcLoop && (
        <video
          ref={videoLoopRef}
          src={videoSrcLoop}
          style={{ display: "none" }}
          playsInline
          muted
          loop
          autoPlay
          preload="auto"
          onEnded={(e) => {
            e.currentTarget.currentTime = 0;
            playSafe(e.currentTarget);
          }}
        />
      )}
      {videoFrontLoopSrc && (
        <video
          ref={videoFrontLoopRef}
          src={videoFrontLoopSrc}
          style={{ display: "none" }}
          playsInline
          muted
          loop
          autoPlay
          preload="auto"
          onEnded={(e) => {
            e.currentTarget.currentTime = 0;
            playSafe(e.currentTarget);
          }}
        />
      )}
      {videoReverseSrc && (
        <video
          ref={videoReverseRef}
          src={videoReverseSrc}
          style={{ display: "none" }}
          playsInline
          muted
          preload="auto"
        />
      )}
            <canvas
        ref={canvasRef}
        width={1920}
        height={1080}
        style={{
          position: "absolute",
          left: 0,
          top: "-70px",
          width: "100%",
          height: "calc(100% + 140px)",
          objectFit: "cover",
          objectPosition: "center top",
        }}
      />
    </div>
  );
}
