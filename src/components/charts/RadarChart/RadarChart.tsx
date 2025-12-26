// Path: src/components/charts/RadarChart/RadarChart.tsx
// SENTINEL Design System - Radar Chart
import { ResponsiveRadar } from '@nivo/radar';
import { sentinelChartTheme, sentinelChartColors } from '../theme';
import styles from './RadarChart.module.css';

export interface RadarChartProps {
  data: Array<Record<string, string | number>>;
  keys: string[];
  indexBy: string;
  height?: number;
  colors?: string[];
  fillOpacity?: number;
  dotSize?: number;
  enableDots?: boolean;
  className?: string;
}

export function RadarChart({
  data,
  keys,
  indexBy,
  height = 300,
  colors = sentinelChartColors,
  fillOpacity = 0.25,
  dotSize = 8,
  enableDots = true,
  className = ''
}: RadarChartProps) {
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
      <ResponsiveRadar
        data={data}
        keys={keys}
        indexBy={indexBy}
        maxValue="auto"
        margin={{ top: 40, right: 60, bottom: 40, left: 60 }}
        curve="linearClosed"
        borderWidth={2}
        borderColor={{ from: 'color' }}
        gridLevels={5}
        gridShape="circular"
        gridLabelOffset={16}
        enableDots={enableDots}
        dotSize={dotSize}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        dotBorderColor={{ from: 'color' }}
        colors={colors}
        fillOpacity={fillOpacity}
        blendMode="normal"
        animate={true}
        motionConfig="gentle"
        theme={sentinelChartTheme}
      />
    </div>
  );
}
