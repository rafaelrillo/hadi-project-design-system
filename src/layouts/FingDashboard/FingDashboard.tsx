// Path: src/layouts/FingDashboard/FingDashboard.tsx
import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { AtmosphericBackground } from '../../components/atoms/fing';
import styles from './FingDashboard.module.css';

export interface FingDashboardProps {
  children?: ReactNode;
  sidebar?: ReactNode;
  header?: ReactNode;
  primaryIndicators?: ReactNode;
  atmosphereVariant?: 'default' | 'subtle' | 'intense';
  atmosphereAnimated?: boolean;
}

export function FingDashboard({
  children,
  sidebar,
  header,
  primaryIndicators,
  atmosphereVariant = 'default',
  atmosphereAnimated = true,
}: FingDashboardProps) {
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

export default FingDashboard;
