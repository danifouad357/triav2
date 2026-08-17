import RevealText from './RevealText';

export default function Studio() {
  return (
    <section className="section" style={{ backgroundColor: '#f4f3f0' }}>
      <div className="container">
        <div className="grid-2" style={{ alignItems: 'center' }}>
          
          <img 
            src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Studio pottery"
            style={{ width: '100%', height: '600px', objectFit: 'cover' }}
          />

          <div style={{ padding: '0 var(--space-md)' }}>
            <span className="eyebrow">07 / THE STUDIO</span>
            <div style={{ maxWidth: '600px' }}>
              <RevealText style={{ marginBottom: 'var(--space-md)' }}>Small studio. Serious attention to detail.</RevealText>
            </div>
            <p style={{ marginBottom: 'var(--space-xl)', color: 'var(--color-text)' }}>
              TRIA is intentionally small. You work directly with the designer and developer responsible for the outcome—without layers of account managers, unnecessary bureaucracy, or a template assembly line.
            </p>
            <span className="text-small" style={{ color: 'var(--color-text-muted)' }}>
              Based in the UAE. Working with businesses locally and internationally.
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
