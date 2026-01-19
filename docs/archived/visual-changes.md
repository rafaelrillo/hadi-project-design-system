# Visual Changes - Glass-Neumorphism Implementation

## Overview

This document describes the visual changes applied to the SENTINEL Design System to implement a **Glass-Neumorphism** style - a combination of glassmorphism (frosted glass effect) and neumorphism (soft UI with depth).

## Design Philosophy

**Glass-Neumorphism** combines:
- **Glassmorphism**: Semi-transparent backgrounds with `backdrop-filter: blur()` for frosted glass effect
- **Neumorphism**: Dual shadows creating depth (elevated state) or pressed/inset appearance
- **Luminous borders**: Light-colored rgba borders simulating glass edge reflection
- **Inner highlights**: Top edge glow simulating light reflection

## CSS Token System

### Glass Backgrounds
```css
--sentinel-glass-bg: rgba(16, 18, 26, 0.6)       /* Standard glass */
--sentinel-glass-elevated: rgba(22, 24, 34, 0.7) /* Elevated glass */
--sentinel-glass-inset: rgba(8, 9, 14, 0.5)      /* Pressed/inset glass */
```

### Glass Borders
```css
--sentinel-glass-border: rgba(255, 255, 255, 0.08)       /* Default */
--sentinel-glass-border-hover: rgba(255, 255, 255, 0.12) /* Hover state */
```

### Backdrop Blur
```css
--sentinel-blur-xs: 4px
--sentinel-blur-sm: 8px
--sentinel-blur-md: 12px
--sentinel-blur-lg: 20px
--sentinel-blur-xl: 32px
```

### Neumorphic Shadows
```css
/* Elevated (floating above surface) */
--sentinel-neu-elevated-sm: 0 2px 8px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)
--sentinel-neu-elevated-md: 0 4px 16px rgba(0, 0, 0, 0.35), 0 2px 4px rgba(0, 0, 0, 0.25)

/* Pressed (sunken into surface) */
--sentinel-neu-pressed-xs: inset 0 1px 3px rgba(0, 0, 0, 0.3)
--sentinel-neu-pressed-sm: inset 0 2px 6px rgba(0, 0, 0, 0.35)
```

## Files Modified

### Global Styles
- **`src/styles/globals.css`**
  - Added glass-neumorphic base styles to `body`
  - Added atmospheric gradient overlays
  - Created utility classes: `.glass`, `.glass-elevated`, `.glass-inset`, `.glass-panel`
  - Created neumorphic utilities: `.neu-elevated`, `.neu-pressed`
  - Created blur utilities: `.blur-sm`, `.blur-md`, `.blur-lg`, `.blur-xl`

### Layouts
- **`src/layouts/DashboardLayout/DashboardLayout.module.css`**
  - Sidebar: Heavy glass with strong blur and luminous right border
  - Header: Glass bar with subtle blur and luminous top edge
  - Nav items: Glass buttons with hover/active states
  - Live indicator: Glass pill with backdrop blur

### Pages

#### Dashboard Page
- **`src/pages/app/DashboardPage/DashboardPage.module.css`**
  - Main chart panel: Glass with luminous top edge
  - KPI cards: Glass backgrounds with inner highlights
  - Recommendation items: Glass inset style
  - Mobile cards: Glass with backdrop blur

#### Portfolio View
- **`src/pages/app/PortfolioView/PortfolioView.module.css`**
  - Cards: Glass-neumorphic with luminous top edge
  - Table headers: Semi-transparent glass surface
  - Allocation bars: Glass inset with pressed shadows
  - Mobile holdings: Glass cards with inset items

#### Recommendations View
- **`src/pages/app/RecommendationsView/RecommendationsView.module.css`**
  - Market summary card: Glass with luminous border
  - Tabs: Glass inset container with elevated active state
  - Recommendation cards: Glass with color-tinted left borders
  - Expanded content: Glass inset with pressed shadows
  - Mobile cards: Glass with backdrop blur

#### News View
- **`src/pages/app/NewsView/NewsView.module.css`**
  - Stats card: Glass-neumorphic
  - Toolbar: Glass with luminous top edge
  - Search box: Glass inset with pressed shadow
  - Filter selects: Glass with blur
  - View toggle: Glass inset container
  - News cards: Glass with sentiment accent

### Components (Previously Updated)
- `src/components/atoms/Badge/Badge.module.css`
- `src/components/atoms/Tooltip/Tooltip.module.css`
- `src/components/atoms/InputText/InputText.module.css`
- `src/components/molecules/Tabs/Tabs.module.css`
- `src/components/molecules/Dropdown/Dropdown.module.css`
- `src/components/molecules/MetricCard/MetricCard.module.css`
- `src/components/organisms/Modal/Modal.module.css`
- `src/components/organisms/Sidebar/Sidebar.module.css`
- `src/components/organisms/Table/Table.module.css`
- `src/components/organisms/Toast/Toast.module.css`

## Pattern Reference

### Standard Glass Card
```css
.card {
  background: var(--sentinel-glass-bg);
  border: 1px solid var(--sentinel-glass-border);
  border-radius: var(--sentinel-radius-lg);
  position: relative;

  backdrop-filter: blur(var(--sentinel-blur-md));
  -webkit-backdrop-filter: blur(var(--sentinel-blur-md));

  box-shadow:
    var(--sentinel-shadow-card),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

/* Luminous top edge */
.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0.1),
    transparent
  );
  border-radius: var(--sentinel-radius-lg) var(--sentinel-radius-lg) 0 0;
  pointer-events: none;
}
```

### Glass Inset (Pressed Element)
```css
.insetElement {
  background: var(--sentinel-glass-inset);
  box-shadow: var(--sentinel-neu-pressed-xs);
}
```

### Glass Elevated (Floating Element)
```css
.elevatedElement {
  background: var(--sentinel-glass-elevated);
  box-shadow:
    var(--sentinel-neu-elevated-md),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}
```

### Color-Tinted Glass (Status)
```css
/* Positive (green tint) */
.positiveCard {
  border-left: 3px solid rgba(74, 222, 128, 0.6);
  box-shadow:
    var(--sentinel-shadow-card),
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    inset 3px 0 15px rgba(74, 222, 128, 0.05);
}

/* Negative (red tint) */
.negativeCard {
  border-left: 3px solid rgba(248, 113, 113, 0.6);
  box-shadow:
    var(--sentinel-shadow-card),
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    inset 3px 0 15px rgba(248, 113, 113, 0.05);
}
```

## Accessibility

All components include `@media (prefers-reduced-motion: reduce)` rules to disable animations and transitions for users who prefer reduced motion.

## Browser Support

The implementation includes `-webkit-backdrop-filter` prefixes for Safari compatibility.

---

*SENTINEL Design System v3.2 - Glass-Neumorphism Update*
