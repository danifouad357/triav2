import RevealText from './RevealText';

export default function Capabilities() {
  const capabilities = [
    { num: '01', text: 'Web design — art direction, UX, wireframes, visual design' },
    { num: '02', text: 'Web development — responsive, production-ready implementation' },
    { num: '03', text: 'SEO & performance — foundations, analytics, optimization' },
    { num: '04', text: 'Conversion — clear journeys, actions, and focused structure' },
    { num: '05', text: 'CMS & content — practical systems your team can edit' },
    { num: '06', text: 'Website care — maintenance, improvements, and support' },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="grid-2" style={{ alignItems: 'start' }}>
          <div>
            <span className="eyebrow">03 / SELECTED CAPABILITIES</span>
            <RevealText style={{ marginBottom: 'var(--space-md)' }}>Design, development, and the details between.</RevealText>
            <p style={{ maxWidth: '400px' }}>
              A compact studio built to take a website from early structure to a production-ready launch.
            </p>
          </div>
          
          <div style={{ borderTop: '1px solid var(--color-border)' }}>
            {capabilities.map((cap, index) => (
              <div key={index} style={{ 
                display: 'flex',
                gap: 'var(--space-md)',
                padding: '1.25rem 0',
                borderBottom: '1px solid var(--color-border)',
                alignItems: 'center'
              }}>
                <span className="text-small" style={{ color: 'var(--color-text-muted)' }}>{cap.num}</span>
                <span style={{ fontWeight: 500 }}>{cap.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
