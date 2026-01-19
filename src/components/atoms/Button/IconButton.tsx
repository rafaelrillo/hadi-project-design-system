// Path: src/components/atoms/Button/IconButton.tsx

import type { IconButtonProps, ButtonVariant, ButtonSize } from './Button.types';
import styles from './Button.module.css';

/**
 * Maps variant names to CSS module class names
 */
const variantClasses: Record<ButtonVariant, string> = {
  // Stone Marble Neumorphic variants (20)
  'marble-raised': styles.marbleRaised,
  'marble-soft': styles.marbleSoft,
  'marble-deep': styles.marbleDeep,
  'marble-inset': styles.marbleInset,
  'marble-carved': styles.marbleCarved,
  'marble-embossed': styles.marbleEmbossed,
  'marble-pillow': styles.marblePillow,
  'marble-ridge': styles.marbleRidge,
  'marble-layered': styles.marbleLayered,
  'marble-outline': styles.marbleOutline,
  'marble-accent': styles.marbleAccent,
  'marble-accent-inset': styles.marbleAccentInset,
  'marble-diamond': styles.marbleDiamond,
  'marble-frame': styles.marbleFrame,
  'marble-seal': styles.marbleSeal,
  'marble-pill': styles.marblePill,
  'marble-stadium': styles.marbleStadium,
  'marble-sharp': styles.marbleSharp,
  'marble-float': styles.marbleFloat,
  'marble-glow': styles.marbleGlow,
  // Glass variants
  'glass-teal': styles.glassTeal,
  'glass-amber': styles.glassAmber,
  'glass-rose': styles.glassRose,
  'glass-violet': styles.glassViolet,
  'glass-emerald': styles.glassEmerald,
  'glass-sky': styles.glassSky,
  'glass-smoke': styles.glassSmoke,
  'glass-frost': styles.glassFrost,
  // Glass-Neu hybrid variants
  'glass-neu-teal': styles.glassNeuTeal,
  'glass-neu-amber': styles.glassNeuAmber,
  'glass-neu-rose': styles.glassNeuRose,
  'glass-neu-violet': styles.glassNeuViolet,
  'glass-neu-emerald': styles.glassNeuEmerald,
  'glass-neu-sky': styles.glassNeuSky,
  'glass-neu-smoke': styles.glassNeuSmoke,
  'glass-neu-frost': styles.glassNeuFrost,
  // Selected variants
  'selected-ghost-nav': styles.selectedGhostNav,
  // Legacy variants (backward compatibility)
  'primary': styles.glassTeal,
  'secondary': styles.marbleSoft,
  'destructive': styles.glassRose,
  'success': styles.glassEmerald,
  'ghost': styles.marbleOutline,
  'glass': styles.glassTeal,
  'with-icon': styles.glassTeal,
};

/**
 * Maps size names to CSS module class names
 */
const sizeClasses: Record<ButtonSize, string> = {
  xs: styles.xs,
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
  xl: styles.xl,
};

/**
 * Circular icon button component with optional badge and tooltip.
 *
 * @example
 * // Basic icon button
 * <IconButton
 *   icon={<Settings size={20} />}
 *   variant="marble-raised"
 *   aria-label="Open settings"
 *   onClick={openSettings}
 * />
 *
 * @example
 * // With notification badge
 * <IconButton
 *   icon={<Bell size={20} />}
 *   variant="glass-teal"
 *   badge={5}
 *   tooltip="Notifications"
 *   aria-label="5 notifications"
 * />
 */
export function IconButton({
  icon,
  variant = 'marble-raised',
  size = 'md',
  badge,
  tooltip,
  pressed = false,
  disabled = false,
  'aria-label': ariaLabel,
  onClick,
  className,
}: IconButtonProps) {
  const classNames = [
    styles.button,
    styles.iconButton,
    variantClasses[variant],
    sizeClasses[size],
    pressed && styles.marbleInset,
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classNames}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={pressed}
    >
      {icon}
      {badge !== undefined && badge > 0 && (
        <span className={styles.badge}>{badge > 99 ? '99+' : badge}</span>
      )}
      {tooltip && <span className={styles.tooltip}>{tooltip}</span>}
    </button>
  );
}

export default IconButton;
