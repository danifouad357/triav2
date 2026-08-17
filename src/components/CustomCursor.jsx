import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [text, setText] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (isReducedMotion) return;

    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;
    
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, .cursor-hover-target, [data-cursor-text]');
      if (target) {
        setIsActive(true);
        if (target.dataset.cursorText) {
          setText(target.dataset.cursorText);
        } else if (target.tagName.toLowerCase() === 'a' && target.target === '_blank') {
          setText('↗');
        } else {
          setText('');
        }
      } else {
        setIsActive(false);
        setText('');
      }
    };

    const render = () => {
      cursorX = lerp(cursorX, mouseX, 0.2);
      cursorY = lerp(cursorY, mouseY, 0.2);
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      }
      requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    requestAnimationFrame(render);

    document.body.style.cursor = 'none';
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      a, button, input, textarea, select, .cursor-hover-target, [data-cursor-text] { cursor: none !important; }
    `;
    document.head.appendChild(styleEl);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = '';
      if(document.head.contains(styleEl)) document.head.removeChild(styleEl);
    };
  }, [isReducedMotion]);

  if (isReducedMotion) return null;

  return (
    <div 
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: isActive ? (text ? 'auto' : '40px') : '24px',
        height: isActive ? (text ? '32px' : '40px') : '24px',
        padding: text ? '0 16px' : '0',
        borderRadius: '30px',
        border: isActive && !text ? 'none' : '2px solid var(--color-brand-brass)',
        backgroundColor: isActive ? (text ? 'var(--color-brand-brass)' : 'rgba(197, 160, 89, 0.1)') : 'transparent',
        mixBlendMode: 'difference',
        pointerEvents: 'none',
        zIndex: 9999,
        marginLeft: isActive && text ? '-50%' : (isActive ? '-20px' : '-12px'),
        marginTop: isActive && text ? '-16px' : (isActive ? '-20px' : '-12px'),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s, border 0.3s, margin 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <span style={{ 
        color: 'var(--color-white)', 
        fontSize: '0.75rem', 
        fontWeight: 600, 
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        opacity: text ? 1 : 0,
        transition: 'opacity 0.2s',
        display: text ? 'block' : 'none'
      }}>
        {text}
      </span>
    </div>
  );
}
