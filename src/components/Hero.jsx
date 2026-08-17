import CinematicSequence from './CinematicSequence';

export default function Hero() {
  return (
    <>
      <CinematicSequence />
      
      {/* Clients Banner */}
      <section id="ambitious-businesses" className="section" style={{ padding: '0', marginBottom: 'var(--space-xl)' }}>
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[var(--color-border)] py-4 gap-4">
            <span className="text-small">BUILT FOR AMBITIOUS BUSINESSES</span>
            <div className="flex flex-wrap gap-4 text-[var(--color-text-muted)] text-sm">
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
