// Path: src/components/organisms/PaginatedTable/PaginatedTable.tsx
import { useMemo } from 'react';
import { Table, TableColumn, TableRow } from '../Table';
import { Pagination } from '../../molecules/Pagination';
import styles from './PaginatedTable.module.css';

export interface PaginatedTableProps {
  columns: TableColumn[];
  data: TableRow[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  rowHeight?: 'standard' | 'compact';
  selectable?: boolean;
  selectedRows?: string[];
  onRowSelect?: (rowIds: string[]) => void;
  expandable?: boolean;
  onRowClick?: (row: TableRow) => void;
  showInfo?: boolean;
  className?: string;
}

const getClassName = (...classes: (string | undefined | false)[]) =>
  classes.filter(Boolean).join(' ');

export function PaginatedTable({
  columns,
  data,
  currentPage,
  itemsPerPage,
  onPageChange,
  rowHeight = 'standard',
  selectable = false,
  selectedRows = [],
  onRowSelect,
  expandable = false,
  onRowClick,
  showInfo = true,
  className
}: PaginatedTableProps) {
  // Calculate pagination
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedData = useMemo(() => {
    return data.slice(startIndex, endIndex);
  }, [data, startIndex, endIndex]);

  return (
    <div className={getClassName(styles.container, className)}>
      {/* Table */}
      <Table
        columns={columns}
        data={paginatedData}
        rowHeight={rowHeight}
        selectable={selectable}
        selectedRows={selectedRows}
        onRowSelect={onRowSelect}
        expandable={expandable}
        onRowClick={onRowClick}
      />

      {/* Footer: Info + Pagination */}
      {totalPages > 1 && (
        <div className={styles.footer}>
          {showInfo && (
            <div className={styles.info}>
              Mostrando {startIndex + 1}-{endIndex} de {totalItems} resultados
            </div>
          )}
          <div className={styles.paginationWrapper}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}
