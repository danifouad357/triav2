import RevealText from './RevealText';

export default function WhyTria() {
  const points = [
    {
      num: '01',
      title: 'Designed around your business',
      desc: 'Not a template and not a recycled layout. Structure and visual direction are shaped around your goals, audience, and content.'
    },
    {
      num: '02',
      title: 'Built for performance',
      desc: 'Responsive, lightweight, technically sound websites with SEO-ready foundations and thoughtful media optimization.'
    },
    {
      num: '03',
      title: 'Direct collaboration',
      desc: 'You work directly with the person designing and building the site—without account-management layers or an assembly line.'
    }
  ];

  return (
    <section id="why-tria" className="section" style={{ backgroundColor: '#e9e8e3' }}>
      <div className="container">
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
          <div className="grid-2">
            <div>
              <span className="eyebrow">02 / WHY TRIA</span>
            </div>
            <div>
              <RevealText>A website should become one of your strongest brand assets.</RevealText>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--color-border)' }}>
          {points.map((point, index) => (
            <div key={index} style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr', 
              gap: 'var(--space-sm)',
              padding: 'var(--space-md) 0',
              borderBottom: '1px solid var(--color-border)'
            }}>
              <div className="grid-2" style={{ alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 'var(--space-xl)', alignItems: 'center' }}>
                  <span className="text-small" style={{ color: 'var(--color-brand-green)' }}>{point.num}</span>
                  <h3 style={{ fontSize: '1.5rem' }}>{point.title}</h3>
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem' }}>{point.desc}</p>
                  
                  {point.num === '03' && (
                    <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                        alt="Founder" 
                        style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} 
                      />
                      <div>
                        <span style={{ display: 'block', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text)' }}>Elias Thorne</span>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>BioMed background, self-taught developer</span>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
