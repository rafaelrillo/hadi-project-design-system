# Validation Checklist - SENTINEL v2.0.0

**Checklist completo para validar adherencia al Design System**

---

## 📋 Índice de Checklists

1. [Checklist General](#checklist-general)
2. [Checklist por Componente](#checklist-por-componente)
3. [Checklist por Tipo de Pantalla](#checklist-por-tipo-de-pantalla)
4. [Checklist de Accesibilidad](#checklist-de-accesibilidad)
5. [Checklist de Responsive](#checklist-de-responsive)
6. [Checklist de Code Quality](#checklist-de-code-quality)

---

## Checklist General

### ✅ Estructura de Archivos

- [ ] **Path injection en primera línea** de cada archivo
  ```tsx
  // Path: src/components/atoms/Button/Button.tsx
  ```

- [ ] **Clasificación Atomic Design correcta**
  - [ ] Atoms en `src/components/atoms/[Nombre]/[Nombre].tsx`
  - [ ] Molecules en `src/components/molecules/[Nombre]/[Nombre].tsx`
  - [ ] Organisms en `src/components/organisms/[Nombre]/[Nombre].tsx`
  - [ ] Layouts en `src/layouts/[Nombre].tsx`
  - [ ] Pages en `src/pages/[Nombre].tsx`

- [ ] **Naming conventions**
  - [ ] Componentes: PascalCase
  - [ ] Utilities/Services: camelCase
  - [ ] Coincidencia carpeta/archivo

---

### ✅ Estilos

#### CSS

- [ ] **NO usar Tailwind CSS**
  - [ ] Sin clases `text-*`, `bg-*`, `p-*`, `rounded-*`
  - [ ] Sin clases de utilidades

- [ ] **Variables CSS correctas**
  - [ ] Usar `var(--primary)`, `var(--secondary)`, etc.
  - [ ] Variables definidas en `src/styles/globals.css`

- [ ] **Métodos de estilizado permitidos**
  - [ ] **CSS Modules** (obligatorio para componentes)
  - [ ] Etiquetas HTML semánticas (h1, h2, p, label)
  - [ ] Estilos inline SOLO para valores dinámicos del usuario (width, maxWidth, padding)

#### Colores

- [ ] **Accent Primary (#5ba3a5) SOLO para:**
  - [ ] Product Key (siglas de 3 letras)
  - [ ] Logo SENTINEL en Sidebar
  - [ ] Icono de Usuario en Sidebar
  - [ ] **NUNCA** en botones de acción
  - [ ] **NUNCA** en estados de error

- [ ] **Azul Institucional (#5ba3a5) para:**
  - [ ] Botones primarios
  - [ ] Links y elementos activos
  - [ ] Bordes de modales

- [ ] **Colores de estado correctos**
  - [ ] Éxito: Verde (#0B7329)
  - [ ] Error: Rojo (#B50000)
  - [ ] Advertencia: Naranja (#FAB400)
  - [ ] Info: Azul (#5ba3a5)

#### Tipografía

- [ ] **Usar etiquetas HTML** para jerarquía
  - [ ] `<h1>` → 18px Semibold (una vez por pantalla)
  - [ ] `<h2>`, `<h3>` → 16px Semibold
  - [ ] `<h4>` → 14px Semibold
  - [ ] `<p>`, `<span>` → 14px Regular
  - [ ] `<label>` → 12px Regular

- [ ] **Line height siempre 1.2** (120%)

- [ ] **Font family**: 'Open Sans', sans-serif

#### Espaciado

- [ ] **Content padding**: 30px en todos los lados
- [ ] **Gap entre elementos**: 20px
- [ ] **Padding de contenedores**: 20px
- [ ] **Excepción**: Sin padding top si hay título

#### Border Radius

- [ ] **Elementos contenidos**: 5px
  - [ ] Botones, inputs, selects
- [ ] **Elementos flotantes**: 10px
  - [ ] Cards, modales, dropdowns

#### Sombras

- [ ] **Elementos flotantes**: `0px 2px 8px 0px rgba(0,0,0,0.1)` (10%)
  - [ ] Dropdowns, tooltips, popovers
- [ ] **Elementos contenedores**: `0px 2px 8px 0px rgba(0,0,0,0.2)` (20%)
  - [ ] Cards, modales, panels

---

## Checklist por Componente

### Button

- [ ] **Altura fija**: 40px
- [ ] **Padding**: 7.5px 20px
- [ ] **Border radius**: 5px (primary, secondary, destructive), 10px (with-icon)
- [ ] **Tipografía**: 16px Semibold
- [ ] **Gap con icono**: 10px
- [ ] **Variantes correctas**:
  - [ ] Primary: #5ba3a5 bg, #FFFFFF text
  - [ ] Secondary: #FFFFFF bg, #5ba3a5 text, borde 1px
  - [ ] Destructive: #B50000 bg, #FFFFFF text
- [ ] **Estados**:
  - [ ] Hover: cambio de color
  - [ ] Disabled: #D0D0D0 bg, #6A6A6A text, cursor not-allowed
- [ ] **Accesibilidad**:
  - [ ] `aria-label` si solo tiene icono
  - [ ] `type` especificado

---

### Input

- [ ] **Altura fija**: 40px (Text, Dropdown), min 80px (Textarea)
- [ ] **Border**: 1px solid #D0D0D0
- [ ] **Border radius**: 5px
- [ ] **Padding**: 8px 12px (Text/Dropdown), 11.5px 12px (Textarea)
- [ ] **Tipografía**: 14px Regular
- [ ] **Placeholder**: 14px Regular #D0D0D0
- [ ] **Estados**:
  - [ ] Default: #D0D0D0 border
  - [ ] Error: #B50000 border
  - [ ] Disabled: #F5F5F5 bg, cursor not-allowed
- [ ] **Accesibilidad**:
  - [ ] `aria-label`
  - [ ] `aria-describedby` (si hay helper text)
  - [ ] `aria-invalid` (si hay error)

---

### Sidebar

- [ ] **Ancho fijo**: 56px
- [ ] **Altura**: 100vh
- [ ] **Position**: fixed, left 0, top 0
- [ ] **Z-index**: 40
- [ ] **Background**: #FFFFFF
- [ ] **Shadow**: `0px 2px 8px 0px rgba(0,0,0,0.1)`
- [ ] **5 componentes obligatorios**:
  - [ ] Logo SENTINEL (rojo #5ba3a5)
  - [ ] Menús de navegación
  - [ ] Usuario (rojo #5ba3a5)
  - [ ] Logs
  - [ ] Cerrar sesión
- [ ] **Estados de menú**:
  - [ ] Default: #FFFFFF bg, #222222 icono
  - [ ] Hover: barra azul 4px izquierda
  - [ ] Focus: ring azul 2px inset
  - [ ] Active: #5ba3a5 bg, #FFFFFF icono
  - [ ] Disabled: #F5F5F5 bg, #D0D0D0 icono

---

### Searchbar

#### ⚠️ CRÍTICO

- [ ] **Altura FIJA 40px** - **NUNCA cambiar**
- [ ] **TODOS los inputs**: 40px altura
- [ ] **Botón Buscar**: 40px altura
- [ ] **Contenedor**: 40px altura

#### Estructura

- [ ] **Product Key obligatorio** (izquierda)
  - [ ] Siglas: 24px Bold #5ba3a5
  - [ ] Versión: 12px Regular #6A6A6A (debajo)

- [ ] **Gap entre elementos**: 20px

- [ ] **Input Dropdown** (si aplica)
  - [ ] Altura: 40px FIJA
  - [ ] Border radius: 10px
  - [ ] Shadow: `0px 2px 8px 0px rgba(0,0,0,0.1)`
  - [ ] Padding: 8px 12px

- [ ] **Input Text** (si aplica)
  - [ ] Altura: 40px FIJA
  - [ ] Border radius: 10px
  - [ ] Shadow: `0px 2px 8px 0px rgba(0,0,0,0.1)`

- [ ] **Botón Buscar**
  - [ ] Altura: 40px FIJA
  - [ ] Width: 192px
  - [ ] Background: #5ba3a5
  - [ ] Border radius: 10px
  - [ ] Tipografía: 16px Semibold #FFFFFF
  - [ ] Icono: 24px blanco
  - [ ] Gap: 10px

- [ ] **Orden de campos**: Del más general al más particular

---

### Modal

- [ ] **Border radius**: 10px
- [ ] **Shadow**: `0px 2px 8px 0px rgba(0,0,0,0.2)`
- [ ] **Background**: #FFFFFF
- [ ] **Padding**: 0 0 20px 0

- [ ] **Header obligatorio**:
  - [ ] Border-bottom: 2px solid #5ba3a5 **OBLIGATORIO**
  - [ ] Padding: 20px (horizontal) 10px (vertical)
  - [ ] Título: h1 (18px Semibold)
  - [ ] Icono cerrar: 16px

- [ ] **Body**:
  - [ ] Padding: 20px

- [ ] **Footer** (botones):
  - [ ] Padding: 0 20px 20px 20px
  - [ ] Display: flex
  - [ ] Gap: 20px
  - [ ] Justify-content: flex-end
  - [ ] Orden: [Cancelar] [Confirmar]

- [ ] **Overlay**:
  - [ ] Background: rgba(0,0,0,0.5) (50%)

---

### Table

- [ ] **Formato según columnas**:
  - [ ] 8+ columnas: Border 100% (completo)
  - [ ] 4-7 columnas: Border 50% (inferior)
  - [ ] 2-3 columnas: Border 0% (sin bordes, filas alternadas)

- [ ] **Altura de fila**:
  - [ ] Estándar: 40px
  - [ ] Compacta: 30px

- [ ] **Tipografía**:
  - [ ] Header: 14px Semibold
  - [ ] Row: 12px Regular

- [ ] **Checkbox**: 14x14px, border 1.5px, radius 2px

- [ ] **Iconos de acción**: 16px

- [ ] **Estados de fila**:
  - [ ] Default: #FFFFFF
  - [ ] Hover: #F5F5F5
  - [ ] Focus: outline 2px #5ba3a5
  - [ ] Selected: #1a2332
  - [ ] Alt (Border 0%): #EBEBEB

- [ ] **Fila seleccionada (Border 0%)**:
  - [ ] Border-left: 6px solid #5ba3a5

---

### Card

- [ ] **Border radius**: 10px
- [ ] **Border-top**: 10px solid (color según variante)
- [ ] **Padding**: 15px 20px 10px 20px
- [ ] **Shadow**: `0px 2px 8px 0px rgba(0,0,0,0.1)`
- [ ] **Background**: #FFFFFF
- [ ] **Gap (label-value)**: 2px

- [ ] **Variantes (border-top)**:
  - [ ] Success: #0B7329
  - [ ] Warning: #FAB400
  - [ ] Error: #B50000
  - [ ] Neutral: #5ba3a5

- [ ] **Tipografía**:
  - [ ] Label: 12px Regular #6A6A6A (centrado)
  - [ ] Value: 16px Semibold #222222 (centrado)

---

## Checklist por Tipo de Pantalla

### Dashboard

- [ ] **Searchbar**: Solo Product Key (si no hay búsquedas)

- [ ] **Grid de Cards**:
  - [ ] Grid-template-columns: repeat(4, 1fr)
  - [ ] Gap: 20px
  - [ ] Margin-bottom: 20px

- [ ] **Main Content**:
  - [ ] Background: #FFFFFF
  - [ ] Border radius: 10px
  - [ ] Padding: 20px
  - [ ] Shadow: `0px 2px 8px 0px rgba(0,0,0,0.1)`

---

### Form (Crear/Editar)

- [ ] **Container**:
  - [ ] Background: #FFFFFF
  - [ ] Border radius: 10px
  - [ ] Padding: 0 20px 20px 20px
  - [ ] Shadow: `0px 2px 8px 0px rgba(0,0,0,0.2)`

- [ ] **Header**:
  - [ ] h1: Título del formulario
  - [ ] Padding: 20px 0
  - [ ] Border-bottom: 2px solid #5ba3a5

- [ ] **Form Body**:
  - [ ] Padding-top: 20px
  - [ ] Gap entre fields: 20px

- [ ] **Layout**:
  - [ ] 1 columna: width 100%
  - [ ] 2 columnas: grid-template-columns: 1fr 1fr, gap 20px

- [ ] **Footer (Botones)**:
  - [ ] Display: flex
  - [ ] Justify-content: flex-end
  - [ ] Gap: 20px
  - [ ] Padding-top: 20px
  - [ ] Orden: [Cancelar/Secundario] [Guardar/Primario]

- [ ] **Validaciones**:
  - [ ] Campos requeridos con asterisco rojo
  - [ ] Mensajes de error debajo del campo
  - [ ] Error: border rojo, mensaje rojo

---

### Table (Lista)

- [ ] **Searchbar**:
  - [ ] Product Key + Filtros + Buscar
  - [ ] Altura 40px FIJA

- [ ] **Container**:
  - [ ] Background: #FFFFFF
  - [ ] Border radius: 10px
  - [ ] Padding: 0 20px 20px 20px
  - [ ] Shadow: `0px 2px 8px 0px rgba(0,0,0,0.2)`

- [ ] **Header**:
  - [ ] Display: flex
  - [ ] Justify-content: space-between
  - [ ] Align-items: center
  - [ ] Padding: 20px 0
  - [ ] Border-bottom: 2px solid #5ba3a5
  - [ ] h1 + Botón "+ Nuevo" (opcional)

- [ ] **Table**:
  - [ ] Margin-top: 20px
  - [ ] Formato según columnas

- [ ] **Pagination**:
  - [ ] Margin-top: 20px
  - [ ] Display: flex
  - [ ] Justify-content: center

---

### Detail (Visualización)

- [ ] **Searchbar**: Solo Product Key

- [ ] **Container**:
  - [ ] Background: #FFFFFF
  - [ ] Border radius: 10px
  - [ ] Padding: 0 20px 20px 20px
  - [ ] Shadow: `0px 2px 8px 0px rgba(0,0,0,0.2)`

- [ ] **Header**:
  - [ ] Display: flex
  - [ ] Justify-content: space-between
  - [ ] h1 + Botones [Editar] [Eliminar]
  - [ ] Border-bottom: 2px solid #5ba3a5

- [ ] **Sections**:
  - [ ] h2 para subtítulos de sección
  - [ ] Gap entre campos: 15px
  - [ ] Label: 12px Regular #6A6A6A
  - [ ] Value: 14px Regular #222222

- [ ] **Divider entre secciones**:
  - [ ] Border-top: 1px solid #D0D0D0
  - [ ] Margin: 20px 0

---

## Checklist de Accesibilidad

### WCAG 2.1 AA

- [ ] **Contraste de colores**:
  - [ ] Texto normal (< 18px): 4.5:1 mínimo
  - [ ] Texto grande (≥ 18px): 3:1 mínimo
  - [ ] Elementos interactivos: 3:1 mínimo

- [ ] **Navegación con teclado**:
  - [ ] Tab: navega entre elementos
  - [ ] Shift + Tab: navega hacia atrás
  - [ ] Enter/Space: activa elemento
  - [ ] Esc: cierra modal/tooltip

- [ ] **Focus states visibles**:
  - [ ] Outline: 2px solid #5ba3a5
  - [ ] Outline-offset: 2px

- [ ] **ARIA attributes**:
  - [ ] `aria-label` en botones con solo icono
  - [ ] `aria-describedby` en inputs con helper text
  - [ ] `aria-invalid` en inputs con error
  - [ ] `role` apropiado

- [ ] **Tamaño mínimo de elementos interactivos**:
  - [ ] 40×40px mínimo (cumplido en botones e inputs)

- [ ] **Alt text en imágenes**:
  - [ ] Todas las imágenes tienen alt descriptivo

---

## Checklist de Responsive

### Breakpoints

- [ ] **M (1366×768px)**: Main 12 col, Side 6 col
- [ ] **L (1600×900px)**: Main 16 col, Side 8 col
- [ ] **XL (1920×1080px)**: Main 20 col, Side 10 col

### Elementos Fijos

- [ ] **Sidebar**: 56px (fijo en todas las resoluciones)
- [ ] **Searchbar altura**: 40px (fijo en todas las resoluciones)
- [ ] **Botones altura**: 40px (fijo)
- [ ] **Inputs altura**: 40px (fijo)

### Grid de Cards

- [ ] **XL, L**: 4 cards por fila
- [ ] **M**: 2 cards por fila

---

## Checklist de Code Quality

### TypeScript

- [ ] **Strict mode habilitado**
- [ ] **Props correctamente tipadas**:
  ```tsx
  interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'destructive';
    onClick?: () => void;
    disabled?: boolean;
  }
  ```
- [ ] **No hay `any` types**
- [ ] **No hay errores de compilación**

### CSS Modules

- [ ] **Archivo `.module.css` para cada componente**
- [ ] **Import correcto**: `import styles from './Component.module.css'`
- [ ] **Usar helper `getClassName()`** para composición de clases
- [ ] **NO usar estilos inline** excepto para valores dinámicos del usuario
- [ ] **Seguir naming convention**: camelCase para clases CSS

### Imports

- [ ] **Ordenados correctamente**:
  1. React y librerías externas
  2. Componentes internos
  3. Hooks, utils, services
  4. Stores
  5. Types
  6. CSS Modules (último)

- [ ] **Usar path aliases**:
  ```tsx
  import { Button } from '@atoms/Button/Button';
  ```

### Naming

- [ ] **Componentes**: PascalCase
- [ ] **Funciones/Variables**: camelCase
- [ ] **Constantes**: UPPER_SNAKE_CASE
- [ ] **Archivos componentes**: PascalCase.tsx
- [ ] **Archivos utilities**: camelCase.ts

### Performance

- [ ] **No re-renders innecesarios**
- [ ] **Uso adecuado de `useMemo` y `useCallback`**
- [ ] **Imágenes optimizadas**

---

## Checklist Final (Pre-Entrega)

Antes de considerar el código terminado:

### Críticos (Deben pasar 100%)

- [ ] Path injection en primera línea
- [ ] **CSS Modules para estilos** (NO estilos inline excepto valores dinámicos)
- [ ] Searchbar altura 40px (si aplica)
- [ ] Rojo institucional SOLO en Product Key/Usuario/Isotipo
- [ ] NO usar Tailwind CSS
- [ ] Clasificación Atomic Design correcta

### Importantes (Deben pasar ≥ 90%)

- [ ] Colores correctos según Design System
- [ ] Tipografía usando etiquetas HTML
- [ ] Border radius correcto (5px/10px)
- [ ] Gap 20px entre elementos
- [ ] Sombras correctas (10%/20%)
- [ ] Padding de contenedores 20px
- [ ] Line height 1.2

### Accesibilidad (Deben pasar ≥ 80%)

- [ ] ARIA labels en elementos interactivos
- [ ] Contraste de colores WCAG AA
- [ ] Navegación con teclado funcional
- [ ] Focus states visibles

### Code Quality (Deben pasar 100%)

- [ ] TypeScript sin errores
- [ ] Props correctamente tipadas
- [ ] ESLint sin errores
- [ ] Prettier aplicado

---

**Versión**: SENTINEL v2.0.0
**Última actualización**: 6 de diciembre, 2025
