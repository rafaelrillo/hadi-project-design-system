// src/components/charts/ScatterPlot/ScatterPlot.tsx
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import { terminalChartTheme, terminalChartColors } from '../theme';
import styles from './ScatterPlot.module.css';

export interface ScatterPlotDatum {
  x: number;
  y: number;
}

export interface ScatterPlotSeries {
  id: string;
  data: ScatterPlotDatum[];
}

export interface ScatterPlotProps {
  data: ScatterPlotSeries[];
  height?: number;
  colors?: string[];
  nodeSize?: number;
  enableGridX?: boolean;
  enableGridY?: boolean;
  axisBottomLabel?: string;
  axisLeftLabel?: string;
  className?: string;
}

export function ScatterPlot({
  data,
  height = 350,
  colors = terminalChartColors,
  nodeSize = 10,
  enableGridX = true,
  enableGridY = true,
  axisBottomLabel,
  axisLeftLabel,
  className = ''
}: ScatterPlotProps) {
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
      <ResponsiveScatterPlot
        data={data}
        margin={{ top: 20, right: 20, bottom: 70, left: 70 }}
        colors={colors}
        xScale={{ type: 'linear', min: 'auto', max: 'auto' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
        nodeSize={nodeSize}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: axisBottomLabel,
          legendPosition: 'middle',
          legendOffset: 46
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: axisLeftLabel,
          legendPosition: 'middle',
          legendOffset: -46
        }}
        enableGridX={enableGridX}
        enableGridY={enableGridY}
        useMesh={true}
        animate={true}
        motionConfig="gentle"
        theme={terminalChartTheme}
      />
    </div>
  );
}
