// ============================================================
// D2YBreadCrumbs
// ============================================================

import { Fragment } from "react";
import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/utils";
import type { BreadcrumbItem } from "@/types";

interface D2YBreadCrumbsProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  homeHref?: string;
  separator?: "slash" | "chevron" | "dot";
  className?: string;
}

const separators = {
  slash: <span className="text-muted-foreground">/</span>,
  chevron: (
    <ChevronRight
      size={14}
      className="text-muted-foreground"
      strokeWidth={1.5}
    />
  ),
  dot: <span className="w-1 h-1 rounded-full bg-muted-foreground" />,
};

export default function D2YBreadCrumbs({
  items,
  showHome = true,
  homeHref = "/",
  separator = "chevron",
  className,
}: D2YBreadCrumbsProps) {
  const allItems: BreadcrumbItem[] = showHome
    ? [{ label: "Home", href: homeHref, icon: <Home size={14} /> }, ...items]
    : items;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center gap-1.5 flex-wrap">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          return (
            <Fragment key={index}>
              <li>
                {item.href && !isLast ? (
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                    )}
                  >
                    {item.icon && <span>{item.icon}</span>}
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <span
                    className={cn(
                      "flex items-center gap-1 text-sm",
                      isLast
                        ? "text-foreground font-medium"
                        : "text-muted-foreground"
                    )}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.icon && <span>{item.icon}</span>}
                    <span>{item.label}</span>
                  </span>
                )}
              </li>
              {!isLast && (
                <li aria-hidden="true" className="flex items-center">
                  {separators[separator]}
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
