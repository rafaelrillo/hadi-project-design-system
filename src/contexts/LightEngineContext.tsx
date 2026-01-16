// Path: src/contexts/LightEngineContext.tsx
/**
 * Light Engine Context
 *
 * Provides global state for the Dynamic Light Engine system.
 * Controls light angle which affects all neumorphic and glass shadows.
 *
 * Features:
 * - Global light angle state (0-360°)
 * - Auto-animation mode (orbiting light source)
 * - Animation speed control
 * - CSS custom property sync for CSS-based components
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';
import { useDynamicShadows, type DynamicShadowsResult } from '@hooks/useDynamicShadows';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface LightEngineState {
  /** Current light angle in degrees (0-360) */
  lightAngle: number;
  /** Whether auto-animation is enabled */
  isAnimating: boolean;
  /** Animation speed multiplier (1 = normal, 2 = fast, 0.5 = slow) */
  animationSpeed: number;
}

export interface LightEngineActions {
  /** Set the light angle manually */
  setLightAngle: (angle: number) => void;
  /** Toggle auto-animation on/off */
  toggleAnimation: () => void;
  /** Start auto-animation */
  startAnimation: () => void;
  /** Stop auto-animation */
  stopAnimation: () => void;
  /** Set animation speed (multiplier) */
  setAnimationSpeed: (speed: number) => void;
  /** Reset to default angle (135°) */
  resetLightAngle: () => void;
}

export interface LightEngineContextValue extends LightEngineState, LightEngineActions {
  /** Dynamic shadow calculation functions */
  shadows: DynamicShadowsResult;
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const DEFAULT_LIGHT_ANGLE = 135;
const DEFAULT_ANIMATION_SPEED = 1;
const BASE_ROTATION_SPEED = 0.5; // degrees per frame at 60fps

// ─────────────────────────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────────────────────────

const LightEngineContext = createContext<LightEngineContextValue | null>(null);

// ─────────────────────────────────────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────────────────────────────────────

export interface LightEngineProviderProps {
  children: ReactNode;
  /** Initial light angle (default: 135) */
  initialAngle?: number;
  /** Start with animation enabled (default: false) */
  initialAnimating?: boolean;
  /** Initial animation speed (default: 1) */
  initialSpeed?: number;
}

export function LightEngineProvider({
  children,
  initialAngle = DEFAULT_LIGHT_ANGLE,
  initialAnimating = false,
  initialSpeed = DEFAULT_ANIMATION_SPEED,
}: LightEngineProviderProps) {
  const [lightAngle, setLightAngleState] = useState(initialAngle);
  const [isAnimating, setIsAnimating] = useState(initialAnimating);
  const [animationSpeed, setAnimationSpeedState] = useState(initialSpeed);

  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Get shadow calculation functions
  const shadows = useDynamicShadows({ lightAngle });

  // ─────────────────────────────────────────────────────────────────────────
  // Animation Loop
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!isAnimating) {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    const animate = (currentTime: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = currentTime;
      }

      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      // Calculate rotation based on time delta (frame-rate independent)
      const rotationAmount = (BASE_ROTATION_SPEED * animationSpeed * deltaTime) / 16.67; // Normalize to 60fps

      setLightAngleState((prev) => (prev + rotationAmount) % 360);

      animationRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = 0;
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isAnimating, animationSpeed]);

  // ─────────────────────────────────────────────────────────────────────────
  // CSS Custom Property Sync
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    document.documentElement.style.setProperty('--light-angle', String(lightAngle));
  }, [lightAngle]);

  // ─────────────────────────────────────────────────────────────────────────
  // Actions
  // ─────────────────────────────────────────────────────────────────────────

  const setLightAngle = useCallback((angle: number) => {
    // Normalize angle to 0-360 range
    const normalizedAngle = ((angle % 360) + 360) % 360;
    setLightAngleState(normalizedAngle);
  }, []);

  const toggleAnimation = useCallback(() => {
    setIsAnimating((prev) => !prev);
  }, []);

  const startAnimation = useCallback(() => {
    setIsAnimating(true);
  }, []);

  const stopAnimation = useCallback(() => {
    setIsAnimating(false);
  }, []);

  const setAnimationSpeed = useCallback((speed: number) => {
    setAnimationSpeedState(Math.max(0.1, Math.min(5, speed)));
  }, []);

  const resetLightAngle = useCallback(() => {
    setLightAngleState(DEFAULT_LIGHT_ANGLE);
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // Context Value
  // ─────────────────────────────────────────────────────────────────────────

  const value = useMemo<LightEngineContextValue>(
    () => ({
      // State
      lightAngle,
      isAnimating,
      animationSpeed,
      // Actions
      setLightAngle,
      toggleAnimation,
      startAnimation,
      stopAnimation,
      setAnimationSpeed,
      resetLightAngle,
      // Shadow calculations
      shadows,
    }),
    [
      lightAngle,
      isAnimating,
      animationSpeed,
      setLightAngle,
      toggleAnimation,
      startAnimation,
      stopAnimation,
      setAnimationSpeed,
      resetLightAngle,
      shadows,
    ]
  );

  return <LightEngineContext.Provider value={value}>{children}</LightEngineContext.Provider>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Hook to access Light Engine context
 * Must be used within a LightEngineProvider
 */
export function useLightEngine(): LightEngineContextValue {
  const context = useContext(LightEngineContext);

  if (context === null) {
    throw new Error('useLightEngine must be used within a LightEngineProvider');
  }

  return context;
}

/**
 * Optional hook that returns null if not within provider
 * Useful for components that can work with or without the light engine
 */
export function useLightEngineOptional(): LightEngineContextValue | null {
  return useContext(LightEngineContext);
}

// ─────────────────────────────────────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────────────────────────────────────

export { LightEngineContext };
export default LightEngineProvider;
