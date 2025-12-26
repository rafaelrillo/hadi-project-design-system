// Path: src/components/molecules/sentinel/RecommendationCard/RecommendationCard.tsx
import styles from './RecommendationCard.module.css';

export type RecommendationType = 'buy' | 'hold' | 'sell' | 'watch';
export type AssetClass = 'stocks' | 'bonds' | 'commodities' | 'cash' | 'crypto';
export type Priority = 'high' | 'medium' | 'low';

export interface RecommendationCardProps {
  type: RecommendationType;
  assetClass: AssetClass;
  title: string;
  rationale: string;
  confidence: number;
  timeframe?: string;
  priority?: Priority;
}

const typeLabels: Record<RecommendationType, string> = {
  buy: 'BUY',
  hold: 'HOLD',
  sell: 'SELL',
  watch: 'WATCH',
};

const assetClassLabels: Record<AssetClass, string> = {
  stocks: 'Stocks',
  bonds: 'Bonds',
  commodities: 'Commodities',
  cash: 'Cash',
  crypto: 'Crypto',
};

const priorityLabels: Record<Priority, string> = {
  high: 'High Priority',
  medium: 'Medium Priority',
  low: 'Low Priority',
};

export function RecommendationCard({
  type,
  assetClass,
  title,
  rationale,
  confidence,
  timeframe,
  priority,
}: RecommendationCardProps) {
  const containerClasses = [
    styles.container,
    styles[type],
  ].join(' ');

  return (
    <article
      className={containerClasses}
      role="article"
      aria-label={`${typeLabels[type]} recommendation for ${assetClassLabels[assetClass]}`}
    >
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.assetInfo}>
          <span className={styles.assetDot} />
          <span className={styles.assetClass}>{assetClassLabels[assetClass]}</span>
        </div>
        {priority && (
          <span className={`${styles.priority} ${styles[`priority${priority.charAt(0).toUpperCase()}${priority.slice(1)}`]}`}>
            {priorityLabels[priority]}
          </span>
        )}
      </header>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.actionRow}>
          <span className={`${styles.actionBadge} ${styles[`action${type.charAt(0).toUpperCase()}${type.slice(1)}`]}`}>
            {typeLabels[type]}
          </span>
          <h3 className={styles.title}>{title}</h3>
        </div>

        <p className={styles.rationale}>{rationale}</p>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        {timeframe && (
          <div className={styles.footerItem}>
            <span className={styles.footerLabel}>Timeframe</span>
            <span className={styles.footerValue}>{timeframe}</span>
          </div>
        )}
        <div className={styles.footerItem}>
          <span className={styles.footerLabel}>Confidence</span>
          <span className={styles.footerValue}>{confidence}%</span>
        </div>
      </footer>
    </article>
  );
}

export default RecommendationCard;
