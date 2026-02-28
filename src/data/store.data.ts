// ============================================================
// STORE PAGE — Static data & content
// (Will be replaced by CMS/commerce data in production)
// ============================================================

// ─── Hero ─────────────────────────────────────────────────

export const STORE_HERO = {
  title: "Shop / Collection 01",
  description:
    "Curated essentials and digital assets designed for the modern minimalist. Limited run, high-quality production.",
} as const;

// ─── Categories ───────────────────────────────────────────

export interface StoreCategory {
  id: string;
  label: string;
  count: number;
}

export const STORE_CATEGORIES: StoreCategory[] = [
  { id: "all", label: "All Products", count: 24 },
  { id: "digital-downloads", label: "Digital Downloads", count: 8 },
  { id: "apparel", label: "Apparel", count: 12 },
  { id: "accessories", label: "Accessories", count: 4 },
];

// ─── Sort options ─────────────────────────────────────────

export type SortOption = "newest" | "price-asc" | "price-desc";

export interface StoreSortOption {
  value: SortOption;
  label: string;
}

export const SORT_OPTIONS: StoreSortOption[] = [
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

// ─── Products ─────────────────────────────────────────────

export interface StoreProduct {
  id: string;
  slug: string;
  title: string;
  categoryId: string;
  categoryLabel: string;
  price: number;
  badge?: string;
  soldOut?: boolean;
  image: {
    src: string;
    alt: string;
  };
}

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    id: "1",
    slug: "core-tee-noir",
    title: "Core Tee / Noir",
    categoryId: "apparel",
    categoryLabel: "Apparel",
    price: 55,
    image: {
      src: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
      alt: "Black oversized heavy cotton t-shirt",
    },
  },
  {
    id: "2",
    slug: "concept-poster-01",
    title: "Concept Poster 01",
    categoryId: "digital-downloads",
    categoryLabel: "Digital Download",
    price: 12,
    badge: "Digital",
    image: {
      src: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?w=600&q=80",
      alt: "Abstract geometric digital poster print",
    },
  },
  {
    id: "3",
    slug: "urban-carry-all",
    title: "Urban Carry-all",
    categoryId: "accessories",
    categoryLabel: "Accessories",
    price: 185,
    image: {
      src: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
      alt: "Minimalist black leather backpack",
    },
  },
  {
    id: "4",
    slug: "shade-02-matte",
    title: "Shade 02 / Matte",
    categoryId: "accessories",
    categoryLabel: "Accessories",
    price: 95,
    image: {
      src: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
      alt: "Matte black sunglasses in case",
    },
  },
  {
    id: "5",
    slug: "structure-jacket",
    title: "Structure Jacket",
    categoryId: "apparel",
    categoryLabel: "Apparel",
    price: 120,
    image: {
      src: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
      alt: "Black heavy denim jacket",
    },
  },
  {
    id: "6",
    slug: "theory-vol-1",
    title: "Theory Vol. 1",
    categoryId: "digital-downloads",
    categoryLabel: "Limited Edition",
    price: 45,
    soldOut: true,
    badge: "Sold Out",
    image: {
      src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80",
      alt: "Stack of minimalist design books",
    },
  },
  {
    id: "7",
    slug: "system-one-hoodie",
    title: "System One Hoodie",
    categoryId: "apparel",
    categoryLabel: "Apparel",
    price: 88,
    image: {
      src: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80",
      alt: "Heavy cotton black hoodie",
    },
  },
  {
    id: "8",
    slug: "grid-system-kit",
    title: "Grid System Kit",
    categoryId: "digital-downloads",
    categoryLabel: "Digital Download",
    price: 24,
    badge: "Digital",
    image: {
      src: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&q=80",
      alt: "Design grid system template",
    },
  },
  {
    id: "9",
    slug: "minimal-cap",
    title: "Minimal Cap / Ink",
    categoryId: "accessories",
    categoryLabel: "Accessories",
    price: 42,
    image: {
      src: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80",
      alt: "Minimal black cap",
    },
  },
];

// ─── Newsletter ───────────────────────────────────────────

export const STORE_NEWSLETTER = {
  title: "Newsletter",
  description: "Join for early access to Collection 02.",
  placeholder: "Email Address",
  cta: "Subscribe",
} as const;

// ─── Product Detail ───────────────────────────────────────

export interface ProductColor {
  id: string;
  label: string;
  hex: string;
}

export interface ProductSize {
  label: string;
  outOfStock?: boolean;
}

export interface AccordionItem {
  id: string;
  title: string;
  content: string | string[];
}

export interface ProductReview {
  id: string;
  author: string;
  date: string;
  rating: number;
  body: string;
  verified?: boolean;
}

export interface RatingBar {
  stars: number;
  percent: number;
}

export interface RatingBreakdown {
  stars: number;
  percentage: number;
}

export interface AccordionSection {
  id: string;
  title: string;
  content: string | string[];
}

export interface StoreProductDetail extends StoreProduct {
  subtitle: string;
  fullDescription: string;
  images: { src: string; alt: string }[];
  colors: ProductColor[];
  sizes: ProductSize[];
  accordion: AccordionSection[];
  rating: number;
  reviewCount: number;
  ratingBreakdown: RatingBreakdown[];
  reviews: ProductReview[];
}

// ─── Detail helpers ───────────────────────────────────────

export function getAdjacentProducts(slug: string): {
  prev: StoreProduct | null;
  next: StoreProduct | null;
} {
  const allSlugs = Object.keys(STORE_PRODUCT_DETAILS);
  const idx = allSlugs.indexOf(slug);
  const prevSlug = idx > 0 ? allSlugs[idx - 1] : null;
  const nextSlug = idx < allSlugs.length - 1 ? allSlugs[idx + 1] : null;
  return {
    prev: prevSlug ? STORE_PRODUCT_DETAILS[prevSlug] : null,
    next: nextSlug ? STORE_PRODUCT_DETAILS[nextSlug] : null,
  };
}

// ─── Product Detail ───────────────────────────────────────

export interface ProductColor {
  id: string;
  label: string;
  hex: string;
}

export interface ProductSize {
  label: string;
  outOfStock?: boolean;
}

export interface AccordionItem {
  id: string;
  title: string;
  content: string | string[];
}

export interface ProductReview {
  id: string;
  author: string;
  date: string;
  rating: number; // 1-5
  body: string;
  verified?: boolean;
}

export interface RatingBar {
  stars: number;
  percent: number;
}

export interface ProductDetail extends StoreProduct {
  edition?: string;
  images: { src: string; alt: string }[];
  colors: ProductColor[];
  sizes: ProductSize[];
  accordion: AccordionItem[];
  reviews: ProductReview[];
  ratingAvg: number;
  ratingCount: number;
  ratingBars: RatingBar[];
  related: string[];
}

export const STORE_PRODUCT_DETAILS: Record<string, ProductDetail> = {
  "core-tee-noir": {
    id: "1",
    slug: "core-tee-noir",
    title: "Core Tee / Noir",
    categoryId: "apparel",
    categoryLabel: "Apparel",
    price: 55,
    edition: "Collection 01 / Essentials",
    image: {
      src: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=85",
      alt: "Black tee main",
    },
    images: [
      {
        src: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=85",
        alt: "Front view",
      },
      {
        src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=85",
        alt: "Detail stitching",
      },
      {
        src: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=85",
        alt: "Back view",
      },
      {
        src: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=85",
        alt: "Fabric close-up",
      },
    ],
    colors: [
      { id: "noir", label: "Noir", hex: "#0a0a0a" },
      { id: "slate", label: "Slate", hex: "#94a3b8" },
      { id: "chalk", label: "Chalk", hex: "#f1f5f9" },
    ],
    sizes: [
      { label: "XS" },
      { label: "S" },
      { label: "M" },
      { label: "L" },
      { label: "XL" },
      { label: "XXL", outOfStock: true },
    ],
    accordion: [
      {
        id: "description",
        title: "Description",
        content:
          "An essential heavyweight cotton tee built to last a lifetime. Cut from 320gsm combed organic cotton with a boxy, relaxed silhouette. Garment-dyed for a lived-in depth that improves with every wash. No branding. No excess.",
      },
      {
        id: "shipping",
        title: "Shipping & Returns",
        content: [
          "Standard delivery: 3–5 business days.",
          "Complimentary shipping on orders over $150.",
          "30-day return policy for unworn items in original packaging.",
        ],
      },
      {
        id: "care",
        title: "Care Instructions",
        content: [
          "Cold machine wash, inside out.",
          "Do not tumble dry.",
          "Iron inside out on low heat.",
        ],
      },
    ],
    reviews: [
      {
        id: "r1",
        author: "Marcus T.",
        date: "Nov 2, 2023",
        rating: 5,
        body: '"The weight of this tee is unlike anything I\'ve owned. Structured but drapes beautifully. The boxy cut is perfect for layering."',
        verified: true,
      },
      {
        id: "r2",
        author: "Yuki N.",
        date: "Oct 14, 2023",
        rating: 4,
        body: '"Excellent quality. The fabric is thick and premium. I sized down from a medium to a small and it fits perfectly."',
        verified: true,
      },
    ],
    ratingAvg: 4.7,
    ratingCount: 89,
    ratingBars: [
      { stars: 5, percent: 78 },
      { stars: 4, percent: 15 },
      { stars: 3, percent: 5 },
      { stars: 2, percent: 2 },
    ],
    related: ["structure-jacket", "system-one-hoodie", "minimal-cap"],
  },

  "urban-carry-all": {
    id: "3",
    slug: "urban-carry-all",
    title: "Urban Carry-all",
    categoryId: "accessories",
    categoryLabel: "Accessories",
    price: 185,
    edition: "Limited Edition / AWD-24",
    image: {
      src: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=85",
      alt: "Black backpack main",
    },
    images: [
      {
        src: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=85",
        alt: "Front profile",
      },
      {
        src: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=800&q=85",
        alt: "Interior view",
      },
      {
        src: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=85",
        alt: "Detail hardware",
      },
      {
        src: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=85",
        alt: "Side profile",
      },
    ],
    colors: [
      { id: "black", label: "Black", hex: "#0a0a0a" },
      { id: "olive", label: "Olive", hex: "#4a5340" },
    ],
    sizes: [{ label: "20L" }, { label: "28L" }],
    accordion: [
      {
        id: "description",
        title: "Description",
        content:
          'Full-grain vegetable-tanned leather with a minimal external profile and a highly organized interior. YKK zippers, solid brass hardware, and a padded 15" laptop sleeve. Designed to age beautifully — the leather will patina with character over time.',
      },
      {
        id: "shipping",
        title: "Shipping & Returns",
        content: [
          "Standard delivery: 3–5 business days.",
          "Complimentary shipping on orders over $150.",
          "30-day return policy for unused items in original packaging.",
        ],
      },
      {
        id: "dimensions",
        title: "Dimensions & Materials",
        content: [
          "20L: 42 × 30 × 16 cm · 680g",
          "28L: 48 × 32 × 18 cm · 820g",
          "Full-grain vegetable-tanned cowhide.",
          "YKK SRS zippers · Solid brass hardware.",
        ],
      },
    ],
    reviews: [
      {
        id: "r1",
        author: "David O.",
        date: "Oct 30, 2023",
        rating: 5,
        body: '"After three years of abuse, this bag has developed the most beautiful patina. The leather has aged exactly as promised — dark and character-rich."',
        verified: true,
      },
      {
        id: "r2",
        author: "Elena S.",
        date: "Sep 22, 2023",
        rating: 5,
        body: '"Worth every cent. The organization is unmatched and the leather quality is on par with bags that cost twice the price."',
        verified: true,
      },
    ],
    ratingAvg: 4.9,
    ratingCount: 47,
    ratingBars: [
      { stars: 5, percent: 91 },
      { stars: 4, percent: 7 },
      { stars: 3, percent: 2 },
      { stars: 2, percent: 0 },
    ],
    related: ["shade-02-matte", "minimal-cap", "core-tee-noir"],
  },

  "shade-02-matte": {
    id: "4",
    slug: "shade-02-matte",
    title: "Shade 02 / Matte",
    categoryId: "accessories",
    categoryLabel: "Accessories",
    price: 95,
    edition: "Collection 01 / Eyewear",
    image: {
      src: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=85",
      alt: "Matte black sunglasses main",
    },
    images: [
      {
        src: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=85",
        alt: "Front view",
      },
      {
        src: "https://images.unsplash.com/photo-1473496169904-658ba7574b0d?w=800&q=85",
        alt: "Profile view",
      },
      {
        src: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&q=85",
        alt: "On model",
      },
      {
        src: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=800&q=85",
        alt: "Case view",
      },
    ],
    colors: [
      { id: "matte-black", label: "Matte Black", hex: "#1a1a1a" },
      { id: "tortoise", label: "Tortoise", hex: "#6b4423" },
    ],
    sizes: [{ label: "One Size" }],
    accordion: [
      {
        id: "description",
        title: "Description",
        content:
          "Hand-finished acetate frames with CR-39 mineral glass lenses. Matte black with 100% UVA/UVB protection and category 3 tint. Comes with a hand-stitched leather case and microfibre cloth. Made in Italy.",
      },
      {
        id: "shipping",
        title: "Shipping & Returns",
        content: [
          "Standard delivery: 3–5 business days.",
          "Complimentary shipping on all eyewear orders.",
          "30-day return policy.",
        ],
      },
      {
        id: "specs",
        title: "Technical Specs",
        content: [
          "Frame: Cellulose acetate · 2.4mm thickness.",
          "Lenses: CR-39 mineral glass · Cat. 3 · 85% UV block.",
          "Frame width: 140mm · Bridge: 18mm · Temple: 145mm.",
        ],
      },
    ],
    reviews: [
      {
        id: "r1",
        author: "Alexander V.",
        date: "Oct 12, 2023",
        rating: 5,
        body: '"The matte finish is flawless — no reflection, no shine. These look architectural on the face. The lens clarity is superb."',
        verified: true,
      },
      {
        id: "r2",
        author: "Priya N.",
        date: "Sep 5, 2023",
        rating: 4,
        body: '"Beautiful frames. Slightly heavier than expected but the quality of the acetate and glass is exceptional. Very satisfied."',
        verified: true,
      },
    ],
    ratingAvg: 4.8,
    ratingCount: 124,
    ratingBars: [
      { stars: 5, percent: 85 },
      { stars: 4, percent: 10 },
      { stars: 3, percent: 3 },
      { stars: 2, percent: 1 },
    ],
    related: ["urban-carry-all", "minimal-cap", "structure-jacket"],
  },

  "structure-jacket": {
    id: "5",
    slug: "structure-jacket",
    title: "Structure Jacket",
    categoryId: "apparel",
    categoryLabel: "Apparel",
    price: 120,
    edition: "Collection 01 / Outerwear",
    image: {
      src: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=85",
      alt: "Black jacket main",
    },
    images: [
      {
        src: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=85",
        alt: "Front view",
      },
      {
        src: "https://images.unsplash.com/photo-1547119957-637f8679db1e?w=800&q=85",
        alt: "Back view",
      },
      {
        src: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&q=85",
        alt: "Detail",
      },
      {
        src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=85",
        alt: "On model",
      },
    ],
    colors: [
      { id: "black", label: "Black", hex: "#0a0a0a" },
      { id: "indigo", label: "Raw Indigo", hex: "#1e2a45" },
    ],
    sizes: [
      { label: "S" },
      { label: "M" },
      { label: "L" },
      { label: "XL" },
      { label: "XXL", outOfStock: true },
    ],
    accordion: [
      {
        id: "description",
        title: "Description",
        content:
          "14oz heavy-selvedge denim with a rigid structured silhouette that softens with wear. Antique brass YKK zippers and reinforced stress points. Designed to be worn as a shell — unlined for clean layering under a coat.",
      },
      {
        id: "shipping",
        title: "Shipping & Returns",
        content: [
          "Standard delivery: 3–5 business days.",
          "Complimentary shipping on orders over $150.",
          "30-day return for unworn items.",
        ],
      },
      {
        id: "care",
        title: "Care Instructions",
        content: [
          "Spot clean where possible.",
          "Cold wash, inside out, max 30°C.",
          "Do not tumble dry. Air dry flat.",
          "Selvedge denim will fade naturally with wear.",
        ],
      },
    ],
    reviews: [
      {
        id: "r1",
        author: "James W.",
        date: "Nov 8, 2023",
        rating: 5,
        body: '"The structure of this jacket is remarkable. It holds its shape perfectly. After 6 months the denim has started to fade in all the right places."',
        verified: true,
      },
      {
        id: "r2",
        author: "Sarah K.",
        date: "Oct 19, 2023",
        rating: 4,
        body: '"Excellent construction. I\'d suggest sizing up one — the cut is slim. Great piece that pairs with everything."',
        verified: true,
      },
    ],
    ratingAvg: 4.6,
    ratingCount: 62,
    ratingBars: [
      { stars: 5, percent: 72 },
      { stars: 4, percent: 20 },
      { stars: 3, percent: 6 },
      { stars: 2, percent: 2 },
    ],
    related: ["core-tee-noir", "system-one-hoodie", "minimal-cap"],
  },

  "system-one-hoodie": {
    id: "7",
    slug: "system-one-hoodie",
    title: "System One Hoodie",
    categoryId: "apparel",
    categoryLabel: "Apparel",
    price: 88,
    edition: "Collection 01 / Essentials",
    image: {
      src: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=85",
      alt: "Black hoodie main",
    },
    images: [
      {
        src: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=85",
        alt: "Front view",
      },
      {
        src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=85",
        alt: "Back view",
      },
      {
        src: "https://images.unsplash.com/photo-1484758508766-f4b2f36ab8db?w=800&q=85",
        alt: "Hood detail",
      },
      {
        src: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=85",
        alt: "Cuff detail",
      },
    ],
    colors: [
      { id: "black", label: "Black", hex: "#0a0a0a" },
      { id: "ash", label: "Ash", hex: "#9ca3af" },
    ],
    sizes: [
      { label: "S" },
      { label: "M" },
      { label: "L" },
      { label: "XL" },
      { label: "XXL" },
    ],
    accordion: [
      {
        id: "description",
        title: "Description",
        content:
          "500gsm heavyweight French terry. A unisex double-lined hood, kangaroo pocket with internal zip, and ribbed cuffs and hem. Garment-washed for instant softness. Built for decade-long ownership.",
      },
      {
        id: "shipping",
        title: "Shipping & Returns",
        content: [
          "Standard delivery: 3–5 business days.",
          "Complimentary shipping on orders over $150.",
          "30-day return for unworn items.",
        ],
      },
      {
        id: "care",
        title: "Care Instructions",
        content: [
          "Cold machine wash inside out.",
          "Tumble dry low or air dry flat.",
          "Do not bleach.",
        ],
      },
    ],
    reviews: [
      {
        id: "r1",
        author: "Nina P.",
        date: "Nov 15, 2023",
        rating: 5,
        body: '"This is the Platonic ideal of a hoodie. The weight is extraordinary — it feels like wearing a blanket. Fits true to size."',
        verified: true,
      },
      {
        id: "r2",
        author: "Tom R.",
        date: "Oct 28, 2023",
        rating: 5,
        body: '"Bought two. The internal zip on the kangaroo pocket is a genius detail I never knew I needed."',
        verified: true,
      },
    ],
    ratingAvg: 4.9,
    ratingCount: 201,
    ratingBars: [
      { stars: 5, percent: 92 },
      { stars: 4, percent: 6 },
      { stars: 3, percent: 2 },
      { stars: 2, percent: 0 },
    ],
    related: ["core-tee-noir", "structure-jacket", "minimal-cap"],
  },

  "minimal-cap": {
    id: "9",
    slug: "minimal-cap",
    title: "Minimal Cap / Ink",
    categoryId: "accessories",
    categoryLabel: "Accessories",
    price: 42,
    edition: "Collection 01 / Headwear",
    image: {
      src: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=85",
      alt: "Black cap main",
    },
    images: [
      {
        src: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=85",
        alt: "Front view",
      },
      {
        src: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=800&q=85",
        alt: "Side view",
      },
      {
        src: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&q=85",
        alt: "Back view",
      },
      {
        src: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=85",
        alt: "On model",
      },
    ],
    colors: [
      { id: "ink", label: "Ink", hex: "#0a0a0a" },
      { id: "ecru", label: "Ecru", hex: "#fef3c7" },
      { id: "stone", label: "Stone", hex: "#78716c" },
    ],
    sizes: [{ label: "One Size" }],
    accordion: [
      {
        id: "description",
        title: "Description",
        content:
          "6-panel unstructured cap in 100% washed twill. Tonal embroidery on the front panel, brass adjuster at back. Low-profile, clean silhouette. No embellishments, no logos — just form.",
      },
      {
        id: "shipping",
        title: "Shipping & Returns",
        content: [
          "Standard delivery: 3–5 business days.",
          "Complimentary shipping on orders over $150.",
          "30-day return for unused items.",
        ],
      },
      {
        id: "care",
        title: "Care Instructions",
        content: [
          "Hand wash cold or spot clean.",
          "Reshape while damp and air dry.",
          "Do not machine wash.",
        ],
      },
    ],
    reviews: [
      {
        id: "r1",
        author: "Yuki T.",
        date: "Nov 20, 2023",
        rating: 5,
        body: '"The fit is perfect — unstructured but holds shape. The tonal embroidery is very subtle. Exactly what I wanted."',
        verified: true,
      },
      {
        id: "r2",
        author: "Marcus L.",
        date: "Oct 31, 2023",
        rating: 4,
        body: '"Great quality cap. Washed twill is softer than expected. The brass adjuster is a nice premium touch."',
        verified: true,
      },
    ],
    ratingAvg: 4.7,
    ratingCount: 158,
    ratingBars: [
      { stars: 5, percent: 80 },
      { stars: 4, percent: 14 },
      { stars: 3, percent: 4 },
      { stars: 2, percent: 2 },
    ],
    related: ["core-tee-noir", "shade-02-matte", "urban-carry-all"],
  },
};

// ─── Detail helpers ───────────────────────────────────────

export function getProductBySlug(slug: string): ProductDetail | undefined {
  return STORE_PRODUCT_DETAILS[slug];
}

export function getRelatedProducts(slugs: string[]): StoreProduct[] {
  return slugs
    .map((slug) => STORE_PRODUCTS.find((p) => p.slug === slug))
    .filter(Boolean) as StoreProduct[];
}
