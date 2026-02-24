// ============================================================
// FeaturedProductSection — Shop spotlight / product CTA
// ============================================================

import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { D2YImage, D2YButton } from "@/components/ui";
import { FEATURED_PRODUCT } from "@/data/home.data";

// ─── Sub-components ───────────────────────────────────────

function ProductCopy() {
  return (
    <div className="w-full lg:w-1/2 p-12 md:p-20 flex flex-col gap-8">
      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-background)]/50">
        {FEATURED_PRODUCT.eyebrow}
      </span>

      <p className="text-4xl md:text-5xl font-bold text-white">
        {FEATURED_PRODUCT.title}
      </p>

      <p className="text-[var(--color-background)]/70 text-lg leading-relaxed">
        {FEATURED_PRODUCT.description}
      </p>

      <div className="flex items-center gap-6">
        <Link to={FEATURED_PRODUCT.href}>
          <D2YButton
            variant="secondary"
            size="lg"
            leftIcon={<ShoppingBag size={16} />}
            className="bg-[var(--color-background)] text-[var(--color-foreground)] hover:bg-[var(--color-surface)] border-0 font-bold uppercase text-xs"
          >
            {FEATURED_PRODUCT.cta} — {FEATURED_PRODUCT.price}
          </D2YButton>
        </Link>
      </div>
    </div>
  );
}

function ProductImage() {
  return (
    <div className="w-full lg:w-1/2 h-80 lg:h-auto self-stretch relative overflow-hidden">
      <D2YImage
        src={FEATURED_PRODUCT.image.src}
        alt={FEATURED_PRODUCT.image.alt}
        objectFit="cover"
        rounded="none"
        className="grayscale contrast-125 w-full h-full"
        wrapperClassName="w-full h-full"
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-l from-[var(--color-foreground)]/40 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────

export default function FeaturedProductSection() {
  return (
    <section aria-label="Featured product" className="py-32">
      <div className="bg-[var(--color-foreground)] rounded-3xl overflow-hidden flex flex-col lg:flex-row items-center">
        <ProductCopy />
        <ProductImage />
      </div>
    </section>
  );
}
