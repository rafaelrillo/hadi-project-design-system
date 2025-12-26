// Path: src/components/organisms/sentinel/RiskGauge/RiskGauge.tsx
import type { CSSProperties } from 'react';
import styles from './RiskGauge.module.css';

export type RiskLevel = 'low' | 'moderate' | 'elevated' | 'high' | 'severe';

export interface RiskGaugeProps {
  level: RiskLevel;
  value?: number;
  label?: string;
  showScale?: boolean;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const riskLevels: RiskLevel[] = ['low', 'moderate', 'elevated', 'high', 'severe'];

const riskLabels: Record<RiskLevel, string> = {
  low: 'Low',
  moderate: 'Moderate',
  elevated: 'Elevated',
  high: 'High',
  severe: 'Severe',
};

const riskScaleLabels: Record<RiskLevel, string> = {
  low: 'LOW',
  moderate: 'MOD',
  elevated: 'ELEV',
  high: 'HIGH',
  severe: 'SEV',
};

function getLevelIndex(level: RiskLevel): number {
  return riskLevels.indexOf(level);
}

function getValuePosition(level: RiskLevel, value?: number): number {
  const baseIndex = getLevelIndex(level);
  const segmentWidth = 100 / riskLevels.length;

  if (value !== undefined) {
    // Map 0-100 to actual position
    return Math.min(100, Math.max(0, value));
  }

  // Center of the current level segment
  return (baseIndex * segmentWidth) + (segmentWidth / 2);
}

export function RiskGauge({
  level,
  value,
  label = 'Systemic Risk',
  showScale = true,
  animated = true,
  size = 'md',
}: RiskGaugeProps) {
  const levelIndex = getLevelIndex(level);
  const fillPosition = getValuePosition(level, value);

  const containerClasses = [
    styles.container,
    styles[size],
    animated ? styles.animated : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={containerClasses}
      role="meter"
      aria-label={`${label}: ${riskLabels[level]}`}
      aria-valuenow={value ?? (levelIndex + 1) * 20}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Label */}
      {label && (
        <div className={styles.label}>{label}</div>
      )}

      {/* Gauge container */}
      <div className={styles.gaugeContainer}>
        {/* Track background */}
        <div className={styles.track}>
          {/* Segments */}
          {riskLevels.map((riskLevel, index) => (
            <div
              key={riskLevel}
              className={`${styles.segment} ${styles[riskLevel]} ${
                index <= levelIndex ? styles.segmentActive : ''
              }`}
              style={{
                '--segment-index': index,
              } as CSSProperties}
            />
          ))}

          {/* Fill overlay to current position */}
          <div
            className={styles.fill}
            style={{
              width: `${fillPosition}%`,
            }}
          />

          {/* Indicator marker */}
          <div
            className={`${styles.indicator} ${styles[level]}`}
            style={{
              left: `${fillPosition}%`,
            }}
          >
            <div className={styles.indicatorDot} />
          </div>
        </div>

        {/* Scale labels */}
        {showScale && (
          <div className={styles.scale}>
            {riskLevels.map((riskLevel, index) => (
              <span
                key={riskLevel}
                className={`${styles.scaleLabel} ${
                  index <= levelIndex ? styles.scaleLabelActive : ''
                } ${index === levelIndex ? styles.scaleLabelCurrent : ''}`}
              >
                {riskScaleLabels[riskLevel]}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Current level display */}
      <div className={`${styles.levelDisplay} ${styles[level]}`}>
        <span className={styles.levelText}>{riskLabels[level]}</span>
        {value !== undefined && (
          <span className={styles.valueText}>{value}%</span>
        )}
      </div>
    </div>
  );
}

export default RiskGauge;
