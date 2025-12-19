// src/components/charts/RadialBar/RadialBar.tsx
import { ResponsiveRadialBar } from '@nivo/radial-bar';
import { terminalChartTheme, terminalChartColors } from '../theme';
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
  colors = terminalChartColors,
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
      <div className={getClassName()} style={{ height }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: '#888888',
          fontSize: '14px'
        }}>
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className={getClassName()} style={{ height }}>
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
        theme={terminalChartTheme}
      />
    </div>
  );
}
