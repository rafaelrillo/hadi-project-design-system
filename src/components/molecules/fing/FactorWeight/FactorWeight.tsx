// Path: src/components/molecules/fing/FactorWeight/FactorWeight.tsx
import { useState } from 'react';
import styles from './FactorWeight.module.css';

export interface Factor {
  id: string;
  name: string;
  weight: number;
  impact: 'positive' | 'negative' | 'neutral';
  trend?: 'up' | 'down' | 'stable';
}

export interface FactorWeightProps {
  factors: Factor[];
  title?: string;
  maxVisible?: number;
  animated?: boolean;
}

const trendIcons: Record<string, string> = {
  up: '↑',
  down: '↓',
  stable: '→',
};

export function FactorWeight({
  factors,
  title = 'Key Factors',
  maxVisible = 5,
  animated = true,
}: FactorWeightProps) {
  const [expanded, setExpanded] = useState(false);

  const sortedFactors = [...factors].sort((a, b) => b.weight - a.weight);
  const visibleFactors = expanded ? sortedFactors : sortedFactors.slice(0, maxVisible);
  const hiddenCount = sortedFactors.length - maxVisible;

  const containerClasses = [
    styles.container,
    animated ? styles.animated : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} role="region" aria-label={title}>
      {/* Header */}
      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
      </header>

      {/* Factors List */}
      <div className={styles.factorsList}>
        {visibleFactors.map((factor, index) => (
          <div
            key={factor.id}
            className={`${styles.factorRow} ${styles[factor.impact]}`}
            style={{
              '--factor-index': index,
              '--factor-weight': factor.weight,
            } as React.CSSProperties}
          >
            <div className={styles.factorInfo}>
              <span className={styles.factorName}>{factor.name}</span>
            </div>

            <div className={styles.factorMetrics}>
              <div className={styles.barContainer}>
                <div
                  className={styles.bar}
                  style={{ width: `${factor.weight}%` }}
                  role="progressbar"
                  aria-valuenow={factor.weight}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <span className={styles.weight}>{factor.weight}%</span>
              {factor.trend && (
                <span className={`${styles.trend} ${styles[`trend${factor.trend.charAt(0).toUpperCase()}${factor.trend.slice(1)}`]}`}>
                  {trendIcons[factor.trend]}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Expand/Collapse Button */}
      {hiddenCount > 0 && (
        <button
          className={styles.expandButton}
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          {expanded ? 'Show less' : `+ ${hiddenCount} more factors`}
        </button>
      )}
    </div>
  );
}

export default FactorWeight;
