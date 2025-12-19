# Guía de Theming - Robot Resources Design System

**Documento de referencia para aplicar distintos estilos al proyecto**

---

## Tabla de Contenidos

1. [Resumen del Sistema](#resumen-del-sistema)
2. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
3. [Sistema de Variables CSS](#sistema-de-variables-css)
4. [Cómo Aplicar Distintos Estilos](#cómo-aplicar-distintos-estilos)
5. [Ejemplos Prácticos](#ejemplos-prácticos)
6. [Estrategias de Theming](#estrategias-de-theming)

---

## Resumen del Sistema

### Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 19.0.0 | UI Library |
| TypeScript | 5.2.2 | Type Safety |
| Vite | 5.0.8 | Build Tool |
| CSS Modules | - | Estilos con scope |
| Lucide React | latest | Iconografía |
| Zustand | 5.0.3 | State Management |
| React Router | 6.20.0 | Routing |

### Metodología de Diseño

- **Atomic Design**: Atoms → Molecules → Organisms → Templates → Pages
- **CSS Modules**: Estilos con scope automático por componente
- **CSS Custom Properties**: Variables globales para theming

---

## Arquitectura del Proyecto

```
src/
├── styles/
│   └── globals.css           # ⭐ PUNTO DE ENTRADA PARA THEMING
│
├── components/
│   ├── atoms/                # Componentes básicos (Button, Input, Badge...)
│   │   └── ComponentName/
│   │       ├── ComponentName.tsx
│   │       └── ComponentName.module.css  # ⭐ Usa variables de globals.css
│   │
│   ├── molecules/            # Combinaciones de atoms (Card, FormField...)
│   ├── organisms/            # Componentes complejos (Table, Modal, Sidebar...)
│   └── templates/            # Layouts de página
│
├── layouts/                  # Estructuras de página
├── pages/                    # Vistas/Rutas
└── main.tsx                  # Entry point (importa globals.css)
```

### Flujo de Estilos

```
main.tsx
    │
    └── import './styles/globals.css'  ← Define :root con CSS variables
            │
            └── Componentes usan var(--variable-name)
                    │
                    ├── Button.module.css → var(--primary)
                    ├── Card.module.css → var(--border)
                    └── Table.module.css → var(--spacing-lg)
```

---

## Sistema de Variables CSS

### Ubicación

**Archivo principal**: `src/styles/globals.css`

### Variables Disponibles

#### Colores Primarios

```css
--primary: rgba(0, 96, 129, 1);           /* Azul Institucional #006081 */
--primary-dark: rgba(0, 79, 107, 1);      /* Azul Oscuro #004F6B */
--accent: rgba(212, 247, 255, 1);         /* Azul Claro #D4F7FF */
```

#### Colores Secundarios

```css
--secondary: rgba(255, 255, 255, 1);      /* Blanco #FFFFFF */
--destructive: rgba(181, 0, 0, 1);        /* Rojo #B50000 */
--destructive-dark: rgba(139, 0, 0, 1);   /* Rojo Oscuro #8B0000 */
--destructive-light: rgba(252, 212, 212, 1); /* Rojo Claro #FCD4D4 */
```

#### Colores de Marca

```css
--brand-red: rgba(218, 41, 28, 1);        /* Rojo Institucional #DA291C */
```

#### Colores de Estado

```css
--success: rgba(11, 115, 41, 1);          /* Verde #0B7329 */
--success-light: rgba(206, 230, 198, 1);  /* Verde Claro #CEE6C6 */
--warning: rgba(250, 180, 0, 1);          /* Naranja #FAB400 */
--warning-light: rgba(255, 252, 224, 1);  /* Naranja Claro #FFFCE0 */
```

#### Escala de Grises

```css
--background: rgba(235, 235, 235, 1);     /* Gris 4 #EBEBEB */
--foreground: rgba(34, 34, 34, 1);        /* Gris 1 #222222 */
--muted: rgba(208, 208, 208, 1);          /* Gris 3 #D0D0D0 */
--border: rgba(208, 208, 208, 1);         /* Gris 3 #D0D0D0 */
--color-white: rgba(255, 255, 255, 1);    /* #FFFFFF */
--color-black: rgba(0, 0, 0, 1);          /* #000000 */
--color-gray-5: rgba(245, 245, 245, 1);   /* #F5F5F5 */
--color-gray-2: rgba(106, 106, 106, 1);   /* #6A6A6A */
```

#### Tipografía

```css
/* Tamaños */
--text-siglas: 24px;        /* Siglas - Bold/700 */
--text-titulo-1: 18px;      /* h1 - Semibold/600 */
--text-titulo-2: 16px;      /* h2, h3 - Semibold/600 */
--text-cuerpo-1: 14px;      /* p, span, button, input */
--text-cuerpo-2: 12px;      /* label, small */

/* Pesos */
--font-weight-bold: 700;
--font-weight-semibold: 600;
--font-weight-normal: 400;

/* Line Height */
--line-height-default: 1.2;
```

#### Espaciado

```css
--spacing-xs: 5px;
--spacing-sm: 10px;
--spacing-md: 15px;
--spacing-lg: 20px;
--spacing-xl: 30px;
--spacing-2xl: 40px;

--content-padding: 30px;    /* Padding del área de contenido */
--gap-elements: 20px;       /* Gap entre elementos */
--container-padding: 20px;  /* Padding de contenedores */
```

#### Border Radius

```css
--radius: 5px;              /* Botones, inputs */
--radius-card: 10px;        /* Cards, modales */
```

#### Sombras

```css
--elevation-sm: 0px 2px 8px 0px rgba(0, 0, 0, 0.10);  /* Tooltips, dropdowns */
--elevation-md: 0px 4px 12px 0px rgba(0, 0, 0, 0.15); /* Elevación media */
--elevation-lg: 0px 2px 8px 0px rgba(0, 0, 0, 0.20);  /* Cards, modales */

/* Alias */
--shadow-sm: var(--elevation-sm);
--shadow-md: var(--elevation-md);
--shadow-lg: var(--elevation-lg);
```

#### Iconografía

```css
--icon-size-lg: 32px;
--icon-size-md: 24px;
--icon-size-sm: 20px;
--icon-size-xs: 16px;
```

---

## Cómo Aplicar Distintos Estilos

### Opción 1: Modificar Variables en globals.css

**El método más simple para cambiar el tema completo.**

```css
/* src/styles/globals.css */

:root {
  /* Cambiar el color primario de azul a púrpura */
  --primary: rgba(128, 0, 128, 1);           /* Púrpura */
  --primary-dark: rgba(102, 0, 102, 1);      /* Púrpura oscuro */
  --accent: rgba(230, 190, 230, 1);          /* Púrpura claro */

  /* Los componentes automáticamente usan los nuevos colores */
}
```

**Impacto**: Todos los componentes que usan `var(--primary)` cambiarán automáticamente.

### Opción 2: Temas con Data Attributes

**Para soportar múltiples temas (claro/oscuro, marcas diferentes).**

```css
/* src/styles/globals.css */

/* Tema por defecto (Claro) */
:root {
  --primary: rgba(0, 96, 129, 1);
  --background: rgba(235, 235, 235, 1);
  --foreground: rgba(34, 34, 34, 1);
  /* ... */
}

/* Tema Oscuro */
[data-theme="dark"] {
  --primary: rgba(100, 180, 220, 1);
  --background: rgba(30, 30, 30, 1);
  --foreground: rgba(240, 240, 240, 1);
  --secondary: rgba(45, 45, 45, 1);
  --border: rgba(70, 70, 70, 1);
  /* ... */
}

/* Tema Alternativo (otra marca) */
[data-theme="brand-b"] {
  --primary: rgba(255, 100, 0, 1);
  --brand-red: rgba(255, 100, 0, 1);
  /* ... */
}
```

**Uso en React:**

```tsx
// src/App.tsx o un ThemeProvider
function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  );
}
```

### Opción 3: CSS Custom Properties Dinámicas

**Para cambios en tiempo de ejecución via JavaScript.**

```tsx
// Cambiar una variable CSS desde JavaScript
document.documentElement.style.setProperty('--primary', '#FF6600');

// Hook personalizado para theming
function useTheme() {
  const setColor = (variable: string, value: string) => {
    document.documentElement.style.setProperty(variable, value);
  };

  return { setColor };
}

// Uso
const { setColor } = useTheme();
setColor('--primary', 'rgba(255, 102, 0, 1)');
```

### Opción 4: Múltiples Archivos de Tema

**Para proyectos con temas muy diferentes.**

```
src/styles/
├── globals.css           # Variables base y reset
├── themes/
│   ├── claro.css        # Tema Claro (default)
│   ├── dark.css         # Tema Oscuro
│   └── custom.css       # Tema personalizado
```

```css
/* src/styles/themes/dark.css */
:root {
  --primary: rgba(100, 180, 220, 1);
  --background: rgba(18, 18, 18, 1);
  --foreground: rgba(255, 255, 255, 1);
  /* Override todas las variables necesarias */
}
```

```tsx
// main.tsx - Cargar tema basado en configuración
import './styles/globals.css';

// Cargar tema dinámicamente
const theme = localStorage.getItem('theme') || 'claro';
import(`./styles/themes/${theme}.css`);
```

### Opción 5: CSS-in-JS para Theming Avanzado

**Para casos donde necesitas lógica compleja.**

```tsx
// src/theme/ThemeProvider.tsx
import { createContext, useContext, useState } from 'react';

interface Theme {
  primary: string;
  background: string;
  foreground: string;
}

const themes: Record<string, Theme> = {
  light: {
    primary: 'rgba(0, 96, 129, 1)',
    background: 'rgba(235, 235, 235, 1)',
    foreground: 'rgba(34, 34, 34, 1)',
  },
  dark: {
    primary: 'rgba(100, 180, 220, 1)',
    background: 'rgba(18, 18, 18, 1)',
    foreground: 'rgba(255, 255, 255, 1)',
  }
};

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (name: string) => void;
}>({ theme: themes.light, setTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeName] = useState('light');
  const theme = themes[themeName];

  // Sincronizar con CSS Custom Properties
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeName }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

---

## Ejemplos Prácticos

### Ejemplo 1: Cambiar Colores de la Marca

**Objetivo**: Cambiar de azul Claro a verde corporativo.

```css
/* src/styles/globals.css */

:root {
  /* ANTES (Claro) */
  /* --primary: rgba(0, 96, 129, 1); */
  /* --primary-dark: rgba(0, 79, 107, 1); */
  /* --accent: rgba(212, 247, 255, 1); */

  /* DESPUÉS (Verde Corporativo) */
  --primary: rgba(0, 128, 64, 1);           /* Verde #008040 */
  --primary-dark: rgba(0, 102, 51, 1);      /* Verde oscuro */
  --accent: rgba(200, 240, 220, 1);         /* Verde claro */
}
```

**Resultado**: Todos los botones, links, bordes activos, etc. cambian a verde.

### Ejemplo 2: Modo Oscuro

```css
/* src/styles/globals.css */

:root {
  /* Tema claro por defecto */
  --primary: rgba(0, 96, 129, 1);
  --background: rgba(235, 235, 235, 1);
  --foreground: rgba(34, 34, 34, 1);
  --secondary: rgba(255, 255, 255, 1);
  --border: rgba(208, 208, 208, 1);
  --color-gray-5: rgba(245, 245, 245, 1);
  --color-gray-2: rgba(106, 106, 106, 1);
}

[data-theme="dark"] {
  --primary: rgba(100, 200, 255, 1);        /* Azul más brillante */
  --background: rgba(18, 18, 18, 1);        /* Fondo oscuro */
  --foreground: rgba(240, 240, 240, 1);     /* Texto claro */
  --secondary: rgba(35, 35, 35, 1);         /* Cards oscuros */
  --border: rgba(60, 60, 60, 1);            /* Bordes sutiles */
  --color-gray-5: rgba(45, 45, 45, 1);      /* Fondos secundarios */
  --color-gray-2: rgba(180, 180, 180, 1);   /* Textos secundarios */
  --muted: rgba(70, 70, 70, 1);
  --accent: rgba(30, 60, 80, 1);            /* Hover states */
}
```

### Ejemplo 3: Customizar un Componente Específico

**Si necesitas override puntual sin afectar el sistema:**

```css
/* src/components/atoms/Button/Button.module.css */

/* Variante especial solo para este componente */
.customBrand {
  /* Override variables localmente */
  background-color: #FF6600;  /* Color específico */
  color: white;
}

.customBrand:hover:not(:disabled) {
  background-color: #E65C00;
}
```

```tsx
// Uso
<Button variant="primary" className={styles.customBrand}>
  Botón Especial
</Button>
```

### Ejemplo 4: Crear un Nuevo Tema desde Cero

```css
/* src/styles/themes/corporate.css */

:root {
  /* Colores corporativos */
  --primary: rgba(51, 51, 153, 1);          /* Azul corporativo */
  --primary-dark: rgba(40, 40, 120, 1);
  --accent: rgba(230, 230, 255, 1);

  /* Colores neutros ajustados */
  --background: rgba(250, 250, 252, 1);
  --foreground: rgba(20, 20, 40, 1);

  /* Colores de estado personalizados */
  --success: rgba(0, 150, 80, 1);
  --warning: rgba(255, 180, 0, 1);
  --destructive: rgba(200, 50, 50, 1);

  /* Tipografía diferente */
  /* Nota: También hay que importar la fuente */

  /* Border radius más redondeados */
  --radius: 8px;
  --radius-card: 16px;

  /* Sombras más pronunciadas */
  --elevation-sm: 0px 4px 12px 0px rgba(0, 0, 0, 0.08);
  --elevation-lg: 0px 8px 24px 0px rgba(0, 0, 0, 0.12);
}
```

---

## Estrategias de Theming

### Para Cambios Globales de Marca

1. **Editar `globals.css`** directamente
2. Cambiar variables de color primarias
3. Todos los componentes se actualizan automáticamente

### Para Soporte Multi-Tema

1. Definir temas con **data attributes** (`[data-theme="dark"]`)
2. Crear un **ThemeProvider** en React
3. Persistir preferencia en **localStorage**

### Para Personalizaciones por Cliente

1. Crear archivos de tema separados (`themes/client-a.css`)
2. Cargar dinámicamente según configuración
3. Usar **CSS Custom Properties** para override en runtime

### Para Cambios Puntuales

1. **No modificar globals.css**
2. Usar clases adicionales en componentes específicos
3. Override con selectores más específicos

---

## Archivos Clave para Theming

| Archivo | Propósito |
|---------|-----------|
| `src/styles/globals.css` | Variables CSS globales (`:root`) |
| `src/main.tsx` | Entry point que importa globals.css |
| `src/components/*/ComponentName.module.css` | Estilos de componentes que usan variables |

---

## Resumen

1. **Todas las variables de estilo** están centralizadas en `globals.css`
2. **Todos los componentes** usan `var(--variable-name)` en sus CSS Modules
3. **Cambiar un valor en `:root`** afecta todo el sistema
4. **Data attributes** permiten múltiples temas
5. **JavaScript** puede modificar variables en runtime

---

**Última actualización**: 2025-12-06
