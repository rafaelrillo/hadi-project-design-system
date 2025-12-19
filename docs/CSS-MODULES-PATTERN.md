# Patrón de CSS Modules - Robot Resources Design System

Este documento explica el patrón de CSS Modules implementado en el proyecto.

## Estado de la Migración

**✅ COMPLETADA** - Todos los componentes han sido migrados a CSS Modules.

| Categoría | Componentes | Estado |
|-----------|-------------|--------|
| Atoms | Badge, Button, Checkbox, Icon, Input (Text, Dropdown, Textarea), Tooltip, Typography | ✅ |
| Molecules | Card, FormField, MenuItem, NotificationCard, Pagination, SearchBar, SearchbarItem, SidebarItem | ✅ |
| Organisms | Form, Modal, PaginatedTable, Searchbar, Sidebar, Table | ✅ |
| Showcase | ComponentPreview, ShowcaseSection, SidebarGroup | ✅ |

**Estilos inline restantes (aceptables):** 5 - Son props dinámicas del usuario:
- `Table`: `column.width` (ancho por columna)
- `Searchbar`: `filter.width` (ancho por filtro)
- `Modal`: `maxWidth` (ancho máximo personalizado)
- `ComponentPreview`: `padding` (padding personalizado)

---

## ¿Por qué CSS Modules?

**Antes (Estilos inline):**
- ❌ Código difícil de leer (JSX mezclado con objetos de estilos)
- ❌ Estilos no reutilizables
- ❌ Performance (objetos recreados en cada render)
- ❌ Difícil de mantener

**Ahora (CSS Modules):**
- ✅ Separación clara de estilos y lógica
- ✅ Estilos reutilizables y mantenibles
- ✅ Mejor performance
- ✅ Scoped automáticamente (sin conflictos de nombres)
- ✅ TypeScript support

---

## Estructura de Archivos

```
ComponentName/
├── ComponentName.tsx          # Componente React
├── ComponentName.module.css   # Estilos CSS
├── ComponentName.test.tsx     # Tests
└── index.ts                   # Re-export
```

---

## Patrón de Implementación

### 1. Archivo CSS Module

**`Button.module.css`**
```css
/* Path: src/components/atoms/Button/Button.module.css */

/* Base styles */
.button {
  height: 40px;
  padding: 7.5px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 200ms;
}

/* Variantes */
.primary {
  background-color: #006081;
  color: #FFFFFF;
}

.primary:hover:not(:disabled) {
  background-color: #004F6B;
}

.secondary {
  background-color: #FFFFFF;
  color: #006081;
  border: 1px solid #006081;
}

/* Estados */
.button:disabled {
  background-color: #D0D0D0;
  color: #6A6A6A;
  cursor: not-allowed;
}

.button:focus {
  outline: 2px solid #006081;
  outline-offset: 2px;
}
```

### 2. Componente TSX

**`Button.tsx`**
```tsx
// Path: src/components/atoms/Button/Button.tsx
import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'destructive';
  disabled?: boolean;
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  disabled = false,
  className
}: ButtonProps) {
  const getClassName = (): string => {
    const classes = [styles.button];

    // Variante
    if (variant === 'primary') classes.push(styles.primary);
    else if (variant === 'secondary') classes.push(styles.secondary);
    else if (variant === 'destructive') classes.push(styles.destructive);

    // className personalizado
    if (className) classes.push(className);

    return classes.join(' ');
  };

  return (
    <button className={getClassName()} disabled={disabled}>
      {children}
    </button>
  );
}
```

### 3. Helper Function (Recomendado)

Usar esta función helper al inicio de cada componente:

```tsx
const getClassName = (...classes: (string | undefined | false)[]) =>
  classes.filter(Boolean).join(' ');
```

**Uso:**
```tsx
<div className={getClassName(
  styles.container,
  isActive && styles.active,
  disabled && styles.disabled,
  className
)}>
```

---

## Configuración

### TypeScript

**`src/types/css-modules.d.ts`**
```typescript
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
```

### Jest

**`jest.config.ts`**
```typescript
moduleNameMapper: {
  '\\.module\\.css$': 'identity-obj-proxy',
  '\\.css$': '<rootDir>/__mocks__/styleMock.js',
}
```

**`__mocks__/styleMock.js`**
```javascript
module.exports = {};
```

**Dependencia:**
```bash
npm install --save-dev identity-obj-proxy
```

---

## Testing con CSS Modules

### ✅ Buenas Prácticas

```tsx
// Verificar renderizado
it('should render button', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button')).toBeInTheDocument();
});

// Verificar comportamiento
it('should call onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click</Button>);
  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalled();
});

// Verificar atributos
it('should be disabled', () => {
  render(<Button disabled>Click</Button>);
  expect(screen.getByRole('button')).toBeDisabled();
});

// Verificar estructura
it('should render with icon', () => {
  render(<Button icon={<Icon />}>Click</Button>);
  expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument();
});
```

### ❌ Evitar

```tsx
// NO verificar clases CSS específicas (fallan con mocks)
expect(button).toHaveClass('primary');
expect(button.className).toContain('button');

// NO verificar estilos inline (ya no existen)
expect(button).toHaveStyle({ backgroundColor: '#006081' });
```

---

## Valores Dinámicos (Inline Styles Aceptables)

Cuando el usuario pasa un valor dinámico como prop, es aceptable usar inline style:

```tsx
// El width viene como prop del usuario
<th
  className={styles.th}
  style={column.width ? { width: column.width } : undefined}
>
```

**Patrón:** Solo aplicar inline si el valor existe:
```tsx
style={value ? { property: value } : undefined}
```

---

## CSS Custom Properties para Valores Dinámicos

Para valores que cambian según props pero tienen un default:

**CSS:**
```css
.table {
  --table-row-height: 40px;
}

.tableCompact {
  --table-row-height: 30px;
}

.th, .td {
  height: var(--table-row-height);
}
```

**TSX:**
```tsx
<table className={getClassName(
  styles.table,
  rowHeight === 'compact' && styles.tableCompact
)}>
```

---

## Tokens del Design System

### Colores
```css
/* Institucionales */
--color-primary: #006081;      /* Azul Claro */
--color-brand: #DA291C;        /* Rojo Claro (solo logo/product key) */

/* Estados */
--color-success: #0B7329;
--color-warning: #FAB400;
--color-error: #B50000;

/* Neutrales */
--color-text: #222222;
--color-text-secondary: #6A6A6A;
--color-border: #D0D0D0;
--color-background: #F5F5F5;
--color-white: #FFFFFF;
```

### Tipografía
```css
font-family: 'Open Sans', sans-serif;
line-height: 1.2;

/* Tamaños */
--font-size-xs: 12px;
--font-size-sm: 14px;
--font-size-md: 16px;
--font-size-lg: 18px;
--font-size-xl: 24px;
```

### Espaciado
```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 12px;
--spacing-lg: 16px;
--spacing-xl: 20px;
--spacing-2xl: 24px;
--spacing-3xl: 32px;
```

### Border Radius
```css
--radius-sm: 2px;   /* Checkboxes */
--radius-md: 5px;   /* Buttons, inputs */
--radius-lg: 10px;  /* Cards, modals */
```

### Shadows
```css
--shadow-sm: 0px 2px 8px 0px rgba(0,0,0,0.1);  /* Dropdowns, tooltips */
--shadow-md: 0px 2px 8px 0px rgba(0,0,0,0.2);  /* Cards, modals */
```

---

## Checklist para Nuevos Componentes

- [ ] Crear `ComponentName.module.css` con estilos
- [ ] Importar: `import styles from './ComponentName.module.css'`
- [ ] Usar helper `getClassName()` para composición de clases
- [ ] NO usar estilos inline excepto para valores dinámicos del usuario
- [ ] Tests verifican funcionalidad, no clases CSS
- [ ] Seguir tokens del design system
- [ ] Verificar visualmente en el navegador

---

**Última actualización:** 2025-12-06
**Estado:** ✅ Migración completada
