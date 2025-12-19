// Path: src/components/organisms/Modal/Modal.tsx
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './Modal.module.css';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  variant?: 'center' | 'drawer';
  maxWidth?: string;
  className?: string;
}

const getClassName = (...classes: (string | undefined | false)[]) =>
  classes.filter(Boolean).join(' ');

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  variant = 'center',
  maxWidth,
  className
}: ModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={getClassName(
        styles.overlay,
        variant === 'center' && styles.overlayCenter,
        variant === 'drawer' && styles.overlayDrawer
      )}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={getClassName(
          styles.modal,
          variant === 'center' && styles.modalCenter,
          variant === 'drawer' && styles.modalDrawer,
          className
        )}
        style={variant === 'center' && maxWidth ? { maxWidth } : undefined}
      >
        {/* Header */}
        <div className={styles.header}>
          <h1 id="modal-title" className={styles.title}>
            {title}
          </h1>
          <button
            type="button"
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Cerrar modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>{children}</div>

        {/* Footer */}
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
}
