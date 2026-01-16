// Path: src/components/organisms/Modal/Modal.tsx
import { useEffect, useCallback, useId, type ReactNode, type CSSProperties, type MouseEvent } from 'react';
import { X } from 'lucide-react';
import { useLightEngineOptional } from '@contexts/LightEngineContext';
import styles from './Modal.module.css';

export type ModalVariant = 'center' | 'drawer';
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';
export type ModalStyle = 'default' | 'neuPanel';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  /** Layout variant */
  variant?: ModalVariant;
  /** Size for center variant */
  size?: ModalSize;
  /** Visual style */
  modalStyle?: ModalStyle;
  /** Custom max width (overrides size) */
  maxWidth?: string;
  /** Enable dynamic shadows from Light Engine */
  dynamicShadows?: boolean;
  /** Close on overlay click */
  closeOnOverlayClick?: boolean;
  /** Close on Escape key */
  closeOnEscape?: boolean;
  /** Hide close button */
  hideCloseButton?: boolean;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  variant = 'center',
  size = 'md',
  modalStyle = 'default',
  maxWidth,
  dynamicShadows = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  hideCloseButton = false,
  className,
}: ModalProps) {
  // Generate unique ID for accessibility
  const titleId = useId();

  // Get light engine context (optional)
  const lightEngine = useLightEngineOptional();

  // Close on Escape key
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && closeOnEscape) {
        onClose();
      }
    },
    [isOpen, onClose, closeOnEscape]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  // Build overlay className
  const getOverlayClassName = (): string => {
    const classes = [styles.overlay];
    if (variant === 'center') classes.push(styles.overlayCenter);
    if (variant === 'drawer') classes.push(styles.overlayDrawer);
    return classes.join(' ');
  };

  // Build modal className
  const getModalClassName = (): string => {
    const classes = [styles.modal];

    if (variant === 'center') {
      classes.push(styles.modalCenter);
      // Size classes
      const sizeMap: Record<ModalSize, string | undefined> = {
        sm: styles.modalSm,
        md: undefined,
        lg: styles.modalLg,
        xl: styles.modalXl,
      };
      if (sizeMap[size]) classes.push(sizeMap[size]!);
    }

    if (variant === 'drawer') classes.push(styles.modalDrawer);
    if (modalStyle === 'neuPanel') classes.push(styles.neuPanel);
    if (dynamicShadows && lightEngine) classes.push(styles.dynamicShadows);
    if (className) classes.push(className);

    return classes.join(' ');
  };

  // Get dynamic shadow styles for neuPanel
  const getDynamicStyles = (): CSSProperties | undefined => {
    const baseStyles: CSSProperties = {};

    if (variant === 'center' && maxWidth) {
      baseStyles.maxWidth = maxWidth;
    }

    if (modalStyle === 'neuPanel' && dynamicShadows && lightEngine) {
      const { shadows } = lightEngine;
      return {
        ...baseStyles,
        boxShadow: `${shadows.getNeuPanelShadow(12, 24)}, inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 0 60px rgba(163, 177, 198, 0.2)`,
      };
    }

    return Object.keys(baseStyles).length > 0 ? baseStyles : undefined;
  };

  return (
    <div
      className={getOverlayClassName()}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div
        className={getModalClassName()}
        style={getDynamicStyles()}
      >
        {/* Header */}
        <div className={styles.header}>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
          {!hideCloseButton && (
            <button
              type="button"
              onClick={onClose}
              className={styles.closeButton}
              aria-label="Close modal"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Body */}
        <div className={styles.body}>{children}</div>

        {/* Footer */}
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
}
