// Path: src/components/organisms/DataGrid/hooks/useDataGridSelection.ts
import { useState, useCallback, useMemo } from 'react';
import type { SelectionMode } from '../types';

/* ═══════════════════════════════════════════════════════════════════════════════
   useDataGridSelection Hook
   Handles row selection logic for DataGrid
   ═══════════════════════════════════════════════════════════════════════════════ */

interface UseDataGridSelectionOptions<T> {
  mode?: SelectionMode;
  controlledSelectedRows?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  getRowId: (row: T) => string;
}

interface UseDataGridSelectionResult<T> {
  selectedRows: string[];
  isSelected: (row: T) => boolean;
  isAllSelected: boolean;
  isPartiallySelected: boolean;
  toggleRow: (row: T) => void;
  toggleAll: (allRows: T[]) => void;
  selectRow: (row: T) => void;
  deselectRow: (row: T) => void;
  selectAll: (allRows: T[]) => void;
  deselectAll: () => void;
  selectRange: (rows: T[]) => void;
}

export function useDataGridSelection<T>(
  data: T[],
  options: UseDataGridSelectionOptions<T>
): UseDataGridSelectionResult<T> {
  const {
    mode = 'multiple',
    controlledSelectedRows,
    onSelectionChange,
    getRowId,
  } = options;

  // Internal state for uncontrolled mode
  const [internalSelectedRows, setInternalSelectedRows] = useState<string[]>([]);

  // Use controlled or uncontrolled state
  const isControlled = controlledSelectedRows !== undefined;
  const selectedRows = isControlled ? controlledSelectedRows : internalSelectedRows;

  // Update selection
  const updateSelection = useCallback(
    (newSelection: string[]) => {
      if (isControlled) {
        onSelectionChange?.(newSelection);
      } else {
        setInternalSelectedRows(newSelection);
        onSelectionChange?.(newSelection);
      }
    },
    [isControlled, onSelectionChange]
  );

  // Check if a row is selected
  const isSelected = useCallback(
    (row: T): boolean => {
      const rowId = getRowId(row);
      return selectedRows.includes(rowId);
    },
    [selectedRows, getRowId]
  );

  // Check if all rows are selected
  const isAllSelected = useMemo(() => {
    if (data.length === 0) return false;
    return data.every((row) => selectedRows.includes(getRowId(row)));
  }, [data, selectedRows, getRowId]);

  // Check if some (but not all) rows are selected
  const isPartiallySelected = useMemo(() => {
    if (data.length === 0) return false;
    const selectedCount = data.filter((row) =>
      selectedRows.includes(getRowId(row))
    ).length;
    return selectedCount > 0 && selectedCount < data.length;
  }, [data, selectedRows, getRowId]);

  // Toggle a single row
  const toggleRow = useCallback(
    (row: T) => {
      const rowId = getRowId(row);

      if (mode === 'single') {
        // Single selection mode - toggle or select this row only
        if (selectedRows.includes(rowId)) {
          updateSelection([]);
        } else {
          updateSelection([rowId]);
        }
      } else {
        // Multiple selection mode
        if (selectedRows.includes(rowId)) {
          updateSelection(selectedRows.filter((id) => id !== rowId));
        } else {
          updateSelection([...selectedRows, rowId]);
        }
      }
    },
    [mode, selectedRows, getRowId, updateSelection]
  );

  // Toggle all rows
  const toggleAll = useCallback(
    (allRows: T[]) => {
      if (mode === 'single') return;

      if (isAllSelected) {
        updateSelection([]);
      } else {
        updateSelection(allRows.map(getRowId));
      }
    },
    [mode, isAllSelected, getRowId, updateSelection]
  );

  // Select a specific row
  const selectRow = useCallback(
    (row: T) => {
      const rowId = getRowId(row);

      if (mode === 'single') {
        updateSelection([rowId]);
      } else {
        if (!selectedRows.includes(rowId)) {
          updateSelection([...selectedRows, rowId]);
        }
      }
    },
    [mode, selectedRows, getRowId, updateSelection]
  );

  // Deselect a specific row
  const deselectRow = useCallback(
    (row: T) => {
      const rowId = getRowId(row);
      updateSelection(selectedRows.filter((id) => id !== rowId));
    },
    [selectedRows, getRowId, updateSelection]
  );

  // Select all rows
  const selectAll = useCallback(
    (allRows: T[]) => {
      if (mode === 'single') return;
      updateSelection(allRows.map(getRowId));
    },
    [mode, getRowId, updateSelection]
  );

  // Deselect all rows
  const deselectAll = useCallback(() => {
    updateSelection([]);
  }, [updateSelection]);

  // Select a range of rows (for shift+click)
  const selectRange = useCallback(
    (rows: T[]) => {
      if (mode === 'single') return;

      const newIds = rows.map(getRowId);
      const combined = [...new Set([...selectedRows, ...newIds])];
      updateSelection(combined);
    },
    [mode, selectedRows, getRowId, updateSelection]
  );

  return {
    selectedRows,
    isSelected,
    isAllSelected,
    isPartiallySelected,
    toggleRow,
    toggleAll,
    selectRow,
    deselectRow,
    selectAll,
    deselectAll,
    selectRange,
  };
}
