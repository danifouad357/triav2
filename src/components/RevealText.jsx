import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export default function RevealText({ children, as: Component = 'h2', style, className }) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "center 60%"]
  });

  const text = typeof children === 'string' ? children : '';
  
  const singleY = useTransform(scrollYProgress, [0, 1], ['100%', '0%']);
  
  if (!text) {
    return (
      <Component ref={ref} style={{ overflow: 'hidden', paddingBottom: '0.1em', marginBottom: '-0.1em', ...style }} className={className}>
        <motion.div style={{ y: prefersReducedMotion ? 0 : singleY }}>
          {children}
        </motion.div>
      </Component>
    );
  }

  const words = text.split(' ');
  return (
    <Component ref={ref} style={{ ...style, display: 'flex', flexWrap: 'wrap' }} className={className}>
      {words.map((word, i) => (
        <Word key={i} word={word} i={i} total={words.length} scrollYProgress={scrollYProgress} prefersReducedMotion={prefersReducedMotion} />
      ))}
    </Component>
  );
}

function Word({ word, i, total, scrollYProgress, prefersReducedMotion }) {
  const start = (i / total) * 0.6; 
  const end = start + 0.4; 
  const y = useTransform(scrollYProgress, [start, end], ['100%', '0%']);
  
  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.25em', paddingBottom: '0.1em', marginBottom: '-0.1em' }}>
      <motion.span style={{ display: 'inline-block', y: prefersReducedMotion ? 0 : y }}>
        {word}
      </motion.span>
    </span>
  );
}
