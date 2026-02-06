# Light Engine - Future Implementation Reference

> This documents the Light Engine system for dynamic shadows based on a global light angle.
> Currently experimental - to be developed and applied correctly in the future.

---

## Overview

The Light Engine calculates shadow directions in real-time based on a light source angle (0-360°).
This creates consistent, realistic neumorphic shadows that can animate as if a light is orbiting the UI.

**Based on**: Josh W. Comeau's shadow principles
- Single light source for consistency
- Layered shadows for depth
- Color-matched shadows (never pure black)

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    LightEngineProvider                          │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  State: lightAngle, isAnimating, animationSpeed          │   │
│  │  Animation Loop: requestAnimationFrame @ 60fps           │   │
│  │  CSS Sync: --light-angle custom property                 │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              ▼                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  useDynamicShadows Hook                                  │   │
│  │  - getNeuPanelShadow(distance, blur)                     │   │
│  │  - getNeuInsetShadow(distance, blur)                     │   │
│  │  - getLayeredShadow(hue, sat)                            │   │
│  │  - getGlassReflection()                                  │   │
│  │  - getGlassBackground(hue, sat)                          │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Files

| File | Purpose |
|------|---------|
| `src/contexts/LightEngineContext.tsx` | Provider, state management, animation loop |
| `src/hooks/useDynamicShadows.ts` | Shadow calculation functions |
| `src/styles/lab/light-engine.css` | CSS variables for CSS-only components |

---

## Usage Pattern (from ShadowsShowcase)

### 1. Wrap with Provider

```tsx
import { LightEngineProvider } from '@/contexts/LightEngineContext';

export function MyPage() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <MyContent />
    </LightEngineProvider>
  );
}
```

### 2. Use the Hook

```tsx
import { useLightEngine } from '@/contexts/LightEngineContext';
import { useMemo } from 'react';

function MyContent() {
  const { lightAngle } = useLightEngine();

  // Calculate shadow direction from light angle
  const shadowOffsets = useMemo(() => {
    const shadowAngle = (lightAngle + 180) * (Math.PI / 180);
    const x = Math.cos(shadowAngle);
    const y = Math.sin(shadowAngle);
    return { x, y };
  }, [lightAngle]);

  // Dynamic RAISED shadow (elevated elements)
  const getNeuPanelShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    const hlX = -x * distance;  // Highlight opposite to shadow
    const hlY = -y * distance;
    const shX = x * distance;   // Shadow away from light
    const shY = y * distance;
    return `${hlX}px ${hlY}px ${blur}px var(--shadow-light), ${shX}px ${shY}px ${blur}px var(--shadow-dark)`;
  };

  // Dynamic INSET shadow (carved elements)
  const getNeuInsetShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    const shX = x * distance;
    const shY = y * distance;
    return `inset ${shX}px ${shY}px ${blur}px var(--shadow-dark), inset ${-shX}px ${-shY}px ${blur}px var(--shadow-light)`;
  };

  return (
    <div style={{
      boxShadow: getNeuPanelShadow(8, 20),
      transition: 'box-shadow 50ms linear'  // Smooth animation
    }}>
      Content with dynamic shadow
    </div>
  );
}
```

### 3. Shadow Level Presets

| Level | Distance | Blur | Use Case |
|-------|----------|------|----------|
| 1 | 4px | 12px | Badges, small buttons |
| 2 | 8px | 20px | Buttons, small cards |
| 3 | 12px | 30px | Cards, panels (default) |
| 4 | 16px | 40px | Hover states, dropdowns |
| 5 | 20px | 50px | Modals, hero elements |

---

## Provider Props

```tsx
interface LightEngineProviderProps {
  children: ReactNode;
  initialAngle?: number;      // Default: 135 (top-left light)
  initialAnimating?: boolean; // Default: false
  initialSpeed?: number;      // Default: 1 (multiplier)
}
```

---

## Context API

```tsx
interface LightEngineContextValue {
  // State
  lightAngle: number;         // 0-360°
  isAnimating: boolean;
  animationSpeed: number;

  // Actions
  setLightAngle: (angle: number) => void;
  toggleAnimation: () => void;
  startAnimation: () => void;
  stopAnimation: () => void;
  setAnimationSpeed: (speed: number) => void;
  resetLightAngle: () => void;  // Resets to 135°

  // Shadow functions (from useDynamicShadows)
  shadows: DynamicShadowsResult;
}
```

---

## Shadow Calculation Math

```
Light Angle: θ (degrees, 0-360)
Shadow Angle: θ + 180° (opposite direction)

Shadow Offset:
  x = cos(shadowAngle) × distance
  y = sin(shadowAngle) × distance

Highlight Offset (for neumorphism):
  hlX = -x (opposite to shadow)
  hlY = -y
```

---

## CSS Integration

The provider syncs `--light-angle` to the document root:

```css
/* In components, you can use: */
.element {
  /* CSS calc with light angle */
  --shadow-x: calc(cos(var(--light-angle) * 1deg + 180deg) * 8px);
  --shadow-y: calc(sin(var(--light-angle) * 1deg + 180deg) * 8px);
}
```

---

## Future Development TODO

1. **CSS-first approach**: Move calculations to CSS using `sin()` and `cos()` functions
2. **Performance**: Consider using CSS Houdini for paint worklets
3. **Presets**: Create preset shadow tokens that respond to `--light-angle`
4. **Controls**: Add UI controls (slider, orbital animation toggle)
5. **Theme integration**: Integrate with the Stone Marble shadow system
6. **Reduced motion**: Respect `prefers-reduced-motion`

---

## Example: Full Page with Light Engine

```tsx
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';
import { useMemo, type CSSProperties } from 'react';

function PageContent() {
  const { lightAngle } = useLightEngine();

  const shadowOffsets = useMemo(() => {
    const shadowAngle = (lightAngle + 180) * (Math.PI / 180);
    return { x: Math.cos(shadowAngle), y: Math.sin(shadowAngle) };
  }, [lightAngle]);

  const getRaised = (level: 1|2|3|4|5): CSSProperties => {
    const configs = {
      1: { dist: 4, blur: 12 },
      2: { dist: 8, blur: 20 },
      3: { dist: 12, blur: 30 },
      4: { dist: 16, blur: 40 },
      5: { dist: 20, blur: 50 },
    };
    const { dist, blur } = configs[level];
    const { x, y } = shadowOffsets;
    return {
      background: 'var(--marble-base)',
      boxShadow: `${-x*dist}px ${-y*dist}px ${blur}px var(--shadow-light), ${x*dist}px ${y*dist}px ${blur}px var(--shadow-dark)`,
      borderRadius: '16px',
      padding: '24px',
      transition: 'box-shadow 50ms linear',
    };
  };

  return (
    <div style={getRaised(3)}>
      <h1>Dynamic Shadow Card</h1>
      <p>Light angle: {Math.round(lightAngle)}°</p>
    </div>
  );
}

export function MyShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <PageContent />
    </LightEngineProvider>
  );
}
```

---

## Related Files

- `/src/contexts/LightEngineContext.tsx` - Full implementation
- `/src/hooks/useDynamicShadows.ts` - Shadow math and utilities
- `/src/styles/lab/light-engine.css` - CSS variables experiment
- `/src/pages/styles/ShadowsShowcase.tsx` - Section 10 uses Light Engine

---

*Last updated: 2026-02-05*
