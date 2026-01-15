// Path: src/components/charts/HistogramChart/HistogramChart.tsx
import { useRef, useEffect, useState } from 'react';
import {
  createChart,
  IChartApi,
  ISeriesApi,
  HistogramSeries,
  HistogramData,
  Time,
  CrosshairMode,
  ColorType,
} from 'lightweight-charts';
import { sentinelColors, formatFinancialValue } from '../theme';
import styles from './HistogramChart.module.css';

export interface HistogramDataPoint {
  time: string;
  value: number;
  color?: string;
}

export interface HistogramChartProps {
  data: HistogramDataPoint[];
  height?: number;
  color?: string;
  formatValue?: (value: number) => string;
  title?: string;
  showPositiveNegative?: boolean;
  positiveColor?: string;
  negativeColor?: string;
  className?: string;
}

export function HistogramChart({
  data,
  height = 300,
  color = sentinelColors.accentPrimary,
  formatValue = formatFinancialValue,
  title,
  showPositiveNegative = false,
  positiveColor = sentinelColors.positive,
  negativeColor = sentinelColors.negative,
  className = '',
}: HistogramChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Histogram'> | null>(null);
  const [tooltip, setTooltip] = useState<{ time: string; value: number } | null>(null);

  const containerClasses = `${styles.container} ${className}`.trim();

  useEffect(() => {
    if (!containerRef.current || !data.length) return;

    const container = containerRef.current;

    // Create chart
    chartRef.current = createChart(container, {
      width: container.clientWidth,
      height: title ? height - 30 : height,
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: sentinelColors.textSecondary,
        fontFamily: "'Inter', sans-serif",
        fontSize: 11,
        attributionLogo: false,
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: sentinelColors.borderSubtle, style: 1 },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          color: sentinelColors.accentPrimary,
          width: 1,
          style: 2,
          labelBackgroundColor: sentinelColors.bgOverlay,
        },
        horzLine: {
          color: sentinelColors.accentPrimary,
          width: 1,
          style: 2,
          labelBackgroundColor: sentinelColors.bgOverlay,
        },
      },
      rightPriceScale: {
        borderVisible: false,
        scaleMargins: { top: 0.1, bottom: 0.1 },
      },
      timeScale: {
        borderVisible: false,
        timeVisible: false,
        fixLeftEdge: true,
        fixRightEdge: true,
      },
      handleScale: false,
      handleScroll: false,
    });

    // Add histogram series
    seriesRef.current = chartRef.current.addSeries(HistogramSeries, {
      color,
      priceFormat: { type: 'price', precision: 2, minMove: 0.01 },
      priceLineVisible: false,
      lastValueVisible: false,
    });

    // Format data
    const formattedData: HistogramData[] = data.map((d) => ({
      time: d.time as Time,
      value: d.value,
      color: d.color || (showPositiveNegative
        ? (d.value >= 0 ? positiveColor : negativeColor)
        : color),
    }));

    seriesRef.current.setData(formattedData);

    // Fit content
    chartRef.current.timeScale().fitContent();

    // Subscribe to crosshair move
    chartRef.current.subscribeCrosshairMove((param) => {
      if (!param.time || !param.point || param.point.x < 0 || param.point.y < 0) {
        setTooltip(null);
        return;
      }

      const histogramData = param.seriesData.get(seriesRef.current!);
      if (histogramData && 'value' in histogramData) {
        setTooltip({
          time: String(param.time),
          value: histogramData.value,
        });
      }
    });

    // Handle resize
    const handleResize = () => {
      if (chartRef.current && container) {
        chartRef.current.applyOptions({ width: container.clientWidth });
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [data, height, color, showPositiveNegative, positiveColor, negativeColor, title]);

  if (!data || data.length === 0) {
    return (
      <div className={containerClasses} style={{ height: `${height}px` }}>
        <div className={styles.emptyState}>No data available</div>
      </div>
    );
  }

  const isPositive = tooltip ? tooltip.value >= 0 : false;

  return (
    <div className={containerClasses} style={{ height: `${height}px` }}>
      {title && <div className={styles.title}>{title}</div>}
      <div ref={containerRef} className={styles.chartWrapper} />

      {/* Tooltip */}
      {tooltip && (
        <div className={styles.tooltip}>
          <div className={styles.tooltipHeader}>{tooltip.time}</div>
          <div className={styles.tooltipContent}>
            <span className={styles.tooltipLabel}>Value</span>
            <span className={`${styles.tooltipValue} ${showPositiveNegative ? (isPositive ? styles.positive : styles.negative) : ''}`}>
              {formatValue(tooltip.value)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default HistogramChart;
