// Path: src/components/atoms/sentinel/DataReveal/DataReveal.tsx
import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';
import styles from './DataReveal.module.css';

export type RevealDirection = 'up' | 'down' | 'left' | 'right';

export interface DataRevealProps {
  delay?: number;
  duration?: number;
  children?: ReactNode;
  direction?: RevealDirection;
  threshold?: number;
  once?: boolean;
  className?: string;
  style?: CSSProperties;
}

const directionClassMap: Record<RevealDirection, string> = {
  up: 'fromUp',
  down: 'fromDown',
  left: 'fromLeft',
  right: 'fromRight',
};

export function DataReveal({
  delay = 0,
  duration = 600,
  children,
  direction = 'up',
  threshold = 0.1,
  once = true,
  className = '',
  style,
}: DataRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add delay before revealing
          const timer = setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, delay);

          if (once) {
            observer.disconnect();
          }

          return () => clearTimeout(timer);
        } else if (!once && hasAnimated) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const element = elementRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  }, [delay, threshold, once, hasAnimated]);

  const containerClasses = [
    styles.container,
    styles[directionClassMap[direction]],
    isVisible ? styles.visible : '',
    className,
  ].filter(Boolean).join(' ');

  const containerStyle: CSSProperties = {
    ...style,
    '--reveal-duration': `${duration}ms`,
    '--reveal-delay': `${delay}ms`,
  } as CSSProperties;

  return (
    <div
      ref={elementRef}
      className={containerClasses}
      style={containerStyle}
    >
      {children}
    </div>
  );
}

export default DataReveal;
