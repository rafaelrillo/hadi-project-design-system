// Path: src/components/atoms/Button/TabGroup.tsx

import type { TabGroupProps, TabItem } from './Button.types';
import styles from './Button.module.css';

/**
 * Helper to normalize tabs to TabItem format
 */
function normalizeTab(tab: string | TabItem): TabItem {
  if (typeof tab === 'string') {
    return { label: tab };
  }
  return tab;
}

/**
 * Horizontal tab navigation with neumorphic styling.
 * Supports both simple string labels and rich TabItem objects with icons.
 *
 * @example
 * // Simple string tabs
 * <TabGroup
 *   tabs={['Overview', 'Analytics', 'Reports', 'Settings']}
 *   activeTab={activeTab}
 *   onChange={setActiveTab}
 * />
 *
 * @example
 * // Tabs with icons
 * <TabGroup
 *   tabs={[
 *     { label: 'Home', icon: <Home size={18} /> },
 *     { label: 'Portfolio', icon: <Briefcase size={18} /> },
 *     { label: 'Calibrate', icon: <TrendingUp size={18} /> },
 *     { label: 'News', icon: <Newspaper size={18} /> },
 *   ]}
 *   activeTab={activeTab}
 *   onChange={setActiveTab}
 * />
 *
 * @example
 * // Icon-only tabs
 * <TabGroup
 *   tabs={[...]}
 *   iconOnly
 *   activeTab={activeTab}
 *   onChange={setActiveTab}
 * />
 */
export function TabGroup({
  tabs,
  activeTab,
  onChange,
  size = 'md',
  iconOnly = false,
  className,
}: TabGroupProps) {
  const groupClasses = [
    styles.tabGroup,
    iconOnly && styles.tabGroupIconOnly,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={groupClasses} role="tablist">
      {tabs.map((tab, index) => {
        const normalizedTab = normalizeTab(tab);
        const isActive = index === activeTab;
        const hasIcon = !!normalizedTab.icon;

        const buttonClasses = [
          styles.tabButton,
          styles[size],
          isActive && styles.tabButtonActive,
          hasIcon && styles.tabButtonWithIcon,
          iconOnly && styles.tabButtonIconOnly,
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={normalizedTab.label}
            type="button"
            role="tab"
            className={buttonClasses}
            onClick={() => onChange(index)}
            aria-selected={isActive}
            aria-label={iconOnly ? normalizedTab.label : undefined}
            tabIndex={isActive ? 0 : -1}
            title={iconOnly ? normalizedTab.label : undefined}
          >
            {normalizedTab.icon && (
              <span className={styles.tabButtonIcon}>{normalizedTab.icon}</span>
            )}
            {!iconOnly && (
              <span className={styles.tabButtonLabel}>{normalizedTab.label}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default TabGroup;
