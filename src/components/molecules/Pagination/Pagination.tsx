// Path: src/components/molecules/Pagination/Pagination.tsx
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Pagination.module.css';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
  showFirstLast?: boolean;
  disabled?: boolean;
}

const getClassName = (...classes: (string | undefined | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  showFirstLast = false,
  disabled = false
}: PaginationProps) {
  const getPageNumbers = (): (number | string)[] => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);

    // Adjust if we're near the start or end
    if (currentPage <= halfVisible) {
      endPage = Math.min(totalPages, maxVisiblePages);
    } else if (currentPage >= totalPages - halfVisible) {
      startPage = Math.max(1, totalPages - maxVisiblePages + 1);
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis and last page if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageClick = (page: number) => {
    if (disabled || page === currentPage || page < 1 || page > totalPages) {
      return;
    }
    onPageChange(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageClick(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageClick(currentPage + 1);
    }
  };

  const pageNumbers = getPageNumbers();
  const isPrevDisabled = disabled || currentPage === 1;
  const isNextDisabled = disabled || currentPage === totalPages;

  return (
    <div className={styles.container}>
      {/* First button */}
      {showFirstLast && totalPages > maxVisiblePages && (
        <button
          onClick={() => handlePageClick(1)}
          disabled={isPrevDisabled}
          className={styles.button}
          aria-label="Primera página"
          type="button"
        >
          Primera
        </button>
      )}

      {/* Previous button */}
      <button
        onClick={handlePrevious}
        disabled={isPrevDisabled}
        className={styles.arrowButton}
        aria-label="Página anterior"
        type="button"
      >
        <ChevronLeft size={14} />
      </button>

      {/* Page numbers */}
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className={styles.ellipsis}>
              ...
            </span>
          );
        }

        const pageNum = page as number;
        const isActive = pageNum === currentPage;

        return (
          <button
            key={pageNum}
            onClick={() => handlePageClick(pageNum)}
            disabled={disabled}
            className={getClassName(
              styles.pageNumber,
              isActive && styles.pageNumberActive
            )}
            aria-label={`Página ${pageNum}`}
            aria-current={isActive ? 'page' : undefined}
            type="button"
          >
            {pageNum}
          </button>
        );
      })}

      {/* Next button */}
      <button
        onClick={handleNext}
        disabled={isNextDisabled}
        className={styles.arrowButton}
        aria-label="Página siguiente"
        type="button"
      >
        <ChevronRight size={14} />
      </button>

      {/* Last button */}
      {showFirstLast && totalPages > maxVisiblePages && (
        <button
          onClick={() => handlePageClick(totalPages)}
          disabled={isNextDisabled}
          className={styles.button}
          aria-label="Última página"
          type="button"
        >
          Última
        </button>
      )}
    </div>
  );
}
