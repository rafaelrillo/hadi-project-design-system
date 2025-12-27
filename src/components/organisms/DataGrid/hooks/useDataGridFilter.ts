// Path: src/components/organisms/DataGrid/hooks/useDataGridFilter.ts
import { useState, useMemo, useCallback } from 'react';
import type { DataGridColumn } from '../types';

/* ═══════════════════════════════════════════════════════════════════════════════
   useDataGridFilter Hook
   Handles filtering logic for DataGrid
   ═══════════════════════════════════════════════════════════════════════════════ */

interface UseDataGridFilterOptions<T> {
  columns: DataGridColumn<T>[];
  controlledFilters?: Record<string, unknown>;
  onFiltersChange?: (filters: Record<string, unknown>) => void;
}

interface UseDataGridFilterResult<T> {
  filters: Record<string, unknown>;
  filteredData: T[];
  setFilter: (columnId: string, value: unknown) => void;
  clearFilter: (columnId: string) => void;
  clearAllFilters: () => void;
  hasActiveFilters: boolean;
  getFilterValue: (columnId: string) => unknown;
}

export function useDataGridFilter<T>(
  data: T[],
  options: UseDataGridFilterOptions<T>
): UseDataGridFilterResult<T> {
  const { columns, controlledFilters, onFiltersChange } = options;

  // Internal state for uncontrolled mode
  const [internalFilters, setInternalFilters] = useState<Record<string, unknown>>({});

  // Use controlled or uncontrolled state
  const isControlled = controlledFilters !== undefined;
  const filters = isControlled ? controlledFilters : internalFilters;

  // Get the column definition
  const getColumn = useCallback(
    (columnId: string) => columns.find((col) => col.id === columnId),
    [columns]
  );

  // Get the value from a row using the column accessor
  const getValue = useCallback(
    (row: T, column: DataGridColumn<T>): unknown => {
      if (typeof column.accessor === 'function') {
        return column.accessor(row);
      }
      return row[column.accessor as keyof T];
    },
    []
  );

  // Default filter functions by type
  const defaultFilterFn = useCallback(
    (value: unknown, filterValue: unknown, filterType?: string): boolean => {
      if (filterValue === undefined || filterValue === null || filterValue === '') {
        return true;
      }

      // Text filter (case-insensitive contains)
      if (filterType === 'text' || typeof filterValue === 'string') {
        const stringValue = String(value ?? '').toLowerCase();
        const stringFilter = String(filterValue).toLowerCase();
        return stringValue.includes(stringFilter);
      }

      // Select filter (exact match)
      if (filterType === 'select') {
        return value === filterValue;
      }

      // Number filter (range)
      if (filterType === 'number' && typeof filterValue === 'object' && filterValue !== null) {
        const numValue = Number(value);
        const { min, max } = filterValue as { min?: number; max?: number };
        if (min !== undefined && numValue < min) return false;
        if (max !== undefined && numValue > max) return false;
        return true;
      }

      // Date range filter
      if (filterType === 'dateRange' && typeof filterValue === 'object' && filterValue !== null) {
        const dateValue = value instanceof Date ? value : new Date(String(value));
        const { start, end } = filterValue as { start?: Date; end?: Date };
        if (start && dateValue < start) return false;
        if (end && dateValue > end) return false;
        return true;
      }

      // Boolean filter
      if (filterType === 'boolean') {
        return value === filterValue;
      }

      // Default: exact match
      return value === filterValue;
    },
    []
  );

  // Filter the data
  const filteredData = useMemo(() => {
    const activeFilters = Object.entries(filters).filter(
      ([, value]) => value !== undefined && value !== null && value !== ''
    );

    if (activeFilters.length === 0) return data;

    return data.filter((row) => {
      return activeFilters.every(([columnId, filterValue]) => {
        const column = getColumn(columnId);
        if (!column) return true;

        const value = getValue(row, column);

        // Use custom filter function if provided
        if (column.filterFn) {
          return column.filterFn(row, filterValue);
        }

        // Use default filter
        return defaultFilterFn(value, filterValue, column.filter?.type);
      });
    });
  }, [data, filters, getColumn, getValue, defaultFilterFn]);

  // Set a filter value
  const setFilter = useCallback(
    (columnId: string, value: unknown) => {
      const newFilters = { ...filters, [columnId]: value };

      if (isControlled) {
        onFiltersChange?.(newFilters);
      } else {
        setInternalFilters(newFilters);
        onFiltersChange?.(newFilters);
      }
    },
    [filters, isControlled, onFiltersChange]
  );

  // Clear a specific filter
  const clearFilter = useCallback(
    (columnId: string) => {
      const { [columnId]: _, ...newFilters } = filters;

      if (isControlled) {
        onFiltersChange?.(newFilters);
      } else {
        setInternalFilters(newFilters);
        onFiltersChange?.(newFilters);
      }
    },
    [filters, isControlled, onFiltersChange]
  );

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    if (isControlled) {
      onFiltersChange?.({});
    } else {
      setInternalFilters({});
      onFiltersChange?.({});
    }
  }, [isControlled, onFiltersChange]);

  // Check if there are active filters
  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some(
      (value) => value !== undefined && value !== null && value !== ''
    );
  }, [filters]);

  // Get filter value for a column
  const getFilterValue = useCallback(
    (columnId: string): unknown => filters[columnId],
    [filters]
  );

  return {
    filters,
    filteredData,
    setFilter,
    clearFilter,
    clearAllFilters,
    hasActiveFilters,
    getFilterValue,
  };
}
