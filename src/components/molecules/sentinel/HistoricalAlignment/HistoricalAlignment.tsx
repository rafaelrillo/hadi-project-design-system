// Path: src/components/molecules/sentinel/HistoricalAlignment/HistoricalAlignment.tsx
import styles from './HistoricalAlignment.module.css';

export interface HistoricalPeriod {
  year: number;
  label: string;
  similarity: number;
  outcome?: string;
}

export interface HistoricalAlignmentProps {
  periods: HistoricalPeriod[];
  title?: string;
  showChart?: boolean;
}

export function HistoricalAlignment({
  periods,
  title = 'Historical Patterns',
}: HistoricalAlignmentProps) {
  // Sort by similarity descending
  const sortedPeriods = [...periods].sort((a, b) => b.similarity - a.similarity);

  return (
    <div className={styles.container} role="region" aria-label={title}>
      {/* Header */}
      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
      </header>

      {/* Intro text */}
      <p className={styles.intro}>Current conditions align with:</p>

      {/* Periods List */}
      <div className={styles.periodsList}>
        {sortedPeriods.map((period, index) => (
          <div
            key={period.year}
            className={`${styles.periodCard} ${index === 0 ? styles.primary : ''}`}
          >
            <div className={styles.periodHeader}>
              <div className={styles.periodInfo}>
                <span className={styles.periodLabel}>{period.label}</span>
                <span className={styles.periodYear}>{period.year}</span>
              </div>
              <div className={styles.similarityBadge}>
                <span className={styles.similarityValue}>{period.similarity}%</span>
                <div className={styles.similarityBars}>
                  {[1, 2, 3].map((bar) => (
                    <span
                      key={bar}
                      className={`${styles.similarityBar} ${
                        period.similarity >= bar * 33 ? styles.active : ''
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {period.outcome && (
              <p className={styles.outcome}>{period.outcome}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoricalAlignment;
