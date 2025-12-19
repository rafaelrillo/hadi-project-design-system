// src/components/terminal/glitchPresets.ts
// Preset configurations for GlitchText component

export const criticalErrorGlitch = {
  intensity: 'extreme' as const,
  playMode: 'manual' as const,
  hueRotate: true,
  cssFilters: 'brightness(1.2) contrast(1.3)'
};

export const subtleAmbientGlitch = {
  intensity: 'subtle' as const,
  playMode: 'always' as const,
  hueRotate: false
};

export const hoverInteractiveGlitch = {
  intensity: 'medium' as const,
  playMode: 'hover' as const,
  hueRotate: false
};

export const warningGlitch = {
  intensity: 'high' as const,
  playMode: 'always' as const,
  hueRotate: true
};

export const hackingEffectGlitch = {
  intensity: 'high' as const,
  playMode: 'always' as const,
  hueRotate: true,
  cssFilters: 'blur(0.5px) brightness(1.1)'
};

export const corruptedDataGlitch = {
  intensity: 'extreme' as const,
  playMode: 'always' as const,
  hueRotate: true,
  cssFilters: 'contrast(1.5) saturate(1.2)'
};

export const minimalGlitch = {
  intensity: 'low' as const,
  playMode: 'always' as const,
  hueRotate: false
};

export const buttonHoverGlitch = {
  intensity: 'low' as const,
  playMode: 'hover' as const,
  hueRotate: false
};
