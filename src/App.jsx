import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ScrollToTop from '@/components/ScrollToTop';

const Home = lazy(() => import('@/pages/Home'));
const WorkIndex = lazy(() => import('@/pages/WorkIndex'));
const ProjectSingle = lazy(() => import('@/pages/ProjectSingle'));
const Contact = lazy(() => import('@/pages/Contact'));
const Pricing = lazy(() => import('@/pages/Pricing'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Terms = lazy(() => import('@/pages/Terms'));
const About = lazy(() => import('@/pages/About'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// SEO Pages
const WebDesignAbuDhabi = lazy(() => import('@/pages/seo/WebDesignAbuDhabi'));
const WebDevelopmentAbuDhabi = lazy(() => import('@/pages/seo/WebDevelopmentAbuDhabi'));
const WebsiteDesignUAE = lazy(() => import('@/pages/seo/WebsiteDesignUAE'));
const WebDesignRestaurants = lazy(() => import('@/pages/seo/WebDesignRestaurants'));
const WebDesignClinics = lazy(() => import('@/pages/seo/WebDesignClinics'));

import './index.css';

const isTouchDevice = typeof window !== 'undefined' ? window.matchMedia('(pointer: coarse)').matches : false;

function App() {
  const content = (
    <>
      <div className="grain-overlay" />
      <CustomCursor />
      <ScrollToTop />
      <Header />
      <Suspense fallback={<div className="min-h-screen bg-[var(--color-cream)]"></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<WorkIndex />} />
          <Route path="/work/:slug" element={<ProjectSingle />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          
          {/* SEO Routes */}
          <Route path="/web-design-abu-dhabi" element={<WebDesignAbuDhabi />} />
          <Route path="/web-development-abu-dhabi" element={<WebDevelopmentAbuDhabi />} />
          <Route path="/website-design-uae" element={<WebsiteDesignUAE />} />
          <Route path="/web-design-for-restaurants" element={<WebDesignRestaurants />} />
          <Route path="/web-design-for-clinics" element={<WebDesignClinics />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );

  return (
    <Router>
      {isTouchDevice ? (
        content
      ) : (
        <ReactLenis root>
          {content}
        </ReactLenis>
      )}
    </Router>
  );
}

export default App;
