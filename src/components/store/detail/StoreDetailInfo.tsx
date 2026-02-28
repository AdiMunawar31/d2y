// ============================================================
// StoreDetailInfo — Sticky right panel: title, variants, actions
// ============================================================

import { useState } from "react";
import { ShoppingBag, Heart } from "lucide-react";
import { useToast } from "@/components/ui";
import { cn } from "@/utils";
import StoreDetailAccordion from "./StoreDetailAccordion";
import type { ProductDetail } from "@/data/store.data";

interface StoreDetailInfoProps {
  product: ProductDetail;
}

// ─── Sub-components ───────────────────────────────────────

function ColorPicker({
  colors,
  selected,
  onSelect,
}: {
  colors: ProductDetail["colors"];
  selected: string;
  onSelect: (id: string) => void;
}) {
  const current = colors.find((c) => c.id === selected);

  return (
    <div>
      <span className="text-xs font-bold uppercase tracking-widest text-foreground block mb-3">
        Select Color — {current?.label}
      </span>
      <div className="flex gap-3">
        {colors.map((color) => (
          <button
            key={color.id}
            onClick={() => onSelect(color.id)}
            aria-label={`Select color ${color.label}`}
            className={cn(
              "cursor-pointer w-8 h-8 rounded-sm transition-all duration-150",
              selected === color.id
                ? "ring-2 ring-offset-2 ring-foreground"
                : "ring-1 ring-border hover:ring-foreground/50"
            )}
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>
    </div>
  );
}

function SizePicker({
  sizes,
  selected,
  onSelect,
}: {
  sizes: ProductDetail["sizes"];
  selected: string;
  onSelect: (label: string) => void;
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-bold uppercase tracking-widest text-foreground">
          Select Size
        </span>
        <button className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors">
          Size Guide
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {sizes.map((size) => (
          <button
            key={size.label}
            disabled={size.outOfStock}
            onClick={() => !size.outOfStock && onSelect(size.label)}
            className={cn(
              "cursor-pointer py-3 text-sm rounded-sm border transition-colors",
              size.outOfStock
                ? "border-border text-foreground/20 cursor-not-allowed"
                : selected === size.label
                ? "border-foreground bg-foreground text-background font-bold"
                : "border-border hover:border-foreground text-foreground"
            )}
          >
            {size.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────

export default function StoreDetailInfo({ product }: StoreDetailInfoProps) {
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.id ?? ""
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes.find((s) => !s.outOfStock)?.label ?? ""
  );
  const [wishlisted, setWishlisted] = useState(false);
  const { success, error } = useToast();

  function handleAddToCart() {
    if (product.sizes.length > 1 && !selectedSize) {
      error("Please select a size.");
      return;
    }
    const sizeLabel = selectedSize ? ` · ${selectedSize}` : "";
    success(`${product.title}${sizeLabel} added to cart!`);
  }

  function handleWishlist() {
    setWishlisted((w) => !w);
    if (!wishlisted) success("Saved to wishlist!");
  }

  return (
    <div className="lg:col-span-5 flex flex-col">
      <div className="sticky top-24">
        {/* Header */}
        <div className="mb-8">
          {product.edition && (
            <span className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2 font-medium">
              {product.edition}
            </span>
          )}
          <p className="text-4xl font-bold text-foreground tracking-tight mb-2">
            {product.title}
          </p>
          <p className="text-2xl font-light text-foreground">
            ${product.price.toFixed(2)}
          </p>
        </div>

        <div className="space-y-8">
          {/* Color */}
          {product.colors.length > 0 && (
            <ColorPicker
              colors={product.colors}
              selected={selectedColor}
              onSelect={setSelectedColor}
            />
          )}

          {/* Size */}
          {product.sizes.length > 1 && (
            <SizePicker
              sizes={product.sizes}
              selected={selectedSize}
              onSelect={setSelectedSize}
            />
          )}

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleAddToCart}
              className="cursor-pointer w-full bg-foreground text-background py-5 rounded-sm font-bold uppercase tracking-[0.2em] hover:bg-foreground/90 active:scale-[0.99] transition-all flex items-center justify-center gap-3"
            >
              <ShoppingBag size={18} strokeWidth={2} aria-hidden="true" />
              Add to Cart
            </button>

            <button
              onClick={handleWishlist}
              className={cn(
                "cursor-pointer w-full border py-4 rounded-sm font-bold uppercase tracking-[0.2em] transition-all text-sm flex items-center justify-center gap-2",
                wishlisted
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground text-foreground"
              )}
            >
              <Heart
                size={15}
                strokeWidth={2}
                className={cn(wishlisted && "fill-background")}
                aria-hidden="true"
              />
              {wishlisted ? "Saved to Wishlist" : "Save to Wishlist"}
            </button>
          </div>

          {/* Accordion */}
          <StoreDetailAccordion items={product.accordion} />
        </div>
      </div>
    </div>
  );
}
