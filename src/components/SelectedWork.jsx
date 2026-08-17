import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import RevealImage from './RevealImage';
import RevealText from './RevealText';
import { projects } from '@/data/projects';

export default function SelectedWork() {
  const featuredProjects = projects.filter(p => p.featured).slice(0, 4);

  return (
    <section id="work" className="section bg-[var(--color-bg)]">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-lg)', marginBottom: 'var(--space-xl)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
            <div>
              <span className="eyebrow">01 / SELECTED WORK</span>
              <RevealText style={{ maxWidth: '600px' }}>Digital experiences, meticulously crafted.</RevealText>
            </div>
            <Link to="/work" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.875rem', marginTop: 'var(--space-md)' }} className="text-[var(--color-text)] hover:text-[var(--color-brand-brass)] transition-colors">
              View All Work <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Project One (Left Image, Right Text) */}
        {featuredProjects[0] && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-lg)', marginBottom: 'var(--space-xl)', alignItems: 'center' }}>
            <Link to={`/work/${featuredProjects[0].slug}`} className="project-image-wrapper group block" data-cursor-text="View">
              <RevealImage 
                src={featuredProjects[0].images?.thumbnail || "https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                alt={featuredProjects[0].title} 
                className="project-image transition-transform duration-700 group-hover:scale-105"
                style={{ width: '100%', aspectRatio: '16/9', height: 'auto', objectFit: 'cover' }}
              />
            </Link>
            <div style={{ padding: '0 var(--space-md)' }}>
              <h3 className="text-3xl font-serif mb-2">{featuredProjects[0].title}</h3>
              <p className="text-[var(--color-text-muted)] text-sm uppercase tracking-widest mb-4">{featuredProjects[0].client}</p>
              <p style={{ marginBottom: 'var(--space-md)' }}>{featuredProjects[0].hook}</p>
              <Link to={`/work/${featuredProjects[0].slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.875rem' }} className="hover:text-[var(--color-brand-brass)] transition-colors">
                Read Case Study <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}

        {/* Projects Two & Three (Grid) */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {featuredProjects.slice(1, 3).map((project) => (
            <div key={project.slug}>
              <Link to={`/work/${project.slug}`} className="project-image-wrapper group block mb-6" data-cursor-text="View">
                <RevealImage 
                  src={project.images?.thumbnail || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                  alt={project.title}
                  className="project-image transition-transform duration-700 group-hover:scale-105"
                  style={{ width: '100%', aspectRatio: '16/9', height: 'auto', objectFit: 'cover' }}
                />
              </Link>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 className="text-2xl font-serif mb-2">{project.title}</h3>
                  <p style={{ fontSize: '0.875rem' }} className="text-[var(--color-text-muted)]">{project.hook}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Four (Full Width) */}
        {featuredProjects[3] && (
          <div>
            <Link to={`/work/${featuredProjects[3].slug}`} className="project-image-wrapper group block mb-6" data-cursor-text="View">
              <RevealImage 
                src={featuredProjects[3].images?.thumbnail || "https://images.unsplash.com/photo-1600607687920-4e2a09c15468?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"} 
                alt={featuredProjects[3].title}
                className="project-image transition-transform duration-700 group-hover:scale-105"
                style={{ width: '100%', aspectRatio: '16/9', height: 'auto', objectFit: 'cover' }}
              />
            </Link>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 className="text-2xl font-serif mb-2">{featuredProjects[3].title}</h3>
                <p style={{ fontSize: '0.875rem' }} className="text-[var(--color-text-muted)]">{featuredProjects[3].hook}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
