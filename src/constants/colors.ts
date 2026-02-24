// ============================================================
// COLOR CONSTANTS
// ============================================================

/** Neutral / Gray scale */
export const NEUTRAL = {
  0: "#FFFFFF",
  50: "#FAFAFA",
  100: "#F5F5F5",
  200: "#E5E5E5",
  300: "#D4D4D4",
  400: "#A3A3A3",
  500: "#737373",
  600: "#525252",
  700: "#404040",
  800: "#262626",
  900: "#171717",
  950: "#0A0A0A",
  1000: "#000000",
} as const;

/** Semantic colors */
export const SEMANTIC = {
  success: "#16A34A",
  successLight: "#DCFCE7",
  successDark: "#22C55E",
  warning: "#D97706",
  warningLight: "#FEF3C7",
  warningDark: "#F59E0B",
  error: "#DC2626",
  errorLight: "#FEE2E2",
  errorDark: "#EF4444",
  info: "#2563EB",
  infoLight: "#DBEAFE",
  infoDark: "#3B82F6",
} as const;

/** Status badge colors */
export const STATUS_COLORS = {
  active: { bg: "#DCFCE7", text: "#15803D", dot: "#16A34A" },
  inactive: { bg: "#F5F5F5", text: "#525252", dot: "#A3A3A3" },
  pending: { bg: "#FEF3C7", text: "#92400E", dot: "#D97706" },
  suspended: { bg: "#F5F5F5", text: "#737373", dot: "#A3A3A3" },
  error: { bg: "#FEE2E2", text: "#991B1B", dot: "#DC2626" },
  shipped: { bg: "#DBEAFE", text: "#1E40AF", dot: "#2563EB" },
  delivered: { bg: "#DCFCE7", text: "#15803D", dot: "#16A34A" },
  cancelled: { bg: "#FEE2E2", text: "#991B1B", dot: "#DC2626" },
} as const;

export type StatusType = keyof typeof STATUS_COLORS;
