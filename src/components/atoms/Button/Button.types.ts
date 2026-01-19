// Path: src/components/atoms/Button/Button.types.ts

import type { ReactNode, MouseEvent } from 'react';

/**
 * All available button variants in the SENTINEL design system
 * - Stone Marble (20): Carved, elegant neumorphic buttons
 * - Glass (8): Translucent buttons with backdrop blur
 * - Glass-Neu (8): Hybrid combining glass and neumorphic effects
 * - Legacy (5): Backward-compatible aliases for existing code
 */
export type ButtonVariant =
  // Stone Marble Neumorphic variants (20)
  | 'marble-raised'       // Classic raised - general actions
  | 'marble-soft'         // Soft elevation - secondary
  | 'marble-deep'         // Strong shadows - important CTAs
  | 'marble-inset'        // Pressed/concave - toggles, wells
  | 'marble-carved'       // Raised with carved text - elegant
  | 'marble-embossed'     // Inset with raised text - contrast
  | 'marble-pillow'       // Gradient pillow - premium
  | 'marble-ridge'        // Beveled frame - decorative
  | 'marble-layered'      // Multi-layer depth - 3D
  | 'marble-outline'      // Thin border raised - minimal
  | 'marble-accent'       // Teal accent raised - primary
  | 'marble-accent-inset' // Teal accent inset - active
  | 'marble-diamond'      // Diamond corners - unique
  | 'marble-frame'        // Decorative frame - formal
  | 'marble-seal'         // Circular seal style - badges
  | 'marble-pill'         // Pill shape - soft actions
  | 'marble-stadium'      // Stadium track - wide actions
  | 'marble-sharp'        // Hard shadows - retro
  | 'marble-float'        // Bottom shadow - floating
  | 'marble-glow'         // Accent glow on hover - highlight
  // Selected variants - subtle navigation
  | 'selected-ghost-nav'  // Muted pill frame, brand color on hover
  // Glass variants (8)
  | 'glass-teal'    // Primary, accent
  | 'glass-amber'   // Warning, gold
  | 'glass-rose'    // Favorites, likes
  | 'glass-violet'  // Premium, special
  | 'glass-emerald' // Success, confirm
  | 'glass-sky'     // Info, links
  | 'glass-smoke'   // Secondary, neutral
  | 'glass-frost'   // Ice, cold
  // Glass-Neu hybrid variants (8)
  | 'glass-neu-teal'
  | 'glass-neu-amber'
  | 'glass-neu-rose'
  | 'glass-neu-violet'
  | 'glass-neu-emerald'
  | 'glass-neu-sky'
  | 'glass-neu-smoke'
  | 'glass-neu-frost'
  // Legacy variants (backward compatibility)
  | 'primary'       // Maps to glass-teal
  | 'secondary'     // Maps to marble-soft
  | 'destructive'   // Maps to glass-rose
  | 'success'       // Maps to glass-emerald
  | 'ghost'         // Maps to marble-outline
  | 'glass'         // Maps to glass-teal
  | 'with-icon';    // Maps to glass-teal

/**
 * Button size options
 */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Main Button component props
 */
export interface ButtonProps {
  /** Button content */
  children: ReactNode;
  /** Visual variant - determines colors and effects */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Icon to show on the left side */
  leftIcon?: ReactNode;
  /** Icon to show on the right side */
  rightIcon?: ReactNode;
  /** Shows loading spinner and disables interaction */
  loading?: boolean;
  /** Disables the button */
  disabled?: boolean;
  /** Makes the button full width */
  fullWidth?: boolean;
  /** Uses pill shape (fully rounded) */
  pill?: boolean;
  /** HTML button type */
  type?: 'button' | 'submit' | 'reset';
  /** Click handler */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** Additional CSS class */
  className?: string;
  /** Accessible label for screen readers */
  'aria-label'?: string;
  // Legacy props (backward compatibility)
  /** @deprecated Use leftIcon instead */
  icon?: ReactNode;
  /** @deprecated Use aria-label instead */
  ariaLabel?: string;
  /** @deprecated Use iconOnly prop with IconButton instead */
  iconOnly?: boolean;
}

/**
 * IconButton component props - circular button with just an icon
 */
export interface IconButtonProps {
  /** Icon element to display */
  icon: ReactNode;
  /** Visual variant */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Optional notification badge count */
  badge?: number;
  /** Tooltip text on hover */
  tooltip?: string;
  /** Whether the button is in pressed/active state */
  pressed?: boolean;
  /** Disables the button */
  disabled?: boolean;
  /** Required accessible label */
  'aria-label': string;
  /** Click handler */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** Additional CSS class */
  className?: string;
}

/**
 * ToggleButton component props - switch-style on/off button
 */
export interface ToggleButtonProps {
  /** Current toggle state */
  isOn: boolean;
  /** Callback when toggle changes */
  onToggle: () => void;
  /** Size of the toggle */
  size?: 'sm' | 'md' | 'lg';
  /** Disables the toggle */
  disabled?: boolean;
  /** Accessible label */
  'aria-label'?: string;
  /** Additional CSS class */
  className?: string;
}

/**
 * ButtonGroup component props - container for related buttons
 */
export interface ButtonGroupProps {
  /** Button children */
  children: ReactNode;
  /** Container style */
  variant?: 'neu' | 'glass';
  /** Layout orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Gap between buttons in pixels */
  gap?: number;
  /** Additional CSS class */
  className?: string;
}

/**
 * Tab item with optional icon
 */
export interface TabItem {
  /** Tab label text */
  label: string;
  /** Optional icon element */
  icon?: ReactNode;
}

/**
 * TabGroup component props - horizontal tab navigation
 */
export interface TabGroupProps {
  /** Array of tab labels (strings) or tab items (with icons) */
  tabs: string[] | TabItem[];
  /** Currently active tab index */
  activeTab: number;
  /** Callback when tab changes */
  onChange: (index: number) => void;
  /** Size of the tabs */
  size?: 'sm' | 'md' | 'lg';
  /** Show only icons (hide labels) */
  iconOnly?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * Stepper component props - increment/decrement control
 */
export interface StepperProps {
  /** Current value */
  value: number;
  /** Callback when value changes */
  onChange: (value: number) => void;
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Visual style */
  variant?: 'neu' | 'glass';
  /** Size of the stepper */
  size?: 'sm' | 'md' | 'lg';
  /** Disables the stepper */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
}
