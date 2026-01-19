// Path: src/components/organisms/Sidebar/Sidebar.tsx
// FING Design System v5.0 - Neumorphic Sidebar
import { useState, useMemo, type ReactNode, type MouseEvent, type KeyboardEvent, type CSSProperties } from 'react';
import { LucideIcon, LogOut, ScrollText, Search, ChevronDown, Settings, Plus } from 'lucide-react';
import { useLightEngine } from '@contexts/LightEngineContext';
import { TabGroup, type TabItem } from '@atoms/Button';
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
  onAddClick?: () => void;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
}

export type SidebarPosition = 'fixed' | 'relative' | 'absolute';

export interface SidebarProps {
  /** Logo element */
  productLogo?: ReactNode;
  /** Menu items (for simple sidebar without sections) */
  menuItems?: SidebarMenuItem[];
  /** Grouped menu sections */
  sections?: SidebarSection[];
  /** Main navigation tabs (replaces menuItems with TabGroup) */
  mainTabs?: TabItem[];
  /** Currently active tab index (when using mainTabs) */
  activeTab?: number;
  /** Callback when tab changes (when using mainTabs) */
  onTabChange?: (index: number) => void;
  /** User profile */
  user?: UserProfile;
  /** Callback for user profile click */
  onUserClick?: () => void;
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
  /** Enable dynamic shadows from Light Engine */
  dynamicShadows?: boolean;
  /** Collapsed mode (icon-only) */
  collapsed?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPER COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

interface MenuItemComponentProps {
  item: SidebarMenuItem;
  collapsed?: boolean;
}

function MenuItemComponent({ item, collapsed = false }: MenuItemComponentProps) {
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
      title={collapsed ? item.label : undefined}
    >
      <Icon size={20} className={styles.menuItemIcon} />
      {!collapsed && <span className={styles.menuItemLabel}>{item.label}</span>}
      {!collapsed && item.badge !== undefined && item.badge !== 0 && (
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
  mainTabs,
  activeTab = 0,
  onTabChange,
  user,
  onUserClick,
  onLogsClick,
  onLogoutClick,
  onSettingsClick,
  searchPlaceholder = 'Search...',
  onSearch,
  className,
  position = 'fixed',
  dynamicShadows = true,
  collapsed = false,
}: SidebarProps) {
  const [searchValue, setSearchValue] = useState('');

  // Get light engine context for dynamic shadows
  let lightEngine: ReturnType<typeof useLightEngine> | null = null;
  try {
    lightEngine = useLightEngine();
  } catch {
    // Light engine not available
  }

  // Calculate dynamic shadows based on light angle
  const shadowOffsets = useMemo(() => {
    if (!lightEngine || !dynamicShadows) return null;
    const shadowAngle = (lightEngine.lightAngle + 180) * (Math.PI / 180);
    return { x: Math.cos(shadowAngle), y: Math.sin(shadowAngle) };
  }, [lightEngine?.lightAngle, dynamicShadows]);

  // Neumorphic shadow generators
  const getNeuPanelShadow = (distance: number, blur: number): string => {
    if (!shadowOffsets) {
      return `${distance}px ${distance}px ${blur}px #a8acb3, ${-distance}px ${-distance}px ${blur}px #ffffff`;
    }
    const { x, y } = shadowOffsets;
    return `${x * distance}px ${y * distance}px ${blur}px #a8acb3, ${-x * distance}px ${-y * distance}px ${blur}px #ffffff`;
  };

  const getNeuInsetShadow = (distance: number, blur: number): string => {
    if (!shadowOffsets) {
      return `inset ${distance}px ${distance}px ${blur}px #a8acb3, inset ${-distance}px ${-distance}px ${blur}px #ffffff`;
    }
    const { x, y } = shadowOffsets;
    return `inset ${x * distance}px ${y * distance}px ${blur}px #a8acb3, inset ${-x * distance}px ${-y * distance}px ${blur}px #ffffff`;
  };

  // Build sidebar className
  const getSidebarClassName = (): string => {
    const classes = [styles.sidebar];
    if (position === 'relative') classes.push(styles.sidebarRelative);
    if (position === 'absolute') classes.push(styles.sidebarAbsolute);
    if (dynamicShadows) classes.push(styles.dynamicShadows);
    if (collapsed) classes.push(styles.sidebarCollapsed);
    if (className) classes.push(className);
    return classes.join(' ');
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch?.(value);
  };

  // Dynamic styles for main container
  const getSidebarStyles = (): CSSProperties => {
    if (!dynamicShadows || !shadowOffsets) return {};
    return {
      boxShadow: `${getNeuPanelShadow(10, 30)}, inset 0 1px 0 rgba(255, 255, 255, 0.8)`,
    };
  };

  // Dynamic styles for search input
  const getSearchStyles = (): CSSProperties => {
    if (!dynamicShadows || !shadowOffsets) return {};
    return {
      boxShadow: getNeuInsetShadow(4, 10),
    };
  };

  return (
    <nav
      className={getSidebarClassName()}
      style={getSidebarStyles()}
      aria-label="Main navigation"
    >
      {/* Logo Section */}
      {productLogo && (
        <div className={styles.logoSection}>
          <div className={styles.logo}>
            {productLogo}
          </div>
        </div>
      )}

      {/* User Profile - Glass Card */}
      {user && !collapsed && (
        <div className={styles.userSection}>
          <button
            className={styles.userProfile}
            onClick={onUserClick}
            type="button"
            aria-label={`User profile: ${user.name}`}
          >
            <div className={styles.userAvatar}>
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name} />
              ) : (
                <div className={styles.userAvatarFallback}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className={styles.userInfo}>
              <p className={styles.userName}>{user.name}</p>
              <p className={styles.userEmail}>{user.email}</p>
            </div>
            <ChevronDown size={16} className={styles.userChevron} />
          </button>
        </div>
      )}

      {/* Search Input - Carved/Inset */}
      {onSearch && !collapsed && (
        <div className={styles.searchSection}>
          <div className={styles.searchInput} style={getSearchStyles()}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={handleSearchChange}
              aria-label="Search"
            />
          </div>
        </div>
      )}

      {/* Main Navigation TabGroup - Icon Only */}
      {mainTabs && mainTabs.length > 0 && onTabChange && (
        <div className={styles.mainNavSection}>
          <TabGroup
            tabs={mainTabs}
            activeTab={activeTab}
            onChange={onTabChange}
            size="md"
            iconOnly
            className={styles.mainNavTabs}
          />
        </div>
      )}

      {/* Navigation Sections */}
      <div className={styles.navSections}>
        {/* Sections with grouped items */}
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className={styles.navSection}>
            {!collapsed && (
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>{section.title}</h3>
                {section.onAddClick && (
                  <button
                    className={styles.sectionAction}
                    onClick={section.onAddClick}
                    aria-label={`Add to ${section.title}`}
                    type="button"
                  >
                    <Plus size={14} />
                  </button>
                )}
              </div>
            )}
            <div className={styles.menuList}>
              {section.items.map((item, itemIndex) => (
                <MenuItemComponent
                  key={itemIndex}
                  item={item}
                  collapsed={collapsed}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Simple menu items (if no sections AND no mainTabs provided) */}
        {sections.length === 0 && menuItems.length > 0 && !mainTabs && (
          <div className={styles.menuList}>
            {menuItems.map((item, index) => (
              <MenuItemComponent
                key={index}
                item={item}
                collapsed={collapsed}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer Section - Bottom actions */}
      {!collapsed && (onLogsClick || onLogoutClick || onSettingsClick) && (
        <div className={styles.footerSection}>
          <div className={styles.footerActions}>
            {onSettingsClick && (
              <button
                onClick={onSettingsClick}
                className={styles.footerAction}
                aria-label="Settings"
                type="button"
              >
                <Settings size={18} />
                <span>Settings</span>
              </button>
            )}
            {onLogsClick && (
              <button
                onClick={onLogsClick}
                className={styles.footerAction}
                aria-label="View logs"
                type="button"
              >
                <ScrollText size={18} />
                <span>Activity Log</span>
              </button>
            )}
            {onLogoutClick && (
              <button
                onClick={onLogoutClick}
                className={`${styles.footerAction} ${styles.danger}`}
                aria-label="Logout"
                type="button"
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

export default Sidebar;
