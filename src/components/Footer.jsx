import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#111111', color: 'var(--color-white)', padding: 'var(--space-xl) 0 var(--space-lg)' }}>
      <div className="container">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div style={{ fontWeight: 600, letterSpacing: '0.05em', marginBottom: '1rem' }}>TRIA DESIGN</div>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '300px' }}>
              Independent web design & development studio. We build distinctive digital experiences for ambitious businesses.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>Sitemap</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm text-[rgba(255,255,255,0.85)] hover:text-white transition-colors min-h-[44px] flex items-center">Home</Link></li>
              <li><Link to="/about" className="text-sm text-[rgba(255,255,255,0.85)] hover:text-white transition-colors min-h-[44px] flex items-center">About</Link></li>
              <li><Link to="/work" className="text-sm text-[rgba(255,255,255,0.85)] hover:text-white transition-colors min-h-[44px] flex items-center">Work</Link></li>
              <li><Link to="/pricing" className="text-sm text-[rgba(255,255,255,0.85)] hover:text-white transition-colors min-h-[44px] flex items-center">Pricing</Link></li>
              <li><Link to="/contact" className="text-sm text-[rgba(255,255,255,0.85)] hover:text-white transition-colors min-h-[44px] flex items-center">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>Legal</h4>
            <ul className="space-y-3">
              <li><Link to="/privacy" className="text-sm text-[rgba(255,255,255,0.7)] hover:text-[rgba(255,255,255,0.95)] transition-colors min-h-[44px] flex items-center">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-[rgba(255,255,255,0.7)] hover:text-[rgba(255,255,255,0.95)] transition-colors min-h-[44px] flex items-center">Terms and Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-md)', paddingTop: 'var(--space-lg)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="text-xs" style={{ color: 'rgba(255,255,255,0.6)', textTransform: 'none' }}>
            Tria Design L.L.C. · Abu Dhabi, UAE · © {new Date().getFullYear()}
          </div>
          
          <div style={{ display: 'flex', gap: '1.25rem', color: 'rgba(255,255,255,0.6)' }}>
            <a href="#" aria-label="Instagram" className="hover:text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
