// Path: src/components/atoms/Typography/Typography.tsx
import styles from './Typography.module.css';

// Base interface for all typography components
interface BaseTypographyProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// Helper to combine CSS module class with custom className
const getClassName = (baseClass: string, customClass?: string): string => {
  return customClass ? `${baseClass} ${customClass}` : baseClass;
};

// Heading1 - h1 18px Semibold
export interface Heading1Props extends BaseTypographyProps {}

export function Heading1({ children, className, style }: Heading1Props) {
  return (
    <h1 className={getClassName(styles.heading1, className)} style={style}>
      {children}
    </h1>
  );
}

// Heading2 - h2 16px Semibold
export interface Heading2Props extends BaseTypographyProps {}

export function Heading2({ children, className, style }: Heading2Props) {
  return (
    <h2 className={getClassName(styles.heading2, className)} style={style}>
      {children}
    </h2>
  );
}

// Heading3 - h3 16px Semibold
export interface Heading3Props extends BaseTypographyProps {}

export function Heading3({ children, className, style }: Heading3Props) {
  return (
    <h3 className={getClassName(styles.heading3, className)} style={style}>
      {children}
    </h3>
  );
}

// Heading4 - h4 14px Semibold
export interface Heading4Props extends BaseTypographyProps {}

export function Heading4({ children, className, style }: Heading4Props) {
  return (
    <h4 className={getClassName(styles.heading4, className)} style={style}>
      {children}
    </h4>
  );
}

// Paragraph - p 14px Regular
export interface ParagraphProps extends BaseTypographyProps {}

export function Paragraph({ children, className, style }: ParagraphProps) {
  return (
    <p className={getClassName(styles.paragraph, className)} style={style}>
      {children}
    </p>
  );
}

// Label - label 12px Regular
export interface LabelProps extends BaseTypographyProps {
  htmlFor?: string;
}

export function Label({ children, className, style, htmlFor }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={getClassName(styles.label, className)}
      style={style}
    >
      {children}
    </label>
  );
}

// ProductKey - 24px Bold, Red #DA291C (special branding component)
export interface ProductKeyProps extends BaseTypographyProps {}

export function ProductKey({ children, className, style }: ProductKeyProps) {
  return (
    <span className={getClassName(styles.productKey, className)} style={style}>
      {children}
    </span>
  );
}
