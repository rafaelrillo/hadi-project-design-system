// Path: src/components/molecules/sentinel/AllocationList/AllocationList.tsx
import { useMemo } from 'react';
import styles from './AllocationList.module.css';

export interface AllocationItem {
  symbol: string;
  name?: string;
  value: number;
  allocation: number;
  change?: number;
  color?: string;
}

export interface AllocationListProps {
  items: AllocationItem[];
  maxItems?: number;
  showValue?: boolean;
  showChange?: boolean;
  compact?: boolean;
  className?: string;
}

const defaultColors = [
  '#5ba3a5', '#7ecbcc', '#4a9a7c', '#5a8fb8',
  '#8b7ec7', '#c4a35a', '#c47a5a', '#b85c5c',
];

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

export function AllocationList({
  items,
  maxItems,
  showValue = true,
  showChange = false,
  compact = false,
  className = '',
}: AllocationListProps) {
  const displayItems = useMemo(() => {
    const sorted = [...items].sort((a, b) => b.allocation - a.allocation);
    return maxItems ? sorted.slice(0, maxItems) : sorted;
  }, [items, maxItems]);

  if (displayItems.length === 0) {
    return (
      <div className={`${styles.container} ${className}`}>
        <div className={styles.emptyState}>No allocations</div>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${compact ? styles.compact : ''} ${className}`}>
      {displayItems.map((item, index) => {
        const color = item.color || defaultColors[index % defaultColors.length];
        const isPositive = (item.change ?? 0) >= 0;

        return (
          <div key={item.symbol} className={styles.item}>
            <div className={styles.header}>
              <div className={styles.symbolGroup}>
                <span
                  className={styles.colorDot}
                  style={{ backgroundColor: color }}
                />
                <span className={styles.symbol}>{item.symbol}</span>
                {item.name && !compact && (
                  <span className={styles.name}>{item.name}</span>
                )}
              </div>
              <div className={styles.values}>
                {showValue && (
                  <span className={styles.value}>{formatCurrency(item.value)}</span>
                )}
                {showChange && item.change !== undefined && (
                  <span
                    className={`${styles.change} ${isPositive ? styles.positive : styles.negative}`}
                  >
                    {formatPercent(item.change)}
                  </span>
                )}
              </div>
            </div>
            <div className={styles.barContainer}>
              <div
                className={styles.bar}
                style={{
                  width: `${Math.min(item.allocation, 100)}%`,
                  backgroundColor: color,
                }}
              />
              <span className={styles.percent}>{item.allocation.toFixed(1)}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AllocationList;
