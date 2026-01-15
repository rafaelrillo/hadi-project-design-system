// Path: src/components/charts/FinancialLineChart/FinancialLineChart.tsx
import { useRef, useEffect, useCallback, useState } from 'react';
import {
  createChart,
  IChartApi,
  ISeriesApi,
  LineSeries,
  AreaSeries,
  LineData,
  Time,
  CrosshairMode,
  ColorType,
} from 'lightweight-charts';
import {
  chartTheme,
  sentinelChartColors,
  sentinelColors,
  getAreaSeriesOptions,
  getLineSeriesOptions,
  formatFinancialValue,
} from '../theme';
import styles from './FinancialLineChart.module.css';

export interface SeriesData {
  id: string;
  name?: string;
  color?: string;
  data: Array<{ x: string; y: number | null }>;
}

export interface FinancialLineChartProps {
  data: SeriesData[];
  height?: number;
  enableArea?: boolean;
  areaSeriesIndex?: number;
  formatValue?: (value: number) => string;
  className?: string;
  colors?: string[];
  minimal?: boolean;
}

interface TooltipData {
  time: string;
  values: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export function FinancialLineChart({
  data,
  height = 300,
  enableArea = true,
  areaSeriesIndex = 0,
  formatValue = formatFinancialValue,
  className = '',
  colors = sentinelChartColors,
  minimal = false,
}: FinancialLineChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRefs = useRef<Map<string, ISeriesApi<'Line'> | ISeriesApi<'Area'>>>(new Map());
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const containerClasses = [styles.container, className].filter(Boolean).join(' ');

  // Convert data to Lightweight Charts format
  const convertData = useCallback((seriesData: SeriesData['data']): LineData[] => {
    return seriesData
      .filter((d) => d.y !== null)
      .map((d) => ({
        time: d.x as Time,
        value: d.y as number,
      }));
  }, []);

  // Initialize chart
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Create chart with theme
    chartRef.current = createChart(container, {
      ...chartTheme,
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
        horzLines: {
          color: sentinelColors.borderSubtle,
          style: 1,
          visible: !minimal,
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          color: sentinelColors.accentPrimary,
          width: 1,
          style: 2,
          labelVisible: !minimal,
          labelBackgroundColor: sentinelColors.bgOverlay,
        },
        horzLine: {
          color: sentinelColors.accentPrimary,
          width: 1,
          style: 2,
          labelVisible: !minimal,
          labelBackgroundColor: sentinelColors.bgOverlay,
        },
      },
      rightPriceScale: {
        visible: !minimal,
        borderVisible: false,
        scaleMargins: { top: 0.1, bottom: 0.1 },
      },
      timeScale: {
        visible: !minimal,
        borderVisible: false,
        timeVisible: false,
        fixLeftEdge: true,
        fixRightEdge: true,
      },
      handleScale: false,
      handleScroll: false,
    });

    // Add series for each data set
    data.forEach((series, index) => {
      if (!chartRef.current) return;

      const color = series.color || colors[index % colors.length];
      const isAreaSeries = enableArea && index === areaSeriesIndex;

      if (isAreaSeries) {
        const areaSeries = chartRef.current.addSeries(AreaSeries, {
          ...getAreaSeriesOptions(color, 0.3),
          priceLineVisible: false,
          lastValueVisible: false,
        });
        areaSeries.setData(convertData(series.data));
        seriesRefs.current.set(series.id, areaSeries);
      } else {
        const lineSeries = chartRef.current.addSeries(LineSeries, {
          ...getLineSeriesOptions(color),
          priceLineVisible: false,
          lastValueVisible: false,
        });
        lineSeries.setData(convertData(series.data));
        seriesRefs.current.set(series.id, lineSeries);
      }
    });

    // Fit content
    chartRef.current.timeScale().fitContent();

    // Subscribe to crosshair move for tooltip
    chartRef.current.subscribeCrosshairMove((param) => {
      if (!param.time || !param.point || param.point.x < 0 || param.point.y < 0) {
        setTooltip(null);
        return;
      }

      const tooltipValues: TooltipData['values'] = [];

      data.forEach((series, index) => {
        const seriesApi = seriesRefs.current.get(series.id);
        if (!seriesApi) return;

        const dataPoint = param.seriesData.get(seriesApi);
        if (dataPoint && 'value' in dataPoint) {
          tooltipValues.push({
            name: series.name || series.id,
            value: dataPoint.value,
            color: series.color || colors[index % colors.length],
          });
        }
      });

      if (tooltipValues.length > 0) {
        // Sort by value descending
        tooltipValues.sort((a, b) => b.value - a.value);

        setTooltip({
          time: String(param.time),
          values: tooltipValues,
        });
        setTooltipPosition({
          x: param.point.x,
          y: param.point.y,
        });
      } else {
        setTooltip(null);
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
      seriesRefs.current.clear();
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [data, height, enableArea, areaSeriesIndex, colors, minimal, convertData]);

  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <div className={containerClasses} style={{ height: `${height}px` }}>
        <div className={styles.emptyState}>No data available</div>
      </div>
    );
  }

  return (
    <div className={containerClasses} style={{ height: `${height}px` }}>
      <div ref={containerRef} className={styles.chartWrapper} />

      {/* Custom tooltip */}
      {tooltip && (
        <div
          className={styles.tooltip}
          style={{
            left: `${Math.min(tooltipPosition.x + 16, (containerRef.current?.clientWidth || 300) - 180)}px`,
            top: `${Math.max(tooltipPosition.y - 60, 8)}px`,
          }}
        >
          <div className={styles.tooltipHeader}>{tooltip.time}</div>
          <div className={styles.tooltipContent}>
            {tooltip.values.map((item, idx) => (
              <div key={idx} className={styles.tooltipRow}>
                <span
                  className={styles.tooltipColor}
                  style={{ backgroundColor: item.color }}
                />
                <span className={styles.tooltipLabel}>{item.name}</span>
                <span className={styles.tooltipValue}>
                  {formatValue(item.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FinancialLineChart;
