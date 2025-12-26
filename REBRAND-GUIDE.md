# Guía de Transformación del Design System

## Objetivo

Transformar el design system actual (Robot Resources - tema terminal) en un nuevo design system para una **aplicación de finanzas e inversiones**.

---

## Estado Actual del Proyecto

### Identidad Visual Actual
- **Nombre:** Robot Resources
- **Tema:** Terminal/ASCII aesthetic
- **Color primario:** Naranja (#FF6600)
- **Tipografía:** JetBrains Mono (monospace)
- **Estética:** Hacker/cyberpunk con efectos glow y glitch

### Componentes Disponibles (46+)

| Categoría | Cantidad | Componentes |
|-----------|----------|-------------|
| **Atoms** | 7 | Button, Input, Badge, Checkbox, Icon, Tooltip, Typography |
| **Molecules** | 8 | Card, FormField, MenuItem, Pagination, NotificationCard, SearchBar, SearchbarItem, SidebarItem |
| **Organisms** | 6 | Table, Sidebar, Modal, Form, PaginatedTable, Searchbar |
| **Charts** | 14 | LineChart, RadialBar, HeatMap, SankeyDiagram, BumpChart, ScatterPlot, TreeMap, etc. |
| **Animations** | 7 | FadeIn, ScrollReveal, Parallax, StaggerList, MotionCard, LayoutTransition, DraggablePanel |
| **Terminal** | 4 | GlitchText, TypewriterText, AsciiBox, TerminalWindow |

### Arquitectura Técnica
- **Framework:** React 19 + TypeScript
- **Bundler:** Vite
- **Estilos:** CSS Modules + CSS Custom Properties (sin Tailwind)
- **Charts:** Nivo Charts
- **Animaciones:** Framer Motion
- **State:** Zustand
- **Testing:** Jest + Testing Library + Cypress

---

## Plan de Transformación

### Fase 1: Configuración de Marca
Actualizar identidad del proyecto:

| Archivo | Cambio |
|---------|--------|
| `package.json` | Nuevo nombre y descripción |
| `index.html` | Nuevo título |
| `public/` | Nuevo favicon |

### Fase 2: Sistema de Colores
Modificar `src/styles/theme.css`:

```css
/* COLORES A DEFINIR */
--primary: [color principal de marca]
--primary-dark: [variante oscura]
--primary-light: [variante clara]

--success: [verde para ganancias/positivo]
--warning: [amarillo para alertas/riesgo]
--destructive: [rojo para pérdidas/negativo]
--info: [azul para información]

--background: [color de fondo principal]
--foreground: [color de texto principal]
--border: [color de bordes]
```

### Fase 3: Tipografía
Modificar `src/styles/typography/terminal.css`:

```css
/* TIPOGRAFÍA A DEFINIR */
--font-display: [fuente para títulos]
--font-body: [fuente para cuerpo]
--font-mono: [fuente monospace para datos/números]
```

### Fase 4: Componentes de UI
Actualizar textos y referencias en:
- `src/layouts/ShowcaseLayout.tsx` - Logo y navegación
- `src/pages/Home.tsx` - Página principal
- Showcase pages - Títulos y descripciones

### Fase 5: Gráficos
Actualizar `src/components/charts/theme.ts`:
- Paleta de colores para visualizaciones
- Estilos de tooltips
- Colores de ejes y grids

### Fase 6: Decisiones sobre Componentes Terminal
Decidir si mantener o remover:
- [ ] GlitchText - Efecto glitch en texto
- [ ] TypewriterText - Animación de escritura
- [ ] AsciiBox - Bordes ASCII
- [ ] TerminalWindow - Ventana de terminal
- [ ] Efectos CRT/scanlines

---

## Información Requerida del Nuevo Design System

### 1. Identidad de Marca
- [ ] Nombre de la aplicación
- [ ] Tagline/descripción
- [ ] Logo (SVG preferido)
- [ ] Favicon

### 2. Paleta de Colores
- [ ] Color primario (y variantes dark/light)
- [ ] Color secundario (opcional)
- [ ] Color de acento
- [ ] Colores semánticos:
  - Éxito/Ganancia (verde)
  - Advertencia/Riesgo (amarillo/naranja)
  - Error/Pérdida (rojo)
  - Información (azul)
- [ ] Colores de fondo (principal, secundario, terciario)
- [ ] Colores de texto (principal, secundario, muted)
- [ ] Colores de borde

### 3. Tipografía
- [ ] Fuente principal (para UI)
- [ ] Fuente para títulos (si es diferente)
- [ ] Fuente monospace (para números/datos financieros)
- [ ] Escala de tamaños (si difiere del actual)

### 4. Estilo Visual
- [ ] Border radius preferido (sharp/rounded/pill)
- [ ] Estilo de sombras (subtle/pronounced/none)
- [ ] Tema claro/oscuro/ambos
- [ ] Densidad de UI (compact/comfortable/spacious)

### 5. Componentes Específicos de Finanzas
- [ ] ¿Se necesitan nuevos componentes?
  - Portfolio cards
  - Stock tickers
  - Price charts específicos
  - Transaction lists
  - Account summaries
- [ ] ¿Qué gráficos son prioritarios?
  - Line charts (precio histórico)
  - Candlestick charts
  - Pie/Donut (distribución de portfolio)
  - Bar charts (comparaciones)

### 6. Contenido de Ejemplo
- [ ] Datos mock para tablas
- [ ] Valores de ejemplo para gráficos
- [ ] Textos de ejemplo (nombres de empresas, montos, etc.)

---

## Estructura de Archivos Clave

```
src/
├── styles/
│   ├── theme.css              ← COLORES Y TOKENS (principal)
│   ├── globals.css            ← Reset y utilidades
│   └── typography/
│       └── terminal.css       ← TIPOGRAFÍA
│
├── components/
│   └── charts/
│       └── theme.ts           ← TEMA DE GRÁFICOS
│
├── layouts/
│   └── ShowcaseLayout.tsx     ← LOGO Y NAVEGACIÓN
│
├── pages/
│   └── Home.tsx               ← PÁGINA PRINCIPAL
│
└── index.html                 ← TÍTULO DEL BROWSER

package.json                   ← NOMBRE DEL PROYECTO
public/
└── favicon.svg               ← FAVICON
```

---

## Notas Importantes

### Ventajas de la Arquitectura Actual
1. **Un archivo controla todo:** Cambiar `theme.css` actualiza todos los componentes
2. **Sin dependencias de UI:** No hay Tailwind ni Bootstrap que compliquen el rebrand
3. **Componentes modulares:** Cada componente es independiente
4. **Gráficos configurables:** Nivo Charts permite tematización completa

### Consideraciones para Finanzas
1. **Precisión numérica:** Los componentes de Input y Table soportan formateo
2. **Visualización de datos:** 14 tipos de gráficos disponibles
3. **Estados de carga:** Los componentes soportan estados loading/skeleton
4. **Responsividad:** El layout es responsive por defecto
5. **Accesibilidad:** Los componentes incluyen atributos ARIA básicos

### Tiempo Estimado de Transformación
- **Cambio de colores:** 1-2 horas
- **Cambio de tipografía:** 30 minutos
- **Actualización de textos:** 1 hora
- **Ajustes finos:** 2-4 horas
- **Total estimado:** 1 día de trabajo

---

## Próximos Pasos

1. **Recibir documento** con especificaciones del nuevo design system
2. **Revisar y confirmar** los requerimientos
3. **Ejecutar transformación** siguiendo las fases
4. **Validar resultados** en el showcase
5. **Ajustar detalles** según feedback

---

*Documento generado para facilitar la transformación del design system.*
*Fecha: Diciembre 2024*
