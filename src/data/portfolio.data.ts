// ============================================================
// PORTFOLIO PAGE — Static data & content
// (Will be replaced by CMS data in production)
// ============================================================

// ─── Hero ─────────────────────────────────────────────────

export const PORTFOLIO_HERO = {
  headline: "Selected Works",
  period: "2020—2024",
  description:
    "A curated collection of digital experiences, visual identities, and architectural concepts focused on minimalism and functional beauty.",
} as const;

// ─── Filters ──────────────────────────────────────────────

export interface PortfolioFilter {
  id: string;
  label: string;
}

export const PORTFOLIO_FILTERS: PortfolioFilter[] = [
  { id: "all", label: "All Projects" },
  { id: "web-design", label: "Web Design" },
  { id: "brand-identity", label: "Brand Identity" },
  { id: "photography", label: "Photography" },
  { id: "motion", label: "Motion" },
];

// ─── Projects ─────────────────────────────────────────────

export interface PortfolioProject {
  id: string;
  slug: string;
  category: string;
  categoryId: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "1",
    slug: "abstract-geometry",
    category: "Web Design",
    categoryId: "web-design",
    title: "Abstract Geometry",
    description: "Interactive gallery for modern artists.",
    image: {
      src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80",
      alt: "Abstract geometric shapes",
    },
  },
  {
    id: "2",
    slug: "modern-typography",
    category: "Brand Identity",
    categoryId: "brand-identity",
    title: "Modern Typography",
    description: "Visual system for a Swiss design studio.",
    image: {
      src: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80",
      alt: "Minimalist typography poster",
    },
  },
  {
    id: "3",
    slug: "editorial-shoot",
    category: "Photography",
    categoryId: "photography",
    title: "Editorial Shoot",
    description: "A study on concrete and light.",
    image: {
      src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
      alt: "Architectural detail",
    },
  },
  {
    id: "4",
    slug: "urban-motion",
    category: "Motion",
    categoryId: "motion",
    title: "Urban Motion",
    description: "Kinetic typography for fashion film.",
    image: {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      alt: "Flowing dark fabric",
    },
  },
  {
    id: "5",
    slug: "minimalist-web",
    category: "Web Design",
    categoryId: "web-design",
    title: "Minimalist Web",
    description: "E-commerce platform for boutique furniture.",
    image: {
      src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
      alt: "Lamp in dark room",
    },
  },
  {
    id: "6",
    slug: "core-identity",
    category: "Brand Concept",
    categoryId: "brand-identity",
    title: "Core Identity",
    description: "Identity design for architectural firm.",
    image: {
      src: "https://images.unsplash.com/photo-1481026469463-66327c86e544?w=600&q=80",
      alt: "Modern staircase",
    },
  },
];

// ─── CTA ──────────────────────────────────────────────────

export const PORTFOLIO_CTA = {
  headline: "Let's build something together.",
  subtext: "Currently accepting new projects for Q3 and Q4 2024.",
  cta: "Get in Touch",
  href: "/contact",
} as const;

// ─── Project Detail ───────────────────────────────────────
// Full detail data per project — loaded dynamically by slug

export interface ProjectMeta {
  label: string;
  value: string;
}

export interface TechStackItem {
  label: string;
  featured?: boolean; // first item shown as primary badge
}

export interface TechDetail {
  title: string;
  description: string;
}

export interface ProjectDetail extends PortfolioProject {
  hero: {
    src: string;
    alt: string;
  };
  meta: ProjectMeta[];
  techStack: TechStackItem[];
  overview: string;
  jobDescription: string;
  techDetails: TechDetail[];
}

export const PORTFOLIO_DETAILS: Record<string, ProjectDetail> = {
  "abstract-geometry": {
    id: "1",
    slug: "abstract-geometry",
    category: "Web Design",
    categoryId: "web-design",
    title: "Abstract Geometry",
    description: "Interactive gallery for modern artists.",
    image: {
      src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80",
      alt: "Abstract geometric shapes",
    },
    hero: {
      src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&q=85",
      alt: "Abstract Geometry project hero",
    },
    meta: [
      { label: "Customer", value: "Studio Forma AG" },
      { label: "Role", value: "Lead UI Designer & Developer" },
      { label: "Timeline", value: "Jan 2024 — Mar 2024" },
    ],
    techStack: [
      { label: "React JS", featured: true },
      { label: "Three.js" },
      { label: "Tailwind CSS" },
      { label: "Framer Motion" },
      { label: "Vite" },
    ],
    overview:
      "Abstract Geometry is an immersive interactive gallery platform built for a modern art collective. The platform allows visitors to explore generative art pieces in a three-dimensional canvas, with gesture-driven navigation and real-time shader effects.",
    jobDescription:
      "As Lead UI Designer & Developer, I was responsible for the full front-end architecture from design system to production deployment. I worked closely with the creative director to translate physical installation concepts into interactive web experiences.",
    techDetails: [
      {
        title: "Three.js",
        description:
          "Core 3D rendering engine used to build the interactive WebGL canvas, enabling real-time generative art visualization.",
      },
      {
        title: "Framer Motion",
        description:
          "Used for all page transition animations and micro-interactions, ensuring a fluid and cinematic user experience.",
      },
      {
        title: "Tailwind CSS",
        description:
          "Utility-first CSS framework for building the UI shell — navigation, overlays, and control panels — with full dark mode support.",
      },
      {
        title: "React Router Dom",
        description:
          "Managed client-side routing between gallery rooms and individual artwork detail views.",
      },
      {
        title: "Vite",
        description:
          "Modern build tooling chosen for its instant HMR and optimized production bundle for WebGL assets.",
      },
      {
        title: "Custom Shaders (GLSL)",
        description:
          "Hand-written vertex and fragment shaders to achieve the signature aesthetic of flowing geometric forms.",
      },
    ],
  },

  "modern-typography": {
    id: "2",
    slug: "modern-typography",
    category: "Brand Identity",
    categoryId: "brand-identity",
    title: "Modern Typography",
    description: "Visual system for a Swiss design studio.",
    image: {
      src: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80",
      alt: "Minimalist typography poster",
    },
    hero: {
      src: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1600&q=85",
      alt: "Modern Typography hero",
    },
    meta: [
      { label: "Customer", value: "Helvetica Studio Zürich" },
      { label: "Role", value: "Brand Designer" },
      { label: "Timeline", value: "Mar 2023 — Jun 2023" },
    ],
    techStack: [
      { label: "Figma", featured: true },
      { label: "Adobe Illustrator" },
      { label: "Next.js" },
      { label: "Storybook" },
    ],
    overview:
      "A complete visual identity system for a Zürich-based typographic design studio. The project encompassed logo design, type hierarchy, color system, and a living component library to ensure consistent application across all brand touchpoints.",
    jobDescription:
      "I developed the complete brand system from initial concept sketches through to the final component library. Working directly with the studio founders, I established a design language that honored Swiss typographic traditions while feeling contemporary and digital-first.",
    techDetails: [
      {
        title: "Figma",
        description:
          "Primary design and prototyping tool used to build the full component library and brand guidelines document.",
      },
      {
        title: "Adobe Illustrator",
        description:
          "Used for logo mark construction and iconography system, ensuring pixel-perfect vector outputs at any scale.",
      },
      {
        title: "Next.js",
        description:
          "Framework used to build the brand website and interactive guidelines portal for the client.",
      },
      {
        title: "Storybook",
        description:
          "Documented all UI components in isolation, enabling the client team to implement the system without design involvement.",
      },
    ],
  },

  "editorial-shoot": {
    id: "3",
    slug: "editorial-shoot",
    category: "Photography",
    categoryId: "photography",
    title: "Editorial Shoot",
    description: "A study on concrete and light.",
    image: {
      src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
      alt: "Architectural detail",
    },
    hero: {
      src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=85",
      alt: "Editorial Shoot hero",
    },
    meta: [
      { label: "Customer", value: "Architectural Digest APAC" },
      { label: "Role", value: "Creative Director & Photographer" },
      { label: "Timeline", value: "Oct 2023" },
    ],
    techStack: [
      { label: "Sony A7 IV", featured: true },
      { label: "Lightroom" },
      { label: "Capture One" },
      { label: "Phase One Medium Format" },
    ],
    overview:
      "A high-contrast editorial photography project commissioned by Architectural Digest APAC. The shoot explored the interplay of raw concrete surfaces and directional natural light across three brutalist structures in Singapore.",
    jobDescription:
      "I led the full creative direction of the shoot — from location scouting and lighting design to post-processing and final delivery. The brief required capturing the soul of brutalist architecture through a minimalist, high-contrast monochrome lens.",
    techDetails: [
      {
        title: "Sony A7 IV",
        description:
          "Primary capture body chosen for its exceptional dynamic range and low-light performance in challenging architectural spaces.",
      },
      {
        title: "Lightroom",
        description:
          "Used for initial culling, color grading, and final retouching with custom preset development for the high-contrast monochrome look.",
      },
      {
        title: "Capture One",
        description:
          "Preferred for tethered shooting during key set-ups, enabling real-time review with the art director on set.",
      },
      {
        title: "Phase One Medium Format",
        description:
          "Used for select architectural wide shots requiring maximum detail retention for large-format print.",
      },
    ],
  },

  "urban-motion": {
    id: "4",
    slug: "urban-motion",
    category: "Motion",
    categoryId: "motion",
    title: "Urban Motion",
    description: "Kinetic typography for fashion film.",
    image: {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      alt: "Flowing dark fabric",
    },
    hero: {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85",
      alt: "Urban Motion hero",
    },
    meta: [
      { label: "Customer", value: "Noir Atelier Paris" },
      { label: "Role", value: "Motion Designer" },
      { label: "Timeline", value: "Sep 2023 — Oct 2023" },
    ],
    techStack: [
      { label: "After Effects", featured: true },
      { label: "Cinema 4D" },
      { label: "DaVinci Resolve" },
      { label: "Premiere Pro" },
    ],
    overview:
      "A kinetic typography and motion design piece for Paris-based fashion house Noir Atelier. The work was featured as an opening title sequence for their S/S 2024 campaign film, blending editorial typography with abstract fabric simulations.",
    jobDescription:
      "As the sole motion designer on the project, I handled all aspects of the title sequence — from concept boards and type animation to 3D fabric simulation and final color grade. The sequence runs for 90 seconds and was delivered in 4K for both digital and cinema exhibition.",
    techDetails: [
      {
        title: "After Effects",
        description:
          "Primary compositing and typography animation tool, used to build all kinetic type sequences with precise frame-by-frame control.",
      },
      {
        title: "Cinema 4D",
        description:
          "Used for the 3D fabric simulation sequences, leveraging the Cloth simulation engine for realistic silk behavior.",
      },
      {
        title: "DaVinci Resolve",
        description:
          "Final color grading performed in Resolve to achieve the deep, high-contrast monochrome look consistent with the brand aesthetic.",
      },
      {
        title: "Premiere Pro",
        description:
          "Assembly editing and final deliverable export across multiple aspect ratios for digital, cinema, and social platforms.",
      },
    ],
  },

  "minimalist-web": {
    id: "5",
    slug: "minimalist-web",
    category: "Web Design",
    categoryId: "web-design",
    title: "Minimalist Web",
    description: "E-commerce platform for boutique furniture.",
    image: {
      src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
      alt: "Lamp in dark room",
    },
    hero: {
      src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=85",
      alt: "Minimalist Web hero",
    },
    meta: [
      { label: "Customer", value: "Forma Living Stockholm" },
      { label: "Role", value: "Full-Stack Developer" },
      { label: "Timeline", value: "May 2024 — Aug 2024" },
    ],
    techStack: [
      { label: "Next.js", featured: true },
      { label: "TypeScript" },
      { label: "Tailwind CSS" },
      { label: "Stripe" },
      { label: "Sanity CMS" },
      { label: "Vercel" },
    ],
    overview:
      "A full-stack e-commerce platform for a Stockholm-based boutique furniture brand. Built on Next.js with headless CMS integration, the platform prioritizes content-first design and exceptional performance, achieving a 98 Lighthouse performance score.",
    jobDescription:
      "I designed and built the complete platform from ground up — including the design system, CMS schema, product catalog, shopping cart, and Stripe checkout flow. Special focus was placed on image performance and SEO for organic growth.",
    techDetails: [
      {
        title: "Next.js App Router",
        description:
          "Leveraged Next.js 14 App Router for server components, streaming, and optimized metadata generation for each product page.",
      },
      {
        title: "Sanity CMS",
        description:
          "Headless CMS for all content — products, collections, editorial pages — with a custom studio configuration for the client team.",
      },
      {
        title: "Stripe",
        description:
          "Full checkout integration including payment intents, webhook handling for order fulfillment, and customer portal for subscriptions.",
      },
      {
        title: "Tailwind CSS",
        description:
          "Design system built entirely in Tailwind with a custom theme reflecting the brand's refined Scandinavian aesthetic.",
      },
      {
        title: "Vercel",
        description:
          "Deployment platform providing edge network distribution, preview deployments, and real-time analytics.",
      },
      {
        title: "TypeScript",
        description:
          "Full type safety across the entire codebase including CMS schema types auto-generated from Sanity.",
      },
    ],
  },

  "core-identity": {
    id: "6",
    slug: "core-identity",
    category: "Brand Concept",
    categoryId: "brand-identity",
    title: "Core Identity",
    description: "Identity design for architectural firm.",
    image: {
      src: "https://images.unsplash.com/photo-1481026469463-66327c86e544?w=600&q=80",
      alt: "Modern staircase",
    },
    hero: {
      src: "https://images.unsplash.com/photo-1481026469463-66327c86e544?w=1600&q=85",
      alt: "Core Identity hero",
    },
    meta: [
      { label: "Customer", value: "Linework Architects" },
      { label: "Role", value: "Brand Identity Designer" },
      { label: "Timeline", value: "Feb 2024 — Apr 2024" },
    ],
    techStack: [
      { label: "Figma", featured: true },
      { label: "Adobe Illustrator" },
      { label: "Adobe InDesign" },
      { label: "Webflow" },
    ],
    overview:
      "A comprehensive brand identity system for a Singapore-based architectural firm specializing in civic and cultural buildings. The identity draws from architectural grid systems and materiality, translating structural principles into a cohesive visual language.",
    jobDescription:
      "I developed the brand strategy and full identity suite — including wordmark, symbol, color system, typography, stationery, and signage guidelines. The project concluded with a Webflow website that acts as a living brand showcase.",
    techDetails: [
      {
        title: "Figma",
        description:
          "All design work from logo explorations to final component library and brand guidelines were built and delivered in Figma.",
      },
      {
        title: "Adobe Illustrator",
        description:
          "Logo mark and symbol construction, grid system documentation, and all vector artwork for print deliverables.",
      },
      {
        title: "Adobe InDesign",
        description:
          "Brand guidelines document, stationery system, and presentation templates designed for print and digital distribution.",
      },
      {
        title: "Webflow",
        description:
          "No-code website implementation enabling the client team to manage content independently post-launch.",
      },
    ],
  },
};

// ─── Detail helper ────────────────────────────────────────
// Returns the detail by slug, or undefined if not found

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return PORTFOLIO_DETAILS[slug];
}

// Returns prev/next projects for navigation
export function getAdjacentProjects(slug: string): {
  prev: PortfolioProject | null;
  next: PortfolioProject | null;
} {
  const idx = PORTFOLIO_PROJECTS.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? PORTFOLIO_PROJECTS[idx - 1] : null,
    next:
      idx < PORTFOLIO_PROJECTS.length - 1 ? PORTFOLIO_PROJECTS[idx + 1] : null,
  };
}
