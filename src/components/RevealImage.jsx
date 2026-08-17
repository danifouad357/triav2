import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export default function RevealImage({ src, alt, className, style }) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "center 55%"]
  });

  // Reveal from left to right
  const clipPath = useTransform(scrollYProgress, [0, 1], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']);
  
  // Parallax the image slightly inside the mask
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  
  const isVideo = src && (src.endsWith('.webm') || src.endsWith('.mp4'));

  if (prefersReducedMotion) {
    if (isVideo) {
      return <video src={src} className={className} style={style} autoPlay muted loop playsInline />;
    }
    return <img src={src} alt={alt} className={className} style={style} />;
  }

  const commonProps = {
    src,
    style: { 
      width: '100%', 
      height: '100%', 
      objectFit: style?.objectFit || 'cover',
      clipPath,
      scale,
      transformOrigin: 'left center'
    }
  };

  return (
    <div ref={ref} style={{ ...style, overflow: 'hidden', position: 'relative' }} className={className}>
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.05)' }} />
      {isVideo ? (
        <motion.video {...commonProps} autoPlay muted loop playsInline />
      ) : (
        <motion.img {...commonProps} alt={alt} />
      )}
    </div>
  );
}
