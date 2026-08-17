import { motion } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';

export default function Terms() {
  useSEO({
    title: 'Terms and Conditions',
    description: 'Tria Design Terms and Conditions for web design and development services.'
  });

  return (
    <main className="min-h-screen pt-32 pb-24 bg-[var(--color-cream)]">
      <div className="container max-w-3xl">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="cs-system-font text-[var(--color-brass-deep)] mb-6 block">LEGAL</span>
          <h1 className="text-4xl md:text-5xl font-serif text-[var(--color-ink)] mb-12 tracking-tight">
            Terms and Conditions
          </h1>

          <div className="prose prose-lg prose-zinc max-w-none text-[var(--color-ink-muted)]">
            <p className="font-sans mb-8"><strong>Effective Date:</strong> [Date]</p>

            <h2 className="text-2xl font-serif text-[var(--color-ink)] mt-12 mb-4">1. Introduction</h2>
            <p className="font-sans mb-6">
              These Terms and Conditions govern the provision of web design and development services by Tria Design ("we," "us," or "our") to the client ("you"). By engaging our services or paying a deposit, you agree to be bound by these terms.
            </p>

            <h2 className="text-2xl font-serif text-[var(--color-ink)] mt-12 mb-4">2. Services and Scope</h2>
            <p className="font-sans mb-6">
              We will provide the services as detailed in the final project proposal or scope of work document agreed upon before development begins. Any additional work outside this scope will be quoted separately.
            </p>

            <h2 className="text-2xl font-serif text-[var(--color-ink)] mt-12 mb-4">3. Payment Terms</h2>
            <p className="font-sans mb-6">
              Unless otherwise specified in the project proposal, payment is structured as follows:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>50% deposit</strong> required prior to commencing any work.</li>
              <li><strong>50% final payment</strong> due upon completion, prior to the launch or handover of the website.</li>
            </ul>
            <p className="font-sans mb-6">
              Deposits are non-refundable once work has commenced. All prices are in AED unless otherwise stated.
            </p>

            <h2 className="text-2xl font-serif text-[var(--color-ink)] mt-12 mb-4">4. Revisions</h2>
            <p className="font-sans mb-6">
              The number of revision rounds is specified in your chosen package (e.g., 1 round for Launch, 2 for Business, 3 for Signature). Additional revisions outside these rounds will be billed at our hourly rate.
            </p>

            <h2 className="text-2xl font-serif text-[var(--color-ink)] mt-12 mb-4">5. Client Responsibilities</h2>
            <p className="font-sans mb-6">
              You agree to provide all necessary content (text, images, branding assets) required for the project in a timely manner. Delays in providing content may result in project delays.
            </p>

            <h2 className="text-2xl font-serif text-[var(--color-ink)] mt-12 mb-4">6. Intellectual Property</h2>
            <p className="font-sans mb-6">
              Upon final payment, full intellectual property rights to the final website design and custom code are transferred to you. We retain the right to display the completed project in our portfolio and marketing materials.
            </p>

            <h2 className="text-2xl font-serif text-[var(--color-ink)] mt-12 mb-4">7. Warranties and Liability</h2>
            <p className="font-sans mb-6">
              We warrant that the website will function as specified upon handover. However, we are not liable for issues arising from third-party services, plugins, or client modifications made after the launch.
            </p>

            <h2 className="text-2xl font-serif text-[var(--color-ink)] mt-12 mb-4">8. Governing Law</h2>
            <p className="font-sans mb-6">
              These terms shall be governed by and construed in accordance with the laws of the United Arab Emirates. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the Courts of Abu Dhabi.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
