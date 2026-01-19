// Path: src/components/molecules/SearchBar/SearchBar.tsx
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import styles from './SearchBar.module.css';

export interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  ariaLabel?: string;
  showClearButton?: boolean;
}

const getClassName = (...classes: (string | undefined | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export function SearchBar({
  value: controlledValue,
  onChange,
  onSearch,
  placeholder = 'Buscar...',
  disabled = false,
  ariaLabel = 'Buscar',
  showClearButton = true
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState('');

  // Use controlled value if provided, otherwise use internal state
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const isControlled = controlledValue !== undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const newValue = e.target.value;

    if (!isControlled) {
      setInternalValue(newValue);
    }

    if (onChange) {
      onChange(newValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    const newValue = '';

    if (!isControlled) {
      setInternalValue(newValue);
    }

    if (onChange) {
      onChange(newValue);
    }

    if (onSearch) {
      onSearch(newValue);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchIconContainer}>
        <Search
          size={18}
          color={disabled ? 'var(--fing-text-disabled)' : 'var(--fing-text-tertiary)'}
        />
      </div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={ariaLabel}
        className={getClassName(styles.input, disabled && styles.inputDisabled)}
      />
      {showClearButton && value && !disabled && (
        <button
          onClick={handleClear}
          className={styles.clearButton}
          aria-label="Limpiar búsqueda"
          type="button"
        >
          <X size={16} color="var(--fing-text-tertiary)" />
        </button>
      )}
    </div>
  );
}
