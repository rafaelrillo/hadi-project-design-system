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

// Using CSS custom properties for SENTINEL theming
const colorMap: Record<string, string> = {
  default: 'var(--sentinel-text-primary)',
  secondary: 'var(--sentinel-text-secondary)',
  primary: 'var(--sentinel-accent-primary)',
  brand: 'var(--sentinel-accent-primary)',
  destructive: 'var(--sentinel-status-negative)',
  success: 'var(--sentinel-status-positive)',
  warning: 'var(--sentinel-status-warning)',
  info: 'var(--sentinel-accent-secondary)',
  muted: 'var(--sentinel-text-tertiary)'
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
