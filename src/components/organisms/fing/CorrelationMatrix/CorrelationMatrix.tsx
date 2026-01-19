// Path: src/components/organisms/fing/CorrelationMatrix/CorrelationMatrix.tsx
import { useState, useMemo } from 'react';
import { Info } from 'lucide-react';
import styles from './CorrelationMatrix.module.css';

/* ═══════════════════════════════════════════════════════════════════════════════
   CORRELATION MATRIX - Level 4 Depth Component
   Heatmap-style matrix showing correlations between assets or factors
   ═══════════════════════════════════════════════════════════════════════════════ */

export interface CorrelationPair {
  rowId: string;
  colId: string;
  value: number; // -1 to 1
}

export interface MatrixItem {
  id: string;
  label: string;
  shortLabel?: string;
  category?: string;
}

export interface CorrelationMatrixProps {
  items: MatrixItem[];
  correlations: CorrelationPair[];
  title?: string;
  subtitle?: string;
  showValues?: boolean;
  highlightThreshold?: number;
  onCellClick?: (rowId: string, colId: string, value: number) => void;
  selectedCell?: { rowId: string; colId: string } | null;
  colorScheme?: 'diverging' | 'sequential';
  size?: 'sm' | 'md' | 'lg';
}

export function CorrelationMatrix({
  items,
  correlations,
  title = 'Correlation Matrix',
  subtitle,
  showValues = true,
  highlightThreshold = 0.7,
  onCellClick,
  selectedCell,
  colorScheme = 'diverging',
  size = 'md',
}: CorrelationMatrixProps) {
  const [hoveredCell, setHoveredCell] = useState<{ row: string; col: string } | null>(null);

  // Create a map for quick correlation lookup
  const correlationMap = useMemo(() => {
    const map = new Map<string, number>();
    correlations.forEach((c) => {
      map.set(`${c.rowId}-${c.colId}`, c.value);
      // Also set the inverse for symmetric access
      map.set(`${c.colId}-${c.rowId}`, c.value);
    });
    // Diagonal is always 1
    items.forEach((item) => {
      map.set(`${item.id}-${item.id}`, 1);
    });
    return map;
  }, [correlations, items]);

  const getCorrelation = (rowId: string, colId: string): number | null => {
    return correlationMap.get(`${rowId}-${colId}`) ?? null;
  };

  // Get color based on correlation value
  const getCellColor = (value: number | null): string => {
    if (value === null) return 'transparent';

    if (colorScheme === 'sequential') {
      const absValue = Math.abs(value);
      const alpha = absValue * 0.8 + 0.1;
      return `rgba(91, 163, 165, ${alpha})`;
    }

    // Diverging color scheme
    if (value > 0) {
      const alpha = value * 0.7 + 0.1;
      return `rgba(74, 154, 124, ${alpha})`; // Positive - green
    } else if (value < 0) {
      const alpha = Math.abs(value) * 0.7 + 0.1;
      return `rgba(184, 92, 92, ${alpha})`; // Negative - red
    }
    return 'rgba(107, 114, 128, 0.2)'; // Neutral
  };

  const formatValue = (value: number | null): string => {
    if (value === null) return '—';
    return value.toFixed(2);
  };

  const isHighCorrelation = (value: number | null): boolean => {
    if (value === null) return false;
    return Math.abs(value) >= highlightThreshold && value !== 1;
  };

  const isSelected = (rowId: string, colId: string): boolean => {
    return selectedCell?.rowId === rowId && selectedCell?.colId === colId;
  };

  const isHovered = (rowId: string, colId: string): boolean => {
    return hoveredCell?.row === rowId && hoveredCell?.col === colId;
  };

  const isInHoveredRowOrCol = (rowId: string, colId: string): boolean => {
    if (!hoveredCell) return false;
    return hoveredCell.row === rowId || hoveredCell.col === colId;
  };

  const cellSizeClass = {
    sm: styles.cellSm,
    md: styles.cellMd,
    lg: styles.cellLg,
  }[size];

  return (
    <div className={styles.container} role="region" aria-label={title}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <span
              className={styles.legendColor}
              style={{ background: 'var(--fing-status-negative)' }}
            />
            <span>-1.0</span>
          </div>
          <div className={styles.legendGradient} />
          <div className={styles.legendItem}>
            <span
              className={styles.legendColor}
              style={{ background: 'var(--fing-status-positive)' }}
            />
            <span>+1.0</span>
          </div>
        </div>
      </header>

      {/* Matrix */}
      <div className={styles.matrixWrapper}>
        <div className={styles.matrix} role="grid">
          {/* Header Row */}
          <div className={styles.headerRow}>
            <div className={`${styles.cornerCell} ${cellSizeClass}`} />
            {items.map((item) => (
              <div
                key={`header-${item.id}`}
                className={`${styles.headerCell} ${cellSizeClass} ${
                  isInHoveredRowOrCol('', item.id) ? styles.highlighted : ''
                }`}
                title={item.label}
              >
                <span className={styles.headerLabel}>
                  {item.shortLabel || item.label.slice(0, 4)}
                </span>
              </div>
            ))}
          </div>

          {/* Data Rows */}
          {items.map((rowItem) => (
            <div key={`row-${rowItem.id}`} className={styles.dataRow}>
              <div
                className={`${styles.rowLabel} ${cellSizeClass} ${
                  isInHoveredRowOrCol(rowItem.id, '') ? styles.highlighted : ''
                }`}
                title={rowItem.label}
              >
                <span>{rowItem.shortLabel || rowItem.label.slice(0, 6)}</span>
              </div>

              {items.map((colItem) => {
                const value = getCorrelation(rowItem.id, colItem.id);
                const isDiagonal = rowItem.id === colItem.id;
                const highCorr = isHighCorrelation(value);
                const selected = isSelected(rowItem.id, colItem.id);
                const hovered = isHovered(rowItem.id, colItem.id);

                return (
                  <button
                    key={`cell-${rowItem.id}-${colItem.id}`}
                    type="button"
                    className={`
                      ${styles.cell}
                      ${cellSizeClass}
                      ${isDiagonal ? styles.diagonal : ''}
                      ${highCorr ? styles.highCorrelation : ''}
                      ${selected ? styles.selected : ''}
                      ${hovered ? styles.hovered : ''}
                    `}
                    style={{ backgroundColor: getCellColor(value) }}
                    onClick={() => {
                      if (!isDiagonal && value !== null) {
                        onCellClick?.(rowItem.id, colItem.id, value);
                      }
                    }}
                    onMouseEnter={() =>
                      setHoveredCell({ row: rowItem.id, col: colItem.id })
                    }
                    onMouseLeave={() => setHoveredCell(null)}
                    disabled={isDiagonal}
                    aria-label={`${rowItem.label} vs ${colItem.label}: ${formatValue(value)}`}
                  >
                    {showValues && !isDiagonal && (
                      <span className={styles.cellValue}>{formatValue(value)}</span>
                    )}
                    {isDiagonal && <span className={styles.diagonalMark}>—</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Footer with info */}
      <footer className={styles.footer}>
        <div className={styles.footerInfo}>
          <Info size={12} />
          <span>
            Values range from -1 (inverse) to +1 (perfect correlation).
            {highlightThreshold < 1 && (
              <> Cells with |r| ≥ {highlightThreshold} are highlighted.</>
            )}
          </span>
        </div>
        {hoveredCell && (
          <div className={styles.hoveredInfo}>
            <span className={styles.hoveredLabels}>
              {items.find((i) => i.id === hoveredCell.row)?.label} ×{' '}
              {items.find((i) => i.id === hoveredCell.col)?.label}
            </span>
            <span className={styles.hoveredValue}>
              r = {formatValue(getCorrelation(hoveredCell.row, hoveredCell.col))}
            </span>
          </div>
        )}
      </footer>
    </div>
  );
}

export default CorrelationMatrix;
