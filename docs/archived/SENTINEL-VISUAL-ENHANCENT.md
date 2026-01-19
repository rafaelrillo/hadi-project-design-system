# SENTINEL Dashboard - Guía de Mejoras Visuales

## Diagnóstico

El dashboard actual es funcional pero visualmente plano porque:
1. ❌ No usa `<AtmosphericBackground />` - sin fondo animado
2. ❌ No usa `<DepthLayer />` - sin jerarquía de profundidad
3. ❌ Cards sin glassmorphism ni glow
4. ❌ Bordes casi invisibles
5. ❌ Sin gradientes ni contraste entre secciones

---

## FASE 1: Activar Atmósfera Base

### 1.1 Agregar AtmosphericBackground al DashboardLayout

```tsx
// src/layouts/DashboardLayout/DashboardLayout.tsx

import { AtmosphericBackground } from '@/components/atoms/sentinel';

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <AtmosphericBackground variant="subtle" animated>
      <div className={styles.layout}>
        <Sidebar />
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </AtmosphericBackground>
  );
}
```

### 1.2 Actualizar CSS del Layout

```css
/* DashboardLayout.module.css */

.layout {
  display: flex;
  min-height: 100vh;
  position: relative;
  z-index: 1; /* Sobre el fondo atmosférico */
}

.main {
  flex: 1;
  padding: var(--sentinel-space-6);
  overflow-y: auto;
  
  /* Gradiente sutil de arriba hacia abajo */
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(5, 6, 10, 0.3) 100%
  );
}
```

---

## FASE 2: Sistema de Capas con DepthLayer

### 2.1 Jerarquía de Profundidad

```
Depth 1: Hero/Indicadores principales (más elevados, con glow)
Depth 2: Cards de métricas y gráficos
Depth 3: Tablas y listas
Depth 4: Elementos secundarios
Depth 5: Footer, elementos de fondo
```

### 2.2 Ejemplo de Aplicación en DashboardPage

```tsx
// src/pages/dashboard/DashboardPage.tsx

import { DepthLayer, DataReveal } from '@/components/atoms/sentinel';

export function DashboardPage() {
  return (
    <div className={styles.dashboard}>
      
      {/* HERO: Indicadores principales - Depth 1 */}
      <DepthLayer depth={1} className={styles.heroSection}>
        <div className={styles.indicatorsRow}>
          <MarketStateIndicator state={marketState} />
          <RiskGauge level={riskLevel} value={riskValue} />
          <ConfidenceLevel level={confidence} percentage={confidencePercent} />
        </div>
      </DepthLayer>

      {/* MÉTRICAS: Cards principales - Depth 2 */}
      <DepthLayer depth={2} className={styles.metricsSection}>
        <DataReveal delay={100}>
          <MetricCard title="Portfolio Value" value={totalValue} />
        </DataReveal>
        <DataReveal delay={200}>
          <MetricCard title="Day P&L" value={dayPL} />
        </DataReveal>
      </DepthLayer>

      {/* CONTENIDO: Gráficos y tablas - Depth 3 */}
      <DepthLayer depth={3} className={styles.contentSection}>
        <DataReveal delay={300}>
          <FinancialLineChart data={chartData} />
        </DataReveal>
      </DepthLayer>

    </div>
  );
}
```

---

## FASE 3: Glassmorphism para Cards

### 3.1 Nuevos Tokens CSS (agregar a theme.css)

```css
/* ========================================
   GLASSMORPHISM & ADVANCED EFFECTS
   ======================================== */

/* Glass backgrounds */
--sentinel-glass-light: rgba(255, 255, 255, 0.03);
--sentinel-glass-medium: rgba(255, 255, 255, 0.05);
--sentinel-glass-heavy: rgba(255, 255, 255, 0.08);

/* Glass con tint de acento */
--sentinel-glass-accent: rgba(91, 163, 165, 0.05);
--sentinel-glass-accent-strong: rgba(91, 163, 165, 0.1);

/* Bordes con gradiente */
--sentinel-border-gradient: linear-gradient(
  135deg,
  rgba(255, 255, 255, 0.1) 0%,
  rgba(255, 255, 255, 0.05) 50%,
  rgba(91, 163, 165, 0.1) 100%
);

/* Glow por estado */
--sentinel-glow-positive: rgba(74, 154, 124, 0.3);
--sentinel-glow-negative: rgba(184, 92, 92, 0.3);
--sentinel-glow-warning: rgba(196, 163, 90, 0.3);

/* Sombras mejoradas con color */
--sentinel-shadow-elevated: 
  0 4px 20px rgba(0, 0, 0, 0.4),
  0 0 40px rgba(5, 6, 10, 0.5);

--sentinel-shadow-glow-accent: 
  0 4px 20px rgba(0, 0, 0, 0.3),
  0 0 30px rgba(91, 163, 165, 0.15);

/* Inner highlight (simula luz desde arriba) */
--sentinel-inner-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.05);
```

### 3.2 Actualizar MetricCard.module.css

```css
/* MetricCard.module.css - VERSIÓN MEJORADA */

.metricCard {
  display: flex;
  flex-direction: column;
  gap: var(--sentinel-space-3);
  padding: var(--sentinel-space-5);
  
  /* Glassmorphism base */
  background: linear-gradient(
    135deg,
    var(--sentinel-bg-elevated) 0%,
    rgba(16, 18, 26, 0.8) 100%
  );
  
  /* Backdrop blur para efecto glass */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  
  /* Borde más visible con gradiente */
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--sentinel-radius-xl);
  
  /* Inner highlight */
  box-shadow: 
    var(--sentinel-inner-highlight),
    var(--sentinel-shadow-card);
  
  /* Transición suave */
  transition: all var(--sentinel-duration-normal) var(--sentinel-ease-smooth);
  
  /* Posición para pseudo-elementos */
  position: relative;
  overflow: hidden;
}

/* Efecto de brillo sutil en el borde superior */
.metricCard::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
}

/* Hover mejorado */
.metricCard:hover {
  border-color: rgba(91, 163, 165, 0.3);
  transform: translateY(-2px);
  box-shadow: 
    var(--sentinel-inner-highlight),
    var(--sentinel-shadow-glow-accent);
}

/* Variante con glow de acento (para métricas importantes) */
.metricCard.highlighted {
  border-color: rgba(91, 163, 165, 0.2);
  background: linear-gradient(
    135deg,
    var(--sentinel-bg-elevated) 0%,
    rgba(91, 163, 165, 0.05) 100%
  );
  box-shadow: 
    var(--sentinel-inner-highlight),
    0 4px 20px rgba(0, 0, 0, 0.3),
    0 0 40px rgba(91, 163, 165, 0.1);
}

/* Variante positiva (ganancia) */
.metricCard.positive {
  border-color: rgba(74, 154, 124, 0.2);
  box-shadow: 
    var(--sentinel-inner-highlight),
    0 4px 20px rgba(0, 0, 0, 0.3),
    0 0 30px rgba(74, 154, 124, 0.1);
}

/* Variante negativa (pérdida) */
.metricCard.negative {
  border-color: rgba(184, 92, 92, 0.2);
  box-shadow: 
    var(--sentinel-inner-highlight),
    0 4px 20px rgba(0, 0, 0, 0.3),
    0 0 30px rgba(184, 92, 92, 0.1);
}
```

---

## FASE 4: Indicadores Hero con Presencia

### 4.1 MarketStateIndicator Mejorado

```css
/* MarketStateIndicator.module.css - MEJORAS */

.container {
  position: relative;
  padding: var(--sentinel-space-6);
  
  /* Glass effect más pronunciado */
  background: linear-gradient(
    145deg,
    rgba(16, 18, 26, 0.9) 0%,
    rgba(10, 11, 16, 0.95) 100%
  );
  backdrop-filter: blur(20px);
  
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--sentinel-radius-2xl);
  
  /* Sombra con glow según estado */
  box-shadow: var(--sentinel-shadow-elevated);
  
  overflow: hidden;
}

/* Glow de fondo según estado del mercado */
.container::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150%;
  height: 150%;
  background: radial-gradient(
    circle,
    var(--state-glow-color) 0%,
    transparent 70%
  );
  opacity: 0.15;
  pointer-events: none;
  z-index: 0;
}

/* Estados con colores de glow */
.bullish {
  --state-glow-color: var(--sentinel-status-positive);
  border-color: rgba(74, 154, 124, 0.2);
}

.bearish {
  --state-glow-color: var(--sentinel-status-negative);
  border-color: rgba(184, 92, 92, 0.2);
}

.neutral {
  --state-glow-color: var(--sentinel-accent-primary);
  border-color: rgba(91, 163, 165, 0.2);
}

.uncertain {
  --state-glow-color: var(--sentinel-status-warning);
  border-color: rgba(196, 163, 90, 0.2);
}

/* Contenido sobre el glow */
.content {
  position: relative;
  z-index: 1;
}
```

### 4.2 RiskGauge con Glow Dinámico

```css
/* RiskGauge.module.css - MEJORAS */

.gauge {
  position: relative;
  padding: var(--sentinel-space-5);
  
  background: linear-gradient(
    145deg,
    rgba(16, 18, 26, 0.9) 0%,
    rgba(10, 11, 16, 0.95) 100%
  );
  backdrop-filter: blur(20px);
  
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--sentinel-radius-xl);
  
  box-shadow: 
    var(--sentinel-inner-highlight),
    var(--sentinel-shadow-card);
}

/* Barra de progreso con glow */
.progressBar {
  height: 8px;
  background: var(--sentinel-bg-subtle);
  border-radius: var(--sentinel-radius-full);
  overflow: hidden;
  position: relative;
}

.progressFill {
  height: 100%;
  border-radius: var(--sentinel-radius-full);
  transition: width var(--sentinel-duration-slow) var(--sentinel-ease-smooth);
  
  /* Glow en la barra según nivel */
  box-shadow: 0 0 10px currentColor;
}

/* Colores por nivel de riesgo */
.riskLow .progressFill {
  background: linear-gradient(90deg, var(--sentinel-risk-low), #5dbf9a);
}

.riskModerate .progressFill {
  background: linear-gradient(90deg, var(--sentinel-risk-moderate), #7ecbcc);
}

.riskElevated .progressFill {
  background: linear-gradient(90deg, var(--sentinel-risk-elevated), #d9bc78);
}

.riskHigh .progressFill {
  background: linear-gradient(90deg, var(--sentinel-risk-high), #d9956a);
}

.riskSevere .progressFill {
  background: linear-gradient(90deg, var(--sentinel-risk-severe), #d17878);
}
```

---

## FASE 5: Sidebar con Profundidad

### 5.1 Sidebar.module.css Mejorado

```css
/* Sidebar.module.css - MEJORAS */

.sidebar {
  width: var(--sentinel-sidebar-width);
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  
  /* Fondo más oscuro que el contenido = profundidad */
  background: linear-gradient(
    180deg,
    var(--sentinel-bg-void) 0%,
    rgba(5, 6, 10, 0.98) 100%
  );
  
  /* Borde derecho sutil */
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  
  /* Sombra hacia el contenido */
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.3);
  
  z-index: var(--sentinel-z-sticky);
  
  display: flex;
  flex-direction: column;
  padding: var(--sentinel-space-4) var(--sentinel-space-2);
}

/* Logo con glow */
.logo {
  padding: var(--sentinel-space-4);
  margin-bottom: var(--sentinel-space-6);
  text-align: center;
}

.logoIcon {
  color: var(--sentinel-accent-primary);
  filter: drop-shadow(0 0 10px var(--sentinel-accent-glow));
}

/* Nav items */
.navItem {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--sentinel-space-3);
  margin: var(--sentinel-space-1) 0;
  
  border-radius: var(--sentinel-radius-lg);
  color: var(--sentinel-text-tertiary);
  
  transition: all var(--sentinel-duration-fast) var(--sentinel-ease-default);
}

.navItem:hover {
  color: var(--sentinel-text-secondary);
  background: rgba(255, 255, 255, 0.03);
}

/* Item activo con glow */
.navItem.active {
  color: var(--sentinel-accent-primary);
  background: linear-gradient(
    135deg,
    rgba(91, 163, 165, 0.1) 0%,
    rgba(91, 163, 165, 0.05) 100%
  );
  
  box-shadow: 
    inset 0 0 20px rgba(91, 163, 165, 0.1),
    0 0 20px rgba(91, 163, 165, 0.1);
}

.navItem.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 24px;
  background: var(--sentinel-accent-primary);
  border-radius: 0 2px 2px 0;
  box-shadow: 0 0 10px var(--sentinel-accent-primary);
}
```

---

## FASE 6: NewsCard con Vida

```css
/* NewsCard.module.css - MEJORAS */

.newsCard {
  padding: var(--sentinel-space-5);
  
  background: linear-gradient(
    145deg,
    var(--sentinel-bg-elevated) 0%,
    rgba(16, 18, 26, 0.7) 100%
  );
  backdrop-filter: blur(10px);
  
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--sentinel-radius-xl);
  
  box-shadow: var(--sentinel-inner-highlight);
  
  transition: all var(--sentinel-duration-normal) var(--sentinel-ease-smooth);
  
  position: relative;
  overflow: hidden;
}

/* Línea de acento en el lado izquierdo */
.newsCard::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(
    180deg,
    var(--sentinel-accent-primary) 0%,
    transparent 100%
  );
  opacity: 0;
  transition: opacity var(--sentinel-duration-fast);
}

.newsCard:hover {
  border-color: rgba(255, 255, 255, 0.1);
  transform: translateX(4px);
  box-shadow: 
    var(--sentinel-inner-highlight),
    var(--sentinel-shadow-md);
}

.newsCard:hover::before {
  opacity: 1;
}

/* Tags de tickers */
.tickerTag {
  display: inline-flex;
  padding: var(--sentinel-space-1) var(--sentinel-space-2);
  
  background: rgba(91, 163, 165, 0.1);
  border: 1px solid rgba(91, 163, 165, 0.2);
  border-radius: var(--sentinel-radius-sm);
  
  color: var(--sentinel-accent-primary);
  font-family: var(--sentinel-font-mono);
  font-size: var(--sentinel-text-xs);
  
  transition: all var(--sentinel-duration-fast);
}

.tickerTag:hover {
  background: rgba(91, 163, 165, 0.2);
  box-shadow: 0 0 10px rgba(91, 163, 165, 0.2);
}
```

---

## FASE 7: Tabla/DataGrid con Contraste

```css
/* DataGrid.module.css - MEJORAS */

.dataGrid {
  background: linear-gradient(
    180deg,
    var(--sentinel-bg-elevated) 0%,
    rgba(16, 18, 26, 0.5) 100%
  );
  
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--sentinel-radius-xl);
  
  overflow: hidden;
}

/* Header de tabla más oscuro */
.header {
  background: var(--sentinel-bg-void);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding: var(--sentinel-space-4);
}

.headerCell {
  color: var(--sentinel-text-tertiary);
  font-size: var(--sentinel-text-xs);
  font-weight: var(--sentinel-font-medium);
  text-transform: uppercase;
  letter-spacing: var(--sentinel-tracking-wider);
}

/* Filas con zebra striping sutil */
.row {
  padding: var(--sentinel-space-4);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  transition: background var(--sentinel-duration-fast);
}

.row:nth-child(even) {
  background: rgba(255, 255, 255, 0.01);
}

.row:hover {
  background: rgba(91, 163, 165, 0.05);
}

/* Celdas con valores positivos/negativos */
.cellPositive {
  color: var(--sentinel-status-positive);
  text-shadow: 0 0 20px rgba(74, 154, 124, 0.3);
}

.cellNegative {
  color: var(--sentinel-status-negative);
  text-shadow: 0 0 20px rgba(184, 92, 92, 0.3);
}
```

---

## FASE 8: Botones con Presencia

```css
/* Button.module.css - MEJORAS */

/* Botón primario con glow */
.primary {
  background: linear-gradient(
    135deg,
    var(--sentinel-accent-primary) 0%,
    #4a8a8c 100%
  );
  
  color: var(--sentinel-bg-void);
  font-weight: var(--sentinel-font-semibold);
  
  border: none;
  border-radius: var(--sentinel-radius-lg);
  padding: var(--sentinel-space-3) var(--sentinel-space-5);
  
  box-shadow: 
    0 2px 10px rgba(91, 163, 165, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  
  transition: all var(--sentinel-duration-fast) var(--sentinel-ease-default);
}

.primary:hover {
  transform: translateY(-1px);
  box-shadow: 
    0 4px 20px rgba(91, 163, 165, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.primary:active {
  transform: translateY(0);
  box-shadow: 
    0 2px 10px rgba(91, 163, 165, 0.3),
    inset 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Botón secundario (outline con glass) */
.secondary {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  
  color: var(--sentinel-text-primary);
  
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--sentinel-radius-lg);
  padding: var(--sentinel-space-3) var(--sentinel-space-5);
  
  box-shadow: var(--sentinel-inner-highlight);
  
  transition: all var(--sentinel-duration-fast) var(--sentinel-ease-default);
}

.secondary:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(91, 163, 165, 0.3);
  box-shadow: 
    var(--sentinel-inner-highlight),
    0 0 20px rgba(91, 163, 165, 0.1);
}
```

---

## Implementación - Orden Sugerido

### Paso 1: Tokens (5 min)
Agregar los nuevos tokens de glassmorphism a `theme.css`

### Paso 2: DashboardLayout (10 min)
Agregar `<AtmosphericBackground />` y ajustar estructura

### Paso 3: Cards Base (15 min)
Actualizar `MetricCard.module.css` con glassmorphism

### Paso 4: Indicadores Hero (15 min)
Actualizar `MarketStateIndicator`, `RiskGauge`, `ConfidenceLevel`

### Paso 5: Sidebar (10 min)
Agregar profundidad y glow al item activo

### Paso 6: Tablas y Listas (10 min)
Actualizar `DataGrid` con contraste

### Paso 7: Detalles (10 min)
`NewsCard`, botones, badges

---

## Checklist Visual Final

- [ ] Fondo "respira" sutilmente (AtmosphericBackground)
- [ ] Cards tienen efecto glass con blur
- [ ] Bordes visibles pero no agresivos
- [ ] Indicadores de estado tienen glow del color correspondiente
- [ ] Sidebar más oscuro que el contenido
- [ ] Item activo en sidebar tiene glow de acento
- [ ] Valores positivos/negativos tienen text-shadow sutil
- [ ] Botón primario tiene glow y se eleva en hover
- [ ] Hover en cards eleva y agrega glow sutil
- [ ] Transiciones son suaves (400ms típico)