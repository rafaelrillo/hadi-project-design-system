// Path: src/components/atoms/FingWordmark/FingWordmark.tsx
// FING Wordmark Component - 12 Inset/Cavado Variations
// Typography: Cormorant Garamond Light (300)

import React from 'react';
import styles from './FingWordmark.module.css';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export type FingWordmarkVariant =
  | 'whisper'   // 1. Casi plano, muy sutil
  | 'soft'      // 2. Suave estándar
  | 'medium'    // 3. Moderado, equilibrado
  | 'deep'      // 4. Profundo, más sombra
  | 'carved'    // 5. ⭐ Tallado invertido (recomendado)
  | 'pressed'   // 6. ⭐ Presionado fuerte (alternativa recomendada)
  | 'bowl'      // 7. Cuenco con gradiente radial
  | 'channel'   // 8. Canal/ranura
  | 'etched'    // 9. Grabado con borde interior
  | 'crater'    // 10. Cráter profundo
  | 'pillow'    // 11. Almohadilla
  | 'sharp';    // 12. Bordes definidos

export interface FingWordmarkProps {
  /** Inset variation to use */
  variant?: FingWordmarkVariant;
  /** Font size in pixels */
  size?: number;
  /** Whether to show the container */
  showContainer?: boolean;
  /** Container padding */
  containerPadding?: number;
  /** Container border radius */
  containerRadius?: number;
  /** Custom className for additional styling */
  className?: string;
  /** Custom style overrides */
  style?: React.CSSProperties;
}

// ═══════════════════════════════════════════════════════════════════════════════
// VARIANT CONFIGURATIONS
// ═══════════════════════════════════════════════════════════════════════════════

const variantConfig: Record<FingWordmarkVariant, {
  insetShadow: string;
  textShadow: string;
  textColor: string;
  background?: string;
  border?: string;
}> = {
  whisper: {
    insetShadow: 'var(--fing-wm-inset-whisper)',
    textShadow: 'var(--fing-wm-text-whisper)',
    textColor: '#d5d8dc',
  },
  soft: {
    insetShadow: 'var(--fing-wm-inset-soft)',
    textShadow: 'var(--fing-wm-text-soft)',
    textColor: '#d5d8dc',
  },
  medium: {
    insetShadow: 'var(--fing-wm-inset-medium)',
    textShadow: 'var(--fing-wm-text-medium)',
    textColor: '#d5d8dc',
  },
  deep: {
    insetShadow: 'var(--fing-wm-inset-deep)',
    textShadow: 'var(--fing-wm-text-deep)',
    textColor: '#d5d8dc',
  },
  carved: {
    insetShadow: 'var(--fing-wm-inset-carved)',
    textShadow: 'var(--fing-wm-text-carved)',
    textColor: '#d5d8dc',
  },
  pressed: {
    insetShadow: 'var(--fing-wm-inset-pressed)',
    textShadow: 'var(--fing-wm-text-pressed)',
    textColor: '#c5c9ce',
    background: 'var(--fing-wm-bg-pressed)',
  },
  bowl: {
    insetShadow: 'var(--fing-wm-inset-bowl)',
    textShadow: 'var(--fing-wm-text-bowl)',
    textColor: '#d5d8dc',
    background: 'var(--fing-wm-bg-bowl)',
  },
  channel: {
    insetShadow: 'var(--fing-wm-inset-channel)',
    textShadow: 'var(--fing-wm-text-channel)',
    textColor: '#d5d8dc',
  },
  etched: {
    insetShadow: 'var(--fing-wm-inset-etched)',
    textShadow: 'var(--fing-wm-text-etched)',
    textColor: '#d5d8dc',
    border: '1px solid rgba(255, 255, 255, 0.5)',
  },
  crater: {
    insetShadow: 'var(--fing-wm-inset-crater)',
    textShadow: 'var(--fing-wm-text-crater)',
    textColor: '#caced3',
    background: 'var(--fing-wm-bg-crater)',
  },
  pillow: {
    insetShadow: 'var(--fing-wm-inset-pillow)',
    textShadow: 'var(--fing-wm-text-pillow)',
    textColor: '#d5d8dc',
    background: 'var(--fing-wm-bg-pillow)',
  },
  sharp: {
    insetShadow: 'var(--fing-wm-inset-sharp)',
    textShadow: 'var(--fing-wm-text-sharp)',
    textColor: '#d5d8dc',
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export const FingWordmark: React.FC<FingWordmarkProps> = ({
  variant = 'carved',
  size = 72,
  showContainer = true,
  containerPadding = 32,
  containerRadius = 16,
  className,
  style,
}) => {
  const config = variantConfig[variant];

  const wordmarkStyle: React.CSSProperties = {
    fontFamily: 'var(--fing-wordmark-font)',
    fontWeight: 'var(--fing-wordmark-weight)' as unknown as number,
    fontSize: `${size}px`,
    letterSpacing: 'var(--fing-wordmark-tracking)',
    color: config.textColor,
    textShadow: config.textShadow,
    lineHeight: 1,
    userSelect: 'none',
  };

  const containerStyle: React.CSSProperties = showContainer ? {
    background: config.background || 'var(--marble-base)',
    boxShadow: config.insetShadow,
    borderRadius: `${containerRadius}px`,
    padding: `${containerPadding}px ${containerPadding * 0.75}px`,
    border: config.border,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...style,
  } : {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...style,
  };

  return (
    <div className={`${styles.container} ${className || ''}`} style={containerStyle}>
      <span className={styles.wordmark} style={wordmarkStyle}>
        fing
      </span>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// STANDALONE TEXT (without container)
// ═══════════════════════════════════════════════════════════════════════════════

export interface FingWordmarkTextProps {
  variant?: FingWordmarkVariant;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const FingWordmarkText: React.FC<FingWordmarkTextProps> = ({
  variant = 'carved',
  size = 72,
  className,
  style,
}) => {
  const config = variantConfig[variant];

  const textStyle: React.CSSProperties = {
    fontFamily: 'var(--fing-wordmark-font)',
    fontWeight: 'var(--fing-wordmark-weight)' as unknown as number,
    fontSize: `${size}px`,
    letterSpacing: 'var(--fing-wordmark-tracking)',
    color: config.textColor,
    textShadow: config.textShadow,
    lineHeight: 1,
    userSelect: 'none',
    ...style,
  };

  return (
    <span className={`${styles.wordmark} ${className || ''}`} style={textStyle}>
      fing
    </span>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// UTILITY: Get all variants
// ═══════════════════════════════════════════════════════════════════════════════

export const WORDMARK_VARIANTS: FingWordmarkVariant[] = [
  'whisper',
  'soft',
  'medium',
  'deep',
  'carved',
  'pressed',
  'bowl',
  'channel',
  'etched',
  'crater',
  'pillow',
  'sharp',
];

export const RECOMMENDED_VARIANTS: FingWordmarkVariant[] = ['carved', 'pressed'];

export default FingWordmark;
