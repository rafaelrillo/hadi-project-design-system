// Path: src/components/atoms/Dropdown/Dropdown.tsx

import { useState, useRef, useEffect, type CSSProperties } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useLightEngineOptional } from '@contexts/LightEngineContext';
import styles from './Dropdown.module.css';

export type DropdownStyle = 'default' | 'neuPanel';

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
  /** Visual style variant */
  dropdownStyle?: DropdownStyle;
  /** Enable dynamic shadows from Light Engine */
  dynamicShadows?: boolean;
}

// Glass hue for selected item
const GLASS_ITEM = {
  hue: 175,
  sat: 35,
};

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  className,
  dropdownStyle = 'default',
  dynamicShadows = true,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get light engine context (optional)
  const lightEngine = useLightEngineOptional();

  const selectedOption = options.find((opt) => opt.value === value);

  // Get dropdown className
  const getDropdownClassName = (): string => {
    const classes = [styles.dropdown];
    if (dropdownStyle === 'neuPanel') {
      classes.push(styles.neuPanel);
      if (dynamicShadows && lightEngine) classes.push(styles.dynamicShadows);
    }
    if (className) classes.push(className);
    return classes.join(' ');
  };

  // Get menu dynamic styles
  const getMenuDynamicStyles = (): CSSProperties | undefined => {
    if (dropdownStyle !== 'neuPanel' || !dynamicShadows || !lightEngine) return undefined;

    const { shadows } = lightEngine;
    return {
      boxShadow: `${shadows.getNeuPanelShadow(8, 16)}, inset 0 1px 0 rgba(255, 255, 255, 0.7)`,
    };
  };

  // Get selected item dynamic styles
  const getSelectedItemDynamicStyles = (): CSSProperties | undefined => {
    if (dropdownStyle !== 'neuPanel' || !dynamicShadows || !lightEngine) return undefined;

    const { shadows } = lightEngine;
    return {
      background: shadows.getGlassBackground(GLASS_ITEM.hue, GLASS_ITEM.sat),
    };
  };

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
      className={getDropdownClassName()}
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
        <div className={styles.menu} style={getMenuDynamicStyles()} role="listbox">
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                className={`${styles.option} ${isSelected ? styles.selected : ''}`}
                style={isSelected ? getSelectedItemDynamicStyles() : undefined}
                onClick={() => handleSelect(option.value)}
                role="option"
                aria-selected={isSelected}
              >
                <span className={styles.optionLabel}>{option.label}</span>
                {isSelected && (
                  <Check size={14} className={styles.checkIcon} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
