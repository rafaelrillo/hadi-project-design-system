// Path: src/layouts/MobileLayout/MobileLayout.tsx
import React, { useState } from 'react';
import { MobileHeader } from '../../components/organisms/MobileHeader';
import { BottomNavigation } from '../../components/organisms/BottomNavigation';
import { MoreMenu } from '../../components/organisms/MoreMenu';
import styles from './MobileLayout.module.css';

export interface MobileLayoutProps {
  children: React.ReactNode;
  /** Page title for header */
  title?: string;
  /** Show back button */
  showBack?: boolean;
  /** Back handler */
  onBack?: () => void;
  /** Show bottom navigation */
  showBottomNav?: boolean;
  /** Logout handler */
  onLogout?: () => void;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  title,
  showBack = false,
  onBack,
  showBottomNav = true,
  onLogout,
}) => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <MobileHeader
        title={title}
        showBack={showBack}
        onBack={onBack}
        onMenuClick={() => setIsMoreMenuOpen(true)}
      />

      <main className={`${styles.content} ${showBottomNav ? styles.withBottomNav : ''}`}>
        {children}
      </main>

      {showBottomNav && (
        <BottomNavigation />
      )}

      <MoreMenu
        isOpen={isMoreMenuOpen}
        onClose={() => setIsMoreMenuOpen(false)}
        onLogout={onLogout}
      />
    </div>
  );
};

export default MobileLayout;
