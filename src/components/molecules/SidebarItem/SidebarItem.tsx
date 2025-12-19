// Path: src/components/molecules/SidebarItem/SidebarItem.tsx
import React from 'react';
import { LucideIcon } from 'lucide-react';
import styles from './SidebarItem.module.css';

export interface SidebarItemProps {
  label: string;
  icon?: LucideIcon;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  badge?: number;
  href?: string;
}

const getClassName = (...classes: (string | undefined | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export function SidebarItem({
  label,
  icon: Icon,
  isActive = false,
  disabled = false,
  onClick,
  badge,
  href
}: SidebarItemProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  const containerClass = getClassName(
    styles.container,
    isActive && styles.active,
    disabled && styles.disabled
  );

  const leftBarClass = getClassName(
    styles.leftBar,
    (isActive) && styles.leftBarVisible
  );

  const iconColor = disabled ? '#D0D0D0' : isActive ? '#006081' : '#222222';

  const Component = href ? 'a' : 'button';

  return (
    <Component
      {...(href ? { href } : { type: 'button' })}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      className={containerClass}
      aria-current={isActive ? 'page' : undefined}
      aria-disabled={disabled}
      role={href ? undefined : 'menuitem'}
      tabIndex={disabled ? -1 : 0}
    >
      <div className={leftBarClass} />
      {Icon && (
        <div className={styles.iconContainer}>
          <Icon size={18} color={iconColor} />
        </div>
      )}
      <span className={styles.label}>{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className={styles.badge} aria-label={`${badge} notificaciones`}>
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </Component>
  );
}
