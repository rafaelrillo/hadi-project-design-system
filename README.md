# SENTINEL Design System v2.0.0

Investment analysis observatory design system for building financial applications.

## Description

SENTINEL is a professional design system for investment and financial analysis applications. Built with React 19, Vite, and TypeScript, it provides a complete set of components designed specifically for displaying market data, investment recommendations, and portfolio analysis with clarity and confidence.

## Design Philosophy

- **Silent Complexity** - Sophisticated analysis presented through minimal interface
- **Slow Revelation** - Information unfolds gradually (400-700ms animations)
- **Desaturated Confidence** - Muted colors that convey expertise without alarm
- **Information Hierarchy** - Three levels: Core, Context, Action

## Tech Stack

- **React**: 19.0.0
- **Vite**: 5.0.8
- **TypeScript**: 5.2.2
- **React Router DOM**: 6.20.0+
- **Zustand**: 5.0.3+ (State Management)
- **Nivo Charts**: Data visualization
- **Framer Motion**: Animations
- **Lucide React**: Icons

### Architecture

- **Design System**: SENTINEL v2.0.0
- **Architecture Pattern**: Atomic Design
- **Styling**: CSS Modules + CSS Custom Properties (NO Tailwind CSS)

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

### Testing

```bash
npm run test
npm run test:watch
npm run test:coverage
npm run test:e2e
```

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--sentinel-bg-base` | `#0a0b10` | Page background |
| `--sentinel-accent-primary` | `#5ba3a5` | Primary teal accent |
| `--sentinel-status-positive` | `#5a9e7a` | Positive/gains |
| `--sentinel-status-negative` | `#c47070` | Negative/losses |

## Component Hierarchy

### Level 1: Core Components
What is the market doing?

- **MarketStateIndicator** - Market state display
- **RiskGauge** - Risk level gauge
- **ConfidenceLevel** - Confidence meter
- **SystemPulse** - System activity indicator

### Level 2: Context Components
Why is the market this way?

- **FactorWeight** - Analysis factor weights
- **TrendIndicator** - Metric trend display
- **HistoricalAlignment** - Historical pattern comparison
- **CyclePosition** - Economic cycle indicator

### Level 3: Action Components
What should I do?

- **RecommendationCard** - Investment recommendations
- **StockSuggestion** - Stock/asset suggestions
- **RiskProfileSelector** - Risk profile selection
- **AllocationSummary** - Portfolio allocation display

### Atmospheric Components

- **AtmosphericBackground** - Page atmosphere layer
- **DepthLayer** - Z-axis depth container
- **DataReveal** - Staggered reveal animations

### Charts

- **FinancialLineChart** - Investment-focused line charts

## Project Structure

```
src/
├── components/
│   ├── atoms/
│   │   └── sentinel/           # Core SENTINEL components
│   ├── molecules/
│   │   └── sentinel/           # Context & Action components
│   └── charts/
│       └── FinancialLineChart/ # Financial charts
├── layouts/
│   └── SentinelDashboard/      # Dashboard layout
├── pages/
│   ├── Landing/                # Landing page
│   └── sentinel/               # SENTINEL showcase
├── styles/
│   ├── globals.css             # Global styles
│   ├── theme.css               # Legacy tokens
│   └── sentinel.css            # SENTINEL tokens
└── App.tsx
```

## Documentation

- **SENTINEL-COMPONENTS.md** - Complete component reference
- **REBRAND-GUIDE.md** - Transformation documentation

## Key Features

### CSS Custom Properties

All SENTINEL tokens are prefixed with `--sentinel-*`:

```css
--sentinel-bg-base
--sentinel-accent-primary
--sentinel-text-primary
--sentinel-transition-slow
```

### Path Aliases

```typescript
import { MarketStateIndicator } from '@/components/atoms/sentinel';
import { RecommendationCard } from '@/components/molecules/sentinel';
```

### Accessibility

- Keyboard navigation (Tab/Enter/Space)
- Screen reader support (ARIA labels)
- Reduced motion support (`prefers-reduced-motion`)
- Visible focus indicators

## Important Rules

1. **NO Tailwind CSS** - Pure CSS with CSS Custom Properties
2. **Path Injection** - Every file starts with `// Path: path/to/file`
3. **SENTINEL Tokens** - Use `--sentinel-*` prefixed variables
4. **Slow Animations** - 400-700ms durations for data reveals

## License

Private - Internal Use Only

---

**Version**: 2.0.0
**Design System**: SENTINEL Observatory
**Last Updated**: December 2024
