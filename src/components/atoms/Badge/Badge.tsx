// Path: src/components/atoms/Badge/Badge.tsx
import { type ReactNode, type CSSProperties } from 'react';
import { useLightEngineOptional } from '@contexts/LightEngineContext';
import styles from './Badge.module.css';

export type BadgeVariant = 'success' | 'error' | 'warning' | 'info' | 'neutral' | 'primary' | 'premium' | 'glass';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeStyle = 'default' | 'outlined' | 'solid';

// Glass hue presets based on the design system
const GLASS_HUE_PRESETS = {
  primary: { hue: 175, sat: 35 },
  info: { hue: 215, sat: 50 },
  premium: { hue: 280, sat: 40 },
  error: { hue: 355, sat: 35 },
  success: { hue: 145, sat: 45 },
  warning: { hue: 35, sat: 55 },
  stats: { hue: 190, sat: 50 },
  neutral: { hue: 220, sat: 15 },
} as const;

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  badgeStyle?: BadgeStyle;
  /** Show dot indicator before text */
  withDot?: boolean;
  /** Animate the dot with pulse effect */
  withPulse?: boolean;
  /** Custom hue for glass variant (0-360) */
  hue?: number;
  /** Custom saturation for glass variant (0-100) */
  sat?: number;
  ariaLabel?: string;
  className?: string;
}

export function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  badgeStyle = 'default',
  withDot = false,
  withPulse = false,
  hue,
  sat,
  ariaLabel,
  className,
}: BadgeProps) {
  // Get light engine context (optional)
  const lightEngine = useLightEngineOptional();

  // Build className
  const getClassName = (): string => {
    const classes = [styles.badge];

    // Add variant class
    const variantMap: Record<BadgeVariant, string | undefined> = {
      success: styles.success,
      error: styles.error,
      warning: styles.warning,
      info: styles.info,
      neutral: styles.neutral,
      primary: styles.primary,
      premium: styles.premium,
      glass: styles.glass,
    };
    if (variantMap[variant]) {
      classes.push(variantMap[variant]!);
    }

    // Add size class
    const sizeMap: Record<BadgeSize, string | undefined> = {
      sm: styles.sm,
      md: undefined, // md is default, no class needed
      lg: styles.lg,
    };
    if (sizeMap[size]) {
      classes.push(sizeMap[size]!);
    }

    // Add style class
    if (badgeStyle === 'outlined') {
      classes.push(styles.outlined);
    } else if (badgeStyle === 'solid') {
      classes.push(styles.solid);
    }

    // Add modifiers
    if (withDot) classes.push(styles.withDot);
    if (withPulse) classes.push(styles.withPulse);
    if (className) classes.push(className);

    return classes.join(' ');
  };

  // Get dynamic styles for glass variant
  const getDynamicStyles = (): CSSProperties | undefined => {
    if (variant !== 'glass') return undefined;

    // Use custom hue/sat or fall back to primary preset
    const glassHue = hue ?? GLASS_HUE_PRESETS.primary.hue;
    const glassSat = sat ?? GLASS_HUE_PRESETS.primary.sat;

    // Base glass styles
    const baseStyles: CSSProperties = {
      background: `linear-gradient(180deg, hsla(${glassHue}, ${glassSat}%, 65%, 0.25) 0%, hsla(${glassHue}, ${glassSat}%, 60%, 0.12) 50%, hsla(${glassHue}, ${glassSat}%, 65%, 0.20) 100%)`,
      borderColor: `hsla(${glassHue}, ${glassSat}%, 75%, 0.25)`,
      color: `hsl(${glassHue}, ${Math.round(glassSat * 0.8)}%, 30%)`,
    };

    // Add dynamic shadows if Light Engine is available
    if (lightEngine) {
      const { shadows } = lightEngine;
      return {
        ...baseStyles,
        boxShadow: shadows.getLayeredShadow(glassHue, glassSat),
      };
    }

    return baseStyles;
  };

  return (
    <span
      aria-label={ariaLabel}
      role="status"
      className={getClassName()}
      style={getDynamicStyles()}
    >
      {children}
    </span>
  );
}

// Export hue presets for external use
export { GLASS_HUE_PRESETS };
