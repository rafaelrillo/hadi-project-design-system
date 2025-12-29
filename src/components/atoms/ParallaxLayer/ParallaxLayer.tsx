// Path: src/components/atoms/ParallaxLayer/ParallaxLayer.tsx
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './ParallaxLayer.module.css';

export interface ParallaxLayerProps {
  speed?: number; // 0.1 = slow, 1 = normal, 2 = fast (opposite direction)
  children: React.ReactNode;
  className?: string;
  direction?: 'vertical' | 'horizontal';
}

export function ParallaxLayer({
  speed = 0.5,
  children,
  className = '',
  direction = 'vertical',
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'vertical' ? [`${-50 * speed}px`, `${50 * speed}px`] : ['0px', '0px']
  );

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'horizontal' ? [`${-50 * speed}px`, `${50 * speed}px`] : ['0px', '0px']
  );

  return (
    <motion.div ref={ref} className={`${styles.parallaxLayer} ${className}`} style={{ x, y }}>
      {children}
    </motion.div>
  );
}

export default ParallaxLayer;
