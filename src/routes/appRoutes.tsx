import { Suspense } from "react";
import { Route, Navigate } from "react-router-dom";
import { LoadingScreen } from "../components/atoms/LoadingScreen";
import { lazy } from "react";

// App Layout (small, load immediately)
import { AppLayout } from "../pages/app";
import { DashboardLayout } from "../layouts/DashboardLayout";

// Lazy load heavy pages
const LoginPage = lazy(() =>
  import("../pages/app/LoginPage").then((m) => ({ default: m.LoginPage }))
);
const DashboardPage = lazy(() =>
  import("../pages/app/DashboardPage").then((m) => ({
    default: m.DashboardPage,
  }))
);
const PortfolioView = lazy(() =>
  import("../pages/app/PortfolioView").then((m) => ({
    default: m.PortfolioView,
  }))
);
const PortfolioSimulator = lazy(() =>
  import("../pages/app/PortfolioSimulator").then((m) => ({
    default: m.PortfolioSimulator,
  }))
);
const RecommendationsView = lazy(() =>
  import("../pages/app/RecommendationsView").then((m) => ({
    default: m.RecommendationsView,
  }))
);
const NewsView = lazy(() =>
  import("../pages/app/NewsView").then((m) => ({ default: m.NewsView }))
);
const SimulateView = lazy(() =>
  import("../pages/app/SimulateView").then((m) => ({ default: m.SimulateView }))
);
const ReportsView = lazy(() =>
  import("../pages/app/ReportsView").then((m) => ({ default: m.ReportsView }))
);
const SettingsPage = lazy(() =>
  import("../pages/app/SettingsPage").then((m) => ({ default: m.SettingsPage }))
);

// Menu Pages (Placeholder)
import { PlaceholderPage } from "../pages/app/PlaceholderPage";
import { User, Bell, Shield, HelpCircle } from "lucide-react";

/**
 * All app routes mounted at /app/*.
 * Includes login, dashboard with sidebar navigation, and menu pages.
 */
export function appRoutes() {
  return (
    <Route path="/app" element={<AppLayout />}>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route
        path="login"
        element={
          <Suspense fallback={null}>
            <LoginPage />
          </Suspense>
        }
      />

      {/* Dashboard with sidebar navigation */}
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route
          index
          element={
            <Suspense
              fallback={<LoadingScreen message="Initializing dashboard" />}
            >
              <DashboardPage />
            </Suspense>
          }
        />
        <Route
          path="portfolio"
          element={
            <Suspense fallback={<LoadingScreen message="Loading portfolio" />}>
              <PortfolioView />
            </Suspense>
          }
        />
        <Route
          path="portfolio/simulator"
          element={
            <Suspense
              fallback={<LoadingScreen message="Loading portfolio simulator" />}
            >
              <PortfolioSimulator />
            </Suspense>
          }
        />
        <Route
          path="recommendations"
          element={
            <Suspense
              fallback={<LoadingScreen message="Loading recommendations" />}
            >
              <RecommendationsView />
            </Suspense>
          }
        />
        <Route
          path="simulate"
          element={
            <Suspense fallback={<LoadingScreen message="Loading simulation" />}>
              <SimulateView />
            </Suspense>
          }
        />
        <Route
          path="reports"
          element={
            <Suspense fallback={<LoadingScreen message="Loading reports" />}>
              <ReportsView />
            </Suspense>
          }
        />
        <Route
          path="news"
          element={
            <Suspense fallback={<LoadingScreen message="Loading news" />}>
              <NewsView />
            </Suspense>
          }
        />

        {/* Menu Pages */}
        <Route
          path="profile"
          element={
            <PlaceholderPage
              icon={User}
              title="Profile"
              description="Manage your account information and preferences"
            />
          }
        />
        <Route
          path="settings"
          element={
            <Suspense fallback={<LoadingScreen message="Loading settings" />}>
              <SettingsPage />
            </Suspense>
          }
        />
        <Route
          path="notifications"
          element={
            <PlaceholderPage
              icon={Bell}
              title="Notifications"
              description="View and manage your alerts and updates"
            />
          }
        />
        <Route
          path="security"
          element={
            <PlaceholderPage
              icon={Shield}
              title="Security"
              description="Manage password, 2FA, and security settings"
            />
          }
        />
        <Route
          path="help"
          element={
            <PlaceholderPage
              icon={HelpCircle}
              title="Help & Support"
              description="Get help, FAQs, and contact support"
            />
          }
        />
      </Route>
    </Route>
  );
}
