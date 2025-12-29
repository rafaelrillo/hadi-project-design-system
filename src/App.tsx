// Path: src/App.tsx
import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ShowcaseLayout } from './layouts/ShowcaseLayout';
import { Home } from './pages/Home';
import { Landing } from './pages/Landing';

// Loading Screen for Suspense fallback
import { LoadingScreen } from './components/atoms/LoadingScreen';

// App Layout (small, load immediately)
import { AppLayout } from './pages/app';
import { DashboardLayout } from './layouts/DashboardLayout';

// Lazy load heavy pages
const LoginPage = lazy(() => import('./pages/app/LoginPage').then(m => ({ default: m.LoginPage })));
const DashboardPage = lazy(() => import('./pages/app/DashboardPage').then(m => ({ default: m.DashboardPage })));
const PortfolioView = lazy(() => import('./pages/app/PortfolioView').then(m => ({ default: m.PortfolioView })));
const PortfolioBuilder = lazy(() => import('./pages/app/PortfolioBuilder').then(m => ({ default: m.PortfolioBuilder })));
const RecommendationsView = lazy(() => import('./pages/app/RecommendationsView').then(m => ({ default: m.RecommendationsView })));
const WalletView = lazy(() => import('./pages/app/WalletView').then(m => ({ default: m.WalletView })));
const NewsView = lazy(() => import('./pages/app/NewsView').then(m => ({ default: m.NewsView })));
const ChatView = lazy(() => import('./pages/app/ChatView').then(m => ({ default: m.ChatView })));
const SentinelShowcase = lazy(() => import('./pages/sentinel/SentinelShowcase').then(m => ({ default: m.SentinelShowcase })));
const Level4Showcase = lazy(() => import('./pages/sentinel/Level4Showcase').then(m => ({ default: m.Level4Showcase })));

// Styles (can be lazy loaded)
const ColorsShowcase = lazy(() => import('./pages/styles').then(m => ({ default: m.ColorsShowcase })));
const TypographyStylesShowcase = lazy(() => import('./pages/styles').then(m => ({ default: m.TypographyShowcase })));
const SpacingShowcase = lazy(() => import('./pages/styles').then(m => ({ default: m.SpacingShowcase })));
const ShadowsShowcase = lazy(() => import('./pages/styles').then(m => ({ default: m.ShadowsShowcase })));
const BorderRadiusShowcase = lazy(() => import('./pages/styles').then(m => ({ default: m.BorderRadiusShowcase })));
const IconsShowcase = lazy(() => import('./pages/styles').then(m => ({ default: m.IconsShowcase })));

// Atoms
const ButtonShowcase = lazy(() => import('./pages/atoms/ButtonShowcase').then(m => ({ default: m.ButtonShowcase })));
const InputShowcase = lazy(() => import('./pages/atoms/InputShowcase').then(m => ({ default: m.InputShowcase })));
const CheckboxShowcase = lazy(() => import('./pages/atoms/CheckboxShowcase').then(m => ({ default: m.CheckboxShowcase })));
const BadgeShowcase = lazy(() => import('./pages/atoms/BadgeShowcase').then(m => ({ default: m.BadgeShowcase })));
const TypographyShowcase = lazy(() => import('./pages/atoms/TypographyShowcase').then(m => ({ default: m.TypographyShowcase })));
const IconTooltipShowcase = lazy(() => import('./pages/atoms/IconTooltipShowcase').then(m => ({ default: m.IconTooltipShowcase })));

// Molecules
const CardShowcase = lazy(() => import('./pages/molecules/CardShowcase').then(m => ({ default: m.CardShowcase })));
const FormFieldShowcase = lazy(() => import('./pages/molecules/FormFieldShowcase').then(m => ({ default: m.FormFieldShowcase })));
const MenuItemShowcase = lazy(() => import('./pages/molecules/MenuItemShowcase').then(m => ({ default: m.MenuItemShowcase })));
const SidebarItemShowcase = lazy(() => import('./pages/molecules/SidebarItemShowcase').then(m => ({ default: m.SidebarItemShowcase })));
const NotificationCardShowcase = lazy(() => import('./pages/molecules/NotificationCardShowcase').then(m => ({ default: m.NotificationCardShowcase })));
const PaginationShowcase = lazy(() => import('./pages/molecules/PaginationShowcase').then(m => ({ default: m.PaginationShowcase })));
const SearchBarShowcase = lazy(() => import('./pages/molecules/SearchBarShowcase').then(m => ({ default: m.SearchBarShowcase })));
const SearchbarItemShowcase = lazy(() => import('./pages/molecules/SearchbarItemShowcase').then(m => ({ default: m.SearchbarItemShowcase })));
const MetricCardShowcase = lazy(() => import('./pages/molecules/MetricCardShowcase').then(m => ({ default: m.MetricCardShowcase })));

// Organisms
const TableShowcase = lazy(() => import('./pages/organisms/TableShowcase').then(m => ({ default: m.TableShowcase })));
const SidebarShowcase = lazy(() => import('./pages/organisms/SidebarShowcase').then(m => ({ default: m.SidebarShowcase })));
const SearchbarShowcase = lazy(() => import('./pages/organisms/SearchbarShowcase').then(m => ({ default: m.SearchbarShowcase })));
const ModalShowcase = lazy(() => import('./pages/organisms/ModalShowcase').then(m => ({ default: m.ModalShowcase })));
const FormShowcase = lazy(() => import('./pages/organisms/FormShowcase').then(m => ({ default: m.FormShowcase })));
const PaginatedTableShowcase = lazy(() => import('./pages/organisms/PaginatedTableShowcase').then(m => ({ default: m.PaginatedTableShowcase })));
const DataGridShowcase = lazy(() => import('./pages/organisms/DataGridShowcase').then(m => ({ default: m.DataGridShowcase })));
const ToastShowcase = lazy(() => import('./pages/organisms/ToastShowcase').then(m => ({ default: m.ToastShowcase })));

// Charts (heavy - always lazy)
const ChartsShowcase = lazy(() => import('./pages/charts').then(m => ({ default: m.ChartsShowcase })));
const LineChartsShowcase = lazy(() => import('./pages/charts').then(m => ({ default: m.LineChartsShowcase })));
const ComparisonChartsShowcase = lazy(() => import('./pages/charts').then(m => ({ default: m.ComparisonChartsShowcase })));
const ProgressChartsShowcase = lazy(() => import('./pages/charts').then(m => ({ default: m.ProgressChartsShowcase })));
const DistributionChartsShowcase = lazy(() => import('./pages/charts').then(m => ({ default: m.DistributionChartsShowcase })));
const FlowChartsShowcase = lazy(() => import('./pages/charts').then(m => ({ default: m.FlowChartsShowcase })));
const CorrelationChartsShowcase = lazy(() => import('./pages/charts').then(m => ({ default: m.CorrelationChartsShowcase })));

// Animations
const AnimationsShowcase = lazy(() => import('./pages/animations').then(m => ({ default: m.AnimationsShowcase })));
const HoverAnimationsShowcase = lazy(() => import('./pages/animations').then(m => ({ default: m.HoverAnimationsShowcase })));
const EntryAnimationsShowcase = lazy(() => import('./pages/animations').then(m => ({ default: m.EntryAnimationsShowcase })));
const ScrollAnimationsShowcase = lazy(() => import('./pages/animations').then(m => ({ default: m.ScrollAnimationsShowcase })));
const LayoutAnimationsShowcase = lazy(() => import('./pages/animations').then(m => ({ default: m.LayoutAnimationsShowcase })));
const DragAnimationsShowcase = lazy(() => import('./pages/animations').then(m => ({ default: m.DragAnimationsShowcase })));

// Simple loading spinner for showcase pages
function ShowcaseLoader() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '50vh',
      color: 'var(--sentinel-text-tertiary)',
      fontFamily: 'var(--sentinel-font-mono)',
      fontSize: '14px',
    }}>
      Loading...
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Landing Page - Root */}
      <Route path="/" element={<Landing />} />

      {/* SENTINEL App - Investment Analysis Application */}
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="login" element={
          <Suspense fallback={<LoadingScreen message="Loading login" />}>
            <LoginPage />
          </Suspense>
        } />

        {/* Dashboard with sidebar navigation */}
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={
            <Suspense fallback={<LoadingScreen message="Initializing dashboard" />}>
              <DashboardPage />
            </Suspense>
          } />
          <Route path="portfolio" element={
            <Suspense fallback={<LoadingScreen message="Loading portfolio" />}>
              <PortfolioView />
            </Suspense>
          } />
          <Route path="portfolio/builder" element={
            <Suspense fallback={<LoadingScreen message="Loading portfolio builder" />}>
              <PortfolioBuilder />
            </Suspense>
          } />
          <Route path="recommendations" element={
            <Suspense fallback={<LoadingScreen message="Loading recommendations" />}>
              <RecommendationsView />
            </Suspense>
          } />
          <Route path="wallet" element={
            <Suspense fallback={<LoadingScreen message="Loading wallet" />}>
              <WalletView />
            </Suspense>
          } />
          <Route path="news" element={
            <Suspense fallback={<LoadingScreen message="Loading news" />}>
              <NewsView />
            </Suspense>
          } />
          <Route path="chat" element={
            <Suspense fallback={<LoadingScreen message="Loading AI assistant" />}>
              <ChatView />
            </Suspense>
          } />
          <Route path="settings" element={
            <div style={{ padding: '24px', color: 'var(--sentinel-text-secondary)' }}>
              <h2>Settings</h2>
              <p>Coming soon...</p>
            </div>
          } />
        </Route>
      </Route>

      {/* SENTINEL Showcase - Standalone */}
      <Route path="/showcase/sentinel" element={
        <Suspense fallback={<LoadingScreen message="Loading showcase" />}>
          <SentinelShowcase />
        </Suspense>
      } />
      <Route path="/showcase/sentinel/level4" element={
        <Suspense fallback={<LoadingScreen message="Loading showcase" />}>
          <Level4Showcase />
        </Suspense>
      } />

      {/* Showcase Layout Routes */}
      <Route path="/showcase" element={<ShowcaseLayout />}>
        <Route index element={<Home />} />

        {/* Styles */}
        <Route path="styles/colors" element={<Suspense fallback={<ShowcaseLoader />}><ColorsShowcase /></Suspense>} />
        <Route path="styles/typography" element={<Suspense fallback={<ShowcaseLoader />}><TypographyStylesShowcase /></Suspense>} />
        <Route path="styles/spacing" element={<Suspense fallback={<ShowcaseLoader />}><SpacingShowcase /></Suspense>} />
        <Route path="styles/shadows" element={<Suspense fallback={<ShowcaseLoader />}><ShadowsShowcase /></Suspense>} />
        <Route path="styles/border-radius" element={<Suspense fallback={<ShowcaseLoader />}><BorderRadiusShowcase /></Suspense>} />
        <Route path="styles/icons" element={<Suspense fallback={<ShowcaseLoader />}><IconsShowcase /></Suspense>} />

        {/* Atoms */}
        <Route path="atoms/button" element={<Suspense fallback={<ShowcaseLoader />}><ButtonShowcase /></Suspense>} />
        <Route path="atoms/input" element={<Suspense fallback={<ShowcaseLoader />}><InputShowcase /></Suspense>} />
        <Route path="atoms/checkbox" element={<Suspense fallback={<ShowcaseLoader />}><CheckboxShowcase /></Suspense>} />
        <Route path="atoms/badge" element={<Suspense fallback={<ShowcaseLoader />}><BadgeShowcase /></Suspense>} />
        <Route path="atoms/typography" element={<Suspense fallback={<ShowcaseLoader />}><TypographyShowcase /></Suspense>} />
        <Route path="atoms/icon-tooltip" element={<Suspense fallback={<ShowcaseLoader />}><IconTooltipShowcase /></Suspense>} />

        {/* Molecules */}
        <Route path="molecules/card" element={<Suspense fallback={<ShowcaseLoader />}><CardShowcase /></Suspense>} />
        <Route path="molecules/form-field" element={<Suspense fallback={<ShowcaseLoader />}><FormFieldShowcase /></Suspense>} />
        <Route path="molecules/menu-item" element={<Suspense fallback={<ShowcaseLoader />}><MenuItemShowcase /></Suspense>} />
        <Route path="molecules/sidebar-item" element={<Suspense fallback={<ShowcaseLoader />}><SidebarItemShowcase /></Suspense>} />
        <Route path="molecules/pagination" element={<Suspense fallback={<ShowcaseLoader />}><PaginationShowcase /></Suspense>} />
        <Route path="molecules/notification-card" element={<Suspense fallback={<ShowcaseLoader />}><NotificationCardShowcase /></Suspense>} />
        <Route path="molecules/search-bar" element={<Suspense fallback={<ShowcaseLoader />}><SearchBarShowcase /></Suspense>} />
        <Route path="molecules/searchbar-item" element={<Suspense fallback={<ShowcaseLoader />}><SearchbarItemShowcase /></Suspense>} />
        <Route path="molecules/metric-card" element={<Suspense fallback={<ShowcaseLoader />}><MetricCardShowcase /></Suspense>} />

        {/* Organisms */}
        <Route path="organisms/sidebar" element={<Suspense fallback={<ShowcaseLoader />}><SidebarShowcase /></Suspense>} />
        <Route path="organisms/table" element={<Suspense fallback={<ShowcaseLoader />}><TableShowcase /></Suspense>} />
        <Route path="organisms/searchbar" element={<Suspense fallback={<ShowcaseLoader />}><SearchbarShowcase /></Suspense>} />
        <Route path="organisms/modal" element={<Suspense fallback={<ShowcaseLoader />}><ModalShowcase /></Suspense>} />
        <Route path="organisms/form" element={<Suspense fallback={<ShowcaseLoader />}><FormShowcase /></Suspense>} />
        <Route path="organisms/paginated-table" element={<Suspense fallback={<ShowcaseLoader />}><PaginatedTableShowcase /></Suspense>} />
        <Route path="organisms/data-grid" element={<Suspense fallback={<ShowcaseLoader />}><DataGridShowcase /></Suspense>} />
        <Route path="organisms/toast" element={<Suspense fallback={<ShowcaseLoader />}><ToastShowcase /></Suspense>} />

        {/* Charts */}
        <Route path="charts" element={<Suspense fallback={<ShowcaseLoader />}><ChartsShowcase /></Suspense>} />
        <Route path="charts/line" element={<Suspense fallback={<ShowcaseLoader />}><LineChartsShowcase /></Suspense>} />
        <Route path="charts/comparison" element={<Suspense fallback={<ShowcaseLoader />}><ComparisonChartsShowcase /></Suspense>} />
        <Route path="charts/progress" element={<Suspense fallback={<ShowcaseLoader />}><ProgressChartsShowcase /></Suspense>} />
        <Route path="charts/distribution" element={<Suspense fallback={<ShowcaseLoader />}><DistributionChartsShowcase /></Suspense>} />
        <Route path="charts/flow" element={<Suspense fallback={<ShowcaseLoader />}><FlowChartsShowcase /></Suspense>} />
        <Route path="charts/correlation" element={<Suspense fallback={<ShowcaseLoader />}><CorrelationChartsShowcase /></Suspense>} />

        {/* Animations */}
        <Route path="animations" element={<Suspense fallback={<ShowcaseLoader />}><AnimationsShowcase /></Suspense>} />
        <Route path="animations/hover" element={<Suspense fallback={<ShowcaseLoader />}><HoverAnimationsShowcase /></Suspense>} />
        <Route path="animations/entry" element={<Suspense fallback={<ShowcaseLoader />}><EntryAnimationsShowcase /></Suspense>} />
        <Route path="animations/scroll" element={<Suspense fallback={<ShowcaseLoader />}><ScrollAnimationsShowcase /></Suspense>} />
        <Route path="animations/layout" element={<Suspense fallback={<ShowcaseLoader />}><LayoutAnimationsShowcase /></Suspense>} />
        <Route path="animations/drag" element={<Suspense fallback={<ShowcaseLoader />}><DragAnimationsShowcase /></Suspense>} />
      </Route>
    </Routes>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
