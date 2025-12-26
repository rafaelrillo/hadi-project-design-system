// src/components/animations/presets.ts
// Framer Motion animation presets for SENTINEL design system

import type { Variants, Transition } from 'framer-motion';

// ============================================
// TRANSITIONS
// ============================================

export const springTransition: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 17
};

export const smoothTransition: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 20
};

export const snappyTransition: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 30
};

export const gentleTransition: Transition = {
  duration: 0.3,
  ease: 'easeOut'
};

// ============================================
// HOVER PRESETS
// ============================================

export const cardHover = {
  whileHover: {
    borderColor: 'var(--sentinel-accent-primary, #5ba3a5)',
    boxShadow: '0 0 15px rgba(91, 163, 165, 0.2)'
  },
  transition: { duration: 0.2 }
};

export const glowHover = {
  whileHover: {
    boxShadow: '0 0 20px rgba(91, 163, 165, 0.4)'
  },
  transition: { duration: 0.2 }
};

export const scaleHover = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: springTransition
};

export const springButton = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: springTransition
};

// ============================================
// ENTER/EXIT ANIMATIONS
// ============================================

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 }
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

// ============================================
// STAGGER ANIMATIONS
// ============================================

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.05
    }
  }
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

export const staggerItemLeft: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 }
};

// ============================================
// EXIT ANIMATIONS
// ============================================

export const exitAnimation: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 }
};

export const slideExitRight: Variants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 }
};

// ============================================
// DATA REVEAL ANIMATIONS
// ============================================

export const logEntryReveal: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 }
  }
};

export const dataLineAppear: Variants = {
  hidden: { opacity: 0, y: 5 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2 }
  }
};

// Legacy alias for backwards compatibility
export const terminalLineAppear = dataLineAppear;
