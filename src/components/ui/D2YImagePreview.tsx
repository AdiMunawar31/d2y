// ============================================================
// D2YImagePreview — Lightbox / fullscreen image preview
// ============================================================

import { useEffect, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
} from "lucide-react";
import { cn } from "@/utils";
import D2YButton from "./D2YButton";

interface PreviewImage {
  src: string;
  alt?: string;
  caption?: string;
}

interface D2YImagePreviewProps {
  images: PreviewImage[];
  initialIndex?: number;
  open: boolean;
  onClose: () => void;
  showDownload?: boolean;
}

export default function D2YImagePreview({
  images,
  initialIndex = 0,
  open,
  onClose,
  showDownload = false,
}: D2YImagePreviewProps) {
  const [index, setIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    setIndex(initialIndex);
    setScale(1);
  }, [initialIndex, open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index]);

  if (!open || images.length === 0) return null;

  const current = images[index];
  const hasPrev = index > 0;
  const hasNext = index < images.length - 1;

  const prev = () => {
    if (hasPrev) {
      setIndex((i) => i - 1);
      setScale(1);
    }
  };
  const next = () => {
    if (hasNext) {
      setIndex((i) => i + 1);
      setScale(1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = current.src;
    a.download = current.alt ?? "image";
    a.click();
  };

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: "var(--z-modal)" }}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Controls top-right */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <D2YButton
          variant="ghost"
          size="sm"
          onClick={() => setScale((s) => Math.min(s + 0.25, 3))}
          leftIcon={<ZoomIn size={16} />}
          className="text-white/80 hover:text-white hover:bg-white/10"
          aria-label="Zoom in"
        />
        <D2YButton
          variant="ghost"
          size="sm"
          onClick={() => setScale((s) => Math.max(s - 0.25, 0.5))}
          leftIcon={<ZoomOut size={16} />}
          className="text-white/80 hover:text-white hover:bg-white/10"
          aria-label="Zoom out"
        />
        {showDownload && (
          <D2YButton
            variant="ghost"
            size="sm"
            onClick={handleDownload}
            leftIcon={<Download size={16} />}
            className="text-white/80 hover:text-white hover:bg-white/10"
            aria-label="Download"
          />
        )}
        <D2YButton
          variant="ghost"
          size="sm"
          onClick={onClose}
          leftIcon={<X size={18} />}
          className="text-white/80 hover:text-white hover:bg-white/10"
          aria-label="Close preview"
        />
      </div>

      {/* Prev arrow */}
      {hasPrev && (
        <D2YButton
          variant="ghost"
          size="md"
          onClick={prev}
          leftIcon={<ChevronLeft size={24} />}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white/80 hover:text-white hover:bg-white/10"
          aria-label="Previous image"
        />
      )}

      {/* Image */}
      <div className="relative z-10 max-w-[90vw] max-h-[90vh] animate-fade-in-scale">
        <img
          src={current.src}
          alt={current.alt ?? "Preview"}
          className="max-w-full max-h-[85vh] object-contain rounded-lg transition-transform duration-200"
          style={{ transform: `scale(${scale})` }}
          draggable={false}
        />
        {current.caption && (
          <p className="text-center text-sm text-white/70 mt-3 px-4">
            {current.caption}
          </p>
        )}
      </div>

      {/* Next arrow */}
      {hasNext && (
        <D2YButton
          variant="ghost"
          size="md"
          onClick={next}
          leftIcon={<ChevronRight size={24} />}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white/80 hover:text-white hover:bg-white/10"
          aria-label="Next image"
        />
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIndex(i);
                setScale(1);
              }}
              className={cn(
                "rounded-full transition-all duration-200",
                i === index
                  ? "w-5 h-1.5 bg-white"
                  : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
              )}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Counter */}
      {images.length > 1 && (
        <div className="absolute top-4 left-4 text-sm text-white/60 z-10 font-medium">
          {index + 1} / {images.length}
        </div>
      )}
    </div>,
    document.body
  );
}
