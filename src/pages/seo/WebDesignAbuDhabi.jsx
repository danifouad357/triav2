import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import StartProject from '@/components/StartProject';

export default function WebDesignAbuDhabi() {
  useSEO({
    title: 'Web Design Abu Dhabi | Premium Website Development',
    description: 'TRIA Design is a premium web design and development studio in Abu Dhabi. We create distinctive, high-performance websites for ambitious businesses across the UAE.',
    primaryKeyword: 'web design Abu Dhabi',
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
              <span className="cs-system-font text-[var(--color-brass-deep)] mb-6 block">WEB DESIGN ABU DHABI</span>
              <h1 className="text-5xl md:text-7xl font-serif text-[var(--color-ink)] mb-8 tracking-tight leading-[1.08]">
                Distinctive digital experiences for ambitious Abu Dhabi businesses.
              </h1>
              <p className="text-xl md:text-2xl text-[var(--color-ink-muted)] font-serif leading-relaxed">
                We are an independent web design studio based in Abu Dhabi. We don't use templates. We engineer bespoke websites from the ground up to reflect the true value of your brand.
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
              <h2 className="text-2xl font-serif text-[var(--color-ink)] mb-4">Our Approach to Web Design</h2>
              <p className="text-[var(--color-ink-muted)] text-base leading-relaxed mb-6">
                In a crowded market like Abu Dhabi, a generic website is a liability. Your digital presence should be a strategic asset. We focus on brutal simplicity, seamless user experience, and technical excellence to ensure your website stands out and converts.
              </p>
              <p className="text-[var(--color-ink-muted)] text-base leading-relaxed">
                Whether you need a high-end corporate presence, an immersive product showcase, or a robust e-commerce platform, our design process is meticulous and intentional.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-serif text-[var(--color-ink)] mb-4">What We Deliver</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-brass-deep)] mt-1 text-sm font-semibold tracking-widest">01</span>
                  <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed"><strong>Strategic UX/UI Design:</strong> Interfaces designed for cognitive ease and brand distinction.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-brass-deep)] mt-1 text-sm font-semibold tracking-widest">02</span>
                  <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed"><strong>Custom Development:</strong> Performant architecture using modern stacks (React, WebGL, Edge deployments).</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-brass-deep)] mt-1 text-sm font-semibold tracking-widest">03</span>
                  <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed"><strong>Technical SEO:</strong> Built-in optimization for Abu Dhabi and UAE local search rankings.</p>
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
              to="/work"
              className="px-8 py-4 border border-[var(--color-ink)] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-white transition-colors uppercase tracking-widest text-xs font-semibold flex items-center justify-center gap-2"
            >
              View Our Work
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
      <StartProject />
    </>
  );
}
