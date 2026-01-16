// Path: src/components/organisms/Toast/ToastItem.tsx
import { useState, useEffect, useCallback, type ReactNode, type CSSProperties } from 'react';
import {
  X,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { useLightEngineOptional } from '@contexts/LightEngineContext';
import type { ToastItemProps, ToastType } from './types';
import styles from './Toast.module.css';

// Glass hue presets for semantic toast types
const GLASS_TYPE_HUES: Record<ToastType | 'default', { hue: number; sat: number }> = {
  default: { hue: 175, sat: 35 },  // Primary teal
  success: { hue: 145, sat: 45 },  // Green
  error: { hue: 355, sat: 35 },    // Red
  warning: { hue: 35, sat: 55 },   // Orange/amber
  info: { hue: 215, sat: 50 },     // Blue
};

/* ═══════════════════════════════════════════════════════════════════════════════
   TOAST ITEM
   Individual toast notification component
   ═══════════════════════════════════════════════════════════════════════════════ */

// Get icon based on toast type
function getTypeIcon(type: ToastType): ReactNode {
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

export function ToastItem({
  toast,
  onDismiss,
  position,
  toastStyle = 'default',
  dynamicShadows = true,
}: ToastItemProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Get light engine context (optional)
  const lightEngine = useLightEngineOptional();

  // Get glass hue and saturation based on toast type
  const glassHue = GLASS_TYPE_HUES[toast.type ?? 'default'];

  // Get dynamic styles for glass variant
  const getGlassDynamicStyles = (): CSSProperties | undefined => {
    if (toastStyle !== 'glass' || !dynamicShadows || !lightEngine) return undefined;

    const { shadows } = lightEngine;
    return {
      boxShadow: shadows.getLayeredShadow(glassHue.hue, glassHue.sat),
      background: shadows.getGlassBackground(glassHue.hue, glassHue.sat),
      borderColor: shadows.getGlassBorder(glassHue.hue, glassHue.sat),
    };
  };

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
    const classes: string[] = [];

    // Add style variant
    if (toastStyle === 'glass') {
      classes.push(styles.styleGlass);
      if (dynamicShadows && lightEngine) classes.push(styles.dynamicShadows);
    }

    // Add type-specific class
    if (toastStyle === 'glass') {
      // Glass type classes
      switch (toast.type) {
        case 'success':
          classes.push(styles.glassSuccess);
          break;
        case 'error':
          classes.push(styles.glassError);
          break;
        case 'warning':
          classes.push(styles.glassWarning);
          break;
        case 'info':
          classes.push(styles.glassInfo);
          break;
        default:
          classes.push(styles.glassDefault);
      }
    } else {
      // Default neumorphic type classes
      switch (toast.type) {
        case 'success':
          classes.push(styles.typeSuccess);
          break;
        case 'error':
          classes.push(styles.typeError);
          break;
        case 'warning':
          classes.push(styles.typeWarning);
          break;
        case 'info':
          classes.push(styles.typeInfo);
          break;
        default:
          classes.push(styles.typeDefault);
      }
    }

    return classes.join(' ');
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
      style={getGlassDynamicStyles()}
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
