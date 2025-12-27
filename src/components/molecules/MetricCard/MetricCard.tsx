// Path: src/components/molecules/MetricCard/MetricCard.tsx
import React, { useMemo } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowRight,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import styles from './MetricCard.module.css';

/* ═══════════════════════════════════════════════════════════════════════════════
   METRICCARD COMPONENT
   Versatile card for displaying KPIs with context, trends, and visualizations
   ═══════════════════════════════════════════════════════════════════════════════ */

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface MetricCardTrend {
  /** Trend value (e.g., 5.2 for +5.2%) */
  value: number;
  /** Direction of the trend */
  direction: 'up' | 'down' | 'stable';
  /** Optional label like "vs last week" */
  label?: string;
  /** Whether up is good or bad (e.g., costs going up is bad) */
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export interface MetricCardProgress {
  /** Current value */
  value: number;
  /** Maximum value */
  max: number;
  /** Show percentage label */
  showLabel?: boolean;
}

export interface MetricCardDistributionSegment {
  value: number;
  color?: string;
  label?: string;
}

export interface MetricCardDistribution {
  segments: MetricCardDistributionSegment[];
}

export interface MetricCardComparison {
  label: string;
  value: string | number;
  difference?: number;
}

export interface MetricCardProps {
  // ─── Main Data ───
  /** Card title/label */
  title: string;
  /** Main metric value */
  value: string | number;
  /** Previous value for comparison */
  previousValue?: string | number;

  // ─── Formatting ───
  /** Value format type */
  format?: 'number' | 'currency' | 'percentage' | 'custom';
  /** Currency code for currency format */
  currency?: string;
  /** Decimal places */
  decimals?: number;
  /** Prefix text */
  prefix?: string;
  /** Suffix text */
  suffix?: string;

  // ─── Trend ───
  /** Trend indicator */
  trend?: MetricCardTrend;

  // ─── Secondary Visualizations ───
  /** Mini sparkline chart */
  sparkline?: number[];
  /** Progress bar */
  progress?: MetricCardProgress;
  /** Distribution bar */
  distribution?: MetricCardDistribution;

  // ─── Comparison ───
  /** Comparison with another value */
  comparison?: MetricCardComparison;

  // ─── Interaction ───
  /** Click handler */
  onClick?: () => void;
  /** Link href */
  href?: string;
  /** Action button label */
  actionLabel?: string;
  /** Action button click handler */
  onActionClick?: () => void;

  // ─── States ───
  /** Loading state */
  loading?: boolean;
  /** Error message */
  error?: string;

  // ─── Layout ───
  /** Card size */
  size?: 'sm' | 'md' | 'lg';
  /** Card variant */
  variant?: 'default' | 'outlined' | 'filled';
  /** Status color */
  status?: 'default' | 'success' | 'warning' | 'error' | 'info';
  /** Icon to display */
  icon?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

function formatValue(
  value: string | number,
  format?: MetricCardProps['format'],
  options?: {
    currency?: string;
    decimals?: number;
    prefix?: string;
    suffix?: string;
  }
): string {
  const { currency = 'USD', decimals = 2, prefix = '', suffix = '' } = options || {};

  if (typeof value === 'string') {
    return `${prefix}${value}${suffix}`;
  }

  let formatted: string;

  switch (format) {
    case 'currency':
      formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value);
      break;

    case 'percentage':
      formatted = new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value / 100);
      break;

    case 'number':
      formatted = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value);
      break;

    default:
      formatted = String(value);
  }

  return `${prefix}${formatted}${suffix}`;
}

function getTrendColor(
  direction: MetricCardTrend['direction'],
  sentiment?: MetricCardTrend['sentiment']
): 'positive' | 'negative' | 'neutral' {
  if (sentiment) {
    return sentiment;
  }

  // Default: up is positive, down is negative
  if (direction === 'up') return 'positive';
  if (direction === 'down') return 'negative';
  return 'neutral';
}

// ─────────────────────────────────────────────────────────────────────────────
// SPARKLINE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function Sparkline({ data }: { data: number[] }) {
  if (!data || data.length < 2) return null;

  const width = 80;
  const height = 24;
  const padding = 2;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((value - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(' L ')}`;

  // Determine trend color based on first vs last value
  const trendPositive = data[data.length - 1] >= data[0];

  return (
    <svg
      className={styles.sparkline}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
    >
      <path
        d={pathD}
        fill="none"
        stroke={trendPositive ? 'var(--sentinel-status-positive)' : 'var(--sentinel-status-negative)'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* End dot */}
      <circle
        cx={parseFloat(points[points.length - 1].split(',')[0])}
        cy={parseFloat(points[points.length - 1].split(',')[1])}
        r="2"
        fill={trendPositive ? 'var(--sentinel-status-positive)' : 'var(--sentinel-status-negative)'}
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROGRESS BAR COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function ProgressBar({ value, max, showLabel }: MetricCardProgress) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
      {showLabel && (
        <span className={styles.progressLabel}>{percentage.toFixed(0)}%</span>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DISTRIBUTION BAR COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function DistributionBar({ segments }: MetricCardDistribution) {
  const total = segments.reduce((acc, seg) => acc + seg.value, 0);
  if (total === 0) return null;

  const defaultColors = [
    'var(--sentinel-chart-1)',
    'var(--sentinel-chart-2)',
    'var(--sentinel-chart-3)',
    'var(--sentinel-chart-4)',
    'var(--sentinel-chart-5)',
  ];

  return (
    <div className={styles.distributionContainer}>
      <div className={styles.distributionBar}>
        {segments.map((segment, index) => {
          const percentage = (segment.value / total) * 100;
          return (
            <div
              key={index}
              className={styles.distributionSegment}
              style={{
                width: `${percentage}%`,
                backgroundColor: segment.color || defaultColors[index % defaultColors.length],
              }}
              title={segment.label ? `${segment.label}: ${percentage.toFixed(1)}%` : `${percentage.toFixed(1)}%`}
            />
          );
        })}
      </div>
      {segments.some((s) => s.label) && (
        <div className={styles.distributionLegend}>
          {segments.map((segment, index) => (
            segment.label && (
              <div key={index} className={styles.legendItem}>
                <span
                  className={styles.legendDot}
                  style={{
                    backgroundColor: segment.color || defaultColors[index % defaultColors.length],
                  }}
                />
                <span className={styles.legendLabel}>{segment.label}</span>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function MetricCard({
  title,
  value,
  previousValue,
  format,
  currency,
  decimals,
  prefix,
  suffix,
  trend,
  sparkline,
  progress,
  distribution,
  comparison,
  onClick,
  href,
  actionLabel,
  onActionClick,
  loading = false,
  error,
  size = 'md',
  variant = 'default',
  status = 'default',
  icon,
  className,
}: MetricCardProps) {
  // Format the value
  const formattedValue = useMemo(() => {
    return formatValue(value, format, { currency, decimals, prefix, suffix });
  }, [value, format, currency, decimals, prefix, suffix]);

  // Determine trend color
  const trendColor = trend ? getTrendColor(trend.direction, trend.sentiment) : null;

  // Get trend icon
  const TrendIcon = useMemo(() => {
    if (!trend) return null;
    switch (trend.direction) {
      case 'up':
        return TrendingUp;
      case 'down':
        return TrendingDown;
      default:
        return Minus;
    }
  }, [trend]);

  // Build class names
  const cardClasses = [
    styles.metricCard,
    styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`],
    styles[`variant${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
    status !== 'default' && styles[`status${status.charAt(0).toUpperCase() + status.slice(1)}`],
    (onClick || href) && styles.interactive,
    loading && styles.loading,
    error && styles.hasError,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Wrapper element (link or div)
  const Wrapper = href ? 'a' : 'div';
  const wrapperProps = href
    ? { href, className: cardClasses }
    : { className: cardClasses, onClick, role: onClick ? 'button' : undefined, tabIndex: onClick ? 0 : undefined };

  // Loading state
  if (loading) {
    return (
      <div className={cardClasses}>
        <div className={styles.loadingContent}>
          <Loader2 className={styles.loadingSpinner} size={24} />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={cardClasses}>
        <div className={styles.errorContent}>
          <AlertCircle size={20} className={styles.errorIcon} />
          <span className={styles.errorMessage}>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <Wrapper {...wrapperProps}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleRow}>
          {icon && <span className={styles.icon}>{icon}</span>}
          <h3 className={styles.title}>{title}</h3>
        </div>

        {sparkline && sparkline.length > 0 && <Sparkline data={sparkline} />}
      </div>

      {/* Main Value */}
      <div className={styles.valueRow}>
        <span className={styles.value}>{formattedValue}</span>

        {/* Trend */}
        {trend && TrendIcon && (
          <div className={`${styles.trend} ${styles[`trend${trendColor?.charAt(0).toUpperCase()}${trendColor?.slice(1)}`]}`}>
            <TrendIcon size={16} className={styles.trendIcon} />
            <span className={styles.trendValue}>
              {trend.value > 0 ? '+' : ''}
              {trend.value}%
            </span>
            {trend.label && <span className={styles.trendLabel}>{trend.label}</span>}
          </div>
        )}
      </div>

      {/* Previous Value */}
      {previousValue !== undefined && (
        <div className={styles.previousValue}>
          Anterior: {formatValue(previousValue, format, { currency, decimals, prefix, suffix })}
        </div>
      )}

      {/* Progress */}
      {progress && (
        <ProgressBar
          value={progress.value}
          max={progress.max}
          showLabel={progress.showLabel}
        />
      )}

      {/* Distribution */}
      {distribution && <DistributionBar segments={distribution.segments} />}

      {/* Comparison */}
      {comparison && (
        <div className={styles.comparison}>
          <span className={styles.comparisonLabel}>{comparison.label}:</span>
          <span className={styles.comparisonValue}>{comparison.value}</span>
          {comparison.difference !== undefined && (
            <span
              className={`${styles.comparisonDiff} ${
                comparison.difference >= 0 ? styles.comparisonDiffPositive : styles.comparisonDiffNegative
              }`}
            >
              {comparison.difference >= 0 ? '+' : ''}
              {comparison.difference}%
            </span>
          )}
        </div>
      )}

      {/* Action */}
      {(actionLabel || (onClick && !href)) && (
        <div className={styles.footer}>
          {actionLabel && onActionClick && (
            <button
              type="button"
              className={styles.actionButton}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onActionClick();
              }}
            >
              {actionLabel}
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      )}
    </Wrapper>
  );
}
