# Architecture - Robot Resources v1.0.1

**Arquitectura del proyecto y estructura de carpetas**

---

## 📋 Tabla de Contenidos

1. [Metodología: Atomic Design](#metodología-atomic-design)
2. [Estructura de Carpetas](#estructura-de-carpetas)
3. [Path Injection (CRÍTICO)](#path-injection-crítico)
4. [Naming Conventions](#naming-conventions)
5. [Import/Export Patterns](#importexport-patterns)
6. [Feature Modules](#feature-modules)
7. [Clasificación de Componentes](#clasificación-de-componentes)

---

## Metodología: Atomic Design

El proyecto sigue **Atomic Design methodology** para organizar componentes de UI.

### Niveles de Atomic Design

```
Atoms → Molecules → Organisms → Templates → Pages
```

#### **Atoms** (Átomos)

**Definición**: Componentes indivisibles más pequeños del sistema.

**Características**:
- No contienen otros componentes (excepto HTML nativo)
- Altamente reutilizables
- No tienen lógica de negocio compleja
- Completamente independientes

**Ejemplos**:
- Button
- Input (Text, Dropdown)
- Icon
- Badge
- Tooltip
- Typography components (h1-h4, p, label)

#### **Molecules** (Moléculas)

**Definición**: Grupos de átomos que funcionan juntos como una unidad.

**Características**:
- Combinan 2-5 átomos
- Tienen un propósito específico
- Moderadamente reutilizables
- Pueden tener lógica básica

**Ejemplos**:
- Card (Badge + Typography)
- FormField (Label + Input + Error message)
- SidebarItem (Icon + Label)
- SearchbarItem (Input + Icon)
- NotificationCard (Icon + Typography)

#### **Organisms** (Organismos)

**Definición**: Secciones complejas de la UI formadas por átomos, moléculas y/u otros organismos.

**Características**:
- Componentes complejos y completos
- Combinan múltiples moléculas y átomos
- Tienen lógica de negocio
- Menos reutilizables (más específicos)

**Ejemplos**:
- Sidebar (completo con navegación)
- Searchbar (completa con múltiples inputs)
- Table (con headers, rows, pagination)
- Modal (con header, body, footer)
- Form (completo con validación)

#### **Templates** (Plantillas)

**Definición**: Estructuras de página que definen el layout.

**Características**:
- Definen estructura de página
- No tienen contenido real (placeholders)
- Composición de organismos

**Ejemplos**:
- MainLayout (Sidebar + Content area)
- DashboardTemplate
- FormTemplate
- TableTemplate

#### **Pages** (Páginas)

**Definición**: Instancias específicas de templates con contenido real.

**Características**:
- Usan templates
- Contienen datos reales
- Conectan con stores y servicios
- Rutas de la aplicación

**Ejemplos**:
- Home
- UsersList
- CreateUser
- Dashboard

---

## Estructura de Carpetas

```
claro-helios-project/
├── public/                  # Assets estáticos
├── src/
│   ├── assets/             # Imágenes, íconos, fuentes
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── components/         # Componentes reutilizables (Atomic Design)
│   │   ├── atoms/
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   └── Button.module.css (opcional)
│   │   │   ├── Input/
│   │   │   ├── Icon/
│   │   │   ├── Badge/
│   │   │   └── Tooltip/
│   │   │
│   │   ├── molecules/
│   │   │   ├── Card/
│   │   │   ├── FormField/
│   │   │   ├── SidebarItem/
│   │   │   └── NotificationCard/
│   │   │
│   │   ├── organisms/
│   │   │   ├── Sidebar/
│   │   │   ├── Searchbar/
│   │   │   ├── Table/
│   │   │   ├── Modal/
│   │   │   └── Form/
│   │   │
│   │   └── templates/
│   │       ├── DashboardTemplate/
│   │       ├── FormTemplate/
│   │       └── TableTemplate/
│   │
│   ├── features/           # Módulos de funcionalidad independiente
│   │   └── [feature-name]/
│   │       ├── components/  # Componentes específicos del feature
│   │       ├── hooks/       # Hooks específicos del feature
│   │       ├── services/    # Servicios específicos del feature
│   │       └── store/       # Store específico del feature
│   │
│   ├── hooks/              # Custom hooks compartidos
│   │   ├── useAuth.ts
│   │   ├── useForm.ts
│   │   └── useDebounce.ts
│   │
│   ├── layouts/            # Layouts de aplicación
│   │   ├── MainLayout.tsx
│   │   └── AuthLayout.tsx
│   │
│   ├── pages/              # Vistas completas (rutas)
│   │   ├── Home.tsx
│   │   ├── Dashboard.tsx
│   │   └── NotFound.tsx
│   │
│   ├── services/           # Lógica de negocio, API calls
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   └── userService.ts
│   │
│   ├── store/              # Zustand global stores
│   │   ├── authStore.ts
│   │   ├── notificationStore.ts
│   │   └── index.ts
│   │
│   ├── styles/             # Estilos globales
│   │   ├── globals.css      # Variables CSS y tokens
│   │   └── reset.css
│   │
│   ├── utils/              # Funciones utilitarias
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   └── constants.ts
│   │
│   ├── test/               # Configuración de tests
│   │   └── setup.ts
│   │
│   ├── App.tsx             # Componente raíz
│   ├── main.tsx            # Entry point
│   └── vite-env.d.ts       # Types de Vite
│
├── cypress/                # Tests E2E
│   ├── e2e/
│   └── support/
│
├── docs/                   # Documentación del proyecto
│   ├── DESIGN-SYSTEM.md
│   ├── COMPONENTS-LIBRARY.md
│   ├── LAYOUTS-TEMPLATES.md
│   ├── TECHNICAL-STACK.md
│   ├── ARCHITECTURE.md
│   ├── CLAUDE-IMPLEMENTATION-GUIDE.md
│   └── VALIDATION-CHECKLIST.md
│
├── .eslintrc.cjs
├── .prettierrc
├── tsconfig.json
├── vite.config.ts
├── package.json
└── README.md
```

---

## Path Injection (CRÍTICO)

### ⚠️ REGLA OBLIGATORIA

**Debido a restricciones del sistema de archivos durante la generación de código, LA PRIMERA LÍNEA DE CADA ARCHIVO DE CÓDIGO (TSX, TS, CSS) DEBE SER UN COMENTARIO CON LA RUTA DE DESTINO.**

### Formato del Comentario

```typescript
// Path: src/ruta/completa/NombreArchivo.ext
```

### Ejemplos

#### Atom

```tsx
// Path: src/components/atoms/Button/Button.tsx

export function Button({ children, onClick }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}
```

#### Molecule

```tsx
// Path: src/components/molecules/Card/Card.tsx

export function Card({ label, value, variant }: CardProps) {
  return (
    <div className="card">
      <p>{label}</p>
      <h3>{value}</h3>
    </div>
  );
}
```

#### Organism

```tsx
// Path: src/components/organisms/Sidebar/Sidebar.tsx

export function Sidebar({ menuItems }: SidebarProps) {
  return (
    <aside className="sidebar">
      {menuItems.map(item => <SidebarItem key={item.id} {...item} />)}
    </aside>
  );
}
```

#### Layout

```tsx
// Path: src/layouts/MainLayout.tsx

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="main-layout">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
```

#### Page

```tsx
// Path: src/pages/Dashboard.tsx

export function Dashboard() {
  return (
    <MainLayout>
      <h1>Dashboard</h1>
    </MainLayout>
  );
}
```

#### Styles

```css
/* Path: src/styles/globals.css */

:root {
  --primary: rgba(0, 96, 129, 1);
  --secondary: rgba(255, 255, 255, 1);
}
```

#### Utility

```typescript
// Path: src/utils/formatters.ts

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS'
  }).format(value);
}
```

### 🚫 PROHIBIDO

```tsx
// ❌ NO HACER - Sin Path injection
export function Button() {
  return <button>Click</button>;
}

// ❌ NO HACER - Ruta plana
// Path: src/components/Button.tsx

// ❌ NO HACER - Ignorar Atomic Design
// Path: src/Button.tsx
```

---

## Naming Conventions

### Archivos y Carpetas

#### Componentes (TSX)

- **PascalCase** para nombres de archivo
- **PascalCase** para nombres de carpeta
- Coincidencia entre carpeta y archivo

```
Button/
  Button.tsx           ✅ Correcto
  Button.test.tsx      ✅ Correcto
  Button.module.css    ✅ Correcto
```

#### Utilities, Services, Hooks (TS)

- **camelCase** para nombres de archivo
- **camelCase** para exports

```
utils/
  formatters.ts        ✅ Correcto
  validators.ts        ✅ Correcto

hooks/
  useAuth.ts           ✅ Correcto
  useForm.ts           ✅ Correcto

services/
  authService.ts       ✅ Correcto
  userService.ts       ✅ Correcto
```

#### Stores (Zustand)

- **camelCase** + sufijo `Store`

```
store/
  authStore.ts         ✅ Correcto
  notificationStore.ts ✅ Correcto
  userStore.ts         ✅ Correcto
```

### Exports

#### Named Exports (Preferido)

```tsx
// ✅ Correcto - Named export
export function Button({ children }: ButtonProps) {
  return <button>{children}</button>;
}

// Uso
import { Button } from '@atoms/Button/Button';
```

#### Default Exports (Evitar)

```tsx
// ⚠️ Evitar - Default export
export default function Button({ children }: ButtonProps) {
  return <button>{children}</button>;
}
```

### Variables CSS

- **kebab-case** con prefijo `--`
- Nombres descriptivos y semánticos

```css
/* ✅ Correcto */
--primary: #006081;
--text-titulo-1: 18px;
--spacing-lg: 20px;
--border-radius-card: 10px;

/* ❌ Incorrecto */
--Primary: #006081;
--textTitulo1: 18px;
--spacing_large: 20px;
```

---

## Import/Export Patterns

### Imports Ordenados

```tsx
// 1. React y librerías externas
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';

// 2. Componentes internos (por nivel)
import { Button } from '@atoms/Button/Button';
import { Card } from '@molecules/Card/Card';
import { Sidebar } from '@organisms/Sidebar/Sidebar';

// 3. Hooks, utils, services
import { useAuth } from '@hooks/useAuth';
import { formatDate } from '@utils/formatters';
import { authService } from '@services/authService';

// 4. Stores
import { useAuthStore } from '@store/authStore';

// 5. Types
import type { User } from '@/types';

// 6. Estilos
import styles from './Component.module.css';
```

### Barrel Exports (index.ts)

**Usar en carpetas con múltiples componentes:**

```typescript
// Path: src/components/atoms/index.ts
export { Button } from './Button/Button';
export { Input } from './Input/Input';
export { Icon } from './Icon/Icon';
export { Badge } from './Badge/Badge';
```

**Uso:**

```tsx
import { Button, Input, Badge } from '@atoms';
```

---

## Feature Modules

### Estructura de Feature

```
features/
└── users/
    ├── components/        # Componentes específicos del feature
    │   ├── UserCard.tsx
    │   └── UserForm.tsx
    ├── hooks/            # Hooks específicos del feature
    │   └── useUserForm.ts
    ├── services/         # Servicios específicos del feature
    │   └── userService.ts
    ├── store/            # Store específico del feature
    │   └── userStore.ts
    └── index.ts          # Barrel export
```

### Cuándo Usar Feature Modules

**SÍ usar cuando:**
- La funcionalidad es compleja y tiene múltiples componentes relacionados
- Los componentes NO son reutilizables en otras partes
- Hay lógica de negocio específica del feature

**NO usar cuando:**
- Componentes son genéricos y reutilizables → usar `components/`
- Es una página simple → usar `pages/`

---

## Clasificación de Componentes

### Guía de Decisión

#### ¿Es un Atom?

**SÍ** si:
- ✅ Es indivisible (no contiene otros componentes custom)
- ✅ Es altamente reutilizable
- ✅ No tiene lógica de negocio compleja
- ✅ Ejemplos: Button, Input, Icon, Badge

**NO** si:
- ❌ Contiene otros componentes custom
- ❌ Tiene lógica de negocio específica

#### ¿Es una Molecule?

**SÍ** si:
- ✅ Combina 2-5 átomos
- ✅ Tiene un propósito específico
- ✅ Es moderadamente reutilizable
- ✅ Ejemplos: Card, FormField, SearchbarItem

**NO** si:
- ❌ Es demasiado complejo (muchos sub-componentes)
- ❌ Tiene mucha lógica de negocio

#### ¿Es un Organism?

**SÍ** si:
- ✅ Es complejo (combina múltiples moléculas/átomos)
- ✅ Tiene lógica de negocio
- ✅ Es una sección completa de UI
- ✅ Ejemplos: Sidebar, Searchbar, Table, Modal, Form

**NO** si:
- ❌ Define estructura de página → es un Template

#### ¿Es un Template?

**SÍ** si:
- ✅ Define estructura/layout de página
- ✅ Usa placeholders (no contenido real)
- ✅ Es reutilizable para múltiples páginas
- ✅ Ejemplos: MainLayout, DashboardTemplate, FormTemplate

**NO** si:
- ❌ Tiene contenido específico → es una Page

#### ¿Es una Page?

**SÍ** si:
- ✅ Es una ruta de la aplicación
- ✅ Usa templates con contenido real
- ✅ Conecta con stores/services
- ✅ Ejemplos: Dashboard, UsersList, Home

---

## Path Aliases

### Configurados en tsconfig.json

```typescript
{
  "baseUrl": ".",
  "paths": {
    "@/*": ["./src/*"],
    "@components/*": ["./src/components/*"],
    "@atoms/*": ["./src/components/atoms/*"],
    "@molecules/*": ["./src/components/molecules/*"],
    "@organisms/*": ["./src/components/organisms/*"],
    "@templates/*": ["./src/components/templates/*"],
    "@hooks/*": ["./src/hooks/*"],
    "@layouts/*": ["./src/layouts/*"],
    "@pages/*": ["./src/pages/*"],
    "@services/*": ["./src/services/*"],
    "@store/*": ["./src/store/*"],
    "@utils/*": ["./src/utils/*"],
    "@styles/*": ["./src/styles/*"],
    "@assets/*": ["./src/assets/*"]
  }
}
```

### Uso de Path Aliases

```tsx
// ✅ Correcto - Usar aliases
import { Button } from '@atoms/Button/Button';
import { useAuth } from '@hooks/useAuth';
import { formatDate } from '@utils/formatters';

// ❌ Evitar - Imports relativos largos
import { Button } from '../../../components/atoms/Button/Button';
```

---

**Versión**: Robot Resources v1.0.1
**Última actualización**: 29 de octubre, 2025
