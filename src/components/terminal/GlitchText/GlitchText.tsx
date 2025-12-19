// src/components/terminal/GlitchText/GlitchText.tsx
import { ReactNode, useImperativeHandle, forwardRef } from 'react';
import { useGlitch } from 'react-powerglitch';
import styles from './GlitchText.module.css';

export interface GlitchTextRef {
  startGlitch: () => void;
  stopGlitch: () => void;
}

export interface GlitchTextProps {
  children: ReactNode;
  intensity?: 'low' | 'medium' | 'high' | 'extreme' | 'subtle';
  playMode?: 'always' | 'hover' | 'manual';
  hueRotate?: boolean;
  cssFilters?: string;
  className?: string;
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p';
}

const intensityConfig = {
  subtle: {
    glitchTimeSpan: { start: 0.9, end: 0.95 },
    shake: { velocity: 5, amplitudeX: 0.02, amplitudeY: 0.01 },
    slice: { count: 2, velocity: 5, minHeight: 0.01, maxHeight: 0.03 },
    timing: { duration: 4000 }
  },
  low: {
    glitchTimeSpan: { start: 0.7, end: 0.8 },
    shake: { velocity: 5, amplitudeX: 0.1, amplitudeY: 0.1 },
    slice: { count: 6, velocity: 15, minHeight: 0.02, maxHeight: 0.15 },
    timing: { duration: 2000 }
  },
  medium: {
    glitchTimeSpan: { start: 0.5, end: 0.7 },
    shake: { velocity: 15, amplitudeX: 0.2, amplitudeY: 0.1 },
    slice: { count: 6, velocity: 15, minHeight: 0.02, maxHeight: 0.15 },
    timing: { duration: 2000 }
  },
  high: {
    glitchTimeSpan: { start: 0.3, end: 0.8 },
    shake: { velocity: 25, amplitudeX: 0.3, amplitudeY: 0.2 },
    slice: { count: 6, velocity: 15, minHeight: 0.02, maxHeight: 0.15 },
    timing: { duration: 2000 }
  },
  extreme: {
    glitchTimeSpan: { start: 0.1, end: 0.9 },
    shake: { velocity: 50, amplitudeX: 0.5, amplitudeY: 0.3 },
    slice: { count: 15, velocity: 30, minHeight: 0.1, maxHeight: 0.4 },
    timing: { duration: 500 }
  }
};

export const GlitchText = forwardRef<GlitchTextRef, GlitchTextProps>(({
  children,
  intensity = 'medium',
  playMode = 'always',
  hueRotate = false,
  cssFilters,
  className = '',
  as: Component = 'span'
}, ref) => {
  const config = intensityConfig[intensity];

  const glitch = useGlitch({
    ...config,
    playMode: playMode === 'manual' ? 'manual' : playMode === 'hover' ? 'hover' : 'always',
    slice: {
      ...config.slice,
      hueRotate,
      ...(cssFilters && { cssFilters })
    },
    timing: {
      ...config.timing,
      iterations: playMode === 'manual' ? 1 : Infinity
    }
  });

  useImperativeHandle(ref, () => ({
    startGlitch: () => glitch.startGlitch(),
    stopGlitch: () => glitch.stopGlitch()
  }));

  const getClassName = (): string => {
    const classes = [styles.glitch];
    if (className) classes.push(className);
    return classes.join(' ');
  };

  return (
    <Component ref={glitch.ref} className={getClassName()}>
      {children}
    </Component>
  );
});

GlitchText.displayName = 'GlitchText';
