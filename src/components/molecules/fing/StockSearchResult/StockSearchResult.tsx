// Path: src/components/molecules/fing/StockSearchResult/StockSearchResult.tsx

import { Plus, Check, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import styles from './StockSearchResult.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface StockSearchResultProps {
  /** Stock ticker symbol */
  ticker: string;
  /** Company name */
  name: string;
  /** Current price */
  price: number;
  /** Price change in dollars */
  change: number;
  /** Price change as percentage */
  changePercent: number;
  /** Exchange code */
  exchange?: string;
  /** Callback when add button is clicked */
  onAdd: () => void;
  /** Whether the stock is already selected */
  isSelected?: boolean;
  /** Whether the add action is disabled */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function StockSearchResult({
  ticker,
  name,
  price,
  change: _change,
  changePercent,
  exchange,
  onAdd,
  isSelected = false,
  disabled = false,
  loading = false,
}: StockSearchResultProps) {
  const isPositive = changePercent >= 0;
  const isNeutral = changePercent === 0;

  const TrendIcon = isNeutral ? Minus : isPositive ? TrendingUp : TrendingDown;

  const containerClasses = [
    styles.container,
    isSelected && styles.selected,
    disabled && styles.disabled,
  ]
    .filter(Boolean)
    .join(' ');

  const changeClasses = [
    styles.change,
    isPositive ? styles.positive : styles.negative,
    isNeutral && styles.neutral,
  ]
    .filter(Boolean)
    .join(' ');

  const handleAdd = () => {
    if (!disabled && !isSelected && !loading) {
      onAdd();
    }
  };

  return (
    <div className={containerClasses}>
      {/* Stock Info */}
      <div className={styles.stockInfo}>
        <div className={styles.tickerRow}>
          <span className={styles.ticker}>{ticker}</span>
          {exchange && <span className={styles.exchange}>{exchange}</span>}
        </div>
        <span className={styles.name}>{name}</span>
      </div>

      {/* Price Info */}
      <div className={styles.priceInfo}>
        <span className={styles.price}>${price.toFixed(2)}</span>
        <div className={changeClasses}>
          <TrendIcon size={12} className={styles.trendIcon} />
          <span>
            {isPositive ? '+' : ''}
            {changePercent.toFixed(2)}%
          </span>
        </div>
      </div>

      {/* Add Button */}
      <button
        type="button"
        className={`${styles.addButton} ${isSelected ? styles.addButtonSelected : ''}`}
        onClick={handleAdd}
        disabled={disabled || isSelected || loading}
        aria-label={isSelected ? `${ticker} already added` : `Add ${ticker} to portfolio`}
      >
        {isSelected ? (
          <Check size={16} />
        ) : (
          <Plus size={16} />
        )}
      </button>
    </div>
  );
}
