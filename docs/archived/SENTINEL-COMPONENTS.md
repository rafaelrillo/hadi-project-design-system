# SENTINEL Design System Components

Complete reference for all SENTINEL investment observatory components.

---

## Design Philosophy

SENTINEL is designed as an **investment analysis observatory** - a calm, professional space where financial data is presented with clarity and confidence. The system follows these principles:

1. **Silent Complexity** - Sophisticated analysis presented through minimal interface
2. **Slow Revelation** - Information unfolds gradually with 400-700ms animations
3. **Desaturated Confidence** - Muted colors that convey expertise without alarm
4. **Information Hierarchy** - Three levels: Core (what), Context (why), Action (what to do)

---

## Color Palette

### Base Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--sentinel-bg-base` | `#0a0b10` | Page background |
| `--sentinel-bg-elevated` | `#12141a` | Cards, panels |
| `--sentinel-bg-subtle` | `#1a1c24` | Subtle backgrounds |

### Accent Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--sentinel-accent-primary` | `#5ba3a5` | Primary teal accent |
| `--sentinel-accent-secondary` | `#7c9aa0` | Secondary accent |

### Status Colors (Muted)
| Token | Value | Usage |
|-------|-------|-------|
| `--sentinel-status-positive` | `#5a9e7a` | Positive trends |
| `--sentinel-status-negative` | `#c47070` | Negative trends |
| `--sentinel-status-warning` | `#c4a55a` | Warnings |

---

## Typography

| Token | Value | Usage |
|-------|-------|-------|
| `--sentinel-font-primary` | `'Inter', sans-serif` | UI text |
| `--sentinel-font-mono` | `'JetBrains Mono', monospace` | Data, numbers |

---

## Component Hierarchy

### Level 1: Core Components (What is the market doing?)

#### MarketStateIndicator
Displays current market state with visual indicator.

```tsx
import { MarketStateIndicator } from '@/components/atoms/sentinel';

<MarketStateIndicator
  state="bullish" // 'bullish' | 'bearish' | 'neutral' | 'volatile'
  confidence={85}
  lastUpdated="2 min ago"
/>
```

#### RiskGauge
Circular gauge showing risk level from 0-100.

```tsx
import { RiskGauge } from '@/components/atoms/sentinel';

<RiskGauge
  value={65}
  label="Portfolio Risk"
  showLabel={true}
/>
```

#### ConfidenceLevel
Horizontal bar showing confidence percentage.

```tsx
import { ConfidenceLevel } from '@/components/atoms/sentinel';

<ConfidenceLevel
  value={78}
  label="Signal Confidence"
  showValue={true}
/>
```

#### SystemPulse
Animated heartbeat showing system activity.

```tsx
import { SystemPulse } from '@/components/atoms/sentinel';

<SystemPulse
  status="active" // 'active' | 'processing' | 'idle' | 'error'
  label="Analysis Engine"
/>
```

---

### Level 2: Context Components (Why is the market this way?)

#### FactorWeight
Shows which factors weigh most in current analysis.

```tsx
import { FactorWeight } from '@/components/molecules/sentinel';

<FactorWeight
  factors={[
    { name: 'Interest Rates', weight: 85, impact: 'positive', trend: 'up' },
    { name: 'Employment', weight: 72, impact: 'positive', trend: 'stable' },
    { name: 'Inflation', weight: 65, impact: 'negative', trend: 'down' },
  ]}
  title="Key Factors"
  maxVisible={5}
  animated={true}
/>
```

#### TrendIndicator
Simple metric display with trend direction.

```tsx
import { TrendIndicator } from '@/components/molecules/sentinel';

<TrendIndicator
  label="S&P 500"
  value="4,567.89"
  trend="up" // 'up' | 'down' | 'stable'
  changePercent={1.23}
  changeValue={55.67}
/>
```

#### HistoricalAlignment
Compares current conditions with historical patterns.

```tsx
import { HistoricalAlignment } from '@/components/molecules/sentinel';

<HistoricalAlignment
  periods={[
    { period: 'Dot-com Bubble', year: 2000, similarity: 35 },
    { period: 'Financial Crisis', year: 2008, similarity: 22 },
    { period: 'COVID Recovery', year: 2020, similarity: 78 },
  ]}
  currentSummary="Current conditions most closely resemble post-pandemic recovery"
/>
```

#### CyclePosition
Economic cycle position indicator with SVG visualization.

```tsx
import { CyclePosition } from '@/components/molecules/sentinel';

<CyclePosition
  currentPhase="expansion" // 'expansion' | 'peak' | 'contraction' | 'trough'
  confidence={72}
  description="Economy is growing steadily"
  showTimeline={true}
/>
```

---

### Level 3: Action Components (What should I do?)

#### RecommendationCard
Primary investment recommendation display.

```tsx
import { RecommendationCard } from '@/components/molecules/sentinel';

<RecommendationCard
  type="buy" // 'buy' | 'sell' | 'hold' | 'watch'
  title="Increase Equity Exposure"
  rationale="Strong fundamentals and favorable macro environment"
  assetClass="equities"
  priority="high" // 'high' | 'medium' | 'low'
  confidence={82}
  timeHorizon="6-12 months"
/>
```

#### StockSuggestion
Individual stock/asset suggestion card.

```tsx
import { StockSuggestion } from '@/components/molecules/sentinel';

<StockSuggestion
  symbol="AAPL"
  name="Apple Inc."
  action="buy" // 'buy' | 'sell' | 'hold'
  price={189.45}
  priceChange={2.34}
  priceChangePercent={1.25}
  sector="Technology"
  confidence={78}
  reasoning="Strong iPhone 15 cycle, services growth accelerating"
  expandable={true}
/>
```

#### RiskProfileSelector
User risk profile selection component.

```tsx
import { RiskProfileSelector } from '@/components/molecules/sentinel';

<RiskProfileSelector
  value="moderate" // 'conservative' | 'moderate' | 'aggressive'
  onChange={(profile) => console.log(profile)}
  showDescription={true}
  showRiskScale={true}
  disabled={false}
/>
```

#### AllocationSummary
Portfolio allocation breakdown visualization.

```tsx
import { AllocationSummary } from '@/components/molecules/sentinel';

<AllocationSummary
  allocations={[
    { assetClass: 'Equities', percentage: 60, color: '#5ba3a5', change: 5 },
    { assetClass: 'Fixed Income', percentage: 25, color: '#7c9aa0', change: -3 },
    { assetClass: 'Alternatives', percentage: 10, color: '#8a8f9c', change: 0 },
    { assetClass: 'Cash', percentage: 5, color: '#4a4f5c', change: -2 },
  ]}
  showChanges={true}
/>
```

---

## Atmospheric Components

### AtmosphericBackground
Full-page atmospheric layer with gradients and glow effects.

```tsx
import { AtmosphericBackground } from '@/components/atoms/sentinel';

<AtmosphericBackground
  variant="default" // 'default' | 'subtle' | 'intense'
  animated={true}
/>
```

### DepthLayer
Z-axis depth container for visual hierarchy.

```tsx
import { DepthLayer } from '@/components/atoms/sentinel';

<DepthLayer level={2} elevated={true}>
  <YourContent />
</DepthLayer>
```

Levels: 0 (base) to 4 (highest)

### DataReveal
Staggered reveal animation wrapper.

```tsx
import { DataReveal } from '@/components/atoms/sentinel';

<DataReveal delay={100} duration={600} direction="up">
  <YourContent />
</DataReveal>
```

---

## Layout

### SentinelDashboard
Full dashboard layout with sidebar, header, and content area.

```tsx
import { SentinelDashboard } from '@/layouts/SentinelDashboard';

<SentinelDashboard
  sidebar={<YourSidebar />}
  header={<YourHeader />}
  indicators={<YourIndicators />}
>
  <YourMainContent />
</SentinelDashboard>
```

---

## Charts

### FinancialLineChart
Investment-focused line chart built on Nivo.

```tsx
import { FinancialLineChart } from '@/components/charts/FinancialLineChart';

<FinancialLineChart
  data={[
    {
      id: 'Portfolio Value',
      data: [
        { x: '2024-01', y: 100000 },
        { x: '2024-02', y: 105000 },
        // ...
      ]
    }
  ]}
  title="Portfolio Performance"
  height={300}
  enableArea={true}
  formatValue={(v) => `$${v.toLocaleString()}`}
/>
```

---

## Accessibility

All SENTINEL components support:

- **Keyboard navigation** - Full Tab/Enter/Space support
- **Screen readers** - ARIA labels and roles
- **Reduced motion** - Animations disabled via `prefers-reduced-motion`
- **Focus indicators** - Visible 2px outline on focus-visible

---

## Tokens Reference

### Spacing
```css
--sentinel-spacing-xs: 4px;
--sentinel-spacing-sm: 8px;
--sentinel-spacing-md: 12px;
--sentinel-spacing-lg: 16px;
--sentinel-spacing-xl: 24px;
--sentinel-spacing-2xl: 32px;
```

### Border Radius
```css
--sentinel-radius-xs: 2px;
--sentinel-radius-sm: 4px;
--sentinel-radius-md: 8px;
--sentinel-radius-lg: 12px;
--sentinel-radius-xl: 16px;
```

### Transitions
```css
--sentinel-transition-fast: 150ms ease;
--sentinel-transition-normal: 250ms ease;
--sentinel-transition-slow: 400ms ease;
--sentinel-transition-slower: 600ms ease;
```

---

## File Structure

```
src/
├── components/
│   ├── atoms/
│   │   └── sentinel/
│   │       ├── MarketStateIndicator/
│   │       ├── RiskGauge/
│   │       ├── ConfidenceLevel/
│   │       ├── SystemPulse/
│   │       ├── AtmosphericBackground/
│   │       ├── DepthLayer/
│   │       └── DataReveal/
│   ├── molecules/
│   │   └── sentinel/
│   │       ├── FactorWeight/
│   │       ├── TrendIndicator/
│   │       ├── HistoricalAlignment/
│   │       ├── CyclePosition/
│   │       ├── RecommendationCard/
│   │       ├── StockSuggestion/
│   │       ├── RiskProfileSelector/
│   │       └── AllocationSummary/
│   └── charts/
│       └── FinancialLineChart/
├── layouts/
│   └── SentinelDashboard/
└── styles/
    ├── globals.css
    ├── theme.css
    └── sentinel.css
```
