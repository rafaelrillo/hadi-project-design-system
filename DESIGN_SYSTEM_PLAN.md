# SENTINEL Design System - Implementation Plan

## Overview

Este plan detalla la implementación del nuevo design system basado en **Neumorphism + Glassmorphism** con **Dynamic Light Engine**. Todas las propiedades están extraídas del archivo `src/pages/Home.tsx` (SENTINEL Dynamic Light Engine Demo).

**Branch actual**: `redesign/stock-market-ui`
**Archivo de referencia**: `src/pages/Home.tsx`

---

## 1. SISTEMA DE COLORES BASE

### Light Theme Foundation
```css
/* Colores base del sistema neumórfico */
--neu-base: #e0e5ec;           /* Fondo principal - gris neumórfico clásico */
--neu-shadow-dark: hsl(220, 15%, 72%);   /* #a3b1c6 - sombra oscura */
--neu-shadow-light: hsl(0, 0%, 100%);    /* #ffffff - highlight */

/* Colores de texto */
--text-primary: #2D3436;
--text-secondary: #636E72;
--text-tertiary: #9BA4B0;
--text-accent: #4A9A9C;        /* Teal institucional */

/* Colores de estado */
--status-positive: #22C55E;
--status-negative: #EF4444;
--status-warning: #F59E0B;
--status-info: #8B5CF6;
```

---

## 2. SISTEMA DE SOMBRAS DINÁMICAS

### 2.1 Cálculo del Ángulo de Luz
```typescript
// El ángulo de luz (0-360°) determina la dirección de todas las sombras
const [lightAngle, setLightAngle] = useState(135); // Default: arriba-izquierda

// Convertir ángulo a offsets X/Y (la sombra va en dirección OPUESTA a la luz)
const shadowAngle = (lightAngle + 180) * (Math.PI / 180);
const shadowOffsets = {
  x: Math.cos(shadowAngle),  // -1 a 1
  y: Math.sin(shadowAngle),  // -1 a 1
};
```

### 2.2 Sombra Neumórfica Elevada (neuPanel)
```typescript
// Para contenedores principales: Cards, Modals, Sidebars
const getNeuPanelShadow = (distance: number, blur: number): string => {
  const { x, y } = shadowOffsets;
  // Highlight en dirección de la luz (inverso)
  const hlX = -x * distance;
  const hlY = -y * distance;
  // Sombra en dirección opuesta a la luz
  const shX = x * distance;
  const shY = y * distance;

  return `
    ${hlX}px ${hlY}px ${blur}px #ffffff,
    ${shX}px ${shY}px ${blur}px hsl(220, 15%, 72%)
  `;
};

// Uso: getNeuPanelShadow(20, 60) → sombra estándar de panel
```

### 2.3 Sombra Neumórfica Inset (neuInset)
```typescript
// Para inputs, contenedores internos, wells
const getNeuInsetShadow = (distance: number, blur: number): string => {
  const { x, y } = shadowOffsets;
  const shX = x * distance;
  const shY = y * distance;

  return `
    inset ${shX}px ${shY}px ${blur}px hsl(220, 15%, 72%),
    inset ${-shX}px ${-shY}px ${blur}px #ffffff
  `;
};

// Uso estándar: getNeuInsetShadow(5, 15)
// Uso pequeño:  getNeuInsetShadow(3, 8)
```

### 2.4 Sombra Layered para Glass (multicapa)
```typescript
// Para elementos glass - sombra de 4 capas con color
const getLayeredShadow = (hue: number, sat: number): string => {
  const { x, y } = shadowOffsets;
  const layers = [
    { dist: 0.5, blur: 1, opacity: 0.12 },
    { dist: 1, blur: 2, opacity: 0.10 },
    { dist: 2, blur: 4, opacity: 0.08 },
    { dist: 4, blur: 8, opacity: 0.06 },
  ];

  return layers.map(layer =>
    `${x * layer.dist}px ${y * layer.dist * 1.5}px ${layer.blur}px hsla(${hue}, ${sat * 0.6}%, 35%, ${layer.opacity})`
  ).join(', ');
};
```

### 2.5 Reflejo de Luz para Glass
```typescript
// Simula el reflejo de luz en los bordes del glass
const getGlassReflection = (): string => {
  const { x, y } = shadowOffsets;
  const hlX = -x;  // Highlight va hacia la luz
  const hlY = -y;

  const topHighlight = hlY < 0 ? 0.6 : 0.2;
  const leftHighlight = hlX < 0 ? 0.4 : 0.15;

  return `
    inset 0 ${hlY < 0 ? '-1px' : '1px'} 0 hsla(0, 0%, 100%, ${topHighlight}),
    inset ${hlX < 0 ? '-1px' : '1px'} 0 0 hsla(0, 0%, 100%, ${leftHighlight})
  `;
};
```

---

## 3. ESTILOS DE COMPONENTES

### 3.1 neuPanel - Contenedores Principales
```css
/* Aplicar a: Card, Modal, Sidebar, Table containers, DashboardLayout panels */
.neu-panel {
  background: #e0e5ec;
  border-radius: 15px;
  padding: 32px;
  box-shadow: 20px 20px 60px hsl(220, 15%, 72%),
              -20px -20px 60px #ffffff;
  position: relative;
  transition: box-shadow 50ms linear;
}
```

### 3.2 neuInset - Contenedores Internos
```css
/* Aplicar a: Input, Textarea, SearchBar, wells, chart containers */
.neu-inset {
  background: #e0e5ec;
  border-radius: 15px;
  box-shadow: inset 5px 5px 15px hsl(220, 15%, 72%),
              inset -5px -5px 15px #ffffff;
  transition: box-shadow 50ms linear;
}

/* Variante pequeña para iconos */
.neu-inset-sm {
  background: #e0e5ec;
  border-radius: 15px;
  box-shadow: inset 3px 3px 8px hsl(220, 15%, 72%),
              inset -3px -3px 8px #ffffff;
}
```

### 3.3 glassCard - Elementos Interactivos Destacados
```css
/* Aplicar a: KPIs, Notifications, Tooltips, Floating elements */
/* Parámetros: hue (0-360), sat (0-100) */
.glass-card {
  background: linear-gradient(
    180deg,  /* Ajustar con lightAngle + 45 */
    hsla(var(--hue), var(--sat), 70%, 0.28) 0%,
    hsla(var(--hue), var(--sat), 65%, 0.12) 50%,
    hsla(var(--hue), var(--sat), 60%, 0.20) 100%
  );
  backdrop-filter: blur(8px) saturate(140%);
  -webkit-backdrop-filter: blur(8px) saturate(140%);
  border-radius: 15px;
  border: 1px solid hsla(var(--hue), var(--sat), 80%, 0.35);
  position: relative;
  overflow: hidden;
  transition: box-shadow 50ms linear, background 100ms linear;
}
```

### 3.4 glassBadge - Tags y Status
```css
/* Aplicar a: Badge, Tag, Status indicators, Chips */
.glass-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: linear-gradient(
    180deg,
    hsla(var(--hue), var(--sat), 65%, 0.25) 0%,
    hsla(var(--hue), var(--sat), 60%, 0.12) 50%,
    hsla(var(--hue), var(--sat), 65%, 0.20) 100%
  );
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid hsla(var(--hue), var(--sat), 75%, 0.25);
  border-radius: 15px;
  font-size: 12px;
  font-weight: 600;
  color: hsl(var(--hue), calc(var(--sat) * 0.8), 30%);
  transition: box-shadow 50ms linear;
}
```

### 3.5 glassButton - Botones
```css
/* Aplicar a: Button primary, CTAs */
.glass-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: linear-gradient(
    180deg,
    hsla(175, 35%, 60%, 0.28) 0%,
    hsla(175, 35%, 55%, 0.12) 50%,
    hsla(175, 35%, 60%, 0.22) 100%
  );
  backdrop-filter: blur(8px) saturate(120%);
  -webkit-backdrop-filter: blur(8px) saturate(120%);
  border: 1px solid hsla(175, 35%, 75%, 0.30);
  border-radius: 15px;
  color: #2D3436;
  font-size: 14px;
  font-weight: 600;
  font-family: var(--sentinel-font-mono);
  cursor: pointer;
  transition: transform 400ms cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 50ms linear;
}
```

---

## 4. PALETA DE HUES PARA GLASS

| Propósito | Hue | Saturación | Ejemplo de uso |
|-----------|-----|------------|----------------|
| **Primary/Teal** | 175 | 35 | Buttons, primary actions |
| **Info/Data** | 215 | 50 | Live data, information |
| **Premium** | 280 | 40 | Pro badges, special features |
| **Alert/Error** | 355 | 35 | Alerts, errors, warnings críticos |
| **Success** | 145 | 45 | Gains, success states |
| **Warning** | 35 | 55 | High priority, warnings |
| **Stats/Time** | 190 | 50 | Stats, time-based data |

---

## 5. TIPOGRAFÍA

```css
/* Título principal */
.title {
  font-size: 42px;
  font-weight: 700;
  color: #2D3436;
  font-family: var(--sentinel-font-display);
  letter-spacing: 0.02em;
}

/* Subtítulo */
.subtitle {
  font-size: 14px;
  color: #636E72;
  font-family: var(--sentinel-font-mono);
}

/* Section title (label) */
.section-title {
  font-size: 12px;
  font-weight: 600;
  color: #4A9A9C;
  font-family: var(--sentinel-font-mono);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

/* Card title */
.card-title {
  font-size: 20px;
  font-weight: 600;
  color: #2D3436;
  font-family: var(--sentinel-font-display);
}
```

---

## 6. CONSTANTES GLOBALES

```css
/* Border radius unificado */
--radius-standard: 15px;

/* Transiciones */
--transition-shadow: box-shadow 50ms linear;
--transition-transform: transform 400ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-background: background 100ms linear;

/* Padding estándar */
--panel-padding: 32px;
--inset-padding: 20px;
--badge-padding: 6px 12px;
--button-padding: 14px 28px;
```

---

## 7. PLAN DE IMPLEMENTACIÓN

### Fase 1: Infraestructura (Prioridad Alta)
1. [ ] **Actualizar `src/styles/theme.css`**
   - Agregar todas las variables CSS nuevas
   - Definir colores base del sistema neumórfico
   - Definir paleta de hues para glass

2. [ ] **Crear `src/hooks/useDynamicShadows.ts`**
   - Implementar hook que gestione lightAngle
   - Exportar funciones: getNeuPanelShadow, getNeuInsetShadow, getLayeredShadow, getGlassReflection
   - Usar React Context para compartir el ángulo globalmente

3. [ ] **Crear `src/contexts/LightEngineContext.tsx`**
   - Provider para el sistema de luz dinámica
   - Estado global del ángulo de luz
   - Opción de animación automática

### Fase 2: Componentes Base (Prioridad Alta)
4. [ ] **Actualizar `src/components/atoms/Button/Button.tsx`**
   - Implementar variante `glass` con glassButton styles
   - Integrar sombras dinámicas

5. [ ] **Actualizar `src/components/atoms/Badge/Badge.tsx`**
   - Implementar glassBadge con soporte de hue/sat
   - Variantes por color: success, error, warning, info, premium

6. [ ] **Actualizar `src/components/atoms/Input/Input.tsx`**
   - Aplicar neuInset styles
   - Focus state con sombra más pronunciada

7. [ ] **Actualizar `src/components/molecules/Card/Card.tsx`**
   - Aplicar neuPanel styles
   - Eliminar sombras oscuras antiguas

### Fase 3: Componentes Compuestos (Prioridad Media)
8. [ ] **Actualizar `src/components/organisms/Modal/Modal.tsx`**
   - neuPanel para el modal
   - Glass overlay con blur

9. [ ] **Actualizar `src/components/organisms/Sidebar/Sidebar.tsx`**
   - neuPanel para sidebar
   - neuInset para items activos

10. [ ] **Actualizar `src/components/molecules/MetricCard/MetricCard.tsx`**
    - Implementar glassCard con colores semánticos
    - Integrar sombras dinámicas

11. [ ] **Actualizar `src/components/organisms/Table/Table.tsx`**
    - Contenedor neuPanel
    - Rows con hover glass sutil

### Fase 4: Layout y Páginas (Prioridad Media)
12. [ ] **Actualizar `src/layouts/DashboardLayout/DashboardLayout.tsx`**
    - Background: #e0e5ec
    - Panels con neuPanel
    - Integrar LightEngineContext

13. [ ] **Actualizar `src/pages/Landing/Landing.tsx`**
    - Re-habilitar AtmosphericBackground
    - Aplicar nuevos estilos

### Fase 5: Componentes Secundarios (Prioridad Baja)
14. [ ] **Actualizar Tooltip** - glassCard
15. [ ] **Actualizar Toast** - glassCard con colores semánticos
16. [ ] **Actualizar Tabs** - neuInset track + glass active
17. [ ] **Actualizar Pagination** - neuInset + glass buttons
18. [ ] **Actualizar SearchBar** - neuInset
19. [ ] **Actualizar Dropdown** - neuPanel + glass items

---

## 8. ARCHIVOS A CREAR/MODIFICAR

### Nuevos archivos:
```
src/hooks/useDynamicShadows.ts
src/contexts/LightEngineContext.tsx
src/styles/neumorphic.css (opcional, utilidades)
src/styles/glass.css (opcional, utilidades)
```

### Archivos a modificar:
```
src/styles/theme.css
src/components/atoms/Button/Button.module.css
src/components/atoms/Badge/Badge.module.css
src/components/atoms/Input/Input.module.css
src/components/molecules/Card/Card.module.css
src/components/organisms/Modal/Modal.module.css
src/components/organisms/Sidebar/Sidebar.module.css
src/components/molecules/MetricCard/MetricCard.module.css
src/components/organisms/Table/Table.module.css
src/layouts/DashboardLayout/DashboardLayout.module.css
```

---

## 9. NOTAS IMPORTANTES

1. **Border radius**: Usar `15px` en TODOS los elementos para consistencia
2. **Transiciones**: Las sombras dinámicas usan `50ms linear` para respuesta rápida
3. **Backdrop filter**: Siempre incluir prefijo `-webkit-` para Safari
4. **Colores de texto en glass**: Usar versión oscura del hue (30% lightness)
5. **El fondo base DEBE ser `#e0e5ec`** - el neumorfismo no funciona con otros colores

---

## 10. REFERENCIA VISUAL

El archivo de referencia completo está en:
```
src/pages/Home.tsx
```

Acceder a la demo en:
```
/showcase (ruta index del ShowcaseLayout)
```

---

*Documento generado el 2026-01-16*
*Branch: redesign/stock-market-ui*
*Commit base: 702168b*
