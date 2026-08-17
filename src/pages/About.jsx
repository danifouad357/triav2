import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';

export default function About() {
  useSEO({
    title: 'About the Studio',
    description: 'We believe a website should be an artifact of clear decisions. Learn about our philosophy, architecture, and approach to web design.'
  });

  return (
    <main className="min-h-screen pt-32 pb-24 bg-[var(--color-cream)]">
      <div className="container max-w-4xl">
        
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="cs-system-font text-[var(--color-brass-deep)] mb-6 block">07 // THE STUDIO</span>
            <h1 className="text-5xl md:text-7xl font-serif text-[var(--color-ink)] mb-8 tracking-tight leading-[1.08]">
              Restrained, precise, considered. Quiet until it isn't.
            </h1>
            <p className="text-xl md:text-2xl text-[var(--color-ink-muted)] font-serif leading-relaxed">
              TRIA is intentionally small. You work directly with the designer and developer responsible for the outcome — without layers of account managers, unnecessary bureaucracy, or a template assembly line.
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
            <h3 className="text-xl font-serif text-[var(--color-ink)] mb-4">Our Philosophy</h3>
            <p className="text-[var(--color-ink-muted)] text-base leading-relaxed mb-6">
              We believe a website should be an artifact of clear decisions. Too many agencies treat the web as a dumping ground for content, masking weak strategy behind flashy templates. We build from the ground up, ensuring every layout, interaction, and word serves a distinct purpose.
            </p>
            <p className="text-[var(--color-ink-muted)] text-base leading-relaxed">
              We favor speed, technical excellence, and brutal simplicity over fleeting trends. A website should feel instantly ready before a visitor has time to leave, and it should move with deliberate, meticulous care.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-serif text-[var(--color-ink)] mb-4">Technical Evidence</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-brass-deep)] mt-1 text-sm font-semibold tracking-widest">01</span>
                <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed"><strong>Custom WebGL Architecture:</strong> We don't rely on bloated video players. We engineer our own rendering pipelines for silky smooth, low-latency visual sequences.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-brass-deep)] mt-1 text-sm font-semibold tracking-widest">02</span>
                <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed"><strong>Edge-Deployed Backends:</strong> Our infrastructure lives on the edge, ensuring near-instant API responses and seamless global scale without the overhead of legacy servers.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-brass-deep)] mt-1 text-sm font-semibold tracking-widest">03</span>
                <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed"><strong>Performance Budgets:</strong> Every project adheres to strict performance thresholds. We optimize assets at compile time, eliminating unnecessary network round-trips.</p>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="border-t border-[var(--color-hair-cream)] pt-16 flex flex-col sm:flex-row gap-6 justify-center"
        >
          <Link 
            to="/pricing"
            className="px-8 py-4 border border-[var(--color-ink)] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-white transition-colors uppercase tracking-widest text-xs font-semibold flex items-center justify-center gap-2"
          >
            View Packages
          </Link>
          <Link 
            to="/contact"
            className="px-8 py-4 bg-[var(--color-ink)] text-white hover:bg-[var(--color-brass-deep)] transition-colors uppercase tracking-widest text-xs font-semibold flex items-center justify-center gap-2"
          >
            Start a Project <ArrowRight size={14} />
          </Link>
        </motion.div>

      </div>
    </main>
  );
}
