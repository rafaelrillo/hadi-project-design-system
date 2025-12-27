// Path: src/components/organisms/DataGrid/components/DataGridHeader.tsx
import React from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, GripVertical } from 'lucide-react';
import { Checkbox } from '../../../atoms/Checkbox';
import type { DataGridColumn, SortDirection } from '../types';
import styles from '../DataGrid.module.css';

/* ═══════════════════════════════════════════════════════════════════════════════
   DataGridHeader Component
   Renders the header row with sorting and selection controls
   ═══════════════════════════════════════════════════════════════════════════════ */

interface DataGridHeaderProps<T> {
  columns: DataGridColumn<T>[];
  selectable?: boolean;
  expandable?: boolean;
  isAllSelected?: boolean;
  isPartiallySelected?: boolean; // Reserved for indeterminate checkbox support
  onSelectAll?: () => void;
  getSortDirection?: (columnId: string) => SortDirection | null;
  onSort?: (columnId: string) => void;
  columnWidths?: Record<string, number>;
  resizable?: boolean;
  resizeHandleProps?: (columnId: string, currentWidth: number) => {
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart: (e: React.TouchEvent) => void;
  };
  stickyHeader?: boolean;
}

export function DataGridHeader<T>({
  columns,
  selectable,
  expandable,
  isAllSelected,
  isPartiallySelected: _isPartiallySelected,
  onSelectAll,
  getSortDirection,
  onSort,
  columnWidths,
  resizable,
  resizeHandleProps,
  stickyHeader,
}: DataGridHeaderProps<T>) {
  const visibleColumns = columns.filter((col) => !col.hidden);

  const getSortIcon = (columnId: string) => {
    const direction = getSortDirection?.(columnId);

    if (!direction) {
      return <ChevronsUpDown size={14} className={styles.sortIconInactive} />;
    }

    if (direction === 'asc') {
      return <ChevronUp size={14} className={styles.sortIconActive} />;
    }

    return <ChevronDown size={14} className={styles.sortIconActive} />;
  };

  const getColumnWidth = (column: DataGridColumn<T>): string | number | undefined => {
    if (columnWidths?.[column.id]) {
      return columnWidths[column.id];
    }
    return column.width;
  };

  const getColumnStyle = (column: DataGridColumn<T>): React.CSSProperties => {
    const width = getColumnWidth(column);
    const style: React.CSSProperties = {};

    if (width) {
      style.width = typeof width === 'number' ? `${width}px` : width;
    }
    if (column.minWidth) {
      style.minWidth = column.minWidth;
    }
    if (column.maxWidth) {
      style.maxWidth = column.maxWidth;
    }
    if (column.sticky) {
      style.position = 'sticky';
      style[column.sticky] = 0;
      style.zIndex = 2;
    }

    return style;
  };

  const getHeaderClasses = (column: DataGridColumn<T>): string => {
    const classes = [styles.th];

    if (column.sortable && onSort) {
      classes.push(styles.thSortable);
    }
    if (getSortDirection?.(column.id)) {
      classes.push(styles.thSorted);
    }
    if (column.align === 'center') {
      classes.push(styles.alignCenter);
    } else if (column.align === 'right') {
      classes.push(styles.alignRight);
    }
    if (column.sticky) {
      classes.push(styles.thSticky);
    }

    return classes.join(' ');
  };

  return (
    <thead className={stickyHeader ? styles.theadSticky : styles.thead}>
      <tr className={styles.headerRow}>
        {/* Selection checkbox column */}
        {selectable && onSelectAll && (
          <th className={`${styles.th} ${styles.thCheckbox}`}>
            <Checkbox
              checked={isAllSelected ?? false}
              onChange={() => onSelectAll()}
              ariaLabel="Seleccionar todas las filas"
            />
          </th>
        )}

        {/* Expand column */}
        {expandable && (
          <th className={`${styles.th} ${styles.thExpand}`} />
        )}

        {/* Data columns */}
        {visibleColumns.map((column) => (
          <th
            key={column.id}
            className={getHeaderClasses(column)}
            style={getColumnStyle(column)}
            onClick={column.sortable && onSort ? () => onSort(column.id) : undefined}
            role={column.sortable ? 'button' : undefined}
            tabIndex={column.sortable ? 0 : undefined}
            onKeyDown={
              column.sortable && onSort
                ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSort(column.id);
                    }
                  }
                : undefined
            }
            aria-sort={
              getSortDirection?.(column.id)
                ? getSortDirection(column.id) === 'asc'
                  ? 'ascending'
                  : 'descending'
                : undefined
            }
          >
            <div className={styles.thContent}>
              <span className={styles.thLabel}>
                {column.header}
              </span>

              {column.sortable && onSort && (
                <span className={styles.sortIcon}>
                  {getSortIcon(column.id)}
                </span>
              )}
            </div>

            {/* Resize handle */}
            {resizable && column.resizable !== false && resizeHandleProps && (
              <div
                className={styles.resizeHandle}
                {...resizeHandleProps(
                  column.id,
                  columnWidths?.[column.id] ||
                    (typeof column.width === 'number' ? column.width : 150)
                )}
                role="separator"
                aria-orientation="vertical"
                aria-label={`Redimensionar columna ${typeof column.header === 'string' ? column.header : column.id}`}
              >
                <GripVertical size={12} />
              </div>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
}
