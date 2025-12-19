// src/layouts/DashboardLayout/DashboardLayout.tsx
import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './DashboardLayout.module.css';

export interface DashboardLayoutProps {
  children?: ReactNode;
  sidebar?: ReactNode;
}

export function DashboardLayout({ children, sidebar }: DashboardLayoutProps) {
  return (
    <div className={styles.layout}>
      {sidebar && <aside className={styles.sidebar}>{sidebar}</aside>}
      <main className={styles.main}>
        <div className={styles.content}>
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
}
