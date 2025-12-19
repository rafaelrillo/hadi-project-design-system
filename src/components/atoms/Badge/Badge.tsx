// Path: src/components/atoms/Badge/Badge.tsx
import React from 'react';
import styles from './Badge.module.css';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'error' | 'warning' | 'info' | 'neutral';
  ariaLabel?: string;
}

export function Badge({ children, variant = 'neutral', ariaLabel }: BadgeProps) {
  const getClassName = (): string => {
    const classes = [styles.badge];

    if (variant === 'success') {
      classes.push(styles.success);
    } else if (variant === 'error') {
      classes.push(styles.error);
    } else if (variant === 'warning') {
      classes.push(styles.warning);
    } else if (variant === 'info') {
      classes.push(styles.info);
    } else if (variant === 'neutral') {
      classes.push(styles.neutral);
    }

    return classes.join(' ');
  };

  return (
    <span
      aria-label={ariaLabel}
      role="status"
      className={getClassName()}
    >
      {children}
    </span>
  );
}
