// Path: src/layouts/QuafiDashboard/QuafiDashboard.tsx
import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { AtmosphericBackground } from '../../components/atoms/quafi';
import styles from './QuafiDashboard.module.css';

export interface QuafiDashboardProps {
  children?: ReactNode;
  sidebar?: ReactNode;
  header?: ReactNode;
  primaryIndicators?: ReactNode;
  atmosphereVariant?: 'default' | 'subtle' | 'intense';
  atmosphereAnimated?: boolean;
}

export function QuafiDashboard({
  children,
  sidebar,
  header,
  primaryIndicators,
  atmosphereVariant = 'default',
  atmosphereAnimated = true,
}: QuafiDashboardProps) {
  return (
    <AtmosphericBackground
      variant={atmosphereVariant}
      animated={atmosphereAnimated}
    >
      <div className={styles.layout}>
        {/* Sidebar */}
        {sidebar && (
          <aside className={styles.sidebar}>
            {sidebar}
          </aside>
        )}

        {/* Main content area */}
        <div className={styles.main}>
          {/* Header */}
          {header && (
            <header className={styles.header}>
              {header}
            </header>
          )}

          {/* Primary Indicators Bar */}
          {primaryIndicators && (
            <div className={styles.indicatorsBar}>
              {primaryIndicators}
            </div>
          )}

          {/* Content */}
          <main className={styles.content}>
            <div className={styles.contentInner}>
              {children || <Outlet />}
            </div>
          </main>
        </div>
      </div>
    </AtmosphericBackground>
  );
}

export default QuafiDashboard;
