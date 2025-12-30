// Path: src/components/atoms/Dropdown/Dropdown.tsx

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import styles from './Dropdown.module.css';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  className,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={`${styles.dropdown} ${className || ''}`}
    >
      <button
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={styles.value}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown size={16} className={styles.icon} />
      </button>

      {isOpen && (
        <div className={styles.menu} role="listbox">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`${styles.option} ${option.value === value ? styles.selected : ''}`}
              onClick={() => handleSelect(option.value)}
              role="option"
              aria-selected={option.value === value}
            >
              <span className={styles.optionLabel}>{option.label}</span>
              {option.value === value && (
                <Check size={14} className={styles.checkIcon} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
