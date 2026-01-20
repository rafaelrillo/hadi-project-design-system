// Path: src/config/materials.ts
// FING Material Theming System - Material Definitions

export interface MaterialPalette {
  id: string;
  name: string;
  category: 'marble' | 'stone' | 'granite' | 'industrial';
  origin: string;
  base: string;
  light: string;
  dark: string;
  deeper: string;
  shadowLight: string;
  shadowDark: string;
  shadowDarker: string;
  suggestedTexture: TextureType;
}

export type TextureType =
  | 'none'
  | 'noise'
  | 'grain'
  | 'veins'
  | 'speckle'
  | 'concrete'
  | 'sandstone'
  | 'brushed'
  | 'linen'
  | 'paper';

export const MATERIALS: Record<string, MaterialPalette> = {
  // ═══════════════════════════════════════════════════════════════
  // MARBLES
  // ═══════════════════════════════════════════════════════════════
  carrara: {
    id: 'carrara',
    name: 'Carrara',
    category: 'marble',
    origin: 'Italian white marble from Tuscany',
    base: '#e8e6e3',
    light: '#f4f2ef',
    dark: '#d8d6d3',
    deeper: '#c8c6c3',
    shadowLight: 'rgba(255, 255, 255, 0.95)',
    shadowDark: 'rgba(160, 155, 148, 0.5)',
    shadowDarker: 'rgba(140, 135, 128, 0.6)',
    suggestedTexture: 'veins',
  },
  calacatta: {
    id: 'calacatta',
    name: 'Calacatta',
    category: 'marble',
    origin: 'Premium Italian marble with gold veins',
    base: '#f0ede8',
    light: '#f8f5f0',
    dark: '#e0ddd8',
    deeper: '#d0cdc8',
    shadowLight: 'rgba(255, 255, 255, 0.97)',
    shadowDark: 'rgba(165, 158, 145, 0.45)',
    shadowDarker: 'rgba(145, 138, 125, 0.55)',
    suggestedTexture: 'veins',
  },
  emperador: {
    id: 'emperador',
    name: 'Emperador',
    category: 'marble',
    origin: 'Spanish brown marble',
    base: '#c9c0b5',
    light: '#d9d0c5',
    dark: '#b9b0a5',
    deeper: '#a9a095',
    shadowLight: 'rgba(255, 255, 255, 0.85)',
    shadowDark: 'rgba(140, 130, 115, 0.55)',
    shadowDarker: 'rgba(120, 110, 95, 0.65)',
    suggestedTexture: 'veins',
  },
  travertino: {
    id: 'travertino',
    name: 'Travertino',
    category: 'marble',
    origin: 'Italian travertine limestone',
    base: '#e5ddd2',
    light: '#f0e8dd',
    dark: '#d5cdc2',
    deeper: '#c5bdb2',
    shadowLight: 'rgba(255, 255, 255, 0.92)',
    shadowDark: 'rgba(158, 148, 132, 0.5)',
    shadowDarker: 'rgba(138, 128, 112, 0.6)',
    suggestedTexture: 'noise',
  },

  // ═══════════════════════════════════════════════════════════════
  // STONES
  // ═══════════════════════════════════════════════════════════════
  limestone: {
    id: 'limestone',
    name: 'Limestone',
    category: 'stone',
    origin: 'Sedimentary natural stone',
    base: '#e0dcd4',
    light: '#ece8e0',
    dark: '#d0ccc4',
    deeper: '#c0bcb4',
    shadowLight: 'rgba(255, 255, 255, 0.93)',
    shadowDark: 'rgba(155, 148, 135, 0.52)',
    shadowDarker: 'rgba(135, 128, 115, 0.62)',
    suggestedTexture: 'grain',
  },
  sandstone: {
    id: 'sandstone',
    name: 'Sandstone',
    category: 'stone',
    origin: 'Desert sedimentary rock',
    base: '#ddd5c8',
    light: '#e9e1d4',
    dark: '#cdc5b8',
    deeper: '#bdb5a8',
    shadowLight: 'rgba(255, 255, 255, 0.9)',
    shadowDark: 'rgba(160, 150, 135, 0.55)',
    shadowDarker: 'rgba(140, 130, 115, 0.65)',
    suggestedTexture: 'sandstone',
  },
  slate: {
    id: 'slate',
    name: 'Slate',
    category: 'stone',
    origin: 'Fine-grained metamorphic rock',
    base: '#c8ccd2',
    light: '#d6dae0',
    dark: '#b8bcc2',
    deeper: '#a8acb2',
    shadowLight: 'rgba(255, 255, 255, 0.88)',
    shadowDark: 'rgba(135, 145, 160, 0.55)',
    shadowDarker: 'rgba(115, 125, 140, 0.65)',
    suggestedTexture: 'grain',
  },
  quartzite: {
    id: 'quartzite',
    name: 'Quartzite',
    category: 'stone',
    origin: 'Hard metamorphic rock',
    base: '#e2e4e8',
    light: '#eef0f4',
    dark: '#d2d4d8',
    deeper: '#c2c4c8',
    shadowLight: 'rgba(255, 255, 255, 0.96)',
    shadowDark: 'rgba(155, 160, 172, 0.48)',
    shadowDarker: 'rgba(135, 140, 152, 0.58)',
    suggestedTexture: 'speckle',
  },

  // ═══════════════════════════════════════════════════════════════
  // GRANITES
  // ═══════════════════════════════════════════════════════════════
  biancosardo: {
    id: 'biancosardo',
    name: 'Bianco Sardo',
    category: 'granite',
    origin: 'Sardinian white granite',
    base: '#dcdee2',
    light: '#e8eaee',
    dark: '#ccced2',
    deeper: '#bcbec2',
    shadowLight: 'rgba(255, 255, 255, 0.94)',
    shadowDark: 'rgba(150, 155, 165, 0.5)',
    shadowDarker: 'rgba(130, 135, 145, 0.6)',
    suggestedTexture: 'speckle',
  },
  rosaporrino: {
    id: 'rosaporrino',
    name: 'Rosa Porriño',
    category: 'granite',
    origin: 'Spanish pink granite',
    base: '#e0d8d6',
    light: '#ece4e2',
    dark: '#d0c8c6',
    deeper: '#c0b8b6',
    shadowLight: 'rgba(255, 255, 255, 0.92)',
    shadowDark: 'rgba(158, 148, 145, 0.52)',
    shadowDarker: 'rgba(138, 128, 125, 0.62)',
    suggestedTexture: 'speckle',
  },
  grigioperla: {
    id: 'grigioperla',
    name: 'Grigio Perla',
    category: 'granite',
    origin: 'Italian pearl gray granite',
    base: '#d4d6da',
    light: '#e2e4e8',
    dark: '#c4c6ca',
    deeper: '#b4b6ba',
    shadowLight: 'rgba(255, 255, 255, 0.92)',
    shadowDark: 'rgba(148, 152, 162, 0.52)',
    shadowDarker: 'rgba(128, 132, 142, 0.62)',
    suggestedTexture: 'speckle',
  },

  // ═══════════════════════════════════════════════════════════════
  // INDUSTRIAL
  // ═══════════════════════════════════════════════════════════════
  concrete: {
    id: 'concrete',
    name: 'Concrete',
    category: 'industrial',
    origin: 'Modern industrial cement',
    base: '#d0d2d6',
    light: '#dcdee2',
    dark: '#c0c2c6',
    deeper: '#b0b2b6',
    shadowLight: 'rgba(255, 255, 255, 0.88)',
    shadowDark: 'rgba(145, 150, 160, 0.55)',
    shadowDarker: 'rgba(125, 130, 140, 0.65)',
    suggestedTexture: 'concrete',
  },
  brushedsteel: {
    id: 'brushedsteel',
    name: 'Brushed Steel',
    category: 'industrial',
    origin: 'Industrial brushed metal',
    base: '#d8dce2',
    light: '#e4e8ee',
    dark: '#c8ccd2',
    deeper: '#b8bcc2',
    shadowLight: 'rgba(255, 255, 255, 0.92)',
    shadowDark: 'rgba(148, 158, 175, 0.5)',
    shadowDarker: 'rgba(128, 138, 155, 0.6)',
    suggestedTexture: 'brushed',
  },
  clay: {
    id: 'clay',
    name: 'Clay',
    category: 'industrial',
    origin: 'Natural fired terracotta',
    base: '#d8d0c6',
    light: '#e4dcd2',
    dark: '#c8c0b6',
    deeper: '#b8b0a6',
    shadowLight: 'rgba(255, 255, 255, 0.88)',
    shadowDark: 'rgba(155, 145, 130, 0.55)',
    shadowDarker: 'rgba(135, 125, 110, 0.65)',
    suggestedTexture: 'grain',
  },

  // ═══════════════════════════════════════════════════════════════
  // FING DEFAULT (current)
  // ═══════════════════════════════════════════════════════════════
  stone: {
    id: 'stone',
    name: 'Stone',
    category: 'stone',
    origin: 'FING default — neutral balanced gray',
    base: '#d5d8dc',
    light: '#e2e5e9',
    dark: '#c8ccd1',
    deeper: '#b8bcc2',
    shadowLight: 'rgba(255, 255, 255, 0.95)',
    shadowDark: 'rgba(147, 157, 170, 0.55)',
    shadowDarker: 'rgba(130, 140, 155, 0.65)',
    suggestedTexture: 'noise',
  },
};

export const MATERIAL_CATEGORIES = [
  { id: 'marble', label: 'Mármoles', icon: '◆' },
  { id: 'stone', label: 'Piedras', icon: '◇' },
  { id: 'granite', label: 'Granitos', icon: '●' },
  { id: 'industrial', label: 'Industrial', icon: '■' },
] as const;

export const TEXTURES: { id: TextureType; label: string }[] = [
  { id: 'none', label: 'Sin textura' },
  { id: 'noise', label: 'Noise' },
  { id: 'grain', label: 'Grain' },
  { id: 'veins', label: 'Veins' },
  { id: 'speckle', label: 'Speckle' },
  { id: 'concrete', label: 'Concrete' },
  { id: 'sandstone', label: 'Sandstone' },
  { id: 'brushed', label: 'Brushed' },
  { id: 'linen', label: 'Linen' },
  { id: 'paper', label: 'Paper' },
];

export const DEFAULT_MATERIAL = 'stone';
export const DEFAULT_TEXTURE: TextureType = 'noise';
export const DEFAULT_TEXTURE_OPACITY = 0.03;
