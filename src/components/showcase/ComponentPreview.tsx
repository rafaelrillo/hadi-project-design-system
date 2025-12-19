// Path: src/components/showcase/ComponentPreview.tsx
import React from 'react';
import styles from './ComponentPreview.module.css';

export interface ComponentPreviewProps {
  children: React.ReactNode;
  background?: 'white' | 'gray' | 'transparent';
  padding?: string;
  className?: string;
}

const getClassName = (...classes: (string | undefined | false)[]) =>
  classes.filter(Boolean).join(' ');

export function ComponentPreview({
  children,
  background = 'transparent',
  padding,
  className
}: ComponentPreviewProps) {
  const bgClass = {
    white: styles.bgWhite,
    gray: styles.bgGray,
    transparent: styles.bgTransparent
  }[background];

  return (
    <div
      className={getClassName(styles.container, bgClass, className)}
      style={padding ? { padding } : undefined}
    >
      {children}
    </div>
  );
}
