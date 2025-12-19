// src/components/terminal/AsciiBox/AsciiBox.tsx
import { ReactNode } from 'react';
import styles from './AsciiBox.module.css';

export interface AsciiBoxProps {
  title?: string;
  children: ReactNode;
  variant?: 'single' | 'double' | 'rounded';
  className?: string;
}

export function AsciiBox({
  title,
  children,
  variant = 'single',
  className = ''
}: AsciiBoxProps) {
  const getClassName = (): string => {
    const classes = [styles.box, styles[variant]];
    if (className) classes.push(className);
    return classes.join(' ');
  };

  const chars = {
    single: { tl: '\u250c', tr: '\u2510', bl: '\u2514', br: '\u2518', h: '\u2500', v: '\u2502' },
    double: { tl: '\u2554', tr: '\u2557', bl: '\u255a', br: '\u255d', h: '\u2550', v: '\u2551' },
    rounded: { tl: '\u256d', tr: '\u256e', bl: '\u2570', br: '\u256f', h: '\u2500', v: '\u2502' }
  };

  const c = chars[variant];

  return (
    <div className={getClassName()}>
      <div className={styles.borderTop}>
        <span>{c.tl}</span>
        {title && <span className={styles.title}> {title} </span>}
        <span className={styles.line}></span>
        <span>{c.tr}</span>
      </div>
      <div className={styles.middle}>
        <span className={styles.borderLeft}>{c.v}</span>
        <div className={styles.content}>{children}</div>
        <span className={styles.borderRight}>{c.v}</span>
      </div>
      <div className={styles.borderBottom}>
        <span>{c.bl}</span>
        <span className={styles.line}></span>
        <span>{c.br}</span>
      </div>
    </div>
  );
}
