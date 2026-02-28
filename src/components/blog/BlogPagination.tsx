import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/utils";
import { PAGINATION } from "@/data/blog.data";

export default function BlogPagination() {
  const [current, setCurrent] = useState<number>(PAGINATION.currentPage);
  const total = PAGINATION.totalPages;

  const isPrev = current > 1;
  const isNext = current < total;

  return (
    <div className="mt-20 flex items-center justify-between border-t border-border pt-10">
      {/* Previous */}
      <button
        onClick={() => isPrev && setCurrent((p) => p - 1)}
        disabled={!isPrev}
        className={cn(
          "flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-opacity",
          isPrev ? "hover:opacity-60" : "opacity-30 cursor-not-allowed"
        )}
        aria-label="Previous page"
      >
        <ArrowLeft size={16} strokeWidth={2} />
        Previous
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-6">
        {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrent(page)}
            className={cn(
              "text-xs font-bold transition-colors",
              page === current
                ? "border-b border-foreground text-foreground"
                : "text-foreground/40 hover:text-foreground"
            )}
            aria-current={page === current ? "page" : undefined}
            aria-label={`Page ${page}`}
          >
            {String(page).padStart(2, "0")}
          </button>
        ))}
      </div>

      {/* Next */}
      <button
        onClick={() => isNext && setCurrent((p) => p + 1)}
        disabled={!isNext}
        className={cn(
          "flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-opacity",
          isNext ? "hover:opacity-60" : "opacity-30 cursor-not-allowed"
        )}
        aria-label="Next page"
      >
        Next
        <ArrowRight size={16} strokeWidth={2} />
      </button>
    </div>
  );
}
