import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import StartProject from '@/components/StartProject';

export default function WebDevelopmentAbuDhabi() {
  useSEO({
    title: 'Web Development Abu Dhabi | High-Performance Architecture',
    description: 'TRIA Design specializes in custom web development in Abu Dhabi. We engineer fast, secure, and highly interactive websites using modern technologies.',
    primaryKeyword: 'web development Abu Dhabi',
  });

  return (
    <>
      <main className="min-h-screen pt-32 pb-24 bg-[var(--color-cream)]">
        <div className="container max-w-4xl">
          
          <div className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="cs-system-font text-[var(--color-brass-deep)] mb-6 block">WEB DEVELOPMENT ABU DHABI</span>
              <h1 className="text-5xl md:text-7xl font-serif text-[var(--color-ink)] mb-8 tracking-tight leading-[1.08]">
                Robust, scalable, and blazingly fast web development.
              </h1>
              <p className="text-xl md:text-2xl text-[var(--color-ink-muted)] font-serif leading-relaxed">
                A beautiful design means nothing if it's slow or broken. Our Abu Dhabi-based development team engineers digital platforms that perform flawlessly under pressure.
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32"
          >
            <div>
              <h2 className="text-2xl font-serif text-[var(--color-ink)] mb-4">Engineering Philosophy</h2>
              <p className="text-[var(--color-ink-muted)] text-base leading-relaxed mb-6">
                We believe in writing clean, modular code. We avoid heavy, bloated frameworks and rely on modern web standards to deliver lightning-fast load times. We handle everything from fluid front-end animations to secure backend integrations.
              </p>
              <p className="text-[var(--color-ink-muted)] text-base leading-relaxed">
                For businesses in Abu Dhabi that require more than a basic template, our custom development provides the foundation for sustainable digital growth.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-serif text-[var(--color-ink)] mb-4">Technical Capabilities</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-brass-deep)] mt-1 text-sm font-semibold tracking-widest">01</span>
                  <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed"><strong>Front-End Architecture:</strong> React, Next.js, and Vite for dynamic, instant-loading interfaces.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-brass-deep)] mt-1 text-sm font-semibold tracking-widest">02</span>
                  <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed"><strong>Creative Engineering:</strong> WebGL and advanced physics-based animations that never drop frames.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-brass-deep)] mt-1 text-sm font-semibold tracking-widest">03</span>
                  <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed"><strong>Content Management:</strong> Headless CMS integrations that give your team complete control without compromising speed.</p>
                </li>
              </ul>
            </div>
          </motion.div>

        </div>
      </main>
      <StartProject />
    </>
  );
}
