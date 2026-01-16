// Path: src/components/organisms/Header/Header.tsx
import { type ReactNode, type CSSProperties } from 'react';
import { type LucideIcon } from 'lucide-react';
import { useLightEngineOptional } from '@contexts/LightEngineContext';
import styles from './Header.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type HeaderStyle = 'default' | 'glass' | 'neuPanel';

export interface HeaderProps {
  /** Page title */
  title?: string;
  /** Title icon */
  icon?: LucideIcon;
  /** Visual style variant */
  headerStyle?: HeaderStyle;
  /** Enable dynamic shadows from Light Engine */
  dynamicShadows?: boolean;
  /** Left side content (e.g., breadcrumbs, navigation) */
  leftContent?: ReactNode;
  /** Right side content (e.g., actions, status indicators) */
  rightContent?: ReactNode;
  /** Additional content below the title */
  children?: ReactNode;
  /** Additional CSS class */
  className?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// GLASS HUE PRESETS
// ─────────────────────────────────────────────────────────────────────────────

const GLASS_HEADER = {
  hue: 215,
  sat: 15,
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function Header({
  title,
  icon: Icon,
  headerStyle = 'glass',
  dynamicShadows = true,
  leftContent,
  rightContent,
  children,
  className,
}: HeaderProps) {
  // Get light engine context (optional)
  const lightEngine = useLightEngineOptional();

  // Get header className
  const getHeaderClassName = (): string => {
    const classes = [styles.header];
    if (headerStyle === 'glass') classes.push(styles.glass);
    if (headerStyle === 'neuPanel') classes.push(styles.neuPanel);
    if (dynamicShadows && lightEngine) classes.push(styles.dynamicShadows);
    if (className) classes.push(className);
    return classes.join(' ');
  };

  // Get dynamic styles based on header style
  const getDynamicStyles = (): CSSProperties | undefined => {
    if (!dynamicShadows || !lightEngine) return undefined;

    const { shadows } = lightEngine;

    if (headerStyle === 'glass') {
      return {
        boxShadow: shadows.getLayeredShadow(GLASS_HEADER.hue, GLASS_HEADER.sat),
        background: shadows.getGlassBackground(GLASS_HEADER.hue, GLASS_HEADER.sat),
        borderColor: shadows.getGlassBorder(GLASS_HEADER.hue, GLASS_HEADER.sat),
      };
    }

    if (headerStyle === 'neuPanel') {
      return {
        boxShadow: `${shadows.getNeuPanelShadow(4, 8)}, inset 0 1px 0 rgba(255, 255, 255, 0.7)`,
      };
    }

    return undefined;
  };

  return (
    <header className={getHeaderClassName()} style={getDynamicStyles()}>
      <div className={styles.left}>
        {leftContent}
        {(Icon || title) && (
          <div className={styles.titleGroup}>
            {Icon && (
              <span className={styles.icon}>
                <Icon size={20} />
              </span>
            )}
            {title && <h1 className={styles.title}>{title}</h1>}
          </div>
        )}
      </div>

      {rightContent && <div className={styles.right}>{rightContent}</div>}

      {children && <div className={styles.extra}>{children}</div>}
    </header>
  );
}

export default Header;
