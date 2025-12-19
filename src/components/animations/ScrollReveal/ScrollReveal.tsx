// src/components/animations/ScrollReveal/ScrollReveal.tsx
import { ReactNode } from 'react';
import { motion, useScroll, type MotionValue } from 'framer-motion';

export interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
}

export function ScrollReveal({ children, className = '' }: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

// ScrollProgress - progress bar based on scroll position
export interface ScrollProgressProps {
  className?: string;
  color?: string;
  height?: number;
  position?: 'top' | 'bottom';
}

export function ScrollProgress({
  className = '',
  color = '#FF6600',
  height = 3,
  position = 'top'
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className={className}
      style={{
        position: 'fixed',
        [position]: 0,
        left: 0,
        right: 0,
        height,
        backgroundColor: color,
        transformOrigin: 'left',
        scaleX: scrollYProgress,
        zIndex: 9999
      }}
    />
  );
}

// Helper hook for scroll-based animations
export function useScrollProgress(): MotionValue<number> {
  const { scrollYProgress } = useScroll();
  return scrollYProgress;
}
