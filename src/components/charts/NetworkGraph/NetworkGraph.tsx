// Path: src/components/charts/NetworkGraph/NetworkGraph.tsx
import { ResponsiveNetwork } from '@nivo/network';
import { sentinelChartTheme, sentinelChartColors } from '../theme';
import styles from './NetworkGraph.module.css';

export interface NetworkNode {
  id: string;
  radius?: number;
  color?: string;
}

export interface NetworkLink {
  source: string;
  target: string;
  distance?: number;
}

export interface NetworkData {
  nodes: NetworkNode[];
  links: NetworkLink[];
}

export interface NetworkGraphProps {
  data: NetworkData;
  height?: number;
  nodeColor?: string;
  linkColor?: string;
  linkThickness?: number;
  repulsivity?: number;
  distanceMin?: number;
  distanceMax?: number;
  className?: string;
}

export function NetworkGraph({
  data,
  height = 400,
  nodeColor = sentinelChartColors[0],
  linkColor = '#333333',
  linkThickness = 2,
  repulsivity = 6,
  distanceMin: _distanceMin = 1,
  distanceMax: _distanceMax = 200,
  className = ''
}: NetworkGraphProps) {
  const getClassName = (): string => {
    const classes = [styles.container];
    if (className) classes.push(className);
    return classes.join(' ');
  };

  if (!data || !data.nodes || data.nodes.length === 0) {
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
      <ResponsiveNetwork
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        linkDistance={(e) => e.distance || 80}
        centeringStrength={0.3}
        repulsivity={repulsivity}
        iterations={60}
        nodeSize={(n) => n.radius || 12}
        activeNodeSize={(n) => (n.radius || 12) * 1.5}
        nodeColor={(n) => n.color || nodeColor}
        nodeBorderWidth={2}
        nodeBorderColor={{ from: 'color', modifiers: [['darker', 0.6]] }}
        linkColor={linkColor}
        linkThickness={linkThickness}
        linkBlendMode="normal"
        motionConfig="gentle"
        theme={sentinelChartTheme}
      />
    </div>
  );
}
