# Plan de Implementación: Terminal Theme
## Versión Específica para tu Proyecto

---

## Resumen del Proyecto Actual

| Aspecto | Estado | Acción |
|---------|--------|--------|
| Variables CSS | `:root` en `globals.css` | Extraer a `theme.css` |
| CSS Modules | ✅ Patrón `getClassName()` | Mantener patrón |
| Fuente | Open Sans | Cambiar a JetBrains Mono |
| Charts | No existen | Crear con Nivo |
| Animaciones | Solo CSS transitions | Agregar Framer Motion |
| Aliases Vite | ✅ Configurados | Usar `@styles`, `@components` |

---

## Fase 0: Preparación (30 min)

### 0.1 Instalar dependencias

```bash
# Gráficos
npm install @nivo/core @nivo/line @nivo/bar @nivo/pie

# Animaciones
npm install framer-motion react-type-animation react-powerglitch

# Opcional: Para ASCII art real en gráficos
npm install asciichart
```

### 0.2 Estructura de carpetas a crear

```bash
# Crear carpetas nuevas
mkdir -p src/styles/effects
mkdir -p src/styles/typography
mkdir -p src/components/terminal
mkdir -p src/components/charts
mkdir -p src/components/effects
mkdir -p src/hooks
mkdir -p src/layouts/DashboardLayout
mkdir -p src/layouts/LandingLayout
mkdir -p src/pages/Landing
mkdir -p src/pages/Dashboard
```

Estructura final:
```
src/
├── styles/
│   ├── globals.css              # ✏️ MODIFICAR (quitar variables)
│   ├── theme.css                # ⭐ CREAR
│   ├── effects/
│   │   ├── crt.module.css       # ⭐ CREAR
│   │   └── glow.module.css      # ⭐ CREAR
│   └── typography/
│       └── terminal.css         # ⭐ CREAR
│
├── components/
│   ├── atoms/
│   │   ├── Button/              # ✏️ MODIFICAR estilos
│   │   ├── Input/               # ✏️ MODIFICAR estilos
│   │   ├── Badge/               # ✏️ MODIFICAR estilos
│   │   └── ...
│   │
│   ├── terminal/                # ⭐ CREAR (nuevos componentes)
│   │   ├── TerminalWindow/
│   │   ├── AsciiBox/
│   │   ├── TypewriterText/
│   │   ├── GlitchText/
│   │   └── CommandPrompt/
│   │
│   ├── charts/                  # ⭐ CREAR
│   │   ├── LineChart/
│   │   ├── BarChart/
│   │   ├── StatCard/
│   │   └── theme.ts
│   │
│   └── effects/                 # ⭐ CREAR
│       ├── CRTEffect/
│       └── ScanlineOverlay/
│
├── hooks/                       # ⭐ CREAR
│   ├── useTypewriter.ts
│   └── useGlitch.ts
│
├── layouts/
│   ├── ShowcaseLayout/          # Ya existe (docs)
│   ├── DashboardLayout/         # ⭐ CREAR
│   └── LandingLayout/           # ⭐ CREAR
│
└── pages/
    ├── Landing/                 # ⭐ CREAR
    └── Dashboard/               # ⭐ CREAR
```

---

## Fase 1: Sistema de Estilos (1-2 horas)

### 1.1 Crear `src/styles/theme.css`

```css
/* src/styles/theme.css */
/* ============================================
   TERMINAL THEME - ASCII/Hacker Aesthetic
   ============================================
   
   📌 Para cambiar de tema, solo modifica este archivo.
   Los componentes consumen estas variables automáticamente.
   
   ============================================ */

:root {
  /* ==========================================
     🎨 COLORES PRIMARIOS - TERMINAL
     ==========================================
     Reemplazan: --primary, --primary-dark, --accent
  */
  --primary: #FF6600;
  --primary-dark: #CC5200;
  --primary-light: #FF983F;
  --accent: rgba(255, 102, 0, 0.15);
  --accent-glow: rgba(255, 102, 0, 0.5);


  /* ==========================================
     ⬛ COLORES BASE - DARK MODE
     ==========================================
     Reemplazan: --background, --foreground, --secondary
  */
  --background: #000000;
  --background-secondary: #0a0a0a;
  --background-tertiary: #111111;
  --foreground: #FFFFFF;
  --foreground-muted: #888888;
  --foreground-subtle: #555555;
  --secondary: #0a0a0a;


  /* ==========================================
     🔲 BORDES Y LÍNEAS
     ==========================================
     Reemplazan: --border, --muted
  */
  --border: #333333;
  --border-focus: var(--primary);
  --border-hover: #555555;
  --muted: #333333;
  --grid-line: #1a1a1a;


  /* ==========================================
     ✅ COLORES DE ESTADO
     ==========================================
     Reemplazan: --success, --warning, --destructive
  */
  --success: #00FF41;
  --success-light: rgba(0, 255, 65, 0.15);
  --success-glow: rgba(0, 255, 65, 0.5);
  
  --warning: #FFB800;
  --warning-light: rgba(255, 184, 0, 0.15);
  --warning-glow: rgba(255, 184, 0, 0.5);
  
  --destructive: #FF3333;
  --destructive-dark: #CC0000;
  --destructive-light: rgba(255, 51, 51, 0.15);
  --destructive-glow: rgba(255, 51, 51, 0.5);
  
  --info: #00BFFF;
  --info-glow: rgba(0, 191, 255, 0.5);


  /* ==========================================
     🏢 COLORES DE MARCA
     ==========================================
  */
  --brand-red: #FF6600;


  /* ==========================================
     ⬜ ESCALA DE GRISES (compatibilidad)
     ==========================================
  */
  --color-white: #FFFFFF;
  --color-black: #000000;
  --color-gray-5: #111111;
  --color-gray-4: #1a1a1a;
  --color-gray-3: #333333;
  --color-gray-2: #888888;
  --color-gray-1: #FFFFFF;


  /* ==========================================
     🔤 TIPOGRAFÍA
     ==========================================
  */
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  --font-display: var(--font-mono);
  
  /* Tamaños (mantener nombres existentes) */
  --text-siglas: 24px;
  --text-titulo-1: 18px;
  --text-titulo-2: 16px;
  --text-cuerpo-1: 14px;
  --text-cuerpo-2: 12px;
  
  /* Extras para terminal */
  --text-xs: 10px;
  --text-sm: 12px;
  --text-base: 14px;
  --text-lg: 16px;
  --text-xl: 18px;
  --text-2xl: 24px;
  --text-3xl: 32px;
  --text-4xl: 48px;

  /* Pesos */
  --font-weight-bold: 700;
  --font-weight-semibold: 600;
  --font-weight-medium: 500;
  --font-weight-normal: 400;

  /* Line height */
  --line-height-default: 1.2;
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;


  /* ==========================================
     📏 ESPACIADO
     ==========================================
     Mantener nombres existentes
  */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  --spacing-3xl: 64px;

  --content-padding: 24px;
  --gap-elements: 16px;
  --container-padding: 20px;


  /* ==========================================
     ⭕ BORDER RADIUS
     ==========================================
     Más angulares para estética terminal
  */
  --radius: 2px;
  --radius-card: 4px;
  --radius-none: 0px;
  --radius-sm: 2px;


  /* ==========================================
     🌫️ SOMBRAS / GLOW
     ==========================================
  */
  --elevation-sm: 0 0 10px rgba(255, 102, 0, 0.1);
  --elevation-md: 0 0 20px rgba(255, 102, 0, 0.15);
  --elevation-lg: 0 0 30px rgba(255, 102, 0, 0.2);
  
  --shadow-sm: var(--elevation-sm);
  --shadow-md: var(--elevation-md);
  --shadow-lg: var(--elevation-lg);
  
  --shadow-glow-sm: 0 0 10px var(--accent-glow);
  --shadow-glow-md: 0 0 20px var(--accent-glow);
  --shadow-glow-lg: 0 0 30px var(--accent-glow);
  
  --shadow-inset: inset 0 0 20px rgba(0, 0, 0, 0.5);
  --shadow-card: 0 4px 20px rgba(0, 0, 0, 0.5);


  /* ==========================================
     🎯 ICONOGRAFÍA
     ==========================================
  */
  --icon-size-lg: 32px;
  --icon-size-md: 24px;
  --icon-size-sm: 20px;
  --icon-size-xs: 16px;


  /* ==========================================
     📐 GRID
     ==========================================
  */
  --grid-columns: 24;
  --grid-gap: 20px;


  /* ==========================================
     ⚡ TRANSICIONES
     ==========================================
  */
  --transition-fast: 100ms ease;
  --transition-normal: 200ms ease;
  --transition-slow: 300ms ease;


  /* ==========================================
     📺 EFECTOS CRT
     ==========================================
  */
  --crt-scanline-opacity: 0.1;
  --crt-flicker-intensity: 0.03;
  --crt-glow-spread: 2px;
}
```

### 1.2 Crear `src/styles/typography/terminal.css`

```css
/* src/styles/typography/terminal.css */

/* Import JetBrains Mono */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');

/* Override base typography */
body {
  font-family: var(--font-mono);
  font-size: var(--text-cuerpo-1);
  line-height: var(--line-height-normal);
  color: var(--foreground);
  background-color: var(--background);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Enable ligatures for code */
code, pre, .mono {
  font-family: var(--font-mono);
  font-feature-settings: "liga" 1, "calt" 1;
}

/* Terminal-style headings */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-mono);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Selection */
::selection {
  background-color: var(--primary);
  color: var(--background);
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--background-secondary);
}

::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: var(--radius-sm);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--border-hover);
}

/* Links */
a {
  color: var(--primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--primary-light);
  text-shadow: 0 0 10px var(--accent-glow);
}
```

### 1.3 Modificar `src/styles/globals.css`

**ANTES** (tu archivo actual tiene las variables en `:root`)

**DESPUÉS** (quitar variables, dejar solo reset y base):

```css
/* src/styles/globals.css */
/* ============================================
   GLOBAL STYLES - Reset y Base
   ============================================
   
   ⚠️ Las variables de tema están en theme.css
   Este archivo solo contiene reset y estilos base.
   
   ============================================ */

/* Reset básico */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
  text-rendering: optimizeLegibility;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

button {
  cursor: pointer;
  border: none;
  background: none;
}

ul, ol {
  list-style: none;
}

a {
  text-decoration: none;
  color: inherit;
}

/* Utility classes */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### 1.4 Actualizar `src/main.tsx`

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Estilos en orden correcto
import './styles/globals.css';              // Reset y base
import './styles/typography/terminal.css';  // Fuentes terminal
import './styles/theme.css';                // Variables del tema

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## Fase 2: Efectos CSS (30 min)

### 2.1 Crear `src/styles/effects/crt.module.css`

```css
/* src/styles/effects/crt.module.css */

.crtContainer {
  position: relative;
  overflow: hidden;
}

/* Scanlines */
.scanlines::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
  z-index: 10;
}

/* RGB separation */
.rgbSeparation::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 0, 0, 0.03),
    rgba(0, 255, 0, 0.02),
    rgba(0, 0, 255, 0.03)
  );
  background-size: 3px 100%;
  pointer-events: none;
  z-index: 11;
}

/* Flicker */
.flicker {
  animation: flicker 0.15s infinite;
}

@keyframes flicker {
  0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
    opacity: 1;
  }
  20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
    opacity: 0.97;
  }
}

/* Screen glow */
.screenGlow {
  box-shadow: 
    inset 0 0 60px rgba(0, 0, 0, 0.5),
    0 0 40px var(--accent-glow);
}

/* Vignette */
.vignette::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    transparent 60%,
    rgba(0, 0, 0, 0.4) 100%
  );
  pointer-events: none;
  z-index: 9;
}

/* Combined */
.crtFull {
  composes: crtContainer;
  composes: scanlines;
  composes: rgbSeparation;
  composes: screenGlow;
  composes: vignette;
}

@media (prefers-reduced-motion: reduce) {
  .flicker {
    animation: none;
  }
}
```

### 2.2 Crear `src/styles/effects/glow.module.css`

```css
/* src/styles/effects/glow.module.css */

/* Text glows */
.glowPrimary {
  text-shadow:
    0 0 5px var(--primary),
    0 0 10px var(--primary),
    0 0 20px var(--accent-glow);
}

.glowSuccess {
  text-shadow:
    0 0 5px var(--success),
    0 0 10px var(--success),
    0 0 20px var(--success-glow);
}

.glowInfo {
  text-shadow:
    0 0 5px var(--info),
    0 0 10px var(--info),
    0 0 20px var(--info-glow);
}

.glowDestructive {
  text-shadow:
    0 0 5px var(--destructive),
    0 0 10px var(--destructive),
    0 0 20px var(--destructive-glow);
}

/* Box glow */
.boxGlow {
  box-shadow: 
    0 0 5px var(--primary),
    0 0 10px var(--accent-glow),
    inset 0 0 5px var(--accent-glow);
}

/* Pulse animation */
.glowPulse {
  animation: glowPulse 2s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% {
    box-shadow: 0 0 5px var(--primary), 0 0 10px var(--accent-glow);
  }
  50% {
    box-shadow: 0 0 15px var(--primary), 0 0 30px var(--accent-glow);
  }
}

/* Hover glow */
.hoverGlow {
  transition: box-shadow var(--transition-normal), 
              text-shadow var(--transition-normal);
}

.hoverGlow:hover {
  box-shadow: 0 0 15px var(--accent-glow);
}
```

---

## Fase 3: Actualizar Componentes Existentes (2-3 horas)

### 3.1 Actualizar `Button.module.css`

**Archivo**: `src/components/atoms/Button/Button.module.css`

```css
/* src/components/atoms/Button/Button.module.css */
/* Terminal Theme Version */

.button {
  font-family: var(--font-mono);
  font-size: var(--text-cuerpo-1);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 8px var(--spacing-lg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background-color: transparent;
  color: var(--foreground);
  cursor: pointer;
  transition: all var(--transition-fast);
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
}

.button:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.button:hover:not(:disabled) {
  border-color: var(--primary);
  color: var(--primary);
  box-shadow: var(--shadow-glow-sm);
}

.button:active:not(:disabled) {
  transform: scale(0.98);
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Primary */
.primary {
  background-color: var(--primary);
  border-color: var(--primary);
  color: var(--background);
}

.primary:hover:not(:disabled) {
  background-color: var(--primary-dark);
  border-color: var(--primary-dark);
  color: var(--background);
  box-shadow: var(--shadow-glow-md);
}

/* Secondary */
.secondary {
  background-color: transparent;
  border-color: var(--foreground);
  color: var(--foreground);
}

.secondary:hover:not(:disabled) {
  background-color: var(--foreground);
  color: var(--background);
}

/* Ghost */
.ghost {
  border-color: transparent;
  background-color: transparent;
}

.ghost:hover:not(:disabled) {
  border-color: var(--border);
  background-color: var(--background-tertiary);
}

/* Destructive */
.destructive {
  border-color: var(--destructive);
  color: var(--destructive);
  background-color: transparent;
}

.destructive:hover:not(:disabled) {
  background-color: var(--destructive);
  color: var(--background);
  box-shadow: 0 0 15px var(--destructive-glow);
}

/* Sizes */
.sm {
  font-size: var(--text-cuerpo-2);
  padding: 4px var(--spacing-md);
}

.md {
  font-size: var(--text-cuerpo-1);
  padding: 8px var(--spacing-lg);
}

.lg {
  font-size: var(--text-titulo-2);
  padding: 12px var(--spacing-xl);
}

/* Full width */
.fullWidth {
  width: 100%;
}

/* Icon only */
.iconOnly {
  padding: 8px;
  aspect-ratio: 1;
}

.iconOnly.sm {
  padding: 4px;
}

.iconOnly.lg {
  padding: 12px;
}
```

### 3.2 Actualizar `InputText.module.css`

**Archivo**: `src/components/atoms/Input/InputText.module.css`

```css
/* src/components/atoms/Input/InputText.module.css */
/* Terminal Theme Version */

.inputWrapper {
  position: relative;
  width: 100%;
}

.input {
  width: 100%;
  font-family: var(--font-mono);
  font-size: var(--text-cuerpo-1);
  padding: 10px var(--spacing-md);
  background-color: var(--background-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--foreground);
  transition: all var(--transition-fast);
}

.input::placeholder {
  color: var(--foreground-subtle);
}

.input:hover:not(:disabled) {
  border-color: var(--border-hover);
}

.input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: var(--shadow-glow-sm);
}

.input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: var(--background-tertiary);
}

/* Error state */
.error {
  border-color: var(--destructive);
}

.error:focus {
  border-color: var(--destructive);
  box-shadow: 0 0 10px var(--destructive-glow);
}

/* Success state */
.success {
  border-color: var(--success);
}

.success:focus {
  border-color: var(--success);
  box-shadow: 0 0 10px var(--success-glow);
}

/* With icon */
.withIcon {
  padding-left: 40px;
}

.icon {
  position: absolute;
  left: var(--spacing-md);
  top: 50%;
  transform: translateY(-50%);
  color: var(--foreground-muted);
  pointer-events: none;
}

/* Sizes */
.sm {
  font-size: var(--text-cuerpo-2);
  padding: 6px var(--spacing-sm);
}

.lg {
  font-size: var(--text-titulo-2);
  padding: 14px var(--spacing-lg);
}
```

### 3.3 Actualizar `Card.module.css`

**Archivo**: `src/components/molecules/Card/Card.module.css`

```css
/* src/components/molecules/Card/Card.module.css */
/* Terminal Theme Version */

.card {
  background-color: var(--background-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  overflow: hidden;
  transition: all var(--transition-fast);
}

.card:hover {
  border-color: var(--border-hover);
}

/* Interactive */
.interactive:hover {
  border-color: var(--primary);
  box-shadow: var(--shadow-glow-sm);
  cursor: pointer;
}

/* Header */
.header {
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--border);
  background-color: var(--background-tertiary);
}

.title {
  font-family: var(--font-mono);
  font-size: var(--text-titulo-2);
  font-weight: var(--font-weight-semibold);
  color: var(--foreground);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.subtitle {
  font-size: var(--text-cuerpo-2);
  color: var(--foreground-muted);
  margin-top: var(--spacing-xs);
}

/* Content */
.content {
  padding: var(--spacing-lg);
}

/* Footer */
.footer {
  padding: var(--spacing-md) var(--spacing-lg);
  border-top: 1px solid var(--border);
  background-color: var(--background-tertiary);
}

/* Variants */
.outlined {
  background-color: transparent;
}

.elevated {
  box-shadow: var(--shadow-card);
}

.highlighted {
  border-color: var(--primary);
  box-shadow: var(--shadow-glow-sm);
}

/* Status indicators */
.status {
  position: relative;
}

.status::before {
  content: "";
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--success);
  box-shadow: 0 0 10px var(--success-glow);
}

.status.warning::before {
  background-color: var(--warning);
  box-shadow: 0 0 10px var(--warning-glow);
}

.status.error::before {
  background-color: var(--destructive);
  box-shadow: 0 0 10px var(--destructive-glow);
}
```

### 3.4 Actualizar `Table.module.css`

**Archivo**: `src/components/organisms/Table/Table.module.css`

```css
/* src/components/organisms/Table/Table.module.css */
/* Terminal Theme Version */

.tableWrapper {
  width: 100%;
  overflow-x: auto;
  background-color: var(--background-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-mono);
  font-size: var(--text-cuerpo-1);
}

/* Header */
.thead {
  background-color: var(--background-tertiary);
  border-bottom: 1px solid var(--border);
}

.th {
  padding: var(--spacing-md) var(--spacing-lg);
  text-align: left;
  font-weight: var(--font-weight-semibold);
  font-size: var(--text-cuerpo-2);
  color: var(--foreground-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  white-space: nowrap;
}

.th.sortable {
  cursor: pointer;
  user-select: none;
}

.th.sortable:hover {
  color: var(--primary);
}

.th.sorted {
  color: var(--primary);
}

/* Body */
.tbody tr {
  border-bottom: 1px solid var(--border);
  transition: background-color var(--transition-fast);
}

.tbody tr:last-child {
  border-bottom: none;
}

.tbody tr:hover {
  background-color: var(--background-tertiary);
}

.tbody tr.selected {
  background-color: var(--accent);
  border-color: var(--primary);
}

.td {
  padding: var(--spacing-md) var(--spacing-lg);
  color: var(--foreground);
  vertical-align: middle;
}

/* Striped */
.striped .tbody tr:nth-child(even) {
  background-color: var(--background-tertiary);
}

/* Compact */
.compact .th,
.compact .td {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--text-cuerpo-2);
}

/* Empty state */
.empty {
  padding: var(--spacing-2xl);
  text-align: center;
  color: var(--foreground-muted);
}

.emptyIcon {
  margin-bottom: var(--spacing-md);
  color: var(--foreground-subtle);
}

/* Loading */
.loading {
  position: relative;
  min-height: 200px;
}

.loadingOverlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
}

/* Checkbox column */
.checkboxCell {
  width: 40px;
  text-align: center;
}

/* Actions column */
.actionsCell {
  width: 100px;
  text-align: right;
}
```

### 3.5 Actualizar `Badge.module.css`

**Archivo**: `src/components/atoms/Badge/Badge.module.css`

```css
/* src/components/atoms/Badge/Badge.module.css */
/* Terminal Theme Version */

.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-family: var(--font-mono);
  font-size: var(--text-cuerpo-2);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 2px 8px;
  border-radius: var(--radius);
  border: 1px solid transparent;
}

/* Variants */
.default {
  background-color: var(--background-tertiary);
  border-color: var(--border);
  color: var(--foreground);
}

.primary {
  background-color: var(--accent);
  border-color: var(--primary);
  color: var(--primary);
}

.success {
  background-color: var(--success-light);
  border-color: var(--success);
  color: var(--success);
}

.warning {
  background-color: var(--warning-light);
  border-color: var(--warning);
  color: var(--warning);
}

.destructive {
  background-color: var(--destructive-light);
  border-color: var(--destructive);
  color: var(--destructive);
}

.info {
  background-color: rgba(0, 191, 255, 0.15);
  border-color: var(--info);
  color: var(--info);
}

/* Outlined variant */
.outlined {
  background-color: transparent;
}

/* With dot indicator */
.withDot::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: currentColor;
  box-shadow: 0 0 6px currentColor;
}

/* Sizes */
.sm {
  font-size: var(--text-xs);
  padding: 1px 6px;
}

.lg {
  font-size: var(--text-cuerpo-1);
  padding: 4px 12px;
}
```

---

## Fase 4: Componentes Terminal Nuevos (2-3 horas)

### 4.1 Crear `TerminalWindow`

**Crear carpeta**: `src/components/terminal/TerminalWindow/`

```tsx
// src/components/terminal/TerminalWindow/TerminalWindow.tsx
import { ReactNode } from 'react';
import styles from './TerminalWindow.module.css';

export interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
  showControls?: boolean;
}

export function TerminalWindow({ 
  title = 'terminal', 
  children,
  className = '',
  showControls = true
}: TerminalWindowProps) {
  const getClassName = (): string => {
    const classes = [styles.window];
    if (className) classes.push(className);
    return classes.join(' ');
  };

  return (
    <div className={getClassName()}>
      <div className={styles.header}>
        {showControls && (
          <div className={styles.controls}>
            <span className={styles.dot} data-color="red" />
            <span className={styles.dot} data-color="yellow" />
            <span className={styles.dot} data-color="green" />
          </div>
        )}
        <span className={styles.title}>{title}</span>
        <div className={styles.spacer} />
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
```

```css
/* src/components/terminal/TerminalWindow/TerminalWindow.module.css */

.window {
  background-color: var(--background-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  overflow: hidden;
  box-shadow: var(--shadow-card);
}

.header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--background-tertiary);
  border-bottom: 1px solid var(--border);
}

.controls {
  display: flex;
  gap: 6px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--border);
}

.dot[data-color="red"] {
  background-color: #ff5f56;
}

.dot[data-color="yellow"] {
  background-color: #ffbd2e;
}

.dot[data-color="green"] {
  background-color: #27ca40;
}

.title {
  font-family: var(--font-mono);
  font-size: var(--text-cuerpo-2);
  color: var(--foreground-muted);
  flex: 1;
  text-align: center;
}

.spacer {
  width: 52px;
}

.content {
  padding: var(--spacing-md);
  min-height: 100px;
}
```

```ts
// src/components/terminal/TerminalWindow/index.ts
export { TerminalWindow } from './TerminalWindow';
export type { TerminalWindowProps } from './TerminalWindow';
```

### 4.2 Crear `AsciiBox`

**Crear carpeta**: `src/components/terminal/AsciiBox/`

```tsx
// src/components/terminal/AsciiBox/AsciiBox.tsx
import { ReactNode } from 'react';
import styles from './AsciiBox.module.css';

export interface AsciiBoxProps {
  title?: string;
  children: ReactNode;
  variant?: 'single' | 'double' | 'rounded';
  className?: string;
}

export function AsciiBox({ 
  title, 
  children, 
  variant = 'single',
  className = '' 
}: AsciiBoxProps) {
  const getClassName = (): string => {
    const classes = [styles.box, styles[variant]];
    if (className) classes.push(className);
    return classes.join(' ');
  };

  const chars = {
    single: { tl: '┌', tr: '┐', bl: '└', br: '┘', h: '─', v: '│' },
    double: { tl: '╔', tr: '╗', bl: '╚', br: '╝', h: '═', v: '║' },
    rounded: { tl: '╭', tr: '╮', bl: '╰', br: '╯', h: '─', v: '│' }
  };

  const c = chars[variant];

  return (
    <div className={getClassName()}>
      <div className={styles.borderTop}>
        <span>{c.tl}</span>
        {title && <span className={styles.title}> {title} </span>}
        <span className={styles.line}></span>
        <span>{c.tr}</span>
      </div>
      <div className={styles.middle}>
        <span className={styles.borderLeft}>{c.v}</span>
        <div className={styles.content}>{children}</div>
        <span className={styles.borderRight}>{c.v}</span>
      </div>
      <div className={styles.borderBottom}>
        <span>{c.bl}</span>
        <span className={styles.line}></span>
        <span>{c.br}</span>
      </div>
    </div>
  );
}
```

```css
/* src/components/terminal/AsciiBox/AsciiBox.module.css */

.box {
  font-family: var(--font-mono);
  color: var(--primary);
  display: inline-block;
  line-height: 1;
}

.borderTop,
.borderBottom {
  display: flex;
  white-space: nowrap;
}

.line {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.single .line::before {
  content: "────────────────────────────────────────────────────────────────────────────────────────────────────";
  position: absolute;
}

.double .line::before {
  content: "════════════════════════════════════════════════════════════════════════════════════════════════════";
  position: absolute;
}

.rounded .line::before {
  content: "────────────────────────────────────────────────────────────────────────────────────────────────────";
  position: absolute;
}

.title {
  color: var(--foreground);
  white-space: nowrap;
}

.middle {
  display: flex;
}

.borderLeft,
.borderRight {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
}

.borderLeft::before,
.borderRight::before {
  content: "";
  flex: 1;
}

.content {
  flex: 1;
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--foreground);
  line-height: var(--line-height-normal);
}
```

```ts
// src/components/terminal/AsciiBox/index.ts
export { AsciiBox } from './AsciiBox';
export type { AsciiBoxProps } from './AsciiBox';
```

### 4.3 Crear `TypewriterText`

**Crear carpeta**: `src/components/terminal/TypewriterText/`

```tsx
// src/components/terminal/TypewriterText/TypewriterText.tsx
import { TypeAnimation } from 'react-type-animation';
import styles from './TypewriterText.module.css';

export interface TypewriterTextProps {
  sequence: (string | number)[];
  speed?: number;
  cursor?: boolean;
  repeat?: number;
  className?: string;
  wrapper?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3';
}

export function TypewriterText({
  sequence,
  speed = 50,
  cursor = true,
  repeat = 0,
  className = '',
  wrapper = 'span'
}: TypewriterTextProps) {
  const getClassName = (): string => {
    const classes = [styles.typewriter];
    if (className) classes.push(className);
    return classes.join(' ');
  };

  return (
    <TypeAnimation
      sequence={sequence}
      speed={speed}
      cursor={cursor}
      repeat={repeat}
      wrapper={wrapper}
      className={getClassName()}
    />
  );
}
```

```css
/* src/components/terminal/TypewriterText/TypewriterText.module.css */

.typewriter {
  font-family: var(--font-mono);
  color: var(--success);
  display: inline-block;
}

/* Custom cursor */
.typewriter::after {
  content: "█";
  animation: blink 1s step-end infinite;
  color: var(--primary);
  margin-left: 2px;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
```

```ts
// src/components/terminal/TypewriterText/index.ts
export { TypewriterText } from './TypewriterText';
export type { TypewriterTextProps } from './TypewriterText';
```

### 4.4 Crear `GlitchText`

**Crear carpeta**: `src/components/terminal/GlitchText/`

```tsx
// src/components/terminal/GlitchText/GlitchText.tsx
import { useGlitch } from 'react-powerglitch';
import styles from './GlitchText.module.css';

export interface GlitchTextProps {
  children: string;
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p';
}

export function GlitchText({ 
  children, 
  intensity = 'medium',
  className = '',
  as: Component = 'span'
}: GlitchTextProps) {
  const intensityConfig = {
    low: { 
      glitchTimeSpan: { start: 0.7, end: 0.8 }, 
      shake: { velocity: 5, amplitudeX: 0.1, amplitudeY: 0.1 } 
    },
    medium: { 
      glitchTimeSpan: { start: 0.5, end: 0.7 }, 
      shake: { velocity: 15, amplitudeX: 0.2, amplitudeY: 0.1 } 
    },
    high: { 
      glitchTimeSpan: { start: 0.3, end: 0.8 }, 
      shake: { velocity: 25, amplitudeX: 0.3, amplitudeY: 0.2 } 
    }
  };

  const glitch = useGlitch({
    ...intensityConfig[intensity],
    slice: { count: 6, velocity: 15, minHeight: 0.02, maxHeight: 0.15 },
    timing: { duration: 2000, iterations: Infinity }
  });

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
}
```

```css
/* src/components/terminal/GlitchText/GlitchText.module.css */

.glitch {
  font-family: var(--font-mono);
  display: inline-block;
  position: relative;
}
```

```ts
// src/components/terminal/GlitchText/index.ts
export { GlitchText } from './GlitchText';
export type { GlitchTextProps } from './GlitchText';
```

### 4.5 Crear index general de terminal

```ts
// src/components/terminal/index.ts
export * from './TerminalWindow';
export * from './AsciiBox';
export * from './TypewriterText';
export * from './GlitchText';
```

---

## Fase 5: Sistema de Gráficos (2 horas)

### 5.1 Crear tema de Nivo

**Crear carpeta**: `src/components/charts/`

```ts
// src/components/charts/theme.ts
import { Theme } from '@nivo/core';

export const terminalChartTheme: Theme = {
  background: 'transparent',
  text: {
    fontSize: 12,
    fill: 'var(--foreground-muted)',
    fontFamily: 'var(--font-mono)',
  },
  axis: {
    domain: {
      line: {
        stroke: 'var(--border)',
        strokeWidth: 1,
      },
    },
    ticks: {
      line: {
        stroke: 'var(--border)',
        strokeWidth: 1,
      },
      text: {
        fill: 'var(--foreground-muted)',
        fontSize: 10,
        fontFamily: 'var(--font-mono)',
      },
    },
    legend: {
      text: {
        fill: 'var(--foreground)',
        fontSize: 12,
        fontWeight: 500,
        fontFamily: 'var(--font-mono)',
      },
    },
  },
  grid: {
    line: {
      stroke: 'var(--grid-line)',
      strokeWidth: 1,
    },
  },
  legends: {
    text: {
      fill: 'var(--foreground)',
      fontSize: 11,
      fontFamily: 'var(--font-mono)',
    },
  },
  tooltip: {
    container: {
      background: 'var(--background-tertiary)',
      color: 'var(--foreground)',
      fontSize: 12,
      borderRadius: 'var(--radius)',
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow-card)',
      fontFamily: 'var(--font-mono)',
    },
  },
  crosshair: {
    line: {
      stroke: 'var(--primary)',
      strokeWidth: 1,
      strokeOpacity: 0.5,
    },
  },
};

export const terminalChartColors = [
  '#FF6600', // Primary (naranja)
  '#00FF41', // Success (verde)
  '#00BFFF', // Info (cyan)
  '#FFB800', // Warning (amarillo)
  '#FF3333', // Destructive (rojo)
  '#9D4EDD', // Purple
  '#00CED1', // Dark cyan
  '#FF69B4', // Pink
];
```

### 5.2 Crear `LineChart`

**Crear carpeta**: `src/components/charts/LineChart/`

```tsx
// src/components/charts/LineChart/LineChart.tsx
import { ResponsiveLine, LineSvgProps } from '@nivo/line';
import { terminalChartTheme, terminalChartColors } from '../theme';
import styles from './LineChart.module.css';

export interface LineChartProps {
  data: LineSvgProps['data'];
  height?: number;
  enableArea?: boolean;
  enablePoints?: boolean;
  className?: string;
}

export function LineChart({ 
  data, 
  height = 300,
  enableArea = true,
  enablePoints = true,
  className = '' 
}: LineChartProps) {
  const getClassName = (): string => {
    const classes = [styles.container];
    if (className) classes.push(className);
    return classes.join(' ');
  };

  return (
    <div className={getClassName()} style={{ height }}>
      <ResponsiveLine
        data={data}
        theme={terminalChartTheme}
        colors={terminalChartColors}
        margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false }}
        curve="monotoneX"
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        enableGridX={false}
        enableGridY={true}
        pointSize={enablePoints ? 8 : 0}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        enableArea={enableArea}
        areaOpacity={0.15}
        useMesh={true}
        animate={true}
        motionConfig="gentle"
      />
    </div>
  );
}
```

```css
/* src/components/charts/LineChart/LineChart.module.css */

.container {
  width: 100%;
  background-color: var(--background-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: var(--spacing-md);
}
```

```ts
// src/components/charts/LineChart/index.ts
export { LineChart } from './LineChart';
export type { LineChartProps } from './LineChart';
```

### 5.3 Crear `StatCard`

**Crear carpeta**: `src/components/charts/StatCard/`

```tsx
// src/components/charts/StatCard/StatCard.tsx
import { LucideIcon } from 'lucide-react';
import styles from './StatCard.module.css';

export interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  icon?: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export function StatCard({ 
  label, 
  value, 
  change, 
  icon: Icon,
  trend,
  className = '' 
}: StatCardProps) {
  const getClassName = (): string => {
    const classes = [styles.card];
    if (className) classes.push(className);
    return classes.join(' ');
  };

  const getChangeClassName = (): string => {
    const classes = [styles.change];
    if (trend === 'up' || (change && change > 0)) classes.push(styles.positive);
    if (trend === 'down' || (change && change < 0)) classes.push(styles.negative);
    return classes.join(' ');
  };

  const formatChange = (val: number): string => {
    const sign = val > 0 ? '+' : '';
    return `${sign}${val}%`;
  };

  return (
    <div className={getClassName()}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        {Icon && <Icon className={styles.icon} size={20} />}
      </div>
      <div className={styles.value}>{value}</div>
      {change !== undefined && (
        <div className={getChangeClassName()}>
          {formatChange(change)}
        </div>
      )}
    </div>
  );
}
```

```css
/* src/components/charts/StatCard/StatCard.module.css */

.card {
  background-color: var(--background-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: var(--spacing-lg);
  transition: all var(--transition-fast);
}

.card:hover {
  border-color: var(--primary);
  box-shadow: var(--shadow-glow-sm);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.label {
  font-family: var(--font-mono);
  font-size: var(--text-cuerpo-2);
  color: var(--foreground-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.icon {
  color: var(--primary);
}

.value {
  font-family: var(--font-mono);
  font-size: var(--text-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--foreground);
  line-height: 1;
}

.change {
  font-family: var(--font-mono);
  font-size: var(--text-cuerpo-2);
  margin-top: var(--spacing-sm);
  color: var(--foreground-muted);
}

.positive {
  color: var(--success);
}

.negative {
  color: var(--destructive);
}
```

```ts
// src/components/charts/StatCard/index.ts
export { StatCard } from './StatCard';
export type { StatCardProps } from './StatCard';
```

### 5.4 Crear index de charts

```ts
// src/components/charts/index.ts
export * from './LineChart';
export * from './StatCard';
export { terminalChartTheme, terminalChartColors } from './theme';
```

---

## Fase 6: Layouts (1-2 horas)

### 6.1 Crear `DashboardLayout`

**Crear carpeta**: `src/layouts/DashboardLayout/`

```tsx
// src/layouts/DashboardLayout/DashboardLayout.tsx
import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@components/organisms/Sidebar';
import styles from './DashboardLayout.module.css';

export interface DashboardLayoutProps {
  children?: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.content}>
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
}
```

```css
/* src/layouts/DashboardLayout/DashboardLayout.module.css */

.layout {
  display: flex;
  min-height: 100vh;
  background-color: var(--background);
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.content {
  flex: 1;
  padding: var(--content-padding);
  overflow-y: auto;
}

/* Grid helpers */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--gap-elements);
}

.gridFull {
  grid-column: 1 / -1;
}

.grid2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--gap-elements);
}

.grid3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--gap-elements);
}

.grid4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--gap-elements);
}

@media (max-width: 1024px) {
  .grid3, .grid4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .grid2, .grid3, .grid4 {
    grid-template-columns: 1fr;
  }
}
```

```ts
// src/layouts/DashboardLayout/index.ts
export { DashboardLayout } from './DashboardLayout';
export type { DashboardLayoutProps } from './DashboardLayout';
```

### 6.2 Crear `LandingLayout`

**Crear carpeta**: `src/layouts/LandingLayout/`

```tsx
// src/layouts/LandingLayout/LandingLayout.tsx
import { ReactNode } from 'react';
import styles from './LandingLayout.module.css';
import crtStyles from '@styles/effects/crt.module.css';

export interface LandingLayoutProps {
  children: ReactNode;
  crtEffects?: boolean;
}

export function LandingLayout({ 
  children, 
  crtEffects = true 
}: LandingLayoutProps) {
  const getClassName = (): string => {
    const classes = [styles.layout];
    if (crtEffects) {
      classes.push(crtStyles.scanlines);
      classes.push(crtStyles.vignette);
    }
    return classes.join(' ');
  };

  return (
    <div className={getClassName()}>
      <div className={styles.backgroundPattern} />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
```

```css
/* src/layouts/LandingLayout/LandingLayout.module.css */

.layout {
  min-height: 100vh;
  background-color: var(--background);
  position: relative;
  overflow: hidden;
}

/* Binary pattern background */
.backgroundPattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ctext x='0' y='20' fill='%23FF6600' font-family='monospace' font-size='14'%3E01001%3C/text%3E%3Ctext x='50' y='40' fill='%23FF6600' font-family='monospace' font-size='14'%3E10110%3C/text%3E%3Ctext x='20' y='60' fill='%23FF6600' font-family='monospace' font-size='14'%3E00101%3C/text%3E%3Ctext x='70' y='80' fill='%23FF6600' font-family='monospace' font-size='14'%3E11010%3C/text%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 0;
}

.main {
  position: relative;
  z-index: 1;
}
```

```ts
// src/layouts/LandingLayout/index.ts
export { LandingLayout } from './LandingLayout';
export type { LandingLayoutProps } from './LandingLayout';
```

---

## Fase 7: Verificación y Testing

### 7.1 Checklist de archivos

```
CREAR:
├── src/styles/theme.css                     ✓
├── src/styles/typography/terminal.css       ✓
├── src/styles/effects/crt.module.css        ✓
├── src/styles/effects/glow.module.css       ✓
├── src/components/terminal/TerminalWindow/  ✓
├── src/components/terminal/AsciiBox/        ✓
├── src/components/terminal/TypewriterText/  ✓
├── src/components/terminal/GlitchText/      ✓
├── src/components/charts/theme.ts           ✓
├── src/components/charts/LineChart/         ✓
├── src/components/charts/StatCard/          ✓
├── src/layouts/DashboardLayout/             ✓
├── src/layouts/LandingLayout/               ✓

MODIFICAR:
├── src/styles/globals.css                   ✓ (quitar variables)
├── src/main.tsx                             ✓ (imports)
├── src/components/atoms/Button/             ✓
├── src/components/atoms/Input/              ✓
├── src/components/atoms/Badge/              ✓
├── src/components/molecules/Card/           ✓
├── src/components/organisms/Table/          ✓
```

### 7.2 Comandos de verificación

```bash
# 1. Verificar que compila
npm run build

# 2. Verificar tipos
npx tsc --noEmit

# 3. Verificar estilos aplicados
npm run dev
# Abrir http://localhost:5173

# 4. Verificar en modo producción
npm run preview
```

### 7.3 Testing visual sugerido

1. **Button**: Verificar todos los variants (primary, secondary, ghost, destructive)
2. **Input**: Verificar estados (normal, focus, error, disabled)
3. **Card**: Verificar hover effects y variants
4. **Table**: Verificar striped, selection, hover
5. **Charts**: Verificar colores y tooltips
6. **Terminal components**: Verificar animaciones

---

## Resumen de Dependencias Finales

```json
{
  "dependencies": {
    "@nivo/core": "^0.87.0",
    "@nivo/line": "^0.87.0",
    "@nivo/bar": "^0.87.0",
    "@nivo/pie": "^0.87.0",
    "framer-motion": "^11.0.0",
    "react-type-animation": "^3.2.0",
    "react-powerglitch": "^1.0.0",
    "lucide-react": "latest",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^6.20.0",
    "zustand": "^5.0.3"
  }
}
```

---

## Tiempo Estimado Total

| Fase | Tiempo |
|------|--------|
| 0: Preparación | 30 min |
| 1: Sistema de estilos | 1-2 horas |
| 2: Efectos CSS | 30 min |
| 3: Actualizar componentes | 2-3 horas |
| 4: Componentes terminal | 2-3 horas |
| 5: Sistema de gráficos | 2 horas |
| 6: Layouts | 1-2 horas |
| 7: Verificación | 1 hora |
| **Total** | **10-14 horas** |

---

**Siguiente paso**: Empieza por la Fase 0 (instalar dependencias) y Fase 1 (crear theme.css). Una vez que eso funcione, los componentes existentes cambiarán automáticamente de aspecto.
