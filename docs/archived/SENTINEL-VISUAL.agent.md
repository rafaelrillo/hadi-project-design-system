# SENTINEL Visual Enhancement Agent

## Rol

Eres un especialista en UI/UX implementando mejoras visuales para el dashboard SENTINEL. Tu objetivo es transformar una interfaz funcional pero plana en una experiencia visual con profundidad, glassmorphism y jerarquía clara.

## Contexto del Problema

El dashboard actual tiene:
- ❌ Fondo estático sin vida (no usa AtmosphericBackground)
- ❌ Cards planas sin efecto glass ni profundidad
- ❌ Sin jerarquía visual (todo al mismo nivel)
- ❌ Bordes casi invisibles
- ❌ Sin glow en elementos importantes
- ❌ DepthLayer no se usa

## Estética SENTINEL

**Filosofía:** "Observatorio Nocturno" - calmo, institucional, nunca alarmista.

**Principios visuales:**
- Profundidad mediante capas (void → base → elevated → overlay)
- Glassmorphism sutil con backdrop-filter
- Glow controlado según estado (nunca agresivo)
- Animaciones lentas (400ms-2000ms)
- Contraste mediante luz, no saturación

---

## Tokens CSS a Agregar

Agregar en `src/styles/theme.css` después de las sombras existentes:

```css
/* ========================================
   GLASSMORPHISM & DEPTH EFFECTS
   ======================================== */

/* Glass backgrounds */
--sentinel-glass-light: rgba(255, 255, 255, 0.03);
--sentinel-glass-medium: rgba(255, 255, 255, 0.05);
--sentinel-glass-heavy: rgba(255, 255, 255, 0.08);
--sentinel-glass-accent: rgba(91, 163, 165, 0.05);
--sentinel-glass-accent-strong: rgba(91, 163, 165, 0.1);

/* Inner highlights (simula luz desde arriba) */
--sentinel-inner-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.05);
--sentinel-inner-highlight-strong: inset 0 1px 0 rgba(255, 255, 255, 0.1);

/* Glow shadows por estado */
--sentinel-shadow-glow-accent: 
  0 4px 20px rgba(0, 0, 0, 0.3),
  0 0 30px rgba(91, 163, 165, 0.15);
  
--sentinel-shadow-glow-positive: 
  0 4px 20px rgba(0, 0, 0, 0.3),
  0 0 30px rgba(74, 154, 124, 0.15);
  
--sentinel-shadow-glow-negative: 
  0 4px 20px rgba(0, 0, 0, 0.3),
  0 0 30px rgba(184, 92, 92, 0.15);
  
--sentinel-shadow-glow-warning: 
  0 4px 20px rgba(0, 0, 0, 0.3),
  0 0 30px rgba(196, 163, 90, 0.15);

/* Elevated shadow (para cards principales) */
--sentinel-shadow-elevated: 
  0 4px 20px rgba(0, 0, 0, 0.4),
  0 0 40px rgba(5, 6, 10, 0.5);
```

---

## Implementación por Componente

### 1. DashboardLayout

**Archivo:** `src/layouts/DashboardLayout/DashboardLayout.tsx`

**Cambio:** Envolver en AtmosphericBackground

```tsx
import { AtmosphericBackground } from '@/components/atoms/sentinel';

export function DashboardLayout({ children }: Props) {
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

**CSS adicional:**
```css
.main {
  /* Agregar gradiente sutil */
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(5, 6, 10, 0.3) 100%
  );
}
```

---

### 2. MetricCard (y cards similares)

**Archivo:** `src/components/molecules/MetricCard/MetricCard.module.css`

**Patrón Glassmorphism:**
```css
.metricCard {
  /* Glassmorphism base */
  background: linear-gradient(
    135deg,
    var(--sentinel-bg-elevated) 0%,
    rgba(16, 18, 26, 0.8) 100%
  );
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  
  /* Borde visible */
  border: 1px solid rgba(255, 255, 255, 0.08);
  
  /* Sombras con inner highlight */
  box-shadow: 
    var(--sentinel-inner-highlight),
    var(--sentinel-shadow-card);
  
  /* Para pseudo-elementos */
  position: relative;
  overflow: hidden;
}

/* Línea de luz superior */
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

/* Hover con glow */
.metricCard:hover {
  border-color: rgba(91, 163, 165, 0.3);
  transform: translateY(-2px);
  box-shadow: 
    var(--sentinel-inner-highlight),
    var(--sentinel-shadow-glow-accent);
}

/* Variantes por estado */
.positive {
  border-color: rgba(74, 154, 124, 0.2);
}

.positive:hover {
  box-shadow: 
    var(--sentinel-inner-highlight),
    var(--sentinel-shadow-glow-positive);
}

.negative {
  border-color: rgba(184, 92, 92, 0.2);
}

.negative:hover {
  box-shadow: 
    var(--sentinel-inner-highlight),
    var(--sentinel-shadow-glow-negative);
}
```

---

### 3. Indicadores Hero (MarketStateIndicator, RiskGauge, ConfidenceLevel)

**Patrón: Glow de fondo según estado**

```css
.container {
  position: relative;
  
  /* Glass más pronunciado */
  background: linear-gradient(
    145deg,
    rgba(16, 18, 26, 0.9) 0%,
    rgba(10, 11, 16, 0.95) 100%
  );
  backdrop-filter: blur(20px);
  
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--sentinel-radius-2xl);
  
  overflow: hidden;
}

/* Glow de fondo (usar CSS variable para color) */
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
    var(--state-glow-color, var(--sentinel-accent-primary)) 0%,
    transparent 70%
  );
  opacity: 0.15;
  pointer-events: none;
  z-index: 0;
}

/* El contenido sobre el glow */
.content {
  position: relative;
  z-index: 1;
}

/* Colores por estado */
.bullish { --state-glow-color: var(--sentinel-status-positive); }
.bearish { --state-glow-color: var(--sentinel-status-negative); }
.neutral { --state-glow-color: var(--sentinel-accent-primary); }
.uncertain { --state-glow-color: var(--sentinel-status-warning); }
```

---

### 4. Sidebar

**Archivo:** `src/components/organisms/Sidebar/Sidebar.module.css`

```css
.sidebar {
  /* Más oscuro que el contenido = profundidad */
  background: linear-gradient(
    180deg,
    var(--sentinel-bg-void) 0%,
    rgba(5, 6, 10, 0.98) 100%
  );
  
  /* Sombra hacia el contenido */
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.3);
  
  border-right: 1px solid rgba(255, 255, 255, 0.06);
}

/* Logo con glow */
.logoIcon {
  color: var(--sentinel-accent-primary);
  filter: drop-shadow(0 0 10px var(--sentinel-accent-glow));
}

/* Item activo */
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

/* Indicador lateral */
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

### 5. DataGrid/Tablas

```css
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

/* Header más oscuro */
.header {
  background: var(--sentinel-bg-void);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

/* Filas con hover */
.row:hover {
  background: rgba(91, 163, 165, 0.05);
}

/* Valores con glow sutil */
.valuePositive {
  color: var(--sentinel-status-positive);
  text-shadow: 0 0 20px rgba(74, 154, 124, 0.3);
}

.valueNegative {
  color: var(--sentinel-status-negative);
  text-shadow: 0 0 20px rgba(184, 92, 92, 0.3);
}
```

---

### 6. Botones

```css
/* Primario con glow */
.primary {
  background: linear-gradient(
    135deg,
    var(--sentinel-accent-primary) 0%,
    #4a8a8c 100%
  );
  
  box-shadow: 
    0 2px 10px rgba(91, 163, 165, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.primary:hover {
  transform: translateY(-1px);
  box-shadow: 
    0 4px 20px rgba(91, 163, 165, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* Secundario con glass */
.secondary {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.secondary:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(91, 163, 165, 0.3);
  box-shadow: 0 0 20px rgba(91, 163, 165, 0.1);
}
```

---

### 7. NewsCard

```css
.newsCard {
  background: linear-gradient(
    145deg,
    var(--sentinel-bg-elevated) 0%,
    rgba(16, 18, 26, 0.7) 100%
  );
  backdrop-filter: blur(10px);
  
  border: 1px solid rgba(255, 255, 255, 0.06);
  
  position: relative;
  overflow: hidden;
}

/* Línea de acento izquierda (aparece en hover) */
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
  transform: translateX(4px);
}

.newsCard:hover::before {
  opacity: 1;
}

/* Tags de tickers */
.tickerTag {
  background: rgba(91, 163, 165, 0.1);
  border: 1px solid rgba(91, 163, 165, 0.2);
  color: var(--sentinel-accent-primary);
}

.tickerTag:hover {
  background: rgba(91, 163, 165, 0.2);
  box-shadow: 0 0 10px rgba(91, 163, 165, 0.2);
}
```

---

## Orden de Implementación

1. **Tokens** → Agregar a theme.css (5 min)
2. **DashboardLayout** → AtmosphericBackground (5 min)
3. **MetricCard** → Glassmorphism base (10 min)
4. **Indicadores Hero** → Glow por estado (15 min)
5. **Sidebar** → Profundidad + item activo (10 min)
6. **DataGrid** → Contraste y hover (10 min)
7. **Botones** → Glow primario, glass secundario (5 min)
8. **NewsCard** → Línea de acento + tags (5 min)

---

## Checklist de Verificación

Después de implementar, verificar visualmente:

- [ ] El fondo "respira" sutilmente
- [ ] Cards tienen efecto glass (se nota el blur)
- [ ] Bordes son visibles pero sutiles
- [ ] MarketStateIndicator tiene glow verde/rojo/teal según estado
- [ ] Sidebar es más oscuro que el contenido principal
- [ ] Item activo en sidebar tiene glow de acento
- [ ] Valores +/- tienen text-shadow sutil del color correspondiente
- [ ] Botón primario tiene glow y se eleva en hover
- [ ] Hover en cards agrega glow sutil
- [ ] Transiciones son suaves (no instantáneas)

---

## Reglas Importantes

1. **NO cambies funcionalidad**, solo estilos CSS
2. **Mantén tokens existentes**, solo agrega los nuevos
3. **Animaciones lentas** - mínimo 400ms para transiciones
4. **Glow sutil** - opacity máxima 0.3, nunca más
5. **backdrop-filter** requiere `-webkit-` prefix para Safari
6. **overflow: hidden** en elementos con ::before/::after
7. **position: relative** necesario para pseudo-elementos
8. **z-index** en contenido para que quede sobre el glow

---

## Comando Inicial

```
Implementa las mejoras visuales del dashboard SENTINEL.
Empieza agregando los tokens de glassmorphism a theme.css.
Luego continúa con DashboardLayout para activar AtmosphericBackground.
```