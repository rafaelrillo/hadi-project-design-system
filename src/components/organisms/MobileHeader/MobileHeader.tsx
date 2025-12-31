// Path: src/components/organisms/MobileHeader/MobileHeader.tsx
import React from 'react';
import { Menu, ChevronLeft } from 'lucide-react';
import styles from './MobileHeader.module.css';

export interface MobileHeaderProps {
  /** Current section title */
  title?: string;
  /** Show back button instead of logo */
  showBack?: boolean;
  /** Back button handler */
  onBack?: () => void;
  /** Menu button handler */
  onMenuClick?: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  title,
  showBack = false,
  onBack,
  onMenuClick,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {showBack ? (
          <button
            className={styles.iconButton}
            onClick={onBack}
            aria-label="Go back"
          >
            <ChevronLeft size={24} />
          </button>
        ) : (
          <div className={styles.brand}>
            <img
              src="/sentinel-favicon.svg"
              alt="Sentinel"
              className={styles.logo}
            />
          </div>
        )}
      </div>

      {title && (
        <h1 className={styles.title}>{title}</h1>
      )}

      <div className={styles.right}>
        <button
          className={styles.iconButton}
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </div>
    </header>
  );
};

export default MobileHeader;
