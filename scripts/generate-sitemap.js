import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { projects } from '../src/data/projects.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://triadesign.pages.dev';

// Map each static route to its corresponding React component to fetch accurate lastmod dates.
const staticRoutes = [
  { path: '/', component: 'src/pages/Home.jsx', priority: 1.0, changefreq: 'monthly' },
  { path: '/about/', component: 'src/pages/About.jsx', priority: 0.5, changefreq: 'yearly' },
  { path: '/work/', component: 'src/pages/WorkIndex.jsx', priority: 0.8, changefreq: 'monthly' },
  { path: '/contact/', component: 'src/pages/Contact.jsx', priority: 0.5, changefreq: 'yearly' },
  { path: '/pricing/', component: 'src/pages/Pricing.jsx', priority: 0.8, changefreq: 'monthly' },
  { path: '/privacy/', component: 'src/pages/Privacy.jsx', priority: 0.3, changefreq: 'yearly' },
  { path: '/terms/', component: 'src/pages/Terms.jsx', priority: 0.3, changefreq: 'yearly' },
  // Localized/Industry Pages
  { path: '/web-design-abu-dhabi/', component: 'src/pages/seo/WebDesignAbuDhabi.jsx', priority: 0.8, changefreq: 'monthly' },
  { path: '/web-development-abu-dhabi/', component: 'src/pages/seo/WebDevelopmentAbuDhabi.jsx', priority: 0.8, changefreq: 'monthly' },
  { path: '/website-design-uae/', component: 'src/pages/seo/WebsiteDesignUAE.jsx', priority: 0.8, changefreq: 'monthly' },
  { path: '/web-design-for-restaurants/', component: 'src/pages/seo/WebDesignRestaurants.jsx', priority: 0.7, changefreq: 'monthly' },
  { path: '/web-design-for-clinics/', component: 'src/pages/seo/WebDesignClinics.jsx', priority: 0.7, changefreq: 'monthly' }
];


function generateXMLUrl(loc) {
  return `  <url>\n    <loc>${DOMAIN}${loc}</loc>\n  </url>`;
}

async function buildSitemap() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // 1. Process Static Routes
  for (const route of staticRoutes) {
    xml += generateXMLUrl(route.path) + '\n';
  }

  // 2. Process Dynamic Project Routes
  for (const project of projects) {
    const loc = `/work/${project.slug}/`;
    xml += generateXMLUrl(loc) + '\n';
  }

  xml += `</urlset>\n`;

  // 3. Write to dist/sitemap.xml
  const distDir = path.resolve(__dirname, '..', 'dist');
  
  if (!fs.existsSync(distDir)) {
    console.log('dist directory not found, creating it...');
    fs.mkdirSync(distDir, { recursive: true });
  }

  const outputPath = path.join(distDir, 'sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf8');
  
  console.log(`✅ Sitemap successfully generated at ${outputPath}`);
  console.log(`Included ${staticRoutes.length} static routes and ${projects.length} dynamic routes.`);
}

buildSitemap();
