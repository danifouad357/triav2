const fs = require('fs');

const original = fs.readFileSync('src/components/CinematicSequence.tsx', 'utf8');

// Replace imports
let updated = original.replace(
  /import ChromaHomographyRenderer.*?$/m,
  `import ChromaHomographyRenderer from "./webgl/ChromaHomographyRenderer";\nimport { useLenis } from "lenis/react";\nimport "./CinematicSequence.css";`
);
updated = updated.replace(/import \{ lockPageScroll.*?$/m, '');
updated = updated.replace(/import \{ AnimatePresence, motion \} from "framer-motion";/m, 'import { AnimatePresence, motion, useReducedMotion } from "framer-motion";');


// Rename main component to WebGLSequence and add the wrapper
updated = updated.replace(/export default function CinematicSequence\(\) \{/, 'function WebGLSequence() {');

// Add Lenis
updated = updated.replace(
  /useEffect\(\(\) => \{\s+lockPageScroll\(\);\s+return \(\) => \{ unlockPageScroll\(\); \};\s+\}, \[\]\);/g,
  `const lenis = useLenis();
  useEffect(() => {
    if (lenis) {
      lenis.stop();
    }
    return () => {
      if (lenis) lenis.start();
    };
  }, [lenis]);`
);

// Update goToScene scroll target
updated = updated.replace(
  /setIsPageScrolling\(true\);\s*unlockPageScroll\(\);\s*scrollToSection\("#work", \{/g,
  `setIsPageScrolling(true); if (lenis) { lenis.start(); } document.querySelector("#ambitious-businesses")?.scrollIntoView({ behavior: "smooth" }); return; /*`
);
// Comment out the rest of the original scrollToSection call
updated = updated.replace(/easing: \(t\) => 1 - Math\.pow\(1 - t, 4\)\s+\}\);\s+return;/g, `*/`);
updated = updated.replace(/easing: \(t\) => 1 - Math\.pow\(1 - t, 4\)\s+\/\/ easeOutQuart\s+\}\);\s+\/\/ Release/g, `*/ // Release`);

// Update hasScrolledDown
updated = updated.replace(
  /lockPageScroll\(\);\s+setIsPageScrolling\(false\);/g,
  `if (lenis) lenis.stop(); setIsPageScrolling(false);`
);

// Add skip intro button
updated = updated.replace(
  /\{\/\* DEV Panel \*\/\}/g,
  `{!showDevPanel && (
        <button onClick={() => goToScene(6)} className="cs-skip-button">Skip Intro ➔</button>
      )}
      {/* DEV Panel */}`
);

// Remove Absolute right-8 top-1/2 panel because it uses Tailwind classes that are too hard to rewrite cleanly (and it's just dots)
updated = updated.replace(/<div className="absolute right-8 top-1\/2 z-20 hidden -translate-y-1\/2 flex-col gap-2\.5 md:flex">[\s\S]*?<\/div>/, '');

// Convert Tailwind to CSS classes
updated = updated.replace(/className="relative h-screen w-full overflow-hidden select-none"/g, `className="cs-container"`);
updated = updated.replace(/className="absolute inset-0 z-0 pointer-events-none"/g, `className="cs-video-layer"`);
updated = updated.replace(/className="absolute inset-y-0 left-0 z-10 flex w-full pointer-events-none lg:w-1\/2"/g, `className="cs-text-layer"`);
updated = updated.replace(/className="container-editorial flex items-center"/g, `className="container" style={{ display: 'flex', alignItems: 'center' }}`);
updated = updated.replace(/className="max-w-xl"/g, `className="cs-title-box"`);
updated = updated.replace(/className="font-mono text-\[0\.72rem\] tracking-\[0\.15em\] uppercase font-medium text-\[var\(--color-brass-deep\)\] mb-4 block"/g, `className="cs-system-font" style={{ color: 'var(--color-brass-deep)' }}`);
updated = updated.replace(/className="font-sans font-\[800\] tracking-\[-0\.02em\] text-display-2xl leading-\[1\.08\] mb-6 max-w-\[15ch\] text-\[var\(--color-ink\)\]"/g, `className="cs-main-heading" style={{ color: 'var(--color-ink)' }}`);
updated = updated.replace(/className="font-serif italic font-medium text-\[var\(--color-brass-deep\)\] text-\[0\.98em\]"/g, `className="cs-italic-accent" style={{ color: 'var(--color-brass-deep)' }}`);
updated = updated.replace(/className="text-\[1\.08rem\] leading-\[1\.6\] text-\[var\(--color-ink-muted\)\] max-w-\[42ch\] mb-14"/g, `className="cs-body-text" style={{ color: 'var(--color-ink-muted)' }}`);
updated = updated.replace(/className="font-mono text-\[0\.68rem\] tracking-\[0\.18em\] uppercase text-\[var\(--color-cream-muted\)\] border-t border-\[var\(--color-hair-cream\)\] pt-4 inline-block"/g, `className="cs-scroll-hint" style={{ color: 'var(--color-cream-muted)', borderColor: 'var(--color-hair-cream)' }}`);
updated = updated.replace(/className="absolute inset-0 z-20 pointer-events-none"/g, `className="cs-reason-layer"`);
updated = updated.replace(/className="absolute inset-y-0 left-0 pointer-events-none"/g, `className="cs-gradient-bg"`);
updated = updated.replace(/className="absolute inset-y-0 flex items-center pointer-events-none"/g, `className="cs-reason-text"`);
updated = updated.replace(/className="absolute bottom-10 right-10 sm:right-14 lg:right-16 flex flex-col items-end gap-5"/g, `className="cs-progress-container"`);
updated = updated.replace(/className="flex flex-col items-center gap-2"/g, `className="cs-progress-pips"`);
updated = updated.replace(/className="w-\[3px\] rounded-full bg-\[#161616\] block"/g, `className="cs-pip"`);
updated = updated.replace(/className="flex flex-col items-end gap-1"/g, `className="cs-progress-labels"`);
updated = updated.replace(/className="text-\[9px\] font-mono tracking-\[0\.22em\] text-\[#161616\]\/35 uppercase hidden lg:block"/g, `className="cs-progress-label-text" style={{ color: 'rgba(22,22,22,0.35)' }}`);
updated = updated.replace(/className="text-\[9px\] font-mono text-\[#161616\]\/25 mt-1 hidden lg:block"/g, `className="cs-progress-label-text" style={{ color: 'rgba(22,22,22,0.25)', marginTop: '4px' }}`);
updated = updated.replace(/className="absolute top-4 right-4 z-50 w-72 bg-white\/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-xl p-4 text-\[10px\] font-mono text-gray-800 overflow-y-auto max-h-\[90vh\]"/g, `className="cs-dev-panel"`);
updated = updated.replace(/className="flex justify-between items-center border-b border-gray-200 pb-2 mb-4"/g, `style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1rem' }}`);
updated = updated.replace(/className="hover:text-red-500 font-bold text-sm"/g, `style={{ cursor: 'pointer', fontWeight: 'bold' }}`);
updated = updated.replace(/className="space-y-4"/g, `style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}`);
updated = updated.replace(/className="flex flex-col gap-1"/g, `style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}`);
updated = updated.replace(/className="flex justify-between"/g, `style={{ display: 'flex', justifyContent: 'space-between' }}`);
updated = updated.replace(/className="text-gray-500"/g, `style={{ color: '#6b7280' }}`);
updated = updated.replace(/className="w-full accent-\[#8C7A5E\]"/g, `style={{ width: '100%', accentColor: '#8C7A5E' }}`);
updated = updated.replace(/className="flex flex-col gap-1 mt-4 border-t border-gray-200 pt-4"/g, `style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '1rem', borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}`);
updated = updated.replace(/className="flex justify-between items-center"/g, `style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}`);
updated = updated.replace(/className="text-gray-500 uppercase"/g, `style={{ color: '#6b7280', textTransform: 'uppercase' }}`);
updated = updated.replace(/className="w-full h-8 cursor-pointer rounded border border-gray-200"/g, `style={{ width: '100%', height: '2rem', cursor: 'pointer', borderRadius: '0.25rem', border: '1px solid #e5e7eb' }}`);
updated = updated.replace(/className="mt-6 w-full py-2 bg-gray-100 hover:bg-gray-200 rounded text-center transition-colors"/g, `style={{ marginTop: '1.5rem', width: '100%', padding: '0.5rem 0', backgroundColor: '#f3f4f6', borderRadius: '0.25rem', textAlign: 'center', cursor: 'pointer' }}`);
updated = updated.replace(/className="absolute top-4 right-4 z-50 bg-white shadow-xl rounded-full p-3 text-xs font-mono border border-gray-200 hover:bg-gray-50 transition-colors"/g, `style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 50, backgroundColor: 'white', borderRadius: '9999px', padding: '0.75rem', fontSize: '0.75rem', fontFamily: 'monospace', cursor: 'pointer', border: '1px solid #e5e7eb' }}`);


const fallbackHero = `
export default function CinematicSequence() {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      const isNarrow = window.innerWidth < 768;
      const isLowTier = (navigator.hardwareConcurrency || 4) < 4;
      setIsMobile(isNarrow || isLowTier);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (prefersReducedMotion || isMobile) {
    return <FallbackHero />;
  }

  return <WebGLSequence />;
}

function FallbackHero() {
  return (
    <section className="cs-fallback-hero" style={{ paddingTop: '10rem', paddingBottom: '10rem' }}>
      <div className="container">
          <div style={{ maxWidth: '800px' }}>
            <span className="cs-system-font" style={{ color: 'var(--color-brass-deep)' }}>INDEPENDENT WEB DESIGN & DEVELOPMENT</span>
            <h1 className="cs-main-heading" style={{ color: 'var(--color-ink)', maxWidth: '100%', marginBottom: '2rem' }}>
              We build fast, <em className="cs-italic-accent" style={{ color: 'var(--color-brass-deep)' }}>purposeful</em> websites.
            </h1>
            <p className="cs-body-text" style={{ color: 'var(--color-ink-muted)' }}>
              Lean builds and deliberate decisions — nothing recycled, nothing extra. We design and develop distinctive digital experiences for businesses that want a stronger, more credible presence online.
            </p>
          </div>
      </div>
    </section>
  );
}
`;

updated += fallbackHero;

fs.writeFileSync('src/components/CinematicSequence.tsx', updated);
console.log("Done");
