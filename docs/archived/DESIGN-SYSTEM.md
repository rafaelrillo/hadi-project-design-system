# Design System SENTINEL v2.0.0

**Versión**: 1.0.1
**Última actualización**: 29 de octubre, 2025
**Ecosistema**: Investment Analysis Platform
**Tipo de Aplicaciones**: SPA (Single Page Application)
**Enfoque**: System-First, priorizando reutilización de componentes

---

## 📋 Tabla de Contenidos

1. [Principios de Diseño](#principios-de-diseño)
2. [Paleta de Colores](#paleta-de-colores)
3. [Tipografía](#tipografía)
4. [Iconografía](#iconografía)
5. [Sistema de Espaciado](#sistema-de-espaciado)
6. [Grid System](#grid-system)
7. [Elevación y Sombras](#elevación-y-sombras)
8. [Border Radius](#border-radius)
9. [Resoluciones y Responsive](#resoluciones-y-responsive)
10. [Accesibilidad](#accesibilidad)

---

## 🎯 Principios de Diseño

### Principios Clave

1. **Claridad**: Interfaces claras y fáciles de entender
2. **Consistencia**: Uso coherente de patrones y componentes en toda la aplicación
3. **Jerarquía Visual**: Organización clara de la información para guiar al usuario
4. **Feedback Visible**: Retroalimentación inmediata en todas las interacciones
5. **Accesibilidad**: Diseño inclusivo para todos los usuarios (WCAG 2.1 AA → AAA)
6. **Escalabilidad**: Sistema preparado para crecer y adaptarse a nuevas necesidades

### Fundamentos Base

- **Accesibilidad**: AAA en contraste de colores
- **Visual distinta**: Diferenciación del standard design systems
- **Consistencia**: Uso coherente de tokens y componentes
- **Escalabilidad**: Sistema preparado para crecer

---

## 🎨 Paleta de Colores

### Jerarquía de Colores

El sistema emplea 4 niveles jerárquicos establecidos por porcentaje de uso:

#### **Escala de Grises** (Predominante)

El blanco es el color principal para contenedores y fondos.

| Nombre | Hex     | RGBA                   | Uso                                        | Variable CSS      |
| ------ | ------- | ---------------------- | ------------------------------------------ | ----------------- |
| Blanco | #FFFFFF | rgba(255, 255, 255, 1) | Contenedores, fondos principales           | `--color-white`   |
| Gris 5 | #F5F5F5 | rgba(245, 245, 245, 1) | Fondos secundarios                         | `--color-gray-5`  |
| Gris 4 | #EBEBEB | rgba(235, 235, 235, 1) | Background general de la aplicación        | `--background`    |
| Gris 3 | #D0D0D0 | rgba(208, 208, 208, 1) | Bordes, divisores                          | `--border`, `--muted` |
| Gris 2 | #6A6A6A | rgba(106, 106, 106, 1) | Textos secundarios, iconos                 | `--color-gray-2`  |
| Gris 1 | #222222 | rgba(34, 34, 34, 1)    | Textos principales, alto contraste         | `--foreground`    |
| Negro  | #000000 | rgba(0, 0, 0, 1)       | Componentes que necesitan máximo contraste | `--color-black`   |

#### **Colores Primarios**

Principales elementos interactivos y notificaciones informativas.

| Nombre             | Hex     | RGBA                   | Uso                                                 | Variable CSS         |
| ------------------ | ------- | ---------------------- | --------------------------------------------------- | -------------------- |
| Background Elevated         | #1a2332 | rgba(212, 247, 255, 1) | Estados hover, backgrounds suaves                   | `--accent`           |
| **Azul Institucional** | **#5ba3a5** | **rgba(0, 96, 129, 1)** | **Botones, links, elementos activos (COLOR PRINCIPAL)** | `--primary`          |
| Azul Oscuro        | #004F6B | rgba(0, 79, 107, 1)    | Estados pressed, énfasis adicional                  | `--primary-dark`     |

#### **Colores Secundarios**

Uso limitado para acciones irreversibles y elementos de marca.

| Nombre             | Hex     | RGBA                   | Uso                                                     | Variable CSS         |
| ------------------ | ------- | ---------------------- | ------------------------------------------------------- | -------------------- |
| Accent Light         | #FCD4D4 | rgba(252, 212, 212, 1) | Backgrounds de error suaves                             | `--destructive-light`|
| **Accent Primary** | **#5ba3a5** | **rgba(218, 41, 28, 1)**   | **SOLO para elementos que elementos de branding SENTINEL (Product Key)** | `--brand-red`        |
| Rojo               | #B50000 | rgba(181, 0, 0, 1)     | Eliminaciones, cancelaciones, errores                   | `--destructive`      |
| Rojo Oscuro        | #8B0000 | rgba(139, 0, 0, 1)     | Estados críticos                                        | `--destructive-dark` |

#### **Colores Terciarios**

Únicamente para notificaciones y estados.

| Nombre        | Hex     | RGBA                   | Uso                              | Variable CSS      |
| ------------- | ------- | ---------------------- | -------------------------------- | ----------------- |
| Naranja Claro | #FFFCE0 | rgba(255, 252, 224, 1) | Backgrounds de alertas suaves    | `--warning-light` |
| Naranja       | #FAB400 | rgba(250, 180, 0, 1)   | Alertas, advertencias            | `--warning`       |
| Verde Claro   | #CEE6C6 | rgba(206, 230, 198, 1) | Backgrounds de éxito suaves      | `--success-light` |
| Verde         | #0B7329 | rgba(11, 115, 41, 1)   | Estados de éxito, confirmaciones | `--success`       |

### Variables CSS de Color

```css
/* Colores Primarios */
--primary: rgba(0, 96, 129, 1);           /* Azul Institucional #5ba3a5 */
--primary-dark: rgba(0, 79, 107, 1);      /* Azul Oscuro #004F6B */
--accent: rgba(212, 247, 255, 1);         /* Background Elevated #1a2332 */

/* Colores Secundarios */
--secondary: rgba(255, 255, 255, 1);      /* Blanco #FFFFFF */
--destructive: rgba(181, 0, 0, 1);        /* Rojo #B50000 */
--destructive-dark: rgba(139, 0, 0, 1);   /* Rojo Oscuro #8B0000 */
--destructive-light: rgba(252, 212, 212, 1); /* Accent Light #FCD4D4 */

/* Colores de Marca */
--brand-red: rgba(218, 41, 28, 1);        /* Accent Primary #5ba3a5 */

/* Colores de Estado */
--success: rgba(11, 115, 41, 1);          /* Verde #0B7329 */
--success-light: rgba(206, 230, 198, 1);  /* Verde Claro #CEE6C6 */
--warning: rgba(250, 180, 0, 1);          /* Naranja #FAB400 */
--warning-light: rgba(255, 252, 224, 1);  /* Naranja Claro #FFFCE0 */

/* Grises */
--background: rgba(235, 235, 235, 1);     /* Gris 4 #EBEBEB */
--foreground: rgba(34, 34, 34, 1);        /* Gris 1 #222222 */
--muted: rgba(208, 208, 208, 1);          /* Gris 3 #D0D0D0 */
--border: rgba(208, 208, 208, 1);         /* Gris 3 #D0D0D0 */

--color-white: rgba(255, 255, 255, 1);    /* #FFFFFF */
--color-black: rgba(0, 0, 0, 1);          /* #000000 */
--color-gray-5: rgba(245, 245, 245, 1);   /* #F5F5F5 */
--color-gray-2: rgba(106, 106, 106, 1);   /* #6A6A6A */
```

### Reglas de Uso de Colores

#### ⚠️ CRÍTICO: Accent Primary (#5ba3a5)

**USO EXCLUSIVO PARA:**
- Product Key (siglas de 3 letras)
- Logo SENTINEL en Sidebar
- Icono de Usuario en Sidebar
- Elementos que representan la marca SENTINEL

**NUNCA USAR PARA:**
- Botones de acción
- Estados de error
- Elementos interactivos generales

#### Azul Institucional (#5ba3a5)

**USO PRINCIPAL:**
- Botones primarios
- Links y elementos interactivos
- Estados activos en navegación
- Bordes de modales y elementos importantes

#### Colores de Estado

**Éxito (Verde #0B7329)**:
- Confirmaciones
- Notificaciones exitosas
- Estados completados

**Error (Rojo #B50000)**:
- Errores de validación
- Mensajes de error
- Acciones destructivas (eliminar)

**Advertencia (Naranja #FAB400)**:
- Alertas importantes
- Estados que requieren atención
- Información de precaución

---

## ✍️ Tipografía

### Fuente Principal

**Open Sans** - Diseñada específicamente para interfaces y alto nivel de accesibilidad.

**Google Fonts Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
```

### Variables CSS Tipográficas

```css
/* Tamaños de Fuente */
--text-siglas: 24px;        /* Siglas - Bold/700 - SOLO Product Key */
--text-titulo-1: 18px;      /* Título 1 - Semibold/600 - h1 */
--text-titulo-2: 16px;      /* Título 2 - Semibold/600 - h2, h3 */
--text-cuerpo-1: 14px;      /* Cuerpo 1 - Regular/400 o Semibold/600 - p, span, button, input */
--text-cuerpo-2: 12px;      /* Cuerpo 2 - Regular/400 o Semibold/600 - label */

/* Pesos de Fuente */
--font-weight-bold: 700;
--font-weight-semibold: 600;
--font-weight-normal: 400;

/* Line Height */
--line-height-default: 1.2;  /* 120% para TODOS los elementos */
```

### Jerarquía Tipográfica

#### **Headings**

| Elemento HTML | Nombre   | Weight       | Font-size | Line-height | Uso                                                 |
| ------------- | -------- | ------------ | --------- | ----------- | --------------------------------------------------- |
| `h1`          | Título 1 | Semibold/600 | 18px      | 120%        | Principal jerárquicamente, **una vez por pantalla** |
| `h2`, `h3`    | Título 2 | Semibold/600 | 16px      | 120%        | Demás encabezados                                   |
| `h4`          | Cuerpo 1 | Semibold/600 | 14px      | 120%        | Subtítulos menores                                  |

#### **Body Text**

| Elemento HTML           | Nombre            | Weight       | Font-size | Line-height | Uso                                         |
| ----------------------- | ----------------- | ------------ | --------- | ----------- | ------------------------------------------- |
| `p`, `span`             | Cuerpo 1 Regular  | Regular/400  | 14px      | 120%        | **VARIABLE POR DEFECTO** - Textos generales |
| Strong text             | Cuerpo 1 Semibold | Semibold/600 | 14px      | 120%        | Resaltar textos importantes                 |
| `label`                 | Cuerpo 2 Regular  | Regular/400  | 12px      | 120%        | Labels de formularios                       |
| Small text (tablas)     | Cuerpo 2 Regular  | Regular/400  | 12px      | 120%        | Mayor volumen de información                |

#### **Elementos de Formulario**

| Elemento               | Font-size | Weight      |
| ---------------------- | --------- | ----------- |
| `button`               | 14px      | Regular/400 |
| `input`, `textarea`    | 14px      | Regular/400 |
| `select`               | 14px      | Regular/400 |
| Placeholder            | 14px      | Regular/400 |

#### **Especial: Product Key**

| Elemento    | Nombre | Weight   | Font-size | Color           | Uso                                 |
| ----------- | ------ | -------- | --------- | --------------- | ----------------------------------- |
| Product Key | Siglas | Bold/700 | 24px      | #5ba3a5 (Rojo)  | **SOLO** para la Key del producto   |
| Version     | Label  | Regular  | 12px      | #6A6A6A (Gris 2)| Versión debajo de la Key            |

### Estilos Globales (globals.css)

```css
/* Estilos base para elementos HTML */
h1 {
  font-family: 'Open Sans', sans-serif;
  font-size: var(--text-titulo-1);  /* 18px */
  font-weight: var(--font-weight-semibold);  /* 600 */
  line-height: var(--line-height-default);  /* 1.2 */
  color: var(--foreground);  /* #222222 */
}

h2, h3 {
  font-family: 'Open Sans', sans-serif;
  font-size: var(--text-titulo-2);  /* 16px */
  font-weight: var(--font-weight-semibold);  /* 600 */
  line-height: var(--line-height-default);  /* 1.2 */
  color: var(--foreground);  /* #222222 */
}

h4 {
  font-family: 'Open Sans', sans-serif;
  font-size: var(--text-cuerpo-1);  /* 14px */
  font-weight: var(--font-weight-semibold);  /* 600 */
  line-height: var(--line-height-default);  /* 1.2 */
  color: var(--foreground);  /* #222222 */
}

p, span {
  font-family: 'Open Sans', sans-serif;
  font-size: var(--text-cuerpo-1);  /* 14px */
  font-weight: var(--font-weight-normal);  /* 400 */
  line-height: var(--line-height-default);  /* 1.2 */
  color: var(--foreground);  /* #222222 */
}

label {
  font-family: 'Open Sans', sans-serif;
  font-size: var(--text-cuerpo-2);  /* 12px */
  font-weight: var(--font-weight-normal);  /* 400 */
  line-height: var(--line-height-default);  /* 1.2 */
  color: var(--foreground);  /* #222222 */
}

button, input, textarea, select {
  font-family: 'Open Sans', sans-serif;
  font-size: var(--text-cuerpo-1);  /* 14px */
  font-weight: var(--font-weight-normal);  /* 400 */
  line-height: var(--line-height-default);  /* 1.2 */
}
```

### ⚠️ IMPORTANTE: NO usar Tailwind CSS

**NUNCA usar clases de Tailwind** como `text-lg`, `font-bold`, `text-sm`, etc.

**✅ Correcto:**
```tsx
<h1>Título principal</h1>  {/* Automáticamente 18px Semibold */}
<p>Texto normal</p>        {/* Automáticamente 14px Regular */}
```

**❌ Incorrecto:**
```tsx
<h1 className="text-lg font-semibold">Título</h1>  {/* NO USAR */}
```

---

## 🎭 Iconografía

### Librería de Iconos

**Lucide React** - Material Design Icons

```bash
npm install lucide-react
```

```tsx
import { Search, User, LogOut } from 'lucide-react';
```

### Tamaños Estándar

| Tamaño | Pixels | Variable CSS      | Uso                                  |
| ------ | ------ | ----------------- | ------------------------------------ |
| Grande | 32px   | `--icon-size-lg`  | Iconos destacados, ilustraciones     |
| Medio  | 24px   | `--icon-size-md`  | **Tamaño por defecto**, navegación   |
| Pequeño| 20px   | `--icon-size-sm`  | Iconos de estado, tablas             |
| Mini   | 16px   | `--icon-size-xs`  | Iconos de acciones menores           |

### Variables CSS de Iconos

```css
--icon-size-lg: 32px;
--icon-size-md: 24px;
--icon-size-sm: 20px;
--icon-size-xs: 16px;
```

### Colores de Iconos

| Contexto              | Color       | Hex       | Variable CSS     |
| --------------------- | ----------- | --------- | ---------------- |
| Por defecto           | Gris 1      | #222222   | `--foreground`   |
| Secundario            | Gris 2      | #6A6A6A   | `--color-gray-2` |
| Primario/Activo       | Azul        | #5ba3a5   | `--primary`      |
| Marca SENTINEL           | Rojo        | #5ba3a5   | `--brand-red`    |
| Error                 | Rojo        | #B50000   | `--destructive`  |
| Éxito                 | Verde       | #0B7329   | `--success`      |
| Advertencia           | Naranja     | #FAB400   | `--warning`      |
| Disabled              | Gris 3      | #D0D0D0   | `--muted`        |

### Pautas de Uso

1. **Consistencia funcional**: Un mismo icono no debe tener más de una funcionalidad
2. **Categorización**: Los iconos están organizados por categorías según su finalidad
3. **Accesibilidad**: Siempre incluir `aria-label` cuando el icono es interactivo
4. **Texto acompañante**: Iconos de estado SIEMPRE van acompañados de texto

---

## 📏 Sistema de Espaciado

### Valores de Espaciado

```css
--spacing-xs: 5px;
--spacing-sm: 10px;
--spacing-md: 15px;
--spacing-lg: 20px;
--spacing-xl: 30px;
--spacing-2xl: 40px;
```

### Padding del Content

```css
--content-padding: 30px;  /* Padding hacia cada lado del Content area */
```

**Uso**: Separar el contenido de la Sidebar y de los bordes de la ventana.

### Gap entre Elementos

```css
--gap-elements: 20px;  /* Gap estándar entre elementos */
```

**Uso**: Espacio horizontal y vertical entre elementos en contenedores y layouts.

### Padding de Contenedores

```css
--container-padding: 20px;  /* Padding interno de contenedores (cards, modales) */
```

**Excepción**: El lado superior NO lleva padding si hay un título.

### Aplicación Práctica

| Contexto                          | Spacing    | Valor | Variable CSS          |
| --------------------------------- | ---------- | ----- | --------------------- |
| Content area (todos los lados)    | Padding    | 30px  | `--content-padding`   |
| Gap entre elementos               | Gap        | 20px  | `--gap-elements`      |
| Padding de cards/modales          | Padding    | 20px  | `--container-padding` |
| Gap entre botones                 | Gap        | 20px  | `--gap-elements`      |
| Padding de notificaciones (toast) | Padding    | 20px  | `--container-padding` |
| Padding de tablas (celdas)        | Padding    | 12px  | `--spacing-sm`        |

---

## 📊 Grid System

### Grilla General del Content

```css
--grid-columns: 24;
--grid-gap: 20px;
```

- **Columnas**: 24 columnas
- **Gap**: 20px
- **Ubicación**: Entre los márgenes del Content area
- **Aplica a**: Todas las resoluciones desktop

### Main Content

```css
--main-content-columns-m: 12;   /* 1366×768px */
--main-content-columns-l: 16;   /* 1600×900px */
--main-content-columns-xl: 20;  /* 1920×1080px */
```

- **Función**: Contenido principal de la pantalla (mayor proporción)
- **Incremento**: +4 columnas por cada breakpoint

### Side Content

```css
--side-content-columns-m: 6;    /* 1366×768px */
--side-content-columns-l: 8;    /* 1600×900px */
--side-content-columns-xl: 10;  /* 1920×1080px */
```

- **Función**: Información complementaria o funciones específicas
- **Incremento**: +2 columnas por cada breakpoint

---

## 🌈 Elevación y Sombras

### Variables CSS de Sombras

```css
/* Sombras según elevación */
--elevation-sm: 0px 2px 8px 0px rgba(0, 0, 0, 0.10);  /* 10% opacidad - Flotantes */
--elevation-md: 0px 4px 12px 0px rgba(0, 0, 0, 0.15); /* 15% opacidad - Media */
--elevation-lg: 0px 2px 8px 0px rgba(0, 0, 0, 0.20);  /* 20% opacidad - Contenedores */

/* Alias para claridad */
--shadow-sm: var(--elevation-sm);
--shadow-md: var(--elevation-md);
--shadow-lg: var(--elevation-lg);
```

### Niveles de Elevación

#### **Elementos Flotantes** (10% opacidad)

```css
box-shadow: var(--shadow-sm);  /* 0px 2px 8px 0px rgba(0, 0, 0, 0.10) */
```

**Uso:**
- Dropdowns
- Tooltips
- Popovers
- Elementos que flotan sobre el contenido

**Propósito**: Indicar elevación sin competir visualmente con contenedores principales.

#### **Elementos Contenedores** (20% opacidad)

```css
box-shadow: var(--shadow-lg);  /* 0px 2px 8px 0px rgba(0, 0, 0, 0.20) */
```

**Uso:**
- Cards principales
- Contenedores de gran tamaño
- Modales
- Panels

**Propósito**: Crear jerarquía y separación visual del fondo.

---

## 🔲 Border Radius

### Variables CSS de Border Radius

```css
--radius: 5px;         /* Elementos contenidos (botones, inputs) */
--radius-card: 10px;   /* Elementos contenedores o flotantes (cards, modales) */
```

### Aplicación por Tipo de Elemento

#### **Elementos Contenidos** → 5px

**Uso:**
- Botones (primarios, secundarios, destructivos)
- Inputs (text, dropdown, textarea)
- Selects
- Badges
- Elementos dentro de contenedores

```css
border-radius: var(--radius);  /* 5px */
```

#### **Elementos Contenedores o Flotantes** → 10px

**Uso:**
- Cards
- Modales
- Panels
- Drawers
- Tooltips
- Dropdowns (el contenedor del dropdown)
- Notificaciones (toast)
- Searchbar inputs (aunque están dentro, son elementos flotantes)

```css
border-radius: var(--radius-card);  /* 10px */
```

### Excepciones

**Tablas Border 0% (sin bordes)**:
- Cada fila individual: `border-radius: 5px`

---

## 📱 Resoluciones y Responsive

### Resoluciones Base Desktop

El sistema está diseñado para **3 resoluciones desktop**:

| Breakpoint | Resolución  | Main Content | Side Content | Variable CSS Prefix |
| ---------- | ----------- | ------------ | ------------ | ------------------- |
| **M**      | 1366×768px  | 12 columnas  | 6 columnas   | `-m`                |
| **L**      | 1600×900px  | 16 columnas  | 8 columnas   | `-l`                |
| **XL**     | 1920×1080px | 20 columnas  | 10 columnas  | `-xl`               |

### Media Queries

```css
/* Medium - 1366×768px (base) */
@media (min-width: 1366px) {
  /* Estilos por defecto */
}

/* Large - 1600×900px */
@media (min-width: 1600px) {
  /* Ajustes para pantallas más grandes */
}

/* Extra Large - 1920×1080px */
@media (min-width: 1920px) {
  /* Ajustes para pantallas extra grandes */
}
```

### Elementos con Dimensiones Fijas

**NO cambian con el responsive:**

- **Sidebar**: `56px` (fijo en todas las resoluciones)
- **Searchbar altura**: `40px` (fijo en todas las resoluciones)
- **Botones altura**: `40px` (fijo)
- **Inputs altura**: `40px` (fijo)

---

## ♿ Accesibilidad

### Estándar de Accesibilidad

- **Objetivo**: WCAG 2.1 AA (buscando AAA en contraste de colores)
- **Herramienta de validación**: [Adobe Color](https://color.adobe.com/es/create/color-contrast-analyzer)
- **Pruebas**: Validadas para diferentes tipos de daltonismo

### Contraste de Colores

**Ratios mínimos WCAG 2.1 AA:**

- **Texto normal** (< 18px): 4.5:1
- **Texto grande** (≥ 18px o ≥ 14px bold): 3:1
- **Elementos gráficos e interactivos**: 3:1

**Objetivo AAA:**

- **Texto normal**: 7:1
- **Texto grande**: 4.5:1

### Navegación con Teclado

| Tecla          | Acción                              |
| -------------- | ----------------------------------- |
| `Tab`          | Navegar entre elementos focusables  |
| `Shift + Tab`  | Navegar hacia atrás                 |
| `Enter/Space`  | Activar botón o acción              |
| `Esc`          | Cerrar modal, tooltip, dropdown     |
| `Arrow keys`   | Navegar en dropdowns y menús        |

### ARIA Attributes (Obligatorios)

Todos los componentes interactivos deben incluir:

```tsx
// Botones con solo icono
<button aria-label="Cerrar modal">
  <X size={16} />
</button>

// Inputs
<input
  aria-label="Buscar por código"
  aria-describedby="search-helper-text"
  aria-invalid={hasError}
/>

// Roles
<nav role="navigation" aria-label="Navegación principal">
  {/* Sidebar */}
</nav>

<main role="main">
  {/* Content */}
</main>
```

### Focus States

**Todos los elementos interactivos deben tener estados de focus visibles:**

```css
/* Focus ring estándar */
&:focus-visible {
  outline: 2px solid var(--primary);  /* #5ba3a5 */
  outline-offset: 2px;
}
```

### Tamaño Mínimo de Elementos Interactivos

**WCAG 2.1 AA requiere mínimo 44×44px de área clicable.**

El design system usa `40px` de altura para inputs y botones, que es aceptable si:
- El ancho compensa (botones con padding `7.5px 20px`)
- No hay elementos adyacentes muy cerca (gap de `20px`)

---

**Versión**: SENTINEL v2.0.0
**Última actualización**: 29 de octubre, 2025
