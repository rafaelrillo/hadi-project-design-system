// Path: src/components/molecules/sentinel/CyclePosition/CyclePosition.tsx
import styles from './CyclePosition.module.css';

export type CyclePhase = 'expansion' | 'peak' | 'contraction' | 'trough';

export interface CyclePositionProps {
  currentPhase: CyclePhase;
  confidence?: number;
  description?: string;
  showTimeline?: boolean;
}

const phaseLabels: Record<CyclePhase, string> = {
  expansion: 'Expansion',
  peak: 'Peak',
  contraction: 'Contraction',
  trough: 'Trough',
};

const phaseDescriptions: Record<CyclePhase, string> = {
  expansion: 'Economy is growing, employment rising',
  peak: 'Growth slowing, approaching maximum output',
  contraction: 'Economic activity declining',
  trough: 'Economy at lowest point, recovery ahead',
};

export function CyclePosition({
  currentPhase,
  confidence,
  description,
  showTimeline = true,
}: CyclePositionProps) {
  const displayDescription = description ?? phaseDescriptions[currentPhase];

  return (
    <div
      className={styles.container}
      role="region"
      aria-label={`Economic cycle position: ${phaseLabels[currentPhase]}`}
    >
      {/* Header */}
      <header className={styles.header}>
        <h3 className={styles.title}>Economic Cycle</h3>
        {confidence !== undefined && (
          <span className={styles.confidence}>{confidence}% confidence</span>
        )}
      </header>

      {/* Cycle Visualization */}
      {showTimeline && (
        <div className={styles.cycleVisual} aria-hidden="true">
          <svg
            className={styles.cycleSvg}
            viewBox="0 0 200 80"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Cycle curve */}
            <path
              className={styles.cyclePath}
              d="M 10,60 Q 35,60 60,20 Q 85,20 110,60 Q 135,60 160,20 Q 175,20 190,60"
              fill="none"
            />

            {/* Active segment highlight */}
            <path
              className={`${styles.cyclePathActive} ${styles[currentPhase]}`}
              d={
                currentPhase === 'expansion'
                  ? 'M 10,60 Q 35,60 60,20'
                  : currentPhase === 'peak'
                  ? 'M 60,20 Q 85,20 110,60'
                  : currentPhase === 'contraction'
                  ? 'M 110,60 Q 135,60 160,20'
                  : 'M 160,20 Q 175,20 190,60'
              }
              fill="none"
            />

            {/* Position indicator */}
            <circle
              className={`${styles.positionDot} ${styles[currentPhase]}`}
              cx={
                currentPhase === 'expansion'
                  ? 35
                  : currentPhase === 'peak'
                  ? 85
                  : currentPhase === 'contraction'
                  ? 135
                  : 175
              }
              cy={
                currentPhase === 'expansion'
                  ? 40
                  : currentPhase === 'peak'
                  ? 40
                  : currentPhase === 'contraction'
                  ? 40
                  : 40
              }
              r="6"
            />

            {/* Pulse ring */}
            <circle
              className={`${styles.pulseRing} ${styles[currentPhase]}`}
              cx={
                currentPhase === 'expansion'
                  ? 35
                  : currentPhase === 'peak'
                  ? 85
                  : currentPhase === 'contraction'
                  ? 135
                  : 175
              }
              cy={40}
              r="6"
            />
          </svg>

          {/* Phase labels */}
          <div className={styles.phaseLabels}>
            {(['expansion', 'peak', 'contraction', 'trough'] as CyclePhase[]).map(
              (phase) => (
                <span
                  key={phase}
                  className={`${styles.phaseLabel} ${
                    phase === currentPhase ? styles.active : ''
                  }`}
                >
                  {phaseLabels[phase]}
                </span>
              )
            )}
          </div>
        </div>
      )}

      {/* Current Status */}
      <div className={styles.statusSection}>
        <div className={styles.currentPhase}>
          <span className={styles.currentLabel}>Currently:</span>
          <span className={`${styles.currentValue} ${styles[currentPhase]}`}>
            {phaseLabels[currentPhase]}
          </span>
        </div>
        <p className={styles.description}>{displayDescription}</p>
      </div>
    </div>
  );
}

export default CyclePosition;
