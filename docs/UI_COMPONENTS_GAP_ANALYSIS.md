# UI Components Gap Analysis

> Análisis de los componentes UI necesarios según specs de negocio vs design system actual.
> **Objetivo**: Identificar qué falta definir en el design system antes de maquetar.

---

## Fuentes de este análisis

| Documento | Contenido |
|-----------|-----------|
| `facu-documents/spec_calibrar.md` | Flujos y UI del módulo Calibrar |
| `facu-documents/spec_simular.md` | Flujos y UI del módulo Simular |
| `facu-documents/Quafi Math Engine.md` | Métricas financieras (Performance, Risk, Forecasting) |
| `CLAUDE.md` | Design system actual (Stone Marble Neumorphism) |

---

## Resumen ejecutivo

### Lo que YA existe en el design system

| Categoría | Elementos definidos |
|-----------|---------------------|
| **Fundamentos** | Paleta Natural Mineral, Tipografía (DM Sans, IBM Plex Mono, Libre Baskerville), Shadows (RAISED/INSET/GLASS), Letterpress |
| **Componentes base** | QuafiEmblem, QuafiWordmark, Sidebar, InsetContainer, MetricCard |
| **Charts** | 24 tipos ECharts con tema QUAFI |
| **Layouts** | QuafiDashboard, ShowcaseLayout |

### Lo que FALTA definir

| Categoría | Elementos pendientes |
|-----------|---------------------|
| **Data Display** | Tables, Progress Bars, Badges, Tags |
| **Forms** | Inputs, Selectors, Sliders, Toggles/Switches |
| **Feedback** | Alerts/Warnings, Loading states, Overlays |
| **Navigation** | Tabs, Steps/Wizard |
| **Layout** | Cards comparativas, Split views |

---

## PARTE 1: Componentes requeridos por CALIBRAR

### 1.1 Matriz de Rebalanceo (Tabla)

**Spec de Facu**: Tabla con 7 columnas específicas

```
| Activo | % Actual | % Target | T. Actual | T. Target | Operación | Monto ($) |
```

**Elementos UI necesarios**:

#### A. Table System
- [ ] **Table Container** — Contenedor INSET para la tabla
- [ ] **Table Header** — Row con tipografía label, separador visual
- [ ] **Table Row** — Altura consistente, hover state, borders sutiles
- [ ] **Table Cell** — Alineación (left/center/right), padding estándar

#### B. Progress Bar (para % Actual y % Target)
- [ ] **Progress Bar Base** — Contenedor INSET horizontal
- [ ] **Progress Fill** — Barra interna con color semántico
- [ ] **Progress Label** — Texto del porcentaje (posición: derecha o superpuesto)
- [ ] **Variantes de color**:
  - `neutral` — Gris (% Actual)
  - `primary` — Petrol (% Target)
  - `positive` — Jade (ganancia)
  - `negative` — Rust (pérdida)

#### C. Badge System (para T. Actual y T. Target)
- [ ] **Badge Container** — Pequeño, pill-shaped
- [ ] **Variantes**:
  - `solid-neutral` — Fondo gris sólido (T. Actual: `10 u.`)
  - `outline-primary` — Borde petrol, fondo transparente (T. Target: `15 u.`)
  - `solid-positive` — Fondo jade (confirmación)
  - `solid-negative` — Fondo rust (alerta)

#### D. Delta Display (para Operación)
- [ ] **Formato**: `+5` o `-2` con signo explícito
- [ ] **Colores**:
  - Positivo → `--quafi-positive` (Jade) + letterpress
  - Negativo → `--quafi-negative` (Rust) + letterpress
  - Neutral → `--quafi-text-muted`

#### E. Currency Display (para Monto)
- [ ] **Formato**: `$2,250.00` o `-$1,500.00`
- [ ] **Tipografía**: IBM Plex Mono
- [ ] **Alineación**: Right
- [ ] **Colores**: Mismo sistema que Delta Display

### 1.2 Switches para Oportunidades/Lastres

**Spec de Facu**: Usuario activa/desactiva con switches, cambios se encolan

#### F. Toggle/Switch Component
- [ ] **Switch Track** — Contenedor INSET pill horizontal
- [ ] **Switch Thumb** — Círculo RAISED que se mueve
- [ ] **Estados**:
  - `off` — Thumb izquierda, track neutral
  - `on` — Thumb derecha, track con color semántico
  - `disabled` — Opacity reducida
- [ ] **Variantes semánticas**:
  - `default` — Petrol cuando ON
  - `positive` — Jade cuando ON (agregar oportunidad)
  - `negative` — Rust cuando ON (quitar lastre)

### 1.3 Footer "The Ticket"

**Spec de Facu**: Sumatoria con indicación de PAGAR o RECIBIR

#### G. Summary Footer
- [ ] **Container** — RAISED o GLASS, sticky en bottom
- [ ] **Layout**: Label izquierda + Valor derecha
- [ ] **Valor grande**: Tipografía display, color semántico
- [ ] **Indicador**: Tag/badge con "PAGAR" o "RECIBIR"

### 1.4 Tabs (Flujo 1 vs Flujo 2)

#### H. Tab System
- [ ] **Tab Container** — INSET horizontal
- [ ] **Tab Item** — GLASS cuando inactivo, RAISED cuando activo
- [ ] **Estados**: `active`, `inactive`, `disabled`
- [ ] **Indicador visual**: Borde inferior o cambio de elevación

---

## PARTE 2: Componentes requeridos por SIMULAR

### 2.1 Paso 1: Formulario de Parámetros

**Spec de Facu**: Tarjeta central con formulario neumórfico

#### I. Form Card
- [ ] **Container**: RAISED con padding generoso
- [ ] **Título**: H2 con letterpress
- [ ] **Descripción**: Texto muted debajo del título

#### J. Input Numérico (Monto)
- [ ] **Input Container** — INSET
- [ ] **Input Field** — Tipografía mono, alineación derecha
- [ ] **Prefix/Suffix** — Para símbolo de moneda (`$`)
- [ ] **Estados**: `default`, `focus`, `error`, `disabled`
- [ ] **Validación visual**: Borde color + mensaje de error

#### K. Option Selector (Riesgo, Plazo)
- [ ] **Selector Group Container** — INSET
- [ ] **Option Item** — GLASS, se convierte en RAISED cuando seleccionado
- [ ] **Variantes**:
  - `horizontal` — Items en fila (para 3 opciones)
  - `vertical` — Items en stack (para listas largas)
- [ ] **Con iconos**: Opcional, icono + label

#### L. Primary Action Button
- [ ] Ya existe en `buttons.css` pero verificar:
  - [ ] Tamaño XL para CTAs principales
  - [ ] Estado loading con spinner
  - [ ] Variante `full-width`

### 2.2 Paso 2: Normalización

**Spec de Facu**: Warning box + Tabla + Footer financiero

#### M. Alert/Warning Box
- [ ] **Container** — RAISED con borde lateral de color
- [ ] **Icono** — Según severidad (info, warning, error, success)
- [ ] **Título** — Bold, color semántico
- [ ] **Descripción** — Texto normal
- [ ] **Variantes**:
  - `info` — Steel, icono info
  - `warning` — Gold, icono warning
  - `error` — Rust, icono error
  - `success` — Jade, icono check

#### N. Tabla de Activos
- Reutiliza **Table System** (1.1.A) con columnas:
  - Ticker (texto)
  - Peso Ideal % (número)
  - Precio Unitario (currency)
  - Nominales Q (número, destacar si = 0)
  - Subtotal (currency)

#### O. Financial Footer
- [ ] **Container** — RAISED, separado visualmente de la tabla
- [ ] **Layout**: 2-3 columnas con labels y valores
- [ ] **Highlight**: "Remanente" en color positive

#### P. Row Actions
- [ ] **Delete Button** — Icono X, aparece en hover
- [ ] **Add Button** — Para agregar activo a la lista

### 2.3 Paso 3: Dual Path

**Spec de Facu**: 2 Cards comparativas (Opción A vs B)

#### Q. Comparison Card
- [ ] **Container** — RAISED con header distintivo
- [ ] **Header** — Título + subtítulo + opcional: badge "Recomendado"
- [ ] **Body** — Lista de métricas o contenido
- [ ] **Estados**:
  - `default` — Neutral
  - `selected` — Borde de acento, elevación mayor
  - `recommended` — Badge especial

#### R. Metric Comparison Row
- [ ] **Layout**: Label | Antes | → | Después
- [ ] **Flecha**: Icono direccional
- [ ] **Colores**: Antes (muted), Después (semántico según mejora/empeora)

#### S. Recommendation Badge
- [ ] **Estilo**: Pill con fondo accent
- [ ] **Texto**: "Recomendado" o "Sugerido"
- [ ] **Posición**: Header de la card

### 2.4 Loading Overlay

**Spec de Facu**: Overlay con blur + texto "Ejecutando Quafi Engine IA..."

#### T. Loading Overlay
- [ ] **Backdrop** — Blur + opacity sobre el contenido
- [ ] **Center Content** — QuafiEmblem con animación + texto
- [ ] **Texto** — Puede cambiar dinámicamente
- [ ] **Variantes**:
  - `fullscreen` — Cubre toda la pantalla
  - `container` — Cubre solo un contenedor específico

---

## PARTE 3: Componentes requeridos por REPORTS (Math Engine)

### 3.1 KPI Cards

**Spec de Facu**: Métricas como TWR, Sharpe, Drawdown

#### U. KPI Card
- [ ] Ya existe `MetricCard` pero verificar:
  - [ ] Variante con trend indicator (↑↓)
  - [ ] Variante con sparkline mini-chart
  - [ ] Tamaños: `sm`, `md`, `lg`
  - [ ] Colores semánticos en el valor

### 3.2 Correlation Heatmap

#### V. Heatmap Component
- [ ] Ya existe en ECharts, verificar integración con tema QUAFI
- [ ] Tooltip con valores de correlación
- [ ] Escala de colores: negativo (rust) → neutral → positivo (jade)

### 3.3 Monte Carlo Projection

#### W. Projection Chart
- [ ] Gráfico de área con 3 bandas (pesimista, esperada, optimista)
- [ ] Línea central para valor esperado
- [ ] Área sombreada para intervalo de confianza
- [ ] Eje X: tiempo, Eje Y: valor proyectado

### 3.4 Cashflow Timeline

#### X. Timeline Component
- [ ] Eje horizontal con fechas
- [ ] Markers para eventos de cashflow
- [ ] Tooltips con detalles del pago
- [ ] Suma acumulada opcional

---

## PARTE 4: Elementos transversales

### 4.1 Estados de componentes

Cada componente interactivo necesita estos estados definidos:

| Estado | Descripción | Cambios visuales |
|--------|-------------|------------------|
| `default` | Estado inicial | Base |
| `hover` | Mouse sobre el elemento | Elevación +1, brillo |
| `focus` | Foco de teclado | Outline de acento |
| `active` | Siendo presionado | Elevación -1 (pressed) |
| `disabled` | No interactivo | Opacity 0.5, cursor not-allowed |
| `loading` | Procesando | Spinner, disabled |
| `error` | Validación fallida | Borde rust, mensaje |
| `success` | Acción completada | Borde jade, feedback |

### 4.2 Spacing System

Definir escala de espaciado consistente:

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-7: 32px;
--space-8: 40px;
--space-9: 48px;
--space-10: 64px;
```

### 4.3 Iconografía

Íconos necesarios (Lucide React):

| Contexto | Íconos |
|----------|--------|
| **Acciones** | Plus, Minus, X, Check, Edit, Trash, Download, Upload |
| **Navegación** | ChevronLeft, ChevronRight, ArrowUp, ArrowDown |
| **Estados** | AlertTriangle, AlertCircle, Info, CheckCircle, XCircle |
| **Finanzas** | TrendingUp, TrendingDown, DollarSign, Percent, PieChart |
| **UI** | Search, Filter, Settings, Menu, MoreHorizontal |

### 4.4 Animaciones y transiciones

| Tipo | Duración | Easing | Uso |
|------|----------|--------|-----|
| `instant` | 100ms | ease-out | Hovers, micro-interactions |
| `fast` | 150ms | ease-out | Toggles, small changes |
| `normal` | 200ms | ease-out | Most transitions |
| `slow` | 300ms | ease-in-out | Page transitions, modals |
| `slower` | 500ms | ease-in-out | Complex animations |

---

## PARTE 5: Checklist de implementación

### Prioridad ALTA (bloqueantes para Calibrar y Simular)

- [ ] **Table System** — Container, Header, Row, Cell
- [ ] **Progress Bar** — Con variantes de color
- [ ] **Badge System** — Solid y outline variants
- [ ] **Input Numérico** — Con estados y validación
- [ ] **Option Selector** — Horizontal y vertical
- [ ] **Toggle/Switch** — Con estados y colores
- [ ] **Alert Box** — 4 variantes semánticas
- [ ] **Comparison Card** — Con badge recomendado
- [ ] **Loading Overlay** — Con QuafiEmblem

### Prioridad MEDIA (mejoran la experiencia)

- [ ] **Tab System** — Para navegación secundaria
- [ ] **Summary Footer** — Para totales
- [ ] **Metric Comparison Row** — Antes → Después
- [ ] **Delta Display** — Formato +/- con colores
- [ ] **Currency Display** — Formato consistente

### Prioridad BAJA (para Reports, fase posterior)

- [ ] **KPI Card variants** — Con trends y sparklines
- [ ] **Heatmap integration** — Tema QUAFI
- [ ] **Monte Carlo chart** — Bandas de proyección
- [ ] **Timeline Component** — Para cashflows

---

## PARTE 6: Decisiones de diseño pendientes

### Preguntas para resolver antes de implementar

1. **Tables**: ¿Bordes entre celdas o separación por spacing?
2. **Progress Bars**: ¿Altura fija o proporcional al contenedor?
3. **Badges**: ¿Border radius full (pill) o parcial?
4. **Switches**: ¿Tamaño estándar único o múltiples tamaños?
5. **Alerts**: ¿Dismissable con X o solo informativos?
6. **Cards comparativas**: ¿Selección exclusiva (radio) o múltiple?
7. **Loading**: ¿Texto fijo o dinámico con pasos?

### Tokens CSS pendientes de definir

```css
/* Tables */
--table-header-bg: ?
--table-row-hover: ?
--table-border-color: ?
--table-cell-padding: ?

/* Progress */
--progress-height: ?
--progress-radius: ?
--progress-bg: ?

/* Badges */
--badge-padding-x: ?
--badge-padding-y: ?
--badge-font-size: ?
--badge-radius: ?

/* Inputs */
--input-height: ?
--input-padding: ?
--input-border-radius: ?
--input-focus-ring: ?

/* Alerts */
--alert-padding: ?
--alert-border-width: ?
--alert-icon-size: ?
```

---

## Próximos pasos

1. **Rafa decide** las preguntas de diseño (Parte 6)
2. **Definir tokens CSS** para cada componente nuevo
3. **Crear componentes** en orden de prioridad
4. **Documentar en showcase** cada componente
5. **Aplicar a Calibrar y Simular**

---

*Documento generado: 2026-03-02*
*Fuentes: specs de Facu + CLAUDE.md del design system*
