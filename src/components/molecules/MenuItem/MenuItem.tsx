// Path: src/components/molecules/MenuItem/MenuItem.tsx
import { LucideIcon } from 'lucide-react';
import styles from './MenuItem.module.css';

export interface MenuItemProps {
  icon?: LucideIcon;
  label: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  href?: string;
  badge?: number | string;
}

const getClassName = (...classes: (string | undefined | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export function MenuItem({
  icon: Icon,
  label,
  onClick,
  active = false,
  disabled = false,
  href,
  badge
}: MenuItemProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick();
    }
  };

  const containerClass = getClassName(
    styles.container,
    active && styles.active,
    disabled && styles.disabled
  );

  const labelClass = getClassName(
    styles.label,
    active && styles.labelActive,
    disabled && styles.labelDisabled
  );

  const iconColor = active ? 'var(--primary)' : disabled ? 'var(--muted)' : 'var(--color-gray-2)';

  const content = (
    <>
      {Icon && (
        <div className={styles.iconContainer}>
          <Icon size={20} color={iconColor} />
        </div>
      )}
      <span className={labelClass}>{label}</span>
      {badge !== undefined && (
        <span className={styles.badge}>{badge}</span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={containerClass}
        onClick={handleClick}
        aria-current={active ? 'page' : undefined}
        aria-disabled={disabled}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={containerClass}
      onClick={handleClick}
      disabled={disabled}
      aria-current={active ? 'page' : undefined}
      type="button"
    >
      {content}
    </button>
  );
}
