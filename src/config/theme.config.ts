// ============================================================
// THEME CONFIGURATION — Black & White Design System
// ============================================================

export const THEME_CONFIG = {
  defaultTheme: "light" as const,
  storageKey: "d2y-theme",

  themes: {
    light: {
      name: "Light",
      colors: {
        // Base
        background: "#FFFFFF",
        foreground: "#0A0A0A",
        surface: "#F5F5F5",
        surfaceElevated: "#EBEBEB",

        // Brand
        primary: "#0A0A0A",
        primaryForeground: "#FFFFFF",
        secondary: "#F5F5F5",
        secondaryForeground: "#0A0A0A",

        // State
        muted: "#737373",
        mutedForeground: "#A3A3A3",
        accent: "#F5F5F5",
        accentForeground: "#0A0A0A",
        destructive: "#DC2626",
        destructiveForeground: "#FFFFFF",
        success: "#16A34A",
        successForeground: "#FFFFFF",
        warning: "#D97706",
        warningForeground: "#FFFFFF",
        info: "#2563EB",
        infoForeground: "#FFFFFF",

        // UI
        border: "#E5E5E5",
        borderStrong: "#D4D4D4",
        input: "#FFFFFF",
        ring: "#0A0A0A",

        // Overlay
        overlay: "rgba(0, 0, 0, 0.5)",
        shimmerBase: "#F0F0F0",
        shimmerHighlight: "#FAFAFA",
      },
    },
    dark: {
      name: "Dark",
      colors: {
        // Base
        background: "#0A0A0A",
        foreground: "#FAFAFA",
        surface: "#171717",
        surfaceElevated: "#262626",

        // Brand
        primary: "#FAFAFA",
        primaryForeground: "#0A0A0A",
        secondary: "#262626",
        secondaryForeground: "#FAFAFA",

        // State
        muted: "#404040",
        mutedForeground: "#737373",
        accent: "#1F1F1F",
        accentForeground: "#FAFAFA",
        destructive: "#EF4444",
        destructiveForeground: "#FFFFFF",
        success: "#22C55E",
        successForeground: "#0A0A0A",
        warning: "#F59E0B",
        warningForeground: "#0A0A0A",
        info: "#3B82F6",
        infoForeground: "#FFFFFF",

        // UI
        border: "#262626",
        borderStrong: "#404040",
        input: "#171717",
        ring: "#FAFAFA",

        // Overlay
        overlay: "rgba(0, 0, 0, 0.7)",
        shimmerBase: "#1A1A1A",
        shimmerHighlight: "#2A2A2A",
      },
    },
  },
} as const;

export type ThemeMode = keyof typeof THEME_CONFIG.themes;
export type ThemeColors = typeof THEME_CONFIG.themes.light.colors;
