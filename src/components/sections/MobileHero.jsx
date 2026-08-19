import { motion } from 'framer-motion';

export default function MobileHero() {
  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col justify-end overflow-hidden bg-[var(--color-bg)]">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <img 
          src="/images/mobile-hero-bg.webp" 
          alt="Tria Design Hero" 
          className="w-full h-full object-cover object-center"
          onLoad={() => window.dispatchEvent(new Event('tria-app-ready'))}
        />
        {/* Soft gradient from bottom to make text legible without ruining the art */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/60 to-transparent h-[70%] top-auto mix-blend-normal" />
      </div>

      {/* Decorative Grid or Lines (Optional, for premium feel) */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(var(--color-ink) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      {/* Content */}
      <div className="relative z-10 px-6 w-full flex flex-col pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="w-full"
        >
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-medium mb-6 block text-[var(--color-brass-deep)]">
            SYS_READY // IDENTITY VERIFIED
          </span>
          
          <h1 className="font-sans font-[800] tracking-[-0.03em] leading-[1.05] mb-6 text-[var(--color-ink)] text-[3.2rem]">
            We build <br />
            their <em className="font-serif italic font-medium text-[var(--color-brass-deep)] text-[1.05em]">best</em> <br />
            salesperson.
          </h1>
          
          <p className="text-[1.1rem] leading-[1.5] text-[var(--color-ink-muted)] mb-10 max-w-[280px]">
            Lean builds and deliberate decisions — nothing recycled, nothing extra.
          </p>

          {/* Action or Scroll Indicator */}
          <div className="flex items-center gap-4">
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 40 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="h-[1px] bg-[var(--color-brass-deep)]" 
            />
            <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-[var(--color-ink-muted)]">
              Scroll to explore
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
