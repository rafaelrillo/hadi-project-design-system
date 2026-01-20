// Path: src/pages/app/SettingsPage/SettingsPage.tsx
// FING Settings Page with Material Theming

import { Settings } from 'lucide-react';
import { MaterialSelector } from '@/components/organisms/settings/MaterialSelector';
import styles from './SettingsPage.module.css';

export function SettingsPage() {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <Settings size={24} />
        </div>
        <div className={styles.headerText}>
          <h1 className={styles.title}>Settings</h1>
          <p className={styles.subtitle}>Configure app appearance and preferences</p>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Appearance Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Appearance</h2>
            <p className={styles.sectionDescription}>
              Customize the look and feel of the application
            </p>
          </div>

          <div className={styles.card}>
            <MaterialSelector />
          </div>
        </section>
      </div>
    </div>
  );
}

export default SettingsPage;
