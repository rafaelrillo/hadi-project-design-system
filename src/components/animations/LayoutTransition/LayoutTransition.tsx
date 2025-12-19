// src/components/animations/LayoutTransition/LayoutTransition.tsx
import { ReactNode } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

export interface LayoutTransitionProps {
  children: ReactNode;
  /** Unique layout ID for shared element transitions */
  layoutId?: string;
  /** Animation type */
  type?: 'crossfade' | 'switch' | 'size' | 'position';
  /** Duration in seconds */
  duration?: number;
  /** Additional className */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

const transitionConfigs = {
  crossfade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  switch: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 }
  },
  size: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  },
  position: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  }
};

export function LayoutTransition({
  children,
  layoutId,
  type = 'crossfade',
  duration = 0.3,
  className = '',
  style
}: LayoutTransitionProps) {
  const config = transitionConfigs[type];

  return (
    <motion.div
      layout
      layoutId={layoutId}
      className={className}
      style={style}
      initial={config.initial}
      animate={config.animate}
      exit={config.exit}
      transition={{ duration, type: 'spring', stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}

// Wrapper for grouping layout animations
export interface LayoutContainerProps {
  children: ReactNode;
  /** Unique ID for the layout group */
  id?: string;
}

export function LayoutContainer({ children, id }: LayoutContainerProps) {
  return (
    <LayoutGroup id={id}>
      <AnimatePresence mode="popLayout">
        {children}
      </AnimatePresence>
    </LayoutGroup>
  );
}

// Shared element that can animate between different positions
export interface SharedElementProps {
  children: ReactNode;
  /** Shared layout ID - elements with same ID will animate between each other */
  layoutId: string;
  /** Additional className */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Click handler */
  onClick?: () => void;
}

export function SharedElement({
  children,
  layoutId,
  className = '',
  style,
  onClick
}: SharedElementProps) {
  return (
    <motion.div
      layout
      layoutId={layoutId}
      className={className}
      style={{ ...style, cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}
