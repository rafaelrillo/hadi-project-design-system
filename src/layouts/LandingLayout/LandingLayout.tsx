// src/layouts/LandingLayout/LandingLayout.tsx
import { ReactNode } from 'react';
import styles from './LandingLayout.module.css';

export interface LandingLayoutProps {
  children: ReactNode;
}

export function LandingLayout({
  children
}: LandingLayoutProps) {
  return (
    <div className={styles.layout}>
      <div className={styles.backgroundPattern} />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
