// Path: src/components/molecules/fing/PositionRow/PositionRow.tsx

import { TrendingUp, TrendingDown, MoreVertical } from 'lucide-react';
import styles from './PositionRow.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface PositionRowProps {
  /** Stock ticker symbol */
  ticker: string;
  /** Company name */
  name: string;
  /** Number of shares owned */
  shares: number;
  /** Average cost per share */
  avgCost: number;
  /** Current market price */
  currentPrice: number;
  /** Total market value */
  marketValue: number;
  /** Total gain/loss in dollars */
  gainLoss: number;
  /** Gain/loss percentage */
  gainLossPercent: number;
  /** Today's change in dollars */
  dayChange?: number;
  /** Today's change percentage */
  dayChangePercent?: number;
  /** Portfolio allocation percentage */
  allocation?: number;
  /** Callback when row is clicked */
  onClick?: () => void;
  /** Callback for trade action */
  onTrade?: (type: 'buy' | 'sell') => void;
  /** Show compact version */
  compact?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function PositionRow({
  ticker,
  name,
  shares,
  avgCost,
  currentPrice,
  marketValue,
  gainLoss,
  gainLossPercent,
  dayChange,
  dayChangePercent,
  allocation,
  onClick,
  onTrade,
  compact = false,
}: PositionRowProps) {
  const isPositive = gainLoss >= 0;
  const isDayPositive = (dayChange ?? 0) >= 0;

  const handleClick = () => {
    if (onClick) onClick();
  };

  const handleTrade = (e: React.MouseEvent, type: 'buy' | 'sell') => {
    e.stopPropagation();
    if (onTrade) onTrade(type);
  };

  const containerClasses = [
    styles.container,
    compact && styles.compact,
    onClick && styles.clickable,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses} onClick={handleClick}>
      {/* Stock Info */}
      <div className={styles.stockInfo}>
        <div className={styles.tickerRow}>
          <span className={styles.ticker}>{ticker}</span>
          {allocation !== undefined && (
            <span className={styles.allocation}>{allocation.toFixed(1)}%</span>
          )}
        </div>
        <span className={styles.name}>{name}</span>
      </div>

      {/* Shares & Avg Cost */}
      {!compact && (
        <div className={styles.sharesInfo}>
          <span className={styles.shares}>{shares} shares</span>
          <span className={styles.avgCost}>Avg ${avgCost.toFixed(2)}</span>
        </div>
      )}

      {/* Current Price */}
      <div className={styles.priceInfo}>
        <span className={styles.price}>${currentPrice.toFixed(2)}</span>
        {dayChangePercent !== undefined && (
          <span className={`${styles.dayChange} ${isDayPositive ? styles.positive : styles.negative}`}>
            {isDayPositive ? '+' : ''}{dayChangePercent.toFixed(2)}%
          </span>
        )}
      </div>

      {/* Market Value */}
      <div className={styles.valueInfo}>
        <span className={styles.marketValue}>
          ${marketValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>

      {/* Gain/Loss */}
      <div className={`${styles.gainLoss} ${isPositive ? styles.positive : styles.negative}`}>
        <div className={styles.gainLossIcon}>
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        </div>
        <div className={styles.gainLossValues}>
          <span className={styles.gainLossAmount}>
            {isPositive ? '+' : ''}${Math.abs(gainLoss).toFixed(2)}
          </span>
          <span className={styles.gainLossPercent}>
            {isPositive ? '+' : ''}{gainLossPercent.toFixed(2)}%
          </span>
        </div>
      </div>

      {/* Actions */}
      {onTrade && (
        <div className={styles.actions}>
          <button
            className={`${styles.actionBtn} ${styles.buyBtn}`}
            onClick={(e) => handleTrade(e, 'buy')}
            aria-label={`Buy more ${ticker}`}
          >
            Buy
          </button>
          <button
            className={`${styles.actionBtn} ${styles.sellBtn}`}
            onClick={(e) => handleTrade(e, 'sell')}
            aria-label={`Sell ${ticker}`}
          >
            Sell
          </button>
        </div>
      )}

      {/* Menu (if no trade actions) */}
      {!onTrade && onClick && (
        <button className={styles.menuBtn} aria-label="More options">
          <MoreVertical size={16} />
        </button>
      )}
    </div>
  );
}
