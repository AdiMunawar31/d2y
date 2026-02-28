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
