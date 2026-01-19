// Path: src/components/organisms/fing/Watchlist/Watchlist.tsx

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Sparkline } from '../../../atoms/fing';
import styles from './Watchlist.module.css';

export interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  sparklineData?: number[];
}

export interface WatchlistProps {
  items: WatchlistItem[];
  onItemClick?: (symbol: string) => void;
  showSparklines?: boolean;
  compact?: boolean;
  maxItems?: number;
  className?: string;
}

function formatPrice(price: number): string {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
}

function formatChange(percent: number): string {
  const sign = percent >= 0 ? '+' : '';
  return `${sign}${percent.toFixed(2)}%`;
}

export function Watchlist({
  items,
  onItemClick,
  showSparklines = true,
  compact = false,
  maxItems,
  className = '',
}: WatchlistProps) {
  const displayItems = maxItems ? items.slice(0, maxItems) : items;

  const containerClasses = [
    styles.watchlist,
    compact ? styles.compact : '',
    className,
  ].filter(Boolean).join(' ');

  if (items.length === 0) {
    return (
      <div className={containerClasses}>
        <div className={styles.empty}>No stocks in watchlist</div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.headerSymbol}>Symbol</span>
        <span className={styles.headerPrice}>Price</span>
        <span className={styles.headerChange}>Change</span>
        {showSparklines && <span className={styles.headerSparkline}>7D</span>}
      </div>

      {/* Items */}
      <div className={styles.items}>
        {displayItems.map((item) => {
          const isPositive = item.change >= 0;
          const isNeutral = item.change === 0;
          const TrendIcon = isNeutral ? Minus : isPositive ? TrendingUp : TrendingDown;

          const itemClasses = [
            styles.item,
            onItemClick ? styles.clickable : '',
          ].filter(Boolean).join(' ');

          const changeClasses = [
            styles.change,
            isPositive ? styles.positive : styles.negative,
            isNeutral ? styles.neutral : '',
          ].filter(Boolean).join(' ');

          return (
            <div
              key={item.symbol}
              className={itemClasses}
              onClick={() => onItemClick?.(item.symbol)}
              role={onItemClick ? 'button' : undefined}
              tabIndex={onItemClick ? 0 : undefined}
              onKeyDown={(e) => {
                if (onItemClick && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  onItemClick(item.symbol);
                }
              }}
            >
              <div className={styles.symbolCell}>
                <span className={styles.symbol}>{item.symbol}</span>
                {!compact && <span className={styles.name}>{item.name}</span>}
              </div>

              <span className={styles.price}>{formatPrice(item.price)}</span>

              <span className={changeClasses}>
                <TrendIcon size={12} />
                {formatChange(item.changePercent)}
              </span>

              {showSparklines && item.sparklineData && (
                <div className={styles.sparkline}>
                  <Sparkline
                    data={item.sparklineData}
                    width={compact ? 50 : 60}
                    height={compact ? 16 : 20}
                    showDot={!compact}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Watchlist;
