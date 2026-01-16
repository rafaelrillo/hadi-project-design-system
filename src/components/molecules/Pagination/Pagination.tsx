// Path: src/components/molecules/Pagination/Pagination.tsx
import { type CSSProperties } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLightEngineOptional } from '@contexts/LightEngineContext';
import styles from './Pagination.module.css';

export type PaginationStyle = 'default' | 'neuInset';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
  showFirstLast?: boolean;
  disabled?: boolean;
  /** Visual style variant */
  paginationStyle?: PaginationStyle;
  /** Enable dynamic shadows from Light Engine */
  dynamicShadows?: boolean;
}

// Glass hue for active page
const GLASS_PAGE = {
  hue: 175,
  sat: 35,
};

const getClassName = (...classes: (string | undefined | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  showFirstLast = false,
  disabled = false,
  paginationStyle = 'default',
  dynamicShadows = true,
}: PaginationProps) {
  // Get light engine context (optional)
  const lightEngine = useLightEngineOptional();

  // Get container className
  const getContainerClassName = (): string => {
    const classes = [styles.container];
    if (paginationStyle === 'neuInset') {
      classes.push(styles.neuInset);
      if (dynamicShadows && lightEngine) classes.push(styles.dynamicShadows);
    }
    return classes.join(' ');
  };

  // Get container dynamic styles
  const getContainerDynamicStyles = (): CSSProperties | undefined => {
    if (paginationStyle !== 'neuInset' || !dynamicShadows || !lightEngine) return undefined;

    const { shadows } = lightEngine;
    return {
      boxShadow: shadows.getNeuInsetShadow(3, 8),
    };
  };

  // Get active page dynamic styles
  const getActivePageDynamicStyles = (): CSSProperties | undefined => {
    if (paginationStyle !== 'neuInset' || !dynamicShadows || !lightEngine) return undefined;

    const { shadows } = lightEngine;
    return {
      boxShadow: `${shadows.getNeuPanelShadow(2, 4)}, inset 0 1px 0 rgba(255, 255, 255, 0.7)`,
      background: shadows.getGlassBackground(GLASS_PAGE.hue, GLASS_PAGE.sat),
    };
  };
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
    <div className={getContainerClassName()} style={getContainerDynamicStyles()}>
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
            style={isActive ? getActivePageDynamicStyles() : undefined}
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
