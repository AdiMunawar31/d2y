// ============================================================
// StoreDetailNotFound — 404 state for unknown product slug
// ============================================================

import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { D2YNoData } from "@/components/ui";

export default function StoreDetailNotFound() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-32 flex flex-col items-center gap-8">
      <D2YNoData
        variant="search"
        size="lg"
        title="Product not found"
        description="This product doesn't exist or is no longer available."
      />
      <Link
        to="/shop"
        className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground/50 hover:text-foreground transition-colors"
      >
        <ArrowLeft
          size={16}
          strokeWidth={2}
          className="transition-transform group-hover:-translate-x-1"
          aria-hidden="true"
        />
        Back to Shop
      </Link>
    </main>
  );
}
