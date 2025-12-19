// Path: src/components/atoms/Input/InputDropdown.tsx
import { useState, useEffect, useRef } from 'react';
import styles from './InputDropdown.module.css';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface InputDropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

export function InputDropdown({
  options,
  value,
  onChange,
  placeholder,
  disabled = false,
  ariaLabel
}: InputDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get selected option label
  const selectedOption = options.find(opt => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder || '';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setHoveredIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen || disabled) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setHoveredIndex(prev => (prev < options.length - 1 ? prev + 1 : prev));
          break;
        case 'ArrowUp':
          event.preventDefault();
          setHoveredIndex(prev => (prev > 0 ? prev - 1 : 0));
          break;
        case 'Enter':
          event.preventDefault();
          if (hoveredIndex >= 0 && hoveredIndex < options.length) {
            handleSelect(options[hoveredIndex].value);
          }
          break;
        case 'Escape':
          event.preventDefault();
          setIsOpen(false);
          setHoveredIndex(-1);
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, hoveredIndex, options, disabled]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        // Set hovered index to current selected item when opening
        const currentIndex = options.findIndex(opt => opt.value === value);
        setHoveredIndex(currentIndex >= 0 ? currentIndex : 0);
      }
    }
  };

  const handleSelect = (optionValue: string) => {
    if (!disabled) {
      onChange?.(optionValue);
      setIsOpen(false);
      setHoveredIndex(-1);
    }
  };

  // Build trigger classes
  const triggerClasses = [styles.trigger];
  if (!selectedOption) {
    triggerClasses.push(styles.triggerPlaceholder);
  }
  if (isOpen) {
    triggerClasses.push(styles.triggerOpen);
  }

  // Build icon container classes
  const iconContainerClasses = [styles.iconContainer];
  if (isOpen) {
    iconContainerClasses.push(styles.iconContainerOpen);
  }

  // Build option classes
  const getOptionClasses = (index: number, isSelected: boolean): string => {
    const classes = [styles.option];
    if (isSelected) {
      classes.push(styles.optionSelected);
    }
    if (hoveredIndex === index) {
      classes.push(styles.optionHovered);
    }
    return classes.join(' ');
  };

  // ChevronDown SVG icon - 24px as specified
  const ChevronDownIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={disabled ? styles.chevronIconDisabled : styles.chevronIcon}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );

  return (
    <div ref={containerRef} className={styles.container}>
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={triggerClasses.join(' ')}
      >
        {displayText}
      </button>
      <div className={iconContainerClasses.join(' ')}>
        <ChevronDownIcon />
      </div>
      {isOpen && !disabled && (
        <div ref={dropdownRef} className={styles.dropdownMenu} role="listbox">
          {options.map((option, index) => {
            const isSelected = option.value === value;
            return (
              <div
                key={option.value}
                role="option"
                aria-selected={isSelected}
                className={getOptionClasses(index, isSelected)}
                onClick={() => handleSelect(option.value)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
