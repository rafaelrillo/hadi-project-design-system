// Path: src/components/organisms/sentinel/TickerTape/TickerTape.tsx

import { useMemo, useRef, useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import styles from './TickerTape.module.css';

export interface TickerItem {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface TickerTapeProps {
  items: TickerItem[];
  speed?: 'slow' | 'normal' | 'fast';
  pauseOnHover?: boolean;
  showSeparators?: boolean;
  variant?: 'minimal' | 'detailed';
  className?: string;
}

const speedDurations: Record<'slow' | 'normal' | 'fast', number> = {
  slow: 60,
  normal: 40,
  fast: 25,
};

function formatPrice(price: number): string {
  return price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatChange(change: number, percent: number): string {
  const sign = change >= 0 ? '+' : '';
  return `${sign}${percent.toFixed(2)}%`;
}

export function TickerTape({
  items,
  speed = 'normal',
  pauseOnHover = true,
  showSeparators = true,
  variant = 'detailed',
  className = '',
}: TickerTapeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [animationDuration, setAnimationDuration] = useState(speedDurations[speed]);

  // Calculate animation duration based on content width
  useEffect(() => {
    if (trackRef.current) {
      const contentWidth = trackRef.current.scrollWidth / 2;
      const baseDuration = speedDurations[speed];
      // Adjust duration based on content width (more content = longer duration)
      const adjustedDuration = Math.max(baseDuration, (contentWidth / 100) * 2);
      setAnimationDuration(adjustedDuration);
    }
  }, [items, speed]);

  // Duplicate items for seamless loop
  const duplicatedItems = useMemo(() => {
    return [...items, ...items];
  }, [items]);

  const containerClasses = [
    styles.tickerTape,
    className,
  ].filter(Boolean).join(' ');

  const trackClasses = [
    styles.tickerTrack,
    isPaused ? styles.paused : '',
  ].filter(Boolean).join(' ');

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className={containerClasses}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      role="marquee"
      aria-label="Stock ticker"
    >
      <div
        ref={trackRef}
        className={trackClasses}
        style={{
          animationDuration: `${animationDuration}s`,
        }}
      >
        {duplicatedItems.map((item, index) => {
          const isPositive = item.change >= 0;
          const isNeutral = item.change === 0;

          const itemClasses = [
            styles.tickerItem,
            isPositive ? styles.up : styles.down,
            isNeutral ? styles.neutral : '',
          ].filter(Boolean).join(' ');

          const TrendIcon = isNeutral
            ? Minus
            : isPositive
            ? TrendingUp
            : TrendingDown;

          return (
            <div key={`${item.symbol}-${index}`} className={itemClasses}>
              <span className={styles.symbol}>{item.symbol}</span>

              {variant === 'detailed' && (
                <span className={styles.price}>{formatPrice(item.price)}</span>
              )}

              <span className={styles.change}>
                <TrendIcon size={12} className={styles.trendIcon} />
                {formatChange(item.change, item.changePercent)}
              </span>

              {showSeparators && (
                <span className={styles.separator} aria-hidden="true" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TickerTape;
