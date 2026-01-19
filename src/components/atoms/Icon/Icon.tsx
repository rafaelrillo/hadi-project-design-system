// Path: src/components/atoms/Icon/Icon.tsx
import { LucideIcon } from 'lucide-react';
import styles from './Icon.module.css';

export interface IconProps {
  icon: LucideIcon;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: 'default' | 'secondary' | 'primary' | 'brand' | 'destructive' | 'success' | 'warning' | 'muted' | string;
  ariaLabel?: string;
  className?: string;
}

const sizeMap = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32
};

// Using CSS custom properties for FING theming
const colorMap: Record<string, string> = {
  default: 'var(--fing-text-primary)',
  secondary: 'var(--fing-text-secondary)',
  primary: 'var(--fing-accent-primary)',
  brand: 'var(--fing-accent-primary)',
  destructive: 'var(--fing-status-negative)',
  success: 'var(--fing-status-positive)',
  warning: 'var(--fing-status-warning)',
  info: 'var(--fing-accent-secondary)',
  muted: 'var(--fing-text-tertiary)'
};

export function Icon({
  icon: LucideIconComponent,
  size = 'md',
  color = 'default',
  ariaLabel,
  className
}: IconProps) {
  const iconSize = sizeMap[size];
  const iconColor = colorMap[color] || color;

  const classes = [styles.icon];
  if (className) {
    classes.push(className);
  }

  return (
    <LucideIconComponent
      size={iconSize}
      color={iconColor}
      aria-label={ariaLabel}
      className={classes.join(' ')}
    />
  );
}
