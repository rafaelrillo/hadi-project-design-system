// Path: src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

// Estilos en orden correcto
import './styles/globals.css';               // Reset y base
// import './styles/fonts.css';              // [DEPRECATED] DotMatrix removed - fonts now via Google Fonts CDN
import './styles/theme.css';                 // Variables del tema FING (legacy - being consolidated)

// ═══════════════════════════════════════════════════════════════════════════════
// DESIGN SYSTEM OFICIAL (Source of Truth)
// Estos archivos definen los tokens canónicos del sistema
// ═══════════════════════════════════════════════════════════════════════════════
import './styles/colors.css';                // Natural Mineral color palette
import './styles/typography.css';            // Font families, sizes, weights, tracking
import './styles/shadows.css';               // RAISED/INSET/GLASS shadow hierarchy
import './styles/letterpress.css';           // Letterpress text shadows

// Tipografía adicional
import './styles/typography/fing.css';       // Tipografía FING adicional

// ═══════════════════════════════════════════════════════════════════════════════
// LAB / EXPERIMENTAL (Solo importar en páginas de showcase)
// Movidos a src/styles/lab/ - no importar en producción
// ═══════════════════════════════════════════════════════════════════════════════
// import './styles/lab/textures.css';       // [LAB] Texturas para Material Theming
// import './styles/lab/light-engine.css';   // [LAB] Motor de luz dinámico

// Theme initialization - applies saved material/texture on load
import { initializeTheme } from './stores/themeStore';
initializeTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
