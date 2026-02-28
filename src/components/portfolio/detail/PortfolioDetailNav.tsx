// ============================================================
// PortfolioDetailNav — Prev / Next project navigation
// ============================================================

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/utils";
import type { PortfolioProject } from "@/data/portfolio.data";

interface PortfolioDetailNavProps {
  prev: PortfolioProject | null;
  next: PortfolioProject | null;
}

// ─── Sub-components ───────────────────────────────────────

function NavLink({
  project,
  direction,
}: {
  project: PortfolioProject;
  direction: "prev" | "next";
}) {
  const isPrev = direction === "prev";

  return (
    <Link
      to={`/portfolio/${project.slug}`}
      className="group flex items-center gap-6 max-w-sm"
    >
      {isPrev && <ArrowCircle direction="left" />}

      <div className={cn("flex flex-col", !isPrev && "text-right")}>
        <span className="text-xs uppercase tracking-widest text-foreground/40 mb-1">
          {isPrev ? "Previous Project" : "Next Project"}
        </span>
        <span className="text-xl font-bold text-foreground group-hover:underline underline-offset-4 decoration-1">
          {project.title}
        </span>
        <span className="text-xs text-foreground/40 mt-0.5">
          {project.category}
        </span>
      </div>

      {!isPrev && <ArrowCircle direction="right" />}
    </Link>
  );
}

function ArrowCircle({ direction }: { direction: "left" | "right" }) {
  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border group-hover:bg-foreground group-hover:border-foreground group-hover:text-background transition-all duration-200">
      {direction === "left" ? (
        <ArrowLeft size={18} strokeWidth={1.75} />
      ) : (
        <ArrowRight size={18} strokeWidth={1.75} />
      )}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────

export default function PortfolioDetailNav({
  prev,
  next,
}: PortfolioDetailNavProps) {
  return (
    <section
      aria-label="Project navigation"
      className="px-6 lg:px-20 py-24 border-t border-border bg-surface/30"
    >
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-12">
        {prev ? (
          <NavLink project={prev} direction="prev" />
        ) : (
          <div aria-hidden="true" /> // Placeholder to keep next right-aligned
        )}

        {next ? (
          <NavLink project={next} direction="next" />
        ) : (
          <div aria-hidden="true" />
        )}
      </div>
    </section>
  );
}
