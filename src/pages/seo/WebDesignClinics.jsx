import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import StartProject from '@/components/StartProject';

export default function WebDesignClinics() {
  useSEO({
    title: 'Clinic Website Design UAE | Healthcare Web Development',
    description: 'We design premium, secure, and user-friendly websites for clinics and medical professionals in the UAE. Build trust and streamline patient bookings.',
    primaryKeyword: 'clinic website design UAE',
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
              <span className="cs-system-font text-[var(--color-brass-deep)] mb-6 block">HEALTHCARE WEB DESIGN</span>
              <h1 className="text-5xl md:text-7xl font-serif text-[var(--color-ink)] mb-8 tracking-tight leading-[1.08]">
                Designing trust, clarity, and credibility.
              </h1>
              <p className="text-xl md:text-2xl text-[var(--color-ink-muted)] font-serif leading-relaxed">
                For clinics and healthcare providers in the UAE, trust is your most valuable asset. We build websites that communicate clinical excellence and put patient care first.
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
              <h2 className="text-2xl font-serif text-[var(--color-ink)] mb-4">Patient-Centric Digital Design</h2>
              <p className="text-[var(--color-ink-muted)] text-base leading-relaxed mb-6">
                A medical website must balance authoritative information with an empathetic, accessible user experience. We organize complex medical services, doctor profiles, and vital information into clean, easily navigable layouts.
              </p>
              <p className="text-[var(--color-ink-muted)] text-base leading-relaxed">
                We remove the friction from the patient journey, ensuring that finding information and booking appointments is a stress-free experience.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-serif text-[var(--color-ink)] mb-4">Crucial Healthcare Features</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-brass-deep)] mt-1 text-sm font-semibold tracking-widest">01</span>
                  <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed"><strong>Clear Architecture:</strong> Intuitive navigation for treatments, services, and facility information.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-brass-deep)] mt-1 text-sm font-semibold tracking-widest">02</span>
                  <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed"><strong>Appointment Booking:</strong> Secure, integrated scheduling systems that integrate with your clinic's existing management software.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-brass-deep)] mt-1 text-sm font-semibold tracking-widest">03</span>
                  <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed"><strong>Doctor Profiles:</strong> Professional showcases highlighting expertise, credentials, and patient reviews to establish authority.</p>
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
