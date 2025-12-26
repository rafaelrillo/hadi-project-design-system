// Path: src/components/charts/RadialBar/RadialBar.tsx
// SENTINEL Design System - Radial Bar Chart
import { ResponsiveRadialBar } from '@nivo/radial-bar';
import { sentinelChartTheme, sentinelChartColors } from '../theme';
import styles from './RadialBar.module.css';

export interface RadialBarDataItem {
  id: string;
  data: Array<{ x: string; y: number }>;
}

export interface RadialBarProps {
  data: RadialBarDataItem[];
  height?: number;
  colors?: string[];
  maxValue?: number | 'auto';
  startAngle?: number;
  endAngle?: number;
  innerRadius?: number;
  padding?: number;
  enableTracks?: boolean;
  enableRadialGrid?: boolean;
  enableCircularGrid?: boolean;
  className?: string;
}

export function RadialBar({
  data,
  height = 300,
  colors = sentinelChartColors,
  maxValue = 'auto',
  startAngle = 0,
  endAngle = 270,
  innerRadius = 0.3,
  padding = 0.4,
  enableTracks = true,
  enableRadialGrid = true,
  enableCircularGrid = true,
  className = ''
}: RadialBarProps) {
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
          fontSize: '14px',
          fontFamily: 'var(--sentinel-font-primary)'
        }}>
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className={getClassName()} style={{ height: `${height}px` }}>
      <ResponsiveRadialBar
        data={data}
        maxValue={maxValue}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={innerRadius}
        padding={padding}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        colors={colors}
        enableTracks={enableTracks}
        tracksColor="rgba(255, 255, 255, 0.05)"
        enableRadialGrid={enableRadialGrid}
        enableCircularGrid={enableCircularGrid}
        radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
        circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
        animate={true}
        motionConfig="gentle"
        theme={sentinelChartTheme}
      />
    </div>
  );
}
