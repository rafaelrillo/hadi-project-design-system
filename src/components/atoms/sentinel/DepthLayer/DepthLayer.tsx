// Path: src/components/atoms/sentinel/DepthLayer/DepthLayer.tsx
import type { ReactNode, CSSProperties } from 'react';
import styles from './DepthLayer.module.css';

export type DepthValue = 1 | 2 | 3 | 4 | 5;

export interface DepthLayerProps {
  depth?: DepthValue;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: 'div' | 'section' | 'article' | 'aside';
}

const depthClassMap: Record<DepthValue, string> = {
  1: 'depth1',
  2: 'depth2',
  3: 'depth3',
  4: 'depth4',
  5: 'depth5',
};

export function DepthLayer({
  depth = 1,
  children,
  className = '',
  style,
  as: Component = 'div',
}: DepthLayerProps) {
  const containerClasses = [
    styles.container,
    styles[depthClassMap[depth]],
    className,
  ].filter(Boolean).join(' ');

  return (
    <Component className={containerClasses} style={style}>
      {/* Subtle border gradient overlay */}
      <div className={styles.borderGlow} aria-hidden="true" />

      {/* Content */}
      <div className={styles.content}>
        {children}
      </div>
    </Component>
  );
}

export default DepthLayer;
