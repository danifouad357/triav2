import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import StartProject from '@/components/StartProject';

export default function WebDesignRestaurants() {
  useSEO({
    title: 'Restaurant Website Design UAE | Premium Hospitality Sites',
    description: 'Bespoke web design for restaurants and cafes in the UAE. We craft immersive digital dining experiences that drive reservations and showcase your menu.',
    primaryKeyword: 'restaurant website design',
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
              <span className="cs-system-font text-[var(--color-brass-deep)] mb-6 block">HOSPITALITY WEB DESIGN</span>
              <h1 className="text-5xl md:text-7xl font-serif text-[var(--color-ink)] mb-8 tracking-tight leading-[1.08]">
                Digital experiences as curated as your menu.
              </h1>
              <p className="text-xl md:text-2xl text-[var(--color-ink-muted)] font-serif leading-relaxed">
                For restaurants and cafes in the UAE, the dining experience starts online. We design websites that capture your atmosphere and drive seamless reservations.
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
              <h2 className="text-2xl font-serif text-[var(--color-ink)] mb-4">Serving the Perfect UI</h2>
              <p className="text-[var(--color-ink-muted)] text-base leading-relaxed mb-6">
                Most restaurant websites frustrate users with hidden menus, broken mobile layouts, and confusing reservation flows. We fix that. We focus on stunning culinary photography, intuitive mobile navigation, and frictionless booking.
              </p>
              <p className="text-[var(--color-ink-muted)] text-base leading-relaxed">
                Your online presence should be an extension of your dining room—elegant, welcoming, and flawlessly executed.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-serif text-[var(--color-ink)] mb-4">Key Features for Restaurants</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-brass-deep)] mt-1 text-sm font-semibold tracking-widest">01</span>
                  <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed"><strong>Interactive Menus:</strong> Beautifully formatted, highly legible, and easy to update without touching code.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-brass-deep)] mt-1 text-sm font-semibold tracking-widest">02</span>
                  <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed"><strong>Reservation Integrations:</strong> Seamless connections with platforms like SevenRooms, OpenTable, or custom booking systems.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-brass-deep)] mt-1 text-sm font-semibold tracking-widest">03</span>
                  <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed"><strong>Mobile Optimization:</strong> The majority of your customers will view your site on their phones. We ensure the mobile experience is paramount.</p>
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
