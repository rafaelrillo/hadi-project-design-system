// Path: src/components/atoms/Button/Button.types.ts

import type { ReactNode, MouseEvent } from 'react';

/**
 * All available button variants in the SENTINEL design system
 * - Neumorphism (15): Tactile, extruded buttons with soft shadows
 * - Glass (8): Translucent buttons with backdrop blur
 * - Glass-Neu (8): Hybrid combining glass and neumorphic effects
 * - Legacy (5): Backward-compatible aliases for existing code
 */
export type ButtonVariant =
  // Neumorphism variants (15)
  | 'neu-soft'      // Classic elevated - general actions
  | 'neu-flat'      // Subtle elevation - secondary, toolbars
  | 'neu-minimal'   // Almost flat - tertiary, lists
  | 'neu-deep'      // Strong shadows - important CTAs
  | 'neu-pillow'    // Soft gradient - premium, highlights
  | 'neu-ridge'     // Internal bevel - media controls
  | 'neu-sharp'     // Hard shadow - retro, games
  | 'neu-float'     // Bottom shadow - cards, floating
  | 'neu-layered'   // Multi-layer - 3D effect
  | 'neu-outline'   // Double border - alternative
  | 'neu-emboss'    // Embossed text - headers
  | 'neu-pressed'   // Always inset - active toggle
  | 'neu-concave'   // Bowl shape - inputs, wells
  | 'neu-accent'    // Colored + glow - primary action
  | 'neu-glow'      // Hover with glow - highlight
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
  | 'secondary'     // Maps to neu-flat
  | 'destructive'   // Maps to glass-rose
  | 'success'       // Maps to glass-emerald
  | 'ghost'         // Maps to neu-minimal
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
