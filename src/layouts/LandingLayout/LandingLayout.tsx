// src/layouts/LandingLayout/LandingLayout.tsx
import { ReactNode } from 'react';
import styles from './LandingLayout.module.css';
import crtStyles from '../../styles/effects/crt.module.css';

export interface LandingLayoutProps {
  children: ReactNode;
  crtEffects?: boolean;
}

export function LandingLayout({
  children,
  crtEffects = true
}: LandingLayoutProps) {
  const getClassName = (): string => {
    const classes = [styles.layout];
    if (crtEffects) {
      classes.push(crtStyles.scanlines);
      classes.push(crtStyles.vignette);
    }
    return classes.join(' ');
  };

  return (
    <div className={getClassName()}>
      <div className={styles.backgroundPattern} />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
