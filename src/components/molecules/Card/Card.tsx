// Path: src/components/molecules/Card/Card.tsx
import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'neutral';
  className?: string;
}

const getClassName = (...classes: (string | undefined | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export function Card({
  children,
  header,
  footer,
  variant,
  className
}: CardProps) {
  const variantClass = variant ? {
    success: styles.variantSuccess,
    warning: styles.variantWarning,
    error: styles.variantError,
    neutral: styles.variantNeutral
  }[variant] : undefined;

  return (
    <div className={getClassName(styles.card, variantClass, className)}>
      {header && <div className={styles.header}>{header}</div>}
      {children && <div className={styles.body}>{children}</div>}
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}
