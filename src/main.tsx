// Path: src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

// Estilos en orden correcto - theme.css primero para definir variables
import './styles/globals.css';              // Reset y base
import './styles/theme.css';                // Variables del tema (PRIMERO)
import './styles/typography/terminal.css';  // Fuentes terminal (usa variables)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
