// ============================================================
// PortfolioDetailNotFound — 404 state for unknown project slug
// ============================================================

import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { D2YNoData } from "@/components/ui";

export default function PortfolioDetailNotFound() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-32 md:px-10 flex flex-col items-center gap-8">
      <D2YNoData
        variant="search"
        size="lg"
        title="Project not found"
        description="This project doesn't exist or may have been removed."
      />
      <Link
        to="/portfolio"
        className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors"
      >
        <ArrowLeft
          size={16}
          strokeWidth={2}
          className="transition-transform duration-200 group-hover:-translate-x-1"
          aria-hidden="true"
        />
        Back to Portfolio
      </Link>
    </main>
  );
}
