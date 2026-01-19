// Path: src/components/molecules/fing/StockSuggestion/StockSuggestion.tsx
import { useState } from 'react';
import styles from './StockSuggestion.module.css';

export type StockAction = 'buy' | 'hold' | 'sell';

export interface StockSuggestionProps {
  symbol: string;
  name: string;
  action: StockAction;
  currentPrice?: number;
  targetPrice?: number;
  confidence: number;
  sector?: string;
  reasoning?: string;
}

const actionLabels: Record<StockAction, string> = {
  buy: 'BUY',
  hold: 'HOLD',
  sell: 'SELL',
};

function formatPrice(price: number): string {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function StockSuggestion({
  symbol,
  name,
  action,
  currentPrice,
  targetPrice,
  confidence,
  sector,
  reasoning,
}: StockSuggestionProps) {
  const [expanded, setExpanded] = useState(false);

  const hasReasoning = Boolean(reasoning);
  const priceChange = currentPrice && targetPrice
    ? ((targetPrice - currentPrice) / currentPrice) * 100
    : null;

  const containerClasses = [
    styles.container,
    styles[action],
    hasReasoning ? styles.expandable : '',
    expanded ? styles.expanded : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={containerClasses}
      role="article"
      aria-label={`${symbol}: ${actionLabels[action]} recommendation`}
    >
      {/* Main Row */}
      <div
        className={styles.mainRow}
        onClick={hasReasoning ? () => setExpanded(!expanded) : undefined}
        role={hasReasoning ? 'button' : undefined}
        tabIndex={hasReasoning ? 0 : undefined}
        onKeyDown={hasReasoning ? (e) => e.key === 'Enter' && setExpanded(!expanded) : undefined}
        aria-expanded={hasReasoning ? expanded : undefined}
      >
        <div className={styles.symbolSection}>
          <span className={styles.symbol}>{symbol}</span>
          <span className={styles.name}>{name}</span>
        </div>

        <div className={`${styles.actionBadge} ${styles[`action${action.charAt(0).toUpperCase()}${action.slice(1)}`]}`}>
          {actionLabels[action]}
        </div>
      </div>

      {/* Details Row */}
      <div className={styles.detailsRow}>
        {currentPrice !== undefined && (
          <div className={styles.priceItem}>
            <span className={styles.priceLabel}>Current</span>
            <span className={styles.priceValue}>{formatPrice(currentPrice)}</span>
          </div>
        )}

        {targetPrice !== undefined && (
          <div className={styles.priceItem}>
            <span className={styles.priceLabel}>Target</span>
            <span className={`${styles.priceValue} ${priceChange && priceChange > 0 ? styles.pricePositive : priceChange && priceChange < 0 ? styles.priceNegative : ''}`}>
              {formatPrice(targetPrice)}
              {priceChange !== null && (
                <span className={styles.priceChange}>
                  ({priceChange > 0 ? '+' : ''}{priceChange.toFixed(1)}%)
                </span>
              )}
            </span>
          </div>
        )}

        {sector && (
          <div className={styles.sectorItem}>
            <span className={styles.priceLabel}>Sector</span>
            <span className={styles.sectorValue}>{sector}</span>
          </div>
        )}

        <div className={styles.confidenceItem}>
          <span className={styles.priceLabel}>Confidence</span>
          <div className={styles.confidenceBar}>
            <div
              className={styles.confidenceFill}
              style={{ width: `${confidence}%` }}
            />
          </div>
          <span className={styles.confidenceValue}>{confidence}%</span>
        </div>
      </div>

      {/* Reasoning (Expandable) */}
      {hasReasoning && (
        <div className={styles.reasoningSection}>
          <p className={styles.reasoning}>{reasoning}</p>
        </div>
      )}

      {/* Expand indicator */}
      {hasReasoning && (
        <div className={styles.expandIndicator}>
          <span className={styles.expandIcon}>{expanded ? '−' : '+'}</span>
        </div>
      )}
    </div>
  );
}

export default StockSuggestion;
