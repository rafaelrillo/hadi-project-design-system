// Path: src/components/organisms/DataGrid/hooks/useDataGridVirtualization.ts
import { useState, useRef, useCallback, useEffect, useMemo } from 'react';

/* ═══════════════════════════════════════════════════════════════════════════════
   useDataGridVirtualization Hook
   Handles virtualization for large datasets in DataGrid
   ═══════════════════════════════════════════════════════════════════════════════ */

interface UseDataGridVirtualizationOptions {
  enabled?: boolean;
  rowHeight?: number;
  overscan?: number;
  containerHeight?: number;
}

interface UseDataGridVirtualizationResult<T> {
  virtualizedData: T[];
  containerRef: React.RefObject<HTMLDivElement | null>;
  totalHeight: number;
  offsetTop: number;
  startIndex: number;
  endIndex: number;
  onScroll: (event: React.UIEvent<HTMLDivElement>) => void;
  scrollToIndex: (index: number, behavior?: ScrollBehavior) => void;
  scrollToTop: () => void;
  scrollToBottom: () => void;
  isVirtualized: boolean;
}

const DEFAULT_ROW_HEIGHT = 44;
const DEFAULT_OVERSCAN = 5;

export function useDataGridVirtualization<T>(
  data: T[],
  options: UseDataGridVirtualizationOptions
): UseDataGridVirtualizationResult<T> {
  const {
    enabled = false,
    rowHeight = DEFAULT_ROW_HEIGHT,
    overscan = DEFAULT_OVERSCAN,
    containerHeight: externalContainerHeight,
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(
    externalContainerHeight || 0
  );

  // Update container height on resize
  useEffect(() => {
    if (!enabled || externalContainerHeight) return;

    const container = containerRef.current;
    if (!container) return;

    const updateHeight = () => {
      setContainerHeight(container.clientHeight);
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [enabled, externalContainerHeight]);

  // Calculate total height
  const totalHeight = useMemo(() => {
    if (!enabled) return 0;
    return data.length * rowHeight;
  }, [enabled, data.length, rowHeight]);

  // Calculate visible range
  const { startIndex, endIndex, offsetTop, virtualizedData } = useMemo(() => {
    if (!enabled) {
      return {
        startIndex: 0,
        endIndex: data.length,
        offsetTop: 0,
        virtualizedData: data,
      };
    }

    const height = externalContainerHeight || containerHeight;

    // Calculate visible range
    const visibleStart = Math.floor(scrollTop / rowHeight);
    const visibleEnd = Math.ceil((scrollTop + height) / rowHeight);

    // Add overscan
    const start = Math.max(0, visibleStart - overscan);
    const end = Math.min(data.length, visibleEnd + overscan);

    // Calculate offset
    const offset = start * rowHeight;

    // Slice data
    const sliced = data.slice(start, end);

    return {
      startIndex: start,
      endIndex: end,
      offsetTop: offset,
      virtualizedData: sliced,
    };
  }, [
    enabled,
    data,
    scrollTop,
    rowHeight,
    containerHeight,
    externalContainerHeight,
    overscan,
  ]);

  // Handle scroll
  const onScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      if (!enabled) return;
      const target = event.currentTarget;
      setScrollTop(target.scrollTop);
    },
    [enabled]
  );

  // Scroll to specific index
  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = 'smooth') => {
      const container = containerRef.current;
      if (!container || !enabled) return;

      const targetTop = index * rowHeight;
      container.scrollTo({
        top: targetTop,
        behavior,
      });
    },
    [enabled, rowHeight]
  );

  // Scroll to top
  const scrollToTop = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  // Scroll to bottom
  const scrollToBottom = useCallback(() => {
    const container = containerRef.current;
    if (!container || !enabled) return;

    container.scrollTo({
      top: totalHeight,
      behavior: 'smooth',
    });
  }, [enabled, totalHeight]);

  return {
    virtualizedData,
    containerRef,
    totalHeight,
    offsetTop,
    startIndex,
    endIndex,
    onScroll,
    scrollToIndex,
    scrollToTop,
    scrollToBottom,
    isVirtualized: enabled,
  };
}
