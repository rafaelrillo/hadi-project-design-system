// Path: src/components/organisms/fing/PeriodComparison/PeriodComparison.tsx
import { useMemo } from 'react';
import { ArrowRight, TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react';
import styles from './PeriodComparison.module.css';

/* ═══════════════════════════════════════════════════════════════════════════════
   PERIOD COMPARISON - Level 4 Depth Component
   Visual side-by-side comparison of market periods with metrics overlay
   ═══════════════════════════════════════════════════════════════════════════════ */

export interface PeriodMetric {
  id: string;
  label: string;
  value: number;
  format?: 'percentage' | 'currency' | 'number' | 'days';
  higherIsBetter?: boolean;
}

export interface ComparisonPeriod {
  id: string;
  name: string;
  dateRange: string;
  metrics: PeriodMetric[];
  isCurrent?: boolean;
  highlight?: boolean;
}

export interface PeriodComparisonProps {
  periods: ComparisonPeriod[];
  title?: string;
  subtitle?: string;
  showDelta?: boolean;
  highlightWinner?: boolean;
  compactMode?: boolean;
}

export function PeriodComparison({
  periods,
  title = 'Period Comparison',
  subtitle,
  showDelta = true,
  highlightWinner = true,
  compactMode = false,
}: PeriodComparisonProps) {
  // Get all unique metric IDs across all periods
  const allMetricIds = useMemo(() => {
    const ids = new Set<string>();
    periods.forEach((period) => {
      period.metrics.forEach((metric) => ids.add(metric.id));
    });
    return Array.from(ids);
  }, [periods]);

  // Create a map for quick metric lookup
  const getMetric = (period: ComparisonPeriod, metricId: string): PeriodMetric | undefined => {
    return period.metrics.find((m) => m.id === metricId);
  };

  // Get the first metric of each ID for labels and formatting info
  const getMetricInfo = (metricId: string): Partial<PeriodMetric> => {
    for (const period of periods) {
      const metric = period.metrics.find((m) => m.id === metricId);
      if (metric) return metric;
    }
    return { label: metricId };
  };

  // Format value based on type
  const formatValue = (value: number, format?: PeriodMetric['format']): string => {
    switch (format) {
      case 'percentage':
        return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
      case 'currency':
        return `$${value.toLocaleString()}`;
      case 'days':
        return `${value} days`;
      case 'number':
      default:
        return value.toLocaleString();
    }
  };

  // Calculate delta between two values
  const calculateDelta = (
    current: number,
    previous: number,
    higherIsBetter: boolean = true
  ): { value: number; direction: 'up' | 'down' | 'neutral'; sentiment: 'positive' | 'negative' | 'neutral' } => {
    const delta = current - previous;
    const percentDelta = previous !== 0 ? (delta / Math.abs(previous)) * 100 : 0;

    let direction: 'up' | 'down' | 'neutral' = 'neutral';
    if (delta > 0.01) direction = 'up';
    else if (delta < -0.01) direction = 'down';

    let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
    if (direction === 'up') sentiment = higherIsBetter ? 'positive' : 'negative';
    else if (direction === 'down') sentiment = higherIsBetter ? 'negative' : 'positive';

    return { value: percentDelta, direction, sentiment };
  };

  // Find best value for each metric
  const getBestPeriodForMetric = (metricId: string): string | null => {
    if (!highlightWinner) return null;

    const metricInfo = getMetricInfo(metricId);
    let bestPeriodId: string | null = null;
    let bestValue: number | null = null;

    periods.forEach((period) => {
      const metric = getMetric(period, metricId);
      if (metric) {
        if (bestValue === null) {
          bestValue = metric.value;
          bestPeriodId = period.id;
        } else {
          const isBetter = metricInfo.higherIsBetter !== false
            ? metric.value > bestValue
            : metric.value < bestValue;
          if (isBetter) {
            bestValue = metric.value;
            bestPeriodId = period.id;
          }
        }
      }
    });

    return bestPeriodId;
  };

  const getDeltaIcon = (direction: 'up' | 'down' | 'neutral') => {
    switch (direction) {
      case 'up':
        return <TrendingUp size={12} />;
      case 'down':
        return <TrendingDown size={12} />;
      default:
        return <Minus size={12} />;
    }
  };

  if (periods.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>
          <AlertCircle size={24} />
          <span>No periods to compare</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${styles.container} ${compactMode ? styles.compact : ''}`}
      role="region"
      aria-label={title}
    >
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </header>

      {/* Comparison Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table} role="table">
          <thead>
            <tr>
              <th className={styles.metricHeader}>Metric</th>
              {periods.map((period, index) => (
                <th
                  key={period.id}
                  className={`${styles.periodHeader} ${period.isCurrent ? styles.current : ''}`}
                >
                  <div className={styles.periodHeaderContent}>
                    <span className={styles.periodName}>{period.name}</span>
                    <span className={styles.periodDate}>{period.dateRange}</span>
                    {period.isCurrent && (
                      <span className={styles.currentBadge}>Current</span>
                    )}
                  </div>
                  {index < periods.length - 1 && showDelta && (
                    <span className={styles.deltaIndicator}>
                      <ArrowRight size={14} />
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {allMetricIds.map((metricId) => {
              const metricInfo = getMetricInfo(metricId);
              const bestPeriodId = getBestPeriodForMetric(metricId);

              return (
                <tr key={metricId} className={styles.metricRow}>
                  <td className={styles.metricLabel}>{metricInfo.label}</td>
                  {periods.map((period, index) => {
                    const metric = getMetric(period, metricId);
                    const isBest = bestPeriodId === period.id;
                    const previousPeriod = index > 0 ? periods[index - 1] : null;
                    const previousMetric = previousPeriod
                      ? getMetric(previousPeriod, metricId)
                      : null;

                    let delta = null;
                    if (showDelta && previousMetric && metric) {
                      delta = calculateDelta(
                        metric.value,
                        previousMetric.value,
                        metricInfo.higherIsBetter
                      );
                    }

                    return (
                      <td
                        key={period.id}
                        className={`${styles.metricValue} ${isBest ? styles.best : ''} ${
                          period.isCurrent ? styles.currentColumn : ''
                        }`}
                      >
                        {metric ? (
                          <div className={styles.valueContainer}>
                            <span className={styles.value}>
                              {formatValue(metric.value, metric.format)}
                            </span>
                            {delta && (
                              <span
                                className={styles.delta}
                                data-sentiment={delta.sentiment}
                              >
                                {getDeltaIcon(delta.direction)}
                                <span>{Math.abs(delta.value).toFixed(1)}%</span>
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className={styles.noData}>—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      {highlightWinner && (
        <footer className={styles.footer}>
          <div className={styles.legend}>
            <span className={styles.legendItem}>
              <span className={styles.legendDot} data-type="best" />
              <span>Best performing</span>
            </span>
            {showDelta && (
              <>
                <span className={styles.legendItem}>
                  <span className={styles.legendDot} data-type="positive" />
                  <span>Improvement</span>
                </span>
                <span className={styles.legendItem}>
                  <span className={styles.legendDot} data-type="negative" />
                  <span>Decline</span>
                </span>
              </>
            )}
          </div>
        </footer>
      )}
    </div>
  );
}

export default PeriodComparison;
