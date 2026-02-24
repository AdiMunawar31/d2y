// ============================================================
// D2YTable — Full-featured data table
// ============================================================

import {
  useState,
  useMemo,
  useCallback,
  type ReactNode,
  type ChangeEvent,
} from "react";
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  X,
} from "lucide-react";
import { cn, sortByKey } from "@/utils";
import type { TableColumn, TableSortState, PaginationState } from "@/types";
import D2YLoading from "./D2YLoading";
import D2YNoData from "./D2YNoData";
import D2YTextField from "./D2YTextField";
import D2YButton from "./D2YButton";
import D2YCheckbox from "./D2YCheckbox";
import { APP_CONFIG } from "@/config/app.config";
import { useDebounceCallback } from "@/hooks/useDebounceCallback";

interface D2YTableProps<T extends object> {
  data: T[];
  columns: TableColumn<T>[];
  keyField?: keyof T;
  loading?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchKeys?: (keyof T)[];
  pagination?: boolean;
  pageSize?: number;
  selectable?: boolean;
  selectedKeys?: string[];
  onSelectionChange?: (keys: string[]) => void;
  actions?: (row: T) => ReactNode;
  toolbar?: ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  stickyHeader?: boolean;
  striped?: boolean;
  compact?: boolean;
  className?: string;
  onRowClick?: (row: T) => void;
}

// ─── Sort Icon ────────────────────────────────────────────
function SortIcon({
  column,
  sort,
}: {
  column: string;
  sort: TableSortState | null;
}) {
  if (!sort || sort.key !== column) {
    return <ChevronsUpDown size={14} className="opacity-30" />;
  }
  return sort.direction === "asc" ? (
    <ChevronUp size={14} className="opacity-70" />
  ) : (
    <ChevronDown size={14} className="opacity-70" />
  );
}

// ─── Pagination Controls ──────────────────────────────────
function Pagination({
  state,
  onPageChange,
  pageSizeOptions,
  onPageSizeChange,
}: {
  state: PaginationState;
  onPageChange: (page: number) => void;
  pageSizeOptions?: readonly number[];
  onPageSizeChange?: (size: number) => void;
}) {
  const { page, pageSize, total } = state;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  if (total === 0) return null;

  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 border-t border-border flex-wrap">
      {/* Info */}
      <p className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-medium text-foreground">
          {start}–{end}
        </span>{" "}
        of <span className="font-medium text-foreground">{total}</span>
      </p>

      {/* Page size */}
      {pageSizeOptions && onPageSizeChange && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Rows:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="text-sm border border-border rounded-(--radius-base) px-2 py-1 bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {pageSizeOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Nav buttons */}
      <div className="flex items-center gap-1">
        <D2YButton
          variant="ghost"
          size="xs"
          onClick={() => onPageChange(1)}
          disabled={page === 1}
          leftIcon={<ChevronsLeft size={14} />}
          aria-label="First page"
        />
        <D2YButton
          variant="ghost"
          size="xs"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          leftIcon={<ChevronLeft size={14} />}
          aria-label="Previous page"
        />

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            let pageNum: number;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (page <= 3) {
              pageNum = i + 1;
            } else if (page >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = page - 2 + i;
            }
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={cn(
                  "w-7 h-7 text-xs rounded-(--radius-base) transition-all duration-150",
                  pageNum === page
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:bg-surface hover:text-foreground"
                )}
                aria-label={`Page ${pageNum}`}
                aria-current={pageNum === page ? "page" : undefined}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <D2YButton
          variant="ghost"
          size="xs"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          leftIcon={<ChevronRight size={14} />}
          aria-label="Next page"
        />
        <D2YButton
          variant="ghost"
          size="xs"
          onClick={() => onPageChange(totalPages)}
          disabled={page === totalPages}
          leftIcon={<ChevronsRight size={14} />}
          aria-label="Last page"
        />
      </div>
    </div>
  );
}

// ─── Main Table Component ─────────────────────────────────
export default function D2YTable<T extends object>({
  data,
  columns,
  keyField = "id" as keyof T,
  loading = false,
  searchable = true,
  searchPlaceholder = "Search...",
  searchKeys,
  pagination = true,
  pageSize: initialPageSize = APP_CONFIG.pagination.defaultPageSize,
  selectable = false,
  selectedKeys = [],
  onSelectionChange,
  actions,
  toolbar,
  emptyTitle,
  emptyDescription,
  stickyHeader = false,
  striped = false,
  compact = false,
  className,
  onRowClick,
}: D2YTableProps<T>) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<TableSortState | null>(null);
  const [columnFilters, setColumnFilters] = useState<
    Partial<Record<keyof T, string>>
  >({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [showFilters, setShowFilters] = useState(false);

  const debouncedSearch = useDebounceCallback<string>((val) => {
    setSearch(val);
    setPage(1);
  }, 300);

  // ─── Filtering & Searching ────────────────────────────
  const filteredData = useMemo(() => {
    let result = [...data];

    // Search
    if (search) {
      const keys = searchKeys ?? columns.map((c) => c.key as keyof T);
      const q = search.toLowerCase();

      result = result.filter((row) =>
        keys.some((key) =>
          String(row[key] ?? "")
            .toLowerCase()
            .includes(q)
        )
      );
    }

    // Column filters
    (Object.keys(columnFilters) as Array<keyof T>).forEach((key) => {
      const val = columnFilters[key];
      if (!val) return;

      result = result.filter((row) =>
        String(row[key] ?? "")
          .toLowerCase()
          .includes(val.toLowerCase())
      );
    });

    return result;
  }, [data, search, columnFilters, columns, searchKeys]);

  // ─── Sorting ──────────────────────────────────────────
  const sortedData = useMemo(() => {
    if (!sort) return filteredData;
    return sortByKey(filteredData, sort.key as keyof T, sort.direction);
  }, [filteredData, sort]);

  // ─── Pagination ───────────────────────────────────────
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    return sortedData.slice((page - 1) * pageSize, page * pageSize);
  }, [sortedData, page, pageSize, pagination]);

  // const totalPages = Math.ceil(sortedData.length / pageSize);

  // ─── Sort handler ─────────────────────────────────────
  const handleSort = useCallback((key: string) => {
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, direction: "asc" };
      if (prev.direction === "asc") return { key, direction: "desc" };
      return null;
    });
    setPage(1);
  }, []);

  // ─── Selection ────────────────────────────────────────
  const allPageKeys = paginatedData.map((row) => String(row[keyField]));
  const allSelected = allPageKeys.every((k) => selectedKeys.includes(k));
  const someSelected = allPageKeys.some((k) => selectedKeys.includes(k));

  const toggleAll = () => {
    if (allSelected) {
      onSelectionChange?.(selectedKeys.filter((k) => !allPageKeys.includes(k)));
    } else {
      onSelectionChange?.([...new Set([...selectedKeys, ...allPageKeys])]);
    }
  };

  const toggleRow = (key: string) => {
    if (selectedKeys.includes(key)) {
      onSelectionChange?.(selectedKeys.filter((k) => k !== key));
    } else {
      onSelectionChange?.([...selectedKeys, key]);
    }
  };

  // ─── Active filter count ──────────────────────────────
  const activeFilters = Object.values(columnFilters).filter(Boolean).length;

  const hasFilterableColumns = columns.some(
    (c) => c.filterable || c.filterOptions
  );

  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border border-border bg-background overflow-hidden",
        className
      )}
    >
      {/* Toolbar */}
      {(searchable || toolbar || hasFilterableColumns) && (
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border flex-wrap">
          {searchable && (
            <D2YTextField
              type="search"
              placeholder={searchPlaceholder}
              leftIcon={<Search size={16} />}
              size="sm"
              fullWidth={false}
              className="w-56"
              onChange={(e) =>
                debouncedSearch(
                  (e as ChangeEvent<HTMLInputElement>).target.value
                )
              }
              clearable
              onClear={() => {
                setSearch("");
                setPage(1);
              }}
            />
          )}

          {hasFilterableColumns && (
            <D2YButton
              variant={
                showFilters || activeFilters > 0 ? "secondary" : "outline"
              }
              size="sm"
              leftIcon={<Filter size={14} />}
              onClick={() => setShowFilters((v) => !v)}
            >
              Filters
              {activeFilters > 0 && (
                <span className="ml-1 bg-foreground text-background text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {activeFilters}
                </span>
              )}
            </D2YButton>
          )}

          {activeFilters > 0 && (
            <D2YButton
              variant="ghost"
              size="sm"
              leftIcon={<X size={14} />}
              onClick={() => setColumnFilters({})}
            >
              Clear filters
            </D2YButton>
          )}

          <div className="ml-auto flex items-center gap-2">{toolbar}</div>
        </div>
      )}

      {/* Column Filters */}
      {showFilters && hasFilterableColumns && (
        <div className="flex flex-wrap gap-3 px-4 py-3 border-b border-border bg-surface">
          {columns
            .filter((col) => col.filterable || col.filterOptions)
            .map((col) => (
              <div key={col.key} className="flex flex-col gap-1 min-w-40">
                {col.filterOptions ? (
                  <D2YTextField
                    type="select"
                    label={col.label}
                    size="sm"
                    fullWidth={false}
                    options={[
                      { value: "", label: `All ${col.label}` },
                      ...col.filterOptions,
                    ]}
                    value={columnFilters[col.key] ?? ""}
                    onChange={(e) => {
                      const val = (e.target as HTMLSelectElement).value;
                      setColumnFilters((prev) => ({ ...prev, [col.key]: val }));
                      setPage(1);
                    }}
                  />
                ) : (
                  <D2YTextField
                    type="text"
                    label={col.label}
                    size="sm"
                    placeholder={`Filter ${col.label}...`}
                    fullWidth={false}
                    value={columnFilters[col.key] ?? ""}
                    onChange={(e) => {
                      setColumnFilters((prev) => ({
                        ...prev,
                        [col.key]: (e.target as HTMLInputElement).value,
                      }));
                      setPage(1);
                    }}
                  />
                )}
              </div>
            ))}
        </div>
      )}

      {/* Table Scroll Wrapper */}
      <div className="overflow-x-auto flex-1 relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
            <D2YLoading size="md" label="Loading..." />
          </div>
        )}

        <table
          className="w-full text-sm border-collapse"
          role="table"
          aria-busy={loading}
        >
          <thead className={cn(stickyHeader && "sticky top-0 z-1")}>
            <tr className="bg-surface border-b border-border">
              {selectable && (
                <th className="w-10 px-4 py-3">
                  <D2YCheckbox
                    checked={allSelected}
                    indeterminate={someSelected && !allSelected}
                    onChange={toggleAll}
                    aria-label="Select all rows"
                  />
                </th>
              )}

              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "px-4 py-3 font-semibold text-xs uppercase tracking-widest text-muted-foreground text-left whitespace-nowrap",
                    col.align === "center" && "text-center",
                    col.align === "right" && "text-right",
                    col.sortable &&
                      "cursor-pointer select-none hover:text-foreground transition-colors"
                  )}
                  style={{ width: col.width, minWidth: col.minWidth }}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  aria-sort={
                    sort?.key === col.key
                      ? sort.direction === "asc"
                        ? "ascending"
                        : "descending"
                      : col.sortable
                      ? "none"
                      : undefined
                  }
                >
                  <div
                    className={cn(
                      "inline-flex items-center gap-1",
                      col.align === "center" && "justify-center",
                      col.align === "right" && "justify-end"
                    )}
                  >
                    {col.label}
                    {col.sortable && <SortIcon column={col.key} sort={sort} />}
                  </div>
                </th>
              ))}

              {actions && (
                <th className="px-4 py-3 w-10 text-right text-xs uppercase tracking-widest font-semibold text-muted-foreground">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {paginatedData.length === 0 && !loading ? (
              <tr>
                <td
                  colSpan={
                    columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)
                  }
                >
                  <D2YNoData
                    variant={search || activeFilters > 0 ? "search" : "default"}
                    title={emptyTitle}
                    description={emptyDescription}
                    size="sm"
                  />
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => {
                const key = String(row[keyField] ?? rowIndex);
                const isSelected = selectedKeys.includes(key);

                return (
                  <tr
                    key={key}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    className={cn(
                      "border-b border-border transition-colors duration-100",
                      striped && rowIndex % 2 === 1 && "bg-surface/50",
                      isSelected && "bg-surface",
                      (onRowClick || selectable) &&
                        "cursor-pointer hover:bg-surface",
                      "group"
                    )}
                    aria-selected={selectable ? isSelected : undefined}
                  >
                    {selectable && (
                      <td
                        className={cn("px-4", compact ? "py-2" : "py-3")}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <D2YCheckbox
                          checked={isSelected}
                          onChange={() => toggleRow(key)}
                          aria-label={`Select row ${key}`}
                        />
                      </td>
                    )}

                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={cn(
                          "px-4 text-foreground",
                          compact ? "py-2" : "py-3.5",
                          col.align === "center" && "text-center",
                          col.align === "right" && "text-right"
                        )}
                      >
                        {col.render ? (
                          col.render(row[col.key], row, rowIndex)
                        ) : (
                          <span className="text-sm">
                            {String(row[col.key] ?? "—")}
                          </span>
                        )}
                      </td>
                    ))}

                    {actions && (
                      <td
                        className={cn(
                          "px-4 text-right",
                          compact ? "py-2" : "py-3"
                        )}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {actions(row)}
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && sortedData.length > 0 && (
        <Pagination
          state={{ page, pageSize, total: sortedData.length }}
          onPageChange={(p) => {
            setPage(p);
          }}
          pageSizeOptions={[...APP_CONFIG.pagination.pageSizeOptions]}
          onPageSizeChange={(s) => {
            setPageSize(s);
            setPage(1);
          }}
        />
      )}
    </div>
  );
}
