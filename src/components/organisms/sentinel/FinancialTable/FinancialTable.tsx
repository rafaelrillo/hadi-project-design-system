// Path: src/components/organisms/sentinel/FinancialTable/FinancialTable.tsx

import { useState, useMemo, type ReactNode } from 'react';
import { ChevronUp, ChevronDown, ArrowUpDown } from 'lucide-react';
import styles from './FinancialTable.module.css';

export type ColumnFormat = 'text' | 'number' | 'currency' | 'percent' | 'change';
export type SortDirection = 'asc' | 'desc' | null;

export interface FinancialColumn<T> {
  key: keyof T;
  header: string;
  align?: 'left' | 'center' | 'right';
  width?: string;
  format?: ColumnFormat;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => ReactNode;
}

export interface FinancialTableProps<T> {
  data: T[];
  columns: FinancialColumn<T>[];
  rowHeight?: 'compact' | 'default' | 'comfortable';
  striped?: boolean;
  highlightOnHover?: boolean;
  stickyHeader?: boolean;
  onRowClick?: (row: T) => void;
  keyExtractor?: (row: T) => string | number;
  className?: string;
  emptyMessage?: string;
}

function formatCellValue<T>(
  value: T[keyof T],
  format: ColumnFormat = 'text'
): string {
  if (value === null || value === undefined) return '—';

  const numValue = typeof value === 'number' ? value : parseFloat(String(value));

  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
      }).format(numValue);

    case 'percent':
      return `${numValue.toFixed(2)}%`;

    case 'change':
      const sign = numValue >= 0 ? '+' : '';
      return `${sign}${numValue.toFixed(2)}%`;

    case 'number':
      return numValue.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

    case 'text':
    default:
      return String(value);
  }
}

function getChangeClass(value: unknown): string {
  const numValue = typeof value === 'number' ? value : parseFloat(String(value));
  if (isNaN(numValue)) return '';
  if (numValue > 0) return styles.positive;
  if (numValue < 0) return styles.negative;
  return styles.neutral;
}

export function FinancialTable<T extends Record<string, unknown>>({
  data,
  columns,
  rowHeight = 'default',
  striped = true,
  highlightOnHover = true,
  stickyHeader = true,
  onRowClick,
  keyExtractor,
  className = '',
  emptyMessage = 'No data available',
}: FinancialTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (column: FinancialColumn<T>) => {
    if (!column.sortable) return;

    if (sortColumn === column.key) {
      // Toggle direction
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortColumn(null);
        setSortDirection(null);
      } else {
        setSortDirection('asc');
      }
    } else {
      setSortColumn(column.key);
      setSortDirection('asc');
    }
  };

  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];

      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      let comparison = 0;
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal - bVal;
      } else {
        comparison = String(aVal).localeCompare(String(bVal));
      }

      return sortDirection === 'desc' ? -comparison : comparison;
    });
  }, [data, sortColumn, sortDirection]);

  const containerClasses = [
    styles.tableContainer,
    stickyHeader ? styles.stickyHeader : '',
    className,
  ].filter(Boolean).join(' ');

  const tableClasses = [
    styles.table,
    styles[rowHeight],
    striped ? styles.striped : '',
    highlightOnHover ? styles.hoverable : '',
  ].filter(Boolean).join(' ');

  const getRowKey = (row: T, index: number): string | number => {
    if (keyExtractor) return keyExtractor(row);
    return index;
  };

  if (data.length === 0) {
    return (
      <div className={styles.empty}>
        <span>{emptyMessage}</span>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <table className={tableClasses}>
        <thead>
          <tr>
            {columns.map((column) => {
              const isSorted = sortColumn === column.key;
              const headerClasses = [
                styles.th,
                styles[`align-${column.align || 'left'}`],
                column.sortable ? styles.sortable : '',
                isSorted ? styles.sorted : '',
              ].filter(Boolean).join(' ');

              return (
                <th
                  key={String(column.key)}
                  className={headerClasses}
                  style={{ width: column.width }}
                  onClick={() => handleSort(column)}
                >
                  <span className={styles.headerContent}>
                    {column.header}
                    {column.sortable && (
                      <span className={styles.sortIcon}>
                        {!isSorted && <ArrowUpDown size={12} />}
                        {isSorted && sortDirection === 'asc' && <ChevronUp size={12} />}
                        {isSorted && sortDirection === 'desc' && <ChevronDown size={12} />}
                      </span>
                    )}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr
              key={getRowKey(row, rowIndex)}
              className={onRowClick ? styles.clickable : ''}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => {
                const value = row[column.key];
                const cellClasses = [
                  styles.td,
                  styles[`align-${column.align || 'left'}`],
                  column.format === 'change' ? getChangeClass(value) : '',
                ].filter(Boolean).join(' ');

                return (
                  <td key={String(column.key)} className={cellClasses}>
                    {column.render
                      ? column.render(value, row)
                      : formatCellValue(value, column.format)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FinancialTable;
