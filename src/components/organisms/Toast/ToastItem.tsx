// Path: src/components/organisms/Toast/ToastItem.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
} from 'lucide-react';
import type { ToastItemProps, ToastType } from './types';
import styles from './Toast.module.css';

/* ═══════════════════════════════════════════════════════════════════════════════
   TOAST ITEM
   Individual toast notification component
   ═══════════════════════════════════════════════════════════════════════════════ */

// Get icon based on toast type
function getTypeIcon(type: ToastType): React.ReactNode {
  switch (type) {
    case 'success':
      return <CheckCircle size={20} />;
    case 'error':
      return <AlertCircle size={20} />;
    case 'warning':
      return <AlertTriangle size={20} />;
    case 'info':
      return <Info size={20} />;
    default:
      return null;
  }
}

export function ToastItem({ toast, onDismiss, position }: ToastItemProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Animation on mount
  useEffect(() => {
    // Small delay to trigger enter animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  // Handle dismiss with exit animation
  const handleDismiss = useCallback(() => {
    setIsExiting(true);

    // Wait for exit animation before removing
    setTimeout(() => {
      onDismiss(toast.id);
    }, 200); // Match CSS animation duration
  }, [onDismiss, toast.id]);

  // Get type classes
  const getTypeClass = (): string => {
    switch (toast.type) {
      case 'success':
        return styles.typeSuccess;
      case 'error':
        return styles.typeError;
      case 'warning':
        return styles.typeWarning;
      case 'info':
        return styles.typeInfo;
      default:
        return styles.typeDefault;
    }
  };

  // Get animation classes based on position
  const getAnimationClass = (): string => {
    if (isExiting) {
      if (position.includes('left')) return styles.exitLeft;
      if (position.includes('right')) return styles.exitRight;
      return styles.exitCenter;
    }

    if (!isVisible) return styles.hidden;

    if (position.includes('left')) return styles.enterLeft;
    if (position.includes('right')) return styles.enterRight;
    return styles.enterCenter;
  };

  // Determine icon to show
  const icon = toast.icon ?? getTypeIcon(toast.type ?? 'default');

  return (
    <div
      className={`${styles.toast} ${getTypeClass()} ${getAnimationClass()}`}
      role="alert"
      aria-live={toast.type === 'error' ? 'assertive' : 'polite'}
    >
      {/* Icon */}
      {icon && <div className={styles.toastIcon}>{icon}</div>}

      {/* Content */}
      <div className={styles.toastContent}>
        <p className={styles.toastTitle}>{toast.title}</p>
        {toast.description && (
          <p className={styles.toastDescription}>{toast.description}</p>
        )}

        {/* Action button */}
        {toast.action && (
          <button
            type="button"
            className={styles.toastAction}
            onClick={() => {
              toast.action?.onClick();
              handleDismiss();
            }}
          >
            {toast.action.label}
          </button>
        )}
      </div>

      {/* Dismiss button */}
      {toast.dismissible && (
        <button
          type="button"
          className={styles.toastDismiss}
          onClick={handleDismiss}
          aria-label="Cerrar notificación"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
