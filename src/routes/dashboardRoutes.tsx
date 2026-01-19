// Path: src/routes/dashboardRoutes.tsx

import { lazy, Suspense, type ComponentType } from 'react';
import {
  LayoutDashboard,
  PieChart,
  TrendingUp,
  Newspaper,
  Settings,
  type LucideIcon,
} from 'lucide-react';
import { LoadingScreen } from '../components/atoms/LoadingScreen';
import type { UserPlan } from '../store/authStore';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface DashboardRoute {
  path: string;
  name: string;
  icon: LucideIcon;
  element: ComponentType;
  showInNav: boolean;
  requiredPlan?: UserPlan;
  children?: DashboardRoute[];
}

// ─────────────────────────────────────────────────────────────────────────────
// LAZY LOADED PAGES
// ─────────────────────────────────────────────────────────────────────────────

// Dashboard Home
const DashboardHome = lazy(() =>
  import('../pages/app/DashboardPage').then((m) => ({ default: m.DashboardPage }))
);

// Portfolio View (Sprint 2)
const PortfolioView = lazy(() =>
  import('../pages/app/PortfolioView').then((m) => ({ default: m.PortfolioView }))
);

// Portfolio Simulator
const PortfolioSimulator = lazy(() =>
  import('../pages/app/PortfolioSimulator').then((m) => ({ default: m.PortfolioSimulator }))
);

// Recommendations View (Sprint 3)
const RecommendationsView = lazy(() =>
  import('../pages/app/RecommendationsView').then((m) => ({ default: m.RecommendationsView }))
);


// News View (Sprint 5)
const NewsView = lazy(() =>
  import('../pages/app/NewsView').then((m) => ({ default: m.NewsView }))
);


// Settings View - Placeholder until implemented
const SettingsPlaceholder = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '60vh',
      gap: '16px',
      color: 'var(--fing-text-secondary)',
      fontFamily: 'var(--fing-font-sans)',
    }}
  >
    <h2 style={{ color: 'var(--fing-text-primary)', fontSize: '24px', margin: 0 }}>
      Settings
    </h2>
    <p style={{ margin: 0, maxWidth: '400px', textAlign: 'center' }}>
      Configure your account preferences, notifications, and display options.
    </p>
    <span
      style={{
        fontSize: '12px',
        color: 'var(--fing-text-tertiary)',
        fontFamily: 'var(--fing-font-mono)',
        padding: '8px 16px',
        background: 'var(--fing-bg-elevated)',
        borderRadius: 'var(--fing-radius-md)',
      }}
    >
      Coming Soon
    </span>
  </div>
);

const SettingsView = () => <SettingsPlaceholder />;

// ─────────────────────────────────────────────────────────────────────────────
// ROUTE CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────────

export const dashboardRoutes: DashboardRoute[] = [
  {
    path: '/app/dashboard',
    name: 'Home',
    icon: LayoutDashboard,
    element: DashboardHome,
    showInNav: true,
  },
  {
    path: '/app/dashboard/portfolio',
    name: 'Portfolio',
    icon: PieChart,
    element: PortfolioView,
    showInNav: true,
    requiredPlan: 'b2c',
  },
  {
    path: '/app/dashboard/portfolio/simulator',
    name: 'Portfolio Simulator',
    icon: PieChart,
    element: PortfolioSimulator,
    showInNav: false,
    requiredPlan: 'b2c',
  },
  {
    path: '/app/dashboard/recommendations',
    name: 'Calibrate',
    icon: TrendingUp,
    element: RecommendationsView,
    showInNav: true,
  },
  {
    path: '/app/dashboard/news',
    name: 'News',
    icon: Newspaper,
    element: NewsView,
    showInNav: true,
  },
  {
    path: '/app/dashboard/settings',
    name: 'Settings',
    icon: Settings,
    element: SettingsView,
    showInNav: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get routes visible in navigation
 */
export function getNavRoutes(): DashboardRoute[] {
  return dashboardRoutes.filter((route) => route.showInNav);
}

/**
 * Get routes available for a specific plan
 */
export function getRoutesForPlan(plan: UserPlan): DashboardRoute[] {
  const planHierarchy: Record<UserPlan, number> = {
    free: 0,
    b2c: 1,
    b2b: 2,
  };

  return dashboardRoutes.filter((route) => {
    if (!route.requiredPlan) return true;
    return planHierarchy[plan] >= planHierarchy[route.requiredPlan];
  });
}

/**
 * Check if a route is accessible for a plan
 */
export function canAccessRoute(route: DashboardRoute, plan: UserPlan): boolean {
  if (!route.requiredPlan) return true;

  const planHierarchy: Record<UserPlan, number> = {
    free: 0,
    b2c: 1,
    b2b: 2,
  };

  return planHierarchy[plan] >= planHierarchy[route.requiredPlan];
}

/**
 * Get route by path
 */
export function getRouteByPath(path: string): DashboardRoute | undefined {
  return dashboardRoutes.find((route) => route.path === path);
}

// ─────────────────────────────────────────────────────────────────────────────
// ROUTE COMPONENT WITH SUSPENSE
// ─────────────────────────────────────────────────────────────────────────────

interface RouteElementProps {
  route: DashboardRoute;
}

export function RouteElement({ route }: RouteElementProps) {
  const Component = route.element;
  return (
    <Suspense fallback={<LoadingScreen message={`Loading ${route.name}`} />}>
      <Component />
    </Suspense>
  );
}
