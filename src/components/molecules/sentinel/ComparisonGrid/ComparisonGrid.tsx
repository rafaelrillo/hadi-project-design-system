// Path: src/components/molecules/sentinel/ComparisonGrid/ComparisonGrid.tsx
import styles from './ComparisonGrid.module.css';

export interface ComparisonMetric {
  name: string;
  current: number;
  new: number;
  format?: 'percent' | 'number' | 'currency';
  higherIsBetter?: boolean;
}

export interface ComparisonGridProps {
  metrics: ComparisonMetric[];
  currentLabel?: string;
  newLabel?: string;
  showDelta?: boolean;
  className?: string;
}

function formatValue(value: number, format: ComparisonMetric['format'] = 'number'): string {
  switch (format) {
    case 'percent':
      return `${value.toFixed(0)}%`;
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    default:
      return value.toFixed(0);
  }
}

export function ComparisonGrid({
  metrics,
  currentLabel = 'Current',
  newLabel = 'New',
  showDelta = true,
  className = '',
}: ComparisonGridProps) {
  if (metrics.length === 0) {
    return (
      <div className={`${styles.container} ${className}`}>
        <div className={styles.emptyState}>No metrics to compare</div>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${className}`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.metricHeader}>Metric</div>
        <div className={styles.valueHeader}>{currentLabel}</div>
        <div className={styles.valueHeader}>{newLabel}</div>
        {showDelta && <div className={styles.deltaHeader}>Delta</div>}
      </div>

      {/* Rows */}
      <div className={styles.body}>
        {metrics.map((metric) => {
          const delta = metric.new - metric.current;
          const higherIsBetter = metric.higherIsBetter ?? true;
          const isImprovement = higherIsBetter ? delta > 0 : delta < 0;
          const isDegradation = higherIsBetter ? delta < 0 : delta > 0;

          return (
            <div key={metric.name} className={styles.row}>
              <div className={styles.metricName}>{metric.name}</div>
              <div className={styles.currentValue}>
                {formatValue(metric.current, metric.format)}
              </div>
              <div className={styles.newValue}>
                {formatValue(metric.new, metric.format)}
              </div>
              {showDelta && (
                <div
                  className={`${styles.delta} ${
                    isImprovement
                      ? styles.positive
                      : isDegradation
                      ? styles.negative
                      : styles.neutral
                  }`}
                >
                  {delta > 0 ? '+' : ''}
                  {delta.toFixed(0)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ComparisonGrid;
