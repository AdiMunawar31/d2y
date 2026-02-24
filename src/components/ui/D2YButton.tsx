// ============================================================
// D2YButton — Complete button component
// ============================================================

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utils";
import type { ButtonVariant, SizeVariant } from "@/types";
import D2YLoading from "./D2YLoading";

interface D2YButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: Extract<SizeVariant, "xs" | "sm" | "md" | "lg" | "xl">;
  loading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  rounded?: boolean;
}

// ─── Styles ───────────────────────────────────────────────
const baseStyles =
  "inline-flex items-center justify-center gap-2 font-medium select-none whitespace-nowrap transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[var(--color-ring)] focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-40 cursor-pointer";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90 active:scale-[0.98] shadow-sm",
  secondary:
    "bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] hover:bg-[var(--color-surface-elevated)] active:scale-[0.98] border border-[var(--color-border)]",
  outline:
    "border border-[var(--color-border-strong)] bg-transparent text-[var(--color-foreground)] hover:bg-[var(--color-surface)] active:scale-[0.98]",
  ghost:
    "bg-transparent text-[var(--color-foreground)] hover:bg-[var(--color-surface)] active:scale-[0.98]",
  destructive:
    "bg-[var(--color-destructive)] text-[var(--color-destructive-foreground)] hover:bg-[var(--color-destructive)]/90 active:scale-[0.98] shadow-sm",
  link: "bg-transparent text-[var(--color-foreground)] underline-offset-4 hover:underline p-0 h-auto",
};

const sizeStyles: Record<string, string> = {
  xs: "h-6 px-2 text-xs rounded-[var(--radius-sm)]",
  sm: "h-8 px-3 text-sm rounded-[var(--radius-base)]",
  md: "h-10 px-4 text-sm rounded-[var(--radius-md)]",
  lg: "h-11 px-5 text-base rounded-[var(--radius-md)]",
  xl: "h-12 px-6 text-base rounded-[var(--radius-lg)]",
};

const iconSizeStyles: Record<string, string> = {
  xs: "h-6 w-6 rounded-[var(--radius-sm)]",
  sm: "h-8 w-8 rounded-[var(--radius-base)]",
  md: "h-10 w-10 rounded-[var(--radius-md)]",
  lg: "h-11 w-11 rounded-[var(--radius-md)]",
  xl: "h-12 w-12 rounded-[var(--radius-lg)]",
};

const D2YButton = forwardRef<HTMLButtonElement, D2YButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      rounded = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isIconOnly = !children && (leftIcon || rightIcon);
    const spinnerSize = size === "xs" || size === "sm" ? "xs" : "sm";

    return (
      <button
        ref={ref}
        disabled={disabled ?? loading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          isIconOnly ? iconSizeStyles[size] : sizeStyles[size],
          fullWidth && variant !== "link" && "w-full",
          rounded && "rounded-full!",
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <D2YLoading size={spinnerSize} />
            {loadingText && <span>{loadingText}</span>}
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

D2YButton.displayName = "D2YButton";
export default D2YButton;
