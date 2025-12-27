// Path: src/components/organisms/DataGrid/DataGrid.tsx
import React, { useCallback, useRef } from 'react';
import { Download } from 'lucide-react';
import {
  DataGridHeader,
  DataGridRow,
  DataGridFooter,
  DataGridPagination,
  DataGridFilters,
  DataGridEmpty,
  DataGridLoading,
  DataGridLoadingOverlay,
} from './components';
import {
  useDataGridSort,
  useDataGridFilter,
  useDataGridSelection,
  useDataGridPagination,
  useDataGridVirtualization,
  useDataGridResize,
} from './hooks';
import type { DataGridProps } from './types';
import styles from './DataGrid.module.css';

/* ═══════════════════════════════════════════════════════════════════════════════
   DATAGRID COMPONENT
   Advanced data table with sorting, filtering, pagination, and virtualization
   ═══════════════════════════════════════════════════════════════════════════════ */

// Default row ID getter
function defaultGetRowId<T>(row: T): string {
  const rowWithId = row as { id?: string | number };
  if (rowWithId.id !== undefined) return String(rowWithId.id);
  return String(Math.random());
}

export function DataGrid<T>({
  // Data
  data,
  columns,

  // Selection
  selectable = false,
  selectionMode = 'multiple',
  selectedRows: controlledSelectedRows,
  onSelectionChange,
  getRowId = defaultGetRowId,

  // Sorting
  sortable = false,
  defaultSort,
  sort: controlledSort,
  onSortChange,

  // Pagination
  pagination = false,
  pageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
  totalRows: externalTotalRows,
  currentPage: controlledPage,
  onPageChange,
  onPageSizeChange,

  // Filtering
  filterable = false,
  filters: controlledFilters,
  onFiltersChange,

  // Grouping (TODO: implement grouping feature)
  groupBy: _groupBy,
  expandedGroups: _expandedGroups,
  onGroupExpand: _onGroupExpand,

  // Row Expansion
  expandable = false,
  expandedRows: controlledExpandedRows,
  onRowExpand,
  renderExpandedRow,

  // Virtualization
  virtualized = false,
  rowHeight = 44,
  overscan = 5,

  // States
  loading = false,
  emptyState,
  errorState,
  error,

  // Events
  onRowClick,
  onRowDoubleClick,
  onCellClick,
  onColumnResize,

  // Styles
  striped = false,
  bordered = false,
  compact = false,
  stickyHeader = true,
  maxHeight,
  className,

  // Footer
  showFooter = false,

  // Export
  exportable = false,
  exportFilename = 'data-export',
}: DataGridProps<T>) {
  const tableRef = useRef<HTMLDivElement>(null);

  // ─────────────────────────────────────────────────────────────────────────────
  // HOOKS
  // ─────────────────────────────────────────────────────────────────────────────

  // Filtering
  const {
    filters,
    filteredData,
    setFilter,
    clearFilter,
    clearAllFilters,
    hasActiveFilters,
  } = useDataGridFilter(data, {
    columns,
    controlledFilters,
    onFiltersChange,
  });

  // Sorting
  const { sortedData, handleSort, getSortDirection } = useDataGridSort(
    filteredData,
    {
      columns,
      defaultSort,
      controlledSort,
      onSortChange,
    }
  );

  // Pagination
  const {
    currentPage,
    pageSize: actualPageSize,
    totalPages,
    totalRows,
    pageSizeOptions: actualPageSizeOptions,
    paginatedData,
    startIndex,
    endIndex,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
    setPageSize,
    canGoNext,
    canGoPrevious,
    pageNumbers,
  } = useDataGridPagination(sortedData, {
    pageSize,
    pageSizeOptions,
    totalRows: externalTotalRows,
    controlledPage,
    onPageChange,
    onPageSizeChange,
  });

  // Selection
  const {
    isSelected,
    isAllSelected,
    isPartiallySelected,
    toggleRow,
    toggleAll,
  } = useDataGridSelection(pagination ? paginatedData : sortedData, {
    mode: selectionMode,
    controlledSelectedRows,
    onSelectionChange,
    getRowId,
  });

  // Column resize
  const { columnWidths, resizeHandleProps } = useDataGridResize({
    onColumnResize,
  });

  // Virtualization
  const containerHeight = typeof maxHeight === 'number' ? maxHeight : undefined;
  const {
    virtualizedData,
    containerRef,
    totalHeight,
    offsetTop,
    onScroll,
    isVirtualized,
  } = useDataGridVirtualization(pagination ? paginatedData : sortedData, {
    enabled: virtualized,
    rowHeight,
    overscan,
    containerHeight,
  });

  // Expanded rows state (internal if not controlled)
  const [internalExpandedRows, setInternalExpandedRows] = React.useState<string[]>([]);
  const expandedRows = controlledExpandedRows ?? internalExpandedRows;

  const handleRowExpand = useCallback(
    (rowId: string) => {
      if (onRowExpand) {
        onRowExpand(rowId);
      } else {
        setInternalExpandedRows((prev) =>
          prev.includes(rowId)
            ? prev.filter((id) => id !== rowId)
            : [...prev, rowId]
        );
      }
    },
    [onRowExpand]
  );

  // ─────────────────────────────────────────────────────────────────────────────
  // DATA PROCESSING
  // ─────────────────────────────────────────────────────────────────────────────

  // Final data to display
  const displayData = isVirtualized ? virtualizedData : (pagination ? paginatedData : sortedData);

  // Check if empty
  const isEmpty = displayData.length === 0 && !loading;
  const isFiltered = hasActiveFilters;

  // ─────────────────────────────────────────────────────────────────────────────
  // EXPORT FUNCTIONALITY
  // ─────────────────────────────────────────────────────────────────────────────

  const exportToCSV = useCallback(() => {
    const visibleColumns = columns.filter((col) => !col.hidden);

    // Build header row
    const headers = visibleColumns.map((col) =>
      typeof col.header === 'string' ? col.header : col.id
    );

    // Build data rows
    const rows = sortedData.map((row) =>
      visibleColumns.map((col) => {
        const value =
          typeof col.accessor === 'function'
            ? col.accessor(row)
            : row[col.accessor as keyof T];
        // Escape quotes and wrap in quotes if contains comma
        const strValue = String(value ?? '');
        if (strValue.includes(',') || strValue.includes('"') || strValue.includes('\n')) {
          return `"${strValue.replace(/"/g, '""')}"`;
        }
        return strValue;
      })
    );

    // Combine header and rows
    const csv = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    // Create and download file
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${exportFilename}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  }, [columns, sortedData, exportFilename]);

  // ─────────────────────────────────────────────────────────────────────────────
  // KEYBOARD NAVIGATION
  // ─────────────────────────────────────────────────────────────────────────────

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const row = target.closest('[data-row-id]') as HTMLElement | null;

      if (!row) return;

      const allRows = tableRef.current?.querySelectorAll('[data-row-id]');
      if (!allRows) return;

      const rowArray = Array.from(allRows);
      const currentIndex = rowArray.indexOf(row);

      let nextRow: Element | null = null;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          nextRow = rowArray[currentIndex + 1];
          break;
        case 'ArrowUp':
          e.preventDefault();
          nextRow = rowArray[currentIndex - 1];
          break;
        case 'Home':
          e.preventDefault();
          nextRow = rowArray[0];
          break;
        case 'End':
          e.preventDefault();
          nextRow = rowArray[rowArray.length - 1];
          break;
      }

      if (nextRow) {
        (nextRow as HTMLElement).focus();
      }
    },
    []
  );

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────────

  const wrapperClasses = [
    styles.dataGrid,
    bordered && styles.dataGridBordered,
    compact && styles.dataGridCompact,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const containerStyles: React.CSSProperties = {
    maxHeight: maxHeight,
  };

  // Loading skeleton
  if (loading && displayData.length === 0) {
    return (
      <div className={wrapperClasses}>
        <DataGridLoading rows={pageSize} columns={columns.filter(c => !c.hidden).length} />
      </div>
    );
  }

  // Error state
  if (error || errorState) {
    return (
      <div className={wrapperClasses}>
        {errorState || <DataGridEmpty type="error" message={error} />}
      </div>
    );
  }

  return (
    <div className={wrapperClasses}>
      {/* Toolbar: Filters and Export */}
      {(filterable || exportable) && (
        <div className={styles.toolbar}>
          {filterable && (
            <DataGridFilters
              columns={columns}
              filters={filters}
              onFilterChange={setFilter}
              onClearFilter={clearFilter}
              onClearAllFilters={clearAllFilters}
              hasActiveFilters={hasActiveFilters}
            />
          )}

          {exportable && (
            <button
              type="button"
              className={styles.exportButton}
              onClick={exportToCSV}
              aria-label="Exportar a CSV"
            >
              <Download size={16} />
              <span>Exportar</span>
            </button>
          )}
        </div>
      )}

      {/* Table container */}
      <div
        ref={isVirtualized ? containerRef : tableRef}
        className={styles.tableContainer}
        style={containerStyles}
        onScroll={isVirtualized ? onScroll : undefined}
        onKeyDown={handleKeyDown}
        role="grid"
        aria-busy={loading}
        aria-rowcount={totalRows}
      >
        {/* Loading overlay */}
        {loading && displayData.length > 0 && <DataGridLoadingOverlay />}

        {/* Virtualization spacer (top) */}
        {isVirtualized && (
          <div style={{ height: offsetTop, flexShrink: 0 }} />
        )}

        <table className={styles.table}>
          <DataGridHeader
            columns={columns}
            selectable={selectable}
            expandable={expandable}
            isAllSelected={isAllSelected}
            isPartiallySelected={isPartiallySelected}
            onSelectAll={() => toggleAll(pagination ? paginatedData : sortedData)}
            getSortDirection={sortable ? getSortDirection : undefined}
            onSort={sortable ? handleSort : undefined}
            columnWidths={columnWidths}
            resizable={columns.some((col) => col.resizable !== false)}
            resizeHandleProps={resizeHandleProps}
            stickyHeader={stickyHeader}
          />

          <tbody className={styles.tbody}>
            {isEmpty ? (
              <tr>
                <td
                  colSpan={
                    columns.filter((c) => !c.hidden).length +
                    (selectable ? 1 : 0) +
                    (expandable ? 1 : 0)
                  }
                  className={styles.emptyCell}
                >
                  {emptyState || (
                    <DataGridEmpty
                      type={isFiltered ? 'no-results' : 'empty'}
                      action={
                        isFiltered && (
                          <button
                            type="button"
                            className={styles.clearFiltersButton}
                            onClick={clearAllFilters}
                          >
                            Limpiar filtros
                          </button>
                        )
                      }
                    />
                  )}
                </td>
              </tr>
            ) : (
              displayData.map((row, index) => {
                const actualIndex = isVirtualized
                  ? index + (startIndex || 0)
                  : pagination
                  ? index + startIndex
                  : index;
                const rowId = getRowId(row);

                return (
                  <DataGridRow
                    key={rowId}
                    row={row}
                    rowIndex={actualIndex}
                    rowId={rowId}
                    columns={columns}
                    selectable={selectable}
                    isSelected={isSelected(row)}
                    onSelect={() => toggleRow(row)}
                    expandable={expandable}
                    isExpanded={expandedRows.includes(rowId)}
                    onExpand={() => handleRowExpand(rowId)}
                    renderExpandedRow={renderExpandedRow}
                    onClick={onRowClick ? () => onRowClick(row, actualIndex) : undefined}
                    onDoubleClick={
                      onRowDoubleClick
                        ? () => onRowDoubleClick(row, actualIndex)
                        : undefined
                    }
                    onCellClick={
                      onCellClick
                        ? (value, column) => onCellClick(value, row, column)
                        : undefined
                    }
                    columnWidths={columnWidths}
                    compact={compact}
                    striped={striped}
                  />
                );
              })
            )}
          </tbody>

          {showFooter && !isEmpty && (
            <DataGridFooter
              columns={columns}
              data={sortedData}
              selectable={selectable}
              expandable={expandable}
              columnWidths={columnWidths}
            />
          )}
        </table>

        {/* Virtualization spacer (bottom) */}
        {isVirtualized && (
          <div
            style={{
              height: totalHeight - offsetTop - displayData.length * rowHeight,
              flexShrink: 0,
            }}
          />
        )}
      </div>

      {/* Pagination */}
      {pagination && !isEmpty && (
        <DataGridPagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={actualPageSize}
          pageSizeOptions={actualPageSizeOptions}
          totalRows={totalRows}
          startIndex={startIndex}
          endIndex={endIndex}
          canGoNext={canGoNext}
          canGoPrevious={canGoPrevious}
          pageNumbers={pageNumbers}
          onPageChange={goToPage}
          onPageSizeChange={setPageSize}
          onFirstPage={goToFirstPage}
          onLastPage={goToLastPage}
          onNextPage={goToNextPage}
          onPreviousPage={goToPreviousPage}
        />
      )}
    </div>
  );
}
