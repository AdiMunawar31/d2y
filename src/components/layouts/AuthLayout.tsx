// ============================================================
// AuthLayout — Centered auth layout
// ============================================================

import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { ROUTES } from "@/config/routes.config";
import { useTheme } from "@/hooks/useThemes";
import D2YButton from "@/components/ui/D2YButton";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface)]">
      {/* Topbar */}
      <header className="h-14 flex items-center justify-between px-6 bg-[var(--color-background)] border-b border-[var(--color-border)]">
        <Link to={ROUTES.HOME} className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-[var(--radius-md)] bg-[var(--color-foreground)] flex items-center justify-center transition-transform duration-200 group-hover:scale-95">
            <span className="text-[var(--color-background)] text-xs font-black tracking-tighter">
              D2Y
            </span>
          </div>
          <span className="text-sm font-bold text-[var(--color-foreground)]">
            Studio
          </span>
        </Link>
        <D2YButton
          variant="ghost"
          size="sm"
          leftIcon={isDark ? <Sun size={16} /> : <Moon size={16} />}
          onClick={toggleTheme}
          aria-label="Toggle theme"
        />
      </header>

      {/* Content */}
      <main
        id="main-content"
        className="flex-1 flex items-center justify-center p-4"
      >
        <div className="w-full max-w-sm animate-fade-in">{children}</div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center">
        <p className="text-xs text-[var(--color-muted-foreground)]">
          © {new Date().getFullYear()} D2Y Studio ·{" "}
          <a
            href="#"
            className="hover:text-[var(--color-foreground)] transition-colors"
          >
            Privacy
          </a>
          {" · "}
          <a
            href="#"
            className="hover:text-[var(--color-foreground)] transition-colors"
          >
            Terms
          </a>
        </p>
      </footer>
    </div>
  );
}
