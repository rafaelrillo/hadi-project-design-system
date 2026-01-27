# FING Design System Consolidation

**Fecha:** 2026-01-27
**Branch:** `redesign/stock-market-ui`

---

## Resumen Ejecutivo

Se realizó una auditoría profunda del design system FING/SENTINEL y una consolidación de los tokens CSS. El objetivo fue establecer una **única fuente de verdad** para tipografía, colores, sombras y efectos letterpress, usando los componentes `FingHome` y `DashboardPage` como referencia canónica de lo que realmente está implementado.

---

## Contexto y Problema

### Estado Inicial

El design system tenía **problemas de fragmentación**:

1. **theme.css masivo (84KB)** - Un archivo monolítico con ~1500 líneas de variables CSS, muchas duplicadas o legacy
2. **Valores hardcodeados** - Los componentes del Home tenían valores de letterpress escritos directamente en lugar de usar variables
3. **Código experimental mezclado** - Archivos como `light-engine.css` y `textures.css` se importaban globalmente aunque eran experimentales
4. **Falta de documentación** - No había claridad sobre qué era oficial vs experimental
5. **Inconsistencias** - Variables `--lp-*` definidas en theme.css pero no usadas en los componentes

### Hallazgos de la Auditoría

| Área | Hallazgo |
|------|----------|
| **Tipografía** | 5 fuentes importadas (DM Sans, IBM Plex Mono, IBM Plex Sans, Libre Baskerville, Cormorant Garamond), pero 56 declaraciones hardcodeadas de 'Inter' y 'Space Mono' en charts |
| **Colores** | 200+ variables CSS, paleta Natural Mineral correctamente implementada |
| **Sombras** | 5 niveles RAISED, 5 niveles INSET, sistema Glass - bien estructurado |
| **Letterpress** | 7 variables `--lp-*` definidas pero 23 valores hardcodeados en FingHome.module.css |
| **Experimental** | light-engine.css y textures.css importados globalmente sin ser producción |

---

## Solución Implementada

### Principio Guía

> **"El Home es la fuente de verdad"**
>
> Los valores reales usados en `FingHome.tsx` y `DashboardPage.tsx` son el estándar. Extraer esos valores exactos a archivos CSS modulares.

### Arquitectura Nueva

```
src/styles/
│
├── [DESIGN SYSTEM OFICIAL]
│   ├── colors.css          ← Paleta Natural Mineral
│   ├── typography.css      ← Familias, tamaños, pesos, tracking
│   ├── shadows.css         ← Sistema RAISED/INSET/GLASS
│   ├── letterpress.css     ← Text-shadows para neumorfismo
│   ├── globals.css         ← Reset y base styles
│   └── theme.css           ← Variables adicionales (en proceso de limpieza)
│
└── lab/                    ← [EXPERIMENTAL]
    ├── README.md
    ├── light-engine.css    ← Sistema de iluminación dinámica
    ├── textures.css        ← Texturas para Material Theming
    └── legacy/             ← Variables deprecadas
```

---

## Archivos Creados

### 1. `colors.css` - Paleta Natural Mineral

**Propósito:** Centralizar todos los colores del sistema en un solo archivo.

**Contenido:**
- Colores base del mármol (`--marble-base`, `--marble-light`, `--marble-dark`)
- Negro primario Charcoal (`--fing-black: #252528`)
- Acento Petrol (`--fing-accent: #3a6a72`)
- Colores semánticos: Jade (positivo), Gold (warning), Rust (negativo), Steel (info)
- Colores de texto, bordes, charts, y glows

**Por qué colores naturales:**
La paleta usa nombres de minerales/materiales naturales para reforzar la estética "Stone Marble" y dar coherencia conceptual:
- **Charcoal** - carbón de madera quemada
- **Petrol** - depósitos de petróleo
- **Jade** - piedra verde
- **Gold** - oro puro
- **Rust** - óxido de hierro
- **Steel** - aleación de hierro refinado

---

### 2. `typography.css` - Sistema Tipográfico

**Propósito:** Definir todas las fuentes, tamaños, pesos y espaciados.

**Contenido:**
- Font families: DM Sans (UI), IBM Plex Mono (datos), Libre Baskerville (display), Cormorant Garamond (wordmark)
- Escala de tamaños rem (12px-60px)
- Escala de tamaños px para datos (10px-48px)
- Pesos: 300, 400, 500, 600, 700
- Letter-spacing: desde -0.02em hasta 0.25em
- Line-heights: 1 a 2

**Por qué dos escalas:**
- **rem-based:** Para UI general, respeta preferencias del usuario
- **px-based:** Para datos financieros donde la precisión visual es crítica

---

### 3. `shadows.css` - Sistema de Sombras Neumórficas

**Propósito:** Definir la jerarquía visual RAISED → INSET → GLASS.

**Contenido:**
- Colores base de sombra (`--shadow-light`, `--shadow-dark`)
- 5 niveles de RAISED (elementos elevados)
- 5 niveles de INSET (elementos hundidos)
- Variables de GLASS (transparencia para items dentro de insets)
- Sombras especiales extraídas del Home (ridge-frame, etymology-card, etc.)
- Border radius estándar

**Regla crítica documentada:**
```
NUNCA anidar mismo nivel (RAISED dentro de RAISED)
NUNCA saltar niveles (FONDO directo a GLASS)
SIEMPRE alternar: RAISED → INSET → GLASS
```

---

### 4. `letterpress.css` - Efectos de Texto Neumórficos

**Propósito:** Crear efecto de texto "presionado" o "elevado" según el contexto.

**Contenido:**

**Para contenedores RAISED (texto parece hundido):**
```css
--lp-primary        /* Charcoal */
--lp-positive       /* Jade */
--lp-warning        /* Gold */
--lp-negative       /* Rust */
--lp-info           /* Steel */
--lp-accent         /* Petrol */
--lp-steel          /* Steel (text accent) */
--lp-petrol         /* Petrol brand */
--lp-petrol-whisper /* Petrol sutil */
--lp-muted          /* Texto muted */
```

**Para contenedores INSET (texto parece elevado):**
```css
--lp-embossed           /* Estándar */
--lp-embossed-subtle    /* Sutil */
--lp-embossed-sm        /* Pequeño */
--lp-embossed-petrol    /* Con tinte petrol */
--lp-embossed-petrol-sm /* Petrol pequeño */
```

**Por qué esta dualidad:**
La regla tipográfica neumórfica establece que:
- En RAISED container → tipografía INSET (cavada)
- En INSET container → tipografía RAISED (embossed)

Esto crea coherencia visual donde todo parece tallado en la misma superficie de mármol.

---

### 5. `lab/README.md` - Documentación del Lab

**Propósito:** Establecer reglas claras para código experimental.

**Reglas:**
1. NO importar en `main.tsx`
2. Solo importar en páginas de showcase
3. Documentar con fecha
4. Promover a producción o eliminar en 30 días

---

## Archivos Modificados

### 1. `main.tsx` - Imports Reorganizados

**Antes:**
```tsx
import './styles/theme.css';
import './styles/textures.css';
import './styles/light-engine.css';
```

**Después:**
```tsx
// DESIGN SYSTEM OFICIAL
import './styles/colors.css';
import './styles/typography.css';
import './styles/shadows.css';
import './styles/letterpress.css';

// LAB (comentado - solo para showcase)
// import './styles/lab/textures.css';
// import './styles/lab/light-engine.css';
```

**Por qué:** Separar claramente qué es producción vs experimental.

---

### 2. `FingHome.module.css` - Migración a Variables

**Antes (23 ocurrencias como esta):**
```css
.sectionLabel {
  color: var(--fing-text-accent);
  text-shadow:
    0.5px 0.5px 0px rgba(255, 255, 255, 0.9),
    -0.5px -0.5px 0px rgba(74, 106, 122, 0.25);
}
```

**Después:**
```css
.sectionLabel {
  color: var(--fing-text-accent);
  text-shadow: var(--lp-steel);
}
```

**Cambios realizados:**
| Patrón Original | Variable Nueva | Ocurrencias |
|-----------------|----------------|-------------|
| Steel letterpress | `--lp-steel` | 7 |
| Muted letterpress | `--lp-muted` | 5 |
| Petrol letterpress | `--lp-petrol` | 2 |
| Petrol whisper | `--lp-petrol-whisper` | 6 |
| Embossed subtle | `--lp-embossed-subtle` | 2 |
| Embossed petrol | `--lp-embossed-petrol` | 1 |

**Por qué:**
1. Consistencia - un solo lugar para cambiar valores
2. Mantenibilidad - más fácil ajustar el sistema completo
3. Documentación - el nombre de la variable explica su propósito

---

### 3. `ShowcaseLayout.tsx` - Sidebar Reorganizado

**Antes:**
```
├── Home
├── Light Engine
├── FING Components
├── Styles (mezclado oficial + experimental)
├── Atoms
├── Molecules
├── Organisms
├── Charts
├── Animations
```

**Después:**
```
├── Home
├── FING Components
│
├── Design System        ← OFICIAL
│   ├── Brand
│   ├── Wordmark
│   ├── Colors
│   ├── Typography
│   ├── Shadows
│   ├── Letterpress      ← NUEVO
│   ├── Spacing
│   ├── Border Radius
│   ├── Icons
│   └── Buttons
│
├── Atoms
├── Molecules
├── Organisms
├── Charts
├── Animations
│
└── Lab                  ← EXPERIMENTAL (separado visualmente)
    ├── Stone Marble
    └── Light Engine
```

**Por qué:**
1. Claridad visual entre oficial y experimental
2. El Lab tiene separador visual (línea punteada)
3. Fácil identificar qué es "production ready"

---

### 4. `App.tsx` - Nueva Ruta

**Agregado:**
```tsx
const LetterpressShowcase = lazy(() =>
  import('./pages/styles').then(m => ({ default: m.LetterpressShowcase }))
);

// En routes:
<Route path="styles/letterpress" element={
  <Suspense fallback={<ShowcaseLoader />}>
    <LetterpressShowcase />
  </Suspense>
} />
```

---

## Página Nueva Creada

### `LetterpressShowcase.tsx`

**Ruta:** `/showcase/styles/letterpress`

**Contenido:**
1. Explicación de la regla RAISED/INSET
2. Demo de letterpress semánticos (Charcoal, Jade, Gold, Rust, Steel, Petrol)
3. Demo de variantes de contexto (Steel, Petrol, Petrol Whisper, Muted)
4. Demo de embossed para contenedores INSET
5. Ejemplos de código CSS

---

## Archivos Movidos

| Archivo | Origen | Destino | Razón |
|---------|--------|---------|-------|
| `light-engine.css` | `src/styles/` | `src/styles/lab/` | Experimental, requiere LightEngineProvider |
| `textures.css` | `src/styles/` | `src/styles/lab/` | Experimental, depende de themeStore |

---

## Impacto

### Beneficios Inmediatos

1. **Reducción de código duplicado** - Un solo lugar para cada token
2. **Mejor DX** - Variables con nombres semánticos (`--lp-positive` vs hardcoded rgba)
3. **Documentación viva** - El showcase muestra exactamente cómo usar cada variable
4. **Separación clara** - Fácil saber qué es producción vs experimento

### Métricas

| Métrica | Antes | Después |
|---------|-------|---------|
| Archivos CSS oficiales | 1 (theme.css 84KB) | 5 archivos modulares |
| Valores letterpress hardcodeados | 23 | 0 |
| Archivos experimentales en producción | 2 | 0 |
| Páginas de showcase | 10 | 11 (+Letterpress) |

### Build

El build sigue funcionando correctamente:
```
✓ built in 4.47s
```

---

## Trabajo Pendiente

### Corto Plazo
- [ ] Migrar variables `--sentinel-*` legacy de theme.css a lab/legacy/
- [ ] Revisar los 56 hardcoded fonts en charts (Inter, Space Mono)
- [ ] Crear showcase para cada archivo CSS oficial

### Mediano Plazo
- [ ] Reducir theme.css eliminando duplicados
- [ ] Evaluar si light-engine puede promoverse a producción
- [ ] Documentar Material Theming system

### Largo Plazo
- [ ] Implementar dark theme usando las mismas variables
- [ ] Crear CLI para generar tokens automáticamente
- [ ] Tests visuales de regresión para el design system

---

## Cómo Usar el Sistema

### Para Desarrolladores

**Texto en contenedor RAISED:**
```css
.myTitle {
  color: var(--fing-accent);
  text-shadow: var(--lp-petrol);
}
```

**Texto en contenedor INSET:**
```css
.myTitle {
  color: var(--marble-dark);
  text-shadow: var(--lp-embossed);
}
```

**Sombras neumórficas:**
```css
.card {
  background: var(--marble-base);
  box-shadow: var(--raised-3);
  border-radius: var(--radius-lg);
}

.cardContent {
  background: var(--marble-dark);
  box-shadow: var(--inset-2);
}
```

### Para Diseñadores

Los tokens oficiales están en:
- `/showcase/styles/colors` - Paleta completa
- `/showcase/styles/typography` - Escala tipográfica
- `/showcase/styles/shadows` - Sistema de elevación
- `/showcase/styles/letterpress` - Efectos de texto

---

## Conclusión

Esta consolidación establece una base sólida para el design system FING. Los tokens ahora tienen:

1. **Una única fuente de verdad** - Archivos CSS modulares y específicos
2. **Documentación clara** - Showcases para cada sistema
3. **Separación de concerns** - Producción vs Lab
4. **Consistencia** - Variables semánticas usadas en todos los componentes

El siguiente paso natural es continuar limpiando theme.css y eventualmente deprecarlo en favor de los archivos modulares.
