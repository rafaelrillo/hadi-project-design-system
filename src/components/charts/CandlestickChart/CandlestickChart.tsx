// Path: src/components/charts/CandlestickChart/CandlestickChart.tsx
import { useRef, useEffect, useState } from 'react';
import {
  createChart,
  IChartApi,
  ISeriesApi,
  CandlestickSeries,
  HistogramSeries,
  CandlestickData,
  HistogramData,
  Time,
  CrosshairMode,
  ColorType,
} from 'lightweight-charts';
import {
  sentinelColors,
  candlestickSeriesOptions,
} from '../theme';
import styles from './CandlestickChart.module.css';

export interface OHLCData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface CandlestickChartProps {
  data: OHLCData[];
  height?: number;
  showVolume?: boolean;
  className?: string;
}

interface TooltipData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
  change: number;
  changePercent: number;
}

export function CandlestickChart({
  data,
  height = 400,
  showVolume = true,
  className = '',
}: CandlestickChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<'Histogram'> | null>(null);
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
        vertLines: { color: sentinelColors.borderSubtle, visible: false },
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
        scaleMargins: {
          top: 0.1,
          bottom: showVolume ? 0.25 : 0.1,
        },
      },
      timeScale: {
        borderVisible: false,
        timeVisible: true,
        secondsVisible: false,
      },
    });

    // Add candlestick series
    candlestickSeriesRef.current = chartRef.current.addSeries(CandlestickSeries, {
      ...candlestickSeriesOptions,
      priceLineVisible: false,
    });

    // Convert and set candlestick data
    const candlestickData: CandlestickData[] = data.map((d) => ({
      time: d.time as Time,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
    }));
    candlestickSeriesRef.current.setData(candlestickData);

    // Add volume series if enabled
    if (showVolume) {
      volumeSeriesRef.current = chartRef.current.addSeries(HistogramSeries, {
        priceFormat: { type: 'volume' },
        priceScaleId: 'volume',
        priceLineVisible: false,
        lastValueVisible: false,
      });

      chartRef.current.priceScale('volume').applyOptions({
        scaleMargins: {
          top: 0.85,
          bottom: 0,
        },
        borderVisible: false,
      });

      const volumeData: HistogramData[] = data.map((d) => ({
        time: d.time as Time,
        value: d.volume || 0,
        color: d.close >= d.open
          ? `${sentinelColors.positive}80`
          : `${sentinelColors.negative}80`,
      }));
      volumeSeriesRef.current.setData(volumeData);
    }

    // Fit content
    chartRef.current.timeScale().fitContent();

    // Subscribe to crosshair move for tooltip
    chartRef.current.subscribeCrosshairMove((param) => {
      if (!param.time || !param.point || param.point.x < 0 || param.point.y < 0) {
        setTooltip(null);
        return;
      }

      const candleData = param.seriesData.get(candlestickSeriesRef.current!);
      if (candleData && 'open' in candleData) {
        const change = candleData.close - candleData.open;
        const changePercent = (change / candleData.open) * 100;

        const originalData = data.find((d) => d.time === param.time);

        setTooltip({
          time: String(param.time),
          open: candleData.open,
          high: candleData.high,
          low: candleData.low,
          close: candleData.close,
          volume: originalData?.volume,
          change,
          changePercent,
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
  }, [data, height, showVolume]);

  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <div className={containerClasses} style={{ height: `${height}px` }}>
        <div className={styles.emptyState}>No data available</div>
      </div>
    );
  }

  const isPositive = tooltip ? tooltip.close >= tooltip.open : false;

  return (
    <div className={containerClasses} style={{ height: `${height}px` }}>
      <div ref={containerRef} className={styles.chartWrapper} />

      {/* OHLC Tooltip */}
      {tooltip && (
        <div className={styles.tooltip}>
          <div className={styles.tooltipHeader}>{tooltip.time}</div>
          <div className={styles.tooltipGrid}>
            <span className={styles.tooltipLabel}>O</span>
            <span className={styles.tooltipValue}>{tooltip.open.toFixed(2)}</span>
            <span className={styles.tooltipLabel}>H</span>
            <span className={styles.tooltipValue}>{tooltip.high.toFixed(2)}</span>
            <span className={styles.tooltipLabel}>L</span>
            <span className={styles.tooltipValue}>{tooltip.low.toFixed(2)}</span>
            <span className={styles.tooltipLabel}>C</span>
            <span className={`${styles.tooltipValue} ${isPositive ? styles.positive : styles.negative}`}>
              {tooltip.close.toFixed(2)}
            </span>
          </div>
          <div className={`${styles.tooltipChange} ${isPositive ? styles.positive : styles.negative}`}>
            {isPositive ? '+' : ''}{tooltip.change.toFixed(2)} ({isPositive ? '+' : ''}{tooltip.changePercent.toFixed(2)}%)
          </div>
          {tooltip.volume !== undefined && (
            <div className={styles.tooltipVolume}>
              Vol: {(tooltip.volume / 1000000).toFixed(2)}M
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CandlestickChart;
