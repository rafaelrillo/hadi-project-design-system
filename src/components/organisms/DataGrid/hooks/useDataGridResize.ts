// Path: src/components/organisms/DataGrid/hooks/useDataGridResize.ts
import { useState, useCallback, useRef, useEffect } from 'react';

/* ═══════════════════════════════════════════════════════════════════════════════
   useDataGridResize Hook
   Handles column resizing for DataGrid
   ═══════════════════════════════════════════════════════════════════════════════ */

interface ColumnWidths {
  [columnId: string]: number;
}

interface ResizeState {
  columnId: string;
  startX: number;
  startWidth: number;
}

interface UseDataGridResizeOptions {
  onColumnResize?: (columnId: string, width: number) => void;
  minWidth?: number;
  maxWidth?: number;
}

interface UseDataGridResizeResult {
  columnWidths: ColumnWidths;
  isResizing: boolean;
  resizingColumn: string | null;
  startResize: (columnId: string, startX: number, currentWidth: number) => void;
  setColumnWidth: (columnId: string, width: number) => void;
  resetColumnWidths: () => void;
  getColumnWidth: (columnId: string, defaultWidth?: number) => number | undefined;
  resizeHandleProps: (columnId: string, currentWidth: number) => {
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart: (e: React.TouchEvent) => void;
  };
}

const DEFAULT_MIN_WIDTH = 50;
const DEFAULT_MAX_WIDTH = 800;

export function useDataGridResize(
  options: UseDataGridResizeOptions = {}
): UseDataGridResizeResult {
  const {
    onColumnResize,
    minWidth = DEFAULT_MIN_WIDTH,
    maxWidth = DEFAULT_MAX_WIDTH,
  } = options;

  const [columnWidths, setColumnWidths] = useState<ColumnWidths>({});
  const [isResizing, setIsResizing] = useState(false);
  const resizeStateRef = useRef<ResizeState | null>(null);

  // Handle mouse/touch move during resize
  const handleMove = useCallback(
    (clientX: number) => {
      if (!resizeStateRef.current) return;

      const { columnId, startX, startWidth } = resizeStateRef.current;
      const diff = clientX - startX;
      const newWidth = Math.min(maxWidth, Math.max(minWidth, startWidth + diff));

      setColumnWidths((prev) => ({
        ...prev,
        [columnId]: newWidth,
      }));
    },
    [minWidth, maxWidth]
  );

  // Handle mouse/touch end
  const handleEnd = useCallback(() => {
    if (resizeStateRef.current) {
      const { columnId } = resizeStateRef.current;
      const finalWidth = columnWidths[columnId];
      if (finalWidth !== undefined) {
        onColumnResize?.(columnId, finalWidth);
      }
    }

    resizeStateRef.current = null;
    setIsResizing(false);
  }, [columnWidths, onColumnResize]);

  // Add/remove event listeners
  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      handleMove(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handleMove(e.touches[0].clientX);
      }
    };

    const handleMouseUp = () => handleEnd();
    const handleTouchEnd = () => handleEnd();

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    // Add cursor style to body
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, handleMove, handleEnd]);

  // Start resize operation
  const startResize = useCallback(
    (columnId: string, startX: number, currentWidth: number) => {
      resizeStateRef.current = {
        columnId,
        startX,
        startWidth: currentWidth,
      };
      setIsResizing(true);
    },
    []
  );

  // Set a column width directly
  const setColumnWidth = useCallback(
    (columnId: string, width: number) => {
      const clampedWidth = Math.min(maxWidth, Math.max(minWidth, width));
      setColumnWidths((prev) => ({
        ...prev,
        [columnId]: clampedWidth,
      }));
      onColumnResize?.(columnId, clampedWidth);
    },
    [minWidth, maxWidth, onColumnResize]
  );

  // Reset all column widths
  const resetColumnWidths = useCallback(() => {
    setColumnWidths({});
  }, []);

  // Get column width
  const getColumnWidth = useCallback(
    (columnId: string, defaultWidth?: number): number | undefined => {
      return columnWidths[columnId] ?? defaultWidth;
    },
    [columnWidths]
  );

  // Get resize handle props
  const resizeHandleProps = useCallback(
    (columnId: string, currentWidth: number) => ({
      onMouseDown: (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        startResize(columnId, e.clientX, currentWidth);
      },
      onTouchStart: (e: React.TouchEvent) => {
        e.stopPropagation();
        if (e.touches.length === 1) {
          startResize(columnId, e.touches[0].clientX, currentWidth);
        }
      },
    }),
    [startResize]
  );

  return {
    columnWidths,
    isResizing,
    resizingColumn: resizeStateRef.current?.columnId ?? null,
    startResize,
    setColumnWidth,
    resetColumnWidths,
    getColumnWidth,
    resizeHandleProps,
  };
}
