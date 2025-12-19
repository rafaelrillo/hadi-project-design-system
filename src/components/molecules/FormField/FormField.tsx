// Path: src/components/molecules/FormField/FormField.tsx
import styles from './FormField.module.css';

export interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  htmlFor?: string;
  id?: string;
}

export function FormField({
  label,
  children,
  helperText,
  errorMessage,
  required = false,
  htmlFor,
  id
}: FormFieldProps) {
  return (
    <div id={id} className={styles.container}>
      <label htmlFor={htmlFor} className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      {children}
      {helperText && !errorMessage && (
        <span className={styles.helperText}>{helperText}</span>
      )}
      {errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
}
