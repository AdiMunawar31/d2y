// ============================================================
// SectionLayout — Sticky label left + content right grid
// Reusable layout pattern for About, Portfolio, Blog etc.
// ============================================================

import { cn } from "@/utils";

interface SectionLayoutProps {
  label: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  /** Whether to include the top border separator (default: true) */
  bordered?: boolean;
}

export default function SectionLayout({
  label,
  children,
  className,
  contentClassName,
  bordered = true,
}: SectionLayoutProps) {
  return (
    <section
      className={cn(
        "grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 lg:mb-32",
        bordered && "border-t border-[var(--color-border)] pt-12",
        className
      )}
    >
      {/* Sticky label col */}
      <div className="lg:col-span-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-foreground)] sticky top-32">
          {label}
        </h3>
      </div>

      {/* Content col */}
      <div className={cn("lg:col-span-8", contentClassName)}>{children}</div>
    </section>
  );
}
