import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useLocation, useNavigate, Link } from "react-router-dom";
import { useLenis } from "lenis/react";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/#why-tria" },
  { label: "Process", href: "/#process" },
  { label: "Pricing", href: "/pricing" },
];

export default function Header() {
  const lenis = useLenis();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);

    const isHash = href.includes("#");
    const hash = isHash ? href.substring(href.indexOf("#")) : "";
    const path = isHash ? href.substring(0, href.indexOf("#")) : href;

    if (path && path !== location.pathname && path !== "/") {
      navigate(href);
      return;
    }

    if (isHash) {
      if (location.pathname !== "/") {
        navigate("/" + hash);
        return;
      }
      
      window.dispatchEvent(new Event('forceUnlockScroll'));
      
      setTimeout(() => {
        if (lenis) {
          lenis.scrollTo(hash, { duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 4) });
        } else {
          document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
        }
      }, 50);
    } else {
      navigate(href);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on ESC
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Prevent body scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none"; // robust lock for iOS Safari
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => { 
      document.body.style.overflow = ""; 
      document.body.style.touchAction = "";
    };
  }, [menuOpen]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!menuOpen || !menuRef.current) return;
    const focusableElements = menuRef.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    if (!focusableElements.length) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };
    
    window.addEventListener("keydown", handleTab);
    // Auto-focus first element
    setTimeout(() => firstElement.focus(), 100);
    
    return () => window.removeEventListener("keydown", handleTab);
  }, [menuOpen]);

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-700 ${
          scrolled || menuOpen
            ? "bg-[var(--color-bg)]/90 backdrop-blur-md backdrop-filter border-b border-[var(--color-border)]"
            : "bg-transparent border-b border-transparent"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)", WebkitBackdropFilter: (scrolled || menuOpen) ? "blur(12px)" : "none" }}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">

            {/* ── Wordmark ── */}
            <a
              href="#"
              className="select-none flex items-center gap-3"
              aria-label="Tria Design — Home"
            >
              <img 
                src="/logo.png" 
                alt="Tria Design Logo" 
                className="h-8 w-auto"
                style={{ mixBlendMode: 'multiply' }}
              />
              <span className="font-serif text-[1.1rem] text-[var(--color-text)]">Tria Design</span>
            </a>

            {/* ── Desktop nav ── */}
            <nav
              className="hidden md:flex items-center gap-7"
              aria-label="Primary navigation"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-[0.8rem] text-[var(--color-text-muted)] hover:text-[var(--color-text)] tracking-wide transition-colors duration-500 py-1"
                  style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
                >
                  {link.label}
                </a>
              ))}

              {/* CTA button */}
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="text-[0.8rem] text-[var(--color-text)] border border-[var(--color-text)]/70 px-4 py-2 hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] transition-all duration-600 tracking-wide"
                style={{
                  transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                  letterSpacing: "0.04em",
                }}
              >
                Let&apos;s Talk
              </Link>
            </nav>

            {/* ── Mobile hamburger ── */}
            <button
              className="md:hidden flex flex-col justify-center items-center gap-[5px] w-12 h-12 -mr-3"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              <span
                className={`block w-[22px] h-px bg-[var(--color-text)] transition-all duration-500 origin-center ${
                  menuOpen ? "rotate-45 translate-y-[3px]" : ""
                }`}
                style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
              />
              <span
                className={`block h-px bg-[var(--color-text)] transition-all duration-500 ${
                  menuOpen ? "w-0 opacity-0" : "w-[22px] opacity-100"
                }`}
                style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
              />
              <span
                className={`block w-[22px] h-px bg-[var(--color-text)] transition-all duration-500 origin-center ${
                  menuOpen ? "-rotate-45 -translate-y-[3px]" : ""
                }`}
                style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer — sits beneath header, full viewport ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[40] bg-[var(--color-bg)] flex flex-col pt-20 md:hidden h-[100dvh]"
            aria-hidden={!menuOpen}
          >
            <div className="container flex flex-col gap-1 pt-10 h-full overflow-y-auto pb-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="font-serif text-3xl text-[var(--color-text)] py-3 border-b border-[var(--color-border)] last:border-b-0"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6,
                  delay: navLinks.length * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="font-serif text-3xl text-[var(--color-brand-brass)] py-3 mt-2 block"
                  style={{ fontStyle: "italic", fontWeight: 300 }}
                >
                  Let&apos;s Talk
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
