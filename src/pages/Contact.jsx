import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';
import { Turnstile } from '@marsidev/react-turnstile';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const packageParam = searchParams.get('package');

  useSEO({
    title: 'Contact',
    description: 'Tell us what you are building and we will explore how to bring it to life.'
  });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: packageParam ? `Package: ${packageParam}` : 'New Website',
    budget: '',
    details: '',
    honeypot: ''
  });
  
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');

  // Handle URL changes to auto-update form
  useEffect(() => {
    if (packageParam) {
      setFormData(prev => ({ ...prev, projectType: `Package: ${packageParam}` }));
    }
  }, [packageParam]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          'cf-turnstile-response': turnstileToken
        })
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error('Contact form error:', err);
      setStatus('error');
      setErrorMessage('A network error occurred. Please try again or use the fallback email below.');
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-24 bg-[var(--color-cream)]">
      <div className="container max-w-4xl">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="cs-system-font text-[var(--color-brass-deep)] mb-6 block">04 // CONTACT</span>
            <h1 className="text-5xl md:text-7xl font-serif text-[var(--color-ink)] mb-8 tracking-tight">
              Start a Project.
            </h1>
            <p className="text-xl text-[var(--color-ink-muted)] max-w-2xl font-sans">
              Tell us about your objectives. We'll review your requirements and get back to you within 24 hours to schedule a discovery call.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
          {/* Form Column */}
          <div className="md:col-span-8">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-8 md:p-12 border border-[var(--color-hair-cream)] rounded-sm"
                >
                  <h3 className="text-2xl font-serif text-[var(--color-ink)] mb-4">Request Received</h3>
                  <p className="text-[var(--color-ink-muted)] font-sans">
                    Thank you for reaching out. We have received your inquiry and will be in touch shortly to discuss the next steps.
                  </p>
                  <button 
                    onClick={() => { setStatus('idle'); setFormData({...formData, details: ''}) }}
                    className="mt-8 px-6 py-3 border border-[var(--color-brass-deep)] text-[var(--color-brass-deep)] hover:bg-[var(--color-brass-deep)] hover:text-white transition-colors text-sm uppercase tracking-wider font-medium"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  {/* Honeypot */}
                  <div className="hidden" aria-hidden="true">
                    <input type="text" name="honeypot" tabIndex="-1" autoComplete="off" value={formData.honeypot} onChange={handleChange} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs uppercase tracking-widest text-[var(--color-ink-muted)] font-semibold">Full Name *</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        autoComplete="name"
                        inputMode="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-[var(--color-ink-muted)] border-opacity-30 py-3 focus:outline-none focus-visible:border-[var(--color-ink)] focus-visible:border-b-2 transition-colors text-base min-h-[44px]"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs uppercase tracking-widest text-[var(--color-ink-muted)] font-semibold">Email Address *</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        autoComplete="email"
                        inputMode="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-[var(--color-ink-muted)] border-opacity-30 py-3 focus:outline-none focus-visible:border-[var(--color-ink)] focus-visible:border-b-2 transition-colors text-base min-h-[44px]"
                        placeholder="jane@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label htmlFor="projectType" className="text-xs uppercase tracking-widest text-[var(--color-ink-muted)] font-semibold">Interest</label>
                      <select 
                        id="projectType" 
                        name="projectType" 
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-[var(--color-ink-muted)] border-opacity-30 py-3 focus:outline-none focus-visible:border-[var(--color-ink)] focus-visible:border-b-2 transition-colors text-base min-h-[44px] appearance-none rounded-none"
                      >
                        <option value="New Website">New Website</option>
                        <option value="Web App / Platform">Web App / Platform</option>
                        <option value="Package: Launch">Launch Package</option>
                        <option value="Package: Business">Business Package</option>
                        <option value="Package: Signature">Signature Package</option>
                        <option value="Other">Other Inquiry</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="budget" className="text-xs uppercase tracking-widest text-[var(--color-ink-muted)] font-semibold">Budget Range (AED) *</label>
                      <select 
                        id="budget" 
                        name="budget"
                        required
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-[var(--color-ink-muted)] border-opacity-30 py-3 focus:outline-none focus-visible:border-[var(--color-ink)] focus-visible:border-b-2 transition-colors text-base min-h-[44px] appearance-none rounded-none"
                      >
                        <option value="">Select a range...</option>
                        <option value="1-3k">1 - 3k AED</option>
                        <option value="4-8k">4 - 8k AED</option>
                        <option value="10k+">10k+ AED</option>
                        <option value="Undecided">Undecided</option>
                      </select>
                      <p className="text-[10px] text-red-500 mt-1">For testing only. If seen, report to site owner.</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="details" className="text-xs uppercase tracking-widest text-[var(--color-ink-muted)] font-semibold">Project Details *</label>
                    <textarea 
                      id="details" 
                      name="details" 
                      required 
                      rows="5"
                      value={formData.details}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-[var(--color-ink-muted)] border-opacity-30 py-3 focus:outline-none focus-visible:border-[var(--color-ink)] focus-visible:border-b-2 transition-colors text-base min-h-[44px] resize-none"
                      placeholder="Tell us about your business, your goals for this project, and any current roadblocks..."
                    ></textarea>
                  </div>

                  {status === 'error' && (
                    <div role="alert" aria-live="polite" className="text-[#FF5F56] text-sm bg-[#FF5F56]/10 p-4 border border-[#FF5F56]/20">
                      {errorMessage}
                    </div>
                  )}

                  <div className="pt-2 overflow-hidden">
                    <div className="transform origin-left scale-[0.85] sm:scale-100">
                      <Turnstile 
                        siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
                        onSuccess={(token) => setTurnstileToken(token)}
                        options={{ theme: 'light' }}
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit" 
                      disabled={status === 'submitting' || !turnstileToken}
                      className="w-full md:w-auto px-10 py-4 bg-[var(--color-ink)] text-white hover:bg-[var(--color-brass-deep)] transition-colors uppercase tracking-widest text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'submitting' ? 'Submitting...' : 'Submit Inquiry'}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Contact Info Column */}
          <div className="md:col-span-4">
            <div className="sticky top-32 space-y-12">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[var(--color-ink-muted)] font-semibold mb-4">Direct Contact</h4>
                <p className="text-lg font-serif">
                  <a href="mailto:hello@triadesign.studio" className="text-[var(--color-ink)] hover:text-[var(--color-brass-deep)] transition-colors underline decoration-1 underline-offset-4">
                    hello@triadesign.studio
                  </a>
                </p>
              </div>
              
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[var(--color-ink-muted)] font-semibold mb-4">Location</h4>
                <p className="text-lg font-serif text-[var(--color-ink)]">
                  Abu Dhabi, UAE
                  <br />
                  <span className="text-base text-[var(--color-ink-muted)] font-sans">Remote worldwide</span>
                </p>
              </div>

              <div className="p-6 bg-[#F3F0EC] border border-[var(--color-hair-cream)]">
                <h4 className="text-sm font-serif text-[var(--color-ink)] mb-2">Not ready for a full build?</h4>
                <p className="text-sm text-[var(--color-ink-muted)] mb-4">
                  We also offer free design audits and strategic consultation for existing platforms.
                </p>
                <a href="mailto:hello@triadesign.studio?subject=Free%20Design%20Audit%20Inquiry" className="text-xs uppercase tracking-widest font-semibold text-[var(--color-brass-deep)] hover:text-[var(--color-ink)] transition-colors">
                  Book your free audit &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
