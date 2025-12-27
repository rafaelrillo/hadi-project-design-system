// Path: src/components/organisms/DataGrid/components/DataGridFooter.tsx
import React from 'react';
import type { DataGridColumn } from '../types';
import styles from '../DataGrid.module.css';

/* ═══════════════════════════════════════════════════════════════════════════════
   DataGridFooter Component
   Renders footer row with aggregations (sum, avg, count, etc.)
   ═══════════════════════════════════════════════════════════════════════════════ */

interface DataGridFooterProps<T> {
  columns: DataGridColumn<T>[];
  data: T[];
  selectable?: boolean;
  expandable?: boolean;
  columnWidths?: Record<string, number>;
}

export function DataGridFooter<T>({
  columns,
  data,
  selectable,
  expandable,
  columnWidths,
}: DataGridFooterProps<T>) {
  const visibleColumns = columns.filter((col) => !col.hidden);
  const hasFooter = visibleColumns.some((col) => col.footer);

  if (!hasFooter) return null;

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
    const classes = [styles.tf];

    if (column.align === 'center') {
      classes.push(styles.alignCenter);
    } else if (column.align === 'right') {
      classes.push(styles.alignRight);
    }
    if (column.sticky) {
      classes.push(styles.tfSticky);
    }

    return classes.join(' ');
  };

  return (
    <tfoot className={styles.tfoot}>
      <tr className={styles.footerRow}>
        {/* Empty cell for checkbox column */}
        {selectable && <td className={`${styles.tf} ${styles.tfEmpty}`} />}

        {/* Empty cell for expand column */}
        {expandable && <td className={`${styles.tf} ${styles.tfEmpty}`} />}

        {/* Footer cells */}
        {visibleColumns.map((column) => (
          <td
            key={column.id}
            className={getCellClasses(column)}
            style={getCellStyle(column)}
          >
            {column.footer ? column.footer(data) : null}
          </td>
        ))}
      </tr>
    </tfoot>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   AGGREGATION HELPERS
   Helper functions for common footer aggregations
   ═══════════════════════════════════════════════════════════════════════════════ */

export function sum<T>(
  data: T[],
  accessor: keyof T | ((row: T) => number)
): number {
  return data.reduce((acc, row) => {
    const value =
      typeof accessor === 'function'
        ? accessor(row)
        : Number(row[accessor]) || 0;
    return acc + value;
  }, 0);
}

export function avg<T>(
  data: T[],
  accessor: keyof T | ((row: T) => number)
): number {
  if (data.length === 0) return 0;
  return sum(data, accessor) / data.length;
}

export function min<T>(
  data: T[],
  accessor: keyof T | ((row: T) => number)
): number {
  if (data.length === 0) return 0;
  return Math.min(
    ...data.map((row) =>
      typeof accessor === 'function'
        ? accessor(row)
        : Number(row[accessor]) || 0
    )
  );
}

export function max<T>(
  data: T[],
  accessor: keyof T | ((row: T) => number)
): number {
  if (data.length === 0) return 0;
  return Math.max(
    ...data.map((row) =>
      typeof accessor === 'function'
        ? accessor(row)
        : Number(row[accessor]) || 0
    )
  );
}

export function count<T>(data: T[]): number {
  return data.length;
}

export function countUnique<T>(
  data: T[],
  accessor: keyof T | ((row: T) => unknown)
): number {
  const values = data.map((row) =>
    typeof accessor === 'function' ? accessor(row) : row[accessor]
  );
  return new Set(values).size;
}
