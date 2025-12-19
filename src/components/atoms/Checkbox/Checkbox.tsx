// Path: src/components/atoms/Checkbox/Checkbox.tsx
import React from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  ariaLabel?: string;
  ariaDescribedby?: string;
  id?: string;
  className?: string;
}

export function Checkbox({
  checked,
  onChange,
  disabled = false,
  ariaLabel,
  ariaDescribedby,
  id,
  className
}: CheckboxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(e.target.checked);
    }
  };

  const classes = [styles.checkbox];
  if (className) {
    classes.push(className);
  }

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={handleChange}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      id={id}
      className={classes.join(' ')}
    />
  );
}
