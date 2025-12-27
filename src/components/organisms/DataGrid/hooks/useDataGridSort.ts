// Path: src/components/organisms/DataGrid/hooks/useDataGridSort.ts
import { useState, useMemo, useCallback } from 'react';
import type { SortConfig, SortDirection, DataGridColumn } from '../types';

/* ═══════════════════════════════════════════════════════════════════════════════
   useDataGridSort Hook
   Handles sorting logic for DataGrid
   ═══════════════════════════════════════════════════════════════════════════════ */

interface UseDataGridSortOptions<T> {
  columns: DataGridColumn<T>[];
  defaultSort?: SortConfig;
  controlledSort?: SortConfig | null;
  onSortChange?: (sort: SortConfig | null) => void;
}

interface UseDataGridSortResult<T> {
  sort: SortConfig | null;
  sortedData: T[];
  handleSort: (columnId: string) => void;
  clearSort: () => void;
  getSortDirection: (columnId: string) => SortDirection | null;
}

export function useDataGridSort<T>(
  data: T[],
  options: UseDataGridSortOptions<T>
): UseDataGridSortResult<T> {
  const { columns, defaultSort, controlledSort, onSortChange } = options;

  // Internal state for uncontrolled mode
  const [internalSort, setInternalSort] = useState<SortConfig | null>(
    defaultSort || null
  );

  // Use controlled or uncontrolled state
  const isControlled = controlledSort !== undefined;
  const sort = isControlled ? controlledSort : internalSort;

  // Get the column definition for sorting
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

  // Default comparison function
  const defaultCompare = useCallback(
    (a: unknown, b: unknown, direction: SortDirection): number => {
      // Handle null/undefined
      if (a == null && b == null) return 0;
      if (a == null) return direction === 'asc' ? -1 : 1;
      if (b == null) return direction === 'asc' ? 1 : -1;

      // String comparison
      if (typeof a === 'string' && typeof b === 'string') {
        const result = a.localeCompare(b, undefined, {
          numeric: true,
          sensitivity: 'base'
        });
        return direction === 'asc' ? result : -result;
      }

      // Number comparison
      if (typeof a === 'number' && typeof b === 'number') {
        const result = a - b;
        return direction === 'asc' ? result : -result;
      }

      // Date comparison
      if (a instanceof Date && b instanceof Date) {
        const result = a.getTime() - b.getTime();
        return direction === 'asc' ? result : -result;
      }

      // Boolean comparison
      if (typeof a === 'boolean' && typeof b === 'boolean') {
        const result = (a === b) ? 0 : a ? 1 : -1;
        return direction === 'asc' ? result : -result;
      }

      // Fallback to string comparison
      const aStr = String(a);
      const bStr = String(b);
      const result = aStr.localeCompare(bStr);
      return direction === 'asc' ? result : -result;
    },
    []
  );

  // Sort the data
  const sortedData = useMemo(() => {
    if (!sort) return data;

    const column = getColumn(sort.column);
    if (!column) return data;

    const sorted = [...data].sort((a, b) => {
      // Use custom sort function if provided
      if (column.sortFn) {
        const result = column.sortFn(a, b);
        return sort.direction === 'asc' ? result : -result;
      }

      // Use default comparison
      const aValue = getValue(a, column);
      const bValue = getValue(b, column);
      return defaultCompare(aValue, bValue, sort.direction);
    });

    return sorted;
  }, [data, sort, getColumn, getValue, defaultCompare]);

  // Handle sort toggle
  const handleSort = useCallback(
    (columnId: string) => {
      const column = getColumn(columnId);
      if (!column?.sortable) return;

      let newSort: SortConfig | null;

      if (!sort || sort.column !== columnId) {
        // New column - start with ascending
        newSort = { column: columnId, direction: 'asc' };
      } else if (sort.direction === 'asc') {
        // Same column, was ascending - switch to descending
        newSort = { column: columnId, direction: 'desc' };
      } else {
        // Same column, was descending - clear sort
        newSort = null;
      }

      if (isControlled) {
        onSortChange?.(newSort);
      } else {
        setInternalSort(newSort);
        onSortChange?.(newSort);
      }
    },
    [sort, getColumn, isControlled, onSortChange]
  );

  // Clear sort
  const clearSort = useCallback(() => {
    if (isControlled) {
      onSortChange?.(null);
    } else {
      setInternalSort(null);
      onSortChange?.(null);
    }
  }, [isControlled, onSortChange]);

  // Get sort direction for a column
  const getSortDirection = useCallback(
    (columnId: string): SortDirection | null => {
      if (!sort || sort.column !== columnId) return null;
      return sort.direction;
    },
    [sort]
  );

  return {
    sort,
    sortedData,
    handleSort,
    clearSort,
    getSortDirection,
  };
}
