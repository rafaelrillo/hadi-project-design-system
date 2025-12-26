// Path: src/components/molecules/sentinel/AllocationSummary/AllocationSummary.tsx
import styles from './AllocationSummary.module.css';

export interface AllocationItem {
  assetClass: string;
  percentage: number;
  change?: number;
}

export interface AllocationSummaryProps {
  allocations: AllocationItem[];
  title?: string;
  showChanges?: boolean;
}

// Colors for different asset classes (matching chart palette)
const assetColors: Record<string, string> = {
  stocks: 'var(--sentinel-chart-1)',
  bonds: 'var(--sentinel-chart-4)',
  cash: 'var(--sentinel-chart-3)',
  commodities: 'var(--sentinel-chart-6)',
  crypto: 'var(--sentinel-chart-5)',
  real_estate: 'var(--sentinel-chart-7)',
  other: 'var(--sentinel-chart-2)',
};

function getAssetColor(assetClass: string): string {
  const key = assetClass.toLowerCase().replace(/\s+/g, '_');
  return assetColors[key] || 'var(--sentinel-text-tertiary)';
}

function formatChange(change: number): string {
  const sign = change > 0 ? '+' : '';
  return `${sign}${change}%`;
}

export function AllocationSummary({
  allocations,
  title = 'Suggested Allocation',
  showChanges = true,
}: AllocationSummaryProps) {
  // Sort by percentage descending
  const sortedAllocations = [...allocations].sort((a, b) => b.percentage - a.percentage);

  return (
    <div
      className={styles.container}
      role="region"
      aria-label={title}
    >
      {/* Header */}
      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
      </header>

      {/* Allocations List */}
      <div className={styles.allocationsList}>
        {sortedAllocations.map((allocation) => (
          <div key={allocation.assetClass} className={styles.allocationRow}>
            <div className={styles.barSection}>
              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={{
                    width: `${allocation.percentage}%`,
                    backgroundColor: getAssetColor(allocation.assetClass),
                  }}
                />
              </div>
            </div>

            <div className={styles.labelSection}>
              <span
                className={styles.colorDot}
                style={{ backgroundColor: getAssetColor(allocation.assetClass) }}
              />
              <span className={styles.assetClass}>{allocation.assetClass}</span>
            </div>

            <div className={styles.valueSection}>
              <span className={styles.percentage}>{allocation.percentage}%</span>
              {showChanges && allocation.change !== undefined && allocation.change !== 0 && (
                <span
                  className={`${styles.change} ${
                    allocation.change > 0 ? styles.positive : styles.negative
                  }`}
                >
                  ({formatChange(allocation.change)})
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Total Check */}
      <div className={styles.total}>
        <span className={styles.totalLabel}>Total</span>
        <span className={styles.totalValue}>
          {sortedAllocations.reduce((sum, a) => sum + a.percentage, 0)}%
        </span>
      </div>
    </div>
  );
}

export default AllocationSummary;
