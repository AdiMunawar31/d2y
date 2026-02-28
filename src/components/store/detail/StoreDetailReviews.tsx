// ============================================================
// StoreDetailReviews — Rating summary + review list
// ============================================================

import { useState } from "react";
import { Star, StarHalf, BadgeCheck, Plus } from "lucide-react";
import { cn } from "@/utils";
import type { ProductDetail } from "@/data/store.data";

interface StoreDetailReviewsProps {
  product: ProductDetail;
}

// ─── Star renderer ────────────────────────────────────────

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = rating >= i;
        const half = !filled && rating >= i - 0.5;
        return (
          <span key={i} className="text-foreground">
            {half ? (
              <StarHalf
                size={size}
                strokeWidth={1.5}
                className="fill-foreground"
              />
            ) : (
              <Star
                size={size}
                strokeWidth={1.5}
                className={cn(filled ? "fill-foreground" : "fill-none")}
              />
            )}
          </span>
        );
      })}
    </div>
  );
}

// ─── Rating summary ───────────────────────────────────────

function RatingSummary({
  product,
  onWriteReview,
}: {
  product: ProductDetail;
  onWriteReview: () => void;
}) {
  return (
    <div className="lg:col-span-4">
      <h3 className="text-2xl font-bold mb-6 text-foreground">
        Customer Reviews
      </h3>

      {/* Score */}
      <div className="flex items-center gap-4 mb-8">
        <div className="text-5xl font-black text-foreground">
          {product.ratingAvg}
        </div>
        <div className="space-y-1.5">
          <StarRating rating={product.ratingAvg} size={18} />
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            Based on {product.ratingCount} reviews
          </div>
        </div>
      </div>

      {/* Bars */}
      <div className="space-y-3">
        {product.ratingBars.map((bar) => (
          <div
            key={bar.stars}
            className={cn(
              "flex items-center gap-4 text-xs font-bold uppercase tracking-tighter",
              bar.percent === 0 && "opacity-30"
            )}
          >
            <span className="w-12 shrink-0 text-foreground">
              {bar.stars} Star
            </span>
            <div className="flex-1 h-1 bg-surface rounded-full overflow-hidden">
              <div
                className="h-full bg-foreground rounded-full transition-all duration-500"
                style={{ width: `${bar.percent}%` }}
              />
            </div>
            <span className="w-10 text-right text-foreground">
              {bar.percent}%
            </span>
          </div>
        ))}
      </div>

      {/* Write review CTA */}
      <button
        onClick={onWriteReview}
        className="cursor-pointer mt-10 w-full border-2 border-foreground py-4 text-xs font-bold uppercase tracking-[0.2em] text-foreground hover:bg-foreground hover:text-background transition-all"
      >
        Write a Review
      </button>
    </div>
  );
}

// ─── Individual review ────────────────────────────────────

function ReviewCard({ review }: { review: ProductDetail["reviews"][number] }) {
  return (
    <div className="pb-8 border-b border-border">
      <div className="flex justify-between items-start mb-4">
        <div>
          <StarRating rating={review.rating} size={14} />
          <h4 className="font-bold text-sm uppercase tracking-widest mt-1 text-foreground">
            {review.author}
          </h4>
        </div>
        <span className="text-xs text-muted-foreground uppercase tracking-widest shrink-0">
          {review.date}
        </span>
      </div>

      <p className="text-muted-foreground leading-relaxed italic text-sm">
        {review.body}
      </p>

      {review.verified && (
        <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground">
          <BadgeCheck size={14} strokeWidth={2} aria-hidden="true" />
          Verified Purchase
        </div>
      )}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────

export default function StoreDetailReviews({
  product,
}: StoreDetailReviewsProps) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? product.reviews : product.reviews.slice(0, 2);

  function handleWriteReview() {
    // In production: open modal or navigate to review form
    alert("Review form coming soon!");
  }

  return (
    <div className="border-t border-border pt-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <RatingSummary product={product} onWriteReview={handleWriteReview} />

        {/* Review list */}
        <div className="lg:col-span-8 space-y-12">
          {visible.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}

          {!showAll && product.reviews.length > 2 && (
            <div className="text-center pt-4">
              <button
                onClick={() => setShowAll(true)}
                className="cursor-pointer text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 mx-auto"
              >
                Load more reviews
                <Plus size={14} strokeWidth={2.5} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
