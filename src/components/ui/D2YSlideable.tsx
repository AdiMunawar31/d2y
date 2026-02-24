// ============================================================
// D2YSlideable — Slide-in panel / Drawer
// ============================================================

import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/utils";
import D2YButton from "./D2YButton";

type SlideDirection = "left" | "right" | "top" | "bottom";

interface D2YSlideableProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  direction?: SlideDirection;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  children?: ReactNode;
  footer?: ReactNode;
  showClose?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

const directionStyles: Record<
  SlideDirection,
  { container: string; open: string; closed: string }
> = {
  right: {
    container: "right-0 top-0 bottom-0",
    open: "translate-x-0",
    closed: "translate-x-full",
  },
  left: {
    container: "left-0 top-0 bottom-0",
    open: "translate-x-0",
    closed: "-translate-x-full",
  },
  top: {
    container: "top-0 left-0 right-0",
    open: "translate-y-0",
    closed: "-translate-y-full",
  },
  bottom: {
    container: "bottom-0 left-0 right-0",
    open: "translate-y-0",
    closed: "translate-y-full",
  },
};

const sizeStyles: Record<string, Record<SlideDirection, string>> = {
  sm: { right: "w-64", left: "w-64", top: "h-1/4", bottom: "h-1/4" },
  md: { right: "w-80", left: "w-80", top: "h-1/3", bottom: "h-1/3" },
  lg: { right: "w-96", left: "w-96", top: "h-1/2", bottom: "h-1/2" },
  xl: { right: "w-[520px]", left: "w-[520px]", top: "h-2/3", bottom: "h-2/3" },
  full: {
    right: "w-full max-w-full",
    left: "w-full max-w-full",
    top: "h-screen",
    bottom: "h-screen",
  },
};

export default function D2YSlideable({
  open,
  onClose,
  title,
  description,
  direction = "right",
  size = "md",
  children,
  footer,
  showClose = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  className,
}: D2YSlideableProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Escape key
  useEffect(() => {
    if (!open || !closeOnEscape) return;
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, closeOnEscape, onClose]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Focus
  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => {
        panelRef.current
          ?.querySelector<HTMLElement>(
            'button, [href], input, [tabindex]:not([tabindex="-1"])'
          )
          ?.focus();
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  const {
    container,
    open: openClass,
    closed: closedClass,
  } = directionStyles[direction];
  const sizeClass = sizeStyles[size][direction];
  const isHorizontal = direction === "left" || direction === "right";

  const newLocal = "mt-0.5 text-sm text-[var(--color-muted-foreground)]";
  return createPortal(
    <div
      className="fixed inset-0"
      style={{
        zIndex: "var(--z-modal)",
        pointerEvents: open ? "auto" : "none",
      }}
      role="presentation"
    >
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-(--color-overlay) transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeOnBackdrop ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "drawer-title" : undefined}
        className={cn(
          "absolute flex flex-col bg-background border-border shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
          container,
          isHorizontal ? "border-l border-r" : "border-t border-b",
          direction === "right" && "border-l",
          direction === "left" && "border-r",
          direction === "top" && "border-b",
          direction === "bottom" && "border-t",
          sizeClass,
          open ? openClass : closedClass,
          className
        )}
      >
        {/* Header */}
        {(title || showClose) && (
          <div className="flex items-start justify-between gap-3 px-6 py-5 border-b border-border shrink-0">
            <div className="flex-1 min-w-0">
              {title && (
                <h2
                  id="drawer-title"
                  className="text-base font-semibold text-foreground"
                >
                  {title}
                </h2>
              )}
              {description && <p className={newLocal}>{description}</p>}
            </div>
            {showClose && (
              <D2YButton
                variant="ghost"
                size="sm"
                onClick={onClose}
                leftIcon={<X size={16} />}
                aria-label="Close panel"
              />
            )}
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-border shrink-0 flex items-center gap-2 justify-end">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
