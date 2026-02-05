# Design System Consolidation - Plan Detallado

> Consolidación del design system SENTINEL para eliminar duplicaciones y establecer una única fuente de verdad.

**Fecha inicio**: 2026-02-04
**Estado**: Planned
**Prioridad**: Critical

---

## Objetivo

Reducir `theme.css` de 82KB a ~30KB eliminando duplicaciones y estableciendo archivos modulares como única fuente de verdad.

---

## Fase 1: Limpieza de Tipografías (Crítico) ✅ DONE

> Completado 2026-02-04. Removidas 129 líneas duplicadas de theme.css (82KB → 78KB).
> 14 componentes migrados, 57+ reemplazos. Aliases legacy eliminados.

- [x] Auditar definiciones actuales
- [x] Consolidar en typography.css
- [x] Unificar nombres de pesos
- [x] Verificar imports

---

## Fase 2: Limpieza de Colores + RGB (Crítico) ✅ DONE

> Completado 2026-02-05. 11 RGB companions agregados, ~90 líneas duplicadas removidas
> de theme.css, 159 rgba hardcodeados migrados en 12 componentes, status system completo
> movido a colors.css, legacy --fing-teal aliases eliminados.

- [x] Auditar definiciones: 67 vars en colors.css duplicadas en theme.css
- [x] Agregar RGB companions: accent, positive, negative, warning, info, text-accent, marble-base, border-base, black, status-neutral (11 total)
- [x] Consolidar colors.css como fuente de verdad canónica (+20 status tokens)
- [x] Eliminar ~90 líneas duplicadas de theme.css (logo, accent, semantic, black, text, emblem, borders, status)
- [x] Migrar letterpress.css: 24+ rgba hardcodeados → var()
- [x] Migrar 12 componentes: DashboardPage(55), DepthLayer(22), PortfolioSimulator(27), PortfolioView(28), WalletView(14), SettingsPage(2), DashboardLayout(2), Badge(3), PortfolioPerformance(3), FingHome(1→reverted), FingWordmark(2)
- [x] Actualizar ColorsShowcase.tsx con sección RGB + Status System
- [x] Eliminar legacy --fing-teal aliases

**Nota**: FingHome.module.css y DashboardPage.module.css restaurados a valores explícitos
(sirven como referencia canónica del stone marble). shadows.css también restaurado.

---

## Fase 3: Limpieza de Sombras (Crítico) ✅ DONE

> Completado 2026-02-05. shadows.css expandido con composites (focus-ring, glass-layered).
> 5 componentes CSS migrados (Card, Header, Toast, Table, MaterialSelector).
> 3 showcase pages migrados (Icons, Colors, Buttons) - ~70 hardcoded values.
> ShowcaseSection + ComponentPreview + ShowcaseLayout migrados a sistema Stone Marble.

- [x] Auditar definiciones actuales
- [x] Agregar shadow composites: --shadow-focus-ring, --shadow-focus-ring-sm, --shadow-glass-layered
- [x] Migrar Card.module.css: ~16 box-shadow edits (raised-*, inset-*, glow-*, highlight-*)
- [x] Migrar Header.module.css: glass → --shadow-glass-layered, neuPanel highlight
- [x] Migrar Toast.module.css: ~13 edits (raised-*, highlight, focus-ring)
- [x] Migrar Table.module.css: 7 edits (raised-*, inset-*, highlight)
- [x] Migrar MaterialSelector.module.css: fix dark-only anomaly
- [x] Migrar IconsShowcase.tsx: 4 types hardcoded colors → CSS vars
- [x] Migrar ColorsShowcase.tsx: 6 rgba letterpress → RGB companions
- [x] Migrar ButtonShowcase.tsx: ~50+ text-shadows → var(--shadow-light/dark), accent → RGB
- [x] Fix ShowcaseSection.module.css: --neu-shadow-* 60px blur → var(--raised-3), letterpress added
- [x] Fix ComponentPreview.module.css: hardcoded → var(--glass-*)
- [x] Fix ShowcaseLayout.tsx: content bg → var(--marble-base), sidebar → var(--raised-3)

---

## Fase 4: Consolidar Spacing (Importante) ✅ DONE

> Completado 2026-02-05. Sistema unificado en `--fing-space-*`.
> Removidos 7 aliases `--spacing-*`, 5 aliases `--fing-spacing-*`, 2 hardcoded paddings.
> Migrados 4 archivos: LandingLayout, Form, Card, SpacingShowcase.

- [x] Auditar los 3 sistemas: `--fing-space-*` (418 usos), `--spacing-*` (6 usos), `--*-padding` (1 uso)
- [x] Decidir cuál mantener: `--fing-space-*` (escala Tailwind-like basada en 4px/rem)
- [x] Eliminar `--spacing-*` aliases (7 vars) de theme.css
- [x] Eliminar `--fing-spacing-*` aliases (5 vars, dead code) de theme.css
- [x] Eliminar `--panel-padding` y `--inset-padding` (hardcoded, unused)
- [x] Migrar LandingLayout.module.css: `--spacing-2xl/3xl/lg` → `--fing-space-12/16/6`
- [x] Migrar Form.module.css: `--spacing-lg` → `--fing-space-6`
- [x] Migrar Card.module.css: `--panel-padding` → `--fing-space-8`
- [x] Actualizar SpacingShowcase.tsx con documentación del sistema canónico

---

## Fase 5: Crear Estructura de Imports (Importante) ✅ DONE

> Completado 2026-02-05. Creado index.css centralizado.
> main.tsx simplificado a un solo import.

- [x] Crear `src/styles/index.css` con cascade order documentado
- [x] Order: globals → colors → typography → shadows → letterpress → theme → responsive → fing.css
- [x] Actualizar main.tsx para importar solo `./styles/index.css`
- [x] Eliminar 8 imports individuales redundantes
- [x] Verificar build pasa correctamente

---

## Fase 6: Crear Tokens de Estado (Importante) ✅ DONE

> Completado 2026-02-05. Tokens de estado agregados a shadows.css, letterpress.css, colors.css.
> Patrones completos para hover, active, disabled, focus.

- [x] shadows.css: `--shadow-hover`, `--shadow-active`, `--shadow-disabled`, `--shadow-focus-ring-strong`, `--shadow-raised-focus`, `--shadow-inset-focus`
- [x] letterpress.css: `--lp-hover`, `--lp-active`, `--lp-disabled`, `--lp-focus`, `--lp-embossed-hover/active/disabled`
- [x] colors.css: `--fing-accent-hover`, `--fing-accent-active`, `--fing-bg-hover`, `--fing-bg-active`, `--fing-opacity-disabled`

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
| 1. Tipografías | **DONE** | 2026-02-04 | 2026-02-04 |
| 2. Colores + RGB | **DONE** | 2026-02-05 | 2026-02-05 |
| 3. Sombras | **DONE** | 2026-02-05 | 2026-02-05 |
| 4. Spacing | **DONE** | 2026-02-05 | 2026-02-05 |
| 5. Imports | **DONE** | 2026-02-05 | 2026-02-05 |
| 6. Estados | **DONE** | 2026-02-05 | 2026-02-05 |
| 7. Componentes | Pending | - | - |
| 8. Limpieza | Pending | - | - |
