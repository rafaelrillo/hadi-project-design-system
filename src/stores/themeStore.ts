// Path: src/stores/themeStore.ts
// FING Material Theming Store

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  MATERIALS,
  DEFAULT_MATERIAL,
  DEFAULT_TEXTURE,
  DEFAULT_TEXTURE_OPACITY,
  type TextureType,
  type MaterialPalette,
} from '@/config/materials';

interface ThemeState {
  // Current selections
  materialId: string;
  texture: TextureType;
  textureOpacity: number;

  // Actions
  setMaterial: (materialId: string) => void;
  setTexture: (texture: TextureType) => void;
  setTextureOpacity: (opacity: number) => void;
  resetToDefaults: () => void;

  // Computed
  getCurrentMaterial: () => MaterialPalette;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      materialId: DEFAULT_MATERIAL,
      texture: DEFAULT_TEXTURE,
      textureOpacity: DEFAULT_TEXTURE_OPACITY,

      setMaterial: (materialId) => {
        const material = MATERIALS[materialId];
        if (material) {
          set({ materialId });
          applyMaterialToDOM(material);
        }
      },

      setTexture: (texture) => {
        set({ texture });
        applyTextureToDOM(texture);
      },

      setTextureOpacity: (opacity) => {
        set({ textureOpacity: opacity });
        document.documentElement.style.setProperty('--texture-opacity', String(opacity));
      },

      resetToDefaults: () => {
        set({
          materialId: DEFAULT_MATERIAL,
          texture: DEFAULT_TEXTURE,
          textureOpacity: DEFAULT_TEXTURE_OPACITY,
        });
        const material = MATERIALS[DEFAULT_MATERIAL];
        applyMaterialToDOM(material);
        applyTextureToDOM(DEFAULT_TEXTURE);
        document.documentElement.style.setProperty('--texture-opacity', String(DEFAULT_TEXTURE_OPACITY));
      },

      getCurrentMaterial: () => MATERIALS[get().materialId] || MATERIALS[DEFAULT_MATERIAL],
    }),
    {
      name: 'fing-theme',
    }
  )
);

// ═══════════════════════════════════════════════════════════════
// DOM APPLICATION FUNCTIONS
// ═══════════════════════════════════════════════════════════════

function applyMaterialToDOM(material: MaterialPalette) {
  const root = document.documentElement;

  // Core marble/stone colors
  root.style.setProperty('--neu-base', material.base);
  root.style.setProperty('--marble-base', material.base);
  root.style.setProperty('--marble-light', material.light);
  root.style.setProperty('--marble-dark', material.dark);
  root.style.setProperty('--marble-deeper', material.deeper);

  // Shadows for neumorphism
  root.style.setProperty('--shadow-light', material.shadowLight);
  root.style.setProperty('--shadow-dark', material.shadowDark);
  root.style.setProperty('--shadow-darker', material.shadowDarker);

  // Also update the background of body/root
  root.style.setProperty('--fing-bg-base', material.base);
}

function applyTextureToDOM(texture: TextureType) {
  const root = document.getElementById('root') || document.body;

  // Remove all texture classes
  root.classList.forEach((className) => {
    if (className.startsWith('fing-texture')) {
      root.classList.remove(className);
    }
  });

  // Add base texture class and specific texture
  root.classList.add('fing-texture');
  root.classList.add(`fing-texture-${texture}`);
}

// ═══════════════════════════════════════════════════════════════
// INITIALIZATION FUNCTION
// ═══════════════════════════════════════════════════════════════

export function initializeTheme() {
  const state = useThemeStore.getState();
  const material = MATERIALS[state.materialId];

  if (material) {
    applyMaterialToDOM(material);
  }
  applyTextureToDOM(state.texture);
  document.documentElement.style.setProperty('--texture-opacity', String(state.textureOpacity));
}
