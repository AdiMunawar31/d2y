// ============================================================
// D2YNoData — Empty state component
// ============================================================

import type { ReactNode } from "react";
import {
  Inbox,
  SearchX,
  FolderOpen,
  FileX,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/utils";
import type { SizeVariant } from "@/types";
import D2YButton from "./D2YButton";

type NoDataVariant = "default" | "search" | "folder" | "file";

interface D2YNoDataProps {
  variant?: NoDataVariant;
  title?: string;
  description?: string;
  icon?: LucideIcon;
  size?: Extract<SizeVariant, "sm" | "md" | "lg">;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  children?: ReactNode;
}

const variantIcons: Record<NoDataVariant, LucideIcon> = {
  default: Inbox,
  search: SearchX,
  folder: FolderOpen,
  file: FileX,
};

const variantDefaults: Record<
  NoDataVariant,
  { title: string; description: string }
> = {
  default: {
    title: "Nothing here yet",
    description: "Get started by adding your first item.",
  },
  search: {
    title: "No results found",
    description: "Try adjusting your search or filters.",
  },
  folder: {
    title: "Empty folder",
    description: "This folder contains no items yet.",
  },
  file: {
    title: "No files",
    description: "Upload files to get started.",
  },
};

const sizeConfig = {
  sm: {
    icon: 32,
    wrapper: "py-6 gap-2",
    title: "text-sm font-semibold",
    desc: "text-xs",
  },
  md: {
    icon: 48,
    wrapper: "py-10 gap-3",
    title: "text-base font-semibold",
    desc: "text-sm",
  },
  lg: {
    icon: 64,
    wrapper: "py-16 gap-4",
    title: "text-lg font-bold",
    desc: "text-base",
  },
};

export default function D2YNoData({
  variant = "default",
  title,
  description,
  icon: CustomIcon,
  size = "md",
  action,
  secondaryAction,
  className,
  children,
}: D2YNoDataProps) {
  const Icon = CustomIcon ?? variantIcons[variant];
  const defaults = variantDefaults[variant];
  const cfg = sizeConfig[size];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center w-full",
        cfg.wrapper,
        className
      )}
      role="status"
      aria-label={title ?? defaults.title}
    >
      {/* Icon */}
      <div
        className="flex items-center justify-center rounded-2xl bg-surface mb-1"
        style={{ width: cfg.icon * 1.75, height: cfg.icon * 1.75 }}
      >
        <Icon
          size={cfg.icon}
          strokeWidth={1.25}
          className="text-muted-foreground"
        />
      </div>

      {/* Text */}
      <h3 className={cn(cfg.title, "text-foreground mt-1")}>
        {title ?? defaults.title}
      </h3>
      <p className={cn(cfg.desc, "text-muted-foreground max-w-xs mt-1")}>
        {description ?? defaults.description}
      </p>

      {/* Custom children */}
      {children && <div className="mt-2">{children}</div>}

      {/* Actions */}
      {(action || secondaryAction) && (
        <div className="flex items-center gap-2 mt-3 flex-wrap justify-center">
          {secondaryAction && (
            <D2YButton
              variant="outline"
              size={size}
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </D2YButton>
          )}
          {action && (
            <D2YButton variant="primary" size={size} onClick={action.onClick}>
              {action.label}
            </D2YButton>
          )}
        </div>
      )}
    </div>
  );
}
