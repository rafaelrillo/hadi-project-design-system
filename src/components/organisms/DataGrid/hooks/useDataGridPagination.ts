// Path: src/components/organisms/DataGrid/hooks/useDataGridPagination.ts
import { useState, useMemo, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════════════════════════
   useDataGridPagination Hook
   Handles pagination logic for DataGrid
   ═══════════════════════════════════════════════════════════════════════════════ */

interface UseDataGridPaginationOptions {
  pageSize?: number;
  pageSizeOptions?: number[];
  totalRows?: number;
  controlledPage?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

interface UseDataGridPaginationResult<T> {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalRows: number;
  pageSizeOptions: number[];
  paginatedData: T[];
  startIndex: number;
  endIndex: number;
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  setPageSize: (size: number) => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  pageNumbers: number[];
}

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export function useDataGridPagination<T>(
  data: T[],
  options: UseDataGridPaginationOptions
): UseDataGridPaginationResult<T> {
  const {
    pageSize: defaultPageSize = DEFAULT_PAGE_SIZE,
    pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
    totalRows: externalTotalRows,
    controlledPage,
    onPageChange,
    onPageSizeChange,
  } = options;

  // Internal state
  const [internalPage, setInternalPage] = useState(1);
  const [internalPageSize, setInternalPageSize] = useState(defaultPageSize);

  // Use controlled or uncontrolled page
  const isPageControlled = controlledPage !== undefined;
  const currentPage = isPageControlled ? controlledPage : internalPage;
  const pageSize = internalPageSize;

  // Calculate total rows (either from data or external source for server-side)
  const totalRows = externalTotalRows ?? data.length;

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalRows / pageSize));
  }, [totalRows, pageSize]);

  // Calculate start and end indices
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalRows);

  // Get paginated data (only for client-side pagination)
  const paginatedData = useMemo(() => {
    if (externalTotalRows !== undefined) {
      // Server-side pagination - return data as-is
      return data;
    }
    // Client-side pagination
    return data.slice(startIndex, endIndex);
  }, [data, startIndex, endIndex, externalTotalRows]);

  // Update page
  const updatePage = useCallback(
    (page: number) => {
      const validPage = Math.max(1, Math.min(page, totalPages));

      if (isPageControlled) {
        onPageChange?.(validPage);
      } else {
        setInternalPage(validPage);
        onPageChange?.(validPage);
      }
    },
    [isPageControlled, totalPages, onPageChange]
  );

  // Go to specific page
  const goToPage = useCallback(
    (page: number) => {
      updatePage(page);
    },
    [updatePage]
  );

  // Navigation functions
  const goToNextPage = useCallback(() => {
    updatePage(currentPage + 1);
  }, [currentPage, updatePage]);

  const goToPreviousPage = useCallback(() => {
    updatePage(currentPage - 1);
  }, [currentPage, updatePage]);

  const goToFirstPage = useCallback(() => {
    updatePage(1);
  }, [updatePage]);

  const goToLastPage = useCallback(() => {
    updatePage(totalPages);
  }, [totalPages, updatePage]);

  // Change page size
  const setPageSize = useCallback(
    (size: number) => {
      setInternalPageSize(size);
      // Reset to first page when changing page size
      if (isPageControlled) {
        onPageChange?.(1);
      } else {
        setInternalPage(1);
        onPageChange?.(1);
      }
      onPageSizeChange?.(size);
    },
    [isPageControlled, onPageChange, onPageSizeChange]
  );

  // Check navigation availability
  const canGoNext = currentPage < totalPages;
  const canGoPrevious = currentPage > 1;

  // Generate page numbers for display (with ellipsis logic)
  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    const maxVisible = 7; // Maximum visible page numbers

    if (totalPages <= maxVisible) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first, last, and pages around current
      const leftBound = Math.max(2, currentPage - 1);
      const rightBound = Math.min(totalPages - 1, currentPage + 1);

      pages.push(1);

      if (leftBound > 2) {
        pages.push(-1); // Ellipsis indicator
      }

      for (let i = leftBound; i <= rightBound; i++) {
        pages.push(i);
      }

      if (rightBound < totalPages - 1) {
        pages.push(-1); // Ellipsis indicator
      }

      pages.push(totalPages);
    }

    return pages;
  }, [totalPages, currentPage]);

  return {
    currentPage,
    pageSize,
    totalPages,
    totalRows,
    pageSizeOptions,
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
  };
}
