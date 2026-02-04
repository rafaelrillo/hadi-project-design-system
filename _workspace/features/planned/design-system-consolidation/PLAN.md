# Design System Consolidation - Plan Detallado

> Consolidación del design system SENTINEL para eliminar duplicaciones y establecer una única fuente de verdad.

**Fecha inicio**: 2026-02-04
**Estado**: Planned
**Prioridad**: Critical

---

## Objetivo

Reducir `theme.css` de 82KB a ~30KB eliminando duplicaciones y estableciendo archivos modulares como única fuente de verdad.

---

## Fase 1: Limpieza de Tipografías (Crítico)

### Paso 1.1: Auditar definiciones actuales
- [ ] Identificar todas las variables de fuente en `theme.css`
- [ ] Comparar con `typography.css` (fuente de verdad)
- [ ] Listar diferencias y duplicados

### Paso 1.2: Consolidar en typography.css
- [ ] Mover cualquier variable faltante a `typography.css`
- [ ] Eliminar duplicados de `theme.css` (líneas 658-660, 1229-1245)
- [ ] Eliminar variables confusas (`--fing-font-xs` que son tamaños, no pesos)

### Paso 1.3: Unificar nombres de pesos
- [ ] Decidir entre `--fing-font-light` vs `--font-weight-light`
- [ ] Usar solo un sistema de nombres
- [ ] Actualizar componentes que usen el nombre deprecated

### Paso 1.4: Verificar imports
- [ ] Asegurar que `typography.css` se importa en `globals.css` o `index.css`
- [ ] Verificar orden de imports (typography después de reset)

**Archivos a modificar:**
- `src/styles/theme.css`
- `src/styles/typography.css`
- `src/styles/globals.css`

---

## Fase 2: Limpieza de Colores (Crítico)

### Paso 2.1: Auditar definiciones actuales
- [ ] Identificar todas las variables de color en `theme.css`
- [ ] Comparar con `colors.css` (fuente de verdad)
- [ ] Listar diferencias y duplicados

### Paso 2.2: Agregar variables RGB
- [ ] Agregar `--fing-accent-rgb: 58, 106, 114`
- [ ] Agregar `--fing-positive-rgb: 74, 122, 106`
- [ ] Agregar `--fing-warning-rgb: 160, 138, 74`
- [ ] Agregar `--fing-negative-rgb: 138, 90, 74`
- [ ] Agregar `--fing-info-rgb: 74, 106, 122`

### Paso 2.3: Consolidar en colors.css
- [ ] Mover cualquier variable faltante a `colors.css`
- [ ] Eliminar duplicados de `theme.css`

### Paso 2.4: Reemplazar hardcoded colors en componentes
- [ ] `Tooltip.module.css` - reemplazar `#0a0a0c`
- [ ] `Button.module.css` - reemplazar `#ffffff`, `#e4e7eb`
- [ ] `LoadingScreen.module.css` - reemplazar `#a8acb3`
- [ ] `TrendIndicator.module.css` - usar `rgba(var(--fing-accent-rgb), 0.3)`
- [ ] `MetricCard.module.css` - usar variables
- [ ] `DateRangePicker.module.css` - reemplazar `rgba(0, 0, 0, 0.3)`
- [ ] `MaterialSelector.module.css` - reemplazar `rgba(0, 0, 0, 0.1)`
- [ ] `PerformanceChart.module.css` - reemplazar `rgba(0, 0, 0, 0.1)`

**Archivos a modificar:**
- `src/styles/theme.css`
- `src/styles/colors.css`
- 8+ componentes con hardcoded colors

---

## Fase 3: Limpieza de Sombras (Crítico)

### Paso 3.1: Auditar definiciones actuales
- [ ] Identificar todas las variables de sombra en `theme.css`
- [ ] Comparar con `shadows.css`
- [ ] Verificar que `shadows.css` se importa (actualmente no lo hace)

### Paso 3.2: Consolidar en shadows.css
- [ ] Mover cualquier variable faltante a `shadows.css`
- [ ] Eliminar duplicados de `theme.css` (líneas 293-375)
- [ ] Agregar import de `shadows.css` en `globals.css`

### Paso 3.3: Reemplazar hardcoded shadows en componentes
- [ ] `Tabs.module.css` - usar variable
- [ ] `MetricCard.module.css` - usar variable
- [ ] `NewsCard.module.css` - usar `--inset-1`
- [ ] `DateRangePicker.module.css` - usar variable
- [ ] `Button.module.css` - usar variable
- [ ] `MaterialSelector.module.css` - usar variable
- [ ] `PerformanceChart.module.css` - usar variable
- [ ] `Toast.module.css` - usar variable
- [ ] `Table.module.css` - usar variable
- [ ] `LoadingScreen.module.css` - completar con variable

**Archivos a modificar:**
- `src/styles/theme.css`
- `src/styles/shadows.css`
- `src/styles/globals.css`
- 10+ componentes con hardcoded shadows

---

## Fase 4: Consolidar Spacing (Importante)

### Paso 4.1: Decidir sistema único
- [ ] Auditar los 3 sistemas: `--fing-space-*`, `--spacing-*`, `--*-padding`
- [ ] Decidir cuál mantener (recomendado: `--fing-space-*`)
- [ ] Documentar decisión

### Paso 4.2: Eliminar redundancias
- [ ] Eliminar `--spacing-*` aliases si redundan
- [ ] Convertir `--panel-padding`, `--inset-padding` a referencias
- [ ] Actualizar componentes que usen sistema deprecated

### Paso 4.3: Documentar uso
- [ ] Crear comentarios en theme.css sobre cuándo usar cada variable
- [ ] Agregar a documentación del design system

**Archivos a modificar:**
- `src/styles/theme.css`
- Componentes que usen spacing deprecated

---

## Fase 5: Crear Estructura de Imports (Importante)

### Paso 5.1: Crear index.css centralizado
- [ ] Crear `src/styles/index.css`
- [ ] Definir orden correcto de imports:
  ```css
  @import './colors.css';
  @import './typography.css';
  @import './shadows.css';
  @import './letterpress.css';
  @import './theme.css';  /* Solo lo que no está en modulares */
  @import './globals.css';
  @import './responsive.css';
  ```

### Paso 5.2: Actualizar entry point
- [ ] Modificar `main.tsx` o `App.tsx` para importar `index.css`
- [ ] Eliminar imports individuales redundantes

### Paso 5.3: Verificar cascada
- [ ] Testear que todas las variables están disponibles
- [ ] Verificar que no hay conflictos de orden

**Archivos a crear/modificar:**
- `src/styles/index.css` (nuevo)
- `src/main.tsx` o `src/App.tsx`

---

## Fase 6: Crear Tokens de Estado (Importante)

### Paso 6.1: Definir tokens hover
- [ ] `--shadow-hover` (raised-2 → raised-3)
- [ ] `--color-hover` (lighten 10%)
- [ ] `--letterpress-hover` (aumentar contraste)

### Paso 6.2: Definir tokens active
- [ ] `--shadow-active` (raised → inset)
- [ ] `--color-active` (darken 5%)

### Paso 6.3: Definir tokens disabled
- [ ] `--shadow-disabled` (none o muy sutil)
- [ ] `--color-disabled` (50% opacity)
- [ ] `--letterpress-disabled` (reducido)

### Paso 6.4: Definir tokens focus
- [ ] `--shadow-focus` (+ glow ring)
- [ ] `--outline-focus` (accent color ring)

**Archivos a modificar:**
- `src/styles/theme.css` o nuevo `src/styles/states.css`

---

## Fase 7: Tokens de Componentes (Nice-to-have)

### Paso 7.1: Button tokens
- [ ] `--btn-bg`, `--btn-bg-hover`, `--btn-bg-active`
- [ ] `--btn-text`, `--btn-text-hover`
- [ ] `--btn-border`, `--btn-shadow`, `--btn-radius`

### Paso 7.2: Input tokens
- [ ] `--input-bg`, `--input-bg-focus`
- [ ] `--input-border`, `--input-border-focus`
- [ ] `--input-text`, `--input-placeholder`

### Paso 7.3: Card tokens
- [ ] `--card-bg`, `--card-border`, `--card-shadow`

### Paso 7.4: Modal tokens
- [ ] `--modal-bg`, `--modal-shadow`, `--modal-overlay`

**Archivos a modificar:**
- `src/styles/theme.css` o nuevo `src/styles/components.css`

---

## Fase 8: Limpieza Final (Nice-to-have)

### Paso 8.1: Eliminar archivos deprecated
- [ ] Eliminar `src/styles/fonts.css` (vacío)
- [ ] Decidir sobre `lab/light-engine.css` (mantener o integrar)
- [ ] Decidir sobre `lab/textures.css`

### Paso 8.2: Documentar el sistema
- [ ] Actualizar `CLAUDE.md` con estructura final
- [ ] Crear guía visual de uso de tokens
- [ ] Documentar reglas RAISED → INSET → GLASS

### Paso 8.3: Validar en showcase
- [ ] Verificar que todos los showcases funcionan
- [ ] Actualizar ejemplos si es necesario

---

## Checklist de Verificación Final

- [ ] `theme.css` reducido a <35KB
- [ ] No hay variables duplicadas entre archivos
- [ ] Todos los componentes usan variables (no hardcoded)
- [ ] Variables RGB disponibles para todos los colores semánticos
- [ ] Sistema de spacing unificado
- [ ] Imports centralizados en `index.css`
- [ ] Documentación actualizada
- [ ] Todos los tests pasan
- [ ] Showcase visual verificado

---

## Notas

- Hacer commits pequeños por cada paso completado
- Verificar visualmente después de cada cambio
- Mantener backward compatibility donde sea posible
- Documentar cualquier breaking change

---

## Tracking

| Fase | Estado | Fecha Inicio | Fecha Fin |
|------|--------|--------------|-----------|
| 1. Tipografías | Pending | - | - |
| 2. Colores | Pending | - | - |
| 3. Sombras | Pending | - | - |
| 4. Spacing | Pending | - | - |
| 5. Imports | Pending | - | - |
| 6. Estados | Pending | - | - |
| 7. Componentes | Pending | - | - |
| 8. Limpieza | Pending | - | - |
