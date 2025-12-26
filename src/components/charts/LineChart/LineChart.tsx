// Path: src/components/charts/LineChart/LineChart.tsx
// SENTINEL Design System - Line Chart
import { Line } from '@nivo/line';
import type { LineSeries } from '@nivo/line';
import { sentinelChartTheme, sentinelChartColors } from '../theme';
import styles from './LineChart.module.css';
import { useRef, useState, useEffect } from 'react';

export interface LineChartProps {
  data: LineSeries[];
  height?: number;
  width?: number;
  enableArea?: boolean;
  enablePoints?: boolean;
  className?: string;
}

export function LineChart({
  data,
  height = 300,
  width: propWidth,
  enableArea = true,
  enablePoints = true,
  className = ''
}: LineChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    if (containerRef.current) {
      const updateWidth = () => {
        if (containerRef.current) {
          setContainerWidth(containerRef.current.offsetWidth);
        }
      };
      updateWidth();

      const resizeObserver = new ResizeObserver(updateWidth);
      resizeObserver.observe(containerRef.current);

      return () => resizeObserver.disconnect();
    }
  }, []);

  const getClassName = (): string => {
    const classes = [styles.container];
    if (className) classes.push(className);
    return classes.join(' ');
  };

  // Ensure data is valid
  if (!data || data.length === 0) {
    return (
      <div ref={containerRef} className={getClassName()} style={{ height: `${height}px`, width: propWidth ? `${propWidth}px` : '100%' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: 'var(--sentinel-text-tertiary)',
          fontSize: '14px',
          fontFamily: 'var(--sentinel-font-primary)'
        }}>
          No data available
        </div>
      </div>
    );
  }

  const chartWidth = propWidth || containerWidth;

  // Don't render chart until we have width
  if (!chartWidth) {
    return (
      <div
        ref={containerRef}
        className={getClassName()}
        style={{
          height: `${height}px`,
          width: propWidth ? `${propWidth}px` : '100%',
          position: 'relative'
        }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={getClassName()}
      style={{
        height: `${height}px`,
        width: propWidth ? `${propWidth}px` : '100%',
        position: 'relative'
      }}
    >
      <Line
        data={data}
        width={chartWidth}
        height={height}
        colors={sentinelChartColors}
        margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
        curve="monotoneX"
        lineWidth={2}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        enableGridX={false}
        enableGridY={true}
        theme={sentinelChartTheme}
        pointSize={enablePoints ? 8 : 0}
        pointColor={{ from: 'serieColor' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        enableArea={enableArea}
        areaOpacity={0.15}
        useMesh={true}
        animate={true}
        motionConfig="gentle"
      />
    </div>
  );
}
