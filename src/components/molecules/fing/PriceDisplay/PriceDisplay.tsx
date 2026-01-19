// Path: src/components/molecules/fing/PriceDisplay/PriceDisplay.tsx

import { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import styles from './PriceDisplay.module.css';

export interface PriceDisplayProps {
  value: number;
  previousValue?: number;
  currency?: string;
  decimals?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showChange?: boolean;
  showFlash?: boolean;
  format?: 'currency' | 'percent' | 'number';
  className?: string;
}

function formatValue(
  value: number,
  format: 'currency' | 'percent' | 'number',
  currency: string,
  decimals: number
): string {
  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value);
    case 'percent':
      return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;
    case 'number':
    default:
      return value.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
  }
}

export function PriceDisplay({
  value,
  previousValue,
  currency = 'USD',
  decimals = 2,
  size = 'md',
  showChange = true,
  showFlash = true,
  format = 'currency',
  className = '',
}: PriceDisplayProps) {
  const [isFlashing, setIsFlashing] = useState(false);
  const [flashDirection, setFlashDirection] = useState<'up' | 'down' | null>(null);
  const prevValueRef = useRef(value);

  // Detect value changes and trigger flash
  useEffect(() => {
    if (showFlash && prevValueRef.current !== value) {
      const direction = value > prevValueRef.current ? 'up' : 'down';
      setFlashDirection(direction);
      setIsFlashing(true);

      const timer = setTimeout(() => {
        setIsFlashing(false);
        setFlashDirection(null);
      }, 500);

      prevValueRef.current = value;
      return () => clearTimeout(timer);
    }
  }, [value, showFlash]);

  // Calculate change from previousValue
  const change = previousValue !== undefined ? value - previousValue : 0;
  const changePercent = previousValue !== undefined && previousValue !== 0
    ? ((value - previousValue) / previousValue) * 100
    : 0;

  const isPositive = change >= 0;
  const isNeutral = change === 0;

  const TrendIcon = isNeutral ? Minus : isPositive ? TrendingUp : TrendingDown;

  const containerClasses = [
    styles.priceDisplay,
    styles[size],
    isFlashing ? styles.flashing : '',
    flashDirection ? styles[flashDirection] : '',
    className,
  ].filter(Boolean).join(' ');

  const changeClasses = [
    styles.change,
    isPositive ? styles.positive : styles.negative,
    isNeutral ? styles.neutral : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <span className={styles.value}>
        {formatValue(value, format, currency, decimals)}
      </span>

      {showChange && previousValue !== undefined && (
        <span className={changeClasses}>
          <TrendIcon size={size === 'sm' ? 10 : size === 'md' ? 12 : 14} />
          <span>{changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%</span>
        </span>
      )}
    </div>
  );
}

export default PriceDisplay;
