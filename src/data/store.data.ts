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
  soldOut?: boolean;
  badge?: string;
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
