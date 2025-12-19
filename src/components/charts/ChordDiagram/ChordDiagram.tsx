// src/components/charts/ChordDiagram/ChordDiagram.tsx
import { ResponsiveChord } from '@nivo/chord';
import { terminalChartTheme, terminalChartColors } from '../theme';
import styles from './ChordDiagram.module.css';

export interface ChordDiagramProps {
  matrix: number[][];
  keys: string[];
  height?: number;
  colors?: string[];
  innerRadiusRatio?: number;
  innerRadiusOffset?: number;
  padAngle?: number;
  arcOpacity?: number;
  ribbonOpacity?: number;
  enableLabel?: boolean;
  className?: string;
}

export function ChordDiagram({
  matrix,
  keys,
  height = 400,
  colors = terminalChartColors,
  innerRadiusRatio = 0.96,
  innerRadiusOffset = 0.02,
  padAngle = 0.02,
  arcOpacity = 1,
  ribbonOpacity = 0.5,
  enableLabel = true,
  className = ''
}: ChordDiagramProps) {
  const getClassName = (): string => {
    const classes = [styles.container];
    if (className) classes.push(className);
    return classes.join(' ');
  };

  if (!matrix || matrix.length === 0) {
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
      <ResponsiveChord
        data={matrix}
        keys={keys}
        margin={{ top: 60, right: 60, bottom: 60, left: 60 }}
        colors={colors}
        innerRadiusRatio={innerRadiusRatio}
        innerRadiusOffset={innerRadiusOffset}
        padAngle={padAngle}
        arcOpacity={arcOpacity}
        arcBorderWidth={1}
        arcBorderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
        ribbonOpacity={ribbonOpacity}
        ribbonBorderWidth={1}
        ribbonBorderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
        enableLabel={enableLabel}
        labelTextColor={{ from: 'color', modifiers: [['brighter', 1]] }}
        animate={true}
        motionConfig="gentle"
        theme={terminalChartTheme}
      />
    </div>
  );
}
