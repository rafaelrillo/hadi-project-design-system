// Path: src/components/atoms/Typography/Typography.tsx
import styles from './Typography.module.css';

// Text effect type for neumorphic carved/embossed
// RULE: RAISED container → carved (text pressed into surface)
//       INSET container  → embossed (text raised from surface)
export type TextEffect =
  // Carved (debossed) - Standard (0.5px offset)
  | 'carved'
  | 'carved-strong'
  | 'carved-steel'
  | 'carved-petrol'
  | 'carved-muted'
  | 'carved-positive'
  | 'carved-warning'
  | 'carved-negative'
  | 'carved-info'
  | 'carved-accent'
  // Carved - Whisper (ultra-subtle for mobile/compact)
  | 'carved-whisper'
  // Carved - Strong semantic (1px offset, for KPI values)
  | 'carved-positive-strong'
  | 'carved-warning-strong'
  | 'carved-negative-strong'
  | 'carved-info-strong'
  | 'carved-accent-strong'
  // Carved - Medium semantic (0.75px offset, for titles/change values)
  | 'carved-petrol-md'
  | 'carved-positive-md'
  | 'carved-warning-md'
  | 'carved-negative-md'
  // Glow - non-directional for active/highlighted elements
  | 'glow-petrol'
  | 'glow-positive'
  | 'glow-negative'
  // Embossed (raised) - Standard, for INSET containers
  | 'embossed'
  | 'embossed-subtle'
  | 'embossed-strong'
  | 'embossed-petrol'
  | 'embossed-positive'
  | 'embossed-warning'
  | 'embossed-negative'
  | 'embossed-info'
  // Embossed - Small semantic (0.5px offset, for KPI labels)
  | 'embossed-petrol-sm'
  | 'embossed-positive-sm'
  | 'embossed-warning-sm'
  | 'embossed-negative-sm'
  | 'embossed-info-sm';

// Map effect names to CSS module class names
const effectClassMap: Record<TextEffect, string> = {
  // Carved standard
  'carved': 'carved',
  'carved-strong': 'carvedStrong',
  'carved-steel': 'carvedSteel',
  'carved-petrol': 'carvedPetrol',
  'carved-muted': 'carvedMuted',
  'carved-positive': 'carvedPositive',
  'carved-warning': 'carvedWarning',
  'carved-negative': 'carvedNegative',
  'carved-info': 'carvedInfo',
  'carved-accent': 'carvedAccent',
  // Carved whisper
  'carved-whisper': 'carvedWhisper',
  // Carved strong semantic
  'carved-positive-strong': 'carvedPositiveStrong',
  'carved-warning-strong': 'carvedWarningStrong',
  'carved-negative-strong': 'carvedNegativeStrong',
  'carved-info-strong': 'carvedInfoStrong',
  'carved-accent-strong': 'carvedAccentStrong',
  // Carved medium semantic
  'carved-petrol-md': 'carvedPetrolMd',
  'carved-positive-md': 'carvedPositiveMd',
  'carved-warning-md': 'carvedWarningMd',
  'carved-negative-md': 'carvedNegativeMd',
  // Glow
  'glow-petrol': 'glowPetrol',
  'glow-positive': 'glowPositive',
  'glow-negative': 'glowNegative',
  // Embossed standard
  'embossed': 'embossed',
  'embossed-subtle': 'embossedSubtle',
  'embossed-strong': 'embossedStrong',
  'embossed-petrol': 'embossedPetrol',
  'embossed-positive': 'embossedPositive',
  'embossed-warning': 'embossedWarning',
  'embossed-negative': 'embossedNegative',
  'embossed-info': 'embossedInfo',
  // Embossed small semantic
  'embossed-petrol-sm': 'embossedPetrolSm',
  'embossed-positive-sm': 'embossedPositiveSm',
  'embossed-warning-sm': 'embossedWarningSm',
  'embossed-negative-sm': 'embossedNegativeSm',
  'embossed-info-sm': 'embossedInfoSm',
};

// Base interface for all typography components
interface BaseTypographyProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  effect?: TextEffect;
}

// Helper to combine CSS module class with effect and custom className
const getClassName = (baseClass: string, effect?: TextEffect, customClass?: string): string => {
  const classes = [baseClass];
  if (effect) {
    const effectClass = styles[effectClassMap[effect]];
    if (effectClass) classes.push(effectClass);
  }
  if (customClass) classes.push(customClass);
  return classes.join(' ');
};

// Heading1 - h1 18px Semibold
export interface Heading1Props extends BaseTypographyProps {}

export function Heading1({ children, className, style, effect }: Heading1Props) {
  return (
    <h1 className={getClassName(styles.heading1, effect, className)} style={style}>
      {children}
    </h1>
  );
}

// Heading2 - h2 16px Semibold
export interface Heading2Props extends BaseTypographyProps {}

export function Heading2({ children, className, style, effect }: Heading2Props) {
  return (
    <h2 className={getClassName(styles.heading2, effect, className)} style={style}>
      {children}
    </h2>
  );
}

// Heading3 - h3 16px Semibold
export interface Heading3Props extends BaseTypographyProps {}

export function Heading3({ children, className, style, effect }: Heading3Props) {
  return (
    <h3 className={getClassName(styles.heading3, effect, className)} style={style}>
      {children}
    </h3>
  );
}

// Heading4 - h4 14px Semibold
export interface Heading4Props extends BaseTypographyProps {}

export function Heading4({ children, className, style, effect }: Heading4Props) {
  return (
    <h4 className={getClassName(styles.heading4, effect, className)} style={style}>
      {children}
    </h4>
  );
}

// Paragraph - p 14px Regular
export interface ParagraphProps extends BaseTypographyProps {}

export function Paragraph({ children, className, style, effect }: ParagraphProps) {
  return (
    <p className={getClassName(styles.paragraph, effect, className)} style={style}>
      {children}
    </p>
  );
}

// Label - label 12px Regular
export interface LabelProps extends BaseTypographyProps {
  htmlFor?: string;
}

export function Label({ children, className, style, htmlFor, effect }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={getClassName(styles.label, effect, className)}
      style={style}
    >
      {children}
    </label>
  );
}

// ProductKey - 24px Bold, Red #DA291C (special branding component)
export interface ProductKeyProps extends BaseTypographyProps {}

export function ProductKey({ children, className, style, effect }: ProductKeyProps) {
  return (
    <span className={getClassName(styles.productKey, effect, className)} style={style}>
      {children}
    </span>
  );
}
