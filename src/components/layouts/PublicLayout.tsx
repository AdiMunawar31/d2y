// ============================================================
// PublicLayout — Public website layout
// ============================================================

import { useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Moon,
  Sun,
  ArrowUpRight,
  Github,
  Twitter,
  Linkedin,
  Terminal,
  Globe,
  Share2,
  AtSign,
} from "lucide-react";
import { cn } from "@/utils";
import { ROUTES } from "@/config/routes.config";
import { useTheme } from "@/hooks/useThemes";
import D2YButton from "@/components/ui/D2YButton";

const NAV_LINKS = [
  { label: "About", href: ROUTES.ABOUT },
  { label: "Portfolio", href: ROUTES.PORTFOLIO },
  { label: "Blog", href: ROUTES.BLOG },
  { label: "Contact", href: ROUTES.CONTACT },
];

const SOCIAL = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

// ─── Navbar ───────────────────────────────────────────────
function PublicNavbar() {
  const { isDark, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-[var(--z-sticky)] bg-[var(--color-background)]/80 backdrop-blur-md border-b border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-6">
        {/* Logo */}
        <Link
          to={ROUTES.HOME}
          className="flex items-center gap-2 shrink-0 group"
        >
          <div className="w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-foreground)] flex items-center justify-center transition-transform duration-200 group-hover:scale-95">
            <span className="text-[var(--color-background)] text-xs font-black tracking-tighter">
              D2Y
            </span>
          </div>
          <span className="text-sm font-bold tracking-tight text-[var(--color-foreground)] hidden sm:block">
            Studio
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          {NAV_LINKS.map((link) => {
            const active = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-3 py-1.5 text-sm rounded-[var(--radius-base)] transition-all duration-150",
                  active
                    ? "text-[var(--color-foreground)] font-semibold"
                    : "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-surface)]"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-2">
          <D2YButton
            variant="ghost"
            size="sm"
            leftIcon={isDark ? <Sun size={16} /> : <Moon size={16} />}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          />
          <Link to={ROUTES.ADMIN.DASHBOARD} className="hidden sm:block">
            <D2YButton
              variant="outline"
              size="sm"
              rightIcon={<ArrowUpRight size={14} />}
            >
              Dashboard
            </D2YButton>
          </Link>

          {/* Mobile menu toggle */}
          <D2YButton
            variant="ghost"
            size="sm"
            leftIcon={mobileOpen ? <X size={18} /> : <Menu size={18} />}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          />
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-background)] animate-slide-in-down">
          <nav className="p-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-sm text-[var(--color-foreground)] hover:bg-[var(--color-surface)] rounded-[var(--radius-md)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 mt-2 border-t border-[var(--color-border)]">
              <Link
                to={ROUTES.ADMIN.DASHBOARD}
                onClick={() => setMobileOpen(false)}
              >
                <D2YButton variant="outline" size="sm" fullWidth>
                  Go to Dashboard
                </D2YButton>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

// ─── Footer ───────────────────────────────────────────────
function PublicFooter() {
  return (
    <footer className="bg-black text-white pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          {/* Brand */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="flex items-center gap-3 text-white">
              <Terminal className="w-7 h-7" />
              <span className="text-2xl font-bold uppercase">D2Y</span>
            </div>

            <p className="text-white/50 max-w-xs text-sm leading-relaxed">
              An independent creative studio working at the intersection of
              high-end design and enterprise technology.
            </p>

            <div className="flex gap-5">
              <a className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Globe className="w-5 h-5" />
              </a>
              <a className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Share2 className="w-5 h-5" />
              </a>
              <a className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <AtSign className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Capabilities */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h4 className="text-xs font-black uppercase text-white/40">
              Capabilities
            </h4>
            <ul className="flex flex-col gap-4 text-sm font-bold">
              {[
                "Interface Design",
                "Design Systems",
                "Brand Identity",
                "Web Engineering",
              ].map((item) => (
                <li key={item}>
                  <a className="hover:text-white/60 transition-colors" href="#">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h4 className="text-xs font-black uppercase text-white/40">
              Company
            </h4>
            <ul className="flex flex-col gap-4 text-sm font-bold">
              {["About Studio", "Methodology", "Careers", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <a
                      className="hover:text-white/60 transition-colors"
                      href="#"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h4 className="text-xs font-black uppercase text-white/40">
              Stay Connected
            </h4>
            <p className="text-sm text-white/50">
              Join our monthly brief on design and tech.
            </p>
            <form className="flex gap-2">
              <input
                className="bg-white/5 border-none rounded-lg px-4 py-3 text-sm w-full focus:ring-1 focus:ring-white transition-all text-white"
                placeholder="email@address.com"
                type="email"
              />
              <button className="bg-white text-black px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white/90 transition-all">
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-white/30 uppercase">
            © 2024 Studio Minimalist. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-bold text-white/30 uppercase">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map(
              (item) => (
                <a
                  key={item}
                  className="hover:text-white transition-colors"
                  href="#"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Layout ───────────────────────────────────────────────
export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[var(--color-foreground)] focus:text-[var(--color-background)] focus:rounded-[var(--radius-md)] focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>
      <PublicNavbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}
