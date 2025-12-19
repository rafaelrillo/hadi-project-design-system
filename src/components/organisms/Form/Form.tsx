// Path: src/components/organisms/Form/Form.tsx
import React from 'react';
import styles from './Form.module.css';

export interface FormProps {
  children: React.ReactNode;
  columns?: 1 | 2;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  footer?: React.ReactNode;
  className?: string;
}

const getClassName = (...classes: (string | undefined | false)[]) =>
  classes.filter(Boolean).join(' ');

export function Form({
  children,
  columns = 1,
  onSubmit,
  footer,
  className
}: FormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className={getClassName(styles.form, className)}>
      <div className={getClassName(
        styles.fieldsContainer,
        columns === 2 && styles.twoColumns
      )}>
        {children}
      </div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </form>
  );
}
