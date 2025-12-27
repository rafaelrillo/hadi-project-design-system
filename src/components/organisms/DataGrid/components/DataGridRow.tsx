// Path: src/components/organisms/DataGrid/components/DataGridRow.tsx
import React, { memo, useCallback } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Checkbox } from '../../../atoms/Checkbox';
import type { DataGridColumn } from '../types';
import styles from '../DataGrid.module.css';

/* ═══════════════════════════════════════════════════════════════════════════════
   DataGridRow Component
   Renders a single row with cells, selection, and expansion controls
   ═══════════════════════════════════════════════════════════════════════════════ */

interface DataGridRowProps<T> {
  row: T;
  rowIndex: number;
  rowId: string;
  columns: DataGridColumn<T>[];
  selectable?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  expandable?: boolean;
  isExpanded?: boolean;
  onExpand?: () => void;
  renderExpandedRow?: (row: T) => React.ReactNode;
  onClick?: () => void;
  onDoubleClick?: () => void;
  onCellClick?: (value: unknown, column: DataGridColumn<T>) => void;
  columnWidths?: Record<string, number>;
  compact?: boolean;
  striped?: boolean;
  hoverable?: boolean;
}

function DataGridRowInner<T>({
  row,
  rowIndex,
  rowId,
  columns,
  selectable,
  isSelected,
  onSelect,
  expandable,
  isExpanded,
  onExpand,
  renderExpandedRow,
  onClick,
  onDoubleClick,
  onCellClick,
  columnWidths,
  compact,
  striped,
  hoverable = true,
}: DataGridRowProps<T>) {
  const visibleColumns = columns.filter((col) => !col.hidden);
  const totalColumns =
    visibleColumns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0);

  const getValue = useCallback(
    (column: DataGridColumn<T>): unknown => {
      if (typeof column.accessor === 'function') {
        return column.accessor(row);
      }
      return row[column.accessor as keyof T];
    },
    [row]
  );

  const getColumnWidth = (column: DataGridColumn<T>): string | number | undefined => {
    if (columnWidths?.[column.id]) {
      return columnWidths[column.id];
    }
    return column.width;
  };

  const getCellStyle = (column: DataGridColumn<T>): React.CSSProperties => {
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
      style.zIndex = 1;
    }

    return style;
  };

  const getCellClasses = (column: DataGridColumn<T>): string => {
    const classes = [styles.td];

    if (column.align === 'center') {
      classes.push(styles.alignCenter);
    } else if (column.align === 'right') {
      classes.push(styles.alignRight);
    }
    if (column.sticky) {
      classes.push(styles.tdSticky);
    }
    if (column.ellipsis) {
      classes.push(styles.tdEllipsis);
    }

    return classes.join(' ');
  };

  const getRowClasses = (): string => {
    const classes = [styles.tr];

    if (isSelected) {
      classes.push(styles.trSelected);
    }
    if (hoverable) {
      classes.push(styles.trHoverable);
    }
    if (onClick || onDoubleClick) {
      classes.push(styles.trClickable);
    }
    if (striped && rowIndex % 2 === 1) {
      classes.push(styles.trStriped);
    }
    if (compact) {
      classes.push(styles.trCompact);
    }

    return classes.join(' ');
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick?.();
      }
    },
    [onClick]
  );

  const handleSelectClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
    },
    []
  );

  const handleExpandClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onExpand?.();
    },
    [onExpand]
  );

  return (
    <>
      <tr
        className={getRowClasses()}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onKeyDown={onClick ? handleKeyDown : undefined}
        tabIndex={onClick ? 0 : undefined}
        role={onClick ? 'button' : 'row'}
        aria-selected={isSelected}
        data-row-id={rowId}
      >
        {/* Selection checkbox */}
        {selectable && onSelect && (
          <td
            className={`${styles.td} ${styles.tdCheckbox}`}
            onClick={handleSelectClick}
          >
            <Checkbox
              checked={isSelected ?? false}
              onChange={() => onSelect()}
              ariaLabel={`Seleccionar fila ${rowIndex + 1}`}
            />
          </td>
        )}

        {/* Expand button */}
        {expandable && (
          <td className={`${styles.td} ${styles.tdExpand}`}>
            <button
              type="button"
              className={styles.expandButton}
              onClick={handleExpandClick}
              aria-expanded={isExpanded}
              aria-label={isExpanded ? 'Contraer fila' : 'Expandir fila'}
            >
              {isExpanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>
          </td>
        )}

        {/* Data cells */}
        {visibleColumns.map((column) => {
          const value = getValue(column);
          const renderedValue = column.cell
            ? column.cell(value, row, rowIndex)
            : String(value ?? '');

          return (
            <td
              key={column.id}
              className={getCellClasses(column)}
              style={getCellStyle(column)}
              onClick={
                onCellClick
                  ? () => onCellClick(value, column)
                  : undefined
              }
            >
              {renderedValue}
            </td>
          );
        })}
      </tr>

      {/* Expanded content */}
      {expandable && isExpanded && renderExpandedRow && (
        <tr className={styles.expandedRow}>
          <td colSpan={totalColumns} className={styles.expandedCell}>
            {renderExpandedRow(row)}
          </td>
        </tr>
      )}
    </>
  );
}

// Memoize the component for performance
export const DataGridRow = memo(DataGridRowInner) as typeof DataGridRowInner;
