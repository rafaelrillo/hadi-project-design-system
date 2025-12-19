# Robot Resources Boilerplate v1.0.1

Base project for building microfrontends with the Robot Resources Design System.

## Description

This boilerplate provides a complete foundation for developing modern Single Page Applications (SPAs) using React 19, Vite, and TypeScript, following the Robot Resources v1.0.1 Design System specifications.

## Tech Stack

- **React**: 19.0.0
- **Vite**: 5.0.8
- **TypeScript**: 5.2.2
- **React Router DOM**: 6.20.0+
- **Zustand**: 5.0.3+ (State Management)
- **Lucide React**: Latest (Icons)

### Architecture

- **Design System**: Robot Resources v1.0.1
- **Architecture Pattern**: Atomic Design
- **Styling**: Pure CSS with CSS Custom Properties (NO Tailwind CSS)

## Quick Start

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will open automatically at `http://localhost:5173`

### Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

### Testing

Run unit tests with Jest:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Generate coverage report:

```bash
npm run test:coverage
```

Run E2E tests with Cypress:

```bash
npm run test:e2e
```

Run Cypress in headless mode:

```bash
npm run test:e2e:headless
```

## Project Structure

```
claro/
├── docs/                          # Complete documentation
│   ├── DESIGN-SYSTEM.md          # Design system specifications
│   ├── TECHNICAL-STACK.md        # Technical stack details
│   ├── ARCHITECTURE.md           # Architecture patterns
│   ├── COMPONENTS-LIBRARY.md     # Component library
│   └── LAYOUTS-TEMPLATES.md      # Layout templates
├── src/
│   ├── assets/                   # Static assets (images, icons, fonts)
│   ├── components/               # Atomic Design components
│   │   ├── atoms/               # Basic building blocks
│   │   ├── molecules/           # Simple component combinations
│   │   ├── organisms/           # Complex component combinations
│   │   └── templates/           # Page templates
│   ├── features/                # Feature modules
│   ├── hooks/                   # Custom React hooks
│   ├── layouts/                 # Layout components
│   ├── pages/                   # Page components
│   ├── services/                # API services
│   ├── store/                   # Zustand stores
│   ├── styles/                  # Global styles and CSS variables
│   │   └── globals.css         # All CSS Custom Properties
│   ├── test/                    # Test utilities
│   ├── utils/                   # Utility functions
│   ├── App.tsx                  # Main App component
│   └── main.tsx                 # Application entry point
├── cypress/                     # E2E tests
├── __mocks__/                   # Jest mocks
└── index.html                   # HTML entry point
```

## Key Features

### CSS Custom Properties

All design tokens are defined in `/src/styles/globals.css`:
- Colors (primary, secondary, accent, destructive, success, warning, etc.)
- Typography (font sizes, weights, line heights)
- Spacing (xs, sm, md, lg, xl, 2xl)
- Border radius (radius, radius-card)
- Shadows (elevation-sm, elevation-md, elevation-lg)
- Icon sizes (xs, sm, md, lg)
- Grid system variables

### Path Aliases

The project uses TypeScript path aliases for cleaner imports:

```typescript
import { Button } from '@atoms/Button';
import { useAuth } from '@hooks/useAuth';
import { api } from '@services/api';
```

Available aliases:
- `@/*` - src root
- `@components/*` - components folder
- `@atoms/*` - atomic components
- `@molecules/*` - molecular components
- `@organisms/*` - organism components
- `@templates/*` - template components
- `@hooks/*` - custom hooks
- `@layouts/*` - layout components
- `@pages/*` - page components
- `@services/*` - API services
- `@store/*` - state management
- `@utils/*` - utility functions
- `@styles/*` - styles
- `@assets/*` - static assets

### Important Rules

1. **NO Tailwind CSS**: This project uses pure CSS with CSS Custom Properties only
2. **Path Injection**: Every `.tsx`, `.ts`, and `.css` file must start with `// Path: path/to/file.ext`
3. **Semantic HTML**: Use semantic HTML tags (h1, h2, p, label) which inherit styles from globals.css
4. **Accessibility**: All interactive elements must include proper ARIA attributes
5. **Open Sans Font**: All text uses Open Sans font family

## Documentation

For complete documentation, please refer to the `/docs` folder:

- **Design System**: `/docs/DESIGN-SYSTEM.md` - Complete design specifications
- **Technical Stack**: `/docs/TECHNICAL-STACK.md` - Technology details and configurations
- **Architecture**: `/docs/ARCHITECTURE.md` - Architecture patterns and best practices
- **Components**: `/docs/COMPONENTS-LIBRARY.md` - Component library reference
- **Layouts**: `/docs/LAYOUTS-TEMPLATES.md` - Layout templates and patterns

## Design System Version

**Robot Resources v1.0.1**

This boilerplate follows the Robot Resources Design System specifications, ensuring consistency with the brand guidelines and accessibility standards (WCAG 2.1 AA).

## License

Private - Claro Internal Use Only

---

**Version**: 1.0.1
**Last Updated**: December 1, 2025
