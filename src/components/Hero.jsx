import CinematicSequence from './CinematicSequence';

export default function Hero() {
  return (
    <>
      <CinematicSequence />
      
      {/* Clients Banner */}
      <section id="ambitious-businesses" className="section" style={{ padding: '0', marginBottom: 'var(--space-xl)' }}>
        <div className="container">
          <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid var(--color-border)',
            padding: 'var(--space-sm) 0',
            flexWrap: 'wrap',
            gap: 'var(--space-md)'
          }}>
            <span className="text-small">BUILT FOR AMBITIOUS BUSINESSES</span>
            <div style={{ display: 'flex', gap: 'var(--space-md)', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
              <span>Hospitality</span>
              <span>Healthcare</span>
              <span>Professional services</span>
              <span>Retail</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
