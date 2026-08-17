"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

let globalLenis: Lenis | null = null;
let isScrollLocked = true;

export function getLenis(): Lenis | null {
  return globalLenis;
}

export function lockPageScroll() {
  isScrollLocked = true;
  if (globalLenis) {
    globalLenis.stop();
  }
  if (typeof document !== "undefined") {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }
}

export function unlockPageScroll() {
  isScrollLocked = false;
  if (globalLenis) {
    globalLenis.start();
  }
  if (typeof document !== "undefined") {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }
}

export function scrollToSection(
  target: string | HTMLElement,
  options?: { offset?: number; duration?: number; easing?: (t: number) => number }
) {
  if (globalLenis) {
    globalLenis.start();
    globalLenis.scrollTo(target, options);
  } else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      infinite: false,
    });

    globalLenis = lenis;

    // Enforce initial lock if hero is active
    if (isScrollLocked) {
      lenis.stop();
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      globalLenis = null;
    };
  }, []);

  return <>{children}</>;
}
