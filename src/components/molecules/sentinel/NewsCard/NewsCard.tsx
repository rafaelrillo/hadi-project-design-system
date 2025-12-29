// Path: src/components/molecules/sentinel/NewsCard/NewsCard.tsx

import { ExternalLink, Clock, Tag } from 'lucide-react';
import styles from './NewsCard.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface NewsCardProps {
  /** News article ID */
  id: string | number;
  /** Article title */
  title: string;
  /** Article description/summary */
  description: string;
  /** Source publication name */
  source: string;
  /** Published date (ISO string or Date) */
  publishedDate: string | Date;
  /** URL to full article */
  url: string;
  /** Related stock tickers */
  tickers?: string[];
  /** Article tags/categories */
  tags?: string[];
  /** Optional image URL */
  imageUrl?: string;
  /** Sentiment score (-1 to 1) */
  sentiment?: number;
  /** Whether the card is compact */
  compact?: boolean;
  /** Click handler for the card */
  onClick?: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const publishedAt = new Date(date);
  const diffMs = now.getTime() - publishedAt.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return publishedAt.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

function getSentimentLabel(sentiment: number): { label: string; className: string } {
  if (sentiment > 0.2) return { label: 'Bullish', className: 'positive' };
  if (sentiment < -0.2) return { label: 'Bearish', className: 'negative' };
  return { label: 'Neutral', className: 'neutral' };
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function NewsCard({
  title,
  description,
  source,
  publishedDate,
  url,
  tickers = [],
  tags = [],
  imageUrl,
  sentiment,
  compact = false,
  onClick,
}: NewsCardProps) {
  const sentimentInfo = sentiment !== undefined ? getSentimentLabel(sentiment) : null;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const containerClasses = [
    styles.container,
    compact && styles.compact,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article
      className={containerClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`News: ${title}`}
    >
      {/* Image (if not compact and has image) */}
      {!compact && imageUrl && (
        <div className={styles.imageWrapper}>
          <img src={imageUrl} alt="" className={styles.image} loading="lazy" />
        </div>
      )}

      {/* Content */}
      <div className={styles.content}>
        {/* Header: Source + Time + Sentiment */}
        <div className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.source}>{source}</span>
            <span className={styles.separator}>•</span>
            <span className={styles.time}>
              <Clock size={12} />
              {formatRelativeTime(publishedDate)}
            </span>
          </div>
          {sentimentInfo && (
            <span className={`${styles.sentiment} ${styles[sentimentInfo.className]}`}>
              {sentimentInfo.label}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className={styles.title}>{title}</h3>

        {/* Description (if not compact) */}
        {!compact && description && (
          <p className={styles.description}>{description}</p>
        )}

        {/* Footer: Tickers + Tags */}
        <div className={styles.footer}>
          {/* Tickers */}
          {tickers.length > 0 && (
            <div className={styles.tickers}>
              {tickers.slice(0, 5).map((ticker) => (
                <span key={ticker} className={styles.ticker}>
                  ${ticker}
                </span>
              ))}
              {tickers.length > 5 && (
                <span className={styles.more}>+{tickers.length - 5}</span>
              )}
            </div>
          )}

          {/* Tags (if not compact) */}
          {!compact && tags.length > 0 && (
            <div className={styles.tags}>
              <Tag size={12} />
              {tags.slice(0, 3).map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* External link icon */}
          <ExternalLink size={14} className={styles.linkIcon} />
        </div>
      </div>
    </article>
  );
}
