import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';

const packages = [
  {
    name: 'Launch',
    price: '1,700',
    description: 'A focused, professional website for businesses getting online.',
    features: [
      '1-3 pages',
      'Custom design',
      'Responsive',
      'Contact / WhatsApp',
      'Maps where relevant',
      'SEO fundamentals',
      'Domain & hosting setup',
      '1 revision round',
      'Launch & testing'
    ]
  },
  {
    name: 'Business',
    price: '4,500',
    description: 'A complete website for an operating business.',
    features: [
      '5-8 pages',
      'Custom page layouts',
      'CMS',
      'Content management',
      'Copy refinement',
      'Booking / enquiry flows',
      'Integrations',
      'Expanded SEO',
      'Analytics',
      '2 revision rounds',
      'Launch & testing'
    ],
    highlight: true
  },
  {
    name: 'Signature',
    price: '8,000',
    description: 'A high-end digital experience built around your brand.',
    features: [
      'Fully custom experience',
      'Advanced art direction',
      'Advanced animation',
      'Advanced CMS',
      'Dynamic content',
      'Custom tools',
      'API integrations',
      'E-commerce where appropriate',
      'Advanced SEO & performance',
      '3 revision rounds'
    ]
  }
];

const carePlans = [
  {
    name: 'Essential',
    price: '350',
    description: 'Routine maintenance and security.'
  },
  {
    name: 'Growth',
    price: '750',
    description: 'Active improvements and minor content updates.'
  },
  {
    name: 'Partner',
    price: '1,500',
    description: 'Dedicated technical partner for ongoing scaling.'
  }
];

export default function Pricing() {
  useSEO({
    title: 'Pricing & Packages',
    description: 'Clear packages. Custom scope. Explore our website design packages and ongoing care plans.'
  });

  return (
    <main className="min-h-screen pt-32 pb-24 bg-[var(--color-cream)]">
      <div className="container">
        
        {/* Header */}
        <div className="mb-20 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="cs-system-font text-[var(--color-brass-deep)] mb-6 block">06 // WEBSITE PACKAGES</span>
            <h1 className="text-5xl md:text-7xl font-serif text-[var(--color-ink)] mb-6 tracking-tight leading-[1.08]">
              Clear packages.<br/>
              Custom scope.
            </h1>
            <p className="text-xl text-[var(--color-ink-muted)] font-sans leading-relaxed">
              Every package is a complete website solution. Final scope and fixed price are confirmed before development. We do not use templates; every project is designed around your specific business.
            </p>
          </motion.div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`p-10 border ${
                pkg.highlight 
                  ? 'border-[var(--color-brass-deep)] bg-white relative' 
                  : 'border-[var(--color-hair-cream)] bg-transparent'
              }`}
            >
              {pkg.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-brass-deep)] text-white px-4 py-1 text-xs uppercase tracking-widest font-semibold">
                  Most Common
                </div>
              )}
              
              <div className="mb-8 border-b border-[var(--color-hair-cream)] pb-8">
                <h3 className="text-2xl font-serif text-[var(--color-ink)] mb-2">{pkg.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-sm font-semibold tracking-wider text-[var(--color-ink-muted)]">FROM AED</span>
                  <span className="text-4xl font-serif text-[var(--color-ink)]">{pkg.price}</span>
                </div>
                <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed h-10">
                  {pkg.description}
                </p>
              </div>

              <ul className="space-y-4 mb-10">
                {pkg.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-[var(--color-ink)]">
                    <Check size={16} className="text-[var(--color-brass-deep)] shrink-0 mt-0.5" />
                    <span className="leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link 
                to={`/contact?package=${pkg.name}`}
                className={`w-full py-4 flex items-center justify-center gap-2 uppercase tracking-widest text-xs font-semibold transition-colors ${
                  pkg.highlight
                    ? 'bg-[var(--color-ink)] text-white hover:bg-[var(--color-brass-deep)]'
                    : 'border border-[var(--color-ink)] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-white'
                }`}
              >
                Inquire Now <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Ongoing Care Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="border-t border-[var(--color-hair-cream)] pt-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <span className="cs-system-font text-[var(--color-brass-deep)] mb-4 block">ONGOING SUPPORT</span>
              <h3 className="text-3xl font-serif text-[var(--color-ink)] mb-4">Website Care</h3>
              <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed">
                A website requires maintenance to remain secure and performant. We offer optional care plans to handle technical updates, security, and ongoing improvements so you can focus on your business.
              </p>
            </div>
            <div className="md:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {carePlans.map((plan, i) => (
                  <div key={i} className="p-6 bg-white border border-[var(--color-hair-cream)]">
                    <h4 className="font-serif text-lg text-[var(--color-ink)] mb-1">{plan.name}</h4>
                    <div className="text-sm font-semibold tracking-wider text-[var(--color-ink-muted)] mb-3">
                      AED {plan.price} <span className="text-[10px]">/ MONTH</span>
                    </div>
                    <p className="text-xs text-[var(--color-ink-muted)] leading-relaxed">
                      {plan.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        {/* Free Audit Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="border-t border-[var(--color-hair-cream)] pt-20 mt-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center bg-white p-8 md:p-12 border border-[var(--color-hair-cream)]">
            <div className="md:col-span-8">
              <span className="cs-system-font text-[var(--color-brass-deep)] mb-4 block">NOT READY FOR A FULL BUILD?</span>
              <h3 className="text-3xl font-serif text-[var(--color-ink)] mb-4">Book Your Free Design Audit</h3>
              <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed max-w-2xl">
                We offer free, no-obligation design and performance audits for your existing website. We'll identify UX friction points, accessibility gaps, and opportunities for conversion optimization.
              </p>
            </div>
            <div className="md:col-span-4 flex justify-start md:justify-end">
              <Link 
                to="/contact?package=Audit"
                className="px-8 py-4 bg-[var(--color-ink)] text-white hover:bg-[var(--color-brass-deep)] transition-colors uppercase tracking-widest text-xs font-semibold flex items-center gap-2 whitespace-nowrap"
              >
                Book Free Audit <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
