// Path: src/components/charts/HeatMap/HeatMap.tsx
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { sentinelChartTheme } from '../theme';
import styles from './HeatMap.module.css';

export interface HeatMapDataItem {
  id: string;
  data: Array<{ x: string; y: number | null }>;
}

export interface HeatMapProps {
  data: HeatMapDataItem[];
  height?: number;
  colorScheme?: 'oranges' | 'greens' | 'blues' | 'greys';
  enableLabels?: boolean;
  className?: string;
}

const colorSchemes = {
  oranges: {
    type: 'quantize' as const,
    colors: ['#1a1a1a', '#4d2600', '#993d00', '#cc5200', '#FF6600']
  },
  greens: {
    type: 'quantize' as const,
    colors: ['#1a1a1a', '#003d00', '#006600', '#00b300', '#00FF41']
  },
  blues: {
    type: 'quantize' as const,
    colors: ['#1a1a1a', '#003366', '#004d99', '#0080cc', '#00BFFF']
  },
  greys: {
    type: 'quantize' as const,
    colors: ['#1a1a1a', '#333333', '#555555', '#888888', '#cccccc']
  }
};

export function HeatMap({
  data,
  height = 300,
  colorScheme = 'oranges',
  enableLabels = true,
  className = ''
}: HeatMapProps) {
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
      <ResponsiveHeatMap
        data={data}
        margin={{ top: 60, right: 60, bottom: 60, left: 60 }}
        valueFormat=">-.0f"
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: '',
          legendOffset: 46
        }}
        axisRight={null}
        axisBottom={null}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: -50
        }}
        colors={colorSchemes[colorScheme]}
        emptyColor="#1a1a1a"
        inactiveOpacity={0.4}
        borderWidth={1}
        borderColor="#000000"
        enableLabels={enableLabels}
        labelTextColor={{ from: 'color', modifiers: [['brighter', 3]] }}
        animate={true}
        motionConfig="gentle"
        hoverTarget="cell"
        theme={sentinelChartTheme}
      />
    </div>
  );
}
