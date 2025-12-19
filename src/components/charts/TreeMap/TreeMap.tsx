// src/components/charts/TreeMap/TreeMap.tsx
import { ResponsiveTreeMap } from '@nivo/treemap';
import { terminalChartTheme, terminalChartColors } from '../theme';
import styles from './TreeMap.module.css';

export interface TreeMapNode {
  name: string;
  value?: number;
  color?: string;
  children?: TreeMapNode[];
}

export interface TreeMapProps {
  data: TreeMapNode;
  height?: number;
  colors?: string[];
  tile?: 'binary' | 'squarify' | 'slice' | 'dice' | 'sliceDice';
  innerPadding?: number;
  outerPadding?: number;
  enableLabels?: boolean;
  enableParentLabel?: boolean;
  borderWidth?: number;
  className?: string;
}

export function TreeMap({
  data,
  height = 400,
  colors = terminalChartColors,
  tile = 'squarify',
  innerPadding = 2,
  outerPadding = 2,
  enableLabels = true,
  enableParentLabel = true,
  borderWidth = 1,
  className = ''
}: TreeMapProps) {
  const getClassName = (): string => {
    const classes = [styles.container];
    if (className) classes.push(className);
    return classes.join(' ');
  };

  if (!data || !data.children || data.children.length === 0) {
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
      <ResponsiveTreeMap
        data={data}
        identity="name"
        value="value"
        tile={tile}
        innerPadding={innerPadding}
        outerPadding={outerPadding}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        colors={colors}
        borderWidth={borderWidth}
        borderColor={{ from: 'color', modifiers: [['darker', 0.5]] }}
        enableLabel={enableLabels}
        labelSkipSize={12}
        labelTextColor={{ from: 'color', modifiers: [['brighter', 2]] }}
        enableParentLabel={enableParentLabel}
        parentLabelSize={16}
        parentLabelTextColor={{ from: 'color', modifiers: [['brighter', 2]] }}
        animate={true}
        motionConfig="gentle"
        theme={terminalChartTheme}
      />
    </div>
  );
}
