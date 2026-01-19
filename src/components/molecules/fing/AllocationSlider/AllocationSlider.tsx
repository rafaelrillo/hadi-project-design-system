// Path: src/components/molecules/fing/AllocationSlider/AllocationSlider.tsx

import { useCallback, useRef, useState } from 'react';
import styles from './AllocationSlider.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface AllocationSliderProps {
  /** Stock ticker symbol */
  ticker: string;
  /** Company name */
  name: string;
  /** Current allocation percentage (0-100) */
  value: number;
  /** Callback when allocation changes */
  onChange: (value: number) => void;
  /** Maximum allocation allowed */
  max?: number;
  /** Minimum allocation allowed */
  min?: number;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Whether to show the percentage input */
  showInput?: boolean;
  /** Step increment */
  step?: number;
  /** Current price (optional) */
  price?: number;
  /** Dollar amount based on allocation (optional) */
  dollarAmount?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function AllocationSlider({
  ticker,
  name,
  value,
  onChange,
  max = 100,
  min = 0,
  disabled = false,
  showInput = true,
  step = 1,
  price,
  dollarAmount,
}: AllocationSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [inputValue, setInputValue] = useState(value.toString());

  // Calculate percentage for positioning
  const percentage = ((value - min) / (max - min)) * 100;

  // Clamp value to valid range
  const clampValue = useCallback(
    (val: number): number => {
      const stepped = Math.round(val / step) * step;
      return Math.max(min, Math.min(max, stepped));
    },
    [min, max, step]
  );

  // Convert position to value
  const positionToValue = useCallback(
    (clientX: number): number => {
      if (!trackRef.current) return value;

      const rect = trackRef.current.getBoundingClientRect();
      const pct = (clientX - rect.left) / rect.width;
      const rawValue = min + pct * (max - min);
      return clampValue(rawValue);
    },
    [min, max, value, clampValue]
  );

  // Pointer events
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return;

      e.preventDefault();
      setIsDragging(true);

      const newValue = positionToValue(e.clientX);
      onChange(newValue);
      setInputValue(newValue.toString());

      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [disabled, positionToValue, onChange]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || disabled) return;

      const newValue = positionToValue(e.clientX);
      onChange(newValue);
      setInputValue(newValue.toString());
    },
    [isDragging, disabled, positionToValue, onChange]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(false);
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    },
    []
  );

  // Input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    const numVal = parseFloat(val);
    if (!isNaN(numVal)) {
      const clamped = clampValue(numVal);
      onChange(clamped);
    }
  };

  const handleInputBlur = () => {
    setInputValue(value.toString());
  };

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;

      let newValue = value;

      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
          e.preventDefault();
          newValue = clampValue(value - step);
          break;
        case 'ArrowRight':
        case 'ArrowUp':
          e.preventDefault();
          newValue = clampValue(value + step);
          break;
        case 'Home':
          e.preventDefault();
          newValue = min;
          break;
        case 'End':
          e.preventDefault();
          newValue = max;
          break;
        default:
          return;
      }

      onChange(newValue);
      setInputValue(newValue.toString());
    },
    [disabled, value, step, min, max, clampValue, onChange]
  );

  // Build class names
  const containerClasses = [
    styles.container,
    disabled && styles.disabled,
    isDragging && styles.dragging,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      {/* Stock Header */}
      <div className={styles.header}>
        <div className={styles.stockInfo}>
          <span className={styles.ticker}>{ticker}</span>
          <span className={styles.name}>{name}</span>
        </div>
        <div className={styles.valueDisplay}>
          {showInput ? (
            <div className={styles.inputWrapper}>
              <input
                type="number"
                className={styles.percentInput}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                min={min}
                max={max}
                step={step}
                disabled={disabled}
                aria-label={`${ticker} allocation percentage`}
              />
              <span className={styles.percentSymbol}>%</span>
            </div>
          ) : (
            <span className={styles.percentValue}>{value.toFixed(1)}%</span>
          )}
        </div>
      </div>

      {/* Slider Track */}
      <div
        ref={trackRef}
        className={styles.track}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className={styles.fill}
          style={{ width: `${percentage}%` }}
        />
        <div
          className={styles.thumb}
          style={{ left: `${percentage}%` }}
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-label={`${ticker} allocation`}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={`${value}%`}
          aria-disabled={disabled}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Footer with additional info */}
      {(price !== undefined || dollarAmount !== undefined) && (
        <div className={styles.footer}>
          {price !== undefined && (
            <span className={styles.price}>${price.toFixed(2)}</span>
          )}
          {dollarAmount !== undefined && (
            <span className={styles.dollarAmount}>
              ${dollarAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
