// Path: src/components/atoms/sentinel/DataMatrixBackground/DataMatrixBackground.tsx

import { useMemo, useEffect, useState } from 'react';
import styles from './DataMatrixBackground.module.css';

export interface DataMatrixBackgroundProps {
  density?: 'sparse' | 'normal' | 'dense';
  speed?: 'slow' | 'normal';
  opacity?: number;
  color?: 'accent' | 'neutral';
  className?: string;
}

// Financial symbols and numbers for the rain effect
const MATRIX_CHARS = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  '$', '€', '£', '¥',
  '+', '-', '%', '.',
  '▲', '▼', '●',
];

interface RainColumn {
  id: number;
  left: number;
  delay: number;
  duration: number;
  chars: string[];
}

const densityConfig = {
  sparse: 8,
  normal: 12,
  dense: 18,
};

const speedConfig = {
  slow: { min: 15, max: 25 },
  normal: { min: 10, max: 18 },
};

function generateRandomChars(count: number): string[] {
  return Array.from({ length: count }, () =>
    MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
  );
}

export function DataMatrixBackground({
  density = 'sparse',
  speed = 'slow',
  opacity = 0.03,
  color = 'accent',
  className = '',
}: DataMatrixBackgroundProps) {
  const [columns, setColumns] = useState<RainColumn[]>([]);

  // Generate rain columns on mount
  useEffect(() => {
    const columnCount = densityConfig[density];
    const speedRange = speedConfig[speed];

    const newColumns: RainColumn[] = Array.from({ length: columnCount }, (_, i) => ({
      id: i,
      left: (100 / columnCount) * i + Math.random() * (100 / columnCount / 2),
      delay: Math.random() * 10,
      duration: speedRange.min + Math.random() * (speedRange.max - speedRange.min),
      chars: generateRandomChars(12 + Math.floor(Math.random() * 8)),
    }));

    setColumns(newColumns);
  }, [density, speed]);

  const containerClasses = [
    styles.container,
    styles[color],
    className,
  ].filter(Boolean).join(' ');

  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      className={containerClasses}
      style={{ '--matrix-opacity': opacity } as React.CSSProperties}
      aria-hidden="true"
    >
      {columns.map((column) => (
        <div
          key={column.id}
          className={styles.column}
          style={{
            left: `${column.left}%`,
            animationDelay: `${column.delay}s`,
            animationDuration: `${column.duration}s`,
          }}
        >
          {column.chars.map((char, charIndex) => (
            <span
              key={charIndex}
              className={styles.char}
              style={{
                animationDelay: `${column.delay + charIndex * 0.1}s`,
              }}
            >
              {char}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default DataMatrixBackground;
