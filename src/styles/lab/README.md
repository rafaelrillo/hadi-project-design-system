# FING Design System Lab

Este folder contiene **código experimental** y **legacy** que está siendo evaluado o deprecado.

## Estructura

```
lab/
├── README.md           ← Este archivo
├── light-engine.css    ← Sistema de iluminación dinámica (experimental)
├── textures.css        ← Texturas para Material Theming (experimental)
└── legacy/             ← Variables deprecadas (para migración)
```

## Archivos Experimentales

### `light-engine.css`
Sistema de iluminación dinámica basado en Josh W. Comeau. Calcula sombras neumórficas basadas en un ángulo de luz que puede animarse.

**Estado:** Experimental - funciona bien pero requiere `LightEngineProvider` wrapper.

**Uso:** Solo en páginas de showcase que demuestren el efecto:
```tsx
import '../../styles/lab/light-engine.css';

function MyShowcase() {
  return (
    <LightEngineProvider initialAnimating={true}>
      <MyShowcaseContent />
    </LightEngineProvider>
  );
}
```

### `textures.css`
Texturas de ruido/grain para el sistema de Material Theming (piedra, mármol, concreto, etc.).

**Estado:** Experimental - depende del themeStore.

## Reglas de Uso

1. **NO importar en `main.tsx`** - Los archivos del lab no deben cargarse globalmente
2. **Importar solo en páginas de showcase** - Para demostrar funcionalidades experimentales
3. **Documentar con fecha** - Agregar comentarios con fecha para tracking
4. **Promover o eliminar en 30 días** - No dejar código experimental indefinidamente

## Cómo Promover a Producción

Si un experimento está listo para producción:

1. Mover el archivo a `src/styles/` (nivel raíz)
2. Agregar import en `main.tsx`
3. Actualizar documentación en `CLAUDE.md`
4. Actualizar este README

## Cómo Deprecar

Si un experimento no funcionó:

1. Mover a `legacy/` si otros archivos lo referencian
2. O eliminar directamente si no tiene dependencias
3. Documentar la decisión en commits

## Design System Oficial

Los archivos oficiales están en `src/styles/` (nivel raíz):

| Archivo | Contenido | Estado |
|---------|-----------|--------|
| `colors.css` | Paleta Natural Mineral | Oficial |
| `typography.css` | Familias, tamaños, pesos, tracking | Oficial |
| `shadows.css` | Sistema RAISED/INSET/GLASS | Oficial |
| `letterpress.css` | Text-shadows neumórficos | Oficial |
| `theme.css` | Tokens adicionales (legacy en proceso de limpieza) | Mixto |
| `globals.css` | Reset y base styles | Oficial |
