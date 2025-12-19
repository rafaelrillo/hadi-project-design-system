// Path: src/components/atoms/Button/Button.tsx
import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'destructive' | 'with-icon';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  ariaLabel?: string;
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
  type = 'button',
  icon,
  ariaLabel,
  className
}: ButtonProps) {
  // Build className based on variant and icon presence
  const getClassName = (): string => {
    const classes = [styles.button];

    // Add variant class
    if (variant === 'primary') {
      classes.push(styles.primary);
    } else if (variant === 'secondary') {
      classes.push(styles.secondary);
    } else if (variant === 'destructive') {
      classes.push(styles.destructive);
    } else if (variant === 'with-icon') {
      classes.push(styles.withIcon);
    }

    // Add icon class if icon is present
    if (icon) {
      classes.push(styles.buttonWithIcon);
    }

    // Add custom className if provided
    if (className) {
      classes.push(className);
    }

    return classes.join(' ');
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={getClassName()}
      aria-label={ariaLabel}
    >
      {icon && icon}
      {children}
    </button>
  );
}
