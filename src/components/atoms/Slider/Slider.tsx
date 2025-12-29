// Path: src/components/atoms/Slider/Slider.tsx

import React, { useCallback, useRef, useState } from 'react';
import styles from './Slider.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface SliderProps {
  /** Current value */
  value: number;
  /** Callback when value changes */
  onChange: (value: number) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Show value label */
  showValue?: boolean;
  /** Format value for display */
  formatValue?: (value: number) => string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Color variant */
  variant?: 'default' | 'success' | 'warning' | 'error';
  /** Aria label */
  ariaLabel?: string;
  /** Show tick marks */
  showTicks?: boolean;
  /** Custom tick values */
  ticks?: number[];
  /** Label */
  label?: string;
  /** Show min/max labels */
  showMinMax?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  showValue = true,
  formatValue = (v) => `${v}`,
  size = 'md',
  variant = 'default',
  ariaLabel = 'Slider',
  showTicks = false,
  ticks,
  label,
  showMinMax = false,
}: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Calculate percentage for positioning
  const percentage = ((value - min) / (max - min)) * 100;

  // Clamp value to valid range
  const clampValue = useCallback(
    (val: number): number => {
      // Round to step
      const stepped = Math.round(val / step) * step;
      // Clamp to range
      return Math.max(min, Math.min(max, stepped));
    },
    [min, max, step]
  );

  // Convert position to value
  const positionToValue = useCallback(
    (clientX: number): number => {
      if (!trackRef.current) return value;

      const rect = trackRef.current.getBoundingClientRect();
      const percentage = (clientX - rect.left) / rect.width;
      const rawValue = min + percentage * (max - min);
      return clampValue(rawValue);
    },
    [min, max, value, clampValue]
  );

  // Handle mouse/touch events
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return;

      e.preventDefault();
      setIsDragging(true);

      const newValue = positionToValue(e.clientX);
      onChange(newValue);

      // Capture pointer for smooth dragging
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [disabled, positionToValue, onChange]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || disabled) return;

      const newValue = positionToValue(e.clientX);
      onChange(newValue);
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

  // Handle keyboard navigation
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
        case 'PageDown':
          e.preventDefault();
          newValue = clampValue(value - step * 10);
          break;
        case 'PageUp':
          e.preventDefault();
          newValue = clampValue(value + step * 10);
          break;
        default:
          return;
      }

      onChange(newValue);
    },
    [disabled, value, step, min, max, clampValue, onChange]
  );

  // Generate tick marks
  const tickMarks = ticks || (showTicks ? generateTicks(min, max, 5) : []);

  // Build class names
  const containerClasses = [
    styles.container,
    styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`],
    styles[`variant${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
    disabled && styles.disabled,
    isDragging && styles.dragging,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.sliderWrapper}>
        {showMinMax && (
          <span className={styles.minLabel}>{formatValue(min)}</span>
        )}

        <div
          ref={trackRef}
          className={styles.track}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* Filled portion of track */}
          <div
            className={styles.fill}
            style={{ width: `${percentage}%` }}
          />

          {/* Tick marks */}
          {tickMarks.length > 0 && (
            <div className={styles.ticks}>
              {tickMarks.map((tick) => {
                const tickPercent = ((tick - min) / (max - min)) * 100;
                return (
                  <div
                    key={tick}
                    className={styles.tick}
                    style={{ left: `${tickPercent}%` }}
                  />
                );
              })}
            </div>
          )}

          {/* Thumb */}
          <div
            className={styles.thumb}
            style={{ left: `${percentage}%` }}
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-label={ariaLabel}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-valuetext={formatValue(value)}
            aria-disabled={disabled}
            onKeyDown={handleKeyDown}
          >
            {showValue && (
              <div className={styles.tooltip}>{formatValue(value)}</div>
            )}
          </div>
        </div>

        {showMinMax && (
          <span className={styles.maxLabel}>{formatValue(max)}</span>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function generateTicks(min: number, max: number, count: number): number[] {
  const step = (max - min) / (count - 1);
  return Array.from({ length: count }, (_, i) => min + step * i);
}
