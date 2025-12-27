// Path: src/components/organisms/Toast/ToastContainer.tsx
import { createPortal } from 'react-dom';
import type { Toast, ToastPosition } from './types';
import { ToastItem } from './ToastItem';
import styles from './Toast.module.css';

/* ═══════════════════════════════════════════════════════════════════════════════
   TOAST CONTAINER
   Portal container that renders all active toasts
   ═══════════════════════════════════════════════════════════════════════════════ */

interface ToastContainerProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
  position: ToastPosition;
  gap: number;
}

export function ToastContainer({
  toasts,
  onDismiss,
  position,
  gap,
}: ToastContainerProps) {
  // Don't render if no toasts
  if (toasts.length === 0) return null;

  // Get position classes
  const getPositionClasses = (): string => {
    const classes = [styles.toastContainer];

    switch (position) {
      case 'top-left':
        classes.push(styles.positionTopLeft);
        break;
      case 'top-center':
        classes.push(styles.positionTopCenter);
        break;
      case 'top-right':
        classes.push(styles.positionTopRight);
        break;
      case 'bottom-left':
        classes.push(styles.positionBottomLeft);
        break;
      case 'bottom-center':
        classes.push(styles.positionBottomCenter);
        break;
      case 'bottom-right':
      default:
        classes.push(styles.positionBottomRight);
        break;
    }

    return classes.join(' ');
  };

  // Determine if toasts should stack upward or downward
  const isTopPosition = position.startsWith('top');

  // Sort toasts based on position (newest on top for bottom positions, newest on bottom for top)
  const sortedToasts = isTopPosition
    ? [...toasts].sort((a, b) => a.createdAt - b.createdAt)
    : [...toasts].sort((a, b) => b.createdAt - a.createdAt);

  const containerContent = (
    <div
      className={getPositionClasses()}
      style={{ gap: `${gap}px` }}
      role="region"
      aria-label="Notificaciones"
      aria-live="polite"
    >
      {sortedToasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onDismiss={onDismiss}
          position={position}
        />
      ))}
    </div>
  );

  // Render in portal
  return createPortal(containerContent, document.body);
}
