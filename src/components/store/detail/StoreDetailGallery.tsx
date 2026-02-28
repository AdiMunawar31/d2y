// ============================================================
// StoreDetailGallery — Main image + 4 thumbnail strip
// ============================================================

import { useState } from "react";
import { D2YImage } from "@/components/ui";
import { cn } from "@/utils";
import type { ProductDetail } from "@/data/store.data";

interface StoreDetailGalleryProps {
  product: ProductDetail;
}

export default function StoreDetailGallery({
  product,
}: StoreDetailGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = product.images[activeIdx];

  return (
    <div className="lg:col-span-7 space-y-4">
      {/* Main image */}
      <div className="aspect-4/5 bg-surface overflow-hidden rounded border border-border">
        <D2YImage
          key={active.src}
          src={active.src}
          alt={active.alt}
          objectFit="cover"
          rounded="none"
          className="grayscale w-full h-full transition-opacity duration-300"
          wrapperClassName="w-full h-full"
        />
      </div>

      {/* Thumbnail strip */}
      <div className="grid grid-cols-4 gap-4">
        {product.images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            aria-label={`View ${img.alt}`}
            className={cn(
              "cursor-pointer aspect-square bg-surface rounded overflow-hidden border-2 transition-all duration-200",
              i === activeIdx
                ? "border-foreground opacity-100"
                : "border-transparent opacity-60 hover:opacity-100"
            )}
          >
            <D2YImage
              src={img.src}
              alt={img.alt}
              objectFit="cover"
              rounded="none"
              className="grayscale w-full h-full"
              wrapperClassName="w-full h-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
