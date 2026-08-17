import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import RevealText from '@/components/RevealText';
import { projects } from '@/data/projects';
import { useSEO } from '@/hooks/useSEO';

const MediaRenderer = ({ src, alt, className }) => {
  if (!src) return null;
  const isVideo = src.endsWith('.webm') || src.endsWith('.mp4');
  if (isVideo) {
    return <video src={src} className={className} autoPlay muted loop playsInline />;
  }
  return <img src={src} alt={alt} className={className} />;
};

export default function ProjectSingle() {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);

  useSEO({
    title: project ? project.title : 'Project',
    description: project ? project.hook : 'Project details'
  });

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  return (
    <main className="pt-32 pb-24 min-h-screen">
      <div className="container">
        
        {/* Breadcrumb / Back button */}
        <Link to="/work" className="inline-flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors mb-12 uppercase tracking-widest text-xs font-mono">
          <ArrowLeft size={16} /> Back to Work
        </Link>

        {/* Hero Section */}
        <div className="mb-16 md:mb-24">
          <div className="grid md:grid-cols-2 gap-12 items-end mb-12">
            <div>
              <RevealText text={project.title} tag="h1" className="text-display-lg font-serif mb-6" />
              <RevealText text={project.hook} tag="p" className="text-2xl text-[var(--color-text-muted)] max-w-xl leading-relaxed" delay={0.1} />
            </div>
            
            <div className="flex flex-col gap-4 md:items-end">
              <div>
                <span className="block text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-1">Client</span>
                <span className="text-lg font-medium">{project.client}</span>
              </div>
              <div className="md:text-right">
                <span className="block text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-1">Services</span>
                <div className="flex flex-wrap gap-2 md:justify-end">
                  {project.services.map((s, i) => (
                    <span key={i} className="text-sm px-2 py-1 bg-[var(--color-border)] rounded-sm">{s}</span>
                  ))}
                </div>
              </div>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-[var(--color-brand-brass)] hover:opacity-80 transition-opacity">
                  Visit Project <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full aspect-video bg-[var(--color-border)] overflow-hidden">
            {project.images?.hero ? (
              <MediaRenderer src={project.images.hero} alt={`${project.title} Hero`} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[var(--color-text-muted)]">
                Hero Image (1920x1080)
              </div>
            )}
          </div>
        </div>

        {/* Content Breakdown */}
        <div className="max-w-4xl mx-auto space-y-24">
          
          {/* Challenge */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-sm uppercase tracking-widest text-[var(--color-brand-brass)] sticky top-32">The Challenge</h2>
            </div>
            <div className="md:col-span-2">
              <p className="text-xl leading-relaxed">{project.challenge}</p>
            </div>
          </div>

          {/* First Showcase Image */}
          {project.images?.showcase?.[0] && (
            <div className="w-full aspect-video bg-[var(--color-border)] overflow-hidden">
              <MediaRenderer src={project.images.showcase[0]} alt="Showcase 1" className="w-full h-full object-cover" />
            </div>
          )}

          {/* Approach */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-sm uppercase tracking-widest text-[var(--color-brand-brass)] sticky top-32">The Approach</h2>
            </div>
            <div className="md:col-span-2">
              <div className={project.images?.mobile ? "grid md:grid-cols-2 gap-8 items-start" : ""}>
                <p className="text-xl leading-relaxed">{project.approach}</p>
                {project.images?.mobile && (
                  <div className="w-full aspect-[9/16] bg-[var(--color-border)] overflow-hidden rounded-2xl shadow-xl shadow-black/20">
                    <MediaRenderer src={project.images.mobile} alt="Mobile View" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Second Showcase Image (if exists) */}
          {project.images?.showcase?.[1] && (
            <div className="w-full aspect-video bg-[var(--color-border)] overflow-hidden">
              <MediaRenderer src={project.images.showcase[1]} alt="Showcase 2" className="w-full h-full object-cover" />
            </div>
          )}

          {/* Outcome */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-sm uppercase tracking-widest text-[var(--color-brand-brass)] sticky top-32">The Outcome</h2>
            </div>
            <div className="md:col-span-2">
              <p className="text-xl leading-relaxed">{project.outcome}</p>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
