// Path: src/components/atoms/Input/Textarea.tsx
import React from 'react';
import styles from './Textarea.module.css';

export interface TextareaProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  maxLength?: number;
  ariaLabel?: string;
}

export function Textarea({
  value,
  onChange,
  placeholder,
  disabled = false,
  error = false,
  maxLength,
  ariaLabel
}: TextareaProps) {
  const currentLength = value?.length || 0;

  const textareaClasses = [styles.textarea];
  if (error) {
    textareaClasses.push(styles.textareaError);
  }
  if (maxLength) {
    textareaClasses.push(styles.textareaWithCounter);
  }

  return (
    <div className={styles.container}>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-invalid={error}
        className={textareaClasses.join(' ')}
      />
      {maxLength && (
        <span className={styles.counter}>
          {currentLength}/{maxLength}
        </span>
      )}
    </div>
  );
}
