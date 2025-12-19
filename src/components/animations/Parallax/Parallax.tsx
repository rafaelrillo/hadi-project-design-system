// src/components/animations/Parallax/Parallax.tsx
import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

export interface ParallaxProps {
  children: ReactNode;
  /** Speed multiplier. Negative = opposite direction. Default: 0.5 */
  speed?: number;
  /** Direction of parallax effect */
  direction?: 'vertical' | 'horizontal';
  /** Offset range in pixels. Default: [-100, 100] */
  range?: [number, number];
  /** Additional className */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

export function Parallax({
  children,
  speed = 0.5,
  direction = 'vertical',
  range,
  className = '',
  style
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const defaultRange: [number, number] = [-100 * speed, 100 * speed];
  const actualRange = range || defaultRange;

  const transform: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 1],
    actualRange
  );

  const motionStyle = direction === 'vertical'
    ? { y: transform }
    : { x: transform };

  return (
    <div ref={ref} className={className} style={style}>
      <motion.div style={motionStyle}>
        {children}
      </motion.div>
    </div>
  );
}

// Preset configurations
export const slowParallax = { speed: 0.3 };
export const fastParallax = { speed: 0.8 };
export const reverseParallax = { speed: -0.5 };
export const horizontalParallax = { direction: 'horizontal' as const, speed: 0.5 };
