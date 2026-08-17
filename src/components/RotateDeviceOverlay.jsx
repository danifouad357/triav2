import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone } from 'lucide-react';

export default function RotateDeviceOverlay({ onActiveChange }) {
  const [isActive, setIsActive] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  
  const isActiveRef = useRef(isActive);
  useEffect(() => { isActiveRef.current = isActive; }, [isActive]);

  useEffect(() => {
    const checkOrientationAndScroll = () => {
      if (dismissed) {
        if (isActiveRef.current) {
          setIsActive(false);
          if (onActiveChange) onActiveChange(false);
        }
        return;
      }

      // Check if it's a mobile device (touch support and narrow screen in portrait)
      const isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches || (window.innerWidth < 768);
      const isPortrait = window.innerHeight > window.innerWidth;
      
      // Calculate how far down the page they've scrolled
      // If they've scrolled past the hero section (roughly viewport height), they can stay in portrait
      const scrollY = window.scrollY;
      const isAtTop = scrollY < (window.innerHeight * 0.75); 

      if (isMobile && isPortrait && isAtTop) {
        if (!isActiveRef.current) {
          setIsActive(true);
          if (onActiveChange) onActiveChange(true);
        }
      } else {
        if (isActiveRef.current) {
          setIsActive(false);
          if (onActiveChange) onActiveChange(false);
        }
      }
    };

    checkOrientationAndScroll();

    window.addEventListener('resize', checkOrientationAndScroll);
    window.addEventListener('scroll', checkOrientationAndScroll, { passive: true });
    window.addEventListener('orientationchange', checkOrientationAndScroll);

    return () => {
      window.removeEventListener('resize', checkOrientationAndScroll);
      window.removeEventListener('scroll', checkOrientationAndScroll);
      window.removeEventListener('orientationchange', checkOrientationAndScroll);
    };
  }, [dismissed, onActiveChange]);

  // If we block scroll while active, the user can never scroll down if their orientation is locked.
  // We apply overflow hidden to body when active, but provide a dismiss button just in case.
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] text-white p-8 text-center"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <motion.div
            animate={{ rotate: [0, -90, -90, 0, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 3, 
              ease: "easeInOut",
              times: [0, 0.3, 0.5, 0.8, 1]
            }}
            className="mb-10"
          >
            <Smartphone size={56} strokeWidth={1} className="text-[var(--color-brand-brass)]" />
          </motion.div>
          
          <h2 className="text-3xl font-serif mb-4 tracking-tight">Rotate your device.</h2>
          <p className="text-[rgba(255,255,255,0.6)] text-lg max-w-[280px] leading-relaxed mx-auto font-sans mb-12">
            For the best cinematic experience, please view this introduction in landscape mode.
          </p>
          
          <button 
            onClick={() => setDismissed(true)}
            className="text-xs uppercase tracking-widest text-[rgba(255,255,255,0.3)] hover:text-[rgba(255,255,255,0.7)] transition-colors py-2 px-4 border-b border-transparent hover:border-[rgba(255,255,255,0.3)]"
          >
            Continue in Portrait
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
