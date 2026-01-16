// Path: src/components/atoms/Tooltip/Tooltip.tsx
import { useState, useRef, useEffect, type ReactNode, type CSSProperties } from 'react';
import { useLightEngineOptional } from '@contexts/LightEngineContext';
import styles from './Tooltip.module.css';

export type TooltipVariant = 'dark' | 'light' | 'glass';

export interface TooltipProps {
  children: ReactNode;
  content: string;
  variant?: TooltipVariant;
  position?: 'top' | 'right' | 'bottom' | 'left';
  /** Enable dynamic shadows from Light Engine (glass variant only) */
  dynamicShadows?: boolean;
  /** Custom hue for glass variant (0-360) */
  glassHue?: number;
  /** Custom saturation for glass variant (0-100) */
  glassSat?: number;
}

// Glass hue preset for tooltips
const GLASS_TOOLTIP = {
  hue: 215,
  sat: 30,
};

export function Tooltip({
  children,
  content,
  variant = 'dark',
  position = 'top',
  dynamicShadows = true,
  glassHue,
  glassSat,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get light engine context (optional)
  const lightEngine = useLightEngineOptional();

  // Resolve glass hue and saturation
  const hue = glassHue ?? GLASS_TOOLTIP.hue;
  const sat = glassSat ?? GLASS_TOOLTIP.sat;

  // Get dynamic styles for glass variant
  const getGlassDynamicStyles = (): CSSProperties | undefined => {
    if (variant !== 'glass' || !dynamicShadows || !lightEngine) return undefined;

    const { shadows } = lightEngine;
    return {
      boxShadow: shadows.getLayeredShadow(hue, sat),
      background: shadows.getGlassBackground(hue, sat),
      borderColor: shadows.getGlassBorder(hue, sat),
    };
  };

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
    else if (variant === 'light') classes.push(styles.variantLight);
    else if (variant === 'glass') {
      classes.push(styles.variantGlass);
      if (dynamicShadows && lightEngine) classes.push(styles.dynamicShadows);
    }

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
    else if (variant === 'light') classes.push(styles.arrowLight);
    else if (variant === 'glass') classes.push(styles.arrowGlass);

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
          style={getGlassDynamicStyles()}
        >
          {content}
          <div className={getArrowClasses()} />
        </div>
      )}
    </div>
  );
}
