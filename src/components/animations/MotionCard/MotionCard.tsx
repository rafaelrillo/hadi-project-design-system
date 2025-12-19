// src/components/animations/MotionCard/MotionCard.tsx
import { ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cardHover, scaleHover, glowHover, springTransition } from '../presets';

export interface MotionCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  variant?: 'default' | 'scale' | 'glow';
  enableTap?: boolean;
  className?: string;
}

const variants = {
  default: cardHover,
  scale: scaleHover,
  glow: glowHover
};

export function MotionCard({
  children,
  variant = 'default',
  enableTap = true,
  className = '',
  ...props
}: MotionCardProps) {
  const hoverConfig = variants[variant];

  return (
    <motion.div
      className={className}
      whileHover={hoverConfig.whileHover}
      whileTap={enableTap ? { scale: 0.98 } : undefined}
      transition={hoverConfig.transition || springTransition}
      {...props}
    >
      {children}
    </motion.div>
  );
}
