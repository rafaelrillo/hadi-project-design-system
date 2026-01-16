// Path: src/components/atoms/Input/InputText.tsx
import { type ChangeEvent, type CSSProperties, type ReactNode } from 'react';
import { useLightEngineOptional } from '@contexts/LightEngineContext';
import styles from './InputText.module.css';

export type InputTextSize = 'sm' | 'md' | 'lg';
export type InputTextState = 'default' | 'error' | 'success';

export interface InputTextProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  state?: InputTextState;
  /** @deprecated Use state="error" instead */
  error?: boolean;
  size?: InputTextSize;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  /** Icon to display on the left */
  icon?: ReactNode;
  /** Content to display on the right (icon, text, button) */
  suffix?: ReactNode;
  /** Label text above the input */
  label?: string;
  /** Helper text below the input */
  helperText?: string;
  /** Enable dynamic shadows from Light Engine */
  dynamicShadows?: boolean;
  name?: string;
  id?: string;
  autoComplete?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  className?: string;
}

export function InputText({
  value,
  onChange,
  placeholder,
  disabled = false,
  state = 'default',
  error = false,
  size = 'md',
  type = 'text',
  icon,
  suffix,
  label,
  helperText,
  dynamicShadows = true,
  name,
  id,
  autoComplete,
  ariaLabel,
  ariaDescribedBy,
  className,
}: InputTextProps) {
  // Get light engine context (optional)
  const lightEngine = useLightEngineOptional();

  // Handle deprecated error prop
  const resolvedState = error ? 'error' : state;

  // Build className
  const getInputClassName = (): string => {
    const classes = [styles.input];

    // Add state class
    if (resolvedState === 'error') {
      classes.push(styles.inputError);
    } else if (resolvedState === 'success') {
      classes.push(styles.inputSuccess);
    }

    // Add size class
    if (size === 'sm') {
      classes.push(styles.inputSm);
    } else if (size === 'lg') {
      classes.push(styles.inputLg);
    }

    // Add icon/suffix modifiers
    if (icon) classes.push(styles.inputWithIcon);
    if (suffix) classes.push(styles.inputWithSuffix);

    // Add dynamic shadows class
    if (dynamicShadows && lightEngine) {
      classes.push(styles.dynamicShadows);
    }

    if (className) classes.push(className);

    return classes.join(' ');
  };

  // Get dynamic inset shadow styles
  const getDynamicStyles = (): CSSProperties | undefined => {
    if (!dynamicShadows || !lightEngine) return undefined;

    const { shadows } = lightEngine;
    const distance = size === 'sm' ? 2 : size === 'lg' ? 4 : 3;
    const blur = size === 'sm' ? 4 : size === 'lg' ? 8 : 6;

    return {
      boxShadow: shadows.getNeuInsetShadow(distance, blur),
    };
  };

  // Helper text styling
  const getHelperTextClassName = (): string => {
    const classes = [styles.helperText];
    if (resolvedState === 'error') {
      classes.push(styles.helperTextError);
    } else if (resolvedState === 'success') {
      classes.push(styles.helperTextSuccess);
    }
    return classes.join(' ');
  };

  const inputId = id || name;
  const helperTextId = helperText ? `${inputId}-helper` : undefined;

  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <input
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy || helperTextId}
          aria-invalid={resolvedState === 'error'}
          className={getInputClassName()}
          style={getDynamicStyles()}
        />
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>
      {helperText && (
        <p id={helperTextId} className={getHelperTextClassName()}>
          {helperText}
        </p>
      )}
    </div>
  );
}
