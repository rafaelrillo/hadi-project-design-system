// Path: src/components/molecules/Card/Card.tsx
import { type ReactNode, type CSSProperties, type HTMLAttributes, forwardRef } from 'react';
import { useLightEngineOptional } from '@contexts/LightEngineContext';
import styles from './Card.module.css';

export type CardStatus = 'success' | 'warning' | 'error' | 'neutral';
export type CardStyle = 'default' | 'outlined' | 'elevated' | 'highlighted' | 'glow' | 'pressed' | 'flat' | 'neuPanel';
export type CardSize = 'compact' | 'default' | 'spacious';

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  children?: ReactNode;
  /** Content rendered in the header section */
  header?: ReactNode;
  /** Content rendered in the footer section */
  footer?: ReactNode;
  /** Card title (alternative to header for simple cases) */
  title?: ReactNode;
  /** Card subtitle */
  subtitle?: ReactNode;
  /** Status variant with left border accent */
  status?: CardStatus;
  /** Visual style variant */
  cardStyle?: CardStyle;
  /** Size variant affecting padding */
  size?: CardSize;
  /** Make the card clickable/interactive */
  interactive?: boolean;
  /** Show status dot indicator in corner */
  showStatusDot?: boolean;
  /** Enable dynamic shadows from Light Engine */
  dynamicShadows?: boolean;
  className?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    children,
    header,
    footer,
    title,
    subtitle,
    status,
    cardStyle = 'default',
    size = 'default',
    interactive = false,
    showStatusDot = false,
    dynamicShadows = true,
    className,
    onClick,
    ...rest
  },
  ref
) {
  // Get light engine context (optional)
  const lightEngine = useLightEngineOptional();

  // Build className
  const getCardClassName = (): string => {
    const classes = [styles.card];

    // Add status variant
    const statusMap: Record<CardStatus, string> = {
      success: styles.variantSuccess,
      warning: styles.variantWarning,
      error: styles.variantError,
      neutral: styles.variantNeutral,
    };
    if (status) classes.push(statusMap[status]);

    // Add style variant
    const styleMap: Record<CardStyle, string | undefined> = {
      default: undefined,
      outlined: styles.outlined,
      elevated: styles.elevated,
      highlighted: styles.highlighted,
      glow: styles.glow,
      pressed: styles.pressed,
      flat: styles.flat,
      neuPanel: styles.neuPanel,
    };
    if (styleMap[cardStyle]) classes.push(styleMap[cardStyle]!);

    // Add size variant
    if (size === 'compact') classes.push(styles.compact);
    if (size === 'spacious') classes.push(styles.spacious);

    // Add modifiers
    if (interactive || onClick) classes.push(styles.interactive);
    if (showStatusDot) {
      classes.push(styles.status);
      if (status === 'warning') classes.push(styles.statusWarning);
      if (status === 'error') classes.push(styles.statusError);
    }

    // Add dynamic shadows class
    if (dynamicShadows && lightEngine && cardStyle === 'neuPanel') {
      classes.push(styles.dynamicShadows);
    }

    if (className) classes.push(className);

    return classes.join(' ');
  };

  // Get dynamic panel shadow styles
  const getDynamicStyles = (): CSSProperties | undefined => {
    if (!dynamicShadows || !lightEngine || cardStyle !== 'neuPanel') return undefined;

    const { shadows } = lightEngine;
    return {
      boxShadow: `${shadows.getNeuPanelShadow(20, 60)}, inset 0 1px 0 rgba(255, 255, 255, 0.7)`,
    };
  };

  // Render header content
  const renderHeader = () => {
    if (header) {
      return <div className={styles.header}>{header}</div>;
    }
    if (title || subtitle) {
      return (
        <div className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      );
    }
    return null;
  };

  return (
    <div
      ref={ref}
      className={getCardClassName()}
      style={getDynamicStyles()}
      onClick={onClick}
      role={interactive || onClick ? 'button' : undefined}
      tabIndex={interactive || onClick ? 0 : undefined}
      {...rest}
    >
      {renderHeader()}
      {children && <div className={styles.body}>{children}</div>}
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
});

export { Card as default };
