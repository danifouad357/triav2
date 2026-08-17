import { ArrowRight } from 'lucide-react';
import { useMagnetic } from '../hooks/useMagnetic';
import CountUp from './CountUp';
import RevealText from './RevealText';
import Spotlight from './Spotlight';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

function MagneticButton() {
  const magneticRef = useMagnetic();
  return (
    <div ref={magneticRef} style={{ display: 'inline-block' }}>
      <Link to="/contact" className="btn" style={{ padding: '1.25rem 2.5rem', fontSize: '1rem' }}>
        Start a Project <ArrowRight size={18} />
      </Link>
    </div>
  );
}

export default function StartProject() {
  const containerRef = useRef(null);
  
  return (
    <section ref={containerRef} className="section" style={{ backgroundColor: '#111111', color: '#ffffff', position: 'relative', overflow: 'hidden' }}>
      <Spotlight containerRef={containerRef} color="rgba(197, 160, 89, 0.08)" />
      <div className="container">
        <div className="grid-2" style={{ gap: 'var(--space-xl)', alignItems: 'center' }}>
          
          <div>
            <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.6)' }}>09 / START A PROJECT</span>
            <RevealText as="h2" style={{ color: 'var(--color-white)', marginBottom: 'var(--space-md)' }}>Ready to build something extraordinary?</RevealText>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 'var(--space-lg)', fontSize: '1.1rem', maxWidth: '500px' }}>
              Tell us what you're building and we'll explore how to bring it to life with the right level of design, development, and support.
            </p>
            <a href="mailto:hello@triadesign.studio" style={{ color: 'var(--color-white)', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
              hello@triadesign.studio
            </a>
            <span style={{ display: 'block', marginTop: 'var(--space-sm)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)' }}>
              Replies within <CountUp to={24} suffix=" hours" />.
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 'var(--space-xl)' }}>
             <MagneticButton />
          </div>

        </div>
      </div>
    </section>
  );
}
