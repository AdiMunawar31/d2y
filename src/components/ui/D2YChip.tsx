// ============================================================
// D2YChip — Tag / Badge / Status chip
// ============================================================

import { type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/utils";
import type { ChipVariant, SizeVariant, StatusType } from "@/types";
import { STATUS_COLORS } from "@/constants/colors";

interface D2YChipProps {
  label: string;
  variant?: ChipVariant;
  size?: Extract<SizeVariant, "xs" | "sm" | "md">;
  status?: StatusType;
  color?: string;
  leftIcon?: ReactNode;
  onRemove?: () => void;
  onClick?: () => void;
  className?: string;
  dot?: boolean;
}

const sizeConfig = {
  xs: "h-5 px-1.5 text-[10px] gap-1 rounded-[var(--radius-sm)]",
  sm: "h-6 px-2 text-xs gap-1 rounded-[var(--radius-base)]",
  md: "h-7 px-2.5 text-sm gap-1.5 rounded-[var(--radius-md)]",
};

const dotSizeConfig = {
  xs: "w-1 h-1",
  sm: "w-1.5 h-1.5",
  md: "w-2 h-2",
};

const removeSizeConfig = {
  xs: 8,
  sm: 10,
  md: 12,
};

export default function D2YChip({
  label,
  variant = "soft",
  size = "sm",
  status,
  color,
  leftIcon,
  onRemove,
  onClick,
  className,
  dot = false,
}: D2YChipProps) {
  // Status-based styling
  const statusStyle = status
    ? {
        backgroundColor: STATUS_COLORS[status].bg,
        color: STATUS_COLORS[status].text,
        borderColor: "transparent",
      }
    : undefined;

  const statusDotColor = status ? STATUS_COLORS[status].dot : undefined;

  // Variant styles (used when no status)
  const variantStyles: Record<ChipVariant, string> = {
    filled:
      "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] border-transparent",
    outline:
      "bg-transparent text-[var(--color-foreground)] border border-[var(--color-border-strong)]",
    soft: "bg-[var(--color-surface)] text-[var(--color-foreground)] border border-[var(--color-border)]",
  };

  const isClickable = !!onClick;

  return (
    <span
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        isClickable
          ? (e) => (e.key === "Enter" || e.key === " ") && onClick?.()
          : undefined
      }
      className={cn(
        "inline-flex items-center font-medium border leading-none",
        sizeConfig[size],
        !status && variantStyles[variant],
        isClickable && "cursor-pointer hover:opacity-80 transition-opacity",
        className
      )}
      style={statusStyle}
    >
      {/* Dot indicator */}
      {(dot || status) && (
        <span
          className={cn("rounded-full shrink-0", dotSizeConfig[size])}
          style={{
            backgroundColor: statusDotColor ?? color ?? "currentColor",
            opacity: statusDotColor ? 1 : 0.6,
          }}
          aria-hidden="true"
        />
      )}

      {/* Left icon */}
      {leftIcon && !dot && !status && (
        <span className="shrink-0">{leftIcon}</span>
      )}

      {/* Label */}
      <span className="truncate max-w-30">{label}</span>

      {/* Remove button */}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-0.5 shrink-0 opacity-60 hover:opacity-100 transition-opacity rounded-full"
          aria-label={`Remove ${label}`}
        >
          <X size={removeSizeConfig[size]} />
        </button>
      )}
    </span>
  );
}

// ─── Role Chip ────────────────────────────────────────────
interface D2YRoleChipProps {
  role: string;
  size?: Extract<SizeVariant, "xs" | "sm" | "md">;
}

const roleStyles: Record<string, string> = {
  super_admin: "bg-[var(--color-foreground)] text-[var(--color-background)]",
  admin: "bg-[var(--color-foreground)]/80 text-[var(--color-background)]",
  editor: "bg-[var(--color-surface-elevated)] text-[var(--color-foreground)]",
  developer:
    "bg-[var(--color-surface-elevated)] text-[var(--color-foreground)]",
  viewer: "bg-[var(--color-surface)] text-[var(--color-muted)]",
};

export function D2YRoleChip({ role, size = "sm" }: D2YRoleChipProps) {
  const label = role.replace("_", " ").toUpperCase();
  const styles =
    roleStyles[role] ?? "bg-[var(--color-surface)] text-[var(--color-muted)]";

  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold tracking-wide border-0",
        sizeConfig[size],
        styles
      )}
    >
      {label}
    </span>
  );
}
