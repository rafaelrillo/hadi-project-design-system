// Path: src/components/organisms/BottomSheet/BottomSheet.tsx
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import styles from './BottomSheet.module.css';

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  /** Height: 'auto' | 'half' | 'full' */
  height?: 'auto' | 'half' | 'full';
  /** Show drag handle indicator */
  showHandle?: boolean;
  /** Show close button */
  showClose?: boolean;
  /** Close on backdrop click */
  closeOnBackdrop?: boolean;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
  height = 'auto',
  showHandle = true,
  showClose = true,
  closeOnBackdrop = true,
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const content = (
    <div className={styles.overlay} onClick={closeOnBackdrop ? onClose : undefined}>
      <div
        ref={sheetRef}
        className={`${styles.sheet} ${styles[height]}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'bottom-sheet-title' : undefined}
      >
        {showHandle && <div className={styles.handle} />}

        {(title || showClose) && (
          <div className={styles.header}>
            {title && (
              <h2 id="bottom-sheet-title" className={styles.title}>
                {title}
              </h2>
            )}
            {showClose && (
              <button
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}

        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

export default BottomSheet;
