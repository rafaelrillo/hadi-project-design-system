// Path: src/components/atoms/QuafiWordmark/QuafiWordmark.tsx
// QUAFI Wordmark Component - 12 Inset/Cavado Variations
// Typography: Cormorant Garamond Light (300)

import React from "react";
import styles from "./QuafiWordmark.module.css";

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export type QuafiWordmarkVariant =
  | "whisper" // 1. Casi plano, muy sutil
  | "soft" // 2. Suave estándar
  | "medium" // 3. Moderado, equilibrado
  | "deep" // 4. Profundo, más sombra
  | "carved" // 5. ⭐ Tallado invertido (recomendado)
  | "pressed" // 6. ⭐ Presionado fuerte (alternativa recomendada)
  | "bowl" // 7. Cuenco con gradiente radial
  | "channel" // 8. Canal/ranura
  | "etched" // 9. Grabado con borde interior
  | "crater" // 10. Cráter profundo
  | "pillow" // 11. Almohadilla
  | "sharp"; // 12. Bordes definidos

export interface QuafiWordmarkProps {
  /** Inset variation to use */
  variant?: QuafiWordmarkVariant;
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

const variantConfig: Record<
  QuafiWordmarkVariant,
  {
    insetShadow: string;
    textShadow: string;
    textColor: string;
    background?: string;
    border?: string;
  }
> = {
  whisper: {
    insetShadow: "var(--quafi-wm-inset-whisper)",
    textShadow: "var(--quafi-wm-text-whisper)",
    textColor: "#d5d8dc",
  },
  soft: {
    insetShadow: "var(--quafi-wm-inset-soft)",
    textShadow: "var(--quafi-wm-text-soft)",
    textColor: "#d5d8dc",
  },
  medium: {
    insetShadow: "var(--quafi-wm-inset-medium)",
    textShadow: "var(--quafi-wm-text-medium)",
    textColor: "#d5d8dc",
  },
  deep: {
    insetShadow: "var(--quafi-wm-inset-deep)",
    textShadow: "var(--quafi-wm-text-deep)",
    textColor: "#d5d8dc",
  },
  carved: {
    insetShadow: "var(--quafi-wm-inset-carved)",
    textShadow: "var(--quafi-wm-text-carved)",
    textColor: "#d5d8dc",
  },
  pressed: {
    insetShadow: "var(--quafi-wm-inset-pressed)",
    textShadow: "var(--quafi-wm-text-pressed)",
    textColor: "#c5c9ce",
    background: "var(--quafi-wm-bg-pressed)",
  },
  bowl: {
    insetShadow: "var(--quafi-wm-inset-bowl)",
    textShadow: "var(--quafi-wm-text-bowl)",
    textColor: "#d5d8dc",
    background: "var(--quafi-wm-bg-bowl)",
  },
  channel: {
    insetShadow: "var(--quafi-wm-inset-channel)",
    textShadow: "var(--quafi-wm-text-channel)",
    textColor: "#d5d8dc",
  },
  etched: {
    insetShadow: "var(--quafi-wm-inset-etched)",
    textShadow: "var(--quafi-wm-text-etched)",
    textColor: "#d5d8dc",
    border: "1px solid rgba(255, 255, 255, 0.5)",
  },
  crater: {
    insetShadow: "var(--quafi-wm-inset-crater)",
    textShadow: "var(--quafi-wm-text-crater)",
    textColor: "#caced3",
    background: "var(--quafi-wm-bg-crater)",
  },
  pillow: {
    insetShadow: "var(--quafi-wm-inset-pillow)",
    textShadow: "var(--quafi-wm-text-pillow)",
    textColor: "#d5d8dc",
    background: "var(--quafi-wm-bg-pillow)",
  },
  sharp: {
    insetShadow: "var(--quafi-wm-inset-sharp)",
    textShadow: "var(--quafi-wm-text-sharp)",
    textColor: "#d5d8dc",
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export const QuafiWordmark: React.FC<QuafiWordmarkProps> = ({
  variant = "carved",
  size = 72,
  showContainer = true,
  containerPadding = 32,
  containerRadius = 16,
  className,
  style,
}) => {
  const config = variantConfig[variant];

  const wordmarkStyle: React.CSSProperties = {
    fontFamily: "var(--quafi-wordmark-font)",
    fontWeight: "var(--quafi-wordmark-weight)" as unknown as number,
    fontSize: `${size}px`,
    letterSpacing: "var(--quafi-wordmark-tracking)",
    color: config.textColor,
    textShadow: config.textShadow,
    lineHeight: 1,
    userSelect: "none",
  };

  const containerStyle: React.CSSProperties = showContainer
    ? {
        background: config.background || "var(--marble-base)",
        boxShadow: config.insetShadow,
        borderRadius: `${containerRadius}px`,
        padding: `${containerPadding}px ${containerPadding * 0.75}px`,
        border: config.border,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }
    : {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      };

  return (
    <div
      className={`${styles.container} ${className || ""}`}
      style={containerStyle}
    >
      <span className={styles.wordmark} style={wordmarkStyle}>
        quafi
      </span>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// STANDALONE TEXT (without container)
// ═══════════════════════════════════════════════════════════════════════════════

export interface QuafiWordmarkTextProps {
  variant?: QuafiWordmarkVariant;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const QuafiWordmarkText: React.FC<QuafiWordmarkTextProps> = ({
  variant = "carved",
  size = 72,
  className,
  style,
}) => {
  const config = variantConfig[variant];

  const textStyle: React.CSSProperties = {
    fontFamily: "var(--quafi-wordmark-font)",
    fontWeight: "var(--quafi-wordmark-weight)" as unknown as number,
    fontSize: `${size}px`,
    letterSpacing: "var(--quafi-wordmark-tracking)",
    color: config.textColor,
    textShadow: config.textShadow,
    lineHeight: 1,
    userSelect: "none",
    ...style,
  };

  return (
    <span className={`${styles.wordmark} ${className || ""}`} style={textStyle}>
      quafi
    </span>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// UTILITY: Get all variants
// ═══════════════════════════════════════════════════════════════════════════════

export const WORDMARK_VARIANTS: QuafiWordmarkVariant[] = [
  "whisper",
  "soft",
  "medium",
  "deep",
  "carved",
  "pressed",
  "bowl",
  "channel",
  "etched",
  "crater",
  "pillow",
  "sharp",
];

export const RECOMMENDED_VARIANTS: QuafiWordmarkVariant[] = [
  "carved",
  "pressed",
];

export default QuafiWordmark;
