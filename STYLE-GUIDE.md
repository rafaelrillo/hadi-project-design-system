# SENTINEL Glass-Neumorphism Style Guide

> Guía rápida de referencia para aplicar el design system a la app.

---

## 1. Colores Base

```css
/* Fondo neumórfico */
background: #e0e5ec;

/* Sombras neumórficas */
--shadow-dark: #a3b1c6;
--shadow-light: #ffffff;

/* Texto */
--text-primary: #2d3748;
--text-secondary: #5a6578;
--text-muted: #8896a6;

/* Accent */
--accent-primary: #4a9a9c;
```

---

## 2. Sombras Neumórficas (Estáticas)

### Panel Elevado (flotando sobre superficie)
```css
box-shadow:
  8px 8px 20px #a3b1c6,
  -8px -8px 20px #ffffff;
```

### Panel Hundido (inset)
```css
box-shadow:
  inset 5px 5px 15px #a3b1c6,
  inset -5px -5px 15px #ffffff;
```

---

## 3. Glassmorphism

### Item Base
```css
background: rgba(255, 255, 255, 0.25);
backdrop-filter: blur(8px);
-webkit-backdrop-filter: blur(8px);
border: 1px solid rgba(255, 255, 255, 0.6);
border-radius: 12px;
```

### Item Hover
```css
background: rgba(255, 255, 255, 0.45);
box-shadow:
  0 2px 8px rgba(0, 0, 0, 0.08),
  inset 0 1px 0 rgba(255, 255, 255, 0.8);
```

### Item Active
```css
background: rgba(255, 255, 255, 0.55);
backdrop-filter: blur(12px);
box-shadow:
  0 4px 12px rgba(0, 0, 0, 0.1),
  inset 0 1px 0 rgba(255, 255, 255, 0.9);
```

---

## 4. Border Radius

| Uso | Valor |
|-----|-------|
| Elementos pequeños | 8px |
| Items, inputs | 12px |
| Cards, sections | 15px |
| Containers, panels | 20px |

---

## 5. Patrón React con Sombras Dinámicas

```tsx
import { useMemo } from 'react';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

function MyContent() {
  const { lightAngle } = useLightEngine();

  // Calcular offsets de sombra basados en ángulo de luz
  const shadowOffsets = useMemo(() => {
    const angle = (lightAngle + 180) * (Math.PI / 180);
    return { x: Math.cos(angle), y: Math.sin(angle) };
  }, [lightAngle]);

  // Colores base
  const LIGHT = {
    base: '#e0e5ec',
    shadowDark: '#a3b1c6',
    shadowLight: '#ffffff',
  };

  // Función para sombra elevada
  const neuPanel = (dist: number, blur: number) => {
    const { x, y } = shadowOffsets;
    return `${-x * dist}px ${-y * dist}px ${blur}px ${LIGHT.shadowLight}, ${x * dist}px ${y * dist}px ${blur}px ${LIGHT.shadowDark}`;
  };

  // Función para sombra hundida
  const neuInset = (dist: number, blur: number) => {
    const { x, y } = shadowOffsets;
    return `inset ${x * dist}px ${y * dist}px ${blur}px ${LIGHT.shadowDark}, inset ${-x * dist}px ${-y * dist}px ${blur}px ${LIGHT.shadowLight}`;
  };

  return (
    <div style={{
      background: LIGHT.base,
      minHeight: '100vh',
      padding: '24px'
    }}>
      {/* Panel elevado */}
      <div style={{
        background: LIGHT.base,
        borderRadius: '20px',
        padding: '24px',
        boxShadow: neuPanel(8, 20),
        transition: 'box-shadow 50ms linear',
      }}>
        <h1>Título</h1>

        {/* Items de cristal */}
        <button style={{
          background: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          borderRadius: '12px',
          padding: '10px 16px',
        }}>
          Botón Glass
        </button>
      </div>

      {/* Panel hundido */}
      <div style={{
        background: LIGHT.base,
        borderRadius: '15px',
        padding: '20px',
        boxShadow: neuInset(5, 15),
        marginTop: '24px',
      }}>
        Contenido en área hundida
      </div>
    </div>
  );
}

export function MyPage() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <MyContent />
    </LightEngineProvider>
  );
}
```

---

## 6. Sidebar Nuevo

```tsx
import { Sidebar } from '@organisms/Sidebar';
import type { SidebarSection } from '@organisms/Sidebar';

const sections: SidebarSection[] = [
  {
    title: 'Sección',
    items: [
      { icon: HomeIcon, label: 'Item', isActive: true, badge: 3 },
    ],
  },
];

const user = {
  name: 'Usuario',
  email: 'user@email.com',
};

<Sidebar
  sidebarStyle="expanded"
  sections={sections}
  user={user}
  showIconRail={true}
  showExpandedPanel={true}
  onSearch={(v) => console.log(v)}
/>
```

---

## 7. Valores Rápidos Copy-Paste

### Background Page
```css
background: #e0e5ec;
min-height: 100vh;
padding: 24px;
```

### Header/Card Elevado
```css
background: #e0e5ec;
border-radius: 15px;
padding: 24px;
box-shadow: 8px 8px 20px #a3b1c6, -8px -8px 20px #ffffff;
```

### Input/Item Glass
```css
background: rgba(255, 255, 255, 0.25);
backdrop-filter: blur(8px);
border: 1px solid rgba(255, 255, 255, 0.6);
border-radius: 12px;
padding: 10px 12px;
```

### Contenedor Inset
```css
background: #e0e5ec;
border-radius: 15px;
padding: 20px;
box-shadow: inset 5px 5px 15px #a3b1c6, inset -5px -5px 15px #ffffff;
```

### Texto
```css
/* Título */
color: #2d3748;
font-weight: 600;

/* Secundario */
color: #5a6578;

/* Muted */
color: #8896a6;

/* Accent */
color: #4a9a9c;
```

---

## 8. Transiciones

```css
/* Sombras dinámicas */
transition: box-shadow 50ms linear;

/* Elementos interactivos */
transition: all 150ms ease;

/* Navegación */
transition: all 200ms ease;
```

---

## 9. Checklist de Implementación

- [ ] Fondo de página: `#e0e5ec`
- [ ] Containers: Sombras neumórficas elevadas
- [ ] Items interactivos: Efecto glass con `backdrop-filter`
- [ ] Áreas de contenido estático: Sombras inset
- [ ] Border radius consistente (12px items, 15px cards, 20px containers)
- [ ] Transiciones suaves para sombras (50ms)
- [ ] Texto oscuro sobre fondo claro
- [ ] Accent color: `#4a9a9c`
