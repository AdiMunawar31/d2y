// ============================================================
// SHARED TYPES
// ============================================================

import type { ReactNode, ComponentPropsWithoutRef } from "react";
import type { SizeVariant, StatusType, RoleType } from "@/constants";

// ─── Base ──────────────────────────────────────────────────
export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

// ─── Component Sizes ──────────────────────────────────────
export type { SizeVariant };

// ─── Component Variants ───────────────────────────────────
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "link";
export type InputVariant = "default" | "filled" | "flushed";
export type BadgeVariant = "default" | "outline" | "soft";
export type ChipVariant = "filled" | "outline" | "soft";

// ─── Status / Role ─────────────────────────────────────────
export type { StatusType, RoleType };

// ─── Table ────────────────────────────────────────────────
export interface TableColumn<T> {
  key: keyof T & string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string | number;
  minWidth?: string | number;
  align?: "left" | "center" | "right";
  render?: (value: unknown, row: T, index: number) => ReactNode;
  filterOptions?: SelectOption[];
}

export interface TableSortState {
  key: string;
  direction: "asc" | "desc";
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

// ─── Form ─────────────────────────────────────────────────
export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  icon?: ReactNode;
  description?: string;
}

export interface ValidationRule {
  required?: boolean | string;
  minLength?: number | { value: number; message: string };
  maxLength?: number | { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
  validate?: (value: unknown) => boolean | string;
}

// ─── Toast ────────────────────────────────────────────────
export type ToastType = "success" | "error" | "warning" | "info" | "default";

export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// ─── API Response ─────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

// ─── Media / Image ────────────────────────────────────────
export interface MediaFile {
  id: string;
  url: string;
  name: string;
  type: string;
  size: number;
  width?: number;
  height?: number;
  alt?: string;
  createdAt: string;
}

// ─── Navigation ───────────────────────────────────────────
export interface NavItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  children?: NavItem[];
  badge?: string | number;
  disabled?: boolean;
  external?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
}

// ─── Timeline ─────────────────────────────────────────────
export type TimelineStatus = "completed" | "active" | "pending" | "error";

export interface TimelineStep {
  id: string;
  label: string;
  description?: string;
  date?: string;
  status: TimelineStatus;
  icon?: ReactNode;
}

// ─── Tab ──────────────────────────────────────────────────
export interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: string | number;
  disabled?: boolean;
  content?: ReactNode;
}

// ─── Carousel ─────────────────────────────────────────────
export interface CarouselItem {
  id: string;
  content: ReactNode;
}

// ─── Utility Types ────────────────────────────────────────
export type WithRef<T extends HTMLElement = HTMLElement> =
  ComponentPropsWithoutRef<"div"> & {
    ref?: React.Ref<T>;
  };

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & Record<string, never>;

export type RequiredFields<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;
