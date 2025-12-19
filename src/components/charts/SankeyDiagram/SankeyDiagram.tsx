// src/components/charts/SankeyDiagram/SankeyDiagram.tsx
import { ResponsiveSankey } from '@nivo/sankey';
import { terminalChartTheme, terminalChartColors } from '../theme';
import styles from './SankeyDiagram.module.css';

export interface SankeyNode {
  id: string;
  nodeColor?: string;
}

export interface SankeyLink {
  source: string;
  target: string;
  value: number;
}

export interface SankeyData {
  nodes: SankeyNode[];
  links: SankeyLink[];
}

export interface SankeyDiagramProps {
  data: SankeyData;
  height?: number;
  colors?: string[];
  layout?: 'horizontal' | 'vertical';
  nodeThickness?: number;
  nodeSpacing?: number;
  nodeBorderWidth?: number;
  linkOpacity?: number;
  enableLinkGradient?: boolean;
  enableLabels?: boolean;
  className?: string;
}

export function SankeyDiagram({
  data,
  height = 400,
  colors = terminalChartColors,
  layout = 'horizontal',
  nodeThickness = 18,
  nodeSpacing = 24,
  nodeBorderWidth = 0,
  linkOpacity = 0.5,
  enableLinkGradient = true,
  enableLabels: _enableLabels = true,
  className = ''
}: SankeyDiagramProps) {
  const getClassName = (): string => {
    const classes = [styles.container];
    if (className) classes.push(className);
    return classes.join(' ');
  };

  if (!data || !data.nodes || data.nodes.length === 0) {
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
      <ResponsiveSankey
        data={data}
        margin={{ top: 20, right: 140, bottom: 20, left: 20 }}
        layout={layout}
        align="justify"
        colors={colors}
        nodeThickness={nodeThickness}
        nodeSpacing={nodeSpacing}
        nodeInnerPadding={3}
        nodeBorderWidth={nodeBorderWidth}
        nodeBorderColor={{ from: 'color', modifiers: [['darker', 0.8]] }}
        linkOpacity={linkOpacity}
        linkHoverOpacity={0.8}
        linkHoverOthersOpacity={0.1}
        enableLinkGradient={enableLinkGradient}
        labelPosition="outside"
        labelOrientation={layout === 'horizontal' ? 'vertical' : 'horizontal'}
        labelPadding={16}
        labelTextColor={{ from: 'color', modifiers: [['brighter', 1]] }}
        animate={true}
        motionConfig="gentle"
        theme={terminalChartTheme}
      />
    </div>
  );
}
