// ============================================================
// D2YAvatar — Avatar with image, initials, status indicator
// ============================================================

import { useState, type ImgHTMLAttributes } from "react";
import { User } from "lucide-react";
import { cn, getInitials, getAvatarColor } from "@/utils";
import type { SizeVariant } from "@/types";

type AvatarStatus = "online" | "offline" | "busy" | "away";

interface D2YAvatarProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "size"> {
  src?: string | null;
  name?: string;
  size?: SizeVariant;
  status?: AvatarStatus;
  shape?: "circle" | "square";
  className?: string;
  /** Show border ring */
  ring?: boolean;
}

const sizeConfig = {
  xs: {
    outer: "w-6 h-6",
    text: "text-[10px]",
    icon: 10,
    status: "w-1.5 h-1.5 border",
  },
  sm: { outer: "w-8 h-8", text: "text-xs", icon: 14, status: "w-2 h-2 border" },
  md: {
    outer: "w-10 h-10",
    text: "text-sm",
    icon: 18,
    status: "w-2.5 h-2.5 border border-2",
  },
  lg: {
    outer: "w-12 h-12",
    text: "text-base",
    icon: 20,
    status: "w-3 h-3 border-2",
  },
  xl: {
    outer: "w-16 h-16",
    text: "text-xl",
    icon: 26,
    status: "w-3.5 h-3.5 border-2",
  },
};

const statusColors: Record<AvatarStatus, string> = {
  online: "bg-[var(--color-success)]",
  offline: "bg-[var(--color-muted-foreground)]",
  busy: "bg-[var(--color-destructive)]",
  away: "bg-[var(--color-warning)]",
};

export default function D2YAvatar({
  src,
  name,
  size = "md",
  status,
  shape = "circle",
  className,
  ring = false,
  alt,
  ...props
}: D2YAvatarProps) {
  const [imgError, setImgError] = useState(false);
  const cfg = sizeConfig[size];
  const initials = name ? getInitials(name) : null;
  const bgColor = name ? getAvatarColor(name) : "#262626";
  const isCircle = shape === "circle";

  return (
    <div className={cn("relative inline-flex shrink-0", cfg.outer, className)}>
      {/* Main avatar */}
      <div
        className={cn(
          "w-full h-full overflow-hidden flex items-center justify-center",
          isCircle ? "rounded-full" : "rounded-md",
          ring &&
            "ring-2 ring-(--color-border-strong) ring-offset-1 ring-offset-background"
        )}
        style={{
          backgroundColor: src && !imgError ? undefined : bgColor,
        }}
      >
        {src && !imgError ? (
          <img
            src={src}
            alt={alt ?? name ?? "Avatar"}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
            {...props}
          />
        ) : initials ? (
          <span
            className={cn(
              cfg.text,
              "font-semibold text-white leading-none select-none"
            )}
            aria-label={name}
          >
            {initials}
          </span>
        ) : (
          <User
            size={cfg.icon}
            strokeWidth={1.5}
            className="text-white/70"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Status indicator */}
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-background",
            cfg.status,
            statusColors[status]
          )}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
}

// ─── Avatar Group ─────────────────────────────────────────
interface D2YAvatarGroupProps {
  avatars: Array<{ src?: string | null; name?: string }>;
  max?: number;
  size?: SizeVariant;
  className?: string;
}

export function D2YAvatarGroup({
  avatars,
  max = 4,
  size = "sm",
  className,
}: D2YAvatarGroupProps) {
  const visible = avatars.slice(0, max);
  const extra = avatars.length - max;
  const cfg = sizeConfig[size];

  return (
    <div className={cn("flex items-center", className)}>
      {visible.map((av, i) => (
        <div
          key={i}
          className="ring-2 ring-background rounded-full"
          style={{ marginLeft: i > 0 ? "-8px" : 0 }}
        >
          <D2YAvatar src={av.src} name={av.name} size={size} />
        </div>
      ))}
      {extra > 0 && (
        <div
          className={cn(
            cfg.outer,
            cfg.text,
            "rounded-full ring-2 ring-background flex items-center justify-center font-semibold",
            "bg-(--color-surface-elevated) text-muted"
          )}
          style={{ marginLeft: "-8px" }}
        >
          +{extra}
        </div>
      )}
    </div>
  );
}
