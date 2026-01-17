// Path: src/components/atoms/Button/IconButton.tsx

import type { IconButtonProps, ButtonVariant, ButtonSize } from './Button.types';
import styles from './Button.module.css';

/**
 * Maps variant names to CSS module class names
 */
const variantClasses: Record<ButtonVariant, string> = {
  // Neumorphism variants
  'neu-soft': styles.neuSoft,
  'neu-flat': styles.neuFlat,
  'neu-minimal': styles.neuMinimal,
  'neu-deep': styles.neuDeep,
  'neu-pillow': styles.neuPillow,
  'neu-ridge': styles.neuRidge,
  'neu-sharp': styles.neuSharp,
  'neu-float': styles.neuFloat,
  'neu-layered': styles.neuLayered,
  'neu-outline': styles.neuOutline,
  'neu-emboss': styles.neuEmboss,
  'neu-pressed': styles.neuPressed,
  'neu-concave': styles.neuConcave,
  'neu-accent': styles.neuAccent,
  'neu-glow': styles.neuGlow,
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
  // Legacy variants (backward compatibility)
  'primary': styles.glassTeal,
  'secondary': styles.neuFlat,
  'destructive': styles.glassRose,
  'success': styles.glassEmerald,
  'ghost': styles.neuMinimal,
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
 *   variant="neu-soft"
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
  variant = 'neu-soft',
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
    pressed && styles.neuPressed,
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
