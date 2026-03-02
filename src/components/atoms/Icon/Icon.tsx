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

// Using CSS custom properties for QUAFI theming
const colorMap: Record<string, string> = {
  default: 'var(--quafi-text-primary)',
  secondary: 'var(--quafi-text-secondary)',
  primary: 'var(--quafi-accent-primary)',
  brand: 'var(--quafi-accent-primary)',
  destructive: 'var(--quafi-status-negative)',
  success: 'var(--quafi-status-positive)',
  warning: 'var(--quafi-status-warning)',
  info: 'var(--quafi-accent-secondary)',
  muted: 'var(--quafi-text-tertiary)'
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
