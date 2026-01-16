// Path: src/components/atoms/Button/Button.tsx
import { type ReactNode, type CSSProperties } from 'react';
import { useLightEngineOptional } from '@contexts/LightEngineContext';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'success' | 'ghost' | 'glass' | 'with-icon';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: ReactNode;
  iconOnly?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  ariaLabel?: string;
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  type = 'button',
  icon,
  iconOnly = false,
  loading = false,
  fullWidth = false,
  ariaLabel,
  className,
}: ButtonProps) {
  // Get light engine context (optional - works without provider)
  const lightEngine = useLightEngineOptional();

  // Build className based on props
  const getClassName = (): string => {
    const classes = [styles.button];

    // Add variant class
    const variantMap: Record<ButtonVariant, string> = {
      primary: styles.primary,
      secondary: styles.secondary,
      destructive: styles.destructive,
      success: styles.success,
      ghost: styles.ghost,
      glass: styles.glass,
      'with-icon': styles.withIcon,
    };
    classes.push(variantMap[variant]);

    // Add size class
    const sizeMap: Record<ButtonSize, string> = {
      sm: styles.sm,
      md: styles.md,
      lg: styles.lg,
    };
    classes.push(sizeMap[size]);

    // Add modifier classes
    if (icon || iconOnly) classes.push(styles.buttonWithIcon);
    if (iconOnly) classes.push(styles.iconOnly);
    if (loading) classes.push(styles.loading);
    if (fullWidth) classes.push(styles.fullWidth);
    if (className) classes.push(className);

    return classes.join(' ');
  };

  // Dynamic styles for glass variant with Light Engine
  const getDynamicStyles = (): CSSProperties | undefined => {
    if (variant !== 'glass' || !lightEngine) return undefined;

    const { shadows } = lightEngine;
    return {
      boxShadow: `${shadows.getLayeredShadow(175, 35)}, ${shadows.getGlassReflection()}`,
      background: shadows.getGlassBackground(175, 35),
      borderColor: shadows.getGlassBorder(175, 35),
    };
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={getClassName()}
      style={getDynamicStyles()}
      aria-label={ariaLabel}
      aria-busy={loading}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {!iconOnly && <span className={styles.label}>{children}</span>}
    </button>
  );
}
