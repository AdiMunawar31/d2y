// ============================================================
// HOME PAGE — Static data & content
// ============================================================

export const HERO_DATA = {
  eyebrow: "Global Creative Partner",
  headline: ["Architecting", "Digital", "Excellence."],
  subtext:
    "Engineering high-end digital interfaces where strategic design meets enterprise-grade execution.",
  cta: {
    primary: { label: "View Case Studies", href: "/about" },
  },
  currentProject: {
    label: "Current Project",
    name: "Lumina OS 2.0",
  },
  image: {
    src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=85",
    alt: "Minimalist high-end architecture detail",
  },
} as const;

export const BLOG_POSTS = [
  {
    id: "future-minimalist-ui",
    category: "Design",
    date: "12.10.23",
    title: "The Future of Minimalist UI",
    href: "/blog/future-minimalist-ui",
    image: {
      src: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&q=80",
      alt: "Minimalist UI design",
    },
  },
  {
    id: "why-less-is-more",
    category: "Process",
    date: "28.09.23",
    title: "Why Less is More",
    href: "/blog/why-less-is-more",
    image: {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
      alt: "Minimal workspace",
    },
  },
  {
    id: "mastering-negative-space",
    category: "Philosophy",
    date: "15.08.23",
    title: "Mastering Negative Space",
    href: "/blog/mastering-negative-space",
    image: {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
      alt: "Negative space in design",
    },
  },
] as const;

export const FEATURED_PRODUCT = {
  eyebrow: "Shop Spotlight",
  title: "The 2026 Design System Kit",
  description:
    "A comprehensive toolkit for modern designers. 500+ components, fully documented, and ready for production.",
  price: "$49",
  cta: "Buy Now",
  href: "/portfolio",
  image: {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBF4iJEvefjtE4WeTMZBU4X8y7PfRvgl9pwb6HD6u4mTvA-QzIE2JZzJJ4gleL43kOcDbsBIQT87dy4DQwCRIWqBW99NpSJ1wtd5jMcX5SGpXnPmguUFxSi0u_ETU7MKyLe7qvrzEUeXf2ShvwjP19YEC1HEkbYyPOcMdoUDmANUvQpOJEGvA8s5Vp5_84mnZPkUNf81k6kuQ4-F_ZCB2xXjVO0vye_ixrrq28LtuxEOvUaV5jOZvt4bczq_qm21x3-NX61sSbVM_g",
    alt: "Modern desk setup with professional design tools",
  },
} as const;

export const ABOUT_DATA = {
  title: "About Me",
  paragraphs: [
    "I am a designer and developer focused on crafting clean, purposeful interfaces. My philosophy is rooted in the belief that great design is invisible—it simply works.",
    "With over a decade of experience in digital product design, I help brands bridge the gap between complex engineering and human-centric design.",
  ],
  signature: "— Adi Munawawr, Software Developer",
  avatar: {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    alt: "Close-up portrait of the designer",
    name: "Adi Munawawr",
  },
  skills: [
    {
      id: "creative",
      title: "Creative Direction",
      description:
        "We define the visual language for industry-leading brands through rigorous aesthetic research and strategic vision.",
    },
    {
      id: "technical",
      title: "Technical Execution",
      description:
        "Bridging the gap between complex engineering and human interfaces with scalable, performant code architectures.",
    },
  ],
} as const;
