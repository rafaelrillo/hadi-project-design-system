// Path: src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

// Estilos en orden correcto
import './styles/globals.css';               // Reset y base
// import './styles/fonts.css';              // [DEPRECATED] DotMatrix removed - fonts now via Google Fonts CDN
import './styles/theme.css';                 // Variables del tema FING
import './styles/textures.css';              // Texturas para Material Theming
import './styles/light-engine.css';          // Motor de luz unificado (Josh Comeau)
import './styles/typography/fing.css';       // Tipografía FING

// Theme initialization - applies saved material/texture on load
import { initializeTheme } from './stores/themeStore';
initializeTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
