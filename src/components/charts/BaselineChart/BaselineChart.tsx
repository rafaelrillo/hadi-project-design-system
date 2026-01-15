// Path: src/components/charts/BaselineChart/BaselineChart.tsx
import { useRef, useEffect, useState } from 'react';
import {
  createChart,
  IChartApi,
  ISeriesApi,
  BaselineSeries,
  BaselineData,
  Time,
  CrosshairMode,
  ColorType,
} from 'lightweight-charts';
import {
  sentinelColors,
  formatFinancialValue,
} from '../theme';
import styles from './BaselineChart.module.css';

export interface BaselineDataPoint {
  time: string;
  value: number;
}

export interface BaselineChartProps {
  data: BaselineDataPoint[];
  height?: number;
  baseValue?: number;
  topFillColor?: string;
  bottomFillColor?: string;
  formatValue?: (value: number) => string;
  className?: string;
  title?: string;
}

interface TooltipData {
  time: string;
  value: number;
  deviation: number;
}

export function BaselineChart({
  data,
  height = 300,
  baseValue = 0,
  topFillColor = sentinelColors.positive,
  bottomFillColor = sentinelColors.negative,
  formatValue = formatFinancialValue,
  className = '',
  title,
}: BaselineChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Baseline'> | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  const containerClasses = [styles.container, className].filter(Boolean).join(' ');

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Create chart
    chartRef.current = createChart(container, {
      width: container.clientWidth,
      height,
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

    // Add baseline series
    seriesRef.current = chartRef.current.addSeries(BaselineSeries, {
      baseValue: { type: 'price', price: baseValue },
      topLineColor: topFillColor,
      topFillColor1: `${topFillColor}40`,
      topFillColor2: `${topFillColor}00`,
      bottomLineColor: bottomFillColor,
      bottomFillColor1: `${bottomFillColor}00`,
      bottomFillColor2: `${bottomFillColor}40`,
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: false,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 4,
      crosshairMarkerBorderWidth: 2,
    });

    // Convert and set data
    const baselineData: BaselineData[] = data.map((d) => ({
      time: d.time as Time,
      value: d.value,
    }));
    seriesRef.current.setData(baselineData);

    // Add baseline price line
    seriesRef.current.createPriceLine({
      price: baseValue,
      color: sentinelColors.textTertiary,
      lineWidth: 1,
      lineStyle: 2,
      axisLabelVisible: true,
      title: 'Baseline',
    });

    // Fit content
    chartRef.current.timeScale().fitContent();

    // Subscribe to crosshair move for tooltip
    chartRef.current.subscribeCrosshairMove((param) => {
      if (!param.time || !param.point || param.point.x < 0 || param.point.y < 0) {
        setTooltip(null);
        return;
      }

      const dataPoint = param.seriesData.get(seriesRef.current!);
      if (dataPoint && 'value' in dataPoint) {
        setTooltip({
          time: String(param.time),
          value: dataPoint.value,
          deviation: dataPoint.value - baseValue,
        });
      }
    });

    // Handle resize
    const handleResize = () => {
      if (chartRef.current && containerRef.current) {
        chartRef.current.applyOptions({
          width: containerRef.current.clientWidth,
        });
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
  }, [data, height, baseValue, topFillColor, bottomFillColor]);

  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <div className={containerClasses} style={{ height: `${height}px` }}>
        <div className={styles.emptyState}>No data available</div>
      </div>
    );
  }

  const isPositive = tooltip ? tooltip.value >= baseValue : false;

  return (
    <div className={containerClasses} style={{ height: `${height}px` }}>
      {title && <div className={styles.title}>{title}</div>}
      <div ref={containerRef} className={styles.chartWrapper} />

      {/* Tooltip */}
      {tooltip && (
        <div className={styles.tooltip}>
          <div className={styles.tooltipHeader}>{tooltip.time}</div>
          <div className={styles.tooltipContent}>
            <div className={styles.tooltipRow}>
              <span className={styles.tooltipLabel}>Value</span>
              <span className={styles.tooltipValue}>{formatValue(tooltip.value)}</span>
            </div>
            <div className={styles.tooltipRow}>
              <span className={styles.tooltipLabel}>vs Baseline</span>
              <span className={`${styles.tooltipDeviation} ${isPositive ? styles.positive : styles.negative}`}>
                {isPositive ? '+' : ''}{formatValue(tooltip.deviation)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BaselineChart;
