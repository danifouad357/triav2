import { useEffect, useRef, useState } from 'react';
import { useInView, animate, useReducedMotion } from 'framer-motion';

export default function CountUp({ from = 0, to, duration = 2, delay = 0, suffix = '', className, style }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const prefersReducedMotion = useReducedMotion();
  const [value, setValue] = useState(prefersReducedMotion ? to : from);

  useEffect(() => {
    if (isInView && !prefersReducedMotion) {
      const controls = animate(from, to, {
        duration,
        delay,
        ease: "easeOut",
        onUpdate(value) {
          setValue(Math.round(value));
        }
      });
      return () => controls.stop();
    }
  }, [isInView, from, to, duration, delay, prefersReducedMotion]);

  return <span ref={ref} className={className} style={style}>{value}{suffix}</span>;
}
