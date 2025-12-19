// src/components/charts/LineChart/LineChart.tsx
import { ResponsiveLine } from '@nivo/line';
import type { LineSeries } from '@nivo/line';
import { terminalChartTheme, terminalChartColors } from '../theme';
import styles from './LineChart.module.css';

export interface LineChartProps {
  data: LineSeries[];
  height?: number;
  enableArea?: boolean;
  enablePoints?: boolean;
  className?: string;
}

export function LineChart({
  data,
  height = 300,
  enableArea = true,
  enablePoints = true,
  className = ''
}: LineChartProps) {
  const getClassName = (): string => {
    const classes = [styles.container];
    if (className) classes.push(className);
    return classes.join(' ');
  };

  // Ensure data is valid
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
      <ResponsiveLine
        data={data}
        colors={terminalChartColors}
        margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
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
        theme={terminalChartTheme}
        pointSize={enablePoints ? 8 : 0}
        pointColor={{ from: 'serieColor' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        enableArea={enableArea}
        areaOpacity={0.1}
        useMesh={true}
      />
    </div>
  );
}
