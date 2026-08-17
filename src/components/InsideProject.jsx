export default function InsideProject() {
  return (
    <section className="section">
      <div className="container">
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
          <div>
            <span className="eyebrow">05 / INSIDE A PROJECT</span>
            <h2 style={{ maxWidth: '600px' }}>A website is an artifact of clear decisions.</h2>
          </div>
          <span className="text-small" style={{ color: 'var(--color-text-muted)' }}>CASE-STUDY PLACEHOLDER</span>
        </div>

        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
          alt="Inside project placeholder"
          style={{ width: '100%', height: '500px', objectFit: 'cover', marginBottom: 'var(--space-lg)' }}
        />

        <div className="grid-3" style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-md)' }}>
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>THE CHALLENGE</h4>
            <p style={{ fontSize: '0.875rem' }}>Replace with the real business problem, audience needs, and constraints.</p>
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>THE APPROACH</h4>
            <p style={{ fontSize: '0.875rem' }}>Replace with the strategic, visual, and technical decisions made.</p>
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>THE FINAL EXPERIENCE</h4>
            <p style={{ fontSize: '0.875rem' }}>Replace with verified outcomes and metrics only when genuine data exists.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
