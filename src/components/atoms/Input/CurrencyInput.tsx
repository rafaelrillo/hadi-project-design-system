// Path: src/components/atoms/Input/CurrencyInput.tsx

import React, { useState, useCallback, useEffect, useRef } from 'react';
import styles from './CurrencyInput.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface CurrencyInputProps {
  /** Current value in cents (to avoid floating point issues) or dollars */
  value: number;
  /** Callback when value changes */
  onChange: (value: number) => void;
  /** Currency symbol */
  currency?: string;
  /** Locale for formatting */
  locale?: string;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Placeholder text */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Aria label */
  ariaLabel?: string;
  /** Allow negative values */
  allowNegative?: boolean;
  /** Number of decimal places */
  decimals?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function parseCurrencyInput(
  input: string,
  decimals: number,
  allowNegative: boolean
): number {
  // Remove all non-numeric characters except decimal point and minus
  let cleaned = input.replace(/[^0-9.-]/g, '');

  // Handle negative
  const isNegative = cleaned.startsWith('-') && allowNegative;
  cleaned = cleaned.replace(/-/g, '');

  // Parse as float
  let value = parseFloat(cleaned) || 0;

  // Apply sign
  if (isNegative) {
    value = -value;
  }

  // Round to specified decimals
  const multiplier = Math.pow(10, decimals);
  return Math.round(value * multiplier) / multiplier;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function CurrencyInput({
  value,
  onChange,
  currency = 'USD',
  locale = 'en-US',
  min,
  max,
  step = 1,
  placeholder = '0.00',
  disabled = false,
  error = false,
  size = 'md',
  ariaLabel = 'Currency input',
  allowNegative = false,
  decimals = 2,
}: CurrencyInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [displayValue, setDisplayValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);

  // Get currency symbol
  const currencySymbol = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(0)
    .replace(/[0-9]/g, '')
    .trim();

  // Update display value when value prop changes (and not focused)
  useEffect(() => {
    if (!isFocused) {
      if (value === 0 || isNaN(value)) {
        setDisplayValue('');
      } else {
        setDisplayValue(value.toFixed(decimals));
      }
    }
  }, [value, isFocused, decimals]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    // Show raw number for editing
    if (value !== 0 && !isNaN(value)) {
      setDisplayValue(value.toFixed(decimals));
    }
  }, [value, decimals]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);

    // Parse and validate final value
    let newValue = parseCurrencyInput(displayValue, decimals, allowNegative);

    // Apply min/max constraints
    if (min !== undefined && newValue < min) {
      newValue = min;
    }
    if (max !== undefined && newValue > max) {
      newValue = max;
    }

    // Update display and notify parent
    setDisplayValue(newValue === 0 ? '' : newValue.toFixed(decimals));
    onChange(newValue);
  }, [displayValue, decimals, allowNegative, min, max, onChange]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;

      // Allow empty input
      if (rawValue === '') {
        setDisplayValue('');
        onChange(0);
        return;
      }

      // Only allow valid number characters
      const validPattern = allowNegative
        ? /^-?[0-9]*\.?[0-9]*$/
        : /^[0-9]*\.?[0-9]*$/;

      if (!validPattern.test(rawValue)) {
        return;
      }

      setDisplayValue(rawValue);

      // Parse and update if valid
      const parsed = parseFloat(rawValue);
      if (!isNaN(parsed)) {
        let newValue = parsed;

        // Apply constraints
        if (min !== undefined && newValue < min) {
          newValue = min;
        }
        if (max !== undefined && newValue > max) {
          newValue = max;
        }

        onChange(newValue);
      }
    },
    [allowNegative, min, max, onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Handle up/down arrow keys
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        const direction = e.key === 'ArrowUp' ? 1 : -1;
        let newValue = value + direction * step;

        // Apply constraints
        if (min !== undefined && newValue < min) {
          newValue = min;
        }
        if (max !== undefined && newValue > max) {
          newValue = max;
        }

        onChange(newValue);
        setDisplayValue(newValue.toFixed(decimals));
      }
    },
    [value, step, min, max, onChange, decimals]
  );

  // Build class names
  const containerClasses = [
    styles.container,
    styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`],
    error && styles.error,
    disabled && styles.disabled,
    isFocused && styles.focused,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      <span className={styles.symbol}>{currencySymbol}</span>
      <input
        ref={inputRef}
        type="text"
        inputMode="decimal"
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-invalid={error}
        className={styles.input}
      />
    </div>
  );
}
