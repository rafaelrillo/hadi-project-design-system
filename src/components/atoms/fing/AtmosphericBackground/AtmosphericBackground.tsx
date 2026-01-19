// Path: src/components/atoms/fing/AtmosphericBackground/AtmosphericBackground.tsx
import type { ReactNode } from 'react';
import styles from './AtmosphericBackground.module.css';

export interface AtmosphericBackgroundProps {
  variant?: 'default' | 'subtle' | 'intense';
  animated?: boolean;
  contained?: boolean;
  children?: ReactNode;
}

export function AtmosphericBackground({
  variant = 'default',
  animated = true,
  contained = false,
  children,
}: AtmosphericBackgroundProps) {
  const containerClasses = [
    styles.container,
    styles[variant],
    animated ? styles.animated : '',
    contained ? styles.contained : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {/* Base layer - deep background */}
      <div className={styles.baseLayer} aria-hidden="true" />

      {/* Gradient layers - create depth */}
      <div className={styles.gradientLayer} aria-hidden="true">
        <div className={styles.gradientPrimary} />
        <div className={styles.gradientSecondary} />
        <div className={styles.gradientAccent} />
      </div>

      {/* Noise texture overlay */}
      <div className={styles.noiseLayer} aria-hidden="true" />

      {/* Ambient glow effects */}
      <div className={styles.glowLayer} aria-hidden="true">
        <div className={styles.glowOrb1} />
        <div className={styles.glowOrb2} />
        <div className={styles.glowOrb3} />
      </div>

      {/* Vignette effect */}
      <div className={styles.vignetteLayer} aria-hidden="true" />

      {/* Content */}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}

export default AtmosphericBackground;
