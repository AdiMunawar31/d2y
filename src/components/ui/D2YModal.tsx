// ============================================================
// D2YModal — Accessible modal dialog
// ============================================================

import { useEffect, useRef, type ReactNode, type KeyboardEvent } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { cn } from "@/utils";
import type { SizeVariant } from "@/types";
import D2YButton from "./D2YButton";

type ModalSize = Extract<SizeVariant, "sm" | "md" | "lg"> | "xl" | "full";

interface D2YModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: ModalSize;
  children?: ReactNode;
  footer?: ReactNode;
  /** Show default close button in header */
  showClose?: boolean;
  /** Close on backdrop click */
  closeOnBackdrop?: boolean;
  /** Close on Escape key */
  closeOnEscape?: boolean;
  className?: string;
  /** Scroll body or entire modal */
  scrollBehavior?: "inside" | "outside";
}

const sizeStyles: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
  full: "max-w-[95vw] max-h-[95vh]",
};

export default function D2YModal({
  open,
  onClose,
  title,
  description,
  size = "md",
  children,
  footer,
  showClose = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  className,
  scrollBehavior = "inside",
}: D2YModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  // Focus trap & restore
  useEffect(() => {
    if (open) {
      previousFocus.current = document.activeElement as HTMLElement;
      // Focus first focusable element
      requestAnimationFrame(() => {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        focusable?.[0]?.focus();
      });
    } else {
      previousFocus.current?.focus();
    }
  }, [open]);

  // Escape key
  useEffect(() => {
    if (!open || !closeOnEscape) return;
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, closeOnEscape, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Tab") {
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  };

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: "var(--z-modal)" }}
      role="presentation"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-(--color-overlay) animate-fade-in-scale"
        onClick={closeOnBackdrop ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        aria-describedby={description ? "modal-description" : undefined}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative bg-background border border-border shadow-2xl rounded-2xl w-full animate-fade-in-scale",
          sizeStyles[size],
          scrollBehavior === "inside" && "flex flex-col max-h-[90vh]",
          className
        )}
      >
        {/* Header */}
        {(title || showClose) && (
          <div className="flex items-start justify-between gap-3 px-6 pt-6 pb-0">
            <div className="flex-1 min-w-0">
              {title && (
                <h2
                  id="modal-title"
                  className="text-lg font-semibold text-foreground leading-tight"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  id="modal-description"
                  className="mt-1 text-sm text-muted-foreground"
                >
                  {description}
                </p>
              )}
            </div>
            {showClose && (
              <D2YButton
                variant="ghost"
                size="sm"
                onClick={onClose}
                leftIcon={<X size={16} />}
                aria-label="Close modal"
                className="-mr-1 -mt-1 shrink-0"
              />
            )}
          </div>
        )}

        {/* Body */}
        <div
          className={cn(
            "px-6 py-5",
            scrollBehavior === "inside" && "overflow-y-auto flex-1"
          )}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-2 px-6 pb-6 pt-3 border-t border-border">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

// ─── Confirm Dialog ───────────────────────────────────────
interface D2YConfirmProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive";
  loading?: boolean;
}

export function D2YConfirm({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  loading = false,
}: D2YConfirmProps) {
  return (
    <D2YModal
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      size="sm"
      footer={
        <>
          <D2YButton
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={loading}
          >
            {cancelLabel}
          </D2YButton>
          <D2YButton
            variant={variant === "destructive" ? "destructive" : "primary"}
            size="sm"
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </D2YButton>
        </>
      }
    />
  );
}
