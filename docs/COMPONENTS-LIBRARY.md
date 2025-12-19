# Component Library - Robot Resources v1.0.1

**Catálogo completo de componentes del Design System**

---

## 📋 Tabla de Contenidos

### Atoms
1. [Button](#button)
2. [Input](#input)
3. [Icon](#icon)
4. [Badge](#badge)
5. [Tooltip](#tooltip)
6. [Typography](#typography)

### Molecules
7. [Card](#card)
8. [FormField](#formfield)
9. [SidebarItem](#sidebaritem)
10. [SearchbarItem](#searchbaritem)
11. [NotificationCard](#notificationcard)

### Organisms
12. [Sidebar](#sidebar)
13. [Searchbar](#searchbar)
14. [Table](#table)
15. [Modal](#modal)
16. [Form](#form)
17. [Pagination](#pagination)

---

## ATOMS

---

### Button

**Categoría**: Atom
**Path**: `src/components/atoms/Button/Button.tsx`

#### Descripción

Componente de botón reutilizable con 4 variantes principales.

#### Variantes

1. **Primary** - Acción principal (Guardar, Confirmar, Buscar)
2. **Secondary** - Acción secundaria (Cancelar, Volver)
3. **Destructive** - Acciones irreversibles (Eliminar, Borrar)
4. **With Icon** - Botones con icono + texto

#### Especificaciones

**Dimensiones:**
- Altura fija: `40px`
- Padding: `7.5px 20px`
- Border radius: `5px` (elementos contenidos)
- Border radius con icono: `10px` (flotante)

**Tipografía:**
- Font size: `16px`
- Font weight: `600` (Semibold)
- Line height: `1.2`

**Gap (con icono):**
- Entre icono y texto: `10px`

#### Estados

| Variante      | Default BG  | Default Text | Hover BG    | Disabled BG | Disabled Text |
| ------------- | ----------- | ------------ | ----------- | ----------- | ------------- |
| Primary       | `#006081`   | `#FFFFFF`    | `#004F6B`   | `#D0D0D0`   | `#6A6A6A`     |
| Secondary     | `#FFFFFF`   | `#006081`    | `#D4F7FF`   | `#FFFFFF`   | `#D0D0D0`     |
| Destructive   | `#B50000`   | `#FFFFFF`    | `#8B0000`   | `#D0D0D0`   | `#6A6A6A`     |

**Secondary**: Incluye borde `1px solid #006081`

#### Props TypeScript

```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'destructive' | 'with-icon';
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;  // Para variante with-icon
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}
```

#### Ejemplo React

```tsx
// Path: src/components/atoms/Button/Button.tsx
import React from 'react';

export function Button({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
  icon,
  type = 'button',
  ariaLabel
}: ButtonProps) {
  const getStyles = () => {
    const baseStyles: React.CSSProperties = {
      height: '40px',
      padding: '7.5px 20px',
      borderRadius: variant === 'with-icon' ? '10px' : '5px',
      border: variant === 'secondary' ? '1px solid #006081' : 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'background-color 200ms ease',
      fontFamily: "'Open Sans', sans-serif",
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: 1.2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: icon ? '10px' : '0'
    };

    const variants = {
      primary: {
        backgroundColor: disabled ? '#D0D0D0' : '#006081',
        color: disabled ? '#6A6A6A' : '#FFFFFF'
      },
      secondary: {
        backgroundColor: '#FFFFFF',
        color: disabled ? '#D0D0D0' : '#006081'
      },
      destructive: {
        backgroundColor: disabled ? '#D0D0D0' : '#B50000',
        color: disabled ? '#6A6A6A' : '#FFFFFF'
      },
      'with-icon': {
        backgroundColor: disabled ? '#D0D0D0' : '#006081',
        color: disabled ? '#6A6A6A' : '#FFFFFF',
        boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.1)'
      }
    };

    return { ...baseStyles, ...variants[variant] };
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={getStyles()}
      aria-label={ariaLabel}
    >
      {icon && icon}
      {children}
    </button>
  );
}
```

#### Accesibilidad

- `aria-label`: Requerido si el botón solo tiene icono
- `disabled`: Estado disabled con cursor `not-allowed`
- Focus state: `outline: 2px solid #006081`
- Navegación: `Tab`, `Enter/Space` para activar

---

### Input

**Categoría**: Atom
**Path**: `src/components/atoms/Input/Input.tsx`

#### Descripción

Componente de input con 3 variantes: Text, Dropdown, Textarea.

#### Variantes

1. **Input Text** - Campo de texto libre
2. **Input Dropdown** - Selector de opciones
3. **Textarea** - Texto multilínea

#### Especificaciones Comunes

**Dimensiones:**
- Altura (Input Text/Dropdown): `40px` **FIJA**
- Min-height (Textarea): `80px`
- Border: `1px solid #D0D0D0`
- Border radius: `5px`
- Padding: `8px 12px` (Text/Dropdown), `11.5px 12px` (Textarea)

**Tipografía:**
- Font size: `14px` (contenido)
- Font size placeholder: `14px`
- Color texto: `#222222`
- Color placeholder: `#D0D0D0`

#### Input Text

```tsx
// Path: src/components/atoms/Input/InputText.tsx
interface InputTextProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export function InputText({
  placeholder,
  value,
  onChange,
  disabled = false,
  error = false,
  ariaLabel,
  ariaDescribedBy
}: InputTextProps) {
  return (
    <div style={{
      height: '40px',
      position: 'relative'
    }}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-invalid={error}
        style={{
          width: '100%',
          height: '100%',
          padding: '8px 12px',
          border: `1px solid ${error ? '#B50000' : '#D0D0D0'}`,
          borderRadius: '5px',
          fontSize: '14px',
          fontFamily: "'Open Sans', sans-serif",
          color: '#222222',
          backgroundColor: disabled ? '#F5F5F5' : '#FFFFFF',
          outline: 'none'
        }}
      />
    </div>
  );
}
```

#### Input Dropdown

```tsx
// Path: src/components/atoms/Input/InputDropdown.tsx
interface InputDropdownProps {
  options: Array<{ value: string; label: string }>;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

export function InputDropdown({
  options,
  value,
  onChange,
  placeholder,
  disabled = false,
  ariaLabel
}: InputDropdownProps) {
  return (
    <div style={{
      height: '40px',
      position: 'relative'
    }}>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-label={ariaLabel}
        style={{
          width: '100%',
          height: '100%',
          padding: '8px 12px',
          border: '1px solid #D0D0D0',
          borderRadius: '5px',
          fontSize: '14px',
          fontFamily: "'Open Sans', sans-serif",
          color: value ? '#222222' : '#D0D0D0',
          backgroundColor: disabled ? '#F5F5F5' : '#FFFFFF',
          outline: 'none',
          appearance: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer'
        }}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {/* Icono flecha (ChevronDown - 24px) */}
    </div>
  );
}
```

#### Textarea

```tsx
// Path: src/components/atoms/Input/Textarea.tsx
interface TextareaProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
  disabled?: boolean;
  error?: boolean;
  ariaLabel?: string;
}

export function Textarea({
  placeholder,
  value,
  onChange,
  maxLength,
  disabled = false,
  error = false,
  ariaLabel
}: TextareaProps) {
  return (
    <div style={{ position: 'relative' }}>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-invalid={error}
        style={{
          width: '100%',
          minHeight: '80px',
          padding: '11.5px 12px',
          border: `1px solid ${error ? '#B50000' : '#D0D0D0'}`,
          borderRadius: '5px',
          fontSize: '14px',
          fontFamily: "'Open Sans', sans-serif",
          color: '#222222',
          backgroundColor: disabled ? '#F5F5F5' : '#FFFFFF',
          outline: 'none',
          resize: 'vertical'
        }}
      />
      {maxLength && (
        <span style={{
          position: 'absolute',
          bottom: '5px',
          right: '12px',
          fontSize: '12px',
          color: '#6A6A6A'
        }}>
          {value?.length || 0}/{maxLength}
        </span>
      )}
    </div>
  );
}
```

---

### Icon

**Categoría**: Atom
**Path**: `src/components/atoms/Icon/Icon.tsx`

#### Descripción

Wrapper para iconos de Lucide React con tamaños y colores estandarizados.

#### Especificaciones

**Tamaños:**
- `xs`: 16px
- `sm`: 20px
- `md`: 24px (default)
- `lg`: 32px

**Colores predefinidos:**
- `default`: #222222 (Gris 1)
- `secondary`: #6A6A6A (Gris 2)
- `primary`: #006081 (Azul)
- `brand`: #DA291C (Rojo Claro)
- `destructive`: #B50000 (Rojo)
- `success`: #0B7329 (Verde)
- `warning`: #FAB400 (Naranja)
- `muted`: #D0D0D0 (Gris 3)

#### Props TypeScript

```typescript
import { LucideIcon } from 'lucide-react';

interface IconProps {
  icon: LucideIcon;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: 'default' | 'secondary' | 'primary' | 'brand' | 'destructive' | 'success' | 'warning' | 'muted' | string;
  ariaLabel?: string;
}
```

#### Ejemplo React

```tsx
// Path: src/components/atoms/Icon/Icon.tsx
import React from 'react';
import { LucideIcon } from 'lucide-react';

const sizeMap = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32
};

const colorMap = {
  default: '#222222',
  secondary: '#6A6A6A',
  primary: '#006081',
  brand: '#DA291C',
  destructive: '#B50000',
  success: '#0B7329',
  warning: '#FAB400',
  muted: '#D0D0D0'
};

export function Icon({
  icon: IconComponent,
  size = 'md',
  color = 'default',
  ariaLabel
}: IconProps) {
  const pixelSize = sizeMap[size];
  const iconColor = colorMap[color] || color;

  return (
    <IconComponent
      size={pixelSize}
      color={iconColor}
      aria-label={ariaLabel}
    />
  );
}
```

---

### Badge

**Categoría**: Atom
**Path**: `src/components/atoms/Badge/Badge.tsx`

#### Descripción

Etiquetas pequeñas para mostrar estados o categorías.

#### Variantes

- `success`: Verde
- `error`: Rojo
- `warning`: Naranja
- `info`: Azul
- `neutral`: Gris

#### Especificaciones

**Dimensiones:**
- Height: `auto`
- Padding: `4px 8px`
- Border radius: `5px`
- Font size: `12px`
- Font weight: `600` (Semibold)

#### Props TypeScript

```typescript
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'error' | 'warning' | 'info' | 'neutral';
}
```

#### Ejemplo React

```tsx
// Path: src/components/atoms/Badge/Badge.tsx
export function Badge({ children, variant = 'neutral' }: BadgeProps) {
  const variants = {
    success: { bg: '#CEE6C6', color: '#0B7329' },
    error: { bg: '#FFD4D4', color: '#B50000' },
    warning: { bg: '#FFFCE0', color: '#FAB400' },
    info: { bg: '#D4F7FF', color: '#006081' },
    neutral: { bg: '#F5F5F5', color: '#6A6A6A' }
  };

  const style = variants[variant];

  return (
    <span style={{
      display: 'inline-flex',
      padding: '4px 8px',
      borderRadius: '5px',
      backgroundColor: style.bg,
      color: style.color,
      fontSize: '12px',
      fontWeight: 600,
      fontFamily: "'Open Sans', sans-serif",
      lineHeight: 1.2
    }}>
      {children}
    </span>
  );
}
```

---

### Tooltip

**Categoría**: Atom
**Path**: `src/components/atoms/Tooltip/Tooltip.tsx`

#### Descripción

Mensajes flotantes que se muestran al hacer hover o focus sobre elementos.

#### Variantes

1. **Dark** - Fondo oscuro, texto blanco (para fondos claros)
2. **Light** - Fondo claro, texto oscuro (para fondos oscuros)

#### Especificaciones

**Dimensiones:**
- Max-width: `300px`
- Padding: `5px`
- Border radius: `5px`
- Font size: `12px`
- Font weight: `600` (Semibold)

**Dark:**
- Background: `#222222`
- Color: `#FFFFFF`
- Shadow: `0px 2px 8px 0px rgba(0,0,0,0.1)`

**Light:**
- Background: `#FFFFFF`
- Color: `#222222`
- Border: `1px solid #D0D0D0`
- Shadow: `0px 2px 8px 0px rgba(0,0,0,0.1)`

#### Comportamiento

- **Disparo**: Hover o Focus
- **Delay**: 200ms antes de mostrar
- **Posición**: Top, Right, Bottom, Left (automático según espacio)

#### Props TypeScript

```typescript
interface TooltipProps {
  children: React.ReactNode;  // Trigger element
  content: string;
  variant?: 'dark' | 'light';
  position?: 'top' | 'right' | 'bottom' | 'left';
}
```

---

### Typography

**Categoría**: Atom
**Path**: `src/components/atoms/Typography/Typography.tsx`

#### Descripción

Componentes wrapper para elementos tipográficos con estilos del DS aplicados.

#### Componentes

- `Heading1` (h1) - 18px Semibold
- `Heading2` (h2) - 16px Semibold
- `Heading3` (h3) - 16px Semibold
- `Heading4` (h4) - 14px Semibold
- `Paragraph` (p) - 14px Regular
- `Label` (label) - 12px Regular
- `ProductKey` - 24px Bold, Rojo #DA291C

---

## MOLECULES

---

### Card

**Categoría**: Molecule
**Path**: `src/components/molecules/Card/Card.tsx`

#### Descripción

Tarjeta informativa con borde superior de color según estado.

#### Especificaciones

**Dimensiones:**
- Border radius: `10px`
- Border-top: `10px solid` (color según variante)
- Padding: `15px 20px 10px 20px`
- Shadow: `0px 2px 8px 0px rgba(0,0,0,0.1)`
- Background: `#FFFFFF`
- Gap (label-value): `2px`

**Tipografía:**
- Label: `12px Regular #6A6A6A` (centrado)
- Value: `16px Semibold #222222` (centrado)

#### Variantes (por color de borde)

| Variante  | Border Color | Uso                              |
| --------- | ------------ | -------------------------------- |
| `success` | `#0B7329`    | Datos positivos, objetivos OK    |
| `warning` | `#FAB400`    | Datos que requieren atención     |
| `error`   | `#B50000`    | Datos críticos, errores          |
| `neutral` | `#006081`    | Datos informativos generales     |

#### Props TypeScript

```typescript
interface CardProps {
  label: string;
  value: string | number;
  variant?: 'success' | 'warning' | 'error' | 'neutral';
}
```

#### Ejemplo React

```tsx
// Path: src/components/molecules/Card/Card.tsx
export function Card({ label, value, variant = 'neutral' }: CardProps) {
  const borderColors = {
    success: '#0B7329',
    warning: '#FAB400',
    error: '#B50000',
    neutral: '#006081'
  };

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '10px',
      borderTop: `10px solid ${borderColors[variant]}`,
      padding: '15px 20px 10px 20px',
      boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2px'
    }}>
      <p style={{
        fontSize: '12px',
        fontWeight: 400,
        color: '#6A6A6A',
        textAlign: 'center',
        fontFamily: "'Open Sans', sans-serif",
        lineHeight: 1.2
      }}>
        {label}
      </p>
      <p style={{
        fontSize: '16px',
        fontWeight: 600,
        color: '#222222',
        textAlign: 'center',
        fontFamily: "'Open Sans', sans-serif",
        lineHeight: 1.2
      }}>
        {value}
      </p>
    </div>
  );
}
```

---

### FormField

**Categoría**: Molecule
**Path**: `src/components/molecules/FormField/FormField.tsx`

#### Descripción

Combinación de Label + Input + Error message + Helper text.

#### Anatomía

1. Label (arriba)
2. Input (centro)
3. Helper text (abajo, opcional)
4. Error message (abajo, si hay error)

#### Especificaciones

- Gap entre elementos: `5px`
- Label: `12px Regular #222222`
- Helper text: `12px Regular #6A6A6A`
- Error message: `12px Regular #B50000`

#### Props TypeScript

```typescript
interface FormFieldProps {
  label: string;
  children: React.ReactNode;  // Input component
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
}
```

#### Ejemplo React

```tsx
// Path: src/components/molecules/FormField/FormField.tsx
export function FormField({
  label,
  children,
  helperText,
  errorMessage,
  required = false
}: FormFieldProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
      width: '100%'
    }}>
      <label style={{
        fontSize: '12px',
        fontWeight: 400,
        color: '#222222',
        fontFamily: "'Open Sans', sans-serif",
        lineHeight: 1.2
      }}>
        {label} {required && <span style={{ color: '#B50000' }}>*</span>}
      </label>
      {children}
      {helperText && !errorMessage && (
        <span style={{
          fontSize: '12px',
          color: '#6A6A6A',
          fontFamily: "'Open Sans', sans-serif"
        }}>
          {helperText}
        </span>
      )}
      {errorMessage && (
        <span style={{
          fontSize: '12px',
          color: '#B50000',
          fontFamily: "'Open Sans', sans-serif"
        }}>
          {errorMessage}
        </span>
      )}
    </div>
  );
}
```

---

### NotificationCard

**Categoría**: Molecule
**Path**: `src/components/molecules/NotificationCard/NotificationCard.tsx`

#### Descripción

Tarjeta de notificación interna con icono, título y mensaje.

#### Variantes

- `success`: Verde
- `error`: Rojo
- `warning`: Naranja
- `info`: Azul

#### Especificaciones

**Dimensiones:**
- Border radius: `5px`
- Padding: `15px`
- Border: `1px solid` (color según variante)
- Background: color claro según variante
- Gap: `10px` entre icono y texto

**Tipografía:**
- Título: `14px Semibold #222222`
- Mensaje: `12px Regular #222222`

**Iconos:**
- Size: `20px`
- Color: según variante

#### Props TypeScript

```typescript
interface NotificationCardProps {
  variant: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
}
```

---

## ORGANISMS

---

### Sidebar

**Categoría**: Organism
**Path**: `src/components/organisms/Sidebar/Sidebar.tsx`

#### Descripción

Barra de navegación principal fija en el lado izquierdo de la pantalla.

#### Los 5 Componentes Esenciales

1. **Isotipo Claro** - Logo rojo (#DA291C), 24px
2. **Menús de Navegación** - Iconos de secciones principales
3. **Usuario** - Icono de usuario (rojo #DA291C)
4. **Logs** - Abre drawer de historial
5. **Cerrar Sesión** - Logout

#### Especificaciones Técnicas

**Dimensiones:**
- Width: `56px` **FIJA**
- Height: `100vh`
- Position: `fixed`
- Left: `0`
- Top: `0`
- Z-index: `40`

**Estilos:**
- Background: `#FFFFFF`
- Shadow: `0px 2px 8px 0px rgba(0,0,0,0.1)`

**Layout:**
- Display: `flex`
- Flex-direction: `column`
- Justify-content: `space-between`

#### Estados de Menú

| Estado    | Background | Icono     | Indicador                           |
| --------- | ---------- | --------- | ----------------------------------- |
| Default   | `#FFFFFF`  | `#222222` | Ninguno                             |
| Hover     | `#FFFFFF`  | `#222222` | Barra azul 4px izquierda (#006081)  |
| Focus     | `#FFFFFF`  | `#222222` | Ring azul 2px inset (#006081)       |
| Active    | `#006081`  | `#FFFFFF` | Fondo azul completo                 |
| Disabled  | `#F5F5F5`  | `#D0D0D0` | Cursor not-allowed                  |

#### Props TypeScript

```typescript
interface SidebarProps {
  productLogo: React.ReactNode;
  menuItems: Array<{
    icon: LucideIcon;
    label: string;
    href: string;
    active?: boolean;
  }>;
  userIcon: React.ReactNode;
  onLogsClick: () => void;
  onLogoutClick: () => void;
}
```

---

### Searchbar

**Categoría**: Organism
**Path**: `src/components/organisms/Searchbar/Searchbar.tsx`

#### Descripción

Barra de búsqueda modular formada por Product Key + Inputs + Botón.

#### ⚠️ REGLA CRÍTICA: ALTURA FIJA 40px

**TODOS los componentes del Searchbar DEBEN tener exactamente 40px de altura.**

#### Estructura

```
[Product Key]                    [Input] [Input] [Input] [Botón Buscar]
```

#### Componentes

1. **Product Key** (obligatorio) - Izquierda
2. **Input Dropdown** (opcional) - Filtros
3. **Input Text** (opcional) - Búsqueda
4. **Botón Buscar** (obligatorio) - Derecha

#### Especificaciones del Contenedor

**Layout:**
- Display: `flex`
- Gap: `20px`
- Align-items: `center`
- Justify-content: `space-between`
- Width: `100%`
- Height: `40px` **FIJA**
- Background: `transparent`

#### Product Key (Obligatorio)

**Siglas:**
- Font size: `24px`
- Font weight: `700` (Bold)
- Color: `#DA291C` **OBLIGATORIO**
- Line height: `1.2`

**Versión:**
- Font size: `12px`
- Font weight: `400` (Regular)
- Color: `#6A6A6A`
- Line height: `1.2`

#### Input Dropdown (Searchbar)

**Dimensiones:**
- Height: `40px` **FIJA**
- Width: Variable (ej: `192px`)
- Background: `#FFFFFF`
- Border: `1px solid #D0D0D0`
- Border radius: `10px` (flotante)
- Shadow: `0px 2px 8px 0px rgba(0,0,0,0.1)`
- Padding: `8px 12px`
- Gap: `10px` (entre texto e icono)

#### Input Text (Searchbar)

**Dimensiones:**
- Height: `40px` **FIJA**
- Width: Variable (ej: `297px`)
- Estilos: iguales al Input Dropdown

#### Botón Buscar

**Dimensiones:**
- Height: `40px` **FIJA**
- Width: `192px`
- Background: `#006081`
- Border radius: `10px`
- Shadow: `0px 2px 8px 0px rgba(0,0,0,0.1)`
- Padding: `7.5px 20px`
- Gap: `10px` (icono-texto)

**Tipografía:**
- Font size: `16px`
- Font weight: `600` (Semibold)
- Color: `#FFFFFF`

**Icono:**
- Size: `24px`
- Color: `#FFFFFF`

**Hover:**
- Background: `#004F6B`

#### Orden de Campos

**REGLA**: Del más general al más particular.

```tsx
<ProductKey /> → <FilterGeneral /> → <FilterEspecífico /> → <BúsquedaTexto /> → <Botón />
```

#### Props TypeScript

```typescript
interface SearchbarProps {
  productName: string;
  version: string;
  filters?: Array<{
    type: 'dropdown' | 'text';
    placeholder: string;
    options?: Array<{ value: string; label: string }>;
    value?: string;
    onChange?: (value: string) => void;
  }>;
  onSearch: () => void;
}
```

---

### Table

**Categoría**: Organism
**Path**: `src/components/organisms/Table/Table.tsx`

#### Descripción

Tablas de datos con 3 formatos según cantidad de columnas.

#### Formatos

1. **Border 100%** (8+ columnas) - Bordes completos
2. **Border 50%** (4-7 columnas) - Solo borde inferior
3. **Border 0%** (2-3 columnas) - Sin bordes, filas alternadas

#### Especificaciones Comunes

**Altura de fila:**
- Estándar: `40px`
- Compacta: `30px`

**Tipografía:**
- Header: `14px Semibold #222222`
- Row: `12px Regular #222222`

**Checkbox:**
- Size: `14x14px`
- Border: `1.5px`
- Radius: `2px`

**Iconos de acción:**
- Size: `16px`

**Icono accordion:**
- Size: `20px`

#### Border 100% (8+ columnas)

**Estilos:**
- Border completo: `1px solid #D0D0D0`
- Border radius (tabla): `5px`
- Alta densidad visual

#### Border 50% (4-7 columnas)

**Estilos:**
- Border inferior únicamente: `1px solid #D0D0D0`
- Sin borde externo
- Densidad media

#### Border 0% (2-3 columnas)

**Estilos:**
- Sin bordes
- Filas alternadas: `#EBEBEB` (Gris 4) y `#FFFFFF`
- Border radius por fila: `5px`
- **Fila seleccionada**: Border-left `6px solid #006081`

#### Estados de Filas

| Estado    | Background | Border/Outline              |
| --------- | ---------- | --------------------------- |
| Default   | `#FFFFFF`  | Según formato               |
| Hover     | `#F5F5F5`  | -                           |
| Focus     | -          | Outline `2px #006081`       |
| Selected  | `#D4F7FF`  | -                           |
| Alt (0%)  | `#EBEBEB`  | -                           |

---

### Modal

**Categoría**: Organism
**Path**: `src/components/organisms/Modal/Modal.tsx`

#### Descripción

Ventanas modales para mostrar contenido superpuesto.

#### Tipos

1. **Modal Base** - Genérico
2. **Modal Informativo** - Solo botón "Cerrar"
3. **Modal de Confirmación** - [Cancelar] [Confirmar]
4. **Modal Destructivo** - [Cancelar] [Eliminar]
5. **Modal de Formulario** - Captura de datos
6. **Modal Lateral** (Drawer) - Ancho 50%, derecha

#### Especificaciones del Modal

**Dimensiones:**
- Max-width: Variable según contenido
- Border radius: `10px`
- Shadow: `0px 2px 8px 0px rgba(0,0,0,0.20)`
- Background: `#FFFFFF`
- Padding: `0 0 20px 0`

**Overlay:**
- Background: `rgba(0,0,0,0.5)` (50% opacidad)

#### Header (Obligatorio)

**Estilos:**
- Border-bottom: `2px solid #006081` **OBLIGATORIO**
- Padding: `20px` (horizontal) `10px` (vertical)
- Display: `flex`
- Justify-content: `space-between`
- Align-items: `center`

**Título:**
- h1: `18px Semibold #222222`

**Icono cerrar:**
- Size: `16px`
- Color: `#222222`

#### Body

**Estilos:**
- Padding: `20px`

#### Footer (Botones)

**Estilos:**
- Padding: `0 20px 20px 20px`
- Display: `flex`
- Gap: `20px`
- Justify-content: `flex-end`

#### Modal Lateral (Drawer)

**Dimensiones:**
- Width: `50%` (max `960px`)
- Height: `100vh`
- Position: `fixed`
- Right: `0`
- Top: `0`

**Overlay:**
- Background: `rgba(0,0,0,0.25)` (25% opacidad)

---

### Form

**Categoría**: Organism
**Path**: `src/components/organisms/Form/Form.tsx`

#### Descripción

Formularios completos con validación y estructura estandarizada.

#### Layouts

1. **1 Columna** - Formularios simples
2. **2 Columnas** - Formularios complejos

#### Especificaciones

**Gap entre campos:**
- Vertical: `20px`
- Horizontal (2 col): `20px`

**Botones (footer):**
- Posición: `flex-end` (derecha)
- Gap: `20px`
- Orden: [Cancelar/Secundario] [Guardar/Primario]

---

### Pagination

**Categoría**: Organism
**Path**: `src/components/organisms/Pagination/Pagination.tsx`

#### Descripción

Componente de paginación para tablas y listas.

#### Especificaciones

**Botones:**
- Height: `40px`
- Width: `40px` (números, prev, next)
- Border radius: `5px`
- Gap: `10px`

**Estados:**
- Default: `#FFFFFF` bg, `#222222` text, `1px solid #D0D0D0`
- Active: `#006081` bg, `#FFFFFF` text, no border
- Hover: `#D4F7FF` bg
- Disabled: `#F5F5F5` bg, `#D0D0D0` text

**Tipografía:**
- Font size: `14px`
- Font weight: `600` (Semibold)

---

**Versión**: Robot Resources v1.0.1
**Última actualización**: 29 de octubre, 2025
