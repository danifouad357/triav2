import { motion } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';

export default function Privacy() {
  useSEO({
    title: 'Privacy Policy',
    description: 'Tria Design Privacy Policy and data handling practices.'
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
            Privacy Policy
          </h1>

          <div className="prose prose-lg prose-zinc max-w-none text-[var(--color-ink-muted)]">
            <p className="font-sans mb-8"><strong>Last Updated:</strong> [Date]</p>

            <h2 className="text-2xl font-serif text-[var(--color-ink)] mt-12 mb-4">1. Introduction</h2>
            <p className="font-sans mb-6">
              Tria Design ("we," "us," or "our") respects your privacy and is committed to protecting your personal data in accordance with the UAE Personal Data Protection Law (PDPL). This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or engage our services.
            </p>

            <h2 className="text-2xl font-serif text-[var(--color-ink)] mt-12 mb-4">2. Data We Collect</h2>
            <p className="font-sans mb-6">
              We may collect the following types of data:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Contact Information:</strong> Name, email address, phone number, and any other details provided via our contact forms.</li>
              <li><strong>Project Information:</strong> Details about your business, budget, and project requirements.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, and usage data collected automatically via cookies or analytics tools (such as Cloudflare Web Analytics).</li>
            </ul>

            <h2 className="text-2xl font-serif text-[var(--color-ink)] mt-12 mb-4">3. How We Use Your Data</h2>
            <p className="font-sans mb-6">
              Your data is used solely to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Respond to your inquiries and provide requested services.</li>
              <li>Communicate regarding project updates, proposals, and invoices.</li>
              <li>Improve our website performance and user experience.</li>
            </ul>

            <h2 className="text-2xl font-serif text-[var(--color-ink)] mt-12 mb-4">4. Data Sharing and Security</h2>
            <p className="font-sans mb-6">
              We do not sell, trade, or rent your personal information to third parties. We may share necessary data with trusted service providers (e.g., hosting platforms, email services) strictly for the purpose of operating our business and serving you. We employ industry-standard security measures to protect your data from unauthorized access.
            </p>

            <h2 className="text-2xl font-serif text-[var(--color-ink)] mt-12 mb-4">5. Your Rights (PDPL Compliance)</h2>
            <p className="font-sans mb-6">
              Under the UAE PDPL, you have the right to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your data ("Right to be Forgotten").</li>
              <li>Withdraw consent for data processing where applicable.</li>
            </ul>

            <h2 className="text-2xl font-serif text-[var(--color-ink)] mt-12 mb-4">6. Contact Us</h2>
            <p className="font-sans mb-6">
              If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact us at: <a href="mailto:[Contact Email]" className="text-[var(--color-ink)] underline hover:text-[var(--color-brass-deep)]">[Contact Email]</a>.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
