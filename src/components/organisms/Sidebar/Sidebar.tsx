// Path: src/components/organisms/Sidebar/Sidebar.tsx
import React, { useState } from 'react';
import { LucideIcon, LogOut, ScrollText } from 'lucide-react';
import styles from './Sidebar.module.css';

export interface SidebarMenuItem {
  icon: LucideIcon;
  label: string;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
  disabled?: boolean;
}

export interface SidebarProps {
  productLogo?: React.ReactNode;
  menuItems: SidebarMenuItem[];
  userIcon?: React.ReactNode;
  onLogsClick?: () => void;
  onLogoutClick?: () => void;
  className?: string;
  position?: 'fixed' | 'relative' | 'absolute';
}

const getClassName = (...classes: (string | undefined | false)[]) =>
  classes.filter(Boolean).join(' ');

export function Sidebar({
  productLogo,
  menuItems,
  userIcon,
  onLogsClick,
  onLogoutClick,
  className,
  position = 'fixed'
}: SidebarProps) {
  const MenuItem = ({ item }: { item: SidebarMenuItem }) => {
    const [isHovered, setIsHovered] = useState(false);
    const Icon = item.icon;
    const isActive = item.isActive || false;
    const isDisabled = item.disabled || false;

    const handleClick = (e: React.MouseEvent) => {
      if (isDisabled) {
        e.preventDefault();
        return;
      }
      if (item.onClick) {
        e.preventDefault();
        item.onClick();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (isDisabled) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.onClick?.();
      }
    };

    const Component = item.href ? 'a' : 'button';

    return (
      <div className={styles.menuItemContainer}>
        <Component
          {...(item.href ? { href: item.href } : { type: 'button' })}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => !isDisabled && setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => !isDisabled && setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          disabled={isDisabled}
          className={getClassName(
            styles.menuItemButton,
            isActive && styles.menuItemActive,
            isDisabled && styles.menuItemDisabled
          )}
          aria-label={item.label}
          aria-current={isActive ? 'page' : undefined}
          aria-disabled={isDisabled}
          tabIndex={isDisabled ? -1 : 0}
        >
          <div className={getClassName(
            styles.leftBar,
            (isActive || (isHovered && !isDisabled)) && styles.leftBarVisible
          )} />
          <Icon size={24} />
        </Component>
      </div>
    );
  };

  return (
    <nav
      className={getClassName(
        styles.sidebar,
        position === 'relative' && styles.sidebarRelative,
        position === 'absolute' && styles.sidebarAbsolute,
        className
      )}
      aria-label="Navegación principal"
    >
      {/* Top Section: Logo + Menu Items */}
      <div className={styles.section}>
        {/* Product Logo */}
        {productLogo && (
          <div className={styles.logoContainer} aria-label="Logo del producto">
            {productLogo}
          </div>
        )}

        {/* Menu Items */}
        {menuItems.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </div>

      {/* Bottom Section: User + Logs + Logout */}
      <div className={styles.section}>
        {/* User Icon */}
        {userIcon && (
          <div className={styles.userIconContainer} aria-label="Usuario">
            {userIcon}
          </div>
        )}

        {/* Logs */}
        {onLogsClick && (
          <button
            onClick={onLogsClick}
            className={styles.actionButton}
            aria-label="Historial de logs"
          >
            <ScrollText size={24} />
          </button>
        )}

        {/* Logout */}
        {onLogoutClick && (
          <button
            onClick={onLogoutClick}
            className={styles.actionButton}
            aria-label="Cerrar sesión"
          >
            <LogOut size={24} />
          </button>
        )}
      </div>
    </nav>
  );
}
