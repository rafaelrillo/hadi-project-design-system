// Path: src/components/organisms/DataGrid/components/DataGridPagination.tsx
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import styles from '../DataGrid.module.css';

/* ═══════════════════════════════════════════════════════════════════════════════
   DataGridPagination Component
   Renders pagination controls for DataGrid
   ═══════════════════════════════════════════════════════════════════════════════ */

interface DataGridPaginationProps {
  currentPage: number;
  totalPages?: number;
  pageSize: number;
  pageSizeOptions: number[];
  totalRows: number;
  startIndex: number;
  endIndex: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
  pageNumbers: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onFirstPage: () => void;
  onLastPage: () => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

export function DataGridPagination({
  currentPage,
  pageSize,
  pageSizeOptions,
  totalRows,
  startIndex,
  endIndex,
  canGoNext,
  canGoPrevious,
  pageNumbers,
  onPageChange,
  onPageSizeChange,
  onFirstPage,
  onLastPage,
  onNextPage,
  onPreviousPage,
}: DataGridPaginationProps) {
  return (
    <div className={styles.pagination}>
      {/* Rows info */}
      <div className={styles.paginationInfo}>
        <span className={styles.paginationText}>
          {startIndex + 1}-{endIndex} de {totalRows} registros
        </span>
      </div>

      {/* Page size selector */}
      <div className={styles.paginationPageSize}>
        <label htmlFor="pageSize" className={styles.paginationLabel}>
          Mostrar:
        </label>
        <select
          id="pageSize"
          className={styles.paginationSelect}
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Navigation */}
      <nav className={styles.paginationNav} aria-label="Paginación">
        {/* First page */}
        <button
          type="button"
          className={styles.paginationButton}
          onClick={onFirstPage}
          disabled={!canGoPrevious}
          aria-label="Primera página"
          title="Primera página"
        >
          <ChevronsLeft size={16} />
        </button>

        {/* Previous page */}
        <button
          type="button"
          className={styles.paginationButton}
          onClick={onPreviousPage}
          disabled={!canGoPrevious}
          aria-label="Página anterior"
          title="Página anterior"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page numbers */}
        <div className={styles.paginationPages}>
          {pageNumbers.map((pageNum, index) =>
            pageNum === -1 ? (
              <span key={`ellipsis-${index}`} className={styles.paginationEllipsis}>
                ...
              </span>
            ) : (
              <button
                key={pageNum}
                type="button"
                className={`${styles.paginationPageButton} ${
                  pageNum === currentPage ? styles.paginationPageButtonActive : ''
                }`}
                onClick={() => onPageChange(pageNum)}
                aria-label={`Ir a página ${pageNum}`}
                aria-current={pageNum === currentPage ? 'page' : undefined}
              >
                {pageNum}
              </button>
            )
          )}
        </div>

        {/* Next page */}
        <button
          type="button"
          className={styles.paginationButton}
          onClick={onNextPage}
          disabled={!canGoNext}
          aria-label="Página siguiente"
          title="Página siguiente"
        >
          <ChevronRight size={16} />
        </button>

        {/* Last page */}
        <button
          type="button"
          className={styles.paginationButton}
          onClick={onLastPage}
          disabled={!canGoNext}
          aria-label="Última página"
          title="Última página"
        >
          <ChevronsRight size={16} />
        </button>
      </nav>
    </div>
  );
}
