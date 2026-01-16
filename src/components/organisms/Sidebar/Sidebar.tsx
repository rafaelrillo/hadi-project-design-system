// Path: src/components/organisms/Sidebar/Sidebar.tsx
import { useState, type ReactNode, type MouseEvent, type KeyboardEvent, type CSSProperties } from 'react';
import { LucideIcon, LogOut, ScrollText } from 'lucide-react';
import { useLightEngineOptional } from '@contexts/LightEngineContext';
import styles from './Sidebar.module.css';

export interface SidebarMenuItem {
  icon: LucideIcon;
  label: string;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
  disabled?: boolean;
}

export type SidebarStyle = 'dark' | 'neuPanel';
export type SidebarPosition = 'fixed' | 'relative' | 'absolute';

export interface SidebarProps {
  productLogo?: ReactNode;
  menuItems: SidebarMenuItem[];
  userIcon?: ReactNode;
  onLogsClick?: () => void;
  onLogoutClick?: () => void;
  className?: string;
  position?: SidebarPosition;
  /** Visual style - 'dark' (default) or 'neuPanel' (light neumorphic) */
  sidebarStyle?: SidebarStyle;
  /** Enable dynamic shadows from Light Engine */
  dynamicShadows?: boolean;
}

export function Sidebar({
  productLogo,
  menuItems,
  userIcon,
  onLogsClick,
  onLogoutClick,
  className,
  position = 'fixed',
  sidebarStyle = 'dark',
  dynamicShadows = true,
}: SidebarProps) {
  // Get light engine context (optional)
  const lightEngine = useLightEngineOptional();
  // Build sidebar className
  const getSidebarClassName = (): string => {
    const classes = [styles.sidebar];
    if (position === 'relative') classes.push(styles.sidebarRelative);
    if (position === 'absolute') classes.push(styles.sidebarAbsolute);
    if (sidebarStyle === 'neuPanel') classes.push(styles.neuPanel);
    if (dynamicShadows && lightEngine && sidebarStyle === 'neuPanel') {
      classes.push(styles.dynamicShadows);
    }
    if (className) classes.push(className);
    return classes.join(' ');
  };

  // Get dynamic styles for neuPanel
  const getDynamicStyles = (): CSSProperties | undefined => {
    if (sidebarStyle !== 'neuPanel' || !dynamicShadows || !lightEngine) return undefined;

    const { shadows } = lightEngine;
    return {
      boxShadow: `${shadows.getNeuPanelShadow(8, 20)}, inset -1px 0 0 rgba(255, 255, 255, 0.7)`,
    };
  };

  const MenuItem = ({ item }: { item: SidebarMenuItem }) => {
    const [isHovered, setIsHovered] = useState(false);
    const Icon = item.icon;
    const isActive = item.isActive || false;
    const isDisabled = item.disabled || false;

    const handleClick = (e: MouseEvent) => {
      if (isDisabled) {
        e.preventDefault();
        return;
      }
      if (item.onClick) {
        e.preventDefault();
        item.onClick();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isDisabled) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.onClick?.();
      }
    };

    const Component = item.href ? 'a' : 'button';

    const menuItemClasses = [styles.menuItemButton];
    if (isActive) menuItemClasses.push(styles.menuItemActive);
    if (isDisabled) menuItemClasses.push(styles.menuItemDisabled);

    const leftBarClasses = [styles.leftBar];
    if (isActive || (isHovered && !isDisabled)) leftBarClasses.push(styles.leftBarVisible);

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
          className={menuItemClasses.join(' ')}
          aria-label={item.label}
          aria-current={isActive ? 'page' : undefined}
          aria-disabled={isDisabled}
          tabIndex={isDisabled ? -1 : 0}
        >
          <div className={leftBarClasses.join(' ')} />
          <Icon size={24} />
        </Component>
      </div>
    );
  };

  return (
    <nav
      className={getSidebarClassName()}
      style={getDynamicStyles()}
      aria-label="Main navigation"
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
