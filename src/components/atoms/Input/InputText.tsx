// Path: src/components/atoms/Input/InputText.tsx
import React from 'react';
import styles from './InputText.module.css';

export interface InputTextProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export function InputText({
  value,
  onChange,
  placeholder,
  disabled = false,
  error = false,
  type = 'text',
  ariaLabel,
  ariaDescribedBy
}: InputTextProps) {
  const inputClasses = [styles.input];
  if (error) {
    inputClasses.push(styles.inputError);
  }

  return (
    <div className={styles.container}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-invalid={error}
        className={inputClasses.join(' ')}
      />
    </div>
  );
}
