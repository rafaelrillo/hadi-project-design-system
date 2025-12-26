# Design System SENTINEL v2.0.0 - Especificaciones de Diseño

## 📋 Tabla de Contenidos

1. [Información General](#información-general)
2. [Principios UX](#principios-ux)
3. [Paleta de Colores](#paleta-de-colores)
4. [Tipografía](#tipografía)
5. [Iconografía](#iconografía)
6. [Layout y Estructura Desktop](#layout-y-estructurAa-desktop)
7. [Sistema de Grillas](#sistema-de-grillas)
8. [Espaciado y Márgenes](#espaciado-y-márgenes)
9. [Estilos Visuales](#estilos-visuales)
10. [Key de Producto](#key-de-producto)
11. [Searchbar](#searchbar)
12. [Sidebar](#sidebar)
13. [Tooltips](#tooltips)
14. [Botones](#botones)
15. [Modales](#modales)
16. [Notificaciones](#notificaciones)
17. [Inputs de Formulario](#inputs-de-formulario)
18. [Tablas](#tablas)
19. [Tarjetas (Cards)](#tarjetas-cards)
20. [Iconos de Estados](#iconos-de-estados)
21. [Accesibilidad](#accesibilidad)

---

## 📌 Información General

### Contexto

- **Design System**: SENTINEL v2.0.0
- **Ecosistema**: Investment Analysis Platform
- **Tipo de Aplicaciones**: SPA (Single Page Application)
- **Enfoque**: System-First, priorizando reutilización de componentes
- **Estándar de Accesibilidad**: WCAG 2.1 AA (se busca AAA en contraste de colores)

### Fundamentos Base

- **Accesibilidad**: AAA en contraste de colores
- **Visual distinta**: Diferenciación del standard design systems
- **Consistencia**: Uso coherente de tokens y componentes
- **Escalabilidad**: Sistema preparado para crecer

### Resolución y Responsive

- **Resolución base**: 1366×768 (pantalla principal de referencia)
- **Responsive**: La aplicación debe adaptarse a las 3 resoluciones desktop:
  - 1366×768px (M)
  - 1600×900px (L)
  - 1920×1080px (XL)

---

## 🎯 Principios UX

### Principios Clave

1. **Claridad**: Interfaces claras y fáciles de entender
2. **Consistencia**: Uso coherente de patrones y componentes
3. **Jerarquía Visual**: Organización clara de la información
4. **Feedback Visible**: Retroalimentación inmediata en interacciones
5. **Accesibilidad**: Diseño inclusivo para todos los usuarios
6. **Escalabilidad**: Preparado para crecer y adaptarse

### Herramientas de Accesibilidad

- **Contraste**: Adobe Color (https://color.adobe.com/es/create/color-contrast-analyzer)
- **Pruebas de Daltonismo**: Validadas para diferentes tipos

---

## 🎨 Paleta de Colores

### Jerarquía de Colores

El sistema emplea 4 niveles jerárquicos establecidos por porcentaje de uso:

#### **Escala de Grises**

Predominante en todos los productos. El blanco es el color principal para contenedores y fondos.

| Nombre | Hex     | RGBA                   | Uso                                        |
| ------ | ------- | ---------------------- | ------------------------------------------ |
| Blanco | #FFFFFF | rgba(255, 255, 255, 1) | Contenedores, fondos principales           |
| Gris 5 | #F5F5F5 | rgba(245, 245, 245, 1) | Fondos secundarios                         |
| Gris 4 | #EBEBEB | rgba(235, 235, 235, 1) | Background general de la aplicación        |
| Gris 3 | #D0D0D0 | rgba(208, 208, 208, 1) | Bordes, divisores                          |
| Gris 2 | #6A6A6A | rgba(106, 106, 106, 1) | Textos secundarios, iconos                 |
| Gris 1 | #222222 | rgba(34, 34, 34, 1)    | Textos principales, alto contraste         |
| Negro  | #000000 | rgba(0, 0, 0, 1)       | Componentes que necesitan máximo contraste |

#### **Colores Primarios**

Principales elementos interactivos y notificaciones informativas.

| Nombre             | Hex     | RGBA                   | Uso                                                 |
| ------------------ | ------- | ---------------------- | --------------------------------------------------- |
| Background Elevated         | #1a2332 | rgba(212, 247, 255, 1) | Estados hover, backgrounds suaves                   |
| Azul Institucional | #5ba3a5 | rgba(0, 96, 129, 1)    | Botones, links, elementos activos (COLOR PRINCIPAL) |
| Azul Oscuro        | #004F6B | rgba(0, 79, 107, 1)    | Estados pressed, énfasis adicional                  |

#### **Colores Secundarios**

Uso limitado para acciones irreversibles y elementos de marca.

| Nombre             | Hex     | RGBA                   | Uso                                                     |
| ------------------ | ------- | ---------------------- | ------------------------------------------------------- |
| Accent Light         | #FFD4D4 | rgba(252, 212, 212, 1) | Backgrounds de error suaves                             |
| Accent Primary | #5ba3a5 | rgba(218, 41, 28, 1)   | **SOLO** para elementos que elementos de branding SENTINEL |
| Rojo               | #B50000 | rgba(181, 0, 0, 1)     | Eliminaciones, cancelaciones, errores                   |
| Rojo Oscuro        | #8B0000 | rgba(139, 0, 0, 1)     | Estados críticos                                        |

#### **Colores Terciarios**

Únicamente para notificaciones y estados.

| Nombre        | Hex     | RGBA                   | Uso                              |
| ------------- | ------- | ---------------------- | -------------------------------- |
| Naranja Claro | #FFFCE0 | rgba(255, 252, 224, 1) | Backgrounds de alertas suaves    |
| Naranja       | #FAB400 | rgba(250, 180, 0, 1)   | Alertas, advertencias            |
| Verde Claro   | #CEE6C6 | rgba(206, 230, 198, 1) | Backgrounds de éxito suaves      |
| Verde         | #0B7329 | rgba(11, 115, 41, 1)   | Estados de éxito, confirmaciones |

### Variables CSS de Color (configuradas en globals.css)

```css
--primary: rgba(0, 96, 129, 1); /* Azul principal */
--secondary: rgba(255, 255, 255, 1); /* Blanco */
--accent: rgba(212, 247, 255, 1); /* Azul claro */
--destructive: rgba(181, 0, 0, 1); /* Rojo */
--muted: rgba(208, 208, 208, 1); /* Gris 3 */
--background: rgba(235, 235, 235, 1); /* Gris 4 */
--foreground: rgba(34, 34, 34, 1); /* Gris 1 */
--border: rgba(208, 208, 208, 1); /* Gris 3 */
```

---

## ✍️ Tipografía

### Fuente Principal

**Open Sans** - Diseñada específicamente para interfaces y alto nivel de accesibilidad.

### Variables CSS Tipográficas (configuradas en globals.css)

```css
--text-siglas: 24px; /* Siglas - Bold/700 */
--text-titulo-1: 18px; /* Título 1 - Semibold/600 */
--text-titulo-2: 16px; /* Título 2 - Semibold/600 */
--text-cuerpo-1: 14px; /* Cuerpo 1 - Regular/400 o Semibold/600 */
--text-cuerpo-2: 12px; /* Cuerpo 2 - Regular/400 o Semibold/600 */

--font-weight-bold: 700;
--font-weight-semibold: 600;
--font-weight-normal: 400;

--line-height-default: 1.2; /* 120% para todos */
```

### Jerarquía Tipográfica

#### **Headings**

| Nombre   | Weight       | Font-size       | Line-height | Letter Spacing | Uso                                                 |
| -------- | ------------ | --------------- | ----------- | -------------- | --------------------------------------------------- |
| Título 1 | Semibold/600 | 18px (1.125rem) | 120%        | 0%             | Principal jerárquicamente, **una vez por pantalla** |
| Título 2 | Semibold/600 | 16px (1rem)     | 120%        | 0%             | Demás encabezados                                   |

#### **Body**

| Nombre            | Weight       | Font-size       | Line-height | Letter Spacing | Uso                                         |
| ----------------- | ------------ | --------------- | ----------- | -------------- | ------------------------------------------- |
| Cuerpo 1 Semibold | Semibold/600 | 14px (0.875rem) | 120%        | 0%             | Resaltar textos importantes, labels         |
| Cuerpo 1 Regular  | Regular/400  | 14px (0.875rem) | 120%        | 0%             | **VARIABLE POR DEFECTO** - Textos generales |
| Cuerpo 2 Semibold | Semibold/600 | 12px (0.75rem)  | 120%        | 0%             | Optimizar espacios en tablas                |
| Cuerpo 2 Regular  | Regular/400  | 12px (0.75rem)  | 120%        | 0%             | Mayor volumen de información (ej: tablas)   |

#### **Otros**

| Nombre | Weight   | Font-size     | Line-height | Letter Spacing | Uso                                                |
| ------ | -------- | ------------- | ----------- | -------------- | -------------------------------------------------- |
| Siglas | Bold/700 | 24px (1.5rem) | 120%        | 0%             | **SOLO** para la Key del producto, siempre visible |

### Aplicación en Elementos HTML

- **h1**: Título 1 (18px, Semibold/600)
- **h2, h3**: Título 2 (16px, Semibold/600)
- **h4**: Cuerpo 1 Semibold (14px, Semibold/600)
- **p, span**: Cuerpo 1 Regular (14px, Regular/400)
- **label**: Cuerpo 2 Regular (12px, Regular/400)
- **button**: Cuerpo 1 Regular (14px, Regular/400)
- **input, textarea, select**: Cuerpo 1 Regular (14px, Regular/400)

### Implementación de Estilos

**⚠️ IMPORTANTE: NO se usa Tailwind CSS**

Los estilos se manejan exclusivamente con:
- **CSS Puro** con variables CSS (CSS Custom Properties)
- **Estilos inline** cuando sea necesario
- **CSS Modules** para componentes específicos

**NUNCA usar clases de Tailwind** como `text-lg`, `font-bold`, `p-4`, `bg-primary`, etc.

**Ejemplo correcto:**

```tsx
// ✅ Usar etiquetas HTML que heredan estilos de globals.css
<h1>Título principal</h1>  {/* Automáticamente 18px Semibold */}
<p>Texto normal</p>        {/* Automáticamente 14px Regular */}

// ✅ Usar estilos inline cuando sea necesario
<p style={{
  fontFamily: "'Open Sans', sans-serif",
  fontSize: "16px",
  fontWeight: 600,
  lineHeight: 1.2,
  color: "#222222"
}}>
  Texto con estilo específico
</p>
```

---

## 🎭 Iconografía

### Tamaños Estándar

- **32px**: Iconos grandes
- **24px**: Iconos medianos
- **16px**: Iconos pequeños

### Pautas de Uso

1. **Consistencia funcional**: Un mismo icono no debe tener más de una funcionalidad
2. **Categorización**: Los iconos están organizados por categorías según su finalidad
3. **Color por defecto**: Gris 1 (#222222), salvo estados específicos de componentes
4. **Librería**: Material Design Icons (lucide-react)

---

## 📐 Layout y Estructura Desktop

### Resoluciones Base

Aplicamos 3 resoluciones para desktop:

- **1366x768px** (base principal)
- **1600x900px**
- **1920x1080px**

### Estructura General

```
┌────────────────────────────────────────────────────────────┐
│  ┌───────┐  ┌───────────────────────────────────────────┐  │
│  │       │  │                                           │  │
│  │       │  │              CONTENT                      │  │
│  │  S    │  │                                           │  │
│  │  I    │  │  ┌────────────────────────────────────┐   │  │
│  │  D    │  │  │                                    │   │  │
│  │  E    │  │  │         MAIN CONTENT               │   │  │
│  │  B    │  │  │                                    │   │  │
│  │  A    │  │  └────────────────────────────────────┘   │  │
│  │  R    │  │                                           │  │
│  │       │  │  ┌─────────────┐                          │  │
│  │       │  │  │ SIDE        │                          │  │
│  │       │  │  │ CONTENT     │                          │  │
│  │       │  │  └─────────────┘                          │  │
│  └───────┘  └───────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

#### **Sidebar**

- **Ancho**: 56px (fijo)
- **Posición**: Izquierda
- **Función**: Fuente principal de navegación del sistema
- **Background**: Blanco (#FFFFFF)
- **Shadow**: 0px 2px 8px 0px rgba(0,0,0,0.1)

#### **Content**

- **Posición**: 30px a la derecha de la Sidebar
- **Función**: Área principal donde se ubica todo el contenido
- **Background**: Gris 4 (#EBEBEB)

---

## 📊 Sistema de Grillas

### Grilla General del Content

- **Columnas**: 24 columnas
- **Gap**: 20px
- **Ubicación**: Entre los márgenes del Content
- **Aplica a**: Todas las resoluciones desktop

### Main Content

- **Columnas**: 12 columnas
- **Gap**: 20px
- **Incremento**: +4 columnas por cada breakpoint
- **Función**: Contenido principal de la pantalla (mayor proporción)

### Side Content

- **Columnas**: 6 columnas
- **Gap**: 20px
- **Incremento**: +2 columnas por cada breakpoint
- **Función**: Información complementaria o funciones específicas

---

## 📏 Espaciado y Márgenes

### Padding del Content

```css
padding: 30px; /* Hacia cada lado, incluyendo separación de Sidebar */
```

**Propósito**: Dar espacio al contenido y separarlo de la navegación.

### Espaciado entre Elementos

#### Elementos Contenedores y Flotantes

```css
gap: 20px; /* Horizontal y vertical */
```

**Propósito**: Al ser menor que los márgenes, genera unidad del contenido.

#### Elementos Contenidos

```css
gap: 20px; /* Horizontal y vertical */
```

### Padding de Contenedores

```css
padding: 20px; /* Todos los lados */
```

**Excepción**: El lado superior NO lleva padding si hay un título.

---

## 🎨 Estilos Visuales

### Border Radius

Para lograr un estilo más moderno, se utilizan **2 niveles** de border radius según la ubicación del elemento:

#### **Elementos Contenedores o Flotantes**

- **Border Radius**: `10px` (var(--radius-card))
- **Uso**: Cards, modals, paneles principales, elementos flotantes

#### **Elementos Contenidos**

- **Border Radius**: `5px` (var(--radius))
- **Uso**: Botones, inputs, selects, elementos dentro de contenedores

### Sombras (Elevation)

Se emplean **2 niveles** de sombreado para diferenciar elementos, estructuras y secciones dentro de la pantalla:

#### **Elementos Contenedores**

- **Sombra**: `0px 2px 8px 0px rgba(0, 0, 0, 0.20)` (20% de opacidad)
- **Uso**: Cards principales, contenedores de gran tamaño
- **Propósito**: Crear jerarquía y separación visual del fondo

#### **Elementos Flotantes**

- **Sombra**: `0px 2px 8px 0px rgba(0, 0, 0, 0.10)` (10% de opacidad)
- **Uso**: Dropdowns, tooltips, popovers, elementos que flotan sobre el contenido
- **Propósito**: Indicar elevación sin competir visualmente con contenedores principales

```css
/* Variables CSS configuradas */
--elevation-sm: 0px 2px 8px 0px rgba(0, 0, 0, 0.1); /* Flotantes - 10% */
--shadow-sm: var(--elevation-sm);
--shadow-md: 0px 4px 12px 0px rgba(0, 0, 0, 0.15);
--shadow-lg: 0px 8px 16px 0px rgba(0, 0, 0, 0.2); /* Contenedores - 20% */
```

---

## 🔑 Key de Producto

### Descripción

Todo producto que aplique este design system posee una **Key de Producto**: una sigla de **3 letras única** que lo identifica.

### Características Obligatorias

1. **Siempre Visible**: Debe estar presente en todas las pantallas de la aplicación
2. **Fácilmente Reconocible**: Posición destacada y color distintivo
3. **Variante Tipográfica Única**: Usa exclusivamente la variante "Siglas"

### Especificaciones Técnicas

```css
/* Tipografía */
font-size: 24px;
font-weight: 700; /* Bold */
line-height: 120%;
letter-spacing: 0%;

/* Color - OBLIGATORIO */
color: #5ba3a5; /* Accent Primary */
```

### Versionado

Con el constante desarrollo es de vital importancia **mostrar la versión actual del producto** para evitar confusiones durante desarrollo y testing.

#### **Ubicación del Versionado**

- **Posición**: Justo debajo de la Key de producto
- **Formato**: `v.X.X.X` (ej: v.1.2.3)
- **Tipografía**: Cuerpo 2 Regular (12px, Regular/400)
- **Color**: Gris 2 (#6A6A6A)

### Ejemplo de Implementación

```tsx
<div style={{ 
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center', 
  textAlign: 'center' 
}}>
  {/* Key de Producto */}
  <span style={{
    fontFamily: "'Open Sans', sans-serif",
    fontSize: "24px",
    fontWeight: 700,
    color: "#5ba3a5",
    lineHeight: 1.2
  }}>
    SENTINEL Analytics
  </span>

  {/* Versionado (opcional pero recomendado) */}
  <span style={{
    fontFamily: "'Open Sans', sans-serif",
    fontSize: "12px",
    fontWeight: 400,
    color: "#6A6A6A",
    lineHeight: 1.2
  }}>
    v.1.0.0
  </span>
</div>
```

### Ubicación Recomendada

- **Primera opción**: Superior izquierda del área de contenido, cerca de la Sidebar
- **Segunda opción**: Dentro de la Sidebar en la parte superior
- **Debe ser visible**: Sin necesidad de hacer scroll

---

## 🔍 Searchbar

### Descripción

La **Searchbar** es una **barra de búsqueda formada por múltiples componentes más pequeños** que sirven para **disparar los diversos flujos de las aplicaciones**. Por esta razón, **siempre está presente en pantalla**.

### Características Principales

- ✅ **Siempre visible**: Permanece en todas las pantallas de la aplicación
- ✅ **Componentes modulares**: Formada por componentes independientes que se pueden editar u ocultar
- ✅ **Adaptativa**: Se adapta a 3 resoluciones desktop base
- ✅ **Key obligatoria**: La Key del producto siempre debe estar presente
- ✅ **Altura fija de 40px**: TODOS los inputs y botones SIEMPRE deben tener exactamente 40px de altura

### ⚠️ REGLA CRÍTICA: ALTURA DE 40px - NUNCA MODIFICAR

**ADVERTENCIA IMPORTANTE**: La altura de **40px es OBLIGATORIA y FIJA** para todos los componentes del Searchbar.

Esta altura **NUNCA debe cambiar** bajo ninguna circunstancia:

```css
/* ✅ CORRECTO - Altura fija de 40px */
height: 40px;

/* ❌ INCORRECTO - NUNCA usar estas variantes */
height: auto;      /* Altura automática */
min-height: 40px;  /* Puede crecer */
height: 50px;      /* Altura incorrecta */
```

**Elementos que DEBEN tener 40px:**
- ✅ Input Text → `height: 40px`
- ✅ Input Dropdown → `height: 40px`
- ✅ Input Flag → `height: 40px`
- ✅ Botón Buscar → `height: 40px`
- ✅ Contenedor de la Searchbar → `height: 40px`

**Razones por las que NUNCA cambiar:**
1. **Coherencia visual**: Todos los elementos deben estar alineados horizontalmente
2. **Especificación del DS**: Es un requisito fundamental del Design System
3. **Accesibilidad**: Garantiza áreas de clic adecuadas (WCAG 2.1 AA)
4. **Uniformidad del sistema**: Mantiene consistencia en toda la aplicación

### Filosofía de Uso

La Searchbar es el componente principal para:

- **Disparar flujos de búsqueda**: Permite iniciar búsquedas y consultas
- **Filtrar información**: Contiene campos de filtrado según las necesidades del proyecto
- **Identificar el producto**: Muestra la Key del producto en todo momento
- **Adaptar funcionalidades**: Los campos se pueden editar u ocultar según el proyecto

**IMPORTANTE**: Existen casos donde no es necesario ningún tipo de búsquedas, por lo que **se ocultará todo menos la Key del producto**.

### Estructura de la Searchbar

```
┌────────────────────────────────────────────────────────────────┐
│  SENTINEL Analytics     [Estado  ▼]  [AR ▼]  [Buscar por ▼]  [Número...]     │
│  v.1.0.0                                            🔍 Buscar   │
└────────────────────────────────────────────────────────────────┘
```

### Anatomía del Searchbar - Medidas Exactas

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  Key                                                                │
│  ↓                                                                  │
│  SENTINEL Analytics      ← 40px →  ← 40px →  ← 40px →  ← 40px →    ← 40px →      │
│  v2.0.0   [Input▼]  [Input▼]  [Input▼]  [Input ]    [🔍 Botón]    │
│           └──────┘  └──────┘  └──────┘  └──────┘    └─────────┘    │
│           ↑ 40px    ↑ 40px    ↑ 40px    ↑ 40px      ↑ 40px        │
│           FIJA      FIJA      FIJA      FIJA        FIJA          │
│                                                                     │
│           ←─ 20px ─→          Gap entre elementos                  │
└─────────────────────────────────────────────────────────────────────┘
       ↑
   Contenedor: height: 40px
```

**Medidas obligatorias:**
- **Altura de TODOS los inputs**: `40px` (NUNCA cambiar)
- **Altura del botón**: `40px` (NUNCA cambiar)
- **Altura del contenedor**: `40px` (NUNCA cambiar)
- **Gap horizontal**: `20px` entre todos los elementos
- **Border radius inputs**: `10px` (contenedor/flotante)
- **Border radius botón**: `10px` (contenedor/flotante)

### Especificaciones Técnicas

#### **Contenedor de la Searchbar**

```css
/* Layout */
display: flex;
gap: 20px;
align-items: center;
justify-content: space-between;
width: 100%;
height: 40px; /* ALTURA FIJA */

/* NO tiene background ni bordes */
background: transparent;
```

#### **Alineación - IMPORTANTE**

- **Key del Producto**: SIEMPRE a la izquierda
- **Inputs y Botón**: Agrupados a la derecha
- **Horizontal**: Usar `justify-content: space-between`
- **Vertical**: `align-items: center`

**Estructura correcta:**
```
[Key]                    [Input] [Input] [Input] [Botón]
↑                                                        ↑
Izquierda                                         Derecha
```

### Componentes de la Searchbar

#### **1. Key del Producto (Obligatorio)**

El único componente que **SIEMPRE debe estar presente**.

```tsx
<div style={{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center'
}}>
  <p style={{
    fontFamily: "'Open Sans', sans-serif",
    fontSize: "24px",
    fontWeight: 700,
    color: "#5ba3a5",
    lineHeight: 1.2
  }}>
    SENTINEL Analytics
  </p>
  <p style={{
    fontFamily: "'Open Sans', sans-serif",
    fontSize: "12px",
    fontWeight: 400,
    color: "#6A6A6A",
    lineHeight: 1.2
  }}>
    v.1.0.0
  </p>
</div>
```

#### **2. Input Dropdown (Opcional)**

Campos de selección para filtros generales.

```tsx
<div style={{
  height: '40px',
  width: '192px',
  boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.1)'
}}>
  <div style={{
    backgroundColor: 'white',
    borderRadius: '10px',
    width: '100%',
    height: '100%',
    position: 'relative'
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '8px 12px',
      gap: '10px'
    }}>
      <select style={{
        flex: 1,
        fontSize: '14px',
        color: '#222222',
        backgroundColor: 'transparent',
        outline: 'none',
        border: 'none'
      }}>
        <option>Todos los estados</option>
        <option>Pendiente</option>
        <option>Aprobada</option>
      </select>
      {/* Icono expandir 24px */}
    </div>
    <div style={{
      position: 'absolute',
      border: '1px solid #D0D0D0',
      inset: 0,
      borderRadius: '10px',
      pointerEvents: 'none'
    }} />
  </div>
</div>
```

**Especificaciones del Dropdown:**

- **Altura**: `40px` (**FIJA** - nunca cambiar)
- **Ancho**: Variable según contenido (ej: `138px`, `192px`)
- **Background**: `#FFFFFF`
- **Border**: `1px solid #D0D0D0`
- **Border Radius**: `10px`
- **Shadow**: `0px 2px 8px 0px rgba(0,0,0,0.1)`
- **Padding**: `8px 12px`
- **Gap**: `10px` entre texto e icono
- **Texto**: `14px Regular #222222`
- **Icono expandir**: `24px` negro (#222222)

#### **3. Input Text (Campo de Texto)**

Campo de entrada de texto libre.

```tsx
<div style={{
  height: '40px',
  width: '297px',
  boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.1)'
}}>
  <div style={{
    backgroundColor: 'white',
    borderRadius: '10px',
    width: '100%',
    height: '100%',
    position: 'relative'
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '8px 12px'
    }}>
      <input
        placeholder="Número"
        style={{
          flex: 1,
          fontSize: '14px',
          color: '#222222',
          backgroundColor: 'transparent',
          outline: 'none',
          border: 'none'
        }}
      />
    </div>
    <div style={{
      position: 'absolute',
      border: '1px solid #D0D0D0',
      inset: 0,
      borderRadius: '10px',
      pointerEvents: 'none'
    }} />
  </div>
</div>
```

**Especificaciones del Input Text:**

- **Altura**: `40px` (**FIJA** - nunca cambiar)
- **Ancho**: Variable (ej: `297px`)
- **Placeholder**: `14px Regular #D0D0D0`
- **Texto**: `14px Regular #222222`
- Sin icono (solo texto)

#### **4. Botón Buscar (Acción Principal)**

Botón que ejecuta la búsqueda.

```tsx
<button style={{
  backgroundColor: '#5ba3a5',
  borderRadius: '10px',
  padding: '7.5px 20px',
  width: '192px',
  height: '40px',
  boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.1)',
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  cursor: 'pointer'
}}>
  {/* Icono lupa - 24px blanco */}
  <p style={{
    fontFamily: "'Open Sans', sans-serif",
    fontSize: '16px',
    fontWeight: 600,
    color: 'white',
    lineHeight: 1.2
  }}>
    Buscar
  </p>
</button>
```

**Especificaciones del Botón Buscar:**

- **Altura**: `40px` (**FIJA** - nunca cambiar)
- **Ancho**: `192px`
- **Background**: `#5ba3a5` (azul primario)
- **Border Radius**: `10px`
- **Shadow**: `0px 2px 8px 0px rgba(0,0,0,0.1)`
- **Padding**: `7.5px 20px`
- **Gap**: `10px` entre icono y texto
- **Icono**: `24px` blanco (#FFFFFF)
- **Texto**: `16px Semibold #FFFFFF`
- **Hover**: `#004F6B` (azul oscuro)

### Orden de los Campos

**REGLA FUNDAMENTAL**: El orden de campos debe ir **del más general al más particular**.

```tsx
// Ejemplo de orden correcto
<Searchbar>
  <ProductKey />           {/* Siempre primero */}
  <InputDropdown />        {/* Filtro general (ej: Estado) */}
  <InputFlag />            {/* Filtro por país (si aplica) */}
  <InputDropdown />        {/* Filtro más específico (ej: Categoría) */}
  <InputText />            {/* Búsqueda particular (ej: ID, Nombre) */}
  <ButtonSearch />         {/* Siempre al final */}
</Searchbar>
```

### Casos de Uso Comunes - Searchbar

| Proyecto             | Campos                                | Orden de Campos                 |
| -------------------- | ------------------------------------- | ------------------------------- |
| Gestión de Materiales  | Estado, Tipo, Texto                   | Estado → Tipo → Código/Nombre       |
| Sistema de Tickets   | Prioridad, Categoría, Texto           | Prioridad → Categoría → Ticket# |
| Portal Administrativo| Rol, Departamento, Usuario            | Rol → Departamento → Usuario    |
| E-commerce           | Categoría, Estado Orden, Texto        | Categoría → Estado → Búsqueda   |
| Dashboard Simple     | Solo Key del producto                 | Key únicamente                  |

### Ejemplo Completo de Implementación

```tsx
export function Searchbar({
  productName = "SENTINEL",
  version = "v.1.0.0",
  onSearch
}) {
  return (
    <div style={{
      display: 'flex',
      gap: '20px',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: '40px'
    }}>
      {/* Key del Producto - OBLIGATORIO - SIEMPRE A LA IZQUIERDA */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
      }}>
        <p style={{
          fontFamily: "'Open Sans', sans-serif",
          fontSize: "24px",
          fontWeight: 700,
          color: "#5ba3a5",
          lineHeight: 1.2
        }}>
          {productName}
        </p>
        <p style={{
          fontFamily: "'Open Sans', sans-serif",
          fontSize: "12px",
          fontWeight: 400,
          color: "#6A6A6A",
          lineHeight: 1.2
        }}>
          {version}
        </p>
      </div>

      {/* Contenedor de inputs y botón - AGRUPADOS A LA DERECHA */}
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {/* Input Dropdown - Estado */}
        <div style={{
          height: '40px',
          width: '192px',
          boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            width: '100%',
            height: '100%',
            position: 'relative'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 12px',
              gap: '10px'
            }}>
              <select style={{
                flex: 1,
                fontSize: '14px',
                color: '#222222',
                backgroundColor: 'transparent',
                outline: 'none',
                border: 'none'
              }}>
                <option>Todos los estados</option>
                <option>Disponible</option>
                <option>Reservado</option>
              </select>
            </div>
            <div style={{
              position: 'absolute',
              border: '1px solid #D0D0D0',
              inset: 0,
              borderRadius: '10px',
              pointerEvents: 'none'
            }} />
          </div>
        </div>

        {/* Input Text - Búsqueda */}
        <div style={{
          height: '40px',
          width: '297px',
          boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            width: '100%',
            height: '100%',
            position: 'relative'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 12px'
            }}>
              <input
                placeholder="Buscar por código o descripción"
                style={{
                  flex: 1,
                  fontSize: '14px',
                  color: '#222222',
                  backgroundColor: 'transparent',
                  outline: 'none',
                  border: 'none'
                }}
              />
            </div>
            <div style={{
              position: 'absolute',
              border: '1px solid #D0D0D0',
              inset: 0,
              borderRadius: '10px',
              pointerEvents: 'none'
            }} />
          </div>
        </div>

        {/* Botón Buscar */}
        <button
          onClick={onSearch}
          style={{
            backgroundColor: '#5ba3a5',
            borderRadius: '10px',
            padding: '7.5px 20px',
            width: '192px',
            height: '40px',
            boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.1)',
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 200ms ease'
          }}
        >
          <p style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '16px',
            fontWeight: 600,
            color: 'white',
            lineHeight: 1.2
          }}>
            Buscar
          </p>
        </button>
      </div>
    </div>
  );
}
```

---

## 🗂️ Sidebar

### Descripción

El **Sidebar** es el componente de **navegación principal del sistema**. Se ubica en el lado izquierdo de la pantalla y proporciona acceso a las funcionalidades principales de la aplicación.

### Características Principales

- ✅ **Siempre visible**: Permanece fijo en todas las pantallas
- ✅ **Ancho fijo**: 56px en todas las resoluciones
- ✅ **5 componentes esenciales**: Isotipo, Menús, Usuario, Logs, Cerrar sesión
- ✅ **Estados completos**: Default, Hover, Focus, Active, Disabled

### Especificaciones Técnicas

```css
/* Dimensiones - FIJAS */
width: 56px;
height: 100vh;
position: fixed;
left: 0;
top: 0;
z-index: 40;

/* Estilos visuales */
background: #FFFFFF;
box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.10);

/* Layout */
display: flex;
flex-direction: column;
justify-content: space-between;
```

### Los 5 Componentes Esenciales

#### **1. Logo SENTINEL (Logo Rojo)**

El logo de SENTINEL que identifica la marca. **SIEMPRE en rojo institucional**.

```tsx
<div style={{
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '28px 16px',
  width: '100%'
}}>
  {/* Icono SVG - 24px - Color #5ba3a5 */}
</div>
```

**Especificaciones:**
- **Padding**: `28px 16px` (vertical mayor que horizontal)
- **Icono**: `24px`
- **Color**: `#5ba3a5` (rojo institucional) - **OBLIGATORIO**
- Sin estados de interacción (no es clickeable)

#### **2. Menús Generales (Navegación)**

Iconos de las principales secciones de la aplicación.

**Estados:**

| Estado               | Background  | Icono       | Indicador                                |
| -------------------- | ----------- | ----------- | ---------------------------------------- |
| **Default**          | `#FFFFFF`   | `#222222`   | Ninguno                                  |
| **Hover**            | `#FFFFFF`   | `#222222`   | Barra azul 4px a la izquierda (#5ba3a5)  |
| **Focus**            | `#FFFFFF`   | `#222222`   | Ring azul 2px inset (#5ba3a5)            |
| **Active/Pressed**   | `#5ba3a5`   | `#FFFFFF`   | Fondo azul completo                      |
| **Disabled**         | `#F5F5F5`   | `#D0D0D0`   | Cursor not-allowed                       |

#### **3. Usuario**

Muestra información del usuario logueado. **Icono siempre en rojo institucional**.

**Especificaciones:**
- **Icono**: `24px`
- **Color icono**: `#5ba3a5` (rojo institucional) - **SIEMPRE**
- **Estados**: Solo hover y focus (NO tiene estado activo)

#### **4. Logs (Historial)**

Abre un drawer con el historial de logs del sistema.

**Especificaciones:**
- **Icono**: `24px` negro (#222222)
- **Estados**: Default, Hover, Focus
- NO tiene estado activo (dispara acción)

#### **5. Cerrar Sesión**

Lanza validación para cerrar la sesión del usuario.

**Especificaciones:**
- **Icono**: `24px` negro (#222222)
- **Estados**: Default, Hover, Focus
- NO tiene estado activo (dispara acción)

---

## 💬 Tooltips

### Descripción

Los **Tooltips** son **mensajes flotantes** que se disparan a través de iconos o botones para **darle información complementaria al usuario**.

### Filosofía de Uso

Los tooltips deben usarse para:

- **Ayuda sobre procesos**: Explicar cómo funciona un componente o acción
- **Información complementaria**: Datos útiles que pueden estar en segundo plano
- **Contexto adicional**: Aclaraciones que mejoran la comprensión

**IMPORTANTE**: Los tooltips **NO deben contener información crucial** para continuar el proceso.

### Variantes de Tooltips

#### **1. Tooltip Dark (Oscuro)**

Para usar sobre **fondos claros** (blanco, gris claro).

```css
background: #222222;  /* Negro */
color: #FFFFFF;       /* Blanco */
border: none;
box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.10);
border-radius: 5px;
padding: 5px;
max-width: 300px;
```

#### **2. Tooltip Light**

Para usar sobre **fondos oscuros** (negro, azul oscuro).

```css
background: #FFFFFF;  /* Blanco */
color: #222222;       /* Negro */
border: 1px solid #D0D0D0;  /* Gris 3 */
box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.10);
border-radius: 5px;
padding: 5px;
max-width: 300px;
```

### Tipografía del Tooltip

```css
font-family: 'Open Sans', sans-serif;
font-size: 12px;
font-weight: 600;  /* Semibold */
line-height: 1.2;
text-align: center;
```

### Comportamiento

- **Disparo**: Hover sobre el elemento disparador o Focus (navegación con teclado)
- **Cierre**: Cursor sale del elemento o pérdida de focus
- **Delay**: 200ms antes de mostrar
- **Posicionamiento**: Top, Right, Bottom o Left según espacio disponible

---

## 🔘 Botones

### Tipos de Botones

El Design System define **4 tipos principales** de botones:

1. **Primario**: Acción principal (Guardar, Confirmar, Buscar)
2. **Secundario**: Acción secundaria (Cancelar, Volver)
3. **Destructivo**: Acciones irreversibles (Eliminar, Borrar)
4. **Con Icono**: Botones con icono + texto (Buscar, Descargar)

### 🔵 Botón Primario (Principal)

El botón por defecto para la **acción principal** de cada contexto.

#### **Especificaciones Técnicas**

```css
/* Estilos visuales */
background: #5ba3a5;  /* Azul principal */
color: #FFFFFF;  /* Blanco */
border: none;
border-radius: 5px;  /* Elemento contenido */
height: 40px;
padding: 7.5px 20px;

/* Tipografía */
font-family: 'Open Sans', sans-serif;
font-size: 16px;
font-weight: 600; /* Semibold */
line-height: 1.2;
text-align: center;

/* Estados */
/* Hover */
background: #004F6B;  /* Azul oscuro */

/* Disabled */
background: #D0D0D0;  /* Gris 3 */
color: #6A6A6A;  /* Gris 2 */
cursor: not-allowed;
```

#### **Ejemplo de Implementación**

```tsx
export function Button({
  children,
  onClick,
  disabled = false,
  variant = "primary"
}) {
  const getStyles = () => {
    const baseStyles = {
      height: '40px',
      padding: '7.5px 20px',
      borderRadius: '5px',
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'background-color 200ms ease',
      fontFamily: "'Open Sans', sans-serif",
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: 1.2
    };

    const variants = {
      primary: {
        backgroundColor: disabled ? '#D0D0D0' : '#5ba3a5',
        color: disabled ? '#6A6A6A' : '#FFFFFF'
      },
      secondary: {
        backgroundColor: '#FFFFFF',
        color: '#5ba3a5',
        border: '1px solid #5ba3a5'
      },
      destructive: {
        backgroundColor: disabled ? '#D0D0D0' : '#B50000',
        color: disabled ? '#6A6A6A' : '#FFFFFF'
      }
    };

    return { ...baseStyles, ...variants[variant] };
  };

  return (
    <button onClick={onClick} disabled={disabled} style={getStyles()}>
      {children}
    </button>
  );
}
```

### ⚪ Botón Secundario (Cancelar)

Botón para **acciones secundarias** o de cancelación.

```css
background: #FFFFFF;
color: #5ba3a5;
border: 1px solid #5ba3a5;
border-radius: 5px;
height: 40px;
padding: 7.5px 20px;

/* Hover */
background: #1a2332;  /* Azul claro */
```

### 🔴 Botón Destructivo (Eliminar)

Botón para **acciones irreversibles**.

```css
background: #B50000;
color: #FFFFFF;
border: none;
border-radius: 5px;
height: 40px;
padding: 7.5px 20px;

/* Hover */
background: #8B0000;  /* Rojo oscuro */
```

### 🎯 Botón con Icono

Botón que combina **icono + texto**.

```css
background: #5ba3a5;
color: #FFFFFF;
border: none;
border-radius: 10px;  /* Flotante */
height: 40px;
padding: 7.5px 20px;
box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);

/* Layout */
display: flex;
align-items: center;
justify-content: center;
gap: 10px;  /* Entre icono y texto */

/* Icono */
width: 24px;
height: 24px;
```

### Especificaciones Comunes

- **Altura estándar**: 40px
- **Padding**: 7.5px 20px
- **Border radius**: 5px (excepto con icono: 10px)
- **Tipografía**: 16px Semibold
- **Gap entre botones**: 20px

---

## 🪟 Modales

### Modal Base

- **Background**: #FFFFFF
- **Border radius**: 10px
- **Shadow**: 0px 2px 8px 0px rgba(0,0,0,0.20)
- **Padding**: bottom 20px, top 0, left 0, right 0
- **Overlay**: 50% opacidad

### Header

- **Borde inferior**: 2px solid #5ba3a5 (OBLIGATORIO)
- **Padding**: 20px (horizontal) 10px (vertical)
- **Título**: h1 (18px Semibold)
- **Icono cerrar**: 16px

### Tipos de Modales

1. **Modal Base**: Genérico
2. **Modal Informativo**: Solo botón "Cerrar"
3. **Modal de Confirmación**: [Cancelar] [Confirmar]
4. **Modal Destructivo**: [Cancelar] [Eliminar] (rojo)
5. **Modal de Formulario**: Captura de datos

### Modal Lateral

- **Ancho**: 50% de pantalla (max 960px)
- **Altura**: 100vh
- **Posición**: Derecha
- **Overlay**: 25% opacidad

---

## 🔔 Notificaciones

### 1. Notificaciones Flotantes (Toast)

- **Posición**: Esquina inferior izquierda
- **Auto-cierre**: 3-5 segundos
- **Border radius**: 10px
- **Padding**: 20px
- **Shadow**: 10% opacidad

#### Estados

| Estado      | Background | Border     | Icono  | Duración |
| ----------- | ---------- | ---------- | ------ | -------- |
| Éxito       | #CEE6C6    | #0B7329    | 24px   | 3-4s     |
| Error       | #FFD4D4    | #B50000    | 24px   | 5s       |
| Advertencia | #FFFCE0    | #FAB400    | 24px   | 4-5s     |
| Información | #1a2332    | #5ba3a5    | 24px   | 3s       |

### 2. Notificaciones Globales

- **Posición**: Superior de la pantalla (full width)
- **Persistente**: Hasta resolver evento
- **Border-bottom**: 2px solid (color del estado)
- **Padding**: 20px 30px

### 3. Notificaciones Internas

- **Posición**: Dentro del contenedor
- **Border radius**: 5px
- **Padding**: 15px
- **Icono**: 20px
- **Título**: 14px Semibold
- **Mensaje**: 12px Regular

---

## 📝 Inputs de Formulario

### Input Dropdown

- **Altura**: 40px
- **Label**: 12px Regular #222222
- **Placeholder**: 14px Regular #D0D0D0
- **Border**: 1px solid #D0D0D0
- **Border radius**: 5px
- **Icono expandir**: 24px

### Input Flag

- **Altura**: 40px
- **Bandera**: 24x24px SVG
- **Código país**: 12px Regular
- **Gap bandera-código**: 5px

### Textarea

- **Min-height**: 80px
- **Padding**: 11.5px 12px
- **Border**: 1px solid #D0D0D0
- **Border radius**: 5px
- **Tipografía**: 14px Regular
- **Contador**: 12px Regular (derecha)

---

## 📊 Tablas

### Formato Border 100% (8+ columnas)

- **Borde**: Completo 1px solid #D0D0D0
- **Border radius**: 5px (tabla)
- **Alta densidad visual**

### Formato Border 50% (4-7 columnas)

- **Borde**: Solo inferior 1px solid #D0D0D0
- **Sin borde externo**
- **Densidad media**

### Formato Border 0% (2-3 columnas)

- **Sin bordes**
- **Filas alternas**: Gris 4 (#EBEBEB) y Blanco
- **Border radius**: 5px por fila
- **Fila seleccionada**: Border-left 6px solid #5ba3a5

### Especificaciones Comunes

- **Altura fila estándar**: 40px
- **Altura fila compacta**: 30px
- **Header tipografía**: 14px Semibold
- **Row tipografía**: 12px Regular
- **Checkbox**: 14x14px, border 1.5px, radius 2px
- **Iconos acción**: 16px
- **Icono accordion**: 20px

### Estados de Filas

- **Default**: #FFFFFF o #EBEBEB (alternado en Border 0%)
- **Hover**: #F5F5F5
- **Focus**: outline 2px #5ba3a5
- **Selected**: #1a2332

---

## 🃏 Tarjetas (Cards)

### Especificaciones

- **Background**: #FFFFFF
- **Border radius**: 10px
- **Shadow**: 0px 2px 8px 0px rgba(0,0,0,0.1)
- **Border-top**: 10px solid (color del estado)
- **Padding**: 15px 20px 10px 20px
- **Gap label-valor**: 2px

### Estados (por color de borde)

| Estado  | Color Borde | Uso                              |
| ------- | ----------- | -------------------------------- |
| Success | #0B7329     | Datos positivos, objetivos OK    |
| Warning | #FAB400     | Datos que requieren atención     |
| Error   | #B50000     | Datos críticos, errores          |
| Neutral | #5ba3a5     | Datos informativos generales     |

### Tipografía

- **Label**: 12px Regular #6A6A6A (centrado)
- **Valor**: 16px Semibold #222222 (centrado)

---

## 🎯 Iconos de Estados

### Órdenes Técnicas (OT)

| Estado         | Icono             | Color   | Hex       | Size |
| -------------- | ----------------- | ------- | --------- | ---- |
| Des-Agendada   | calendar-question | Rojo    | #B50000   | 20px |
| Agendada       | calendar-clock    | Verde   | #0B7329   | 20px |
| Cancelada      | close-circle      | Rojo    | #B50000   | 20px |
| En Proceso     | progress-alert    | Naranja | #FAB400   | 20px |
| Finalizada     | check-circle      | Verde   | #0B7329   | 20px |

### Solicitudes de Datos (SDS)

| Estado      | Icono           | Color       | Hex       | Size | Opacidad |
| ----------- | --------------- | ----------- | --------- | ---- | -------- |
| A Confirmar | circle-question | Gris 2      | #6A6A6A   | 20px | 0.5      |
| Rechazada   | circle-slash    | Rojo Oscuro | #8B0000   | 19px | 1        |
| Error       | close-circle    | Rojo        | #B50000   | 20px | 1        |
| En Proceso  | progress-alert  | Naranja     | #FAB400   | 20px | 1        |
| Ok          | check-circle    | Verde       | #0B7329   | 20px | 1        |

**Nota**: Iconos siempre acompañados de texto, nunca solos.

---

## ♿ Accesibilidad

### Contraste de Colores

- **Objetivo**: WCAG 2.1 AAA
- **Herramienta**: Adobe Color
- **Validación**: Pruebas de daltonismo

### Navegación con Teclado

- **Tab**: Navegar entre elementos
- **Shift + Tab**: Navegar hacia atrás
- **Enter/Space**: Activar botón/acción
- **Esc**: Cerrar modal/tooltip

### ARIA Attributes

Todos los componentes interactivos deben incluir:
- `aria-label`
- `aria-describedby`
- `aria-invalid` (en errores)
- `role` apropiado

---

**Versión**: SENTINEL v2.0.0  
**Última actualización**: 29 de octubre, 2025


