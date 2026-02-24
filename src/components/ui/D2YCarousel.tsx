// ============================================================
// D2YCarousel — Responsive carousel / slider
// ============================================================

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
  type TouchEvent,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils";
import D2YButton from "./D2YButton";

interface D2YCarouselProps {
  items: ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  loop?: boolean;
  slidesPerView?: 1 | 2 | 3 | 4;
  gap?: number;
  className?: string;
  slideClassName?: string;
}

export default function D2YCarousel({
  items,
  autoPlay = false,
  autoPlayInterval = 4000,
  showDots = true,
  showArrows = true,
  loop = true,
  slidesPerView = 1,
  gap = 16,
  className,
  slideClassName,
}: D2YCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStart = useRef<number | null>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = items.length;
  const maxIndex = Math.max(0, total - slidesPerView);

  const goTo = useCallback(
    (index: number) => {
      if (loop) {
        setCurrent(((index % total) + total) % total);
      } else {
        setCurrent(Math.max(0, Math.min(index, maxIndex)));
      }
    },
    [loop, total, maxIndex]
  );

  const prev = useCallback(() => goTo(current - 1), [goTo, current]);
  const next = useCallback(() => goTo(current + 1), [goTo, current]);

  // Auto play
  useEffect(() => {
    if (!autoPlay) return;
    autoPlayRef.current = setInterval(next, autoPlayInterval);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [autoPlay, autoPlayInterval, next]);

  const pauseAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  const resumeAutoPlay = () => {
    if (!autoPlay) return;
    autoPlayRef.current = setInterval(next, autoPlayInterval);
  };

  // Touch swipe
  const handleTouchStart = (e: TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
    setIsDragging(true);
    pauseAutoPlay();
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
    touchStart.current = null;
    setIsDragging(false);
    resumeAutoPlay();
  };

  const canPrev = loop || current > 0;
  const canNext = loop || current < maxIndex;

  return (
    <div
      className={cn("relative select-none", className)}
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
      role="region"
      aria-label="Carousel"
      aria-roledescription="carousel"
    >
      {/* Track */}
      <div className="overflow-hidden rounded-xl">
        <div
          className={cn(
            "flex transition-transform duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
            isDragging && "transition-none"
          )}
          style={{
            transform: `translateX(calc(-${
              current * (100 / slidesPerView)
            }% - ${(current * gap) / slidesPerView}px))`,
            gap: `${gap}px`,
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-live="polite"
        >
          {items.map((item, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${total}`}
              aria-hidden={i !== current}
              className={cn("shrink-0", slideClassName)}
              style={{
                width: `calc(${100 / slidesPerView}% - ${
                  (gap * (slidesPerView - 1)) / slidesPerView
                }px)`,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Arrow buttons */}
      {showArrows && total > slidesPerView && (
        <>
          <D2YButton
            variant="secondary"
            size="sm"
            onClick={prev}
            disabled={!canPrev}
            leftIcon={<ChevronLeft size={18} />}
            rounded
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 shadow-md"
            aria-label="Previous slide"
          />
          <D2YButton
            variant="secondary"
            size="sm"
            onClick={next}
            disabled={!canNext}
            leftIcon={<ChevronRight size={18} />}
            rounded
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 shadow-md"
            aria-label="Next slide"
          />
        </>
      )}

      {/* Dot indicators */}
      {showDots && total > 1 && (
        <div
          className="flex items-center justify-center gap-1.5 mt-4"
          role="tablist"
          aria-label="Carousel navigation"
        >
          {Array.from({ length: loop ? total : maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                "rounded-full transition-all duration-300",
                i === current
                  ? "w-6 h-2 bg-foreground"
                  : "w-2 h-2 bg-(--color-border-strong) hover:bg-muted"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
