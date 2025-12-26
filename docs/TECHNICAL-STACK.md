# Technical Stack - SENTINEL v2.0.0

**Stack tecnológico y configuraciones del proyecto**

---

## 📋 Tabla de Contenidos

1. [Stack Tecnológico](#stack-tecnológico)
2. [Dependencias](#dependencias)
3. [Configuración TypeScript](#configuración-typescript)
4. [Configuración ESLint](#configuración-eslint)
5. [Configuración Prettier](#configuración-prettier)
6. [Configuración Jest](#configuración-jest)
7. [Configuración Cypress](#configuración-cypress)
8. [Scripts NPM](#scripts-npm)
9. [Reglas de Estilos](#reglas-de-estilos)

---

## Stack Tecnológico

### Framework y Librerías Core

| Tecnología      | Versión       | Propósito                        |
| --------------- | ------------- | -------------------------------- |
| **React**       | 19.0.0        | Framework UI                     |
| **Vite**        | 5.0.8         | Build tool y dev server          |
| **TypeScript**  | 5.2.2         | Type safety                      |
| **React Router**| 6.20.0+       | Navegación                       |
| **Zustand**     | 5.0.3+        | Estado global                    |
| **Lucide React**| latest        | Iconos                           |

### Estilos

**⚠️ IMPORTANTE: NO se usa Tailwind CSS**

| Tecnología             | Uso                                      |
| ---------------------- | ---------------------------------------- |
| **CSS Puro**           | Estilos principales                      |
| **CSS Custom Properties** | Variables de diseño (Design Tokens)   |
| **CSS Modules**        | Estilos scoped (opcional)                |
| **Inline Styles**      | Estilos dinámicos cuando sea necesario   |

**Ubicación de variables CSS**: `/src/styles/globals.css`

---

## Dependencias

### package.json

```json
{
  "name": "sentinel-design-system",
  "version": "1.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "cypress open",
    "test:e2e:headless": "cypress run"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^6.20.0",
    "zustand": "^5.0.3",
    "lucide-react": "latest"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "@vitejs/plugin-react": "^4.2.1",
    "eslint": "^8.55.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "eslint-plugin-jsx-a11y": "^6.8.0",
    "eslint-config-prettier": "^9.1.0",
    "prettier": "^3.1.1",
    "typescript": "^5.2.2",
    "vite": "^5.0.8",
    "@testing-library/react": "^14.1.2",
    "@testing-library/jest-dom": "^6.1.5",
    "@testing-library/user-event": "^14.5.1",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "ts-jest": "^29.1.1",
    "cypress": "^13.6.2"
  }
}
```

---

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

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting - STRICT MODE */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Path aliases */
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
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### tsconfig.node.json

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

---

## Configuración ESLint

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
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
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
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',  // TypeScript handles this
    'jsx-a11y/anchor-is-valid': 'warn',
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
```

### .eslintignore

```
dist
node_modules
*.config.js
*.config.ts
```

---

## Configuración Prettier

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
  "endOfLine": "lf",
  "bracketSpacing": true,
  "jsxBracketSameLine": false
}
```

### .prettierignore

```
dist
node_modules
build
coverage
```

---

## Configuración Jest

### jest.config.ts

```typescript
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@atoms/(.*)$": "<rootDir>/src/components/atoms/$1",
    "^@molecules/(.*)$": "<rootDir>/src/components/molecules/$1",
    "^@organisms/(.*)$": "<rootDir>/src/components/organisms/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@store/(.*)$": "<rootDir>/src/store/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js"
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/main.tsx",
    "!src/vite-env.d.ts"
  ],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60
    }
  }
};
```

### jest.setup.ts

```typescript
import '@testing-library/jest-dom';
```

### __mocks__/fileMock.js

```javascript
module.exports = "test-file-stub";
```

---

## Configuración Cypress

### cypress.config.ts

```typescript
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts"
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
  viewportWidth: 1366,
  viewportHeight: 768,
  video: false,
  screenshotOnRunFailure: true
});
```

### cypress/support/e2e.ts

```typescript
// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
```

### cypress/support/commands.ts

```typescript
/// <reference types="cypress" />

// Custom commands here
// Example:
// Cypress.Commands.add('login', (email, password) => { ... })

export {};
```

---

## Scripts NPM

### Comandos Disponibles

```bash
# Desarrollo
npm run dev              # Inicia servidor de desarrollo (localhost:5173)

# Build
npm run build            # Compila TypeScript + Build de producción
npm run preview          # Preview del build de producción

# Linting
npm run lint             # Ejecuta ESLint (max 0 warnings)

# Testing
npm run test             # Ejecuta tests con Jest
npm run test:watch       # Ejecuta tests en modo watch
npm run test:coverage    # Genera reporte de coverage

# E2E Testing
npm run test:e2e         # Abre Cypress UI
npm run test:e2e:headless # Ejecuta Cypress en modo headless
```

---

## Reglas de Estilos

### ⚠️ REGLA FUNDAMENTAL: CSS Puro Exclusivamente

**NO se usa Tailwind CSS en este proyecto.**

### Métodos de Estilizado Permitidos

#### 1. Etiquetas HTML (Recomendado)

```tsx
<h1>Título principal</h1>  {/* Automáticamente 18px Semibold */}
<p>Texto normal</p>        {/* Automáticamente 14px Regular */}
<label>Campo</label>       {/* Automáticamente 12px Regular */}
```

#### 2. Variables CSS

```tsx
<div style={{
  backgroundColor: 'var(--primary)',
  color: 'var(--secondary)',
  padding: 'var(--spacing-lg)',
  borderRadius: 'var(--radius)'
}}>
  Contenido
</div>
```

#### 3. Estilos Inline (cuando sea necesario)

```tsx
<div style={{
  backgroundColor: '#5ba3a5',
  color: '#FFFFFF',
  padding: '20px',
  borderRadius: '10px'
}}>
  Contenido
</div>
```

#### 4. CSS Modules (componentes específicos)

```css
/* Button.module.css */
.button {
  background-color: var(--primary);
  color: var(--secondary);
  padding: 7.5px 20px;
  border-radius: var(--radius);
}
```

```tsx
import styles from './Button.module.css';

<button className={styles.button}>Guardar</button>
```

### ❌ NO Permitido

```tsx
{/* ❌ NO USAR Tailwind */}
<div className="bg-primary text-white p-4 rounded-lg">
  Contenido
</div>

{/* ❌ NO USAR clases de utilidades */}
<h1 className="text-lg font-semibold">Título</h1>
```

### Variables CSS Requeridas

**Todas las variables deben estar definidas en `/src/styles/globals.css`**

Ver documento [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md) para la lista completa de variables CSS.

---

## Vite Configuration

### vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@atoms': path.resolve(__dirname, './src/components/atoms'),
      '@molecules': path.resolve(__dirname, './src/components/molecules'),
      '@organisms': path.resolve(__dirname, './src/components/organisms'),
      '@templates': path.resolve(__dirname, './src/components/templates'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@services': path.resolve(__dirname, './src/services'),
      '@store': path.resolve(__dirname, './src/store'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  server: {
    port: 5173,
    open: true
  }
})
```

---

**Versión**: SENTINEL v2.0.0
**Última actualización**: 29 de octubre, 2025
