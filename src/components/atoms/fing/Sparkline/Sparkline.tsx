// Path: src/components/atoms/fing/Sparkline/Sparkline.tsx

import { useMemo } from 'react';
import styles from './Sparkline.module.css';

export interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  strokeWidth?: number;
  color?: 'auto' | 'accent' | 'positive' | 'negative' | 'neutral';
  showDot?: boolean;
  filled?: boolean;
  className?: string;
}

export function Sparkline({
  data,
  width = 80,
  height = 24,
  strokeWidth = 1.5,
  color = 'auto',
  showDot = true,
  filled = false,
  className = '',
}: SparklineProps) {
  const pathData = useMemo(() => {
    if (data.length < 2) return { path: '', fillPath: '', lastPoint: null };

    const padding = 2;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const points = data.map((value, index) => {
      const x = padding + (index / (data.length - 1)) * chartWidth;
      const y = padding + chartHeight - ((value - min) / range) * chartHeight;
      return { x, y };
    });

    // Create path
    const path = points
      .map((point, i) => `${i === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`)
      .join(' ');

    // Create fill path (closed polygon)
    const fillPath = filled
      ? `${path} L ${points[points.length - 1].x.toFixed(2)} ${height - padding} L ${padding} ${height - padding} Z`
      : '';

    const lastPoint = points[points.length - 1];

    return { path, fillPath, lastPoint };
  }, [data, width, height, filled]);

  // Determine color based on trend
  const trendColor = useMemo(() => {
    if (color !== 'auto') return color;
    if (data.length < 2) return 'neutral';
    return data[data.length - 1] >= data[0] ? 'positive' : 'negative';
  }, [data, color]);

  const containerClasses = [
    styles.sparkline,
    styles[trendColor],
    className,
  ].filter(Boolean).join(' ');

  if (data.length < 2) {
    return (
      <div className={containerClasses} style={{ width, height }}>
        <span className={styles.noData}>—</span>
      </div>
    );
  }

  return (
    <svg
      className={containerClasses}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      {/* Fill area */}
      {filled && pathData.fillPath && (
        <path
          className={styles.fill}
          d={pathData.fillPath}
        />
      )}

      {/* Line */}
      <path
        className={styles.line}
        d={pathData.path}
        strokeWidth={strokeWidth}
        fill="none"
      />

      {/* End dot */}
      {showDot && pathData.lastPoint && (
        <circle
          className={styles.dot}
          cx={pathData.lastPoint.x}
          cy={pathData.lastPoint.y}
          r={2.5}
        />
      )}
    </svg>
  );
}

export default Sparkline;
