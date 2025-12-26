// Path: src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

// Estilos en orden correcto
import './styles/globals.css';               // Reset y base
import './styles/theme.css';                 // Variables del tema SENTINEL
import './styles/typography/sentinel.css';   // Tipografía SENTINEL

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
