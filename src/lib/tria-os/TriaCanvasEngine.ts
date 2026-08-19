/**
 * TRIA OS Canvas Engine
 * Renders the TRIA OS Boot Sequence (Kernel -> Loader) and Living Light Field Lock Screen
 * directly to a high-resolution 2D Canvas for 60fps real-time WebGL homography texture mapping.
 */

export interface BootLogItem {
  time: string;
  tag: 'OK' | 'INFO' | 'SEC' | null;
  type: 'ok' | 'info' | 'sec' | 'dim' | 'highlight';
  text: string;
}

export const BOOT_LOG_SEQUENCE: BootLogItem[] = [
  { time: '0.000000', tag: 'SEC', type: 'sec', text: 'ACPI: Early Power Management Controller v6.5 initialized' },
  { time: '0.012410', tag: null, type: 'info', text: 'Power rails stabilized: VDD_CORE @ 1.150V, VDDQ_DDR @ 1.350V' },
  { time: '0.038920', tag: 'OK', type: 'ok', text: 'CPU: TRIA Quantum-Silicon Core X16 @ 5.80GHz (16 Cores, 32 Threads)' },
  { time: '0.054100', tag: null, type: 'dim', text: 'Microcode update rev 0x24a applied to all APIC cores' },
  { time: '0.082300', tag: 'SEC', type: 'sec', text: 'UEFI 2.10 Secure Boot verified: SHA-384 / Ed25519 root certificate' },
  { time: '0.120540', tag: 'OK', type: 'ok', text: 'Memory: DDR5-6400 MT/s ECC 65536 MB total usable memory' },
  { time: '0.158200', tag: null, type: 'dim', text: 'e820: [mem 0x0000000000000000-0x000000000009fbff] usable' },
  { time: '0.189400', tag: null, type: 'dim', text: 'e820: [mem 0x0000000000100000-0x0000000fffffffff] usable' },
  { time: '0.245100', tag: 'OK', type: 'ok', text: 'PCIe 5.0 Root Complex: 64 GT/s Bus Enumeration Complete' },
  { time: '0.312800', tag: 'OK', type: 'ok', text: 'GPU: NVIDIA GeForce RTX 5070 (16384 MB GDDR7) DisplayPort 2.1 init' },
  { time: '0.401200', tag: 'OK', type: 'ok', text: 'Storage: NVMe Gen5x4 2048GB [TRIA_PRO_SSD_2TB] Read: 7400MB/s' },
  { time: '0.489300', tag: 'OK', type: 'ok', text: 'USB: xHCI Host Controller (USB 4.0 / TB4) — HID Keyboard & Pointer connected' },
  { time: '0.572100', tag: 'OK', type: 'ok', text: 'Net: Wi-Fi 7 (802.11be MLO) & 10GBASE-T Ethernet PHY link up (10000 Mbps)' },
  { time: '0.680400', tag: null, type: 'info', text: 'Audio: TRIA Studio Hi-Res 384kHz/32bit DAC initialized' },
  { time: '0.795000', tag: 'SEC', type: 'sec', text: 'Memory Map: 4-level PML4 Page Tables mapped, IOMMU DMA protection ON' },
  { time: '0.940000', tag: null, type: 'info', text: 'Bootloader: Transferring execution to efi/tria/tria-bootx64.efi' },
  { time: '1.082000', tag: 'OK', type: 'ok', text: 'Kernel: Loading vmlinuz-tria-6.14.0-hardened into RAM...' },
  { time: '1.240000', tag: 'OK', type: 'ok', text: 'Initramfs: Decompressing root filesystem image (Zstandard level 19)...' },
  { time: '1.450000', tag: 'SEC', type: 'sec', text: 'TRIA Microkernel v6.14.0-quantum online. SMP initialized across 32 threads' },
  { time: '1.620000', tag: 'OK', type: 'ok', text: 'Driver: tria_drm_kms.ko (Hardware accelerated compositor interface)' },
  { time: '1.745000', tag: 'OK', type: 'ok', text: 'Driver: tria_nvme_crypt.ko (Hardware AES-256-XTS engine online)' },
  { time: '1.890000', tag: 'SEC', type: 'sec', text: 'TPM: Hardware Cryptographic Co-Processor PCR-7 integrity PASSED' },
  { time: '2.080000', tag: 'OK', type: 'ok', text: 'Mount: Root filesystem [tria-fs encrypted] mounted on / (rw,noatime)' },
  { time: '2.280000', tag: 'OK', type: 'ok', text: 'Systemd[1]: Starting TRIA Core Daemons (tria-authd, tria-netd, dbus)...' },
  { time: '2.520000', tag: 'OK', type: 'ok', text: 'Compositor: Initializing Wayland / Vulkan DRM display server...' },
  { time: '2.800000', tag: 'OK', type: 'ok', text: 'Target: Reached System Initialization & Graphical Target' },
  { time: '3.100000', tag: null, type: 'highlight', text: 'Kernel boot sequence complete.' },
  { time: '3.350000', tag: null, type: 'info', text: 'Initialising User Interface...' },
  { time: '3.650000', tag: null, type: 'highlight', text: 'TRIA OS LOGIN: █' },
];

interface Particle {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  freq: number;
  vx: number;
  vy: number;
  seed: number;
}

interface BokehOrb {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  freq: number;
  vx: number;
  vy: number;
  seed: number;
}

export type TriaStage = 'kernel' | 'loading' | 'lock';

export interface TriaEngineOptions {
  width?: number;
  height?: number;
  speed?: number;
  initialStage?: TriaStage;
  autoLock?: boolean; // If false, loader stays in loading stage until jumpToLock() is called
  logoSrc?: string;
  onKernelComplete?: () => void;
  onLoadingReady?: () => void;
  onLockReady?: () => void;
}

export class TriaCanvasEngine {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  speed: number;
  autoLock: boolean;
  
  stage: TriaStage = 'kernel';
  startTime: number = 0;
  stageStartTime: number = 0;
  
  // Vector Artwork & Assets
  logoImage: HTMLImageElement | null = null;
  lockFieldSvgImage: HTMLImageElement | HTMLCanvasElement | null = null;
  svgLoaded: boolean = false;
  
  // Kernel state
  visibleLines: BootLogItem[] = [];
  nextLogIndex: number = 0;
  
  // Loader state
  spinnerAngle: number = 0;
  loadingDotIndex: number = 0;
  lastDotTime: number = 0;
  
  // Lock particles
  motes: Particle[] = [];
  bokehOrbs: BokehOrb[] = [];
  
  // Callbacks
  onKernelComplete?: () => void;
  onLoadingReady?: () => void;
  onLockReady?: () => void;
  
  // Animation handle
  private isDestroyed: boolean = false;

  constructor(canvas: HTMLCanvasElement, options: TriaEngineOptions = {}) {
    this.canvas = canvas;
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) throw new Error('Could not get 2D canvas context');
    this.ctx = context;
    
    this.width = options.width || 1920;
    this.height = options.height || 1080;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    
    this.speed = options.speed || 1.35;
    this.stage = options.initialStage || 'kernel';
    this.autoLock = options.autoLock !== undefined ? options.autoLock : false;
    this.onKernelComplete = options.onKernelComplete;
    this.onLoadingReady = options.onLoadingReady;
    this.onLockReady = options.onLockReady;
    
    this.initSvgArtwork();
    this.loadLogo(options.logoSrc || '/logo.png');
    this.initParticles();
    
    this.startTime = performance.now();
    this.stageStartTime = this.startTime;
  }

  private initSvgArtwork() {
    const svgData = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <defs>
    <!-- Background atmospheric glow -->
    <radialGradient id="sky-glow" cx="28%" cy="28%" r="75%">
      <stop offset="0%" stop-color="#072a1e" stop-opacity="1" />
      <stop offset="50%" stop-color="#041810" stop-opacity="1" />
      <stop offset="100%" stop-color="#020805" stop-opacity="1" />
    </radialGradient>

    <!-- Subsurface scattering volumetric back light -->
    <radialGradient id="volumetric-backlight" cx="30%" cy="35%" r="45%">
      <stop offset="0%" stop-color="#34d399" stop-opacity="0.25" />
      <stop offset="40%" stop-color="#0d6144" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#020805" stop-opacity="0" />
    </radialGradient>

    <!-- Translucent Jade Body Gradients -->
    <radialGradient id="jade-bulb-body" cx="38%" cy="40%" r="58%">
      <stop offset="0%" stop-color="#14523d" stop-opacity="0.75" />
      <stop offset="60%" stop-color="#092d21" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#03120c" stop-opacity="0.98" />
    </radialGradient>

    <!-- Grazing Rim Lighting - Feathered to zero at endpoints -->
    <linearGradient id="bulb-rim" x1="0%" y1="0%" x2="100%" y2="80%">
      <stop offset="0%" stop-color="#72f4be" stop-opacity="0" />
      <stop offset="25%" stop-color="#72f4be" stop-opacity="0.65" />
      <stop offset="50%" stop-color="#e6fff7" stop-opacity="0.95" />
      <stop offset="75%" stop-color="#34d399" stop-opacity="0.7" />
      <stop offset="100%" stop-color="#0a3d2c" stop-opacity="0" />
    </linearGradient>

    <!-- Dune Wave Body Gradient -->
    <linearGradient id="dune-body" x1="20%" y1="10%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#104a37" stop-opacity="0.82" />
      <stop offset="50%" stop-color="#08291e" stop-opacity="0.92" />
      <stop offset="100%" stop-color="#020b07" stop-opacity="0.99" />
    </linearGradient>

    <!-- Dune Crest Rim Lighting -->
    <linearGradient id="dune-crest" x1="0%" y1="30%" x2="100%" y2="70%">
      <stop offset="0%" stop-color="#4ade80" stop-opacity="0" />
      <stop offset="30%" stop-color="#6ee7b7" stop-opacity="0.75" />
      <stop offset="55%" stop-color="#d1fae5" stop-opacity="0.95" />
      <stop offset="80%" stop-color="#10b981" stop-opacity="0.6" />
      <stop offset="100%" stop-color="#047857" stop-opacity="0" />
    </linearGradient>

    <!-- Right Overlapping Lobes -->
    <radialGradient id="right-lobe-body" cx="65%" cy="45%" r="50%">
      <stop offset="0%" stop-color="#114e39" stop-opacity="0.7" />
      <stop offset="70%" stop-color="#062217" stop-opacity="0.88" />
      <stop offset="100%" stop-color="#020906" stop-opacity="0.98" />
    </radialGradient>

    <linearGradient id="right-rim" x1="10%" y1="0%" x2="90%" y2="100%">
      <stop offset="0%" stop-color="#6ee7b7" stop-opacity="0" />
      <stop offset="40%" stop-color="#a7f3d0" stop-opacity="0.85" />
      <stop offset="75%" stop-color="#34d399" stop-opacity="0.65" />
      <stop offset="100%" stop-color="#064e3b" stop-opacity="0" />
    </linearGradient>

    <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Sky Base -->
  <rect width="1920" height="1080" fill="url(#sky-glow)" />

  <!-- Volumetric Subsurface Glow -->
  <circle cx="580" cy="380" r="480" fill="url(#volumetric-backlight)" />

  <!-- Right Background Lobe -->
  <path d="M 1100 1080 C 1050 750, 1300 380, 1600 360 C 1780 350, 1920 480, 1920 620 L 1920 1080 Z" fill="url(#right-lobe-body)" />
  <path d="M 1100 1080 C 1050 750, 1300 380, 1600 360 C 1780 350, 1920 480, 1920 620" fill="none" stroke="url(#right-rim)" stroke-width="4" filter="url(#soft-glow)" />

  <!-- Midground Fluid Dune Wave -->
  <path d="M 0 680 C 450 620, 750 420, 1150 490 C 1500 550, 1750 820, 1920 780 L 1920 1080 L 0 1080 Z" fill="url(#dune-body)" />
  <path d="M 0 680 C 450 620, 750 420, 1150 490 C 1500 550, 1750 820, 1920 780" fill="none" stroke="url(#dune-crest)" stroke-width="4.5" filter="url(#soft-glow)" />

  <!-- Left Organic Jade Bulb -->
  <path d="M 0 1080 L 0 380 C 160 370, 320 430, 420 540 C 560 690, 520 920, 430 1080 Z" fill="url(#jade-bulb-body)" />
  <path d="M 0 380 C 160 370, 320 430, 420 540 C 560 690, 520 920, 430 1080" fill="none" stroke="url(#bulb-rim)" stroke-width="5" filter="url(#soft-glow)" />
  <!-- Gloss Highlight Arc on Bulb -->
  <path d="M 120 420 C 240 450, 340 520, 390 610" fill="none" stroke="rgba(255, 255, 255, 0.45)" stroke-width="2.5" stroke-linecap="round" />
</svg>`;

    const img = new Image();
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgData.trim());
    img.onload = () => {
      const offscreen = document.createElement('canvas');
      offscreen.width = 1920;
      offscreen.height = 1080;
      const offCtx = offscreen.getContext('2d');
      if (offCtx) {
        offCtx.drawImage(img, 0, 0, 1920, 1080);
        this.lockFieldSvgImage = offscreen;
      } else {
        this.lockFieldSvgImage = img; // Fallback
      }
      this.svgLoaded = true;
    };
  }

  private loadLogo(logoSrc: string) {
    const logo = new Image();
    logo.crossOrigin = 'anonymous';
    logo.src = logoSrc;
    logo.onload = () => {
      this.logoImage = logo;
    };
  }

  private initParticles() {
    this.motes = [];
    const moteCount = 28;
    for (let i = 0; i < moteCount; i++) {
      this.motes.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: 1.0 + Math.random() * 2.4,
        baseAlpha: 0.25 + Math.random() * 0.5,
        alpha: 0.35,
        freq: 0.015 + Math.random() * 0.03,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -0.15 - Math.random() * 0.35,
        seed: Math.random() * 100,
      });
    }

    this.bokehOrbs = [];
    const bokehCount = 10;
    for (let i = 0; i < bokehCount; i++) {
      this.bokehOrbs.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: 35 + Math.random() * 65,
        baseAlpha: 0.06 + Math.random() * 0.12,
        alpha: 0.08,
        freq: 0.008 + Math.random() * 0.015,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -0.08 - Math.random() * 0.15,
        seed: Math.random() * 100,
      });
    }
  }

  public start() {
    this.stage = 'kernel';
    this.startTime = performance.now();
    this.stageStartTime = this.startTime;
    this.visibleLines = [];
    this.nextLogIndex = 0;
  }

  public jumpToLoading() {
    this.stage = 'loading';
    this.stageStartTime = performance.now();
    if (this.onLoadingReady) this.onLoadingReady();
  }

  public jumpToLock() {
    if (this.stage === 'lock') return;
    this.stage = 'lock';
    this.stageStartTime = performance.now();
    if (this.onLockReady) this.onLockReady();
  }

  public updateAndRender(now: number) {
    if (this.isDestroyed) return;
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // --- STAGE 1: KERNEL BOOT ---
    if (this.stage === 'kernel') {
      const elapsedKernel = (now - this.stageStartTime) * 0.001 * this.speed;

      // Add log items based on timestamps
      while (
        this.nextLogIndex < BOOT_LOG_SEQUENCE.length &&
        parseFloat(BOOT_LOG_SEQUENCE[this.nextLogIndex].time) <= elapsedKernel
      ) {
        this.visibleLines.push(BOOT_LOG_SEQUENCE[this.nextLogIndex]);
        this.nextLogIndex++;
      }

      // If all lines finished, transition to loading screen
      if (this.nextLogIndex >= BOOT_LOG_SEQUENCE.length && elapsedKernel > 3.8) {
        if (this.onKernelComplete) this.onKernelComplete();
        this.jumpToLoading();
        return;
      }

      // Render Kernel Terminal
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, w, h);

      // Header Bar
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.fillRect(40, 36, w - 80, 56);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(40, 36, w - 80, 56);

      ctx.textAlign = 'left';
      ctx.font = 'bold 22px "Geist Mono", "Courier New", monospace';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('TRIA Boot Loader v3.4.0', 65, 71);

      ctx.font = '19px "Geist Mono", "Courier New", monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillText('(x86_64-quantum-uefi) | Initializing Kernel Image...', 380, 71);

      // Terminal Lines
      const lineHeight = 34;
      const startY = 135;
      const maxVisible = 25;
      const displayLines = this.visibleLines.slice(-maxVisible);

      displayLines.forEach((item, idx) => {
        const y = startY + idx * lineHeight;
        if (y > h - 30) return;

        // Timestamp
        ctx.font = '19px "Geist Mono", "Courier New", monospace';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.50)';
        ctx.fillText(`[ ${item.time.padStart(8, ' ')} ]`, 55, y);

        // Tag
        if (item.tag === 'OK') {
          ctx.fillStyle = '#00FF7F';
          ctx.fillText('[  OK  ]', 220, y);
        } else if (item.tag === 'SEC') {
          ctx.fillStyle = '#6EE7B7';
          ctx.fillText('[ SEC  ]', 220, y);
        } else if (item.tag === 'INFO') {
          ctx.fillStyle = '#38BDF8';
          ctx.fillText('[ INFO ]', 220, y);
        }

        // Text
        if (item.type === 'dim') {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
        } else if (item.type === 'highlight' || item.type === 'sec') {
          ctx.fillStyle = '#FFFFFF';
        } else {
          ctx.fillStyle = 'rgba(245, 245, 250, 0.95)';
        }
        ctx.fillText(item.text, 355, y);
      });

      // Flashing Cursor
      if (Math.floor(now * 0.003) % 2 === 0 && displayLines.length < maxVisible) {
        const cursorY = startY + displayLines.length * lineHeight;
        ctx.fillStyle = '#38BDF8';
        ctx.fillText('█', 355, cursorY);
      }

      // Subtle CRT Scanlines
      ctx.fillStyle = 'rgba(0, 0, 0, 0.14)';
      for (let i = 0; i < h; i += 4) {
        ctx.fillRect(0, i, w, 1.5);
      }
    }

    // --- STAGE 2: LOADING SCREEN ---
    else if (this.stage === 'loading') {
      ctx.fillStyle = '#040706';
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2 - 20;

      // Ambient Central Cyan-Mint Halo
      const halo = ctx.createRadialGradient(cx, cy, 20, cx, cy, 380);
      halo.addColorStop(0, 'rgba(56, 189, 248, 0.15)');
      halo.addColorStop(0.4, 'rgba(52, 211, 153, 0.06)');
      halo.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, 380, 0, Math.PI * 2);
      ctx.fill();

      // Track Ring
      const radius = 140;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Rotating Clockwise Gradient Spinner Arc
      this.spinnerAngle = (now * 0.0032 * this.speed) % (Math.PI * 2);
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(this.spinnerAngle);

      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 0.85);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 4.5;
      ctx.lineCap = 'round';
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'rgba(130, 255, 220, 0.85)';
      ctx.stroke();
      ctx.restore();

      // Center TRIA Emblem
      if (this.logoImage) {
        const logoSize = 120;
        ctx.save();
        ctx.shadowBlur = 24;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
        ctx.filter = 'brightness(0) invert(1)';
        ctx.drawImage(this.logoImage, cx - logoSize / 2, cy - logoSize / 2, logoSize, logoSize);
        ctx.restore();
      } else {
        // Crisp vector fallback
        ctx.save();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 35);
        ctx.lineTo(cx + 35, cy + 30);
        ctx.lineTo(cx - 35, cy + 30);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      }

      // Status Text Below with Animated Dots
      if (now - this.lastDotTime > 400) {
        this.loadingDotIndex = (this.loadingDotIndex + 1) % 4;
        this.lastDotTime = now;
      }
      const dots = '.'.repeat(this.loadingDotIndex);
      ctx.font = '600 22px "Inter", sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '2px';
      ctx.fillText(`STARTING TRIA OS${dots}`, cx, cy + radius + 80);
      ctx.letterSpacing = '0px';
    }

    // --- STAGE 3: LIVING LIGHT FIELD LOCK SCREEN ---
    else if (this.stage === 'lock') {
      const elapsedLock = (now - this.stageStartTime) * 0.001;
      const transitionDuration = 0.75;
      const rawProgress = Math.min(1.0, Math.max(0.0, elapsedLock / transitionDuration));
      // Smooth cubic ease out
      const easeProgress = 1 - Math.pow(1 - rawProgress, 3);
      const slideOffset = (1 - easeProgress) * 16;

      // Base background
      if (rawProgress < 1.0) {
        ctx.fillStyle = '#040706';
        ctx.fillRect(0, 0, w, h);
      }

      // 1. Draw Master Living Light Field Vector Artwork with Fade-in
      ctx.save();
      ctx.globalAlpha = easeProgress;
      if (this.lockFieldSvgImage && this.svgLoaded) {
        // Draw with object-fit: cover logic to prevent stretching on mobile
        const imgRatio = 1920 / 1080;
        const canvasRatio = w / h;
        let drawWidth, drawHeight, offsetX, offsetY;
        
        if (canvasRatio > imgRatio) {
          drawWidth = w;
          drawHeight = w / imgRatio;
          offsetX = 0;
          offsetY = (h - drawHeight) / 2;
        } else {
          drawHeight = h;
          drawWidth = h * imgRatio;
          offsetX = (w - drawWidth) / 2;
          offsetY = 0;
        }
        ctx.drawImage(this.lockFieldSvgImage, offsetX, offsetY, drawWidth, drawHeight);
      } else {
        // Instant procedural fallback
        ctx.fillStyle = '#041a12';
        ctx.fillRect(0, 0, w, h);
        const bgGrad = ctx.createRadialGradient(w * 0.28, h * 0.28, 60, w * 0.5, h * 0.5, w * 0.75);
        bgGrad.addColorStop(0, 'rgba(7, 42, 30, 1)');
        bgGrad.addColorStop(0.5, 'rgba(4, 24, 16, 1)');
        bgGrad.addColorStop(1, 'rgba(2, 8, 5, 1)');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, w, h);
      }

      // 2. Volumetric Breathing Backlight
      const breathAlpha = (0.18 + Math.sin(now * 0.0008) * 0.05) * easeProgress;
      const breathRadius = 450 + Math.sin(now * 0.0008) * 40;
      const lightGrad = ctx.createRadialGradient(w * 0.3, h * 0.35, 20, w * 0.3, h * 0.35, breathRadius);
      lightGrad.addColorStop(0, `rgba(52, 211, 153, ${breathAlpha})`);
      lightGrad.addColorStop(0.5, `rgba(13, 97, 68, ${breathAlpha * 0.6})`);
      lightGrad.addColorStop(1, 'rgba(2, 8, 5, 0)');
      ctx.fillStyle = lightGrad;
      ctx.fillRect(0, 0, w, h);

      // 3. Animate Soft Bokeh Orbs (Background Depth Layer)
      this.bokehOrbs.forEach((b) => {
        b.x += b.vx + Math.sin((b.seed += b.freq)) * 0.2;
        b.y += b.vy;

        if (b.y < -80) {
          b.y = h + 80;
          b.x = Math.random() * w;
        }
        if (b.x < -80) b.x = w + 80;
        if (b.x > w + 80) b.x = -80;

        b.alpha = (b.baseAlpha + Math.sin(b.seed) * 0.03) * easeProgress;

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
        grad.addColorStop(0, `rgba(140, 255, 220, ${b.alpha * 1.6})`);
        grad.addColorStop(0.5, `rgba(45, 195, 140, ${b.alpha * 0.7})`);
        grad.addColorStop(1, 'rgba(10, 60, 40, 0)');

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // 4. Animate Glowing Micro-Motes (Foreground Floating Dust)
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(160, 255, 225, 0.7)';

      this.motes.forEach((p) => {
        p.x += p.vx + Math.sin((p.seed += p.freq)) * 0.3;
        p.y += p.vy;

        if (p.y < -20) {
          p.y = h + 20;
          p.x = Math.random() * w;
        }
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;

        p.alpha = Math.max(0.12, Math.min(0.85, p.baseAlpha + Math.sin(p.seed) * 0.25)) * easeProgress;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(225, 255, 245, ${p.alpha})`;
        ctx.fill();
      });
      ctx.shadowBlur = 0;
      ctx.restore();

      // Dissolving Loading Ring during transition
      if (rawProgress < 1.0) {
        const cx = w / 2;
        const cy = h / 2 - 20;
        const fadeOut = 1 - easeProgress;
        const expandingRadius = 140 + 35 * easeProgress;

        ctx.save();
        ctx.globalAlpha = fadeOut;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(cx, cy, expandingRadius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.translate(cx, cy);
        ctx.rotate(this.spinnerAngle);
        ctx.beginPath();
        ctx.arc(0, 0, expandingRadius, 0, Math.PI * 0.85);
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 4.5;
        ctx.lineCap = 'round';
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(130, 255, 220, 0.85)';
        ctx.stroke();
        ctx.restore();
      }

      // 5. Precision Swiss Editorial Lock UI (with smooth slide & fade in)
      ctx.save();
      ctx.globalAlpha = easeProgress;

      // Top: Minimal Lock Badge
      const lockCx = w / 2;
      const lockCy = 140 + slideOffset;
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
      ctx.lineWidth = 1.5;
      
      const badgeW = 44;
      const badgeH = 44;
      const badgeR = 12;
      ctx.beginPath();
      ctx.roundRect(lockCx - badgeW / 2, lockCy - badgeH / 2, badgeW, badgeH, badgeR);
      ctx.fill();
      ctx.stroke();

      // Lock SVG Vector Shackle & Body
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.92)';
      ctx.lineWidth = 1.8;
      ctx.lineCap = 'round';
      ctx.strokeRect(lockCx - 8, lockCy - 2, 16, 13);
      ctx.beginPath();
      ctx.arc(lockCx, lockCy - 2, 5.5, Math.PI, 0);
      ctx.stroke();
      ctx.restore();

      // Center: Digital Clock & Date
      const clockY = h / 2 - 30 + slideOffset;
      const date = new Date();
      const rawHours = date.getHours();
      const hours12 = rawHours % 12 || 12;
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const ampm = rawHours >= 12 ? 'PM' : 'AM';

      // Soft Clock Bloom
      ctx.save();
      ctx.shadowBlur = 32;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.35)';
      ctx.font = '200 135px "Inter", -apple-system, sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.fillText(`${hours12}:${minutes}`, lockCx - 22, clockY);
      ctx.restore();

      // AM/PM Indicator
      ctx.font = '500 24px "Inter", sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.70)';
      ctx.textAlign = 'left';
      ctx.fillText(ampm, lockCx + 180, clockY - 65);

      // Date: e.g. Monday, October 28
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const dayStr = days[date.getDay()];
      const monthStr = months[date.getMonth()];
      const dateNum = date.getDate();

      ctx.font = '300 28px "Inter", sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.82)';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '1px';
      ctx.fillText(`${dayStr}, ${monthStr} ${dateNum}`, lockCx, clockY + 68);
      ctx.letterSpacing = '0px';

      // Bottom: TRIA Brand Pill
      const pillY = h - 140 + slideOffset;
      const pillW = 160;
      const pillH = 50;
      ctx.save();
      ctx.fillStyle = 'rgba(15, 28, 22, 0.65)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.roundRect(lockCx - pillW / 2, pillY - pillH / 2, pillW, pillH, 25);
      ctx.fill();
      ctx.stroke();

      if (this.logoImage) {
        ctx.save();
        ctx.filter = 'brightness(0) invert(1)';
        ctx.drawImage(this.logoImage, lockCx - 58, pillY - 14, 28, 28);
        ctx.restore();
      }

      ctx.font = '600 16px "Inter", sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'left';
      ctx.letterSpacing = '3px';
      ctx.fillText('TRIA', lockCx - 18, pillY + 6);
      ctx.letterSpacing = '0px';
      ctx.restore();

      ctx.restore();

    }
  }

  public destroy() {
    this.isDestroyed = true;
  }
}
