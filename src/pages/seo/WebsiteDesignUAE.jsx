import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import StartProject from '@/components/StartProject';

export default function WebsiteDesignUAE() {
  useSEO({
    title: 'Website Design UAE | Distinctive Digital Experiences',
    description: 'TRIA is a UAE web design studio creating distinctive, high-performance websites for ambitious businesses across Dubai, Abu Dhabi, and beyond.',
    primaryKeyword: 'website design UAE',
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
              <span className="cs-system-font text-[var(--color-brass-deep)] mb-6 block">WEBSITE DESIGN UAE</span>
              <h1 className="text-5xl md:text-7xl font-serif text-[var(--color-ink)] mb-8 tracking-tight leading-[1.08]">
                Setting the digital standard in the UAE.
              </h1>
              <p className="text-xl md:text-2xl text-[var(--color-ink-muted)] font-serif leading-relaxed">
                Based in Abu Dhabi and serving clients across Dubai and the wider UAE, TRIA Design elevates local businesses with globally competitive digital experiences.
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
              <h2 className="text-2xl font-serif text-[var(--color-ink)] mb-4">A Regional Studio, Global Quality</h2>
              <p className="text-[var(--color-ink-muted)] text-base leading-relaxed mb-6">
                The UAE market demands excellence. Your website is often the first and most critical interaction a client has with your brand. We ensure it communicates authority, trust, and premium quality from the first second.
              </p>
              <p className="text-[var(--color-ink-muted)] text-base leading-relaxed">
                Whether you are a rising startup in Dubai or an established enterprise in Abu Dhabi, we partner with you to build digital platforms that drive real business outcomes.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-serif text-[var(--color-ink)] mb-4">Our UAE Presence</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-brass-deep)] mt-1 text-sm font-semibold tracking-widest">01</span>
                  <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed"><strong>Abu Dhabi Headquarters:</strong> Operating centrally to serve the nation's capital with bespoke digital solutions.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-brass-deep)] mt-1 text-sm font-semibold tracking-widest">02</span>
                  <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed"><strong>Dubai & Beyond:</strong> Working with ambitious brands across the Emirates who refuse to settle for templates.</p>
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
