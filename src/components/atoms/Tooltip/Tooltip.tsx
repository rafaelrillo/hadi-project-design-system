// Path: src/components/atoms/Tooltip/Tooltip.tsx
import React, { useState, useRef, useEffect } from 'react';
import styles from './Tooltip.module.css';

export interface TooltipProps {
  children: React.ReactNode;
  content: string;
  variant?: 'dark' | 'light';
  position?: 'top' | 'right' | 'bottom' | 'left';
}

export function Tooltip({
  children,
  content,
  variant = 'dark',
  position = 'top'
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle show with delay
  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setShouldShow(true);
      setIsVisible(true);
    }, 200);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShouldShow(false);
    setIsVisible(false);
  };

  const handleFocus = () => {
    timeoutRef.current = setTimeout(() => {
      setShouldShow(true);
      setIsVisible(true);
    }, 200);
  };

  const handleBlur = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShouldShow(false);
    setIsVisible(false);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Build tooltip classes
  const getTooltipClasses = (): string => {
    const classes = [styles.tooltip];

    // Position
    if (position === 'top') classes.push(styles.positionTop);
    else if (position === 'bottom') classes.push(styles.positionBottom);
    else if (position === 'left') classes.push(styles.positionLeft);
    else if (position === 'right') classes.push(styles.positionRight);

    // Variant
    if (variant === 'dark') classes.push(styles.variantDark);
    else classes.push(styles.variantLight);

    // Visibility
    if (isVisible) classes.push(styles.tooltipVisible);
    else classes.push(styles.tooltipHidden);

    return classes.join(' ');
  };

  // Build arrow classes
  const getArrowClasses = (): string => {
    const classes = [styles.arrow];

    // Variant
    if (variant === 'dark') classes.push(styles.arrowDark);
    else classes.push(styles.arrowLight);

    // Position
    if (position === 'top') classes.push(styles.arrowTop);
    else if (position === 'bottom') classes.push(styles.arrowBottom);
    else if (position === 'left') classes.push(styles.arrowLeft);
    else if (position === 'right') classes.push(styles.arrowRight);

    return classes.join(' ');
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {children}
      {shouldShow && (
        <div
          role="tooltip"
          aria-hidden={!isVisible}
          className={getTooltipClasses()}
        >
          {content}
          <div className={getArrowClasses()} />
        </div>
      )}
    </div>
  );
}
