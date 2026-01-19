// Path: src/components/atoms/FingEmblem/FingEmblem.tsx
// FING Emblem - Radar/Pulse Symbol with Stone Marble Inset Container
import React from 'react';
import styles from './FingEmblem.module.css';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export type FingEmblemAnimation =
  | 'none'
  | 'breathe'
  | 'pulse'
  | 'glow'
  | 'rotate'
  | 'ripple'
  | 'rippleSlow'
  | 'heartbeat';

export type FingEmblemVariant = 'simple' | 'framed';

export interface FingEmblemProps {
  /** Size of the emblem container in pixels */
  size?: number;
  /** Animation type */
  animation?: FingEmblemAnimation;
  /** Additional CSS class */
  className?: string;
  /** Whether to show the wordmark next to the emblem */
  showWordmark?: boolean;
  /** Wordmark position */
  wordmarkPosition?: 'right' | 'bottom';
  /** Border radius in pixels (default: 50% = circular) */
  borderRadius?: number | string;
  /** Visual variant: 'simple' (inset only) or 'framed' (outer raised + inner inset) */
  variant?: FingEmblemVariant;
  /** SVG scale relative to container (0-1, default: 0.65 for simple, 0.52 for framed) */
  svgScale?: number;
}

// ═══════════════════════════════════════════════════════════════════════════════
// RADAR SYMBOL SVG
// ═══════════════════════════════════════════════════════════════════════════════

interface RadarSymbolProps {
  size: number;
  animation: FingEmblemAnimation;
}

const RadarSymbol: React.FC<RadarSymbolProps> = ({ size, animation }) => {
  const getAnimClass = (element: 'dot' | 'ring1' | 'ring2' | 'ring3') => {
    if (animation === 'none') return '';

    const baseClass = styles[`anim${animation.charAt(0).toUpperCase() + animation.slice(1)}`];
    const elementClass = styles[element];

    return `${baseClass || ''} ${elementClass || ''}`.trim();
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`${styles.radarSvg} ${animation !== 'none' ? styles[`anim${animation.charAt(0).toUpperCase() + animation.slice(1)}`] : ''}`}
    >
      <defs>
        {/* Carve/Engrave Filter - Creates subtle carved-in-stone effect */}
        <filter id="fing-carve-subtle" x="-25%" y="-25%" width="150%" height="150%">
          {/* Light shadow (from top-left) */}
          <feOffset dx="1" dy="1" in="SourceAlpha" result="light" />
          <feGaussianBlur in="light" stdDeviation="0.4" result="lightBlur" />
          <feFlood floodColor="rgba(255,255,255,0.92)" result="lightColor" />
          <feComposite in="lightColor" in2="lightBlur" operator="in" result="lightShadow" />

          {/* Dark shadow (from bottom-right) */}
          <feOffset dx="-1" dy="-1" in="SourceAlpha" result="dark" />
          <feGaussianBlur in="dark" stdDeviation="0.6" result="darkBlur" />
          <feFlood floodColor="rgba(140,150,165,0.65)" result="darkColor" />
          <feComposite in="darkColor" in2="darkBlur" operator="in" result="darkShadow" />

          {/* Merge: dark shadow + light shadow + source graphic */}
          <feMerge>
            <feMergeNode in="darkShadow" />
            <feMergeNode in="lightShadow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Center Dot */}
      <circle
        cx="50"
        cy="50"
        r="5"
        fill="var(--fing-symbol-fill, #babec4)"
        filter="url(#fing-carve-subtle)"
        className={`${styles.centerDot} ${getAnimClass('dot')}`}
      />

      {/* Ring 1 - Inner */}
      <circle
        cx="50"
        cy="50"
        r="15"
        fill="none"
        stroke="var(--fing-symbol-stroke, #b2b6bc)"
        strokeWidth="2"
        filter="url(#fing-carve-subtle)"
        className={`${styles.ring} ${styles.ring1} ${getAnimClass('ring1')}`}
      />

      {/* Ring 2 - Middle */}
      <circle
        cx="50"
        cy="50"
        r="26"
        fill="none"
        stroke="var(--fing-symbol-stroke, #b2b6bc)"
        strokeWidth="2"
        filter="url(#fing-carve-subtle)"
        className={`${styles.ring} ${styles.ring2} ${getAnimClass('ring2')}`}
      />

      {/* Ring 3 - Outer */}
      <circle
        cx="50"
        cy="50"
        r="38"
        fill="none"
        stroke="var(--fing-symbol-stroke, #b2b6bc)"
        strokeWidth="2"
        filter="url(#fing-carve-subtle)"
        className={`${styles.ring} ${styles.ring3} ${getAnimClass('ring3')}`}
      />
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// WORDMARK COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

interface WordmarkProps {
  size: number;
}

const Wordmark: React.FC<WordmarkProps> = ({ size }) => {
  // Scale wordmark based on emblem size
  const fontSize = Math.max(size * 0.38, 14);

  return (
    <span
      className={styles.wordmark}
      style={{ fontSize }}
    >
      fing
    </span>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export const FingEmblem: React.FC<FingEmblemProps> = ({
  size = 100,
  animation = 'none',
  className = '',
  showWordmark = false,
  wordmarkPosition = 'right',
  borderRadius,
  variant = 'simple',
  svgScale,
}) => {
  const containerClasses = [
    styles.emblemContainer,
    showWordmark && styles[`wordmark${wordmarkPosition.charAt(0).toUpperCase() + wordmarkPosition.slice(1)}`],
    className,
  ].filter(Boolean).join(' ');

  // Compute border radius style
  const radiusStyle = borderRadius !== undefined
    ? typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius
    : '50%';

  // Framed variant: outer raised ring + inner inset ring
  if (variant === 'framed') {
    const outerSize = size;
    const innerSize = size * 0.75;
    const framedSvgSize = size * (svgScale ?? 0.52);

    return (
      <div className={containerClasses}>
        {/* Outer RAISED ring */}
        <div
          className={`${styles.emblemOuter} ${animation === 'glow' ? styles.glowAnimation : ''}`}
          style={{
            width: outerSize,
            height: outerSize,
            borderRadius: radiusStyle,
          }}
        >
          {/* Inner INSET ring */}
          <div
            className={styles.emblemInner}
            style={{
              width: innerSize,
              height: innerSize,
              borderRadius: radiusStyle,
            }}
          >
            <RadarSymbol size={framedSvgSize} animation={animation} />
          </div>
        </div>
        {showWordmark && <Wordmark size={size} />}
      </div>
    );
  }

  // Simple variant: single inset container
  const svgSize = size * (svgScale ?? 0.65);

  const insetClasses = [
    styles.emblemInset,
    animation === 'glow' && styles.glowAnimation,
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <div
        className={insetClasses}
        style={{
          width: size,
          height: size,
          borderRadius: radiusStyle,
        }}
      >
        <RadarSymbol size={svgSize} animation={animation} />
      </div>
      {showWordmark && <Wordmark size={size} />}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// LOCKUP VARIANTS
// ═══════════════════════════════════════════════════════════════════════════════

export interface FingLockupProps {
  /** Size of the emblem (wordmark scales proportionally) */
  size?: number;
  /** Animation for the emblem */
  animation?: FingEmblemAnimation;
  /** Additional CSS class */
  className?: string;
}

/** Horizontal lockup: emblem + wordmark side by side */
export const FingLockupHorizontal: React.FC<FingLockupProps> = ({
  size = 70,
  animation = 'none',
  className = '',
}) => {
  return (
    <FingEmblem
      size={size}
      animation={animation}
      showWordmark
      wordmarkPosition="right"
      className={className}
    />
  );
};

/** Vertical lockup: emblem on top, wordmark below */
export const FingLockupVertical: React.FC<FingLockupProps> = ({
  size = 80,
  animation = 'none',
  className = '',
}) => {
  return (
    <FingEmblem
      size={size}
      animation={animation}
      showWordmark
      wordmarkPosition="bottom"
      className={className}
    />
  );
};

export default FingEmblem;
