// Path: src/components/organisms/Sidebar/Sidebar.tsx
import { useState, useMemo, type ReactNode, type MouseEvent, type KeyboardEvent, type CSSProperties } from 'react';
import { LucideIcon, LogOut, ScrollText, Search, ChevronDown, Settings } from 'lucide-react';
import { useLightEngine } from '@contexts/LightEngineContext';
import styles from './Sidebar.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface SidebarMenuItem {
  icon: LucideIcon;
  label: string;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
  disabled?: boolean;
  badge?: string | number;
}

export interface SidebarSection {
  title: string;
  items: SidebarMenuItem[];
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
}

export type SidebarStyle = 'dark' | 'neuPanel' | 'expanded';
export type SidebarPosition = 'fixed' | 'relative' | 'absolute';

export interface SidebarProps {
  /** Logo element for the icon rail */
  productLogo?: ReactNode;
  /** Menu items for simple sidebar */
  menuItems?: SidebarMenuItem[];
  /** Grouped menu sections for expanded sidebar */
  sections?: SidebarSection[];
  /** User profile for expanded sidebar */
  user?: UserProfile;
  /** User icon for icon rail */
  userIcon?: ReactNode;
  /** Callback for logs button */
  onLogsClick?: () => void;
  /** Callback for logout button */
  onLogoutClick?: () => void;
  /** Callback for settings button */
  onSettingsClick?: () => void;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Callback when search value changes */
  onSearch?: (value: string) => void;
  /** Additional CSS class */
  className?: string;
  /** Position mode */
  position?: SidebarPosition;
  /** Visual style variant */
  sidebarStyle?: SidebarStyle;
  /** Enable dynamic shadows from Light Engine */
  dynamicShadows?: boolean;
  /** Show icon rail on the left */
  showIconRail?: boolean;
  /** Show expanded panel with labels */
  showExpandedPanel?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPER COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

interface MenuItemComponentProps {
  item: SidebarMenuItem;
  showLabel?: boolean;
  variant?: 'rail' | 'expanded';
}

function MenuItemComponent({ item, showLabel = true, variant = 'expanded' }: MenuItemComponentProps) {
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

  // Rail variant (icon only)
  if (variant === 'rail') {
    const railClasses = [styles.railItem];
    if (isActive) railClasses.push(styles.railItemActive);

    return (
      <Component
        {...(item.href ? { href: item.href } : { type: 'button' })}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={isDisabled}
        className={railClasses.join(' ')}
        aria-label={item.label}
        aria-current={isActive ? 'page' : undefined}
        title={item.label}
      >
        <Icon size={20} />
      </Component>
    );
  }

  // Expanded variant (icon + label)
  const menuClasses = [styles.menuItem];
  if (isActive) menuClasses.push(styles.menuItemActive);
  if (isDisabled) menuClasses.push(styles.menuItemDisabled);

  return (
    <Component
      {...(item.href ? { href: item.href } : { type: 'button' })}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={isDisabled}
      className={menuClasses.join(' ')}
      aria-label={item.label}
      aria-current={isActive ? 'page' : undefined}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
    >
      <Icon size={20} className={styles.menuItemIcon} />
      {showLabel && <span className={styles.menuItemLabel}>{item.label}</span>}
      {item.badge !== undefined && (
        <span className={styles.menuItemBadge}>{item.badge}</span>
      )}
    </Component>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function Sidebar({
  productLogo,
  menuItems = [],
  sections = [],
  user,
  userIcon,
  onLogsClick,
  onLogoutClick,
  onSettingsClick,
  searchPlaceholder = 'Search',
  onSearch,
  className,
  position = 'fixed',
  sidebarStyle = 'expanded',
  dynamicShadows = true,
  showIconRail = true,
  showExpandedPanel = true,
}: SidebarProps) {
  const [searchValue, setSearchValue] = useState('');

  // Get light engine context for dynamic shadows
  let lightEngine: ReturnType<typeof useLightEngine> | null = null;
  try {
    lightEngine = useLightEngine();
  } catch {
    // Light engine not available
  }

  // Calculate dynamic shadows
  const shadowOffsets = useMemo(() => {
    if (!lightEngine || !dynamicShadows) return null;
    const shadowAngle = (lightEngine.lightAngle + 180) * (Math.PI / 180);
    return { x: Math.cos(shadowAngle), y: Math.sin(shadowAngle) };
  }, [lightEngine?.lightAngle, dynamicShadows]);

  const getNeuPanelShadow = (distance: number, blur: number): string => {
    if (!shadowOffsets) {
      return `8px 8px ${blur}px #a3b1c6, -8px -8px ${blur}px #ffffff`;
    }
    const { x, y } = shadowOffsets;
    return `${x * distance}px ${y * distance}px ${blur}px #a3b1c6, ${-x * distance}px ${-y * distance}px ${blur}px #ffffff`;
  };

  // Build sidebar className
  const getSidebarClassName = (): string => {
    const classes = [styles.sidebar];
    if (position === 'relative') classes.push(styles.sidebarRelative);
    if (position === 'absolute') classes.push(styles.sidebarAbsolute);
    if (dynamicShadows) classes.push(styles.dynamicShadows);
    if (className) classes.push(className);
    return classes.join(' ');
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch?.(value);
  };

  // Get icon rail dynamic styles
  const getIconRailStyles = (): CSSProperties => {
    if (!dynamicShadows || !shadowOffsets) return {};
    return {
      boxShadow: getNeuPanelShadow(6, 16),
    };
  };

  // Get expanded panel dynamic styles
  const getExpandedPanelStyles = (): CSSProperties => {
    if (!dynamicShadows || !shadowOffsets) return {};
    return {
      boxShadow: getNeuPanelShadow(8, 20),
    };
  };

  // If using legacy 'dark' or 'neuPanel' style, render old structure
  if (sidebarStyle === 'dark' || sidebarStyle === 'neuPanel') {
    return <LegacySidebar
      productLogo={productLogo}
      menuItems={menuItems}
      userIcon={userIcon}
      onLogsClick={onLogsClick}
      onLogoutClick={onLogoutClick}
      className={className}
      position={position}
      sidebarStyle={sidebarStyle}
      dynamicShadows={dynamicShadows}
    />;
  }

  // Render expanded style with icon rail + expanded panel
  return (
    <nav
      className={getSidebarClassName()}
      aria-label="Main navigation"
    >
      {/* Icon Rail - Dark vertical strip */}
      {showIconRail && (
        <div className={styles.iconRail} style={getIconRailStyles()}>
          <div className={styles.railTop}>
            {/* Logo */}
            {productLogo && (
              <div className={styles.railLogo}>
                {productLogo}
              </div>
            )}
            <div className={styles.railDivider} />

            {/* Rail menu items */}
            {menuItems.map((item, index) => (
              <MenuItemComponent
                key={index}
                item={item}
                variant="rail"
              />
            ))}
          </div>

          <div className={styles.railBottom}>
            {/* Settings */}
            {onSettingsClick && (
              <button
                onClick={onSettingsClick}
                className={styles.railItem}
                aria-label="Settings"
              >
                <Settings size={20} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Expanded Panel - Neumorphic surface with glass items */}
      {showExpandedPanel && (
        <div className={styles.expandedPanel} style={getExpandedPanelStyles()}>
          {/* User Profile */}
          {user && (
            <div className={styles.userProfile}>
              <div className={styles.userAvatar}>
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '14px',
                  }}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className={styles.userInfo}>
                <p className={styles.userName}>
                  {user.name}
                  <ChevronDown size={14} />
                </p>
                <p className={styles.userEmail}>{user.email}</p>
              </div>
            </div>
          )}

          {/* Sections with items */}
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className={styles.sectionHeader}>{section.title}</h3>
              <div className={styles.menuList}>
                {section.items.map((item, itemIndex) => (
                  <MenuItemComponent
                    key={itemIndex}
                    item={item}
                    variant="expanded"
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Search Input */}
          {onSearch && (
            <div className={styles.searchContainer}>
              <div className={styles.searchInput}>
                <Search size={16} className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          )}

          {/* Simple menu items (if no sections provided) */}
          {sections.length === 0 && menuItems.length > 0 && (
            <div className={styles.menuList}>
              {menuItems.map((item, index) => (
                <MenuItemComponent
                  key={index}
                  item={item}
                  variant="expanded"
                />
              ))}
            </div>
          )}

          {/* Bottom actions */}
          {(onLogsClick || onLogoutClick) && (
            <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
              {onLogsClick && (
                <button
                  onClick={onLogsClick}
                  className={styles.menuItem}
                  aria-label="View logs"
                >
                  <ScrollText size={20} className={styles.menuItemIcon} />
                  <span className={styles.menuItemLabel}>Logs</span>
                </button>
              )}
              {onLogoutClick && (
                <button
                  onClick={onLogoutClick}
                  className={styles.menuItem}
                  aria-label="Logout"
                >
                  <LogOut size={20} className={styles.menuItemIcon} />
                  <span className={styles.menuItemLabel}>Logout</span>
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LEGACY SIDEBAR (for backwards compatibility)
// ─────────────────────────────────────────────────────────────────────────────

interface LegacySidebarProps {
  productLogo?: ReactNode;
  menuItems: SidebarMenuItem[];
  userIcon?: ReactNode;
  onLogsClick?: () => void;
  onLogoutClick?: () => void;
  className?: string;
  position?: SidebarPosition;
  sidebarStyle?: 'dark' | 'neuPanel';
  dynamicShadows?: boolean;
}

function LegacySidebar({
  productLogo,
  menuItems,
  userIcon,
  onLogsClick,
  onLogoutClick,
  className,
  position = 'fixed',
  sidebarStyle = 'dark',
  dynamicShadows = true,
}: LegacySidebarProps) {
  // Get light engine context
  let lightEngine: ReturnType<typeof useLightEngine> | null = null;
  try {
    lightEngine = useLightEngine();
  } catch {
    // Light engine not available
  }

  // Calculate dynamic shadows
  const shadowOffsets = useMemo(() => {
    if (!lightEngine || !dynamicShadows || sidebarStyle !== 'neuPanel') return null;
    const shadowAngle = (lightEngine.lightAngle + 180) * (Math.PI / 180);
    return { x: Math.cos(shadowAngle), y: Math.sin(shadowAngle) };
  }, [lightEngine?.lightAngle, dynamicShadows, sidebarStyle]);

  const getNeuPanelShadow = (distance: number, blur: number): string => {
    if (!shadowOffsets) {
      return `8px 8px ${blur}px #a3b1c6, -8px -8px ${blur}px #ffffff`;
    }
    const { x, y } = shadowOffsets;
    return `${x * distance}px ${y * distance}px ${blur}px #a3b1c6, ${-x * distance}px ${-y * distance}px ${blur}px #ffffff`;
  };

  // Build sidebar className
  const getSidebarClassName = (): string => {
    const classes = [styles.sidebar];
    if (position === 'relative') classes.push(styles.sidebarRelative);
    if (position === 'absolute') classes.push(styles.sidebarAbsolute);
    if (sidebarStyle === 'neuPanel') classes.push(styles.neuPanel);
    if (dynamicShadows && sidebarStyle === 'neuPanel') {
      classes.push(styles.dynamicShadows);
    }
    if (className) classes.push(className);
    return classes.join(' ');
  };

  // Get dynamic styles for neuPanel
  const getDynamicStyles = (): CSSProperties | undefined => {
    if (sidebarStyle !== 'neuPanel' || !dynamicShadows || !shadowOffsets) return undefined;
    return {
      boxShadow: `${getNeuPanelShadow(8, 20)}, inset -1px 0 0 rgba(255, 255, 255, 0.7)`,
    };
  };

  const LegacyMenuItem = ({ item }: { item: SidebarMenuItem }) => {
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
          <LegacyMenuItem key={index} item={item} />
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
