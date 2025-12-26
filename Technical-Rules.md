# Design System SENTINEL v2.0.0 - Especificaciones de Desarrollo

## Stack Tecnológico

### Framework y Librerías Core

- **React 19** con **Vite**
- **TypeScript** (strict mode)
- **React Router v6+**
- **Zustand** para estado global
- **CSS Puro** con variables CSS (CSS Custom Properties)
- **SCSS Modules** (opcional, para componentes específicos)
- **lucide-react** para iconos

### Estilos

**⚠️ IMPORTANTE: NO se usa Tailwind CSS**

- **Estilos**: CSS puro exclusivamente
- **Variables CSS**: Definidas en `/styles/globals.css`
- **Metodología**: CSS Modules + estilos inline cuando sea necesario
- **Tokens**: Todas las variables de diseño en CSS Custom Properties

## Estructura de Carpetas

```
src/
├── assets/          # Imágenes, íconos, fuentes
├── components/      # Componentes reutilizables (Atomic Design)
│   ├── atoms/       # Botones, inputs, iconos
│   ├── molecules/   # Cards, dropdowns
│   ├── organisms/   # Tablas, formularios
│   └── templates/   # Plantillas de páginas
├── features/        # Módulos/funcionalidades independientes
├── hooks/           # Custom hooks compartidos
├── layouts/         # MainLayout, AuthLayout, etc.
├── pages/           # Vistas completas
├── services/        # Lógica de negocio, API calls
├── store/           # Zustand stores
├── styles/          # Estilos globales
│   └── globals.css  # Variables CSS y tokens
├── utils/           # Funciones utilitarias
└── test/            # Pruebas unitarias y e2e
```

## Configuración TypeScript

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## Configuración ESLint + Prettier

### .eslintrc.cjs

```javascript
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'jsx-a11y'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],
    'react/react-in-jsx-scope': 'off'
  },
}
```

### .prettierrc

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

## Scripts (package.json)

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "cypress open"
  }
}
```

## Testing

### Jest + React Testing Library (Unit/Integration)

**Ámbito**: Atoms, Molecules, Hooks, Utils.

```typescript
// jest.config.ts
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  }
};
```

### Cypress (E2E)

**Ámbito**: Flujos críticos, navegación, integración completa.

```javascript
// cypress.config.ts
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
```

## Estilos y CSS

### ⚠️ REGLA FUNDAMENTAL: CSS Puro Exclusivamente

**NO se usa Tailwind CSS en este proyecto.**

Todos los estilos se manejan con:

1. **CSS Puro** (recomendado)
2. **Variables CSS** (CSS Custom Properties)
3. **Estilos inline** (cuando sea estrictamente necesario)
4. **CSS Modules** (para componentes específicos)

### Variables CSS del Design System

Todas las variables de diseño están definidas en `/styles/globals.css`.


