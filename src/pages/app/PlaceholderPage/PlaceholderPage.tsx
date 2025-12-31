// Path: src/pages/app/PlaceholderPage/PlaceholderPage.tsx
// Simple placeholder page for demo purposes

import type { LucideIcon } from 'lucide-react';
import styles from './PlaceholderPage.module.css';

export interface PlaceholderPageProps {
  title: string;
  icon: LucideIcon;
  description?: string;
}

export function PlaceholderPage({ title, icon: Icon, description }: PlaceholderPageProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <Icon size={48} />
        </div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>
          {description || 'Coming soon...'}
        </p>
      </div>
    </div>
  );
}
