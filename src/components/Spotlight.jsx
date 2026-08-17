import { useEffect, useRef } from 'react';

export default function Spotlight({ containerRef, color = 'rgba(197, 160, 89, 0.15)', size = 600 }) {
  const spotlightRef = useRef(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !spotlightRef.current) return;
    
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      spotlightRef.current.style.display = 'none';
      return;
    }

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spotlightRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, ${color} 0%, transparent ${size / 2}px)`;
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, [containerRef, color, size]);

  return (
    <div 
      ref={spotlightRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 0,
        transition: 'opacity 0.3s ease',
        background: `radial-gradient(circle at 50% 0%, ${color} 0%, transparent ${size / 2}px)`
      }}
    />
  );
}
