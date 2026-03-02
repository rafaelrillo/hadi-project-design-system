# Checkpoint — Sesión de Planning UI

**Fecha**: 2026-03-02
**Tipo**: Planning / Documentación
**Próxima fase**: Fase 0 (Fundamentos)

---

## Resumen

Sesión de análisis y planificación para implementar las interfaces de Calibrar y Simular. Se revisaron los specs de Facu, se analizó el design system existente, y se creó un plan estructurado por fases.

**Conclusión clave**: El design system ya tiene las herramientas necesarias (ECharts, animaciones, Stone Marble). No hay que crear componentes nuevos, sino aplicar lo existente correctamente.

---

## Documentos de Facu analizados

| Documento | Contenido clave |
|-----------|-----------------|
| `spec_calibrar.md` | 2 flujos (Basic/Pro), matriz de 7 columnas, footer "The Ticket" |
| `spec_simular.md` | 3 pasos (Input → Normalización → Decisión dual) |
| `Quafi Math Engine.md` | Métricas: TWR, Sharpe, Drawdown, Monte Carlo |
| `Quafi Market Normalizer.md` | Lógica de nominales enteros, capital mínimo |

**Ubicación**: `facu-documents/`

---

## Documentos creados

### 1. UI_IMPLEMENTATION_GUIDE.md

**Propósito**: Manual de aplicación del design system a los flujos de Facu.

**Contenido**:
- Mapeo de elementos de Facu → herramientas QUAFI
- Ejemplos de código CSS y TSX
- Configuraciones de ECharts para cada visualización
- Patrones de animación

**Enfoque clave**:
- Matriz de Rebalanceo → BarChart horizontal
- Tabla de activos → TreeMap o BarChart
- Cards comparativas → RadarChart + métricas
- Monte Carlo → LineChart con áreas
- Flujo de rebalanceo → SankeyChart

### 2. IMPLEMENTATION_PLAN.md

**Propósito**: Plan estructurado por fases oneshotables.

**8 Fases**:
- Fase 0: Fundamentos (tokens CSS faltantes)
- Fase 1: Primitivos visuales (inputs, selectors, switches, alerts)
- Fase 2: Calibrar — Config panel
- Fase 3: Calibrar — Results panel
- Fase 4: Simular — Paso 1 (Input)
- Fase 5: Simular — Paso 2 (Normalización)
- Fase 6: Simular — Paso 3 (Decisión)
- Fase 7: Integración y polish

**Incluye**:
- Checklist por fase
- Archivos a crear/modificar
- Criterios de completitud
- Template de checkpoint
- Referencias rápidas del design system

### 3. UI_COMPONENTS_GAP_ANALYSIS.md

**Propósito**: Primer análisis de gaps (reemplazado por IMPLEMENTATION_GUIDE).

**Estado**: Obsoleto, usar IMPLEMENTATION_GUIDE en su lugar.

---

## Herramientas del design system identificadas

### ECharts (21 tipos disponibles)

| Chart | Uso en QUAFI |
|-------|--------------|
| BarChart | % actual vs target, operaciones +/- |
| LineChart | Performance, proyecciones |
| PieChart | Allocation |
| GaugeChart | KPIs (Sharpe, etc.) |
| RadarChart | Comparación de carteras |
| TreeMap | Holdings jerárquicos |
| HeatMap | Correlación |
| SankeyChart | Flujo de rebalanceo |

### Animaciones CSS

| Categoría | Clases |
|-----------|--------|
| Stock Market | `value-flash-positive`, `value-flash-negative`, `data-glow` |
| Entrada | `emerge`, `fade-in`, `scale-in`, `slide-left`, `pop` |
| Stagger | `[data-animate-stagger]` |

### Stone Marble

```
RAISED (containers) → INSET (secciones) → GLASS (items)
```

---

## Gaps reales identificados

Solo faltan tokens menores:

1. **Spacing tokens** (`--space-1` a `--space-10`)
2. **Form states** (focus ring, error)
3. **Badge system** (solid, outline)

**El 90% está listo para usar.**

---

## Decisiones tomadas

1. **No crear componentes nuevos** — Usar ECharts + CSS existente
2. **Plan por fases** — Cada fase es una sesión de Claude
3. **Checkpoints obligatorios** — Al final de cada fase
4. **Protocolo de sesión** — Leer docs al inicio, commit al final

---

## Estructura de archivos creada

```
quafi-design-system/
├── docs/
│   ├── UI_IMPLEMENTATION_GUIDE.md    [NUEVO]
│   ├── IMPLEMENTATION_PLAN.md        [NUEVO]
│   └── UI_COMPONENTS_GAP_ANALYSIS.md [NUEVO - obsoleto]
├── facu-documents/                    [YA EXISTÍA]
│   ├── spec_calibrar.md
│   ├── spec_simular.md
│   ├── Quafi Math Engine.md
│   └── Quafi Market Normalizer.md
└── _workspace/
    └── checkpoints/                   [NUEVO]
        └── sesion-2026-03-02-planning.md
```

---

## Para la próxima sesión

### Leer primero:
1. `docs/IMPLEMENTATION_PLAN.md` — Ver Fase 0
2. `docs/UI_IMPLEMENTATION_GUIDE.md` — Contexto de diseño
3. `CLAUDE.md` — Reglas Stone Marble

### Fase 0 — Fundamentos

Crear archivos CSS:
- `src/styles/spacing.css`
- `src/styles/forms.css`
- `src/styles/badges.css`

Crear showcases:
- `/showcase/styles/spacing`
- `/showcase/styles/forms`
- `/showcase/styles/badges`

### Comando para arrancar:

```bash
cd /Users/rafaelrillocabanne/Documents/projects/quafi-design-system
npm run dev
```

---

## Notas

- Los specs de Facu están bien definidos, el trabajo es de maquetación
- El design system Stone Marble está maduro
- ECharts tiene todo lo necesario para visualizaciones dinámicas
- Las animaciones de stock market ya existen (`value-flash-*`)

---

*Checkpoint creado: 2026-03-02*
