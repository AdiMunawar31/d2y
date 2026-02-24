// ============================================================
// CONSTANTS — Index
// ============================================================

export * from "./colors";
export * from "./typography";

// ─── Spacing ──────────────────────────────────────────────
export const SPACING = {
  0: "0px",
  1: "0.25rem", // 4px
  2: "0.5rem", // 8px
  3: "0.75rem", // 12px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  8: "2rem", // 32px
  10: "2.5rem", // 40px
  12: "3rem", // 48px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
} as const;

// ─── Border Radius ────────────────────────────────────────
export const RADIUS = {
  none: "0px",
  sm: "0.25rem", // 4px
  base: "0.375rem", // 6px
  md: "0.5rem", // 8px
  lg: "0.75rem", // 12px
  xl: "1rem", // 16px
  "2xl": "1.5rem", // 24px
  full: "9999px",
} as const;

// ─── Shadow ───────────────────────────────────────────────
export const SHADOW = {
  none: "none",
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
} as const;

// ─── Z-Index ──────────────────────────────────────────────
export const Z_INDEX = {
  hide: -1,
  auto: "auto",
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  toast: 1700,
  tooltip: 1800,
} as const;

// ─── Breakpoints ──────────────────────────────────────────
export const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// ─── Transition ───────────────────────────────────────────
export const TRANSITION = {
  fast: "all 150ms ease",
  normal: "all 250ms ease",
  slow: "all 400ms ease",
  none: "none",
} as const;

// ─── Component Size Variants ──────────────────────────────
export const SIZE_VARIANTS = ["xs", "sm", "md", "lg", "xl"] as const;
export type SizeVariant = (typeof SIZE_VARIANTS)[number];

// ─── Status types ─────────────────────────────────────────
export const STATUS_TYPES = [
  "active",
  "inactive",
  "pending",
  "suspended",
  "error",
  "shipped",
  "delivered",
  "cancelled",
] as const;
export type StatusType = (typeof STATUS_TYPES)[number];

// ─── Role types ───────────────────────────────────────────
export const ROLE_TYPES = [
  "super_admin",
  "admin",
  "editor",
  "developer",
  "viewer",
] as const;
export type RoleType = (typeof ROLE_TYPES)[number];

// ─── Access Role Labels ───────────────────────────────────
export const ROLE_LABELS: Record<RoleType, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  editor: "Editor",
  developer: "Developer",
  viewer: "Viewer",
};

// ─── Regex patterns ───────────────────────────────────────
export const REGEX = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^(\+62|62|0)8[1-9][0-9]{6,9}$/,
  url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$/,
  slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
} as const;

// ─── Date formats ─────────────────────────────────────────
export const DATE_FORMAT = {
  display: "DD MMMM YYYY",
  displayShort: "DD MMM YYYY",
  api: "YYYY-MM-DD",
  datetime: "DD MMM YYYY, HH:mm",
  datetimeFull: "DD MMMM YYYY, HH:mm:ss",
  time: "HH:mm",
  timeFull: "HH:mm:ss",
  monthYear: "MMMM YYYY",
  relative: "relative",
} as const;
