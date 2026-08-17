"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChromaHomographyRenderer, { HeroStage } from "@/components/webgl/ChromaHomographyRenderer";
import { scrollToSection } from "@/components/SmoothScroll";
import { useLenis } from 'lenis/react';

export type TriaLockMessage = { label: string; title: string; body: string; };
const lockMessages: TriaLockMessage[] = [
  { 
    label: "01 / THE FOUNDATION", 
    title: "Clarity before code.", 
    body: "Every layout starts as a strategic decision, not a guess — so nothing on your site is ever there by accident." 
  },
  { 
    label: "02 / THE EXPERIENCE", 
    title: "Speed is a feature.", 
    body: "Lean builds and careful architectural choices mean your site feels instantly ready before a visitor has time to leave." 
  },
  { 
    label: "03 / THE CRAFT", 
    title: "Designed to move.", 
    body: "Every scroll, hover, and click is meticulously considered — so it doesn't just look stunning, it feels entirely alive." 
  },
];

const frontTextures = [
  "/images/hero-screens/section-1.jpeg",
  "/images/hero-screens/section-2.jpeg",
  "/images/hero-screens/section-3.jpeg",
];

const mobileFrontTextures = [
  "/images/hero-screens/mobile-1.jpeg",
  "/images/hero-screens/mobile-2.jpeg",
  "/images/hero-screens/mobile-3.jpeg",
];

// ─── DEV CONFIG ───────────────────────────────────────────────────────────────
// Tweak these values to adjust the layout.
const INITIAL_DEV = {

  // ── VIDEO / LAPTOP POSITION ──────────────────────────────────────────────
  videoShiftX: 12, // %

  // ── VIDEO EDGE FEATHER ───────────────────────────────────────────────────
  videoFeatherStart: 0, // %
  videoFeatherMid: 5, // %
  videoFeatherEnd: 11, // %

  // ── TEXT BACKDROP GRADIENT ───────────────────────────────────────────────
  bgColor: "#F8F2F2", // Hex color for section bg and gradient
  gradientWidth: 20, // %
  gradientSolidStop: 11, // %
  gradientMidStop: 30, // %

  // ── TEXT POSITION ────────────────────────────────────────────────────────
  textLeftInset: 3, // rem
  textMaxWidth: 22, // rem

  // ── TYPOGRAPHY ───────────────────────────────────────────────────────────
  eyebrowColor:  "#8C7A5E",
  titleColor:    "#161616",
  bodyColor:     "#4A4A4A",
  titleSize:     2.85, // rem
  bodySize:      0.93, // rem
  bodyLineHeight: 1.75,

  // ── SCROLL SENSITIVITY ───────────────────────────────────────────────────
  scrollThreshold: 20,
  scrollLockMs: 800,
  inertiaEatMs: 600,

  // ── TRANSITION TIMING ────────────────────────────────────────────────────
  rotationDurationMs: 1400,
  crossfadeDurationMs: 650,

};
// ─────────────────────────────────────────────────────────────────────────────

const ease = (value: number) => value < 0.5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2;

export default function CinematicSequence({ isPaused = false }: { isPaused?: boolean }) {
  const [scene, setScene] = useState(0);
  const [stage, setStage] = useState<HeroStage>("boot");
  const [rotationProgress, setRotationProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const activeTextures = isMobile ? mobileFrontTextures : frontTextures;

  const [currentTexture, setCurrentTexture] = useState(activeTextures[0]);
  const [nextTexture, setNextTexture] = useState("");
  const [textureBlend, setTextureBlend] = useState(0);
  const [isPageScrolling, setIsPageScrolling] = useState(false);
  const dev = INITIAL_DEV;
  const devRef = useRef(dev);
  useEffect(() => { devRef.current = dev; }, [dev]);
  
  const sceneRef = useRef(0);
  const animatingRef = useRef(false);
  const scrollingRef = useRef(false);
  const touchStartY = useRef(0);
  const maxScene = 5;

  // Single ref for the wheel debounce timer
  const wheelAccum = useRef(0);
  const wheelLockUntil = useRef(0); // timestamp-based lock — no timers needed
  const lenis = useLenis();

  useEffect(() => { sceneRef.current = scene; }, [scene]);
  useEffect(() => { scrollingRef.current = isPageScrolling; }, [isPageScrolling]);
  
  useEffect(() => {
    if (window.scrollY > 10) {
      setIsPageScrolling(true);
      setScene(maxScene);
    }
    
    const handleForceUnlock = () => {
      setIsPageScrolling(true);
      setScene(maxScene);
    };
    window.addEventListener('forceUnlockScroll', handleForceUnlock);
    
    const mql = window.matchMedia("(max-width: 768px)");
    setIsMobile(mql.matches);
    if (mql.matches) {
      setCurrentTexture(mobileFrontTextures[sceneRef.current > 1 ? sceneRef.current - 2 : 0]);
    }
    const mqlHandler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      if (e.matches) setCurrentTexture(mobileFrontTextures[sceneRef.current > 1 ? sceneRef.current - 2 : 0]);
      else setCurrentTexture(frontTextures[sceneRef.current > 1 ? sceneRef.current - 2 : 0]);
    };
    mql.addEventListener("change", mqlHandler);

    return () => {
      window.removeEventListener('forceUnlockScroll', handleForceUnlock);
      mql.removeEventListener("change", mqlHandler);
    };
  }, []);
  useEffect(() => {
    if (!isPageScrolling) {
      if (lenis) lenis.stop();
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      if (lenis) lenis.start();
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }

    return () => {
      if (lenis) lenis.start();
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [lenis, isPageScrolling]);

  const crossfade = useCallback((from: string, to: string, done: () => void) => {
    setCurrentTexture(from); setNextTexture(to); setTextureBlend(0);
    const start = performance.now();
    const frame = (now: number) => {
      const progress = Math.min(1, (now - start) / devRef.current.crossfadeDurationMs);
      setTextureBlend(ease(progress));
      if (progress < 1) requestAnimationFrame(frame);
      else { setCurrentTexture(to); setNextTexture(""); setTextureBlend(0); done(); }
    };
    requestAnimationFrame(frame);
  }, []);

  const goToScene = useCallback((target: number) => {
    if (animatingRef.current || target < 0) return;
    if (target > maxScene) {
      setIsPageScrolling(true);
      scrollToSection("#work", { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
      return;
    }
    
    const from = sceneRef.current;
    if (target === from) return; // no-op
    animatingRef.current = true;
    setScene(target);
    const finish = () => { 
      animatingRef.current = false; 
      // Eat any remaining trackpad inertia
      wheelLockUntil.current = performance.now() + devRef.current.inertiaEatMs;
      wheelAccum.current = 0;
    };
    
    // Scene 0: Boot loader
    if (target === 0) { setStage("boot"); setRotationProgress(0); setTimeout(finish, 500); return; }
    
    // Scene 1: Lockscreen
    if (target === 1) { setStage("lock"); setRotationProgress(0); setTimeout(finish, 650); return; }
    
    // Scene 2: Front view - Reason 1
    if (target === 2) { 
        setStage("portfolio"); 
        setRotationProgress(1); 
        if (from < 2) {
            // First rotation: wait for the video to play through at 4.2x
            setCurrentTexture(activeTextures[0]); setNextTexture(""); setTimeout(finish, devRef.current.rotationDurationMs); 
        } else {
            crossfade(activeTextures[from - 2] || activeTextures[0], activeTextures[0], finish);
        }
        return; 
    }
    
    // Scene 3: Front view - Reason 2
    if (target === 3) {
        setStage("portfolio"); setRotationProgress(1); crossfade(activeTextures[from - 2] || activeTextures[1], activeTextures[1], finish); return;
    }
    
    // Scene 4: Front view - Reason 3
    if (target === 4) {
        setStage("portfolio"); setRotationProgress(1); crossfade(activeTextures[from - 2] || activeTextures[2], activeTextures[2], finish); return;
    }

    // Scene 5: Expand transition → auto-scroll to portfolio
    if (target === 5) {
        // Immediately release the page scroll and glide down
        setIsPageScrolling(true); 
        unlockPageScroll(); 
        scrollToSection("#work", { 
            duration: 1.8, 
            easing: (t) => 1 - Math.pow(1 - t, 4)  // easeOutQuart
        });
        // Release the animation lock after the scroll has had time to start
        setTimeout(finish, 600);
        return;
    }
  }, [crossfade, maxScene]);

  // Handle scrolling back up to the hero section
  const hasScrolledDown = useRef(false);
  useEffect(() => {
    const handleWindowScroll = () => {
      if (!scrollingRef.current) return;
      // Only allow snap-back after the user has scrolled well past the hero
      if (window.scrollY > 150) hasScrolledDown.current = true;
      if (hasScrolledDown.current && window.scrollY <= 10) {
        hasScrolledDown.current = false;
        setIsPageScrolling(false);
        animatingRef.current = false;
        goToScene(4);
      }
    };
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, [goToScene]);

  // ─── Wheel / Touch / Keyboard ─────────────────────────────────────────────
  useEffect(() => {
    // WHEEL: accumulate deltaY, trigger ONE scene change, then lock for 600ms
    const handleWheel = (e: WheelEvent) => {
      if (scrollingRef.current || isPaused) return;
      e.preventDefault();

      const now = performance.now();

      // Hard time-lock: ignore all wheel events until the lock expires
      if (now < wheelLockUntil.current) return;

      // If currently animating, just swallow the event
      if (animatingRef.current) return;

      wheelAccum.current += e.deltaY;

      if (wheelAccum.current > devRef.current.scrollThreshold) {
        wheelAccum.current = 0;
        wheelLockUntil.current = now + devRef.current.scrollLockMs;
        goToScene(sceneRef.current + 1);
      } else if (wheelAccum.current < -devRef.current.scrollThreshold) {
        wheelAccum.current = 0;
        wheelLockUntil.current = now + devRef.current.scrollLockMs;
        goToScene(sceneRef.current - 1);
      }
    };

    // TOUCH
    const handleTouchStart = (e: TouchEvent) => {
      if (!scrollingRef.current && !isPaused) touchStartY.current = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!scrollingRef.current && !isPaused) e.preventDefault();
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (scrollingRef.current || animatingRef.current || isPaused) return;
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) > 40) goToScene(sceneRef.current + (delta > 0 ? 1 : -1));
    };

    // KEYBOARD
    const handleKey = (e: KeyboardEvent) => {
      if (scrollingRef.current || isPaused) return;
      if (["ArrowDown", "PageDown", " "].includes(e.key)) { e.preventDefault(); goToScene(sceneRef.current + 1); }
      if (["ArrowUp", "PageUp"].includes(e.key)) { e.preventDefault(); goToScene(sceneRef.current - 1); }
    };

    window.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true, capture: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false, capture: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true, capture: true });
    window.addEventListener("keydown", handleKey, { capture: true });

    return () => {
      window.removeEventListener("wheel", handleWheel, { capture: true });
      window.removeEventListener("touchstart", handleTouchStart, { capture: true });
      window.removeEventListener("touchmove", handleTouchMove, { capture: true });
      window.removeEventListener("touchend", handleTouchEnd, { capture: true });
      window.removeEventListener("keydown", handleKey, { capture: true });
    };
  }, [goToScene, isPaused]);

  if (isPaused) {
    return <section className="relative h-screen w-full overflow-hidden select-none" style={{ backgroundColor: dev.bgColor }} />;
  }

  return (
    <section className="relative h-screen w-full overflow-hidden select-none" style={{ backgroundColor: dev.bgColor }}>
      <motion.div 
        animate={{ 
          scale: scene === 5 ? 3 : 1, 
          opacity: scene === 5 ? 0 : 1,
          x: (scene >= 2 && scene <= 4) ? (isMobile ? "0%" : `${dev.videoShiftX}%`) : "0%",
        }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          // Feather the left edge of the video — controlled by DEV.videoFeather*
          WebkitMaskImage: (scene >= 2 && scene <= 4 && !isMobile)
            ? `linear-gradient(to right, transparent ${dev.videoFeatherStart}%, rgba(0,0,0,0.4) ${dev.videoFeatherMid}%, black ${dev.videoFeatherEnd}%)`
            : "none",
          maskImage: (scene >= 2 && scene <= 4 && !isMobile)
            ? `linear-gradient(to right, transparent ${dev.videoFeatherStart}%, rgba(0,0,0,0.4) ${dev.videoFeatherMid}%, black ${dev.videoFeatherEnd}%)`
            : "none",
        }}
      >
        <ChromaHomographyRenderer 
          key={isMobile ? "mobile" : "desktop"}
          videoSrc={isMobile ? "/videos/mobile-hero.mp4" : "/videos/hero-sequence.mp4"} 
          videoSrcLoop={isMobile ? "" : "/videos/scene1-loop.mp4"}
          videoFrontLoopSrc={isMobile ? "" : "/videos/front-loop.mp4"}
          videoReverseSrc={isMobile ? "" : "/videos/hero-reverse.mp4"}
          stage={stage} 
          rotationProgress={rotationProgress} 
          currentTextureSrc={currentTexture} 
          nextTextureSrc={nextTexture} 
          textureBlend={textureBlend} 
          preloadTextures={isMobile ? mobileFrontTextures : frontTextures}
          onVideoLoaded={() => window.dispatchEvent(new Event('tria-app-ready'))}
          isMobile={isMobile}
        />
      </motion.div>

      <AnimatePresence mode="wait">
        {scene <= 1 && (
           <motion.div key={`title-${scene}`} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="absolute inset-0 z-10 flex pointer-events-none">
             <div className={`w-full flex ${isMobile ? "items-end justify-center pb-12 px-6" : "items-center container"}`}>
               <div className={`max-w-xl ${isMobile ? "p-6 rounded-[20px] bg-[#F7F5F2]/80 backdrop-blur-xl shadow-2xl border border-white/40 text-center" : ""}`}>
                 <span className={`font-mono text-[0.72rem] tracking-[0.15em] uppercase font-medium mb-4 block ${isMobile ? "text-[var(--color-brass-deep)]" : "text-[var(--color-brass-deep)]"}`}>
                    {scene === 0 ? "SYS_INIT // BOOT LOADER" : "SYS_READY // IDENTITY VERIFIED"}
                  </span>
                  <h1 className={`font-sans font-[800] tracking-[-0.02em] leading-[1.08] mb-6 max-w-[15ch] text-[var(--color-ink)] ${isMobile ? "text-4xl mx-auto" : "text-display-2xl"}`}>
                    {scene === 0 ? (
                      <>
                        We build fast, <em className="font-serif italic font-medium text-[var(--color-brass-deep)] text-[0.98em]">purposeful</em> websites.
                      </>
                    ) : (
                      <>
                        We build their <em className="font-serif italic font-medium text-[var(--color-brass-deep)] text-[0.98em]">best</em> salesperson.
                      </>
                    )}
                  </h1>
                  <p className={`text-[1.08rem] leading-[1.6] text-[var(--color-ink-muted)] mb-14 ${isMobile ? "max-w-xs mx-auto" : "max-w-[42ch]"}`}>
                    Lean builds and deliberate decisions — nothing recycled, nothing extra.
                  </p>
                  <div className="font-mono text-[0.68rem] tracking-[0.18em] uppercase text-[var(--color-cream-muted)] border-t border-[var(--color-hair-cream)] pt-4 inline-block">
                    SCROLL TO AUTHENTICATE
                  </div>
               </div>
             </div>
           </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence mode="wait">
        {(scene >= 2 && scene <= 4) && (
          <motion.div
            key={`reason-${scene}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-20 pointer-events-none"
          >
            {/* Left-side gradient — DEV.gradientWidth / DEV.gradientSolidStop / DEV.gradientMidStop */}
            {!isMobile && (
              <div
                className="absolute inset-y-0 left-0 pointer-events-none"
                style={{
                  width: `${dev.gradientWidth}%`,
                  background: `linear-gradient(to right, ${dev.bgColor} 0%, ${dev.bgColor} ${dev.gradientSolidStop}%, ${dev.bgColor}B3 ${dev.gradientMidStop}%, transparent 100%)`,
                }}
              />
            )}

            {/* Floating editorial text — DEV.textLeftInset / DEV.textMaxWidth */}
            <div
              className={`absolute flex pointer-events-none ${isMobile ? "bottom-12 inset-x-6 justify-center" : "inset-y-0 items-center"}`}
              style={!isMobile ? { left: `${dev.textLeftInset}rem` } : {}}
            >
              <div 
                className={isMobile ? "p-6 rounded-[20px] bg-[#F7F5F2]/80 backdrop-blur-xl shadow-2xl border border-white/40 text-center" : ""}
                style={{ maxWidth: `${dev.textMaxWidth}rem` }}
              >
                {/* Eyebrow — DEV.eyebrowColor */}
                <span 
                  className={`block font-sans font-bold text-[11px] tracking-[0.22em] uppercase mb-4 ${isMobile ? "text-[var(--color-brass-deep)]" : ""}`}
                  style={!isMobile ? { color: dev.eyebrowColor } : {}}
                >
                  {lockMessages[scene - 2].label}
                </span>

                {/* Title — DEV.titleSize / DEV.titleColor */}
                <h2
                  className="font-serif leading-[1.08] tracking-[-0.01em] mb-4"
                  style={{ color: dev.titleColor, fontSize: isMobile ? "2.5rem" : `${dev.titleSize}rem` }}
                >
                  {lockMessages[scene - 2].title}
                </h2>

                {/* Body — DEV.bodySize / DEV.bodyColor / DEV.bodyLineHeight */}
                <p 
                  className={isMobile ? "text-[1rem] leading-[1.5] text-[var(--color-ink-muted)]" : ""}
                  style={!isMobile ? { color: dev.bodyColor, fontSize: `${dev.bodySize}rem`, lineHeight: dev.bodyLineHeight } : {}}
                >
                  {lockMessages[scene - 2].body}
                </p>
              </div>
            </div>

            {/* Bottom-right: scroll hint + progress */}
            <div className="absolute bottom-10 right-10 sm:right-14 lg:right-16 flex flex-col items-end gap-5">
              {/* Progress pips */}
              <div className="flex flex-col items-center gap-2">
                {[2, 3, 4].map((s) => (
                  <motion.span
                    key={s}
                    animate={{ 
                      height: scene === s ? 20 : 6, 
                      opacity: scene === s ? 1 : 0.2,
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="w-[3px] rounded-full bg-[#161616] block"
                  />
                ))}
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className="text-[9px] font-mono tracking-[0.22em] text-[#161616]/35 uppercase hidden lg:block">Scroll to</span>
                <span className="text-[9px] font-mono tracking-[0.22em] text-[#161616]/35 uppercase hidden lg:block">continue</span>
                <span className="text-[9px] font-mono text-[#161616]/25 mt-1 hidden lg:block">↓ &nbsp; &nbsp; ↓</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute right-8 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2.5 md:flex">
          {Array.from({ length: 5 }).map((_, index) => <span key={index} className={`rounded-full transition-all duration-300 ${scene === index ? "h-6 w-2 bg-[#161616]" : "h-2 w-2 bg-[#161616]/20"}`} />)}
      </div>
    </section>
  );
}
