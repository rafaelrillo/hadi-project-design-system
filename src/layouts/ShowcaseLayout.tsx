// Path: src/layouts/ShowcaseLayout.tsx
import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FingEmblem } from '@/components/atoms/FingEmblem';
import { SidebarGroup } from '../components/showcase';
import {
  Home,
  Square,
  Type,
  CheckSquare,
  Tag,
  FileText,
  Lightbulb,
  CreditCard,
  List,
  Menu,
  ArrowLeftRight,
  Bell,
  Search,
  BarChart3,
  PanelLeft,
  Box,
  Filter,
  Table2,
  SquareStack,
  FileCheck,
  Layers,
  Palette,
  Ruler,
  Copy,
  Circle,
  Image,
  LineChart,
  Sparkles,
  MousePointer,
  Move,
  ScrollText,
  LayoutGrid,
  Gauge,
  LayoutDashboard,
  MessageSquare,
  Sun,
  Gem,
  Fingerprint
} from 'lucide-react';

export function ShowcaseLayout() {
  const location = useLocation();
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  // Detectar qué grupo debe estar abierto basándose en la ruta actual
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/showcase/styles')) {
      setExpandedGroup('styles');
    } else if (path.includes('/showcase/atoms')) {
      setExpandedGroup('atoms');
    } else if (path.includes('/showcase/molecules')) {
      setExpandedGroup('molecules');
    } else if (path.includes('/showcase/organisms')) {
      setExpandedGroup('organisms');
    } else if (path.includes('/showcase/charts')) {
      setExpandedGroup('charts');
    } else if (path.includes('/showcase/animations')) {
      setExpandedGroup('animations');
    } else {
      setExpandedGroup(null);
    }
  }, [location.pathname]);

  const handleToggleGroup = (group: string) => {
    setExpandedGroup(expandedGroup === group ? null : group);
  };

  const layoutStyles: React.CSSProperties = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: 'transparent',
    fontFamily: 'var(--sentinel-font-primary)'
  };

  const sidebarStyles: React.CSSProperties = {
    width: '280px',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRight: '1px solid rgba(255, 255, 255, 0.8)',
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100vh',
    overflowY: 'auto',
    zIndex: 100,
    boxShadow: '4px 0 24px var(--shadow-dark)'
  };

  const logoContainerStyles: React.CSSProperties = {
    padding: '20px 16px',
    borderBottom: '1px solid var(--sentinel-border-subtle)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  };

  const logoSvgContainerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const logoTextStyles: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 400,
    color: 'var(--sentinel-text-primary)',
    margin: 0,
    fontFamily: 'var(--sentinel-font-primary)',
    letterSpacing: '0.15em'
  };

  const versionStyles: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 400,
    color: 'var(--sentinel-text-tertiary)',
    margin: 0,
    fontFamily: 'var(--sentinel-font-mono)'
  };

  const navStyles: React.CSSProperties = {
    padding: '16px 0'
  };

  const homeItemStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 16px',
    color: 'var(--sentinel-text-primary)',
    textDecoration: 'none',
    fontFamily: 'var(--sentinel-font-primary)',
    fontSize: '14px',
    fontWeight: 500,
    transition: 'all 200ms',
    borderLeft: '3px solid transparent'
  };

  const contentStyles: React.CSSProperties = {
    marginLeft: '280px',
    flex: 1,
    padding: '40px',
    minHeight: '100vh',
    backgroundColor: 'transparent'
  };

  const atomsItems = [
    { path: '/showcase/atoms/button', label: 'Button', icon: Square },
    { path: '/showcase/atoms/input', label: 'Input', icon: Type },
    { path: '/showcase/atoms/checkbox', label: 'Checkbox', icon: CheckSquare },
    { path: '/showcase/atoms/badge', label: 'Badge', icon: Tag },
    { path: '/showcase/atoms/typography', label: 'Typography', icon: FileText },
    { path: '/showcase/atoms/icon-tooltip', label: 'Icon & Tooltip', icon: Lightbulb }
  ];

  const moleculesItems = [
    { path: '/showcase/molecules/card', label: 'Card', icon: CreditCard },
    { path: '/showcase/molecules/form-field', label: 'FormField', icon: FileCheck },
    { path: '/showcase/molecules/menu-item', label: 'MenuItem', icon: List },
    { path: '/showcase/molecules/sidebar-item', label: 'SidebarItem', icon: Menu },
    { path: '/showcase/molecules/pagination', label: 'Pagination', icon: ArrowLeftRight },
    { path: '/showcase/molecules/notification-card', label: 'NotificationCard', icon: Bell },
    { path: '/showcase/molecules/search-bar', label: 'SearchBar', icon: Search },
    { path: '/showcase/molecules/searchbar-item', label: 'SearchbarItem', icon: Filter },
    { path: '/showcase/molecules/metric-card', label: 'MetricCard', icon: Gauge }
  ];

  const organismsItems = [
    { path: '/showcase/organisms/sidebar', label: 'Sidebar', icon: PanelLeft },
    { path: '/showcase/organisms/searchbar', label: 'Searchbar', icon: Search },
    { path: '/showcase/organisms/table', label: 'Table', icon: Table2 },
    { path: '/showcase/organisms/modal', label: 'Modal', icon: SquareStack },
    { path: '/showcase/organisms/form', label: 'Form', icon: FileCheck },
    { path: '/showcase/organisms/paginated-table', label: 'PaginatedTable', icon: Layers },
    { path: '/showcase/organisms/data-grid', label: 'DataGrid', icon: LayoutDashboard },
    { path: '/showcase/organisms/toast', label: 'Toast', icon: MessageSquare }
  ];

  const stylesItems = [
    { path: '/showcase/styles/brand', label: 'Brand', icon: Fingerprint },
    { path: '/showcase/styles/wordmark', label: 'Wordmark', icon: Type },
    { path: '/showcase/styles/buttons', label: 'Buttons', icon: SquareStack },
    { path: '/showcase/styles/colors', label: 'Colors', icon: Palette },
    { path: '/showcase/styles/typography', label: 'Typography', icon: Type },
    { path: '/showcase/styles/spacing', label: 'Spacing', icon: Ruler },
    { path: '/showcase/styles/shadows', label: 'Shadows', icon: Copy },
    { path: '/showcase/styles/border-radius', label: 'Border Radius', icon: Circle },
    { path: '/showcase/styles/icons', label: 'Icons', icon: Image },
    { path: '/showcase/styles/stone-marble', label: 'Stone Marble', icon: Gem }
  ];

  // Charts - ECharts
  const chartsItems = [
    { path: '/showcase/charts', label: 'Overview', icon: LineChart },
    // Financial
    { path: '/showcase/charts/candlestick', label: 'Candlestick', icon: LineChart },
    { path: '/showcase/charts/line', label: 'Line', icon: LineChart },
    { path: '/showcase/charts/bar', label: 'Bar', icon: LineChart },
    // Circular
    { path: '/showcase/charts/pie', label: 'Pie', icon: LineChart },
    { path: '/showcase/charts/radar', label: 'Radar', icon: LineChart },
    { path: '/showcase/charts/gauge', label: 'Gauge', icon: Gauge },
    { path: '/showcase/charts/sunburst', label: 'Sunburst', icon: LineChart },
    // Comparison
    { path: '/showcase/charts/treemap', label: 'TreeMap', icon: LineChart },
    { path: '/showcase/charts/heatmap', label: 'HeatMap', icon: LineChart },
    { path: '/showcase/charts/scatter', label: 'Scatter', icon: LineChart },
    // Flow
    { path: '/showcase/charts/sankey', label: 'Sankey', icon: LineChart },
    { path: '/showcase/charts/funnel', label: 'Funnel', icon: LineChart },
    { path: '/showcase/charts/graph', label: 'Graph', icon: LineChart },
    // Time & Stats
    { path: '/showcase/charts/calendar', label: 'Calendar', icon: LineChart },
    { path: '/showcase/charts/boxplot', label: 'Boxplot', icon: LineChart },
    // Advanced
    { path: '/showcase/charts/themeriver', label: 'ThemeRiver', icon: LineChart },
    { path: '/showcase/charts/parallel', label: 'Parallel', icon: LineChart },
    { path: '/showcase/charts/tree', label: 'Tree', icon: LineChart },
    { path: '/showcase/charts/effectscatter', label: 'EffectScatter', icon: LineChart },
    { path: '/showcase/charts/pictorialbar', label: 'PictorialBar', icon: LineChart },
  ];

  const animationsItems = [
    { path: '/showcase/animations', label: 'Overview', icon: Sparkles },
    { path: '/showcase/animations/hover', label: 'Hover & Tap', icon: MousePointer },
    { path: '/showcase/animations/entry', label: 'Entry', icon: LayoutGrid },
    { path: '/showcase/animations/scroll', label: 'Scroll', icon: ScrollText },
    { path: '/showcase/animations/layout', label: 'Layout', icon: Layers },
    { path: '/showcase/animations/drag', label: 'Drag', icon: Move }
  ];

  return (
    <div style={layoutStyles}>
      {/* Sidebar */}
      <aside style={sidebarStyles}>
        {/* Logo */}
        <div style={logoContainerStyles}>
          <div style={logoSvgContainerStyles}>
            <FingEmblem size={36} animation="breathe" />
            <h1 style={logoTextStyles}>SENTINEL</h1>
          </div>
          <p style={versionStyles}>Design System v2.0</p>
        </div>

        {/* Navigation */}
        <nav style={navStyles}>
          {/* Home */}
          <Link
            to="/"
            style={homeItemStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--sentinel-bg-subtle)';
              e.currentTarget.style.borderLeftColor = 'var(--sentinel-accent-primary)';
              e.currentTarget.style.color = 'var(--sentinel-accent-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderLeftColor = 'transparent';
              e.currentTarget.style.color = 'var(--sentinel-text-primary)';
            }}
          >
            <Home size={18} />
            <span>Home</span>
          </Link>

          {/* Light Engine Demo */}
          <Link
            to="/showcase"
            style={homeItemStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--sentinel-bg-subtle)';
              e.currentTarget.style.borderLeftColor = 'var(--sentinel-accent-primary)';
              e.currentTarget.style.color = 'var(--sentinel-accent-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderLeftColor = 'transparent';
              e.currentTarget.style.color = 'var(--sentinel-text-primary)';
            }}
          >
            <Sun size={18} />
            <span>Light Engine</span>
          </Link>

          {/* SENTINEL Components Link */}
          <Link
            to="/showcase/sentinel"
            style={{
              ...homeItemStyles,
              color: 'var(--sentinel-accent-primary)',
              fontWeight: 600
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--sentinel-bg-subtle)';
              e.currentTarget.style.borderLeftColor = 'var(--sentinel-accent-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderLeftColor = 'transparent';
            }}
          >
            <BarChart3 size={18} />
            <span>SENTINEL Components</span>
          </Link>

          {/* Styles Group */}
          <SidebarGroup
            title="Styles"
            icon={Palette}
            items={stylesItems}
            isExpanded={expandedGroup === 'styles'}
            onToggle={() => handleToggleGroup('styles')}
          />

          {/* Atoms Group */}
          <SidebarGroup
            title="Atoms"
            icon={Box}
            items={atomsItems}
            isExpanded={expandedGroup === 'atoms'}
            onToggle={() => handleToggleGroup('atoms')}
          />

          {/* Molecules Group */}
          <SidebarGroup
            title="Molecules"
            icon={Layers}
            items={moleculesItems}
            isExpanded={expandedGroup === 'molecules'}
            onToggle={() => handleToggleGroup('molecules')}
          />

          {/* Organisms Group */}
          <SidebarGroup
            title="Organisms"
            icon={BarChart3}
            items={organismsItems}
            isExpanded={expandedGroup === 'organisms'}
            onToggle={() => handleToggleGroup('organisms')}
          />

          {/* Charts Group */}
          <SidebarGroup
            title="Charts"
            icon={LineChart}
            items={chartsItems}
            isExpanded={expandedGroup === 'charts'}
            onToggle={() => handleToggleGroup('charts')}
          />

          {/* Animations Group */}
          <SidebarGroup
            title="Animations"
            icon={Sparkles}
            items={animationsItems}
            isExpanded={expandedGroup === 'animations'}
            onToggle={() => handleToggleGroup('animations')}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main style={contentStyles}>
        <Outlet />
      </main>
    </div>
  );
}
