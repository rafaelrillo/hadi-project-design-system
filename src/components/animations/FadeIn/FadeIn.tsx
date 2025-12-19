// src/components/animations/FadeIn/FadeIn.tsx
import { ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  gentleTransition
} from '../presets';

export interface FadeInProps {
  children: ReactNode;
  direction?: 'none' | 'up' | 'down' | 'left' | 'right' | 'scale';
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const directionVariants: Record<string, Variants> = {
  none: fadeIn,
  up: fadeInUp,
  down: fadeInDown,
  left: fadeInLeft,
  right: fadeInRight,
  scale: scaleIn
};

export function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.3,
  className = '',
  once = true
}: FadeInProps) {
  const variants = directionVariants[direction];

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
      variants={variants}
      transition={{ ...gentleTransition, delay, duration }}
    >
      {children}
    </motion.div>
  );
}
