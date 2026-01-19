// Path: src/components/molecules/fing/TrendIndicator/TrendIndicator.tsx
import styles from './TrendIndicator.module.css';

export type TrendDirection = 'up' | 'down' | 'stable';

export interface TrendIndicatorProps {
  label: string;
  value: string | number;
  trend: TrendDirection;
  change?: string;
  period?: string;
  size?: 'sm' | 'md' | 'lg';
}

const trendIcons: Record<TrendDirection, string> = {
  up: '↑',
  down: '↓',
  stable: '→',
};

export function TrendIndicator({
  label,
  value,
  trend,
  change,
  period,
  size = 'md',
}: TrendIndicatorProps) {
  const containerClasses = [
    styles.container,
    styles[size],
  ].join(' ');

  const isPositive = trend === 'up';
  const isNegative = trend === 'down';

  return (
    <div
      className={containerClasses}
      role="status"
      aria-label={`${label}: ${value}${change ? `, ${change}` : ''}`}
    >
      <span className={styles.label}>{label}</span>

      <div className={styles.valueRow}>
        <span className={styles.value}>{value}</span>
        <span className={`${styles.trendIcon} ${styles[trend]}`}>
          {trendIcons[trend]}
        </span>
      </div>

      {(change || period) && (
        <div className={styles.changeRow}>
          {change && (
            <span
              className={`${styles.change} ${
                isPositive ? styles.positive : isNegative ? styles.negative : ''
              }`}
            >
              {change}
            </span>
          )}
          {period && (
            <span className={styles.period}>{period}</span>
          )}
        </div>
      )}
    </div>
  );
}

export default TrendIndicator;
