// Path: src/components/atoms/Button/Button.tsx

import type { ButtonProps, ButtonVariant, ButtonSize } from './Button.types';
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
  // Selected variants
  'selected-ghost-nav': styles.selectedGhostNav,
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
 * Button component with 36 variants across Stone Marble, Glass, and Glass-Neu styles.
 *
 * @example
 * // Primary action with teal glass
 * <Button variant="glass-teal" size="md" leftIcon={<Save size={18} />}>
 *   Save Changes
 * </Button>
 *
 * @example
 * // Secondary action with Stone Marble
 * <Button variant="marble-raised" size="sm">
 *   Cancel
 * </Button>
 *
 * @example
 * // Elegant carved button
 * <Button variant="marble-carved" size="lg">
 *   Confirm
 * </Button>
 *
 * @example
 * // Accent primary action
 * <Button variant="marble-accent" loading>
 *   Processing...
 * </Button>
 */
export function Button({
  children,
  variant = 'marble-raised',
  size = 'md',
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  fullWidth = false,
  pill = false,
  type = 'button',
  onClick,
  className,
  'aria-label': ariaLabelProp,
  // Legacy props
  icon,
  ariaLabel: legacyAriaLabel,
  iconOnly = false,
  ...props
}: ButtonProps) {
  // Handle legacy props
  const effectiveLeftIcon = leftIcon || icon;
  const effectiveAriaLabel = ariaLabelProp || legacyAriaLabel;

  const classNames = [
    styles.button,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && styles.fullWidth,
    pill && styles.pill,
    loading && styles.loading,
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled || loading}
      onClick={onClick}
      aria-label={effectiveAriaLabel}
      aria-busy={loading}
      {...props}
    >
      {loading && <span className={styles.spinner} />}
      {effectiveLeftIcon && <span className={styles.icon}>{effectiveLeftIcon}</span>}
      {!iconOnly && <span className={styles.label}>{children}</span>}
      {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
    </button>
  );
}

export default Button;
