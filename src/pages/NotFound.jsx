import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';

export default function NotFound() {
  useSEO({
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist.'
  });

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
      <div className="container max-w-2xl text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="cs-system-font text-[var(--color-text-muted)] mb-6 block">404 // NOT FOUND</span>
          <h1 className="text-4xl md:text-5xl font-serif text-[var(--color-text)] mb-8 tracking-tight">
            We couldn't find this page.
          </h1>
          <p className="text-lg text-[var(--color-text-muted)] font-serif leading-relaxed mb-12">
            The link you followed may be broken, or the page may have been removed.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/"
              className="px-8 py-4 border border-[var(--color-text)] text-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] transition-colors uppercase tracking-widest text-xs font-semibold flex items-center justify-center gap-2"
            >
              Return Home
            </Link>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
