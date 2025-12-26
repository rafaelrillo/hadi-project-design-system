// Path: src/components/organisms/sentinel/MarketStateIndicator/MarketStateIndicator.tsx
import { useMemo } from 'react';
import styles from './MarketStateIndicator.module.css';

export type MarketState = 'bullish' | 'bearish' | 'neutral' | 'uncertain';

export interface MarketStateIndicatorProps {
  state: MarketState;
  label?: string;
  description?: string;
  lastUpdated?: Date;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const stateLabels: Record<MarketState, string> = {
  bullish: 'Bullish',
  bearish: 'Bearish',
  neutral: 'Neutral',
  uncertain: 'Uncertain',
};

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'Just now';
  if (diffMins === 1) return '1 min ago';
  if (diffMins < 60) return `${diffMins} min ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours === 1) return '1 hour ago';
  if (diffHours < 24) return `${diffHours} hours ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return '1 day ago';
  return `${diffDays} days ago`;
}

export function MarketStateIndicator({
  state,
  label = 'Market Outlook',
  description,
  lastUpdated,
  animated = true,
  size = 'md',
}: MarketStateIndicatorProps) {
  const timeAgo = useMemo(() => {
    return lastUpdated ? formatTimeAgo(lastUpdated) : null;
  }, [lastUpdated]);

  const containerClasses = [
    styles.container,
    styles[size],
    styles[state],
    animated ? styles.animated : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={containerClasses}
      role="status"
      aria-label={`${label}: ${stateLabels[state]}`}
    >
      {/* Visual Indicator - Abstract waveform */}
      <div className={styles.visualContainer}>
        <div className={styles.visual} aria-hidden="true">
          {/* Background glow */}
          <div className={styles.glow} />

          {/* Wave layers - create depth through layered elements */}
          <svg
            className={styles.waveform}
            viewBox="0 0 120 80"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Gradient for the state */}
              <linearGradient id={`gradient-${state}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" className={styles.gradientStart} />
                <stop offset="50%" className={styles.gradientMid} />
                <stop offset="100%" className={styles.gradientEnd} />
              </linearGradient>

              {/* Subtle blur filter */}
              <filter id="softGlow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Layer 3 - Background wave (most subtle) */}
            <path
              className={`${styles.wavePath} ${styles.waveBack}`}
              d={state === 'bullish'
                ? "M10,55 Q30,45 50,35 T90,25 L110,20"
                : state === 'bearish'
                ? "M10,25 Q30,35 50,45 T90,55 L110,60"
                : state === 'neutral'
                ? "M10,40 Q30,38 50,40 T90,42 L110,40"
                : "M10,35 Q30,45 50,35 T90,45 L110,38"
              }
            />

            {/* Layer 2 - Mid wave */}
            <path
              className={`${styles.wavePath} ${styles.waveMid}`}
              d={state === 'bullish'
                ? "M10,50 Q30,40 50,30 T90,22 L110,18"
                : state === 'bearish'
                ? "M10,30 Q30,40 50,50 T90,58 L110,62"
                : state === 'neutral'
                ? "M10,40 Q30,42 50,40 T90,38 L110,40"
                : "M10,38 Q30,48 50,32 T90,48 L110,35"
              }
            />

            {/* Layer 1 - Front wave (most prominent) */}
            <path
              className={`${styles.wavePath} ${styles.waveFront}`}
              d={state === 'bullish'
                ? "M10,45 Q30,35 50,25 T90,18 L110,15"
                : state === 'bearish'
                ? "M10,35 Q30,45 50,55 T90,62 L110,65"
                : state === 'neutral'
                ? "M10,40 Q30,40 50,40 T90,40 L110,40"
                : "M10,40 Q30,50 50,30 T90,50 L110,32"
              }
              filter="url(#softGlow)"
            />

            {/* Status point indicator */}
            <circle
              className={styles.statusPoint}
              cx={state === 'bullish' ? "108" : state === 'bearish' ? "108" : "110"}
              cy={state === 'bullish' ? "16" : state === 'bearish' ? "64" : "40"}
              r="4"
            />
          </svg>

          {/* Horizon line for reference */}
          <div className={styles.horizon} />
        </div>
      </div>

      {/* State label */}
      <div className={styles.stateLabel}>
        {stateLabels[state]}
      </div>

      {/* Meta information */}
      <div className={styles.meta}>
        {label && (
          <span className={styles.label}>{label}</span>
        )}
        {description && (
          <span className={styles.description}>{description}</span>
        )}
        {timeAgo && (
          <span className={styles.timestamp}>Updated {timeAgo}</span>
        )}
      </div>
    </div>
  );
}

export default MarketStateIndicator;
