# SENTINEL Mobile Responsive - Guía de Implementación Completa

**Versión:** 1.0.0  
**Fecha:** Diciembre 2024  
**Estrategia:** Híbrida (Responsive Adaptativo + Layouts Separados para Dashboard)

---

## 📋 Resumen Ejecutivo

Este documento contiene todas las instrucciones necesarias para hacer SENTINEL 100% responsive y funcional en mobile. 

**Principios clave:**
- NO sidebar en mobile → Bottom Navigation
- Minimizar scroll vertical → Progressive disclosure
- Nivel 1 (Núcleo) siempre visible en header
- Bottom Sheet como patrón único para modals/drawers en mobile
- Touch targets mínimo 44px

---

## FASE 1: Infraestructura

### 1.1 Agregar Breakpoints a theme.css

Localizar `src/styles/theme.css` y agregar en la sección `:root`:

```css
/* ============================================
   BREAKPOINTS - Mobile First
   ============================================ */
   
/* Breakpoint values (for reference in JS) */
--sentinel-breakpoint-xs: 375px;   /* iPhone SE, small phones */
--sentinel-breakpoint-sm: 480px;   /* Large phones */
--sentinel-breakpoint-md: 768px;   /* Tablets portrait */
--sentinel-breakpoint-lg: 1024px;  /* Tablets landscape, small laptops */
--sentinel-breakpoint-xl: 1200px;  /* Desktops */
--sentinel-breakpoint-2xl: 1440px; /* Large desktops */

/* Touch & Accessibility */
--sentinel-touch-target-min: 44px;
--sentinel-touch-target-comfortable: 48px;

/* Safe Areas (for notched devices) */
--sentinel-safe-area-top: env(safe-area-inset-top, 0px);
--sentinel-safe-area-bottom: env(safe-area-inset-bottom, 0px);
--sentinel-safe-area-left: env(safe-area-inset-left, 0px);
--sentinel-safe-area-right: env(safe-area-inset-right, 0px);

/* Mobile-specific spacing */
--sentinel-mobile-header-height: 56px;
--sentinel-mobile-bottom-nav-height: 64px;
--sentinel-mobile-content-padding: var(--sentinel-space-4);
```

### 1.2 Crear archivo de utilidades responsive

Crear `src/styles/responsive.css`:

```css
/* Path: src/styles/responsive.css */
/* SENTINEL Responsive Utilities */

/* ============================================
   VISIBILITY UTILITIES
   ============================================ */

/* Hide on mobile, show on desktop */
.hide-mobile {
  display: none !important;
}

@media (min-width: 768px) {
  .hide-mobile {
    display: initial !important;
  }
}

/* Show on mobile, hide on desktop */
.show-mobile {
  display: initial !important;
}

@media (min-width: 768px) {
  .show-mobile {
    display: none !important;
  }
}

/* Hide on tablet and below */
.hide-tablet {
  display: none !important;
}

@media (min-width: 1024px) {
  .hide-tablet {
    display: initial !important;
  }
}

/* ============================================
   TOUCH UTILITIES
   ============================================ */

.touch-target {
  min-height: var(--sentinel-touch-target-min);
  min-width: var(--sentinel-touch-target-min);
}

.touch-target-comfortable {
  min-height: var(--sentinel-touch-target-comfortable);
  min-width: var(--sentinel-touch-target-comfortable);
}

/* Touch feedback */
.touch-feedback {
  -webkit-tap-highlight-color: transparent;
  transition: transform var(--sentinel-duration-fast) var(--sentinel-ease-out),
              opacity var(--sentinel-duration-fast) var(--sentinel-ease-out);
}

.touch-feedback:active {
  transform: scale(0.97);
  opacity: 0.8;
}

/* ============================================
   SAFE AREA UTILITIES
   ============================================ */

.safe-area-top {
  padding-top: var(--sentinel-safe-area-top);
}

.safe-area-bottom {
  padding-bottom: var(--sentinel-safe-area-bottom);
}

.safe-area-inset {
  padding-top: var(--sentinel-safe-area-top);
  padding-bottom: var(--sentinel-safe-area-bottom);
  padding-left: var(--sentinel-safe-area-left);
  padding-right: var(--sentinel-safe-area-right);
}

/* ============================================
   SCROLL UTILITIES
   ============================================ */

/* Horizontal scroll container (for cards, chips, etc.) */
.scroll-x {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
  gap: var(--sentinel-space-3);
  padding-bottom: var(--sentinel-space-2); /* Prevent cut-off shadows */
}

.scroll-x::-webkit-scrollbar {
  display: none;
}

/* Snap scrolling */
.scroll-snap-x {
  scroll-snap-type: x mandatory;
}

.scroll-snap-item {
  scroll-snap-align: start;
  flex-shrink: 0;
}

/* ============================================
   LAYOUT UTILITIES
   ============================================ */

/* Stack layout (vertical) */
.stack {
  display: flex;
  flex-direction: column;
}

.stack-2 { gap: var(--sentinel-space-2); }
.stack-3 { gap: var(--sentinel-space-3); }
.stack-4 { gap: var(--sentinel-space-4); }
.stack-6 { gap: var(--sentinel-space-6); }
.stack-8 { gap: var(--sentinel-space-8); }

/* Row layout (horizontal) */
.row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.row-2 { gap: var(--sentinel-space-2); }
.row-3 { gap: var(--sentinel-space-3); }
.row-4 { gap: var(--sentinel-space-4); }

/* Space between */
.justify-between {
  justify-content: space-between;
}

/* Full width on mobile */
.full-width-mobile {
  width: 100%;
}

@media (min-width: 768px) {
  .full-width-mobile {
    width: auto;
  }
}

/* ============================================
   CONTAINER QUERIES (Modern browsers)
   ============================================ */

.container-query {
  container-type: inline-size;
}

/* ============================================
   REDUCED MOTION
   ============================================ */

@media (prefers-reduced-motion: reduce) {
  .touch-feedback {
    transition: none;
  }
  
  .touch-feedback:active {
    transform: none;
  }
}
```

### 1.3 Importar responsive.css en main.tsx o globals.css

En `src/styles/globals.css`, agregar al final:

```css
@import './responsive.css';
```

### 1.4 Crear hook useBreakpoint

Crear `src/hooks/useBreakpoint.ts`:

```typescript
// Path: src/hooks/useBreakpoint.ts
import { useState, useEffect } from 'react';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints = {
  xs: 375,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1200,
  '2xl': 1440,
};

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('xl');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width < breakpoints.xs) {
        setBreakpoint('xs');
      } else if (width < breakpoints.sm) {
        setBreakpoint('sm');
      } else if (width < breakpoints.md) {
        setBreakpoint('md');
      } else if (width < breakpoints.lg) {
        setBreakpoint('lg');
      } else if (width < breakpoints.xl) {
        setBreakpoint('xl');
      } else {
        setBreakpoint('2xl');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
}

export function useIsMobile(): boolean {
  const breakpoint = useBreakpoint();
  return breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md';
}

export function useIsTablet(): boolean {
  const breakpoint = useBreakpoint();
  return breakpoint === 'md' || breakpoint === 'lg';
}

export function useIsDesktop(): boolean {
  const breakpoint = useBreakpoint();
  return breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl';
}

// Media query hook for custom queries
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
```

Exportar en `src/hooks/index.ts`:

```typescript
export * from './useBreakpoint';
```

---

## FASE 2: Navegación Mobile

### 2.1 Crear BottomSheet Component

Este componente reemplaza Modal/Drawer en mobile.

Crear `src/components/organisms/BottomSheet/`:

**BottomSheet.tsx:**
```typescript
// Path: src/components/organisms/BottomSheet/BottomSheet.tsx
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import styles from './BottomSheet.module.css';

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  /** Height: 'auto' | 'half' | 'full' */
  height?: 'auto' | 'half' | 'full';
  /** Show drag handle indicator */
  showHandle?: boolean;
  /** Show close button */
  showClose?: boolean;
  /** Close on backdrop click */
  closeOnBackdrop?: boolean;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
  height = 'auto',
  showHandle = true,
  showClose = true,
  closeOnBackdrop = true,
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const content = (
    <div className={styles.overlay} onClick={closeOnBackdrop ? onClose : undefined}>
      <div
        ref={sheetRef}
        className={`${styles.sheet} ${styles[height]}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'bottom-sheet-title' : undefined}
      >
        {showHandle && <div className={styles.handle} />}
        
        {(title || showClose) && (
          <div className={styles.header}>
            {title && (
              <h2 id="bottom-sheet-title" className={styles.title}>
                {title}
              </h2>
            )}
            {showClose && (
              <button
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}
        
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

export default BottomSheet;
```

**BottomSheet.module.css:**
```css
/* Path: src/components/organisms/BottomSheet/BottomSheet.module.css */

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: var(--sentinel-z-modal);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  animation: fadeIn var(--sentinel-duration-fast) var(--sentinel-ease-out);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.sheet {
  background: var(--sentinel-bg-elevated);
  border-top-left-radius: var(--sentinel-radius-xl);
  border-top-right-radius: var(--sentinel-radius-xl);
  width: 100%;
  max-width: 100%;
  max-height: calc(100vh - var(--sentinel-safe-area-top) - 24px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: slideUp var(--sentinel-duration-normal) var(--sentinel-ease-out);
  padding-bottom: var(--sentinel-safe-area-bottom);
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Height variants */
.auto {
  height: auto;
}

.half {
  height: 50vh;
  min-height: 300px;
}

.full {
  height: calc(100vh - var(--sentinel-safe-area-top) - 24px);
}

.handle {
  width: 36px;
  height: 4px;
  background: var(--sentinel-border-strong);
  border-radius: var(--sentinel-radius-full);
  margin: var(--sentinel-space-3) auto;
  flex-shrink: 0;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--sentinel-space-4) var(--sentinel-space-5);
  border-bottom: 1px solid var(--sentinel-border-subtle);
  flex-shrink: 0;
}

.title {
  font-family: var(--sentinel-font-primary);
  font-size: var(--sentinel-text-lg);
  font-weight: var(--sentinel-font-semibold);
  color: var(--sentinel-text-primary);
  margin: 0;
}

.closeButton {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: transparent;
  border: none;
  border-radius: var(--sentinel-radius-md);
  color: var(--sentinel-text-secondary);
  cursor: pointer;
  transition: background var(--sentinel-duration-fast) var(--sentinel-ease-default),
              color var(--sentinel-duration-fast) var(--sentinel-ease-default);
}

.closeButton:hover {
  background: var(--sentinel-bg-subtle);
  color: var(--sentinel-text-primary);
}

.content {
  flex: 1;
  overflow-y: auto;
  padding: var(--sentinel-space-5);
  -webkit-overflow-scrolling: touch;
}

/* Desktop: convert to centered modal */
@media (min-width: 768px) {
  .overlay {
    align-items: center;
  }
  
  .sheet {
    max-width: 480px;
    max-height: 80vh;
    border-radius: var(--sentinel-radius-xl);
    margin: var(--sentinel-space-6);
  }
  
  .handle {
    display: none;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .overlay,
  .sheet {
    animation: none;
  }
}
```

**index.ts:**
```typescript
// Path: src/components/organisms/BottomSheet/index.ts
export { BottomSheet } from './BottomSheet';
export type { BottomSheetProps } from './BottomSheet';
```

### 2.2 Crear MobileHeader Component

Crear `src/components/organisms/MobileHeader/`:

**MobileHeader.tsx:**
```typescript
// Path: src/components/organisms/MobileHeader/MobileHeader.tsx
import React from 'react';
import { Menu, Bell, ChevronLeft } from 'lucide-react';
import { SystemPulse } from '../sentinel/SystemPulse';
import styles from './MobileHeader.module.css';

export interface MobileHeaderProps {
  /** Show back button instead of menu */
  showBack?: boolean;
  /** Back button handler */
  onBack?: () => void;
  /** Menu button handler */
  onMenuClick?: () => void;
  /** Notification button handler */
  onNotificationClick?: () => void;
  /** Notification count */
  notificationCount?: number;
  /** Market state for inline display */
  marketState?: 'bullish' | 'bearish' | 'neutral' | 'uncertain';
  /** Risk level percentage */
  riskLevel?: number;
  /** System status */
  systemStatus?: 'active' | 'processing' | 'idle' | 'offline';
  /** Show market indicators */
  showIndicators?: boolean;
}

const marketLabels: Record<string, { label: string; emoji: string }> = {
  bullish: { label: 'Bull', emoji: '📈' },
  bearish: { label: 'Bear', emoji: '📉' },
  neutral: { label: 'Flat', emoji: '➡️' },
  uncertain: { label: '???', emoji: '❓' },
};

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  showBack = false,
  onBack,
  onMenuClick,
  onNotificationClick,
  notificationCount = 0,
  marketState = 'neutral',
  riskLevel = 0,
  systemStatus = 'active',
  showIndicators = true,
}) => {
  const market = marketLabels[marketState];

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {showBack ? (
          <button
            className={styles.iconButton}
            onClick={onBack}
            aria-label="Go back"
          >
            <ChevronLeft size={24} />
          </button>
        ) : (
          <div className={styles.brand}>
            <SystemPulse status={systemStatus} size="sm" showLabel={false} />
            <span className={styles.brandName}>SENTINEL</span>
          </div>
        )}
      </div>

      {showIndicators && (
        <div className={styles.indicators}>
          <div className={styles.indicator}>
            <span className={styles.indicatorEmoji}>{market.emoji}</span>
            <span className={styles.indicatorLabel}>{market.label}</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.indicator}>
            <span className={styles.indicatorLabel}>Risk</span>
            <span className={`${styles.indicatorValue} ${styles[getRiskClass(riskLevel)]}`}>
              {riskLevel}%
            </span>
          </div>
        </div>
      )}

      <div className={styles.right}>
        <button
          className={styles.iconButton}
          onClick={onNotificationClick}
          aria-label={`Notifications${notificationCount > 0 ? `, ${notificationCount} new` : ''}`}
        >
          <Bell size={20} />
          {notificationCount > 0 && (
            <span className={styles.badge}>
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </button>
        
        {!showBack && (
          <button
            className={styles.iconButton}
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        )}
      </div>
    </header>
  );
};

function getRiskClass(level: number): string {
  if (level < 25) return 'riskLow';
  if (level < 50) return 'riskModerate';
  if (level < 75) return 'riskElevated';
  return 'riskHigh';
}

export default MobileHeader;
```

**MobileHeader.module.css:**
```css
/* Path: src/components/organisms/MobileHeader/MobileHeader.module.css */

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--sentinel-mobile-header-height);
  padding: 0 var(--sentinel-space-4);
  padding-top: var(--sentinel-safe-area-top);
  background: var(--sentinel-bg-base);
  border-bottom: 1px solid var(--sentinel-border-subtle);
  position: sticky;
  top: 0;
  z-index: var(--sentinel-z-sticky);
}

.left {
  display: flex;
  align-items: center;
  gap: var(--sentinel-space-2);
}

.brand {
  display: flex;
  align-items: center;
  gap: var(--sentinel-space-2);
}

.brandName {
  font-family: var(--sentinel-font-mono);
  font-size: var(--sentinel-text-sm);
  font-weight: var(--sentinel-font-semibold);
  color: var(--sentinel-text-primary);
  letter-spacing: 0.05em;
}

.indicators {
  display: flex;
  align-items: center;
  gap: var(--sentinel-space-3);
  background: var(--sentinel-bg-elevated);
  padding: var(--sentinel-space-1) var(--sentinel-space-3);
  border-radius: var(--sentinel-radius-full);
}

.indicator {
  display: flex;
  align-items: center;
  gap: var(--sentinel-space-1);
}

.indicatorEmoji {
  font-size: var(--sentinel-text-xs);
}

.indicatorLabel {
  font-family: var(--sentinel-font-mono);
  font-size: var(--sentinel-text-xs);
  color: var(--sentinel-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.indicatorValue {
  font-family: var(--sentinel-font-mono);
  font-size: var(--sentinel-text-xs);
  font-weight: var(--sentinel-font-semibold);
}

.riskLow {
  color: var(--sentinel-risk-low);
}

.riskModerate {
  color: var(--sentinel-risk-moderate);
}

.riskElevated {
  color: var(--sentinel-risk-elevated);
}

.riskHigh {
  color: var(--sentinel-risk-high);
}

.divider {
  width: 1px;
  height: 16px;
  background: var(--sentinel-border-default);
}

.right {
  display: flex;
  align-items: center;
  gap: var(--sentinel-space-1);
}

.iconButton {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--sentinel-touch-target-min);
  height: var(--sentinel-touch-target-min);
  background: transparent;
  border: none;
  border-radius: var(--sentinel-radius-md);
  color: var(--sentinel-text-secondary);
  cursor: pointer;
  position: relative;
  -webkit-tap-highlight-color: transparent;
  transition: background var(--sentinel-duration-fast) var(--sentinel-ease-default),
              color var(--sentinel-duration-fast) var(--sentinel-ease-default);
}

.iconButton:hover,
.iconButton:active {
  background: var(--sentinel-bg-subtle);
  color: var(--sentinel-text-primary);
}

.badge {
  position: absolute;
  top: 4px;
  right: 4px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  background: var(--sentinel-status-negative);
  color: white;
  font-family: var(--sentinel-font-mono);
  font-size: 10px;
  font-weight: var(--sentinel-font-bold);
  border-radius: var(--sentinel-radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Hide on desktop */
@media (min-width: 768px) {
  .header {
    display: none;
  }
}
```

**index.ts:**
```typescript
// Path: src/components/organisms/MobileHeader/index.ts
export { MobileHeader } from './MobileHeader';
export type { MobileHeaderProps } from './MobileHeader';
```

### 2.3 Crear BottomNavigation Component

Crear `src/components/organisms/BottomNavigation/`:

**BottomNavigation.tsx:**
```typescript
// Path: src/components/organisms/BottomNavigation/BottomNavigation.tsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  TrendingUp, 
  Newspaper, 
  MoreHorizontal 
} from 'lucide-react';
import styles from './BottomNavigation.module.css';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  onClick?: () => void;
}

export interface BottomNavigationProps {
  /** Custom navigation items (optional, uses defaults if not provided) */
  items?: NavItem[];
  /** Handler for "More" button */
  onMoreClick?: () => void;
}

const defaultItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: <LayoutDashboard size={22} />, path: '/' },
  { id: 'portfolio', label: 'Portfolio', icon: <Briefcase size={22} />, path: '/portfolio' },
  { id: 'recommendations', label: 'Recs', icon: <TrendingUp size={22} />, path: '/recommendations' },
  { id: 'news', label: 'News', icon: <Newspaper size={22} />, path: '/news' },
];

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  items = defaultItems,
  onMoreClick,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (item: NavItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const isActive = (item: NavItem) => {
    if (!item.path) return false;
    if (item.path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(item.path);
  };

  return (
    <nav className={styles.nav} role="navigation" aria-label="Main navigation">
      {items.map((item) => (
        <button
          key={item.id}
          className={`${styles.navItem} ${isActive(item) ? styles.active : ''}`}
          onClick={() => handleClick(item)}
          aria-current={isActive(item) ? 'page' : undefined}
        >
          <span className={styles.icon}>{item.icon}</span>
          <span className={styles.label}>{item.label}</span>
        </button>
      ))}
      
      <button
        className={styles.navItem}
        onClick={onMoreClick}
        aria-label="More options"
      >
        <span className={styles.icon}>
          <MoreHorizontal size={22} />
        </span>
        <span className={styles.label}>More</span>
      </button>
    </nav>
  );
};

export default BottomNavigation;
```

**BottomNavigation.module.css:**
```css
/* Path: src/components/organisms/BottomNavigation/BottomNavigation.module.css */

.nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: var(--sentinel-mobile-bottom-nav-height);
  padding-bottom: var(--sentinel-safe-area-bottom);
  background: var(--sentinel-bg-elevated);
  border-top: 1px solid var(--sentinel-border-subtle);
  display: flex;
  align-items: stretch;
  justify-content: space-around;
  z-index: var(--sentinel-z-sticky);
}

.navItem {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--sentinel-space-1);
  padding: var(--sentinel-space-2) var(--sentinel-space-1);
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--sentinel-text-tertiary);
  -webkit-tap-highlight-color: transparent;
  transition: color var(--sentinel-duration-fast) var(--sentinel-ease-default);
  min-height: var(--sentinel-touch-target-min);
}

.navItem:hover {
  color: var(--sentinel-text-secondary);
}

.navItem.active {
  color: var(--sentinel-accent-primary);
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.label {
  font-family: var(--sentinel-font-primary);
  font-size: 10px;
  font-weight: var(--sentinel-font-medium);
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

/* Active indicator */
.navItem.active::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 2px;
  background: var(--sentinel-accent-primary);
  border-radius: 0 0 var(--sentinel-radius-full) var(--sentinel-radius-full);
}

/* Position relative for the indicator */
.navItem {
  position: relative;
}

/* Hide on desktop */
@media (min-width: 768px) {
  .nav {
    display: none;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .navItem {
    transition: none;
  }
}
```

**index.ts:**
```typescript
// Path: src/components/organisms/BottomNavigation/index.ts
export { BottomNavigation } from './BottomNavigation';
export type { BottomNavigationProps, NavItem } from './BottomNavigation';
```

### 2.4 Crear MoreMenu Component

Para el menú "More" que se abre desde BottomNavigation:

**MoreMenu.tsx:**
```typescript
// Path: src/components/organisms/MoreMenu/MoreMenu.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  User, 
  HelpCircle, 
  LogOut,
  Moon,
  Bell,
  Shield
} from 'lucide-react';
import { BottomSheet } from '../BottomSheet';
import styles from './MoreMenu.module.css';

export interface MoreMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout?: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  onClick?: () => void;
  destructive?: boolean;
}

export const MoreMenu: React.FC<MoreMenuProps> = ({
  isOpen,
  onClose,
  onLogout,
}) => {
  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    { id: 'profile', label: 'Profile', icon: <User size={20} />, path: '/profile' },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} />, path: '/settings' },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} />, path: '/settings/notifications' },
    { id: 'security', label: 'Security', icon: <Shield size={20} />, path: '/settings/security' },
    { id: 'help', label: 'Help & Support', icon: <HelpCircle size={20} />, path: '/help' },
    { id: 'logout', label: 'Log Out', icon: <LogOut size={20} />, onClick: onLogout, destructive: true },
  ];

  const handleClick = (item: MenuItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.path) {
      navigate(item.path);
    }
    onClose();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="More"
      height="auto"
    >
      <nav className={styles.menu}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`${styles.menuItem} ${item.destructive ? styles.destructive : ''}`}
            onClick={() => handleClick(item)}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </button>
        ))}
      </nav>
    </BottomSheet>
  );
};

export default MoreMenu;
```

**MoreMenu.module.css:**
```css
/* Path: src/components/organisms/MoreMenu/MoreMenu.module.css */

.menu {
  display: flex;
  flex-direction: column;
  gap: var(--sentinel-space-1);
}

.menuItem {
  display: flex;
  align-items: center;
  gap: var(--sentinel-space-4);
  width: 100%;
  padding: var(--sentinel-space-4);
  background: transparent;
  border: none;
  border-radius: var(--sentinel-radius-md);
  color: var(--sentinel-text-primary);
  font-family: var(--sentinel-font-primary);
  font-size: var(--sentinel-text-base);
  text-align: left;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background var(--sentinel-duration-fast) var(--sentinel-ease-default);
  min-height: var(--sentinel-touch-target-min);
}

.menuItem:hover,
.menuItem:active {
  background: var(--sentinel-bg-subtle);
}

.menuItem.destructive {
  color: var(--sentinel-status-negative);
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: var(--sentinel-text-secondary);
}

.menuItem.destructive .icon {
  color: var(--sentinel-status-negative);
}

.label {
  flex: 1;
}
```

---

## FASE 3: Layout Responsive

### 3.1 Crear MobileLayout Wrapper

Crear `src/layouts/MobileLayout/`:

**MobileLayout.tsx:**
```typescript
// Path: src/layouts/MobileLayout/MobileLayout.tsx
import React, { useState } from 'react';
import { MobileHeader } from '@/components/organisms/MobileHeader';
import { BottomNavigation } from '@/components/organisms/BottomNavigation';
import { MoreMenu } from '@/components/organisms/MoreMenu';
import styles from './MobileLayout.module.css';

export interface MobileLayoutProps {
  children: React.ReactNode;
  /** Page title for header */
  title?: string;
  /** Show back button */
  showBack?: boolean;
  /** Back handler */
  onBack?: () => void;
  /** Market state */
  marketState?: 'bullish' | 'bearish' | 'neutral' | 'uncertain';
  /** Risk level */
  riskLevel?: number;
  /** System status */
  systemStatus?: 'active' | 'processing' | 'idle' | 'offline';
  /** Show bottom navigation */
  showBottomNav?: boolean;
  /** Show header indicators */
  showIndicators?: boolean;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  title,
  showBack = false,
  onBack,
  marketState = 'neutral',
  riskLevel = 0,
  systemStatus = 'active',
  showBottomNav = true,
  showIndicators = true,
}) => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [notificationCount] = useState(3); // Replace with real data

  return (
    <div className={styles.layout}>
      <MobileHeader
        showBack={showBack}
        onBack={onBack}
        onMenuClick={() => setIsMoreMenuOpen(true)}
        onNotificationClick={() => {/* Handle notifications */}}
        notificationCount={notificationCount}
        marketState={marketState}
        riskLevel={riskLevel}
        systemStatus={systemStatus}
        showIndicators={showIndicators}
      />
      
      <main className={`${styles.content} ${showBottomNav ? styles.withBottomNav : ''}`}>
        {children}
      </main>
      
      {showBottomNav && (
        <BottomNavigation onMoreClick={() => setIsMoreMenuOpen(true)} />
      )}
      
      <MoreMenu
        isOpen={isMoreMenuOpen}
        onClose={() => setIsMoreMenuOpen(false)}
        onLogout={() => {/* Handle logout */}}
      />
    </div>
  );
};

export default MobileLayout;
```

**MobileLayout.module.css:**
```css
/* Path: src/layouts/MobileLayout/MobileLayout.module.css */

.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--sentinel-bg-base);
}

.content {
  flex: 1;
  padding: var(--sentinel-mobile-content-padding);
  padding-top: calc(var(--sentinel-mobile-header-height) + var(--sentinel-safe-area-top) + var(--sentinel-space-4));
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.content.withBottomNav {
  padding-bottom: calc(var(--sentinel-mobile-bottom-nav-height) + var(--sentinel-safe-area-bottom) + var(--sentinel-space-4));
}

/* Hide on desktop */
@media (min-width: 768px) {
  .layout {
    display: none;
  }
}
```

### 3.2 Crear ResponsiveLayout que elige Desktop vs Mobile

**ResponsiveLayout.tsx:**
```typescript
// Path: src/layouts/ResponsiveLayout/ResponsiveLayout.tsx
import React from 'react';
import { useIsMobile } from '@/hooks/useBreakpoint';
import { MobileLayout, MobileLayoutProps } from '../MobileLayout';
// Import your existing desktop layout
// import { DashboardLayout } from '../DashboardLayout';

interface ResponsiveLayoutProps extends MobileLayoutProps {
  /** Desktop layout sidebar content */
  sidebarContent?: React.ReactNode;
}

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  children,
  sidebarContent,
  ...mobileProps
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileLayout {...mobileProps}>{children}</MobileLayout>;
  }

  // Return your existing desktop layout
  // return <DashboardLayout sidebar={sidebarContent}>{children}</DashboardLayout>;
  
  // Placeholder for now - replace with actual desktop layout
  return <div>{children}</div>;
};

export default ResponsiveLayout;
```

---

## FASE 4: Componentes Adaptados

### 4.1 Actualizar componentes existentes con responsive styles

Para cada componente que necesita adaptación, agregar media queries en su CSS module.

**Ejemplo para Card:**

```css
/* Agregar al final de Card.module.css */

/* Mobile adaptations */
@media (max-width: 767px) {
  .card {
    padding: var(--sentinel-space-4);
    border-radius: var(--sentinel-radius-lg);
  }
  
  .cardHeader {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--sentinel-space-2);
  }
}
```

**Ejemplo para MarketStateIndicator (versión compacta):**

```css
/* Agregar al MarketStateIndicator.module.css */

@media (max-width: 767px) {
  .container {
    flex-direction: row;
    align-items: center;
    padding: var(--sentinel-space-2) var(--sentinel-space-3);
    gap: var(--sentinel-space-2);
  }
  
  .indicator {
    width: 32px;
    height: 32px;
  }
  
  .label {
    font-size: var(--sentinel-text-xs);
  }
  
  .description {
    display: none;
  }
  
  .lastUpdated {
    display: none;
  }
}
```

### 4.2 Charts con Container Queries

Actualizar el contenedor de charts:

```css
/* src/components/charts/ChartContainer.module.css */

.chartContainer {
  container-type: inline-size;
  width: 100%;
}

.chart {
  width: 100%;
  height: 260px;
}

@container (max-width: 500px) {
  .chart {
    height: 180px;
  }
}

@container (max-width: 350px) {
  .chart {
    height: 150px;
  }
}
```

---

## FASE 5: Actualizar App Router

Modificar el routing principal para usar ResponsiveLayout:

```typescript
// En App.tsx o donde esté definido el router

import { ResponsiveLayout } from '@/layouts/ResponsiveLayout';
import { useMarketData } from '@/hooks/useMarketData'; // Your data hook

function App() {
  const { marketState, riskLevel, systemStatus } = useMarketData();
  
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ResponsiveLayout
            marketState={marketState}
            riskLevel={riskLevel}
            systemStatus={systemStatus}
          >
            <DashboardPage />
          </ResponsiveLayout>
        }
      />
      {/* ... other routes */}
    </Routes>
  );
}
```

---

## 📋 Checklist de Implementación

```
FASE 1: Infraestructura
[ ] Agregar breakpoints a theme.css
[ ] Crear src/styles/responsive.css
[ ] Importar responsive.css en globals.css
[ ] Crear hook useBreakpoint
[ ] Exportar hook desde src/hooks/index.ts

FASE 2: Navegación
[ ] Crear BottomSheet component
[ ] Crear MobileHeader component
[ ] Crear BottomNavigation component
[ ] Crear MoreMenu component
[ ] Exportar todos desde organisms/index.ts

FASE 3: Layouts
[ ] Crear MobileLayout
[ ] Crear ResponsiveLayout
[ ] Integrar con App router

FASE 4: Componentes
[ ] Agregar media queries a Card
[ ] Agregar media queries a MarketStateIndicator
[ ] Agregar media queries a RiskGauge
[ ] Agregar media queries a ConfidenceLevel
[ ] Agregar media queries a RecommendationCard
[ ] Agregar media queries a StockSuggestion
[ ] Actualizar charts con container queries

FASE 5: Testing
[ ] Probar en iPhone SE (375px)
[ ] Probar en iPhone 14 (390px)
[ ] Probar en Android standard (412px)
[ ] Probar en iPad (768px)
[ ] Verificar safe areas
[ ] Verificar touch targets
[ ] Probar con reduced motion
```

---

## 🎨 Principios de Diseño Mobile

1. **Touch targets:** Mínimo 44x44px
2. **Spacing:** Usar --sentinel-space-4 mínimo entre elementos interactivos
3. **Typography:** Mínimo 14px para texto legible
4. **Contraste:** Mantener ratios WCAG AA (4.5:1 para texto)
5. **Feedback:** Usar .touch-feedback class para estados activos
6. **Safe areas:** Siempre considerar notch y home indicator
7. **Scroll:** Preferir scroll horizontal para listas de cards, vertical para contenido principal

---

*Documento generado para implementación con Claude Code*
*Diciembre 2024*
