// Path: src/components/organisms/sentinel/ConfidenceLevel/ConfidenceLevel.tsx
import styles from './ConfidenceLevel.module.css';

export type ConfidenceLevelType = 'high' | 'medium' | 'low';

export interface ConfidenceLevelProps {
  level: ConfidenceLevelType;
  percentage?: number;
  label?: string;
  showPercentage?: boolean;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const levelLabels: Record<ConfidenceLevelType, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

// Map levels to approximate percentage ranges
function getDefaultPercentage(level: ConfidenceLevelType): number {
  switch (level) {
    case 'high': return 85;
    case 'medium': return 55;
    case 'low': return 25;
  }
}

export function ConfidenceLevel({
  level,
  percentage,
  label = 'System Confidence',
  showPercentage = false,
  animated = true,
  size = 'md',
}: ConfidenceLevelProps) {
  const displayPercentage = percentage ?? getDefaultPercentage(level);

  // Calculate stroke-dasharray for the ring
  // Ring circumference = 2 * π * r (r = 45 for our SVG)
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (circumference * displayPercentage) / 100;

  const containerClasses = [
    styles.container,
    styles[size],
    styles[level],
    animated ? styles.animated : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={containerClasses}
      role="meter"
      aria-label={`${label}: ${levelLabels[level]}${showPercentage ? ` (${displayPercentage}%)` : ''}`}
      aria-valuenow={displayPercentage}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Label */}
      {label && (
        <div className={styles.label}>{label}</div>
      )}

      {/* Ring indicator */}
      <div className={styles.ringContainer}>
        <svg
          className={styles.ring}
          viewBox="0 0 100 100"
        >
          {/* Background ring */}
          <circle
            className={styles.ringBg}
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="6"
          />

          {/* Progress ring */}
          <circle
            className={styles.ringProgress}
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 50 50)"
          />

          {/* Glow effect layer */}
          <circle
            className={styles.ringGlow}
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 50 50)"
          />
        </svg>

        {/* Center content */}
        <div className={styles.ringCenter}>
          {showPercentage ? (
            <span className={styles.percentageText}>{displayPercentage}%</span>
          ) : (
            <div className={styles.levelIndicator}>
              <div className={styles.levelBars}>
                <span className={`${styles.bar} ${level !== 'low' ? styles.barActive : ''}`} />
                <span className={`${styles.bar} ${level === 'high' || level === 'medium' ? styles.barActive : ''}`} />
                <span className={`${styles.bar} ${level === 'high' ? styles.barActive : ''}`} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Level text */}
      <div className={styles.levelDisplay}>
        <span className={styles.levelText}>{levelLabels[level]}</span>
        {showPercentage && percentage !== undefined && (
          <span className={styles.percentageSubtext}>confidence</span>
        )}
      </div>
    </div>
  );
}

export default ConfidenceLevel;
