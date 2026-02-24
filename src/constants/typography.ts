// ============================================================
// TYPOGRAPHY CONSTANTS
// ============================================================

/** Font families used in the app */
export const FONT_FAMILY = {
  display: '"Playfair Display", Georgia, serif',
  sans: '"DM Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
  mono: '"JetBrains Mono", "Fira Code", Consolas, monospace',
} as const;

/** Font weight scale */
export const FONT_WEIGHT = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

/** Font size scale (rem) */
export const FONT_SIZE = {
  "2xs": "0.625rem", // 10px
  xs: "0.75rem", // 12px
  sm: "0.875rem", // 14px
  base: "1rem", // 16px
  lg: "1.125rem", // 18px
  xl: "1.25rem", // 20px
  "2xl": "1.5rem", // 24px
  "3xl": "1.875rem", // 30px
  "4xl": "2.25rem", // 36px
  "5xl": "3rem", // 48px
  "6xl": "3.75rem", // 60px
  "7xl": "4.5rem", // 72px
} as const;

/** Line height scale */
export const LINE_HEIGHT = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
} as const;

/** Letter spacing scale */
export const LETTER_SPACING = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
} as const;

/** Text style presets */
export const TEXT_STYLES = {
  h1: {
    size: FONT_SIZE["5xl"],
    weight: FONT_WEIGHT.bold,
    family: FONT_FAMILY.display,
    lineHeight: LINE_HEIGHT.tight,
  },
  h2: {
    size: FONT_SIZE["4xl"],
    weight: FONT_WEIGHT.bold,
    family: FONT_FAMILY.display,
    lineHeight: LINE_HEIGHT.tight,
  },
  h3: {
    size: FONT_SIZE["3xl"],
    weight: FONT_WEIGHT.semibold,
    family: FONT_FAMILY.sans,
    lineHeight: LINE_HEIGHT.snug,
  },
  h4: {
    size: FONT_SIZE["2xl"],
    weight: FONT_WEIGHT.semibold,
    family: FONT_FAMILY.sans,
    lineHeight: LINE_HEIGHT.snug,
  },
  h5: {
    size: FONT_SIZE.xl,
    weight: FONT_WEIGHT.semibold,
    family: FONT_FAMILY.sans,
    lineHeight: LINE_HEIGHT.normal,
  },
  h6: {
    size: FONT_SIZE.lg,
    weight: FONT_WEIGHT.medium,
    family: FONT_FAMILY.sans,
    lineHeight: LINE_HEIGHT.normal,
  },
  body: {
    size: FONT_SIZE.base,
    weight: FONT_WEIGHT.regular,
    family: FONT_FAMILY.sans,
    lineHeight: LINE_HEIGHT.relaxed,
  },
  bodySmall: {
    size: FONT_SIZE.sm,
    weight: FONT_WEIGHT.regular,
    family: FONT_FAMILY.sans,
    lineHeight: LINE_HEIGHT.relaxed,
  },
  label: {
    size: FONT_SIZE.sm,
    weight: FONT_WEIGHT.medium,
    family: FONT_FAMILY.sans,
    lineHeight: LINE_HEIGHT.normal,
  },
  caption: {
    size: FONT_SIZE.xs,
    weight: FONT_WEIGHT.regular,
    family: FONT_FAMILY.sans,
    lineHeight: LINE_HEIGHT.normal,
  },
  overline: {
    size: FONT_SIZE.xs,
    weight: FONT_WEIGHT.semibold,
    family: FONT_FAMILY.sans,
    lineHeight: LINE_HEIGHT.normal,
    letterSpacing: LETTER_SPACING.widest,
  },
  code: {
    size: FONT_SIZE.sm,
    weight: FONT_WEIGHT.regular,
    family: FONT_FAMILY.mono,
    lineHeight: LINE_HEIGHT.relaxed,
  },
} as const;
