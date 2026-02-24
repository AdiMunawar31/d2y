// ============================================================
// D2YImage — Image with lazy loading, fallback, blur placeholder
// ============================================================

import { useState, useRef, useEffect, type ImgHTMLAttributes } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/utils";
import D2YShimmer from "./D2YShimmer";

interface D2YImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  aspectRatio?: "1/1" | "16/9" | "4/3" | "3/2" | "2/1" | "auto";
  objectFit?: "cover" | "contain" | "fill" | "none";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  lazy?: boolean;
  showError?: boolean;
  className?: string;
  wrapperClassName?: string;
}

const aspectMap: Record<string, string> = {
  "1/1": "aspect-square",
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "2/1": "aspect-[2/1]",
  auto: "",
};

const roundedMap: Record<string, string> = {
  none: "rounded-none",
  sm: "rounded-[var(--radius-sm)]",
  md: "rounded-[var(--radius-md)]",
  lg: "rounded-[var(--radius-lg)]",
  xl: "rounded-[var(--radius-xl)]",
  "2xl": "rounded-[var(--radius-2xl)]",
  full: "rounded-full",
};

export default function D2YImage({
  src,
  alt,
  fallback,
  aspectRatio = "auto",
  objectFit = "cover",
  rounded = "md",
  lazy = true,
  showError = true,
  className,
  wrapperClassName,
  ...props
}: D2YImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  );
  const [imgSrc, setImgSrc] = useState(src);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setStatus("loading");
    setImgSrc(src);
  }, [src]);

  // IntersectionObserver for lazy loading
  useEffect(() => {
    if (!lazy || !imgRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const dataSrc = img.dataset.src;
            if (dataSrc) {
              img.src = dataSrc;
            }
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: "50px" }
    );
    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [lazy, imgSrc]);

  const handleLoad = () => setStatus("loaded");
  const handleError = () => {
    if (fallback && imgSrc !== fallback) {
      setImgSrc(fallback);
    } else {
      setStatus("error");
    }
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-surface",
        aspectMap[aspectRatio],
        roundedMap[rounded],
        wrapperClassName
      )}
    >
      {/* Shimmer while loading */}
      {status === "loading" && (
        <D2YShimmer className="absolute inset-0 w-full h-full rounded-none" />
      )}

      {/* Error state */}
      {status === "error" && showError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
          <ImageOff size={24} strokeWidth={1.25} />
          <span className="text-xs">{alt || "Image unavailable"}</span>
        </div>
      )}

      {/* Image */}
      {status !== "error" && (
        <img
          ref={imgRef}
          src={lazy ? undefined : imgSrc}
          data-src={lazy ? imgSrc : undefined}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "w-full h-full transition-opacity duration-300",
            `object-${objectFit}`,
            status === "loaded" ? "opacity-100" : "opacity-0",
            className
          )}
          loading={lazy ? "lazy" : "eager"}
          decoding="async"
          {...props}
        />
      )}
    </div>
  );
}
