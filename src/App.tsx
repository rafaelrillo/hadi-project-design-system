// Path: src/App.tsx
import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ShowcaseLayout } from './layouts/ShowcaseLayout';
import { Home } from './pages/Home';
import { FingHome } from './pages/FingHome';

// Loading Screen for Suspense fallback
import { LoadingScreen } from './components/atoms/LoadingScreen';

// App Layout (small, load immediately)
import { AppLayout } from './pages/app';
import { DashboardLayout } from './layouts/DashboardLayout';

// Lazy load heavy pages
const LoginPage = lazy(() => import('./pages/app/LoginPage').then(m => ({ default: m.LoginPage })));
const DashboardPage = lazy(() => import('./pages/app/DashboardPage').then(m => ({ default: m.DashboardPage })));
const PortfolioView = lazy(() => import('./pages/app/PortfolioView').then(m => ({ default: m.PortfolioView })));
const PortfolioSimulator = lazy(() => import('./pages/app/PortfolioSimulator').then(m => ({ default: m.PortfolioSimulator })));
const RecommendationsView = lazy(() => import('./pages/app/RecommendationsView').then(m => ({ default: m.RecommendationsView })));
const NewsView = lazy(() => import('./pages/app/NewsView').then(m => ({ default: m.NewsView })));

// Menu Pages (Placeholder)
import { PlaceholderPage } from './pages/app/PlaceholderPage';
import { User, Settings, Bell, Shield, HelpCircle } from 'lucide-react';

const FingShowcase = lazy(() => import('./pages/fing/FingShowcase').then(m => ({ default: m.FingShowcase })));
const Level4Showcase = lazy(() => import('./pages/fing/Level4Showcase').then(m => ({ default: m.Level4Showcase })));

// Styles (can be lazy loaded)
const BrandShowcase = lazy(() => import('./pages/styles').then(m => ({ default: m.BrandShowcase })));
const StylesButtonShowcase = lazy(() => import('./pages/styles').then(m => ({ default: m.ButtonShowcase })));
const ColorsShowcase = lazy(() => import('./pages/styles').then(m => ({ default: m.ColorsShowcase })));
const TypographyStylesShowcase = lazy(() => import('./pages/styles').then(m => ({ default: m.TypographyShowcase })));
const SpacingShowcase = lazy(() => import('./pages/styles').then(m => ({ default: m.SpacingShowcase })));
const ShadowsShowcase = lazy(() => import('./pages/styles').then(m => ({ default: m.ShadowsShowcase })));
const BorderRadiusShowcase = lazy(() => import('./pages/styles').then(m => ({ default: m.BorderRadiusShowcase })));
const IconsShowcase = lazy(() => import('./pages/styles').then(m => ({ default: m.IconsShowcase })));
const LightEngineShowcase = lazy(() => import('./pages/styles').then(m => ({ default: m.LightEngineShowcase })));
const StoneMarbleShowcase = lazy(() => import('./pages/styles').then(m => ({ default: m.StoneMarbleShowcase })));
const WordmarkShowcase = lazy(() => import('./pages/styles').then(m => ({ default: m.WordmarkShowcase })));

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

// Charts - ECharts
const ChartsShowcase = lazy(() => import('./pages/charts').then(m => ({ default: m.ChartsShowcase })));
const CandlestickChartShowcase = lazy(() => import('./pages/charts').then(m => ({ default: m.CandlestickChartShowcase })));
const LineChartShowcase = lazy(() => import('./pages/charts').then(m => ({ default: m.LineChartShowcase })));
const BarChartShowcase = lazy(() => import('./pages/charts').then(m => ({ default: m.BarChartShowcase })));
const PieChartShowcase = lazy(() => import('./pages/charts').then(m => ({ default: m.PieChartShowcase })));
const RadarChartShowcase = lazy(() => import('./pages/charts').then(m => ({ default: m.RadarChartShowcase })));
const GaugeChartShowcase = lazy(() => import('./pages/charts').then(m => ({ default: m.GaugeChartShowcase })));
const SunburstChartShowcase = lazy(() => import('./pages/charts').then(m => ({ default: m.SunburstChartShowcase })));
const TreeMapShowcase = lazy(() => import('./pages/charts').then(m => ({ default: m.TreeMapShowcase })));
const HeatMapShowcase = lazy(() => import('./pages/charts').then(m => ({ default: m.HeatMapShowcase })));
const ScatterChartShowcase = lazy(() => import('./pages/charts').then(m => ({ default: m.ScatterChartShowcase })));
const SankeyChartShowcase = lazy(() => import('./pages/charts').then(m => ({ default: m.SankeyChartShowcase })));
const FunnelChartShowcase = lazy(() => import('./pages/charts').then(m => ({ default: m.FunnelChartShowcase })));
const GraphChartShowcase = lazy(() => import('./pages/charts').then(m => ({ default: m.GraphChartShowcase })));
const CalendarChartShowcase = lazy(() => import('./pages/charts').then(m => ({ default: m.CalendarChartShowcase })));
const BoxplotChartShowcase = lazy(() => import('./pages/charts').then(m => ({ default: m.BoxplotChartShowcase })));
const ThemeRiverChartShowcase = lazy(() => import('./pages/charts').then(m => ({ default: m.ThemeRiverChartShowcase })));
const ParallelChartShowcase = lazy(() => import('./pages/charts').then(m => ({ default: m.ParallelChartShowcase })));
const TreeChartShowcase = lazy(() => import('./pages/charts').then(m => ({ default: m.TreeChartShowcase })));
const EffectScatterChartShowcase = lazy(() => import('./pages/charts').then(m => ({ default: m.EffectScatterChartShowcase })));
const PictorialBarChartShowcase = lazy(() => import('./pages/charts').then(m => ({ default: m.PictorialBarChartShowcase })));

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
      color: 'var(--fing-text-tertiary)',
      fontFamily: 'var(--fing-font-mono)',
      fontSize: '14px',
    }}>
      Loading...
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* FING Home Page - Root */}
      <Route path="/" element={<FingHome />} />

      {/* FING App - Investment Analysis Application */}
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="login" element={
          <Suspense fallback={null}>
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
          <Route path="portfolio/simulator" element={
            <Suspense fallback={<LoadingScreen message="Loading portfolio simulator" />}>
              <PortfolioSimulator />
            </Suspense>
          } />
          <Route path="recommendations" element={
            <Suspense fallback={<LoadingScreen message="Loading recommendations" />}>
              <RecommendationsView />
            </Suspense>
          } />
          <Route path="news" element={
            <Suspense fallback={<LoadingScreen message="Loading news" />}>
              <NewsView />
            </Suspense>
          } />

          {/* Menu Pages */}
          <Route path="profile" element={
            <PlaceholderPage
              icon={User}
              title="Profile"
              description="Manage your account information and preferences"
            />
          } />
          <Route path="settings" element={
            <PlaceholderPage
              icon={Settings}
              title="Settings"
              description="Configure app settings and notifications"
            />
          } />
          <Route path="notifications" element={
            <PlaceholderPage
              icon={Bell}
              title="Notifications"
              description="View and manage your alerts and updates"
            />
          } />
          <Route path="security" element={
            <PlaceholderPage
              icon={Shield}
              title="Security"
              description="Manage password, 2FA, and security settings"
            />
          } />
          <Route path="help" element={
            <PlaceholderPage
              icon={HelpCircle}
              title="Help & Support"
              description="Get help, FAQs, and contact support"
            />
          } />
        </Route>
      </Route>

      {/* FING Showcase - Standalone */}
      <Route path="/showcase/fing" element={
        <Suspense fallback={<LoadingScreen message="Loading showcase" />}>
          <FingShowcase />
        </Suspense>
      } />
      <Route path="/showcase/fing/level4" element={
        <Suspense fallback={<LoadingScreen message="Loading showcase" />}>
          <Level4Showcase />
        </Suspense>
      } />

      {/* Showcase Layout Routes */}
      <Route path="/showcase" element={<ShowcaseLayout />}>
        <Route index element={<Home />} />

        {/* Styles */}
        <Route path="styles/brand" element={<Suspense fallback={<ShowcaseLoader />}><BrandShowcase /></Suspense>} />
        <Route path="styles/colors" element={<Suspense fallback={<ShowcaseLoader />}><ColorsShowcase /></Suspense>} />
        <Route path="styles/typography" element={<Suspense fallback={<ShowcaseLoader />}><TypographyStylesShowcase /></Suspense>} />
        <Route path="styles/spacing" element={<Suspense fallback={<ShowcaseLoader />}><SpacingShowcase /></Suspense>} />
        <Route path="styles/shadows" element={<Suspense fallback={<ShowcaseLoader />}><ShadowsShowcase /></Suspense>} />
        <Route path="styles/border-radius" element={<Suspense fallback={<ShowcaseLoader />}><BorderRadiusShowcase /></Suspense>} />
        <Route path="styles/icons" element={<Suspense fallback={<ShowcaseLoader />}><IconsShowcase /></Suspense>} />
        <Route path="styles/light-engine" element={<Suspense fallback={<ShowcaseLoader />}><LightEngineShowcase /></Suspense>} />
        <Route path="styles/stone-marble" element={<Suspense fallback={<ShowcaseLoader />}><StoneMarbleShowcase /></Suspense>} />
        <Route path="styles/wordmark" element={<Suspense fallback={<ShowcaseLoader />}><WordmarkShowcase /></Suspense>} />
        <Route path="styles/buttons" element={<Suspense fallback={<ShowcaseLoader />}><StylesButtonShowcase /></Suspense>} />

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

        {/* Charts - ECharts */}
        <Route path="charts" element={<Suspense fallback={<ShowcaseLoader />}><ChartsShowcase /></Suspense>} />
        <Route path="charts/candlestick" element={<Suspense fallback={<ShowcaseLoader />}><CandlestickChartShowcase /></Suspense>} />
        <Route path="charts/line" element={<Suspense fallback={<ShowcaseLoader />}><LineChartShowcase /></Suspense>} />
        <Route path="charts/bar" element={<Suspense fallback={<ShowcaseLoader />}><BarChartShowcase /></Suspense>} />
        <Route path="charts/pie" element={<Suspense fallback={<ShowcaseLoader />}><PieChartShowcase /></Suspense>} />
        <Route path="charts/radar" element={<Suspense fallback={<ShowcaseLoader />}><RadarChartShowcase /></Suspense>} />
        <Route path="charts/gauge" element={<Suspense fallback={<ShowcaseLoader />}><GaugeChartShowcase /></Suspense>} />
        <Route path="charts/sunburst" element={<Suspense fallback={<ShowcaseLoader />}><SunburstChartShowcase /></Suspense>} />
        <Route path="charts/treemap" element={<Suspense fallback={<ShowcaseLoader />}><TreeMapShowcase /></Suspense>} />
        <Route path="charts/heatmap" element={<Suspense fallback={<ShowcaseLoader />}><HeatMapShowcase /></Suspense>} />
        <Route path="charts/scatter" element={<Suspense fallback={<ShowcaseLoader />}><ScatterChartShowcase /></Suspense>} />
        <Route path="charts/sankey" element={<Suspense fallback={<ShowcaseLoader />}><SankeyChartShowcase /></Suspense>} />
        <Route path="charts/funnel" element={<Suspense fallback={<ShowcaseLoader />}><FunnelChartShowcase /></Suspense>} />
        <Route path="charts/graph" element={<Suspense fallback={<ShowcaseLoader />}><GraphChartShowcase /></Suspense>} />
        <Route path="charts/calendar" element={<Suspense fallback={<ShowcaseLoader />}><CalendarChartShowcase /></Suspense>} />
        <Route path="charts/boxplot" element={<Suspense fallback={<ShowcaseLoader />}><BoxplotChartShowcase /></Suspense>} />
        <Route path="charts/themeriver" element={<Suspense fallback={<ShowcaseLoader />}><ThemeRiverChartShowcase /></Suspense>} />
        <Route path="charts/parallel" element={<Suspense fallback={<ShowcaseLoader />}><ParallelChartShowcase /></Suspense>} />
        <Route path="charts/tree" element={<Suspense fallback={<ShowcaseLoader />}><TreeChartShowcase /></Suspense>} />
        <Route path="charts/effectscatter" element={<Suspense fallback={<ShowcaseLoader />}><EffectScatterChartShowcase /></Suspense>} />
        <Route path="charts/pictorialbar" element={<Suspense fallback={<ShowcaseLoader />}><PictorialBarChartShowcase /></Suspense>} />

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
