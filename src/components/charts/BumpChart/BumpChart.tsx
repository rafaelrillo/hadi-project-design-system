// Path: src/components/charts/BumpChart/BumpChart.tsx
import { ResponsiveBump, type BumpDatum, type BumpSerie } from '@nivo/bump';
import { sentinelChartTheme, sentinelChartColors } from '../theme';
import styles from './BumpChart.module.css';

export type BumpSeriesData = BumpDatum;
export type BumpSeries = BumpSerie<BumpDatum, Record<string, unknown>>;

export interface BumpChartProps {
  data: BumpSeries[];
  height?: number;
  colors?: string[];
  lineWidth?: number;
  activeLineWidth?: number;
  inactiveLineWidth?: number;
  pointSize?: number;
  activePointSize?: number;
  inactivePointSize?: number;
  enableGridX?: boolean;
  enableGridY?: boolean;
  className?: string;
}

export function BumpChart({
  data,
  height = 350,
  colors = sentinelChartColors,
  lineWidth = 3,
  activeLineWidth = 6,
  inactiveLineWidth = 1,
  pointSize = 10,
  activePointSize = 16,
  inactivePointSize = 0,
  enableGridX = true,
  enableGridY = false,
  className = ''
}: BumpChartProps) {
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
      <ResponsiveBump
        data={data}
        margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
        colors={colors}
        lineWidth={lineWidth}
        activeLineWidth={activeLineWidth}
        inactiveLineWidth={inactiveLineWidth}
        pointSize={pointSize}
        activePointSize={activePointSize}
        inactivePointSize={inactivePointSize}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={3}
        pointBorderColor={{ from: 'serie.color' }}
        axisTop={null}
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
        animate={true}
        motionConfig="gentle"
        theme={sentinelChartTheme}
      />
    </div>
  );
}
