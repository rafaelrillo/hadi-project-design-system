// Path: src/components/charts/LightweightChart/LightweightChart.tsx
import { useRef, useEffect, useCallback } from 'react';
import {
  createChart,
  IChartApi,
  DeepPartial,
  ChartOptions,
  ISeriesApi,
  SeriesType,
} from 'lightweight-charts';
import { chartTheme } from '../theme';
import styles from './LightweightChart.module.css';

export interface LightweightChartProps {
  width?: number;
  height?: number;
  className?: string;
  autoSize?: boolean;
  options?: DeepPartial<ChartOptions>;
  onChartReady?: (chart: IChartApi) => void;
}

export function LightweightChart({
  width,
  height = 300,
  className,
  autoSize = true,
  options,
  onChartReady,
}: LightweightChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chartOptions: DeepPartial<ChartOptions> = {
      ...chartTheme,
      width: autoSize ? containerRef.current.clientWidth : width,
      height,
      ...options,
    };

    chartRef.current = createChart(containerRef.current, chartOptions);

    if (onChartReady) {
      onChartReady(chartRef.current);
    }

    const handleResize = () => {
      if (chartRef.current && containerRef.current && autoSize) {
        chartRef.current.applyOptions({
          width: containerRef.current.clientWidth,
        });
      }
    };

    if (autoSize) {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (autoSize) {
        window.removeEventListener('resize', handleResize);
      }
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [height, width, autoSize, options, onChartReady]);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className || ''}`}
      style={{ height }}
    />
  );
}

// Hook for more granular control
export function useChart(
  containerRef: React.RefObject<HTMLDivElement | null>,
  options?: DeepPartial<ChartOptions>
) {
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<Map<string, ISeriesApi<SeriesType>>>(new Map());

  const initChart = useCallback(() => {
    if (!containerRef.current || chartRef.current) return;

    const chartOptions: DeepPartial<ChartOptions> = {
      ...chartTheme,
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
      ...options,
    };

    chartRef.current = createChart(containerRef.current, chartOptions);
    return chartRef.current;
  }, [options, containerRef]);

  const destroyChart = useCallback(() => {
    seriesRef.current.clear();
    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }
  }, []);

  const resize = useCallback(() => {
    if (chartRef.current && containerRef.current) {
      chartRef.current.applyOptions({
        width: containerRef.current.clientWidth,
      });
    }
  }, [containerRef]);

  useEffect(() => {
    return () => destroyChart();
  }, [destroyChart]);

  return {
    chartRef,
    seriesRef,
    initChart,
    destroyChart,
    resize,
  };
}

export default LightweightChart;
