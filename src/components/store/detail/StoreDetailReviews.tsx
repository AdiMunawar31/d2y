// ============================================================
// StoreDetailReviews — Rating summary + review list + Write Review modal
// ============================================================

import { useState } from "react";
import {
  Star,
  StarHalf,
  BadgeCheck,
  Plus,
  MessageSquarePlus,
} from "lucide-react";
import { D2YModal, D2YButton, D2YTextField, useToast } from "@/components/ui";
import { cn } from "@/utils";
import type { ProductDetail, ProductReview } from "@/data/store.data";

interface StoreDetailReviewsProps {
  product: ProductDetail;
}

// ─── StarRating — display only ────────────────────────────

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
                className={cn(
                  filled ? "fill-foreground" : "fill-none opacity-25"
                )}
              />
            )}
          </span>
        );
      })}
    </div>
  );
}

// ─── StarPicker — interactive rating input ────────────────

function StarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (rating: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value;

  const labels = ["Terrible", "Poor", "Average", "Good", "Excellent"];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => onChange(i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(0)}
            aria-label={`Rate ${i} star${i > 1 ? "s" : ""}`}
            className="group p-0.5 transition-transform hover:scale-110 active:scale-95"
          >
            <Star
              size={28}
              strokeWidth={1.5}
              className={cn(
                "transition-colors duration-100",
                i <= display
                  ? "fill-foreground text-foreground"
                  : "fill-none text-foreground/25"
              )}
            />
          </button>
        ))}

        {/* Label */}
        {display > 0 && (
          <span className="ml-2 text-xs font-bold uppercase tracking-widest text-foreground/60">
            {labels[display - 1]}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── WriteReviewModal ─────────────────────────────────────

interface WriteReviewModalProps {
  open: boolean;
  onClose: () => void;
  productTitle: string;
  onSubmit: (review: Omit<ProductReview, "id">) => void;
}

function WriteReviewModal({
  open,
  onClose,
  productTitle,
  onSubmit,
}: WriteReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { success } = useToast();

  function validate() {
    const e: Record<string, string> = {};
    if (rating === 0) e.rating = "Please select a star rating.";
    if (!author.trim()) e.author = "Name is required.";
    if (body.trim().length < 20)
      e.body = "Review must be at least 20 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;

    onSubmit({
      author: author.trim(),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      rating,
      body: `"${body.trim()}"`,
      verified: false,
    });

    success("Review submitted! Thank you for your feedback.");
    // Reset
    setRating(0);
    setAuthor("");
    setBody("");
    setErrors({});
    onClose();
  }

  function handleClose() {
    setRating(0);
    setAuthor("");
    setBody("");
    setErrors({});
    onClose();
  }

  return (
    <D2YModal
      open={open}
      onClose={handleClose}
      title={`Review: ${productTitle}`}
      description="Share your honest experience to help other customers."
      size="md"
      footer={
        <>
          <D2YButton variant="outline" size="sm" onClick={handleClose}>
            Cancel
          </D2YButton>
          <D2YButton
            variant="primary"
            size="sm"
            leftIcon={<MessageSquarePlus size={15} />}
            onClick={handleSubmit}
          >
            Post Review
          </D2YButton>
        </>
      }
    >
      <div className="flex flex-col gap-6 pt-1">
        {/* Star rating picker */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-widest text-foreground">
            Your Rating <span className="text-red-500 ml-0.5">*</span>
          </label>
          <StarPicker
            value={rating}
            onChange={(r) => {
              setRating(r);
              setErrors((e) => ({ ...e, rating: "" }));
            }}
          />
          {errors.rating && (
            <p className="text-xs text-red-500 mt-1">{errors.rating}</p>
          )}
        </div>

        {/* Name */}
        <D2YTextField
          label="Your Name"
          placeholder="e.g. Alexander V."
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          error={errors.author}
          required
          fullWidth
        />

        {/* Review body */}
        <D2YTextField
          type="textarea"
          label="Your Review"
          placeholder="Tell others about your experience with this product..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          error={errors.body}
          required
          fullWidth
          rows={5}
        />

        {/* Character count hint */}
        <p
          className={cn(
            "text-[10px] -mt-4 text-right",
            body.length < 20 ? "text-foreground/30" : "text-foreground/50"
          )}
        >
          {body.length} chars{" "}
          {body.length < 20 ? `(${20 - body.length} more needed)` : ""}
        </p>
      </div>
    </D2YModal>
  );
}

// ─── RatingSummary ────────────────────────────────────────

function RatingSummary({
  product,
  reviewCount,
  onWriteReview,
}: {
  product: ProductDetail;
  reviewCount: number;
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
            Based on {reviewCount} review{reviewCount !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {/* Rating bars */}
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

      {/* CTA */}
      <button
        onClick={onWriteReview}
        className="cursor-pointer mt-10 w-full border-2 border-foreground py-4 text-xs font-bold uppercase tracking-[0.2em] text-foreground hover:bg-foreground hover:text-background transition-all flex items-center justify-center gap-2"
      >
        <Star size={14} strokeWidth={2} />
        Write a Review
      </button>
    </div>
  );
}

// ─── ReviewCard ───────────────────────────────────────────

function ReviewCard({ review }: { review: ProductReview }) {
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
  const [modalOpen, setModalOpen] = useState(false);
  const [localReviews, setLocalReviews] = useState<ProductReview[]>(
    product.reviews
  );

  const visible = showAll ? localReviews : localReviews.slice(0, 2);

  function handleSubmitReview(review: Omit<ProductReview, "id">) {
    const newReview: ProductReview = {
      ...review,
      id: `r${Date.now()}`,
    };
    setLocalReviews((prev) => [newReview, ...prev]);
    setShowAll(false); // scroll back to top of reviews
  }

  return (
    <div className="border-t border-border pt-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left: summary */}
        <RatingSummary
          product={product}
          reviewCount={localReviews.length}
          onWriteReview={() => setModalOpen(true)}
        />

        {/* Right: review list */}
        <div className="lg:col-span-8 space-y-12">
          {visible.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}

          {!showAll && localReviews.length > 2 && (
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

      {/* Write Review Modal */}
      <WriteReviewModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        productTitle={product.title}
        onSubmit={handleSubmitReview}
      />
    </div>
  );
}
