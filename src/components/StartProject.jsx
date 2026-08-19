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
            <div className="flex flex-col gap-6">
              <div>
                <a href="mailto:triadesignteam@gmail.com" style={{ color: 'var(--color-white)', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                  triadesignteam@gmail.com
                </a>
                <span style={{ display: 'block', marginTop: 'var(--space-sm)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)' }}>
                  Replies within <CountUp to={24} suffix=" hours" />.
                </span>
              </div>
              
              <div className="pt-6 mt-6 border-t border-[rgba(255,255,255,0.1)]">
                <h4 className="text-sm font-serif text-white mb-2">Not ready for a full build?</h4>
                <p className="text-sm text-[rgba(255,255,255,0.6)] mb-3 max-w-md">
                  We offer <strong>free design audits</strong> for existing websites. We'll identify UX friction points, accessibility gaps, and opportunities for conversion optimization.
                </p>
                <Link to="/contact?package=Audit" className="text-xs uppercase tracking-widest font-semibold text-[var(--color-brass-deep)] hover:text-white transition-colors flex items-center gap-2">
                  Book your free audit <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 'var(--space-xl)' }}>
             <MagneticButton />
          </div>

        </div>
      </div>
    </section>
  );
}
