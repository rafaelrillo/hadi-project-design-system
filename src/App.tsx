// Path: src/App.tsx
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ShowcaseLayout } from './layouts/ShowcaseLayout';
import { Home } from './pages/Home';

// Styles
import {
  ColorsShowcase,
  TypographyShowcase as TypographyStylesShowcase,
  SpacingShowcase,
  ShadowsShowcase,
  BorderRadiusShowcase,
  IconsShowcase
} from './pages/styles';

// Atoms
import { ButtonShowcase } from './pages/atoms/ButtonShowcase';
import { InputShowcase } from './pages/atoms/InputShowcase';
import { CheckboxShowcase } from './pages/atoms/CheckboxShowcase';
import { BadgeShowcase } from './pages/atoms/BadgeShowcase';
import { TypographyShowcase } from './pages/atoms/TypographyShowcase';
import { IconTooltipShowcase } from './pages/atoms/IconTooltipShowcase';

// Molecules
import { CardShowcase } from './pages/molecules/CardShowcase';
import { FormFieldShowcase } from './pages/molecules/FormFieldShowcase';
import { MenuItemShowcase } from './pages/molecules/MenuItemShowcase';
import { SidebarItemShowcase } from './pages/molecules/SidebarItemShowcase';
import { NotificationCardShowcase } from './pages/molecules/NotificationCardShowcase';
import { PaginationShowcase } from './pages/molecules/PaginationShowcase';
import { SearchBarShowcase } from './pages/molecules/SearchBarShowcase';
import { SearchbarItemShowcase } from './pages/molecules/SearchbarItemShowcase';

// Organisms
import { TableShowcase } from './pages/organisms/TableShowcase';
import { SidebarShowcase } from './pages/organisms/SidebarShowcase';
import { SearchbarShowcase } from './pages/organisms/SearchbarShowcase';
import { ModalShowcase } from './pages/organisms/ModalShowcase';
import { FormShowcase } from './pages/organisms/FormShowcase';
import { PaginatedTableShowcase } from './pages/organisms/PaginatedTableShowcase';

// Charts
import {
  ChartsShowcase,
  LineChartsShowcase,
  ComparisonChartsShowcase,
  ProgressChartsShowcase,
  DistributionChartsShowcase,
  FlowChartsShowcase,
  CorrelationChartsShowcase
} from './pages/charts';

// Animations
import {
  AnimationsShowcase,
  HoverAnimationsShowcase,
  EntryAnimationsShowcase,
  ScrollAnimationsShowcase,
  LayoutAnimationsShowcase,
  DragAnimationsShowcase
} from './pages/animations';

// Componente para redirigir al home al cargar la app
function RedirectToHome() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
    }
  }, []);

  return null;
}

function AppRoutes() {
  return (
    <>
      <RedirectToHome />
      <Routes>
        <Route path="/" element={<ShowcaseLayout />}>
          <Route index element={<Home />} />

          {/* Styles */}
          <Route path="styles/colors" element={<ColorsShowcase />} />
          <Route path="styles/typography" element={<TypographyStylesShowcase />} />
          <Route path="styles/spacing" element={<SpacingShowcase />} />
          <Route path="styles/shadows" element={<ShadowsShowcase />} />
          <Route path="styles/border-radius" element={<BorderRadiusShowcase />} />
          <Route path="styles/icons" element={<IconsShowcase />} />

          {/* Atoms */}
          <Route path="atoms/button" element={<ButtonShowcase />} />
          <Route path="atoms/input" element={<InputShowcase />} />
          <Route path="atoms/checkbox" element={<CheckboxShowcase />} />
          <Route path="atoms/badge" element={<BadgeShowcase />} />
          <Route path="atoms/typography" element={<TypographyShowcase />} />
          <Route path="atoms/icon-tooltip" element={<IconTooltipShowcase />} />

          {/* Molecules */}
          <Route path="molecules/card" element={<CardShowcase />} />
          <Route path="molecules/form-field" element={<FormFieldShowcase />} />
          <Route path="molecules/menu-item" element={<MenuItemShowcase />} />
          <Route path="molecules/sidebar-item" element={<SidebarItemShowcase />} />
          <Route path="molecules/pagination" element={<PaginationShowcase />} />
          <Route path="molecules/notification-card" element={<NotificationCardShowcase />} />
          <Route path="molecules/search-bar" element={<SearchBarShowcase />} />
          <Route path="molecules/searchbar-item" element={<SearchbarItemShowcase />} />

          {/* Organisms */}
          <Route path="organisms/sidebar" element={<SidebarShowcase />} />
          <Route path="organisms/table" element={<TableShowcase />} />
          <Route path="organisms/searchbar" element={<SearchbarShowcase />} />
          <Route path="organisms/modal" element={<ModalShowcase />} />
          <Route path="organisms/form" element={<FormShowcase />} />
          <Route path="organisms/paginated-table" element={<PaginatedTableShowcase />} />

          {/* Charts */}
          <Route path="charts" element={<ChartsShowcase />} />
          <Route path="charts/line" element={<LineChartsShowcase />} />
          <Route path="charts/comparison" element={<ComparisonChartsShowcase />} />
          <Route path="charts/progress" element={<ProgressChartsShowcase />} />
          <Route path="charts/distribution" element={<DistributionChartsShowcase />} />
          <Route path="charts/flow" element={<FlowChartsShowcase />} />
          <Route path="charts/correlation" element={<CorrelationChartsShowcase />} />

          {/* Animations */}
          <Route path="animations" element={<AnimationsShowcase />} />
          <Route path="animations/hover" element={<HoverAnimationsShowcase />} />
          <Route path="animations/entry" element={<EntryAnimationsShowcase />} />
          <Route path="animations/scroll" element={<ScrollAnimationsShowcase />} />
          <Route path="animations/layout" element={<LayoutAnimationsShowcase />} />
          <Route path="animations/drag" element={<DragAnimationsShowcase />} />
        </Route>
      </Routes>
    </>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
