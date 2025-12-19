// src/components/animations/StaggerList/StaggerList.tsx
import { ReactNode, Children } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  staggerContainer,
  staggerContainerFast,
  staggerContainerSlow,
  staggerItem,
  staggerItemLeft
} from '../presets';

export interface StaggerListProps {
  children: ReactNode;
  speed?: 'fast' | 'normal' | 'slow';
  direction?: 'up' | 'left';
  className?: string;
  itemClassName?: string;
  as?: 'ul' | 'ol' | 'div';
}

const containerVariants: Record<string, Variants> = {
  fast: staggerContainerFast,
  normal: staggerContainer,
  slow: staggerContainerSlow
};

const itemVariants: Record<string, Variants> = {
  up: staggerItem,
  left: staggerItemLeft
};

export function StaggerList({
  children,
  speed = 'normal',
  direction = 'up',
  className = '',
  itemClassName = '',
  as = 'ul'
}: StaggerListProps) {
  const Container = motion[as];
  const container = containerVariants[speed];
  const item = itemVariants[direction];

  return (
    <Container
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {Children.map(children, (child, index) => (
        <motion.li
          key={index}
          className={itemClassName}
          variants={item}
          style={{ listStyle: 'none' }}
        >
          {child}
        </motion.li>
      ))}
    </Container>
  );
}
