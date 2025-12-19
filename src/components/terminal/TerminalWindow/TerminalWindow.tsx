// src/components/terminal/TerminalWindow/TerminalWindow.tsx
import { ReactNode } from 'react';
import styles from './TerminalWindow.module.css';

export interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
  showControls?: boolean;
}

export function TerminalWindow({
  title = 'terminal',
  children,
  className = '',
  showControls = true
}: TerminalWindowProps) {
  const getClassName = (): string => {
    const classes = [styles.window];
    if (className) classes.push(className);
    return classes.join(' ');
  };

  return (
    <div className={getClassName()}>
      <div className={styles.header}>
        {showControls && (
          <div className={styles.controls}>
            <span className={styles.dot} data-color="red" />
            <span className={styles.dot} data-color="yellow" />
            <span className={styles.dot} data-color="green" />
          </div>
        )}
        <span className={styles.title}>{title}</span>
        <div className={styles.spacer} />
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
