import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import RevealText from './RevealText';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { 
      q: "How long does a website take?",
      a: "Most projects take between 4 to 8 weeks from kickoff to launch. A standard Business package usually takes 5 weeks, while more complex Signature projects with custom integrations can take up to 10 weeks."
    },
    { 
      q: "How much does a website cost?",
      a: "Our packages start at AED 1,700 for a focused launch site, and our comprehensive Business tier starts at AED 4,500. Custom signature projects start from AED 8,000 depending on the technical scope."
    },
    { 
      q: "Can I update the website myself?",
      a: "Yes. Every Business and Signature project includes a custom CMS (Content Management System) tailored to your specific content, allowing your team to update text, images, and add new pages without code."
    },
    { 
      q: "Do you help with SEO and performance?",
      a: "Technical SEO and performance optimization are built into our foundations. We ensure fast load times, proper semantic HTML, structured data, and responsive image loading to give you a strong baseline."
    },
    { 
      q: "What happens after launch?",
      a: "We offer 30 days of post-launch bug support. For ongoing maintenance, we have website care plans starting from AED 350/month to handle security updates, backups, and minor improvements."
    },
    { 
      q: "Do you work outside the UAE?",
      a: "Yes. While we are based in Dubai, we work with ambitious businesses internationally. All meetings and collaboration happen seamlessly online."
    }
  ];

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <section className="section" style={{ backgroundColor: '#f9f9f9' }}>
      <div className="container">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-xl)' }}>
          
          <div>
            <span className="eyebrow" style={{ display: 'block', marginBottom: 'var(--space-md)' }}>07 / FAQ</span>
            <RevealText>Useful answers before we begin.</RevealText>
          </div>

          <div style={{ borderTop: '1px solid var(--color-border)' }}>
            {faqs.map((faq, index) => (
              <div key={index} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <button 
                  onClick={() => toggle(index)}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '1.5rem 0',
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: 'var(--color-text)',
                    fontSize: '1rem'
                  }}
                >
                  <span style={{ fontWeight: 500 }}>{faq.q}</span>
                  {openIndex === index ? <Minus size={20} color="var(--color-text-muted)" /> : <Plus size={20} color="var(--color-text-muted)" />}
                </button>
                <div style={{ 
                  maxHeight: openIndex === index ? '500px' : '0', 
                  overflow: 'hidden', 
                  transition: 'max-height 0.3s ease-in-out'
                }}>
                  <p style={{ paddingBottom: '1.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
