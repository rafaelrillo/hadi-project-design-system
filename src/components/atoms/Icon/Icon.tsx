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

const colorMap: Record<string, string> = {
  default: '#E0E0E0',      // var(--foreground)
  secondary: '#888888',    // var(--foreground-muted)
  primary: '#FF6600',      // var(--primary)
  destructive: '#FF3333',  // var(--error)
  success: '#00FF41',      // var(--success)
  warning: '#FFB800',      // var(--warning)
  info: '#00BFFF',         // var(--info)
  muted: '#555555'         // muted gray
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
