// Path: src/components/atoms/StatCounter/StatCounter.tsx
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './StatCounter.module.css';

export interface StatCounterProps {
  value: number | string;
  label: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function StatCounter({
  value,
  label,
  prefix = '',
  suffix = '',
  duration = 2000,
  className = '',
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [displayValue, setDisplayValue] = useState<string | number>(0);

  useEffect(() => {
    if (!isInView) return;

    // If value is a string (like "$2.4B"), just display it directly
    if (typeof value === 'string') {
      setDisplayValue(value);
      return;
    }

    // Animate number counting
    const startTime = Date.now();
    const endValue = value;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const eased = 1 - Math.pow(1 - progress, 3);

      const current = Math.floor(endValue * eased);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  const formattedValue =
    typeof displayValue === 'number'
      ? displayValue.toLocaleString()
      : displayValue;

  return (
    <motion.div
      ref={ref}
      className={`${styles.statCounter} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <span className={styles.value}>
        {prefix}
        {formattedValue}
        {suffix}
      </span>
      <span className={styles.label}>{label}</span>
    </motion.div>
  );
}

export default StatCounter;
