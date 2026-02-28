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

// ─── Blog Detail ──────────────────────────────────────────
// Full article data — loaded dynamically by slug

export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  socials: { label: string; href: string }[];
}

export interface BlogComment {
  id: string;
  author: string;
  date: string;
  body: string;
  parentId?: string; // nested reply support
}

export interface RelatedPost {
  slug: string;
  category: string;
  title: string;
  image: { src: string; alt: string };
}

export interface ContentBlock {
  type: "paragraph" | "heading" | "blockquote" | "lead";
  content: string;
  attribution?: string; // for blockquote
}

export interface BlogPostDetail extends BlogPost {
  readTime: string;
  hero: { src: string; alt: string; caption?: string };
  author: BlogAuthor;
  content: ContentBlock[];
  comments: BlogComment[];
  related: RelatedPost[];
}

export const BLOG_POST_DETAILS: Record<string, BlogPostDetail> = {
  "architecture-of-negative-space": {
    id: "1",
    slug: "architecture-of-negative-space",
    category: "Design Theory",
    date: "Oct 24, 2023",
    title: "The Architecture of Minimalism in Modern Web Design",
    excerpt:
      "Exploring how the absence of elements can create a more powerful visual narrative in modern user interfaces and physical environments.",
    readTime: "8 Min Read",
    image: {
      src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
      alt: "Minimalist desk",
    },
    hero: {
      src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1400&q=85",
      alt: "Modern minimalist skyscraper architecture",
      caption:
        "Structural purity in the concrete jungle. Photography by Elias Meyer.",
    },
    author: {
      name: "Alexander Chen",
      role: "Design Director",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
      bio: "Alexander is a design architect and strategist based in Berlin. He focuses on the intersection of human psychology and digital interfaces, advocating for a more deliberate and quiet web.",
      socials: [
        { label: "Twitter", href: "#" },
        { label: "Portfolio", href: "#" },
        { label: "LinkedIn", href: "#" },
      ],
    },
    content: [
      {
        type: "lead",
        content:
          "Minimalism is not just the absence of elements; it is the presence of clarity. In the digital age, where information overload is the default state, brutalist aesthetics and functional user experiences are merging to redefine how we interact with the web.",
      },
      {
        type: "paragraph",
        content:
          "For decades, web design has oscillated between rich textures and flat interfaces. Today, we are seeing a return to the fundamentals of architecture—focusing on space, rhythm, and structural integrity rather than mere decoration. This shift, often termed 'Web Brutalism' or 'Digital Minimalism,' prioritizes the core content above all else.",
      },
      {
        type: "heading",
        content: "The Rule of Negative Space",
      },
      {
        type: "paragraph",
        content:
          "In architecture, space defines the building as much as the walls. In UI design, white space is the silence between the notes that makes the music possible. It directs the eye, reduces cognitive load, and creates a sense of luxury and breathing room.",
      },
      {
        type: "blockquote",
        content:
          '"Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away."',
        attribution: "— Antoine de Saint-Exupéry",
      },
      {
        type: "paragraph",
        content:
          "When we strip away the gradients, the drop shadows, and the unnecessary carousels, what remains is the message. This requires a courageous level of restraint from designers and stakeholders alike.",
      },
      {
        type: "heading",
        content: "Structure as Aesthetic",
      },
      {
        type: "paragraph",
        content:
          "The most enduring designs share a common trait: their structure is their aesthetic. The grid is not hidden beneath the content — it is the content. Every column, every row, every margin tells the story of intention and deliberate constraint.",
      },
      {
        type: "paragraph",
        content:
          "This approach demands a fundamental rethinking of how we begin the design process. Rather than starting with visual decoration, we must first establish the underlying system — the typographic scale, the spacing units, the rhythm of the page — before a single visual element is placed.",
      },
    ],
    comments: [
      {
        id: "c1",
        author: "Sarah Jenkins",
        date: "2 days ago",
        body: 'This resonates deeply. We spend so much time making things "look good" that we forget to make them feel useful. The point about structural integrity in UI is fascinating.',
      },
      {
        id: "c2",
        author: "Marcus Thorne",
        date: "1 day ago",
        body: "Agreed. Less is indeed more. I've found that reducing font sizes and increasing letter spacing helps achieve that 'architectural' feel you mentioned.",
        parentId: "c1",
      },
      {
        id: "c3",
        author: "Yuki Tanaka",
        date: "12 hours ago",
        body: "Wonderful piece. The Saint-Exupéry quote is perfect here. Japanese design philosophy — ma (間) — is essentially the same concept but rooted in centuries of spatial tradition.",
      },
    ],
    related: [
      {
        slug: "analog-distractions-digital-age",
        category: "Interior Design",
        title: "The Psychology of Empty Rooms",
        image: {
          src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
          alt: "Minimalist chair and lamp",
        },
      },
      {
        slug: "brutalism-and-the-web",
        category: "Visual Arts",
        title: "Why Black and White Never Fades",
        image: {
          src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80",
          alt: "Black abstract shapes",
        },
      },
      {
        slug: "conversation-dieter-rams",
        category: "Productivity",
        title: "Defining Digital Essentialism",
        image: {
          src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
          alt: "Clean desk setup",
        },
      },
    ],
  },

  "analog-distractions-digital-age": {
    id: "2",
    slug: "analog-distractions-digital-age",
    category: "Technology",
    date: "Oct 18, 2023",
    title: "Analog Distractions in a Digital Age",
    excerpt:
      "Why we are increasingly turning back to physical mediums and tactile experiences to find focus in an era of notifications.",
    readTime: "6 Min Read",
    image: {
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
      alt: "Retro tech",
    },
    hero: {
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=85",
      alt: "Retro technology parts",
      caption: "The tactile feedback of physical objects grounds us.",
    },
    author: {
      name: "Alexander Chen",
      role: "Design Director",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
      bio: "Alexander is a design architect and strategist based in Berlin. He focuses on the intersection of human psychology and digital interfaces.",
      socials: [
        { label: "Twitter", href: "#" },
        { label: "Portfolio", href: "#" },
        { label: "LinkedIn", href: "#" },
      ],
    },
    content: [
      {
        type: "lead",
        content:
          "In an era of infinite scroll and push notifications, the humble notebook has become a radical act of resistance.",
      },
      {
        type: "paragraph",
        content:
          "There is something deeply human about making a mark on paper. The resistance of the pen, the permanence of the ink, the weight of the pages — these physical cues signal to our brains that what we are doing matters. It is slow, intentional, and irreversible in a way that digital creation never quite is.",
      },
      { type: "heading", content: "The Tactile Feedback Loop" },
      {
        type: "paragraph",
        content:
          "Neuroscience increasingly suggests that physical interaction with materials engages different — and often deeper — cognitive pathways than their digital equivalents. The motor memory of writing by hand strengthens recall. The limitation of a fixed page forces ruthless prioritization.",
      },
      {
        type: "blockquote",
        content: '"The medium is the message."',
        attribution: "— Marshall McLuhan",
      },
      {
        type: "paragraph",
        content:
          "What McLuhan understood decades before the smartphone was that how we communicate fundamentally shapes what we communicate. A memo in fountain pen on heavy stock carries different weight — literally and figuratively — than a Slack message.",
      },
    ],
    comments: [
      {
        id: "c1",
        author: "Priya Nair",
        date: "3 days ago",
        body: "I switched to a paper planner last year and my productivity increased dramatically. There is something about the physical act of crossing off a task.",
      },
      {
        id: "c2",
        author: "Tom Ritter",
        date: "1 day ago",
        body: "The irony of reading this on a screen is not lost on me. But yes, my Leuchtturm notebook is my most treasured work tool.",
      },
    ],
    related: [
      {
        slug: "architecture-of-negative-space",
        category: "Design",
        title: "The Architecture of Minimalism",
        image: {
          src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&q=80",
          alt: "Architecture",
        },
      },
      {
        slug: "brutalism-and-the-web",
        category: "Philosophy",
        title: "Brutalism and the Web",
        image: {
          src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80",
          alt: "Concrete",
        },
      },
      {
        slug: "conversation-dieter-rams",
        category: "Interviews",
        title: "Conversation with Dieter Rams",
        image: {
          src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
          alt: "Interview",
        },
      },
    ],
  },

  "brutalism-and-the-web": {
    id: "3",
    slug: "brutalism-and-the-web",
    category: "Philosophy",
    date: "Oct 12, 2023",
    title: "Brutalism and the Web",
    excerpt:
      "Examining the resurgence of raw, unpolished design aesthetics and what it means for the future of digital product experiences.",
    readTime: "7 Min Read",
    image: {
      src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
      alt: "Concrete",
    },
    hero: {
      src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=85",
      alt: "Modernist concrete building",
      caption: "Raw concrete — the honest material.",
    },
    author: {
      name: "Alexander Chen",
      role: "Design Director",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
      bio: "Alexander is a design architect and strategist based in Berlin.",
      socials: [
        { label: "Twitter", href: "#" },
        { label: "Portfolio", href: "#" },
      ],
    },
    content: [
      {
        type: "lead",
        content:
          "Web brutalism is not ugliness. It is honesty. It is the refusal to hide structure behind decoration.",
      },
      {
        type: "paragraph",
        content:
          "The term 'brutalism' derives not from brutality but from the French béton brut — raw concrete. Architectural brutalism celebrated the honesty of materials: exposed structure, visible joins, unfinished surfaces. Nothing was hidden.",
      },
      { type: "heading", content: "Digital Raw Concrete" },
      {
        type: "paragraph",
        content:
          "When applied to the web, this philosophy manifests as visible grids, monospace fonts, thick borders, and a rejection of drop shadows and gradients. The HTML structure is the design. The content is the aesthetic.",
      },
      {
        type: "blockquote",
        content: '"We shape our tools, and thereafter our tools shape us."',
        attribution: "— Marshall McLuhan",
      },
      {
        type: "paragraph",
        content:
          "Today's brutalist web movement is partly a reaction to the homogenized sameness of modern SaaS products — all using the same Inter typeface, the same rounded cards, the same Tailwind blue. Brutalism asks: what if we stopped pretending?",
      },
    ],
    comments: [
      {
        id: "c1",
        author: "David Osei",
        date: "5 days ago",
        body: "Craigslist is the ultimate brutalist website, and it still drives billions in transactions. Function over form at its purest.",
      },
    ],
    related: [
      {
        slug: "architecture-of-negative-space",
        category: "Design",
        title: "The Architecture of Minimalism",
        image: {
          src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&q=80",
          alt: "Architecture",
        },
      },
      {
        slug: "analog-distractions-digital-age",
        category: "Technology",
        title: "Analog Distractions",
        image: {
          src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
          alt: "Analog",
        },
      },
      {
        slug: "conversation-dieter-rams",
        category: "Interviews",
        title: "Conversation with Dieter Rams",
        image: {
          src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
          alt: "Interview",
        },
      },
    ],
  },

  "conversation-dieter-rams": {
    id: "4",
    slug: "conversation-dieter-rams",
    category: "Interviews",
    date: "Oct 05, 2023",
    title: "A Rare Conversation with Dieter Rams",
    excerpt:
      "A rare look into the ten principles of good design and how they apply to the shifting landscape of artificial intelligence.",
    readTime: "10 Min Read",
    image: {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      alt: "Interview",
    },
    hero: {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=85",
      alt: "Interview setting",
      caption: "A conversation on permanence in a disposable age.",
    },
    author: {
      name: "Alexander Chen",
      role: "Design Director",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
      bio: "Alexander is a design architect and strategist based in Berlin.",
      socials: [
        { label: "Twitter", href: "#" },
        { label: "Portfolio", href: "#" },
      ],
    },
    content: [
      {
        type: "lead",
        content:
          "When Dieter Rams articulated his ten principles in the 1970s, he could not have imagined a world where design would be generated by algorithms. Yet his principles feel more urgent now than ever.",
      },
      {
        type: "paragraph",
        content:
          '"Good design is as little design as possible." This, the tenth principle, is the one that stops most designers cold. It asks us to remove ourselves from the work — to be invisible.',
      },
      { type: "heading", content: "On Artificial Intelligence" },
      {
        type: "paragraph",
        content:
          'I asked him whether AI design tools represented the culmination of his principles or their betrayal. His answer was characteristically precise: "A tool does not have values. The person holding it does."',
      },
      {
        type: "blockquote",
        content:
          '"Good design is honest. It does not make a product more innovative, powerful or valuable than it really is."',
        attribution: "— Dieter Rams",
      },
      {
        type: "paragraph",
        content:
          "This principle — honesty in design — is perhaps the most endangered in an era of AI-generated imagery, dark patterns, and growth hacking. The temptation to make things appear better than they are has never been stronger, nor easier to indulge.",
      },
    ],
    comments: [
      {
        id: "c1",
        author: "Nina Petrov",
        date: "1 week ago",
        body: "The quote about tools and values is everything. We keep debating AI as if it has agency. It does not. We do.",
      },
      {
        id: "c2",
        author: "James Wu",
        date: "4 days ago",
        body: "Principle ten is the one I always come back to. When in doubt, remove something.",
        parentId: "c1",
      },
    ],
    related: [
      {
        slug: "architecture-of-negative-space",
        category: "Design",
        title: "The Architecture of Minimalism",
        image: {
          src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&q=80",
          alt: "Architecture",
        },
      },
      {
        slug: "brutalism-and-the-web",
        category: "Philosophy",
        title: "Brutalism and the Web",
        image: {
          src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80",
          alt: "Concrete",
        },
      },
      {
        slug: "analog-distractions-digital-age",
        category: "Technology",
        title: "Analog Distractions",
        image: {
          src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
          alt: "Analog",
        },
      },
    ],
  },
};

// ─── Detail helpers ───────────────────────────────────────

export function getBlogPostBySlug(slug: string): BlogPostDetail | undefined {
  return BLOG_POST_DETAILS[slug];
}

export function getAdjacentBlogPosts(slug: string): {
  prev: BlogPost | null;
  next: BlogPost | null;
} {
  const idx = BLOG_POSTS.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? BLOG_POSTS[idx - 1] : null,
    next: idx < BLOG_POSTS.length - 1 ? BLOG_POSTS[idx + 1] : null,
  };
}
