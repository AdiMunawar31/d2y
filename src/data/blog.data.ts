// ============================================================
// BLOG PAGE — Static data & content
// (Will be replaced by CMS data in production)
// ============================================================

// ─── Hero ─────────────────────────────────────────────────

export const BLOG_HERO = {
  headline: ["LATEST", "ARTICLES."],
  description:
    "A curated collection of thoughts on design, minimalist technology, and modern philosophy. Exploring the intersection of form and function.",
} as const;

// ─── Posts ────────────────────────────────────────────────

export interface BlogPost {
  id: string;
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: {
    src: string;
    alt: string;
  };
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "architecture-of-negative-space",
    category: "Design",
    date: "Oct 24, 2023",
    title: "The Architecture of Negative Space",
    excerpt:
      "Exploring how the absence of elements can create a more powerful visual narrative in modern user interfaces and physical environments.",
    image: {
      src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
      alt: "Minimalist desk setup with lamp",
    },
  },
  {
    id: "2",
    slug: "analog-distractions-digital-age",
    category: "Technology",
    date: "Oct 18, 2023",
    title: "Analog Distractions in a Digital Age",
    excerpt:
      "Why we are increasingly turning back to physical mediums and tactile experiences to find focus in an era of notifications.",
    image: {
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
      alt: "Retro technology parts",
    },
  },
  {
    id: "3",
    slug: "brutalism-and-the-web",
    category: "Philosophy",
    date: "Oct 12, 2023",
    title: "Brutalism and the Web",
    excerpt:
      "Examining the resurgence of raw, unpolished design aesthetics and what it means for the future of digital product experiences.",
    image: {
      src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
      alt: "Modernist concrete building",
    },
  },
  {
    id: "4",
    slug: "conversation-dieter-rams",
    category: "Interviews",
    date: "Oct 05, 2023",
    title: "Conversation with Dieter Rams",
    excerpt:
      "A rare look into the ten principles of good design and how they apply to the shifting landscape of artificial intelligence.",
    image: {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      alt: "Person using tablet",
    },
  },
];

// ─── Categories ───────────────────────────────────────────

export interface BlogCategory {
  id: string;
  label: string;
  count: number;
  slug: string;
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  { id: "design", label: "Design", count: 12, slug: "design" },
  { id: "technology", label: "Technology", count: 8, slug: "technology" },
  { id: "philosophy", label: "Philosophy", count: 5, slug: "philosophy" },
  { id: "archive", label: "Archive", count: 24, slug: "archive" },
  { id: "interviews", label: "Interviews", count: 3, slug: "interviews" },
];

// ─── Tags ─────────────────────────────────────────────────

export const BLOG_TAGS: string[] = [
  "minimalism",
  "focus",
  "ux-design",
  "architecture",
  "monochrome",
];

// ─── Newsletter ───────────────────────────────────────────

export const NEWSLETTER = {
  label: "Newsletter",
  description:
    "Join 5,000+ others who receive our weekly editorial on minimalism and focus.",
  placeholder: "Email address",
  cta: "Subscribe",
} as const;

// ─── Pagination ───────────────────────────────────────────

export const PAGINATION = {
  totalPages: 3,
  currentPage: 1,
} as const;
