// Path: src/components/charts/StreamChart/StreamChart.tsx
import { ResponsiveStream } from '@nivo/stream';
import { sentinelChartTheme, sentinelChartColors } from '../theme';
import styles from './StreamChart.module.css';

export interface StreamChartProps {
  data: Array<Record<string, number>>;
  keys: string[];
  height?: number;
  colors?: string[];
  curve?: 'basis' | 'cardinal' | 'catmullRom' | 'linear' | 'monotoneX' | 'monotoneY' | 'natural' | 'step' | 'stepAfter' | 'stepBefore';
  offsetType?: 'diverging' | 'expand' | 'none' | 'silhouette' | 'wiggle';
  fillOpacity?: number;
  borderWidth?: number;
  enableGridX?: boolean;
  enableGridY?: boolean;
  className?: string;
}

export function StreamChart({
  data,
  keys,
  height = 350,
  colors = sentinelChartColors,
  curve = 'catmullRom',
  offsetType = 'silhouette',
  fillOpacity = 0.85,
  borderWidth = 0,
  enableGridX = true,
  enableGridY = false,
  className = ''
}: StreamChartProps) {
  const getClassName = (): string => {
    const classes = [styles.container];
    if (className) classes.push(className);
    return classes.join(' ');
  };

  if (!data || data.length === 0) {
    return (
      <div className={getClassName()} style={{ height: `${height}px` }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: 'var(--sentinel-text-tertiary)',
          fontFamily: 'var(--sentinel-font-primary)',
          fontSize: '14px'
        }}>
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className={getClassName()} style={{ height: `${height}px` }}>
      <ResponsiveStream
        data={data}
        keys={keys}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        colors={colors}
        curve={curve}
        offsetType={offsetType}
        fillOpacity={fillOpacity}
        borderWidth={borderWidth}
        borderColor={{ from: 'color', modifiers: [['darker', 1]] }}
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
        enableGridX={enableGridX}
        enableGridY={enableGridY}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            translateX: 100,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: '#888888',
            symbolSize: 12,
            symbolShape: 'circle'
          }
        ]}
        animate={true}
        motionConfig="gentle"
        theme={sentinelChartTheme}
      />
    </div>
  );
}
