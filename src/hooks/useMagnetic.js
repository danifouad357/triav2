import { useEffect, useRef } from 'react';

export function useMagnetic() {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const h = rect.width / 2;
      const w = rect.height / 2;
      targetX = (e.clientX - rect.left - h) * 0.2; // pull strength
      targetY = (e.clientY - rect.top - w) * 0.2;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };
    
    const animate = () => {
      x = lerp(x, targetX, 0.1);
      y = lerp(y, targetY, 0.1);
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      requestAnimationFrame(animate);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    const animId = requestAnimationFrame(animate);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
      element.style.transform = '';
    };
  }, []);

  return ref;
}
