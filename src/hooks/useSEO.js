import { useEffect } from 'react';

export function useSEO({ title, description, url = 'https://triadesign.studio', image = 'https://triadesign.studio/og-image.jpg' }) {
  useEffect(() => {
    // Update title
    document.title = title ? `${title} | Tria Design` : 'Tria Design | Independent Web Design & Development Studio';

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update canonical link
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', url);

    // Update Open Graph tags
    const updateOGTag = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateOGTag('og:title', title || 'Tria Design');
    updateOGTag('og:description', description);
    updateOGTag('og:url', url);
    updateOGTag('og:image', image);
    updateOGTag('og:type', 'website');

    // Update Twitter tags
    const updateTwitterTag = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateTwitterTag('twitter:card', 'summary_large_image');
    updateTwitterTag('twitter:title', title || 'Tria Design');
    updateTwitterTag('twitter:description', description);
    updateTwitterTag('twitter:image', image);

  }, [title, description, url, image]);
}
