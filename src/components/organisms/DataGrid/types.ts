// Path: src/components/organisms/DataGrid/types.ts
import React from 'react';

/* ═══════════════════════════════════════════════════════════════════════════════
   DATAGRID TYPES
   TypeScript interfaces for the advanced DataGrid component
   ═══════════════════════════════════════════════════════════════════════════════ */

// ─────────────────────────────────────────────────────────────────────────────
// COLUMN DEFINITION
// ─────────────────────────────────────────────────────────────────────────────

export type FilterType = 'text' | 'select' | 'number' | 'date' | 'dateRange' | 'boolean';

export interface ColumnFilter {
  type: FilterType;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export interface DataGridColumn<T> {
  id: string;
  header: string | React.ReactNode;
  accessor: keyof T | ((row: T) => unknown);
  width?: number | string;
  minWidth?: number;
  maxWidth?: number;
  sortable?: boolean;
  filterable?: boolean;
  filter?: ColumnFilter;
  resizable?: boolean;
  sticky?: 'left' | 'right';
  align?: 'left' | 'center' | 'right';
  cell?: (value: unknown, row: T, index: number) => React.ReactNode;
  footer?: (rows: T[]) => React.ReactNode;
  sortFn?: (a: T, b: T) => number;
  filterFn?: (row: T, filterValue: unknown) => boolean;
  hidden?: boolean;
  ellipsis?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// SORTING
// ─────────────────────────────────────────────────────────────────────────────

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  column: string;
  direction: SortDirection;
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGINATION
// ─────────────────────────────────────────────────────────────────────────────

export interface PaginationConfig {
  currentPage: number;
  pageSize: number;
  totalRows: number;
  pageSizeOptions?: number[];
}

// ─────────────────────────────────────────────────────────────────────────────
// GROUPING
// ─────────────────────────────────────────────────────────────────────────────

export interface GroupConfig {
  groupBy: string;
  expandedGroups: string[];
}

export interface GroupedRow<T> {
  isGroup: true;
  groupKey: string;
  groupValue: unknown;
  count: number;
  rows: T[];
}

// ─────────────────────────────────────────────────────────────────────────────
// ROW EXPANSION
// ─────────────────────────────────────────────────────────────────────────────

export interface RowExpansionConfig<T> {
  expandedRows: string[];
  renderExpandedRow: (row: T) => React.ReactNode;
}

// ─────────────────────────────────────────────────────────────────────────────
// SELECTION
// ─────────────────────────────────────────────────────────────────────────────

export type SelectionMode = 'single' | 'multiple';

export interface SelectionConfig {
  mode: SelectionMode;
  selectedRows: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PROPS
// ─────────────────────────────────────────────────────────────────────────────

export interface DataGridProps<T> {
  /** Data array to display */
  data: T[];
  /** Column definitions */
  columns: DataGridColumn<T>[];

  // ─── Selection ───
  /** Enable row selection */
  selectable?: boolean;
  /** Single or multiple selection mode */
  selectionMode?: SelectionMode;
  /** Currently selected row IDs */
  selectedRows?: string[];
  /** Callback when selection changes */
  onSelectionChange?: (selectedIds: string[]) => void;
  /** Function to get unique row ID */
  getRowId?: (row: T) => string;

  // ─── Sorting ───
  /** Enable column sorting */
  sortable?: boolean;
  /** Default sort configuration */
  defaultSort?: SortConfig;
  /** Controlled sort state */
  sort?: SortConfig | null;
  /** Callback when sort changes */
  onSortChange?: (sort: SortConfig | null) => void;

  // ─── Pagination ───
  /** Enable pagination */
  pagination?: boolean;
  /** Page size (items per page) */
  pageSize?: number;
  /** Available page size options */
  pageSizeOptions?: number[];
  /** Total number of rows (for server-side pagination) */
  totalRows?: number;
  /** Current page (1-indexed) */
  currentPage?: number;
  /** Callback when page changes */
  onPageChange?: (page: number) => void;
  /** Callback when page size changes */
  onPageSizeChange?: (size: number) => void;

  // ─── Filtering ───
  /** Enable column filters */
  filterable?: boolean;
  /** Current filter values */
  filters?: Record<string, unknown>;
  /** Callback when filters change */
  onFiltersChange?: (filters: Record<string, unknown>) => void;

  // ─── Grouping ───
  /** Column ID to group by */
  groupBy?: string;
  /** Expanded group keys */
  expandedGroups?: string[];
  /** Callback when group is expanded/collapsed */
  onGroupExpand?: (groupId: string) => void;

  // ─── Row Expansion ───
  /** Enable row expansion */
  expandable?: boolean;
  /** Expanded row IDs */
  expandedRows?: string[];
  /** Callback when row is expanded/collapsed */
  onRowExpand?: (rowId: string) => void;
  /** Render function for expanded content */
  renderExpandedRow?: (row: T) => React.ReactNode;

  // ─── Virtualization ───
  /** Enable virtualization for large datasets */
  virtualized?: boolean;
  /** Row height for virtualization */
  rowHeight?: number;
  /** Number of extra rows to render outside viewport */
  overscan?: number;

  // ─── States ───
  /** Show loading overlay */
  loading?: boolean;
  /** Custom empty state content */
  emptyState?: React.ReactNode;
  /** Custom error state content */
  errorState?: React.ReactNode;
  /** Error message to display */
  error?: string;

  // ─── Events ───
  /** Callback when row is clicked */
  onRowClick?: (row: T, index: number) => void;
  /** Callback when row is double-clicked */
  onRowDoubleClick?: (row: T, index: number) => void;
  /** Callback when cell is clicked */
  onCellClick?: (value: unknown, row: T, column: DataGridColumn<T>) => void;
  /** Callback when column is resized */
  onColumnResize?: (columnId: string, width: number) => void;

  // ─── Styles ───
  /** Show alternating row colors */
  striped?: boolean;
  /** Show cell borders */
  bordered?: boolean;
  /** Use compact row height */
  compact?: boolean;
  /** Make header sticky on scroll */
  stickyHeader?: boolean;
  /** Maximum height with scroll */
  maxHeight?: number | string;
  /** Additional CSS class */
  className?: string;

  // ─── Footer ───
  /** Show footer with aggregations */
  showFooter?: boolean;

  // ─── Export ───
  /** Enable CSV export */
  exportable?: boolean;
  /** Custom export filename */
  exportFilename?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// INTERNAL TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface ColumnWidth {
  id: string;
  width: number;
}

export interface VirtualizedRange {
  startIndex: number;
  endIndex: number;
  offsetTop: number;
}

export interface ResizeState {
  columnId: string;
  startX: number;
  startWidth: number;
}
