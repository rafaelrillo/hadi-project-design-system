// Path: src/components/atoms/sentinel/InsetContainer/InsetContainer.tsx
// SENTINEL Design System - INSET Level Component
// Part of 3-Level Hierarchy: RAISED → INSET → GLASS

import type { ReactNode, CSSProperties } from 'react';
import styles from './InsetContainer.module.css';

export type InsetLevel = 1 | 2 | 3;
export type InsetVariant = 'default' | 'circle' | 'pill';

export interface InsetContainerProps {
  /** Inset depth level (1-3) - controls shadow intensity */
  level?: InsetLevel;
  /** Shape variant */
  variant?: InsetVariant;
  /** Content to render inside the inset area */
  children?: ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** HTML element to render as */
  as?: 'div' | 'section' | 'aside' | 'nav';
}

const levelClassMap: Record<InsetLevel, string> = {
  1: 'level1',
  2: 'level2',
  3: 'level3',
};

const paddingClassMap: Record<string, string> = {
  none: 'paddingNone',
  sm: 'paddingSm',
  md: 'paddingMd',
  lg: 'paddingLg',
};

export function InsetContainer({
  level = 2,
  variant = 'default',
  children,
  className = '',
  style,
  padding = 'md',
  as: Component = 'div',
}: InsetContainerProps) {
  const containerClasses = [
    styles.container,
    styles[levelClassMap[level]],
    styles[variant],
    styles[paddingClassMap[padding]],
    className,
  ].filter(Boolean).join(' ');

  return (
    <Component className={containerClasses} style={style}>
      {children}
    </Component>
  );
}

export default InsetContainer;
