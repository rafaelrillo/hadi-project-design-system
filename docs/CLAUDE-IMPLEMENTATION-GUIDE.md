# Claude Implementation Guide - SENTINEL v2.0.0

**Guía completa para que Claude genere código que cumple 100% con el Design System**

---

## 📋 Tabla de Contenidos

1. [Cómo Leer Este Proyecto](#cómo-leer-este-proyecto)
2. [Reglas NO Negociables](#reglas-no-negociables)
3. [Proceso de Generación](#proceso-de-generación)
4. [Templates de Código](#templates-de-código)
5. [Prompt Templates](#prompt-templates)
6. [Common Patterns](#common-patterns)
7. [Anti-Patterns](#anti-patterns)
8. [Flujo de Trabajo](#flujo-de-trabajo)

---

## Cómo Leer Este Proyecto

### Documentos a Consultar

Cuando generes código para este proyecto, **SIEMPRE** consulta estos documentos EN ORDEN:

1. **DESIGN-SYSTEM.md** → Colores, tipografía, espaciado, sombras
2. **COMPONENTS-LIBRARY.md** → Especificaciones de cada componente
3. **LAYOUTS-TEMPLATES.md** → Layouts y templates disponibles
4. **TECHNICAL-STACK.md** → Stack técnico y configuraciones
5. **ARCHITECTURE.md** → Estructura de carpetas y patrones
6. **VALIDATION-CHECKLIST.md** → Validación final

### Jerarquía de Documentos

```
DESIGN-SYSTEM.md          ← Base fundamental
    ↓
COMPONENTS-LIBRARY.md     ← Componentes específicos
    ↓
LAYOUTS-TEMPLATES.md      ← Estructuras de página
    ↓
TECHNICAL-STACK.md        ← Implementación técnica
    ↓
ARCHITECTURE.md           ← Organización de código
    ↓
VALIDATION-CHECKLIST.md   ← Verificación final
```

---

## Reglas NO Negociables

### 🔴 CRÍTICAS (Si no se cumplen, el código es inválido)

#### 1. Path Injection

**PRIMERA LÍNEA de CADA archivo DEBE ser:**

```tsx
// Path: src/ruta/completa/NombreArchivo.ext
```

**Ejemplos:**
```tsx
// Path: src/components/atoms/Button/Button.tsx
// Path: src/components/organisms/Sidebar/Sidebar.tsx
// Path: src/pages/Dashboard.tsx
// Path: src/utils/formatters.ts
```

#### 2. Searchbar Altura FIJA 40px

**NUNCA cambiar la altura del Searchbar ni de sus componentes.**

```tsx
// ✅ CORRECTO
<div style={{ height: '40px' }}>  {/* FIJA */}

// ❌ INCORRECTO
<div style={{ height: 'auto' }}>
<div style={{ minHeight: '40px' }}>
<div style={{ height: '50px' }}>
```

#### 3. Accent Primary (#5ba3a5)

**USO EXCLUSIVO PARA:**
- Product Key (siglas de 3 letras)
- Logo SENTINEL en Sidebar
- Icono de Usuario en Sidebar

**NUNCA para:**
- Botones de acción
- Estados de error
- Elementos interactivos generales

```tsx
// ✅ CORRECTO - Product Key
<span style={{ color: '#5ba3a5', fontSize: '24px', fontWeight: 700 }}>
  SENTINEL Analytics
</span>

// ❌ INCORRECTO - Botón de acción
<button style={{ backgroundColor: '#5ba3a5' }}>
  Eliminar
</button>
```

#### 4. NO Usar Tailwind CSS

**PROHIBIDO usar clases de Tailwind:**

```tsx
// ❌ INCORRECTO
<div className="bg-primary text-white p-4 rounded-lg">
<h1 className="text-lg font-semibold">

// ✅ CORRECTO
<div style={{ backgroundColor: 'var(--primary)', color: '#FFFFFF', padding: '20px', borderRadius: '10px' }}>
<h1>Título</h1>  {/* Usa estilos de globals.css */}
```

#### 5. Tipografía - Usar Etiquetas HTML

```tsx
// ✅ CORRECTO - Etiquetas HTML heredan estilos
<h1>Título Principal</h1>  {/* 18px Semibold automático */}
<h2>Subtítulo</h2>         {/* 16px Semibold automático */}
<p>Texto normal</p>        {/* 14px Regular automático */}
<label>Campo</label>       {/* 12px Regular automático */}

// ❌ INCORRECTO - Estilos manuales innecesarios
<span style={{ fontSize: '18px', fontWeight: 600 }}>Título</span>
```

#### 6. Atomic Design - Clasificación Correcta

**Atoms**: Button, Input, Icon, Badge, Tooltip
**Molecules**: Card, FormField, SidebarItem, NotificationCard
**Organisms**: Sidebar, Searchbar, Table, Modal, Form
**Templates/Layouts**: MainLayout, DashboardTemplate, FormTemplate
**Pages**: Home, Dashboard, UsersList

```tsx
// ✅ CORRECTO
// Path: src/components/atoms/Button/Button.tsx

// ❌ INCORRECTO
// Path: src/components/Button.tsx
// Path: src/Button.tsx
```

---

### 🟡 IMPORTANTES (Afectan calidad pero no invalidan)

1. **Line height**: Siempre `1.2` (120%)
2. **Gap entre elementos**: `20px`
3. **Padding de contenedores**: `20px`
4. **Border radius contenidos**: `5px`
5. **Border radius flotantes**: `10px`
6. **Sombras flotantes**: `0px 2px 8px 0px rgba(0,0,0,0.1)`
7. **Sombras contenedores**: `0px 2px 8px 0px rgba(0,0,0,0.2)`

---

## Proceso de Generación

### Paso 1: Entender el Requerimiento

**Preguntas a responder:**
- ¿Qué tipo de pantalla necesito? (Dashboard, Form, Table, Detail)
- ¿Qué datos debo mostrar/capturar?
- ¿Qué acciones están disponibles?
- ¿Necesita Searchbar? ¿Con qué campos?

### Paso 2: Identificar Template

**Opciones:**
- **Dashboard** → Cards de métricas + contenido
- **Form** → Formulario de creación/edición
- **Table** → Lista con búsqueda y acciones
- **Detail** → Visualización de un item

### Paso 3: Seleccionar Componentes

**Consultar COMPONENTS-LIBRARY.md y verificar:**
- ¿Qué componentes necesito?
- ¿Qué props tienen?
- ¿Qué variantes existen?
- ¿Qué medidas EXACTAS deben tener?

### Paso 4: Componer la Pantalla

**Orden:**
1. MainLayout
2. Searchbar (si aplica)
3. Contenedor principal
4. Componentes internos

### Paso 5: Validar contra Checklist

**Ver VALIDATION-CHECKLIST.md y verificar:**
- ☑ Path injection
- ☑ Colores correctos
- ☑ Tipografía correcta
- ☑ Dimensiones exactas
- ☑ Estados de hover/focus/active
- ☑ Accesibilidad (ARIA)

---

## Templates de Código

### Template: Button Component

```tsx
// Path: src/components/atoms/Button/Button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'destructive';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

export function Button({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
  type = 'button',
  ariaLabel
}: ButtonProps) {
  const getStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      height: '40px',
      padding: '7.5px 20px',
      borderRadius: '5px',
      border: variant === 'secondary' ? '1px solid #5ba3a5' : 'none',
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
        color: disabled ? '#D0D0D0' : '#5ba3a5'
      },
      destructive: {
        backgroundColor: disabled ? '#D0D0D0' : '#B50000',
        color: disabled ? '#6A6A6A' : '#FFFFFF'
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
      {children}
    </button>
  );
}
```

### Template: Page with Table

```tsx
// Path: src/pages/UsersList.tsx
import React from 'react';
import { MainLayout } from '@layouts/MainLayout';
import { Searchbar } from '@organisms/Searchbar/Searchbar';
import { Table } from '@organisms/Table/Table';
import { Button } from '@atoms/Button/Button';
import { Plus } from 'lucide-react';

export function UsersList() {
  return (
    <MainLayout
      searchbar={
        <Searchbar
          productName="SENTINEL"
          version="v.1.0.0"
          filters={[
            {
              type: 'dropdown',
              placeholder: 'Todos los estados',
              options: [
                { value: 'active', label: 'Activo' },
                { value: 'inactive', label: 'Inactivo' }
              ]
            },
            {
              type: 'text',
              placeholder: 'Buscar por nombre o email'
            }
          ]}
          onSearch={() => console.log('Searching...')}
        />
      }
      sidebarMenuItems={[
        { icon: 'Home', label: 'Dashboard', href: '/', active: false },
        { icon: 'Users', label: 'Usuarios', href: '/users', active: true }
      ]}
      productName="SENTINEL"
      version="v.1.0.0"
    >
      {/* Container principal */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        padding: '0 20px 20px 20px',
        boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.2)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 0',
          borderBottom: '2px solid #5ba3a5'
        }}>
          <h1>Usuarios</h1>
          <Button variant="primary" icon={<Plus size={24} />}>
            Nuevo Usuario
          </Button>
        </div>

        {/* Table */}
        <div style={{ marginTop: '20px' }}>
          <Table
            columns={[
              { key: 'name', label: 'Nombre' },
              { key: 'email', label: 'Email' },
              { key: 'status', label: 'Estado' },
              { key: 'actions', label: 'Acciones' }
            ]}
            data={[
              { id: 1, name: 'Juan Pérez', email: 'juan@example.com', status: 'Activo' },
              { id: 2, name: 'María García', email: 'maria@example.com', status: 'Inactivo' }
            ]}
          />
        </div>
      </div>
    </MainLayout>
  );
}
```

---

## Prompt Templates

### Template 1: Nueva Pantalla de Tabla

```
Crear pantalla de [NOMBRE] que muestre una tabla con [DATOS].

**Requerimientos:**
- Product Key: [XXX]
- Searchbar con campos:
  - [CAMPO1]: Dropdown con opciones [OPCION1, OPCION2, OPCION3]
  - [CAMPO2]: Input text con placeholder "[PLACEHOLDER]"
- Tabla con columnas: [COL1, COL2, COL3, ...]
- Acciones por fila: [EDITAR/ELIMINAR/VER]
- Botón "+ Nuevo [ITEM]" en header

**Especificaciones técnicas:**
- Altura Searchbar: 40px FIJA
- Formato tabla: [Border 100% / Border 50% / Border 0%] (según cantidad de columnas)
- Product Key en rojo institucional (#5ba3a5)
```

### Template 2: Nuevo Formulario

```
Crear pantalla de formulario para [CREAR/EDITAR] [ENTIDAD].

**Campos del formulario:**
1. [CAMPO1]: Input text, requerido
2. [CAMPO2]: Dropdown con opciones [OPCION1, OPCION2]
3. [CAMPO3]: Textarea, máximo 500 caracteres
4. [CAMPO4]: Input text

**Layout:** [1 columna / 2 columnas]

**Botones:**
- Cancelar (secondary)
- Guardar (primary)

**Validaciones:**
- [CAMPO1]: Requerido, mínimo 3 caracteres
- [CAMPO3]: Máximo 500 caracteres
```

### Template 3: Dashboard con Cards

```
Crear dashboard con las siguientes métricas:

**Cards (4 cards en fila):**
1. [METRICA1]: [VALOR] - Variante [success/warning/error/neutral]
2. [METRICA2]: [VALOR] - Variante [success/warning/error/neutral]
3. [METRICA3]: [VALOR] - Variante [success/warning/error/neutral]
4. [METRICA4]: [VALOR] - Variante [success/warning/error/neutral]

**Contenido adicional:**
- [Tabla de últimos X items / Gráfico / Lista]

**Searchbar:** Solo Product Key [XXX]
```

---

## Common Patterns

### Pattern 1: Container Principal

```tsx
<div style={{
  backgroundColor: '#FFFFFF',
  borderRadius: '10px',
  padding: '0 20px 20px 20px',  // No padding top por el h1
  boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.2)'
}}>
  {/* Header con border inferior azul */}
  <div style={{
    padding: '20px 0',
    borderBottom: '2px solid #5ba3a5'
  }}>
    <h1>Título de la Pantalla</h1>
  </div>

  {/* Contenido */}
  <div style={{ marginTop: '20px' }}>
    {/* ... */}
  </div>
</div>
```

### Pattern 2: Header con Título + Botón

```tsx
<div style={{
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 0',
  borderBottom: '2px solid #5ba3a5'
}}>
  <h1>Título</h1>
  <Button variant="primary">Acción</Button>
</div>
```

### Pattern 3: Grid de Cards (Dashboard)

```tsx
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '20px',
  marginBottom: '20px'
}}>
  <Card label="Métrica 1" value="100" variant="success" />
  <Card label="Métrica 2" value="50" variant="warning" />
  <Card label="Métrica 3" value="10" variant="error" />
  <Card label="Métrica 4" value="200" variant="neutral" />
</div>
```

### Pattern 4: Form con 2 Columnas

```tsx
<form style={{
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '20px',
  marginTop: '20px'
}}>
  <FormField label="Campo 1" required>
    <InputText placeholder="Ingrese valor" />
  </FormField>

  <FormField label="Campo 2">
    <InputDropdown options={options} placeholder="Seleccione" />
  </FormField>

  {/* Campo full width */}
  <div style={{ gridColumn: '1 / -1' }}>
    <FormField label="Descripción">
      <Textarea placeholder="Ingrese descripción" maxLength={500} />
    </FormField>
  </div>

  {/* Botones */}
  <div style={{
    gridColumn: '1 / -1',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '20px',
    paddingTop: '20px'
  }}>
    <Button variant="secondary">Cancelar</Button>
    <Button variant="primary" type="submit">Guardar</Button>
  </div>
</form>
```

---

## Anti-Patterns

### ❌ Anti-Pattern 1: Altura Variable en Searchbar

```tsx
// ❌ INCORRECTO
<div style={{ height: 'auto' }}>
<div style={{ minHeight: '40px' }}>

// ✅ CORRECTO
<div style={{ height: '40px' }}>
```

### ❌ Anti-Pattern 2: Usar Tailwind

```tsx
// ❌ INCORRECTO
<div className="bg-primary text-white p-4 rounded-lg">

// ✅ CORRECTO
<div style={{
  backgroundColor: 'var(--primary)',
  color: '#FFFFFF',
  padding: '20px',
  borderRadius: '10px'
}}>
```

### ❌ Anti-Pattern 3: Accent Primary en Botones

```tsx
// ❌ INCORRECTO
<button style={{ backgroundColor: '#5ba3a5' }}>Eliminar</button>

// ✅ CORRECTO
<button style={{ backgroundColor: '#B50000' }}>Eliminar</button>
```

### ❌ Anti-Pattern 4: Estilos Tipográficos Manuales

```tsx
// ❌ INCORRECTO
<span style={{ fontSize: '18px', fontWeight: 600 }}>Título</span>

// ✅ CORRECTO
<h1>Título</h1>
```

### ❌ Anti-Pattern 5: Sin Path Injection

```tsx
// ❌ INCORRECTO
export function Button() {
  return <button>Click</button>;
}

// ✅ CORRECTO
// Path: src/components/atoms/Button/Button.tsx

export function Button() {
  return <button>Click</button>;
}
```

---

## Flujo de Trabajo

### Flujo Completo para Generar una Pantalla

```
1. Usuario solicita pantalla
   ↓
2. Claude identifica template necesario
   ↓
3. Claude consulta COMPONENTS-LIBRARY.md para componentes
   ↓
4. Claude consulta DESIGN-SYSTEM.md para especificaciones
   ↓
5. Claude genera código con Path injection
   ↓
6. Claude valida contra VALIDATION-CHECKLIST.md
   ↓
7. Claude presenta código al usuario
   ↓
8. Usuario revisa y solicita ajustes (si necesita)
   ↓
9. Claude ajusta manteniendo 100% adherencia al DS
   ↓
10. Código listo para usar
```

### Checklist Rápido (Pre-Entrega)

Antes de entregar código, verificar:

- [ ] Path injection en primera línea
- [ ] Searchbar altura 40px (si aplica)
- [ ] Rojo institucional SOLO en Product Key / Usuario / Isotipo
- [ ] NO usar Tailwind CSS
- [ ] Usar etiquetas HTML para tipografía
- [ ] Border radius correcto (5px contenidos, 10px flotantes)
- [ ] Gap 20px entre elementos
- [ ] Sombras correctas (10% flotantes, 20% contenedores)
- [ ] ARIA labels en elementos interactivos
- [ ] Props TypeScript correctamente tipadas

---

**Versión**: SENTINEL v2.0.0
**Última actualización**: 29 de octubre, 2025
