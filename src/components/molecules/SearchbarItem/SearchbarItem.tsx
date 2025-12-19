// Path: src/components/molecules/SearchbarItem/SearchbarItem.tsx
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import styles from './SearchbarItem.module.css';

export interface SearchbarItemProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  disabled?: boolean;
  showClearButton?: boolean;
}

const getClassName = (...classes: (string | undefined | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export function SearchbarItem({
  placeholder = 'Buscar...',
  value: controlledValue,
  onChange,
  onSearch,
  onClear,
  disabled = false,
  showClearButton = true
}: SearchbarItemProps) {
  const [internalValue, setInternalValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const isControlled = controlledValue !== undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleClear = () => {
    if (disabled) return;

    if (!isControlled) {
      setInternalValue('');
    }
    onClear?.();
    onChange?.('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch?.(value);
    }
  };

  const handleSearchClick = () => {
    if (disabled) return;
    onSearch?.(value);
  };

  const containerClass = getClassName(
    styles.container,
    isFocused && !disabled && styles.containerFocused,
    disabled && styles.containerDisabled
  );

  const showClear = showClearButton && value.length > 0;

  return (
    <div className={containerClass}>
      <button
        type="button"
        onClick={handleSearchClick}
        disabled={disabled}
        className={styles.searchIconButton}
        aria-label="Buscar"
      >
        <Search size={18} />
      </button>

      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        placeholder={placeholder}
        className={styles.input}
        aria-label={placeholder}
      />

      {showClear && (
        <button
          type="button"
          onClick={handleClear}
          disabled={disabled}
          className={styles.clearButton}
          aria-label="Limpiar búsqueda"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
