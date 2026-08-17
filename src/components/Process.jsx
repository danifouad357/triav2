import { useState, useRef, useEffect } from 'react';
import Spotlight from './Spotlight';

export default function Process() {
  const containerRef = useRef(null);
  const steps = [
    { num: '01', title: 'Discover', desc: 'Requirements, content, references, audience, and scope.', deliverables: 'Project Brief, Timeline, Sitemap' },
    { num: '02', title: 'Strategy', desc: 'Define the structure, user journey, priorities, and fixed proposal.', deliverables: 'Wireframes, User Flow, Fixed Quote' },
    { num: '03', title: 'Design', desc: 'Develop the visual direction and key page layouts around real content.', deliverables: 'High-Fidelity Mockups, Design System' },
    { num: '04', title: 'Develop', desc: 'Build responsively, optimize performance, connect content, and test.', deliverables: 'Staging Link, CMS Setup, SEO Baseline' },
    { num: '05', title: 'Launch', desc: 'Final checks, deployment, domain setup, handover, and support.', deliverables: 'Live Site, Handover Docs, 30-Day Support' }
  ];
  // Mouse tracking for particles
  const [mousePos, setMousePos] = useState(null);
  const canvasRef = useRef(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isMobile = window.innerWidth < 768;
      
      // Spawn logic
      if (isMobile) {
        // Mobile: Random glitter across entire section
        if (Math.random() > 0.5) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5 - 0.2, // float slightly up
            size: Math.random() * 1.5 + 0.5,
            life: 1,
            decay: Math.random() * 0.01 + 0.005
          });
        }
      } else if (isHoveringRef.current && mousePos) {
        // Desktop: Spawn in a wide radius around the cursor
        if (Math.random() > 0.3) {
          const angle = Math.random() * Math.PI * 2;
          const radius = 60 + Math.random() * 120;
          particles.push({
            x: mousePos.x + Math.cos(angle) * radius,
            y: mousePos.y + Math.sin(angle) * radius,
            vx: 0,
            vy: 0,
            size: Math.random() * 2 + 0.8,
            life: 1,
            decay: Math.random() * 0.015 + 0.01
          });
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        if (!isMobile && mousePos) {
          // Smooth absorption physics
          const dx = mousePos.x - p.x;
          const dy = mousePos.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist > 0) {
            // Magnetic pull towards the cursor that adapts smoothly
            const force = 0.5 + (100 / (dist + 50)); 
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
          
          // High friction to prevent slingshotting and ensure smooth following
          p.vx *= 0.82;
          p.vy *= 0.82;

          p.x += p.vx;
          p.y += p.vy;

          // Absorb rapidly when very close to the cursor
          if (dist < 15) {
            p.size *= 0.75;
            p.life -= 0.1;
          }
        } else {
          p.x += p.vx;
          p.y += p.vy;
        }
        
        p.size *= 0.98;
        p.life -= p.decay;

        if (p.life <= 0 || p.size < 0.1) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 200, 255, ${p.life * 0.8})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <section 
      id="process" 
      ref={containerRef} 
      className="section" 
      style={{ backgroundColor: 'var(--color-brand-blue)', color: 'var(--color-white)', position: 'relative', overflow: 'hidden' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => isHoveringRef.current = true}
      onMouseLeave={() => isHoveringRef.current = false}
    >
      <Spotlight containerRef={containerRef} color="rgba(255, 255, 255, 0.05)" />
      
      {/* Particle Overlay */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="grid-2" style={{ marginBottom: 'var(--space-lg)' }}>
          <div>
            <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.6)' }}>04 / PROCESS</span>
          </div>
          <div>
            <h2 style={{ color: 'var(--color-white)' }}>Clear stages. Fewer surprises.</h2>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }} className="process-list">
          {steps.map((step, index) => (
            <div key={index} style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr', 
              gap: 'var(--space-sm)',
              padding: '2rem 1rem',
              borderBottom: '1px solid rgba(255,255,255,0.2)',
              position: 'relative',
              cursor: 'default',
              margin: '0 -1rem'
            }}
            className="process-row"
            >
              <div className="grid-2" style={{ alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 'var(--space-xl)', alignItems: 'center' }}>
                  <span className="text-small process-num" style={{ color: 'rgba(255,255,255,0.6)', transition: 'color 0.3s ease' }}>{step.num}</span>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--color-white)', transition: 'color 0.3s ease, transform 0.3s ease' }} className="process-title">{step.title}</h3>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', maxWidth: '80%' }}>{step.desc}</p>
                  
                  <div className="tooltip-container" style={{ position: 'relative' }}>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      color: 'var(--color-brand-brass)', 
                      letterSpacing: '0.05em', 
                      textTransform: 'uppercase',
                      borderBottom: '1px dotted var(--color-brand-brass)',
                      cursor: 'help'
                    }}>Deliverables</span>
                    <div className="tooltip-content" style={{
                      position: 'absolute',
                      bottom: '100%',
                      right: '0',
                      marginBottom: '8px',
                      padding: '12px',
                      backgroundColor: 'var(--color-white)',
                      color: 'var(--color-text)',
                      fontSize: '0.75rem',
                      width: 'max-content',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      borderRadius: '4px',
                      opacity: 0,
                      visibility: 'hidden',
                      transition: 'all 0.2s ease',
                      transform: 'translateY(5px)',
                      pointerEvents: 'none'
                    }}>
                      <div style={{ fontWeight: 600, marginBottom: '4px' }}>What you get:</div>
                      <div>{step.deliverables}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          .tooltip-container:hover .tooltip-content {
            opacity: 1 !important;
            visibility: visible !important;
            transform: translateY(0) !important;
          }
          
          .process-row {
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            border-radius: 8px;
          }
          
          .process-row:hover {
            background-color: rgba(255, 255, 255, 0.04);
            transform: translateX(10px);
            border-color: transparent !important;
          }
          
          .process-row:hover + .process-row {
            border-top-color: transparent !important;
          }

          .process-list:hover .process-row:not(:hover) {
            opacity: 0.4;
          }
          
          .process-row:hover .process-title {
            color: var(--color-brand-brass) !important;
            transform: translateX(10px);
          }
          
          .process-row:hover .process-num {
            color: var(--color-brand-brass) !important;
          }
        `}} />
      </div>
    </section>
  );
}
