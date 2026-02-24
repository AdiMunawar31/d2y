// ============================================================
// THEME CONTEXT & HOOK
// ============================================================

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { THEME_CONFIG, type ThemeMode } from "@/config/theme.config";

interface ThemeContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  isDark: boolean;
  isLight: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeMode;
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem(
      THEME_CONFIG.storageKey
    ) as ThemeMode | null;
    return stored ?? defaultTheme;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem(THEME_CONFIG.storageKey, theme);
  }, [theme]);

  const setTheme = (newTheme: ThemeMode) => setThemeState(newTheme);
  const toggleTheme = () =>
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        isDark: theme === "dark",
        isLight: theme === "light",
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}
