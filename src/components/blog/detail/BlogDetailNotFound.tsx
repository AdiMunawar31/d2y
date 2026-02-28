// ============================================================
// BlogDetailNotFound — 404 state for unknown blog slug
// ============================================================

import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { D2YNoData } from "@/components/ui";

export default function BlogDetailNotFound() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-32 flex flex-col items-center gap-8">
      <D2YNoData
        variant="search"
        size="lg"
        title="Article not found"
        description="This article doesn't exist or may have been removed."
      />
      <Link
        to="/blog"
        className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground/50 hover:text-foreground transition-colors"
      >
        <ArrowLeft
          size={16}
          strokeWidth={2}
          className="transition-transform group-hover:-translate-x-1"
          aria-hidden="true"
        />
        Back to Blog
      </Link>
    </main>
  );
}
