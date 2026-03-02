# Plan de Implementación UI — Calibrar & Simular

> Plan estructurado por fases para implementar las interfaces de los módulos Calibrar y Simular aplicando el design system QUAFI.

---

## Estructura del plan

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              FASES DE IMPLEMENTACIÓN                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  FASE 0: Fundamentos                                                        │
│  └── Tokens CSS faltantes + utilidades base                                 │
│                                                                             │
│  FASE 1: Primitivos visuales                                                │
│  └── Estilos CSS para inputs, selectors, alerts, badges                     │
│                                                                             │
│  FASE 2: CALIBRAR — Panel de configuración                                  │
│  └── Left panel: tickers, parámetros, controles                             │
│                                                                             │
│  FASE 3: CALIBRAR — Panel de resultados                                     │
│  └── Right panel: matriz de rebalanceo, charts, footer                      │
│                                                                             │
│  FASE 4: SIMULAR — Paso 1 (Input)                                           │
│  └── Formulario: monto, riesgo, plazo + loading overlay                     │
│                                                                             │
│  FASE 5: SIMULAR — Paso 2 (Normalización)                                   │
│  └── Alert, tabla de activos, footer financiero                             │
│                                                                             │
│  FASE 6: SIMULAR — Paso 3 (Decisión)                                        │
│  └── Cards comparativas A vs B + métricas                                   │
│                                                                             │
│  FASE 7: Integración y polish                                               │
│  └── Animaciones, transiciones, responsive, QA                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Protocolo de sesión

### Al INICIAR cada sesión:

```
1. Leer este archivo (IMPLEMENTATION_PLAN.md)
2. Leer el checkpoint de la fase anterior (si existe)
3. Leer UI_IMPLEMENTATION_GUIDE.md para contexto de diseño
4. Leer CLAUDE.md sección "Stone Marble" para reglas de jerarquía
5. Confirmar con Rafa: "Vamos con Fase N?"
```

### Al FINALIZAR cada sesión:

```
1. Verificar que todo compila (npm run build)
2. Actualizar este archivo marcando [x] los items completados
3. Escribir checkpoint en _workspace/checkpoints/fase-N.md
4. Commit con mensaje: "feat(ui): complete phase N — [descripción]"
5. Push a branch feature/ui-implementation
```

---

## Referencias rápidas del Design System

### Jerarquía Stone Marble (MEMORIZAR)

```
FONDO (#d5d8dc) → RAISED → INSET → GLASS
                    ↓         ↓        ↓
              containers  secciones  items
```

**NUNCA**: Mismo nivel dentro de mismo nivel
**SIEMPRE**: Alternar niveles

### Tokens más usados

```css
/* Shadows */
--raised-1, --raised-2, --raised-3    /* Containers */
--inset-1, --inset-2, --inset-3       /* Secciones */
--glass-bg, --glass-bg-hover          /* Items */

/* Colors */
--marble-base: #d5d8dc                /* Fondo */
--quafi-accent: #3a6a72               /* Petrol */
--quafi-positive: #4a7a6a             /* Jade */
--quafi-negative: #8a5a4a             /* Rust */
--quafi-warning: #a08a4a              /* Gold */

/* Typography */
--sentinel-font-primary: 'DM Sans'    /* UI */
--sentinel-font-mono: 'IBM Plex Mono' /* Data */
--sentinel-font-display: 'Libre Baskerville' /* Headlines */

/* Letterpress */
--lp-primary, --lp-positive, --lp-negative, --lp-accent

/* Animation */
--quafi-duration-fast: 150ms
--quafi-duration-normal: 250ms
--quafi-ease-out: cubic-bezier(0.16, 1, 0.3, 1)
```

### ECharts disponibles

```
BarChart, LineChart, PieChart, GaugeChart, RadarChart,
TreeMap, HeatMap, SankeyChart, BoxplotChart, FunnelChart
```

---

## FASE 0: Fundamentos

**Objetivo**: Agregar tokens CSS faltantes y utilidades base

**Duración estimada**: 1 sesión

### Checklist

- [ ] **0.1** Crear `src/styles/spacing.css`
  ```css
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;
  --space-4: 16px;  --space-5: 20px;  --space-6: 24px;
  --space-7: 32px;  --space-8: 40px;  --space-9: 48px;
  --space-10: 64px;
  ```

- [ ] **0.2** Crear `src/styles/forms.css`
  - Variables para inputs: height, padding, border-radius
  - Variables para focus ring
  - Variables para estados (error, success, disabled)

- [ ] **0.3** Crear `src/styles/badges.css`
  - Variables para padding, font-size, border-radius
  - Clases para variantes: solid, outline
  - Clases para colores semánticos

- [ ] **0.4** Actualizar `src/styles/index.css`
  - Importar nuevos archivos CSS

- [ ] **0.5** Crear showcase para nuevos tokens
  - `/showcase/styles/spacing`
  - `/showcase/styles/forms`
  - `/showcase/styles/badges`

### Archivos a crear/modificar

```
src/styles/
├── spacing.css          [CREAR]
├── forms.css            [CREAR]
├── badges.css           [CREAR]
└── index.css            [MODIFICAR - agregar imports]

src/pages/styles/
├── SpacingShowcase.tsx  [CREAR o MODIFICAR si existe]
├── FormsShowcase.tsx    [CREAR]
└── BadgesShowcase.tsx   [CREAR]
```

### Criterio de completitud

- [ ] Build exitoso
- [ ] Showcases funcionando
- [ ] Variables CSS accesibles globalmente

### Checkpoint

```markdown
# Fase 0 — Checkpoint

## Completado
- [lista de items]

## Tokens agregados
- [lista de variables CSS nuevas]

## Archivos creados/modificados
- [lista]

## Notas para siguiente fase
- [observaciones]
```

---

## FASE 1: Primitivos visuales

**Objetivo**: Crear estilos CSS reutilizables para elementos UI comunes

**Duración estimada**: 1 sesión

**Dependencias**: Fase 0 completada

### Checklist

- [ ] **1.1** Crear `src/styles/inputs.css`
  ```css
  .quafi-input { /* INSET container */ }
  .quafi-input:focus-within { /* Focus ring */ }
  .quafi-input[data-error] { /* Error state */ }
  .quafi-input-field { /* Campo interno */ }
  .quafi-input-prefix { /* Símbolo moneda */ }
  ```

- [ ] **1.2** Crear `src/styles/selectors.css`
  ```css
  .quafi-option-group { /* INSET container */ }
  .quafi-option-item { /* GLASS item */ }
  .quafi-option-item[data-selected] { /* RAISED when selected */ }
  ```

- [ ] **1.3** Crear `src/styles/switches.css`
  ```css
  .quafi-switch-track { /* INSET track */ }
  .quafi-switch-thumb { /* RAISED thumb */ }
  .quafi-switch-track[data-state="on"] { /* Active color */ }
  ```

- [ ] **1.4** Crear `src/styles/alerts.css`
  ```css
  .quafi-alert { /* RAISED con border-left */ }
  .quafi-alert[data-severity="warning"] { /* Gold border */ }
  .quafi-alert[data-severity="error"] { /* Rust border */ }
  .quafi-alert[data-severity="success"] { /* Jade border */ }
  .quafi-alert[data-severity="info"] { /* Steel border */ }
  ```

- [ ] **1.5** Crear `src/styles/tabs.css`
  ```css
  .quafi-tabs { /* INSET container */ }
  .quafi-tab { /* GLASS item */ }
  .quafi-tab[data-active] { /* RAISED when active */ }
  ```

- [ ] **1.6** Actualizar index.css con imports

- [ ] **1.7** Crear FormsShowcase.tsx unificado
  - Sección: Inputs
  - Sección: Option Selectors
  - Sección: Switches
  - Sección: Alerts
  - Sección: Tabs

### Archivos a crear/modificar

```
src/styles/
├── inputs.css           [CREAR]
├── selectors.css        [CREAR]
├── switches.css         [CREAR]
├── alerts.css           [CREAR]
├── tabs.css             [CREAR]
└── index.css            [MODIFICAR]

src/pages/styles/
└── FormsShowcase.tsx    [CREAR - showcase unificado]
```

### Criterio de completitud

- [ ] Build exitoso
- [ ] Showcase con todos los estados visualizados
- [ ] Clases CSS funcionando standalone (sin JS)

### Checkpoint

```markdown
# Fase 1 — Checkpoint

## Completado
- [lista]

## Clases CSS creadas
- [lista con descripción]

## Patrones de uso
- [ejemplos de HTML]

## Notas para siguiente fase
- [observaciones]
```

---

## FASE 2: CALIBRAR — Panel de configuración

**Objetivo**: Implementar el panel izquierdo de Calibrar

**Duración estimada**: 1-2 sesiones

**Dependencias**: Fase 1 completada

### Contexto de Facu

```
Panel izquierdo de Calibrar:
- Lista de tickers del portfolio actual
- Sliders para parámetros α₁, α₂, β
- Selector de benchmark
- Input de capital total
- Botón "Ejecutar análisis"
- Tabs: Flujo 1 (Basic) / Flujo 2 (Pro)
- En Flujo 2: Switches para oportunidades/lastres
```

### Checklist

- [ ] **2.1** Crear estructura de layout
  ```
  RAISED container
  └── INSET: Tabs (Basic / Pro)
  └── INSET: Ticker List
      └── GLASS: Ticker items
  └── INSET: Parameters
      └── GLASS: Sliders α₁, α₂, β
  └── INSET: Config
      └── GLASS: Benchmark selector
      └── GLASS: Capital input
  └── RAISED: CTA Button
  ```

- [ ] **2.2** Implementar ticker list
  - Diseño de item: ticker + precio + peso actual
  - Estado: seleccionado / no seleccionado
  - Animación: emerge stagger al cargar

- [ ] **2.3** Implementar parameter sliders
  - Usar range input estilizado con INSET track
  - Labels con valores actuales
  - Reset button

- [ ] **2.4** Implementar benchmark selector
  - Option group horizontal: SPY, QQQ, IWM, DIA
  - Estado visual de selección

- [ ] **2.5** Implementar capital input
  - Input numérico con prefix "$"
  - Formato con separadores de miles

- [ ] **2.6** Implementar tabs Basic/Pro
  - Usando clases de tabs.css

- [ ] **2.7** Implementar switches de Flujo 2 (Pro)
  - Sección "Oportunidades" con switches para agregar
  - Sección "Lastres" con switches para quitar
  - Badge contador de cambios pendientes

- [ ] **2.8** Implementar CTA button
  - Estado normal, hover, loading
  - Integración con loading overlay (Fase 4)

### Archivos a crear/modificar

```
src/pages/app/CalibrateView/
├── CalibrateView.tsx           [MODIFICAR layout]
├── CalibrateView.module.css    [MODIFICAR estilos]
├── components/
│   ├── ConfigPanel.tsx         [CREAR]
│   ├── ConfigPanel.module.css  [CREAR]
│   ├── TickerList.tsx          [CREAR]
│   ├── ParameterSliders.tsx    [CREAR]
│   ├── BenchmarkSelector.tsx   [CREAR]
│   └── OpportunitySwitches.tsx [CREAR]
```

### Criterio de completitud

- [ ] Build exitoso
- [ ] Panel renderiza correctamente
- [ ] Jerarquía RAISED→INSET→GLASS respetada
- [ ] Interacciones funcionan (selección, sliders, switches)
- [ ] Animaciones de entrada aplicadas

### Checkpoint

```markdown
# Fase 2 — Checkpoint

## Completado
- [lista]

## Componentes creados
- [lista con props]

## Estado manejado
- [qué datos se trackean]

## Pendiente para Fase 3
- [integración con panel de resultados]
```

---

## FASE 3: CALIBRAR — Panel de resultados

**Objetivo**: Implementar el panel derecho de Calibrar (matriz + charts)

**Duración estimada**: 1-2 sesiones

**Dependencias**: Fase 2 completada

### Contexto de Facu

```
Panel derecho de Calibrar:
- Matriz de Rebalanceo (7 columnas):
  Activo | % Actual | % Target | T. Actual | T. Target | Operación | Monto
- Performance chart (antes vs después)
- Allocation pie chart
- Footer "The Ticket" (neto de caja)
```

### Checklist

- [ ] **3.1** Crear estructura de layout
  ```
  RAISED container
  └── INSET: Performance Chart
      └── LineChart (ECharts)
  └── INSET: Matriz de Rebalanceo
      └── BarChart horizontal (ECharts)
  └── INSET: Allocation
      └── PieChart (ECharts)
  └── RAISED: Footer "The Ticket"
  ```

- [ ] **3.2** Implementar Performance Chart
  - LineChart con 2 series: cartera actual vs optimizada
  - Área bajo la curva para diferencia
  - Tooltip con métricas

- [ ] **3.3** Implementar Matriz de Rebalanceo
  - BarChart horizontal comparativo
  - % Actual (gris) vs % Target (petrol)
  - Tooltip con: T. Actual, T. Target, Operación, Monto
  - Animación al recalcular

- [ ] **3.4** Implementar Allocation Chart
  - PieChart donut
  - Labels con ticker + porcentaje
  - Colores de la paleta QUAFI

- [ ] **3.5** Implementar Footer "The Ticket"
  - Valor neto grande con color semántico
  - Badge PAGAR / RECIBIR
  - Mini GaugeChart opcional

- [ ] **3.6** Implementar SankeyChart (opcional/bonus)
  - Visualizar flujo: de dónde sale → a dónde va

- [ ] **3.7** Conectar con panel de configuración
  - Cuando cambian parámetros → recalcular
  - Loading state durante cálculo
  - Animación de transición en charts

### Archivos a crear/modificar

```
src/pages/app/CalibrateView/
├── components/
│   ├── ResultsPanel.tsx         [CREAR]
│   ├── ResultsPanel.module.css  [CREAR]
│   ├── PerformanceChart.tsx     [CREAR]
│   ├── RebalanceMatrix.tsx      [CREAR]
│   ├── AllocationChart.tsx      [CREAR]
│   ├── TicketFooter.tsx         [CREAR]
│   └── RebalanceFlow.tsx        [CREAR - Sankey opcional]
```

### Criterio de completitud

- [ ] Build exitoso
- [ ] Charts renderizan con tema QUAFI
- [ ] Datos fluyen desde config panel
- [ ] Animaciones de entrada y actualización
- [ ] Footer muestra cálculo correcto

### Checkpoint

```markdown
# Fase 3 — Checkpoint

## Completado
- [lista]

## Charts implementados
- [lista con configuración usada]

## Flujo de datos
- [cómo se conectan los paneles]

## Performance
- [observaciones sobre render]
```

---

## FASE 4: SIMULAR — Paso 1 (Input)

**Objetivo**: Implementar el formulario inicial de Simular

**Duración estimada**: 1 sesión

**Dependencias**: Fase 1 completada

### Contexto de Facu

```
Paso 1 de Simular:
- Input: Monto a invertir
- Selector: Perfil de riesgo (Conservador / Moderado / Agresivo)
- Selector: Plazo (Corto 1y / Medio 3y / Largo 5y+)
- Botón: "Analizar Mercado"
- Loading overlay con QuafiEmblem
```

### Checklist

- [ ] **4.1** Crear estructura de layout
  ```
  RAISED card central
  └── Header con título + descripción
  └── INSET: Monto input
  └── INSET: Riesgo selector (3 opciones)
  └── INSET: Plazo selector (3 opciones)
  └── CTA Button
  ```

- [ ] **4.2** Implementar formulario
  - Input de monto con validación
  - Option selectors con iconos/descripciones
  - Estado de formulario (válido/inválido)

- [ ] **4.3** Implementar Loading Overlay
  - Backdrop blur
  - QuafiEmblem con animation="ripple"
  - Texto dinámico por pasos:
    1. "Analizando mercado..."
    2. "Optimizando pesos..."
    3. "Normalizando cartera..."
    4. "Proyectando flujos..."
  - Indicador de progreso

- [ ] **4.4** Conectar con navegación
  - On submit → mostrar loading → navegar a Paso 2

- [ ] **4.5** Animaciones de entrada
  - Card emerge
  - Inputs con stagger

### Archivos a crear/modificar

```
src/pages/app/SimulateView/
├── SimulateView.tsx             [CREAR o MODIFICAR]
├── SimulateView.module.css      [CREAR o MODIFICAR]
├── components/
│   ├── Step1Form.tsx            [CREAR]
│   ├── Step1Form.module.css     [CREAR]
│   ├── LoadingOverlay.tsx       [CREAR]
│   └── LoadingOverlay.module.css [CREAR]
```

### Criterio de completitud

- [ ] Build exitoso
- [ ] Formulario valida correctamente
- [ ] Loading overlay funciona
- [ ] Animaciones aplicadas
- [ ] Navegación a Paso 2

### Checkpoint

```markdown
# Fase 4 — Checkpoint

## Completado
- [lista]

## Validaciones implementadas
- [reglas]

## Loading overlay
- [estados y textos]

## Navegación
- [cómo se pasa a Paso 2]
```

---

## FASE 5: SIMULAR — Paso 2 (Normalización)

**Objetivo**: Implementar la vista de normalización de mercado

**Duración estimada**: 1-2 sesiones

**Dependencias**: Fase 4 completada

### Contexto de Facu

```
Paso 2 de Simular:
- Warning box si capital insuficiente
- Tabla de activos: Ticker | Peso % | Precio | Nominales | Subtotal
- Filas con qty=0 resaltadas en rojo
- Footer: Total Invertido + Remanente (Cash Drag)
- Acciones: eliminar activo, agregar activo → recalcula
```

### Checklist

- [ ] **5.1** Crear estructura de layout
  ```
  RAISED container
  └── RAISED: Alert (si hay warnings)
  └── INSET: Tabla de activos
      └── TreeMap o BarChart
  └── INSET: Footer financiero
  └── Navigation buttons
  ```

- [ ] **5.2** Implementar Alert Box
  - Usando clases de alerts.css
  - Mostrar si: capital insuficiente o exclusiones
  - Contenido: mínimo requerido + activo constraint

- [ ] **5.3** Implementar tabla de activos
  - Opción A: BarChart horizontal
  - Opción B: TreeMap para visualizar proporciones
  - Resaltar filas con qty=0

- [ ] **5.4** Implementar acciones de fila
  - Botón eliminar (X) en hover
  - Recalcula pesos y nominales
  - Animación de salida

- [ ] **5.5** Implementar "agregar activo"
  - Modal o drawer con búsqueda
  - Seleccionar → agregar a lista
  - Recalcular todo

- [ ] **5.6** Implementar footer financiero
  - Grid: Total Invertido | Remanente
  - Remanente en color positive

- [ ] **5.7** Animaciones
  - Actualización de valores con flash
  - Entrada/salida de filas

### Archivos a crear/modificar

```
src/pages/app/SimulateView/
├── components/
│   ├── Step2Normalization.tsx     [CREAR]
│   ├── Step2Normalization.module.css [CREAR]
│   ├── AssetTable.tsx             [CREAR]
│   ├── FinancialFooter.tsx        [CREAR]
│   └── AddAssetModal.tsx          [CREAR]
```

### Criterio de completitud

- [ ] Build exitoso
- [ ] Alert muestra condicionalmente
- [ ] Tabla visualiza datos correctamente
- [ ] Acciones recalculan en tiempo real
- [ ] Footer actualiza correctamente

### Checkpoint

```markdown
# Fase 5 — Checkpoint

## Completado
- [lista]

## Lógica de recálculo
- [cómo funciona]

## Estados de warning
- [cuándo aparece cada uno]

## Pendiente para Fase 6
- [datos que pasan a decisión]
```

---

## FASE 6: SIMULAR — Paso 3 (Decisión)

**Objetivo**: Implementar la vista de decisión dual (A vs B)

**Duración estimada**: 1-2 sesiones

**Dependencias**: Fase 5 completada

### Contexto de Facu

```
Paso 3 de Simular:
- Card A: Inyección (mantener + comprar)
- Card B: Sustitución (vender todo + comprar óptima) ← Recomendada
- Cada card muestra:
  - Métricas Antes → Después
  - RadarChart comparativo
  - Neto a invertir
- Badge "Recomendado" en card B
```

### Checklist

- [ ] **6.1** Crear estructura de layout
  ```
  RAISED container
  └── Header explicativo
  └── Grid 2 columnas
      └── RAISED: Card A (Inyección)
      └── RAISED: Card B (Sustitución) + badge
  └── Navigation / Confirm buttons
  ```

- [ ] **6.2** Implementar Card comparativa
  - Header: título + descripción
  - RadarChart para métricas múltiples
  - Lista de métricas Antes → Después
  - Footer: Neto a invertir

- [ ] **6.3** Implementar RadarChart
  - Ejes: Retorno, Volatilidad, Sharpe, Diversificación, etc.
  - 2 series: Antes (gris) vs Después (color)
  - Animación de transición

- [ ] **6.4** Implementar Metric Rows
  - Grid: Label | Antes | → | Después
  - Color semántico según mejora/empeora

- [ ] **6.5** Implementar selección de card
  - Click en card → estado seleccionado
  - Borde de acento + elevación mayor

- [ ] **6.6** Implementar badge "Recomendado"
  - Posición absoluta en header de card B
  - Estilo pill con color accent

- [ ] **6.7** Implementar confirmación
  - Botón "Confirmar selección"
  - Resumen de la acción elegida
  - Navegación a siguiente paso o dashboard

### Archivos a crear/modificar

```
src/pages/app/SimulateView/
├── components/
│   ├── Step3Decision.tsx         [CREAR]
│   ├── Step3Decision.module.css  [CREAR]
│   ├── ComparisonCard.tsx        [CREAR]
│   ├── MetricsRadar.tsx          [CREAR]
│   └── MetricRow.tsx             [CREAR]
```

### Criterio de completitud

- [ ] Build exitoso
- [ ] Cards muestran datos correctos
- [ ] RadarChart renderiza comparación
- [ ] Selección funciona
- [ ] Badge "Recomendado" visible

### Checkpoint

```markdown
# Fase 6 — Checkpoint

## Completado
- [lista]

## Métricas mostradas
- [lista de métricas en radar y rows]

## Flujo de confirmación
- [qué pasa después de seleccionar]

## Integración con backend
- [endpoints necesarios]
```

---

## FASE 7: Integración y polish

**Objetivo**: Unificar todo, agregar animaciones finales, responsive, QA

**Duración estimada**: 1-2 sesiones

**Dependencias**: Fases 2-6 completadas

### Checklist

- [ ] **7.1** Integración de flujos
  - Calibrar: config → resultados → ejecutar
  - Simular: paso 1 → paso 2 → paso 3 → confirmar

- [ ] **7.2** Transiciones entre pasos
  - Slide left/right entre pasos de Simular
  - Fade en cambios de Calibrar

- [ ] **7.3** Responsive
  - Breakpoints: mobile (< 768px), tablet (768-1024px), desktop (> 1024px)
  - Stack vertical en mobile
  - Ajuste de charts

- [ ] **7.4** Estados de error
  - Error de red → Alert con retry
  - Error de validación → Highlight de campos
  - Error de backend → Mensaje explicativo

- [ ] **7.5** Loading states
  - Skeleton para datos iniciales
  - Shimmer en charts mientras cargan

- [ ] **7.6** Accessibility
  - Focus management
  - Keyboard navigation
  - ARIA labels

- [ ] **7.7** Performance
  - Lazy loading de charts
  - Memoización de cálculos
  - Debounce en inputs

- [ ] **7.8** QA final
  - Test en Chrome, Firefox, Safari
  - Test en mobile (iOS, Android)
  - Verificar todos los estados

### Archivos a modificar

```
Todos los archivos de Fases 2-6:
- Agregar media queries
- Agregar estados de error
- Optimizar renders
```

### Criterio de completitud

- [ ] Build exitoso en prod mode
- [ ] Sin warnings en consola
- [ ] Funciona en todos los breakpoints
- [ ] Todos los estados manejados
- [ ] Performance aceptable (< 3s load)

### Checkpoint final

```markdown
# Fase 7 — Checkpoint Final

## Estado del proyecto
- [resumen general]

## Componentes creados
- [lista completa]

## Rutas implementadas
- [lista de rutas]

## Pendiente / Backlog
- [features para futuro]

## Métricas
- [performance, bundle size, etc.]
```

---

## Estructura de checkpoints

Crear carpeta `_workspace/checkpoints/` con:

```
_workspace/
└── checkpoints/
    ├── fase-0.md
    ├── fase-1.md
    ├── fase-2.md
    ├── fase-3.md
    ├── fase-4.md
    ├── fase-5.md
    ├── fase-6.md
    └── fase-7-final.md
```

### Template de checkpoint

```markdown
# Fase N — [Nombre]

**Fecha**: YYYY-MM-DD
**Sesión**: #N

## Resumen

[1-2 párrafos describiendo qué se hizo]

## Completado

- [x] Item 1
- [x] Item 2
- [ ] Item pendiente (movido a siguiente fase)

## Archivos creados

| Archivo | Descripción |
|---------|-------------|
| `path/file.tsx` | Descripción breve |

## Archivos modificados

| Archivo | Cambios |
|---------|---------|
| `path/file.tsx` | Qué se cambió |

## Tokens/Variables CSS nuevas

```css
--nombre: valor;
```

## Componentes creados

### ComponentName

```tsx
<ComponentName prop1="" prop2={} />
```

**Props**:
- `prop1`: descripción
- `prop2`: descripción

## Decisiones tomadas

1. **Decisión**: [qué se decidió]
   - **Razón**: [por qué]
   - **Alternativa descartada**: [qué otra opción había]

## Bugs conocidos / Deuda técnica

- [ ] Bug o deuda 1
- [ ] Bug o deuda 2

## Notas para siguiente sesión

[Contexto importante que necesita recordar la siguiente sesión]

## Commit

```
git commit -m "feat(ui): complete phase N — [descripción]"
```
```

---

## Estado actual

| Fase | Estado | Fecha inicio | Fecha fin |
|------|--------|--------------|-----------|
| 0 | ⏳ Pendiente | - | - |
| 1 | ⏳ Pendiente | - | - |
| 2 | ⏳ Pendiente | - | - |
| 3 | ⏳ Pendiente | - | - |
| 4 | ⏳ Pendiente | - | - |
| 5 | ⏳ Pendiente | - | - |
| 6 | ⏳ Pendiente | - | - |
| 7 | ⏳ Pendiente | - | - |

**Leyenda**: ⏳ Pendiente | 🔄 En progreso | ✅ Completado

---

*Plan creado: 2026-03-02*
*Última actualización: 2026-03-02*
