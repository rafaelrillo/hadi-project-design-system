// Path: src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

// ═══════════════════════════════════════════════════════════════════════════════
// DESIGN SYSTEM - Centralized Import
// All CSS is loaded from index.css in the correct cascade order.
// See src/styles/index.css for the full import structure.
// ═══════════════════════════════════════════════════════════════════════════════
import './styles/index.css';

// Theme initialization - applies saved material/texture on load
import { initializeTheme } from './stores/themeStore';
initializeTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
