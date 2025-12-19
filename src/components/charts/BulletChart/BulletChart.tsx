// src/components/charts/BulletChart/BulletChart.tsx
import { ResponsiveBullet } from '@nivo/bullet';
import { terminalChartTheme } from '../theme';
import styles from './BulletChart.module.css';

export interface BulletDatum {
  id: string;
  title?: string;
  subtitle?: string;
  ranges: number[];
  measures: number[];
  markers?: number[];
}

export interface BulletChartProps {
  data: BulletDatum[];
  height?: number;
  layout?: 'horizontal' | 'vertical';
  spacing?: number;
  titleAlign?: 'start' | 'middle' | 'end';
  rangeColors?: string[];
  measureColors?: string[];
  markerColors?: string[];
  className?: string;
}

export function BulletChart({
  data,
  height = 200,
  layout = 'horizontal',
  spacing = 46,
  titleAlign = 'start',
  rangeColors = ['#1a1a1a', '#333333', '#444444'],
  measureColors = ['#FF6600'],
  markerColors = ['#00FF41'],
  className = ''
}: BulletChartProps) {
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
      <ResponsiveBullet
        data={data}
        margin={{ top: 30, right: 30, bottom: 30, left: 100 }}
        layout={layout}
        spacing={spacing}
        titleAlign={titleAlign}
        titleOffsetX={-80}
        measureSize={0.3}
        rangeColors={rangeColors}
        measureColors={measureColors}
        markerColors={markerColors}
        markerSize={0.8}
        animate={true}
        motionConfig="gentle"
        theme={terminalChartTheme}
      />
    </div>
  );
}
