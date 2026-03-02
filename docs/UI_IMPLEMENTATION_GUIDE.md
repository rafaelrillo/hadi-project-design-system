# UI Implementation Guide

> Manual de aplicación del design system QUAFI a los flujos de Calibrar y Simular.
> **Enfoque**: Usar las herramientas existentes (ECharts + Animaciones + Stone Marble).

---

## Principio fundamental

**No crear componentes nuevos.** Todo se resuelve con:

1. **ECharts** — Para visualización dinámica de datos
2. **Animaciones CSS** — Para feedback y transiciones
3. **Stone Marble** — Para jerarquía visual (RAISED → INSET → GLASS)
4. **Letterpress** — Para tipografía con profundidad

---

## Herramientas disponibles

### ECharts (21 tipos)

| Chart | Uso en QUAFI |
|-------|--------------|
| **BarChart** | Comparaciones, % actual vs target, operaciones +/- |
| **LineChart** | Performance histórica, proyecciones |
| **PieChart** | Allocation de cartera |
| **GaugeChart** | Métricas individuales (Sharpe, Drawdown) |
| **RadarChart** | Comparación multi-dimensional de carteras |
| **TreeMap** | Visualización jerárquica de holdings |
| **HeatMap** | Matriz de correlación |
| **SankeyChart** | Flujo de rebalanceo (de dónde → a dónde) |
| **BoxplotChart** | Distribución de retornos, rangos Monte Carlo |
| **FunnelChart** | Conversión de flujos, embudo de decisión |
| **CandlestickChart** | Datos OHLC de mercado |

### Animaciones CSS

| Categoría | Clases | Uso |
|-----------|--------|-----|
| **Stock Market** | `.quafi-animate-value-flash-positive` | Cuando un valor sube |
| | `.quafi-animate-value-flash-negative` | Cuando un valor baja |
| | `.quafi-animate-data-glow` | Valores activos/destacados |
| | `.quafi-animate-ticker` | Scroll horizontal de datos |
| **Entrada** | `[data-animate="emerge"]` | Elementos que entran desde abajo |
| | `[data-animate="scale"]` | Cards que aparecen con scale |
| | `[data-animate="pop"]` | Elementos que destacan |
| **Stagger** | `[data-animate-stagger]` | Lista de items en secuencia |
| **Loading** | `.quafi-animate-shimmer` | Skeleton loading |
| | `.quafi-animate-pulse` | Indicador de procesando |

### Stone Marble Hierarchy

```
FONDO (--marble-base: #d5d8dc)
    ↓
RAISED (box-shadow: var(--raised-N))     ← Containers principales
    ↓
INSET (box-shadow: var(--inset-N))       ← Secciones, áreas de datos
    ↓
GLASS (background: var(--glass-bg))      ← Items interactivos
```

**Regla crítica**: NUNCA anidar mismo nivel.

---

## PARTE 1: Implementación de CALIBRAR

### Vista general

```
┌─────────────────────────────────────────────────────────────────┐
│ RAISED Container                                                 │
│  ┌──────────────────────┐  ┌──────────────────────────────────┐ │
│  │ INSET: Config Panel  │  │ INSET: Results Panel             │ │
│  │  ┌────────────────┐  │  │  ┌────────────────────────────┐  │ │
│  │  │ GLASS: Inputs  │  │  │  │ INSET: Chart Container     │  │ │
│  │  └────────────────┘  │  │  │  (EChart vive aquí)        │  │ │
│  │  ┌────────────────┐  │  │  └────────────────────────────┘  │ │
│  │  │ GLASS: Tickers │  │  │  ┌────────────────────────────┐  │ │
│  │  └────────────────┘  │  │  │ INSET: Matriz Rebalanceo   │  │ │
│  └──────────────────────┘  │  │  (EChart BarChart)         │  │ │
│                            │  └────────────────────────────┘  │ │
│                            └──────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### 1.1 Matriz de Rebalanceo → BarChart Horizontal

**Spec de Facu**: Tabla con 7 columnas (Activo, % Actual, % Target, T. Actual, T. Target, Operación, Monto)

**Implementación con ECharts**:

```tsx
// Usar BarChart horizontal con series apiladas
const option = {
  yAxis: {
    type: 'category',
    data: ['AAPL', 'MSFT', 'GOOGL', 'NVDA'], // Tickers
    axisLabel: {
      formatter: (value) => `${value}\n$185.50`, // Ticker + precio
    }
  },
  xAxis: {
    type: 'value',
    max: 100,
  },
  series: [
    {
      name: '% Actual',
      type: 'bar',
      stack: 'comparison',
      data: [25, 30, 20, 25],
      itemStyle: { color: 'var(--marble-dark)' }, // Gris
      barWidth: 20,
    },
    {
      name: '% Target',
      type: 'bar',
      stack: 'target',
      data: [30, 25, 25, 20],
      itemStyle: { color: 'var(--quafi-accent)' }, // Petrol
      barWidth: 20,
      barGap: '50%', // Separación visual
    }
  ],
  tooltip: {
    formatter: (params) => {
      // Mostrar: T. Actual, T. Target, Operación, Monto
      return `
        <div>T. Actual: 10 u.</div>
        <div>T. Target: 15 u.</div>
        <div style="color: var(--quafi-positive)">+5 (+$925.00)</div>
      `;
    }
  }
};
```

**Contenedor Stone Marble**:

```css
.matrizContainer {
  background: var(--marble-base);
  box-shadow: var(--inset-2);
  border-radius: 15px;
  padding: 20px;
}

.matrizContainer .echarts-container {
  /* El chart hereda el fondo del inset */
  background: transparent;
}
```

**Animación al recalcular**:

```tsx
// Cuando los datos cambian
chartRef.current?.setOption(newOption, {
  replaceMerge: ['series'],
  transition: {
    duration: 700,
    easing: 'cubicOut'
  }
});

// Flash en las filas que cambiaron
changedRows.forEach(row => {
  row.classList.add('quafi-animate-value-flash');
  setTimeout(() => row.classList.remove('quafi-animate-value-flash'), 1000);
});
```

### 1.2 Operaciones Delta → Custom Series con colores

**Spec de Facu**: `+5` verde, `-2` rojo

**Implementación**:

```tsx
// Dentro del tooltip o como label en el chart
const formatDelta = (delta: number, price: number) => {
  const color = delta >= 0 ? 'var(--quafi-positive)' : 'var(--quafi-negative)';
  const sign = delta >= 0 ? '+' : '';
  const amount = delta * price;

  return `
    <span style="color: ${color}; font-family: 'IBM Plex Mono'">
      ${sign}${delta} (${sign}$${amount.toFixed(2)})
    </span>
  `;
};
```

### 1.3 Switches Alpha/Toxic → GLASS Toggles

**Spec de Facu**: Switches para activar/desactivar oportunidades

**Implementación CSS (Stone Marble)**:

```css
.switchTrack {
  /* INSET base */
  background: var(--marble-base);
  box-shadow: var(--inset-1);
  border-radius: 999px;
  width: 48px;
  height: 24px;
  position: relative;
  transition: all var(--quafi-duration-fast) var(--quafi-ease-out);
}

.switchThumb {
  /* RAISED thumb */
  background: var(--marble-light);
  box-shadow: var(--raised-1);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform var(--quafi-duration-fast) var(--quafi-ease-out);
}

.switchTrack[data-state="on"] {
  background: var(--quafi-accent);
}

.switchTrack[data-state="on"] .switchThumb {
  transform: translateX(24px);
}

/* Variante Alpha (agregar) */
.switchTrack[data-variant="alpha"][data-state="on"] {
  background: var(--quafi-positive);
}

/* Variante Toxic (quitar) */
.switchTrack[data-variant="toxic"][data-state="on"] {
  background: var(--quafi-negative);
}
```

### 1.4 Footer "The Ticket" → Summary con GaugeChart

**Spec de Facu**: Neto de caja con indicador PAGAR/RECIBIR

**Implementación**:

```tsx
// Contenedor RAISED para el footer
<div className={styles.ticketFooter}>
  {/* Mini GaugeChart para visualizar el balance */}
  <GaugeChart
    value={netCash}
    min={-10000}
    max={10000}
    colors={[
      [0.5, 'var(--quafi-negative)'],  // Negativo = recibe
      [0.5, 'var(--quafi-positive)'],  // Positivo = paga
    ]}
  />

  {/* Valor principal */}
  <div className={styles.ticketValue}>
    <span className={netCash > 0 ? 'text-negative' : 'text-positive'}>
      {netCash > 0 ? '-' : '+'}${Math.abs(netCash).toFixed(2)}
    </span>
  </div>

  {/* Badge indicador */}
  <div className={`${styles.ticketBadge} ${netCash > 0 ? styles.pay : styles.receive}`}>
    {netCash > 0 ? 'PAGAR' : 'RECIBIR'}
  </div>
</div>
```

```css
.ticketFooter {
  background: var(--marble-base);
  box-shadow: var(--raised-2);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.ticketValue {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 2rem;
  font-weight: 600;
}

.ticketBadge {
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.ticketBadge.pay {
  background: var(--glass-bg);
  color: var(--quafi-negative);
  border: 1px solid var(--quafi-negative);
}

.ticketBadge.receive {
  background: var(--glass-bg);
  color: var(--quafi-positive);
  border: 1px solid var(--quafi-positive);
}
```

### 1.5 Tabs Flujo 1 / Flujo 2 → GLASS Tabs

```css
.tabContainer {
  background: var(--marble-base);
  box-shadow: var(--inset-1);
  border-radius: 12px;
  padding: 4px;
  display: flex;
  gap: 4px;
}

.tabItem {
  background: transparent;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
  color: var(--quafi-text-muted);
  cursor: pointer;
  transition: all var(--quafi-duration-fast) var(--quafi-ease-out);
}

.tabItem:hover {
  background: var(--glass-bg);
}

.tabItem[data-active="true"] {
  background: var(--marble-base);
  box-shadow: var(--raised-1);
  color: var(--quafi-text-primary);
}
```

---

## PARTE 2: Implementación de SIMULAR

### Vista general del flujo

```
Paso 1: Input           Paso 2: Normalización      Paso 3: Decisión
┌─────────────────┐     ┌─────────────────────┐    ┌─────────────────────┐
│  RAISED Card    │     │  RAISED Container   │    │  RAISED Container   │
│  ┌───────────┐  │     │  ┌───────────────┐  │    │  ┌───────┐ ┌─────┐  │
│  │INSET Input│  │ ──▶ │  │ INSET Alert   │  │ ──▶│  │Card A │ │Card │  │
│  └───────────┘  │     │  └───────────────┘  │    │  │       │ │  B  │  │
│  ┌───────────┐  │     │  ┌───────────────┐  │    │  │       │ │ ⭐  │  │
│  │INSET Opts │  │     │  │ INSET Table   │  │    │  └───────┘ └─────┘  │
│  └───────────┘  │     │  │ (BarChart)    │  │    └─────────────────────┘
│  ┌───────────┐  │     │  └───────────────┘  │
│  │GLASS CTA  │  │     │  ┌───────────────┐  │
│  └───────────┘  │     │  │ INSET Footer  │  │
└─────────────────┘     └───────────────────┘
```

### 2.1 Paso 1: Formulario de Parámetros

#### Input Numérico (Monto)

```css
.inputContainer {
  background: var(--marble-base);
  box-shadow: var(--inset-2);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
}

.inputPrefix {
  font-family: 'IBM Plex Mono', monospace;
  color: var(--quafi-text-muted);
  margin-right: 8px;
}

.inputField {
  background: transparent;
  border: none;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 1.5rem;
  color: var(--quafi-text-primary);
  text-align: right;
  flex: 1;
  outline: none;
}

.inputContainer:focus-within {
  box-shadow: var(--inset-2), 0 0 0 2px var(--quafi-accent);
}
```

#### Option Selector (Riesgo, Plazo)

```css
.optionGroup {
  background: var(--marble-base);
  box-shadow: var(--inset-1);
  border-radius: 12px;
  padding: 4px;
  display: flex;
  gap: 4px;
}

.optionItem {
  flex: 1;
  background: var(--glass-bg);
  backdrop-filter: blur(8px);
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: all var(--quafi-duration-fast) var(--quafi-ease-out);
}

.optionItem:hover {
  background: var(--glass-bg-hover);
}

.optionItem[data-selected="true"] {
  background: var(--marble-base);
  box-shadow: var(--raised-2);
  border-color: transparent;
}

.optionLabel {
  font-weight: 600;
  color: var(--quafi-text-primary);
  margin-bottom: 4px;
}

.optionDescription {
  font-size: 0.75rem;
  color: var(--quafi-text-muted);
}
```

#### Botón CTA "Analizar Mercado"

```css
.ctaButton {
  background: var(--quafi-accent);
  box-shadow: var(--raised-2);
  border: none;
  border-radius: 12px;
  padding: 20px 40px;
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: var(--quafi-text-light);
  cursor: pointer;
  transition: all var(--quafi-duration-fast) var(--quafi-ease-out);
}

.ctaButton:hover {
  box-shadow: var(--raised-3);
  transform: translateY(-1px);
}

.ctaButton:active {
  box-shadow: var(--raised-1);
  transform: translateY(0);
}

.ctaButton:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### 2.2 Loading Overlay

**Spec de Facu**: Overlay con blur + "Ejecutando Quafi Engine IA..."

```tsx
<div className={styles.loadingOverlay}>
  <div className={styles.loadingContent}>
    <QuafiEmblem size={80} animation="ripple" />
    <p className={styles.loadingText}>
      Ejecutando Quafi Engine...
    </p>
    <div className={styles.loadingSteps}>
      <span data-active={step >= 1}>Analizando mercado</span>
      <span data-active={step >= 2}>Optimizando pesos</span>
      <span data-active={step >= 3}>Normalizando cartera</span>
      <span data-active={step >= 4}>Proyectando flujos</span>
    </div>
  </div>
</div>
```

```css
.loadingOverlay {
  position: fixed;
  inset: 0;
  background: rgba(213, 216, 220, 0.8);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.loadingContent {
  background: var(--marble-base);
  box-shadow: var(--raised-4);
  border-radius: 24px;
  padding: 48px;
  text-align: center;
}

.loadingText {
  font-family: 'Libre Baskerville', serif;
  font-size: 1.25rem;
  color: var(--quafi-text-primary);
  margin-top: 24px;
}

.loadingSteps {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 24px;
}

.loadingSteps span {
  font-size: 0.875rem;
  color: var(--quafi-text-muted);
  transition: color var(--quafi-duration-fast);
}

.loadingSteps span[data-active="true"] {
  color: var(--quafi-accent);
}

.loadingSteps span[data-active="true"]::before {
  content: "✓ ";
  color: var(--quafi-positive);
}
```

### 2.3 Paso 2: Warning Box

**Spec de Facu**: Alerta si capital insuficiente

```css
.alertBox {
  background: var(--marble-base);
  box-shadow: var(--raised-2);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  gap: 16px;
  border-left: 4px solid var(--quafi-warning);
}

.alertBox[data-severity="error"] {
  border-left-color: var(--quafi-negative);
}

.alertBox[data-severity="success"] {
  border-left-color: var(--quafi-positive);
}

.alertBox[data-severity="info"] {
  border-left-color: var(--quafi-info);
}

.alertIcon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
}

.alertContent {
  flex: 1;
}

.alertTitle {
  font-weight: 600;
  color: var(--quafi-text-primary);
  margin-bottom: 4px;
}

.alertDescription {
  font-size: 0.875rem;
  color: var(--quafi-text-secondary);
}

.alertHighlight {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 600;
  color: var(--quafi-warning);
}
```

### 2.4 Paso 2: Tabla de Activos → BarChart + TreeMap

**Opción A: BarChart horizontal para nominales**

```tsx
const option = {
  yAxis: {
    type: 'category',
    data: tickers,
  },
  xAxis: {
    type: 'value',
  },
  series: [
    {
      type: 'bar',
      data: nominales.map((n, i) => ({
        value: n.subtotal,
        itemStyle: {
          color: n.qty === 0 ? 'var(--quafi-negative)' : 'var(--quafi-accent)',
          opacity: n.qty === 0 ? 0.5 : 1,
        }
      })),
      label: {
        show: true,
        position: 'right',
        formatter: (params) => `${params.data.qty} u. · $${params.value}`,
      }
    }
  ]
};
```

**Opción B: TreeMap para visualizar allocation**

```tsx
// TreeMap muestra proporción visual de cada activo
const option = {
  series: [{
    type: 'treemap',
    data: portfolio.map(p => ({
      name: p.ticker,
      value: p.subtotal,
      itemStyle: {
        color: p.qty === 0 ? 'var(--quafi-negative)' : undefined,
      }
    })),
    label: {
      formatter: '{b}\n{c}',
    },
    breadcrumb: { show: false },
  }]
};
```

### 2.5 Paso 2: Footer Financiero

```css
.financialFooter {
  background: var(--marble-base);
  box-shadow: var(--inset-2);
  border-radius: 16px;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.footerItem {
  text-align: center;
}

.footerLabel {
  font-size: 0.75rem;
  color: var(--quafi-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}

.footerValue {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 1.5rem;
  font-weight: 600;
}

.footerValue.invested {
  color: var(--quafi-text-primary);
}

.footerValue.remnant {
  color: var(--quafi-positive);
}
```

### 2.6 Paso 3: Cards Comparativas → RadarChart + Métricas

**Spec de Facu**: Opción A (Inyección) vs Opción B (Sustitución)

```tsx
<div className={styles.comparisonGrid}>
  {/* Card A */}
  <div className={styles.comparisonCard}>
    <div className={styles.cardHeader}>
      <h3>Inyección</h3>
      <p>Mantener cartera + comprar nuevos</p>
    </div>

    {/* RadarChart para métricas */}
    <RadarChart
      data={[
        { name: 'Retorno', before: 5.2, after: 7.8 },
        { name: 'Volatilidad', before: 12, after: 14 },
        { name: 'Sharpe', before: 0.8, after: 1.1 },
        { name: 'Diversificación', before: 0.6, after: 0.75 },
      ]}
    />

    {/* Métricas detalladas */}
    <div className={styles.metricsGrid}>
      <MetricRow label="Retorno Esperado" before="5.2%" after="7.8%" positive />
      <MetricRow label="Volatilidad" before="12%" after="14%" negative />
      <MetricRow label="Sharpe Ratio" before="0.8" after="1.1" positive />
    </div>

    <div className={styles.cardFooter}>
      <span className={styles.netLabel}>Neto a invertir:</span>
      <span className={styles.netValue}>$5,000.00</span>
    </div>
  </div>

  {/* Card B - Recomendada */}
  <div className={`${styles.comparisonCard} ${styles.recommended}`}>
    <div className={styles.recommendedBadge}>Recomendado</div>
    <div className={styles.cardHeader}>
      <h3>Sustitución</h3>
      <p>Vender todo + comprar cartera óptima</p>
    </div>

    <RadarChart data={...} />

    <div className={styles.metricsGrid}>
      ...
    </div>

    <div className={styles.cardFooter}>
      <span className={styles.netLabel}>Neto a invertir:</span>
      <span className={styles.netValue}>$2,450.00</span>
    </div>
  </div>
</div>
```

```css
.comparisonGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.comparisonCard {
  background: var(--marble-base);
  box-shadow: var(--raised-2);
  border-radius: 20px;
  padding: 24px;
  position: relative;
  transition: all var(--quafi-duration-normal) var(--quafi-ease-out);
}

.comparisonCard:hover {
  box-shadow: var(--raised-3);
}

.comparisonCard.recommended {
  box-shadow: var(--raised-3), 0 0 0 2px var(--quafi-accent);
}

.recommendedBadge {
  position: absolute;
  top: -12px;
  right: 24px;
  background: var(--quafi-accent);
  color: var(--quafi-text-light);
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.cardHeader h3 {
  font-family: 'Libre Baskerville', serif;
  font-size: 1.25rem;
  margin-bottom: 4px;
}

.cardHeader p {
  font-size: 0.875rem;
  color: var(--quafi-text-muted);
}
```

### 2.7 Metric Row (Antes → Después)

```tsx
const MetricRow = ({ label, before, after, positive }) => (
  <div className={styles.metricRow}>
    <span className={styles.metricLabel}>{label}</span>
    <span className={styles.metricBefore}>{before}</span>
    <span className={styles.metricArrow}>→</span>
    <span className={`${styles.metricAfter} ${positive ? 'text-positive' : 'text-negative'}`}>
      {after}
    </span>
  </div>
);
```

```css
.metricRow {
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  gap: 12px;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--glass-border);
}

.metricLabel {
  font-size: 0.875rem;
  color: var(--quafi-text-secondary);
}

.metricBefore {
  font-family: 'IBM Plex Mono', monospace;
  color: var(--quafi-text-muted);
}

.metricArrow {
  color: var(--quafi-text-muted);
}

.metricAfter {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 600;
}
```

---

## PARTE 3: Visualizaciones con ECharts

### 3.1 Rebalanceo como SankeyChart

Muestra el flujo de dinero: de qué activos sale → a cuáles va.

```tsx
const option = {
  series: [{
    type: 'sankey',
    data: [
      { name: 'AAPL (vender)' },
      { name: 'MSFT (vender)' },
      { name: 'Cash' },
      { name: 'NVDA (comprar)' },
      { name: 'GOOGL (comprar)' },
    ],
    links: [
      { source: 'AAPL (vender)', target: 'Cash', value: 2500 },
      { source: 'MSFT (vender)', target: 'Cash', value: 1500 },
      { source: 'Cash', target: 'NVDA (comprar)', value: 3000 },
      { source: 'Cash', target: 'GOOGL (comprar)', value: 1000 },
    ],
    emphasis: { focus: 'adjacency' },
  }]
};
```

### 3.2 Monte Carlo como LineChart con áreas

```tsx
const option = {
  xAxis: { type: 'category', data: months },
  yAxis: { type: 'value' },
  series: [
    // Banda pesimista (área inferior)
    {
      type: 'line',
      data: pessimistic,
      areaStyle: { color: 'rgba(var(--quafi-negative-rgb), 0.1)' },
      lineStyle: { opacity: 0 },
      stack: 'confidence',
    },
    // Banda optimista (área superior)
    {
      type: 'line',
      data: optimistic.map((v, i) => v - pessimistic[i]),
      areaStyle: { color: 'rgba(var(--quafi-positive-rgb), 0.15)' },
      lineStyle: { opacity: 0 },
      stack: 'confidence',
    },
    // Línea central (valor esperado)
    {
      type: 'line',
      data: expected,
      lineStyle: { color: 'var(--quafi-accent)', width: 2 },
      symbol: 'none',
    }
  ]
};
```

### 3.3 Correlación como HeatMap

```tsx
const option = {
  xAxis: { type: 'category', data: tickers },
  yAxis: { type: 'category', data: tickers },
  visualMap: {
    min: -1,
    max: 1,
    inRange: {
      color: [
        'var(--quafi-negative)', // -1
        'var(--marble-base)',     // 0
        'var(--quafi-positive)'   // +1
      ]
    }
  },
  series: [{
    type: 'heatmap',
    data: correlationMatrix,
    label: { show: true, formatter: '{c}' }
  }]
};
```

### 3.4 KPIs como GaugeChart

```tsx
// Sharpe Ratio
const sharpeOption = {
  series: [{
    type: 'gauge',
    min: 0,
    max: 3,
    progress: { show: true },
    axisLine: {
      lineStyle: {
        width: 10,
        color: [
          [0.33, 'var(--quafi-negative)'],
          [0.66, 'var(--quafi-warning)'],
          [1, 'var(--quafi-positive)']
        ]
      }
    },
    pointer: { show: false },
    detail: {
      valueAnimation: true,
      formatter: '{value}',
    },
    data: [{ value: sharpeRatio }]
  }]
};
```

---

## PARTE 4: Patrones de animación

### 4.1 Entrada de elementos

```tsx
// Contenedor con stagger
<div data-animate-stagger>
  <div data-animate="emerge">Ticker 1</div>
  <div data-animate="emerge">Ticker 2</div>
  <div data-animate="emerge">Ticker 3</div>
</div>

// Hook para trigger
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  });

  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });
}, []);
```

### 4.2 Feedback de cambio de valor

```tsx
const ValueDisplay = ({ value, previousValue }) => {
  const [flash, setFlash] = useState(null);

  useEffect(() => {
    if (value > previousValue) {
      setFlash('positive');
    } else if (value < previousValue) {
      setFlash('negative');
    }

    const timer = setTimeout(() => setFlash(null), 1000);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <span className={flash ? `quafi-animate-value-flash-${flash}` : ''}>
      {value}
    </span>
  );
};
```

### 4.3 Loading shimmer

```css
.skeleton {
  background: var(--marble-base);
  box-shadow: var(--inset-1);
  border-radius: 8px;
  overflow: hidden;
}

.skeleton::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--marble-light) 50%,
    transparent 100%
  );
  animation: quafi-shimmer 2s infinite;
}
```

---

## Checklist de aplicación

### Para cada pantalla:

- [ ] **Estructura**: Definir jerarquía RAISED → INSET → GLASS
- [ ] **Charts**: Elegir tipo de EChart apropiado
- [ ] **Animaciones**: Definir entrada y feedback
- [ ] **Letterpress**: Aplicar a títulos y valores destacados
- [ ] **Colores semánticos**: Usar positive/negative/warning correctamente
- [ ] **Tipografía**: DM Sans (UI), IBM Plex Mono (data), Libre Baskerville (display)

### Tokens a usar:

```css
/* Shadows */
var(--raised-1) a var(--raised-5)
var(--inset-1) a var(--inset-5)
var(--glass-bg), var(--glass-bg-hover), var(--glass-border)

/* Colors */
var(--marble-base), var(--marble-light), var(--marble-dark)
var(--quafi-accent), var(--quafi-positive), var(--quafi-negative), var(--quafi-warning)

/* Letterpress */
var(--lp-primary), var(--lp-positive), var(--lp-negative), var(--lp-accent)

/* Animations */
var(--quafi-duration-fast), var(--quafi-duration-normal), var(--quafi-duration-slow)
var(--quafi-ease-out), var(--quafi-ease-bounce)
```

---

*Documento creado: 2026-03-02*
*Este documento reemplaza UI_COMPONENTS_GAP_ANALYSIS.md con enfoque de aplicación*
