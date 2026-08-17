import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import RevealText from '@/components/RevealText';
import { projects } from '@/data/projects';
import { useSEO } from '@/hooks/useSEO';

export default function WorkIndex() {
  useSEO({
    title: 'Work',
    description: 'Explore our portfolio of distinctive digital experiences built for ambitious businesses.'
  });

  return (
    <main className="pt-32 pb-24">
      <div className="container">
        <div className="mb-16">
          <RevealText text="Selected Work" tag="h1" className="text-display-lg font-serif mb-4" />
          <RevealText text="A collection of our recent projects, focused on creating premium digital experiences." tag="p" className="text-xl text-[var(--color-text-muted)] max-w-2xl" delay={0.2} />
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, i) => (
            <Link 
              key={project.slug} 
              to={`/work/${project.slug}`}
              className="group block"
            >
              <div className="relative aspect-video mb-6 overflow-hidden bg-[var(--color-border)]">
                {project.images?.thumbnail ? (
                  project.images.thumbnail.endsWith('.webm') || project.images.thumbnail.endsWith('.mp4') ? (
                    <video 
                      src={project.images.thumbnail} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      autoPlay muted loop playsInline
                    />
                  ) : (
                    <img 
                      src={project.images.thumbnail} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[var(--color-text-muted)]">
                    Image pending
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-serif mb-2 group-hover:text-[var(--color-brand-brass)] transition-colors">{project.title}</h3>
                  <p className="text-[var(--color-text-muted)] mb-3">{project.hook}</p>
                  <div className="flex gap-2 flex-wrap">
                    {project.services.slice(0, 2).map((service, idx) => (
                      <span key={idx} className="text-xs uppercase tracking-wider border border-[var(--color-border)] px-2 py-1">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center group-hover:bg-[var(--color-text)] group-hover:text-[var(--color-bg)] group-hover:border-[var(--color-text)] transition-all duration-300 shrink-0">
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
