export const projects = [
  {
    slug: "biologue",
    title: "Biologue",
    client: "Biologue Science Journal",
    services: ["Web Design", "Astro Development", "CMS Integration"],
    hook: "A fast, editorial science publication built for long-term growth.",
    featured: true, // Appears on Home
    challenge: "The project required a strong editorial identity, a custom ASCII animation system, and a content architecture that worked consistently across desktop and mobile. The CMS also needed to remain detached from the frontend so the publication could grow without requiring a complete rebuild.",
    approach: "We engineered a highly scalable system using the Astro framework for extreme performance. The build includes a custom ASCII-inspired hero animation and dedicated mobile and desktop content patterns. By utilizing a detached CMS architecture, we built a foundation that can serve thousands of users just as efficiently as ten.",
    outcome: "Biologue combines a distinctive laboratory-inspired visual identity with a fast and scalable publishing foundation. The architecture is designed to keep the experience responsive and lightweight as the content library and audience rapidly expand.",
    images: {
      thumbnail: '/images/projects/biologue-hero.webm',
      hero: '/images/projects/biologue-hero.webm',
      showcase: [
        '/images/projects/biologue-2.webp',
        '/images/projects/biologue-3.webp'
      ]
    },
    link: "https://biologue.pages.dev/"
  },
  {
    slug: "aura-roastery",
    title: "Aura Roastery",
    client: "Aura Roastery",
    services: ["WebGL Development", "E-Commerce Design", "3D Interaction"],
    hook: "A sensory coffee experience designed around ritual and atmosphere.",
    featured: true,
    challenge: "The experience needed to include WebGL, three-dimensional elements, and animation without sacrificing loading speed or visual quality. It also needed to present a detailed menu with accurate imagery while supporting both light and dark presentation modes seamlessly.",
    approach: "We created a WebGL-led visual experience that leverages hardware acceleration for smooth 3D interactions. The site structures a detailed menu presentation and product imagery within an immersive environment, supporting dynamic light and dark themes that reflect the physical atmosphere of the café.",
    outcome: "Aura Roastery presents the café as a complete brand experience rather than simply a menu online. The website balances atmosphere with extreme usability, allowing visitors to explore the story, products, and physical location without losing the sense of discovery.",
    images: {
      thumbnail: '/images/projects/aura-roastery-1.webp',
      hero: '/images/projects/aura-roastery-hero.webm',
      mobile: '/images/projects/aura-roastery-3.webp',
      showcase: [
        '/images/projects/aura-roastery-1.webp'
      ]
    },
    link: "https://volt-gym.us-east-1.gists.org/" // Using the provided link from the prompt, though it says volt-gym
  },
  {
    slug: "alexander-hayes",
    title: "Dr. Alexander Hayes",
    client: "Dr. Alexander Hayes Clinic",
    services: ["UX/UI Design", "3D Interactive Modules", "Sanity CMS"],
    hook: "A premium medical portfolio built around trust and expertise.",
    featured: true,
    challenge: "The experience needed to make complex medical expertise understandable while introducing interactive elements such as anatomy reveals and a three-dimensional shoulder module. The site also needed a flexible content system so the practice could continue expanding its expertise, research, and educational content.",
    approach: "We developed a premium editorial layout powered by a Sanity content management system. The interface introduces a revealing anatomy-led hero experience and a custom 3D shoulder module that grounds complex medical concepts into accessible, interactive patient education.",
    outcome: "The final experience positions the doctor as an established specialist while keeping the content approachable for prospective patients. The design perfectly balances medical credibility with a refined, human-centric digital presence.",
    images: {
      thumbnail: '/images/projects/alexander-hayes-thumb.webp',
      hero: '/images/projects/alexander-hayes-hero.webp',
      showcase: [
        '/images/projects/alexander-hayes-3.webp'
      ]
    },
    link: "https://ivory-sycam-c9p7.here.now/"
  },
  {
    slug: "job-marksman",
    title: "Job Marksman",
    client: "Job Marksman AI",
    services: ["Web App Development", "AI Integration", "Product Design"],
    hook: "A career guidance system designed to turn ambition into action.",
    featured: true,
    challenge: "The product needed to make a large amount of information feel manageable. Users should be able to understand where they are, what to do next, and how their activities connect to a broader career outcome, all while interacting with an advanced AI framework.",
    approach: "We structured the application around a personalized onboarding flow and a Command Center for next actions. The system integrates an AI guidance assistant (the Oracle), learning roadmaps, an evidence vault, and extensive customization controls designed to reduce decision fatigue.",
    outcome: "Job Marksman prioritizes usefulness over decoration. The interface gives users a clear sense of progress, direction, and ownership over their development, functioning as a complete, highly-scalable career acceleration prototype.",
    images: {
      thumbnail: '/images/projects/job-marksman-thumb.webp',
      hero: '/images/projects/job-marksman-hero.webm',
      showcase: [
        '/images/projects/job-marksman-1.webp',
        '/images/projects/job-marksman-3.webp'
      ]
    },
    link: "https://zingy-karma-8cs5.here.now/"
  },
  {
    slug: "sila-majlis",
    title: "Sila — Al Qou' Majlis",
    client: "Sila Community",
    services: ["Full-Stack Development", "Database Architecture", "UI Design"],
    hook: "A community platform designed around local participation.",
    featured: false,
    challenge: "The central challenge was building a working data-driven experience rather than a static interface. Users needed to search, query, and interact with information inside the platform while also having access to profiles, community spaces, and different modes of participation.",
    approach: "We architected a fully functional database layer supporting link-based search and querying. The dashboard-style interface includes user profiles, marketplace functionality, real-time alerts, and community discussion spaces accessible across light and dark modes.",
    outcome: "Sila demonstrates how a product can move beyond a marketing website into a usable community system. The work combines interface design, structured data, and user interaction into a platform that supports complex community workflows.",
    images: {
      thumbnail: '/images/projects/sila-majlis-thumb.webp',
      hero: '/images/projects/sila-majlis-thumb.webp',
      mobile: '/images/projects/sila-majlis-1.webp',
      showcase: [
        '/images/projects/sila-majlis-3.webm'
      ]
    },
    link: "https://present-muse-mw8k.here.now/"
  },
  {
    slug: "marcus-thorne",
    title: "Marcus Thorne",
    client: "Marcus Thorne Legal Consultant",
    services: ["Web Design", "CMS Development", "Bilingual Architecture"],
    hook: "A bilingual legal presence designed for clarity and conversion.",
    featured: false,
    challenge: "The website needed to communicate authority and trust while keeping the user journey simple. It also had to support WhatsApp conversion, Arabic and English layouts, true right-to-left (RTL) presentation, and an easily editable blog system.",
    approach: "We built a structured single-page legal experience that seamlessly anchors navigation across core sections. The architecture includes deep WhatsApp integration, dual-language capabilities natively supporting L2R and R2L layouts, and an SEO-optimized CMS blog.",
    outcome: "Marcus Thorne’s website gives visitors a clear path from understanding the practice to requesting a consultation. It combines the efficiency of a highly optimized landing page with the depth and credibility of a comprehensive legal platform.",
    images: {
      thumbnail: '/images/projects/marcus-thorne-hero.webp',
      hero: '/images/projects/marcus-thorne-hero.webp',
      showcase: [
        '/images/projects/marcus-thorne-1.webp',
        '/images/projects/marcus-thorne-3.webp'
      ]
    },
    link: "https://timber-sorbet-jsmk.here.now/about/"
  },
  {
    slug: "volt-gym",
    title: "Volt Gym",
    client: "Volt Gym",
    services: ["Web Design", "Conversion Optimization"],
    hook: "A focused digital presence built to turn clarity into action.",
    featured: false,
    challenge: "The site had to remain intentionally lean and cost-effective while still feeling considered and professional. Every section needed to earn its place: visitors should be able to understand the gym's positioning, explore programs, and take the next step without unnecessary complexity.",
    approach: "We structured the experience meticulously around the customer journey: a direct positioning statement, clear program categories, coach introductions, and membership tiers. The responsive layout prioritizes quick scanning and decisive calls to action.",
    outcome: "Volt Gym now has a focused digital presence that prioritizes clarity, speed, and reliability. It gives potential members the exact information they need from one landing page while preserving a premium, performance-led brand impression.",
    images: {
      thumbnail: '/images/projects/volt-gym-hero.webp',
      hero: '/images/projects/volt-gym-hero.webp',
      showcase: [
        '/images/projects/volt-gym-1.webp',
        '/images/projects/volt-gym-2.webp'
      ]
    },
    link: "https://volt-gym.us-east-1.gists.org/"
  }
];
