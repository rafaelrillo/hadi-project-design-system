// Path: src/components/organisms/sentinel/PerformanceChart/PerformanceChart.tsx
import { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, Calendar, Target, Minus } from 'lucide-react';
import styles from './PerformanceChart.module.css';

/* ═══════════════════════════════════════════════════════════════════════════════
   PERFORMANCE CHART - Level 4 Depth Component
   Historical performance visualization with SENTINEL aesthetic
   ═══════════════════════════════════════════════════════════════════════════════ */

export interface DataPoint {
  date: string; // ISO date string
  value: number;
}

export interface PerformanceSeries {
  id: string;
  name: string;
  data: DataPoint[];
  color?: string;
  isBenchmark?: boolean;
}

export interface PerformanceMetric {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
}

export interface TimeRange {
  id: string;
  label: string;
  days: number;
}

export interface PerformanceChartProps {
  series: PerformanceSeries[];
  title?: string;
  subtitle?: string;
  metrics?: PerformanceMetric[];
  timeRanges?: TimeRange[];
  defaultTimeRange?: string;
  onTimeRangeChange?: (rangeId: string) => void;
  showLegend?: boolean;
  height?: number;
  normalized?: boolean;
}

const DEFAULT_TIME_RANGES: TimeRange[] = [
  { id: '1m', label: '1M', days: 30 },
  { id: '3m', label: '3M', days: 90 },
  { id: '6m', label: '6M', days: 180 },
  { id: '1y', label: '1Y', days: 365 },
  { id: 'ytd', label: 'YTD', days: -1 },
  { id: 'all', label: 'ALL', days: 0 },
];

const DEFAULT_COLORS = [
  'var(--sentinel-accent-primary)',
  'var(--sentinel-status-positive)',
  'var(--sentinel-status-warning)',
  'var(--sentinel-status-negative)',
  '#9f7aea',
  '#ed8936',
];

export function PerformanceChart({
  series,
  title = 'Performance',
  subtitle,
  metrics = [],
  timeRanges = DEFAULT_TIME_RANGES,
  defaultTimeRange = '1y',
  onTimeRangeChange,
  showLegend = true,
  height = 300,
  normalized = false,
}: PerformanceChartProps) {
  const [selectedRange, setSelectedRange] = useState(defaultTimeRange);
  const [hoveredPoint, setHoveredPoint] = useState<{
    seriesId: string;
    index: number;
    x: number;
    y: number;
  } | null>(null);

  const handleRangeChange = (rangeId: string) => {
    setSelectedRange(rangeId);
    onTimeRangeChange?.(rangeId);
  };

  // Filter data based on selected time range
  const filteredSeries = useMemo(() => {
    const range = timeRanges.find((r) => r.id === selectedRange);
    if (!range) return series;

    const now = new Date();
    let cutoffDate: Date;

    if (range.days === 0) {
      // All time
      return series;
    } else if (range.days === -1) {
      // YTD
      cutoffDate = new Date(now.getFullYear(), 0, 1);
    } else {
      cutoffDate = new Date(now.getTime() - range.days * 24 * 60 * 60 * 1000);
    }

    return series.map((s) => ({
      ...s,
      data: s.data.filter((d) => new Date(d.date) >= cutoffDate),
    }));
  }, [series, selectedRange, timeRanges]);

  // Calculate chart dimensions and scales
  const chartData = useMemo(() => {
    if (filteredSeries.length === 0 || filteredSeries.every((s) => s.data.length === 0)) {
      return null;
    }

    const padding = { top: 20, right: 20, bottom: 30, left: 60 };
    const chartWidth = 800;
    const chartHeight = height;

    // Find all dates across all series
    const allDates = new Set<string>();
    filteredSeries.forEach((s) => s.data.forEach((d) => allDates.add(d.date)));
    const sortedDates = Array.from(allDates).sort();

    // Find value range
    let minValue = Infinity;
    let maxValue = -Infinity;

    if (normalized) {
      // For normalized, we show percentage change from first value
      filteredSeries.forEach((s) => {
        if (s.data.length === 0) return;
        const baseValue = s.data[0].value;
        s.data.forEach((d) => {
          const normalizedValue = ((d.value - baseValue) / baseValue) * 100;
          minValue = Math.min(minValue, normalizedValue);
          maxValue = Math.max(maxValue, normalizedValue);
        });
      });
    } else {
      filteredSeries.forEach((s) => {
        s.data.forEach((d) => {
          minValue = Math.min(minValue, d.value);
          maxValue = Math.max(maxValue, d.value);
        });
      });
    }

    // Add some padding to the value range
    const valueRange = maxValue - minValue || 1;
    minValue -= valueRange * 0.05;
    maxValue += valueRange * 0.05;

    // Calculate scales
    const xScale = (date: string) => {
      const index = sortedDates.indexOf(date);
      return (
        padding.left +
        (index / (sortedDates.length - 1 || 1)) * (chartWidth - padding.left - padding.right)
      );
    };

    const yScale = (value: number) => {
      const normalizedY = (value - minValue) / (maxValue - minValue || 1);
      return padding.top + (1 - normalizedY) * (chartHeight - padding.top - padding.bottom);
    };

    // Generate path data for each series
    const paths = filteredSeries.map((s, seriesIndex) => {
      const baseValue = normalized && s.data.length > 0 ? s.data[0].value : 0;

      const points = s.data.map((d) => {
        const value = normalized ? ((d.value - baseValue) / baseValue) * 100 : d.value;
        return {
          x: xScale(d.date),
          y: yScale(value),
          date: d.date,
          value: d.value,
          displayValue: normalized ? value : d.value,
        };
      });

      const pathD = points
        .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
        .join(' ');

      return {
        ...s,
        points,
        pathD,
        color: s.color || DEFAULT_COLORS[seriesIndex % DEFAULT_COLORS.length],
      };
    });

    // Generate Y-axis ticks
    const yTicks: { value: number; y: number; label: string }[] = [];
    const tickCount = 5;
    for (let i = 0; i <= tickCount; i++) {
      const value = minValue + (maxValue - minValue) * (i / tickCount);
      yTicks.push({
        value,
        y: yScale(value),
        label: normalized ? `${value.toFixed(1)}%` : formatValue(value),
      });
    }

    // Generate X-axis labels
    const xLabels: { date: string; x: number; label: string }[] = [];
    const labelCount = Math.min(6, sortedDates.length);
    const step = Math.floor(sortedDates.length / labelCount) || 1;
    for (let i = 0; i < sortedDates.length; i += step) {
      const date = sortedDates[i];
      xLabels.push({
        date,
        x: xScale(date),
        label: formatDate(date),
      });
    }

    return {
      paths,
      yTicks,
      xLabels,
      padding,
      width: chartWidth,
      height: chartHeight,
    };
  }, [filteredSeries, height, normalized]);

  const formatValue = (value: number): string => {
    if (Math.abs(value) >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (Math.abs(value) >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toFixed(2);
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
  };

  const formatFullDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getTrendIcon = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={14} />;
      case 'down':
        return <TrendingDown size={14} />;
      default:
        return <Minus size={14} />;
    }
  };

  if (!chartData) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.titleSection}>
            <h2 className={styles.title}>{title}</h2>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        </header>
        <div className={styles.emptyState}>
          <Target size={32} />
          <p>No performance data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.titleSection}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>

        {/* Time Range Selector */}
        <div className={styles.rangeSelector} role="tablist">
          {timeRanges.map((range) => (
            <button
              key={range.id}
              type="button"
              role="tab"
              aria-selected={selectedRange === range.id}
              className={`${styles.rangeButton} ${selectedRange === range.id ? styles.active : ''}`}
              onClick={() => handleRangeChange(range.id)}
            >
              {range.label}
            </button>
          ))}
        </div>
      </header>

      {/* Metrics Bar */}
      {metrics.length > 0 && (
        <div className={styles.metricsBar}>
          {metrics.map((metric, index) => (
            <div key={index} className={styles.metricItem}>
              <span className={styles.metricLabel}>{metric.label}</span>
              <div className={styles.metricValue}>
                <span
                  className={`${styles.metricNumber} ${
                    metric.trend === 'up'
                      ? styles.positive
                      : metric.trend === 'down'
                      ? styles.negative
                      : ''
                  }`}
                >
                  {metric.value}
                </span>
                {metric.trend && (
                  <span
                    className={`${styles.metricTrend} ${
                      metric.trend === 'up'
                        ? styles.positive
                        : metric.trend === 'down'
                        ? styles.negative
                        : ''
                    }`}
                  >
                    {getTrendIcon(metric.trend)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Chart */}
      <div className={styles.chartWrapper}>
        <svg
          className={styles.chart}
          viewBox={`0 0 ${chartData.width} ${chartData.height}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid Lines */}
          <g className={styles.gridLines}>
            {chartData.yTicks.map((tick, i) => (
              <line
                key={i}
                x1={chartData.padding.left}
                y1={tick.y}
                x2={chartData.width - chartData.padding.right}
                y2={tick.y}
                className={styles.gridLine}
              />
            ))}
          </g>

          {/* Y-Axis Labels */}
          <g className={styles.yAxis}>
            {chartData.yTicks.map((tick, i) => (
              <text
                key={i}
                x={chartData.padding.left - 8}
                y={tick.y}
                className={styles.axisLabel}
                textAnchor="end"
                dominantBaseline="middle"
              >
                {tick.label}
              </text>
            ))}
          </g>

          {/* X-Axis Labels */}
          <g className={styles.xAxis}>
            {chartData.xLabels.map((label, i) => (
              <text
                key={i}
                x={label.x}
                y={chartData.height - 8}
                className={styles.axisLabel}
                textAnchor="middle"
              >
                {label.label}
              </text>
            ))}
          </g>

          {/* Zero Line (for normalized view) */}
          {normalized && (
            <line
              x1={chartData.padding.left}
              y1={chartData.yTicks.find((t) => Math.abs(t.value) < 0.5)?.y || 0}
              x2={chartData.width - chartData.padding.right}
              y2={chartData.yTicks.find((t) => Math.abs(t.value) < 0.5)?.y || 0}
              className={styles.zeroLine}
            />
          )}

          {/* Series Lines */}
          {chartData.paths.map((path) => (
            <g key={path.id}>
              {/* Area fill for primary series */}
              {!path.isBenchmark && (
                <path
                  d={`${path.pathD} L ${path.points[path.points.length - 1]?.x || 0} ${
                    chartData.height - chartData.padding.bottom
                  } L ${path.points[0]?.x || 0} ${chartData.height - chartData.padding.bottom} Z`}
                  className={styles.areaFill}
                  style={{ fill: path.color }}
                />
              )}

              {/* Line */}
              <path
                d={path.pathD}
                fill="none"
                stroke={path.color}
                strokeWidth={path.isBenchmark ? 1.5 : 2}
                strokeDasharray={path.isBenchmark ? '4 4' : undefined}
                className={styles.line}
              />

              {/* Interactive Points */}
              {path.points.map((point, i) => (
                <circle
                  key={i}
                  cx={point.x}
                  cy={point.y}
                  r={hoveredPoint?.seriesId === path.id && hoveredPoint?.index === i ? 6 : 3}
                  fill={path.color}
                  className={styles.dataPoint}
                  onMouseEnter={() =>
                    setHoveredPoint({
                      seriesId: path.id,
                      index: i,
                      x: point.x,
                      y: point.y,
                    })
                  }
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              ))}
            </g>
          ))}

          {/* Tooltip */}
          {hoveredPoint && (
            <g className={styles.tooltip}>
              <rect
                x={hoveredPoint.x - 60}
                y={hoveredPoint.y - 50}
                width={120}
                height={40}
                rx={6}
                className={styles.tooltipBg}
              />
              <text
                x={hoveredPoint.x}
                y={hoveredPoint.y - 36}
                textAnchor="middle"
                className={styles.tooltipDate}
              >
                {formatFullDate(
                  chartData.paths
                    .find((p) => p.id === hoveredPoint.seriesId)
                    ?.points[hoveredPoint.index]?.date || ''
                )}
              </text>
              <text
                x={hoveredPoint.x}
                y={hoveredPoint.y - 20}
                textAnchor="middle"
                className={styles.tooltipValue}
              >
                {formatValue(
                  chartData.paths
                    .find((p) => p.id === hoveredPoint.seriesId)
                    ?.points[hoveredPoint.index]?.value || 0
                )}
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Legend */}
      {showLegend && (
        <div className={styles.legend}>
          {chartData.paths.map((path) => (
            <div key={path.id} className={styles.legendItem}>
              <span
                className={`${styles.legendLine} ${path.isBenchmark ? styles.dashed : ''}`}
                style={{ backgroundColor: path.color }}
              />
              <span className={styles.legendLabel}>{path.name}</span>
              {path.isBenchmark && <span className={styles.benchmarkTag}>Benchmark</span>}
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInfo}>
          <Calendar size={12} />
          <span>
            Showing data from {formatFullDate(filteredSeries[0]?.data[0]?.date || '')} to{' '}
            {formatFullDate(
              filteredSeries[0]?.data[filteredSeries[0].data.length - 1]?.date || ''
            )}
          </span>
        </div>
        {normalized && (
          <div className={styles.footerNote}>Values normalized to percentage change from start</div>
        )}
      </footer>
    </div>
  );
}

export default PerformanceChart;
