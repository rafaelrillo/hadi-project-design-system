// Path: src/layouts/ShowcaseLayout.tsx
import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
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
  Terminal,
  LineChart,
  Sparkles,
  Zap,
  MousePointer,
  Move,
  ScrollText,
  LayoutGrid,
  Network,
  Activity,
  Target,
  Grid3X3,
  TrendingUp,
  PieChart,
  Keyboard
} from 'lucide-react';
import { GlitchText } from '../components/terminal/GlitchText/GlitchText';

export function ShowcaseLayout() {
  const location = useLocation();
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  // Detectar qué grupo debe estar abierto basándose en la ruta actual
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/styles')) {
      setExpandedGroup('styles');
    } else if (path.startsWith('/atoms')) {
      setExpandedGroup('atoms');
    } else if (path.startsWith('/molecules')) {
      setExpandedGroup('molecules');
    } else if (path.startsWith('/organisms')) {
      setExpandedGroup('organisms');
    } else if (path.startsWith('/terminal')) {
      setExpandedGroup('terminal');
    } else if (path.startsWith('/charts')) {
      setExpandedGroup('charts');
    } else if (path.startsWith('/animations')) {
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
    backgroundColor: 'var(--background)',
    fontFamily: 'var(--font-mono)'
  };

  const sidebarStyles: React.CSSProperties = {
    width: '280px',
    backgroundColor: 'var(--background-secondary)',
    borderRight: '1px solid var(--border)',
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100vh',
    overflowY: 'auto',
    zIndex: 100
  };

  const logoContainerStyles: React.CSSProperties = {
    padding: '20px 16px',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  const logoSvgContainerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const logoTextStyles: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 700,
    color: 'var(--primary)',
    margin: 0,
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em'
  };

  const versionStyles: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 400,
    color: 'var(--foreground-muted)',
    margin: '4px 0 0 0',
    fontFamily: 'var(--font-mono)'
  };

  const navStyles: React.CSSProperties = {
    padding: '16px 0'
  };

  const homeItemStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 16px',
    color: 'var(--foreground)',
    textDecoration: 'none',
    fontFamily: 'var(--font-mono)',
    fontSize: '14px',
    fontWeight: 600,
    transition: 'all 200ms',
    borderLeft: '3px solid transparent',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  };

  const contentStyles: React.CSSProperties = {
    marginLeft: '280px',
    flex: 1,
    padding: '40px',
    minHeight: '100vh',
    backgroundColor: 'var(--background)'
  };

  const atomsItems = [
    { path: '/atoms/button', label: 'Button', icon: Square },
    { path: '/atoms/input', label: 'Input', icon: Type },
    { path: '/atoms/checkbox', label: 'Checkbox', icon: CheckSquare },
    { path: '/atoms/badge', label: 'Badge', icon: Tag },
    { path: '/atoms/typography', label: 'Typography', icon: FileText },
    { path: '/atoms/icon-tooltip', label: 'Icon & Tooltip', icon: Lightbulb }
  ];

  const moleculesItems = [
    { path: '/molecules/card', label: 'Card', icon: CreditCard },
    { path: '/molecules/form-field', label: 'FormField', icon: FileCheck },
    { path: '/molecules/menu-item', label: 'MenuItem', icon: List },
    { path: '/molecules/sidebar-item', label: 'SidebarItem', icon: Menu },
    { path: '/molecules/pagination', label: 'Pagination', icon: ArrowLeftRight },
    { path: '/molecules/notification-card', label: 'NotificationCard', icon: Bell },
    { path: '/molecules/search-bar', label: 'SearchBar', icon: Search },
    { path: '/molecules/searchbar-item', label: 'SearchbarItem', icon: Filter }
  ];

  const organismsItems = [
    { path: '/organisms/sidebar', label: 'Sidebar', icon: PanelLeft },
    { path: '/organisms/searchbar', label: 'Searchbar', icon: Search },
    { path: '/organisms/table', label: 'Table', icon: Table2 },
    { path: '/organisms/modal', label: 'Modal', icon: SquareStack },
    { path: '/organisms/form', label: 'Form', icon: FileCheck },
    { path: '/organisms/paginated-table', label: 'PaginatedTable', icon: Layers }
  ];

  const stylesItems = [
    { path: '/styles/colors', label: 'Colors', icon: Palette },
    { path: '/styles/typography', label: 'Typography', icon: Type },
    { path: '/styles/spacing', label: 'Spacing', icon: Ruler },
    { path: '/styles/shadows', label: 'Shadows', icon: Copy },
    { path: '/styles/border-radius', label: 'Border Radius', icon: Circle },
    { path: '/styles/icons', label: 'Icons', icon: Image }
  ];

  const terminalItems = [
    { path: '/terminal', label: 'Overview', icon: Terminal },
    { path: '/terminal/glitch', label: 'GlitchText', icon: Zap },
    { path: '/terminal/typewriter', label: 'TypewriterText', icon: Keyboard },
    { path: '/terminal/ascii-box', label: 'AsciiBox', icon: Box },
    { path: '/terminal/window', label: 'TerminalWindow', icon: SquareStack }
  ];

  const chartsItems = [
    { path: '/charts', label: 'Overview', icon: LineChart },
    { path: '/charts/line', label: 'Line & Area', icon: Activity },
    { path: '/charts/comparison', label: 'Comparison', icon: Target },
    { path: '/charts/progress', label: 'Progress', icon: PieChart },
    { path: '/charts/distribution', label: 'Distribution', icon: Grid3X3 },
    { path: '/charts/flow', label: 'Flow', icon: Network },
    { path: '/charts/correlation', label: 'Correlation', icon: TrendingUp }
  ];

  const animationsItems = [
    { path: '/animations', label: 'Overview', icon: Sparkles },
    { path: '/animations/hover', label: 'Hover & Tap', icon: MousePointer },
    { path: '/animations/entry', label: 'Entry', icon: LayoutGrid },
    { path: '/animations/scroll', label: 'Scroll', icon: ScrollText },
    { path: '/animations/layout', label: 'Layout', icon: Layers },
    { path: '/animations/drag', label: 'Drag', icon: Move }
  ];

  return (
    <div style={layoutStyles}>
      {/* Sidebar */}
      <aside style={sidebarStyles}>
        {/* Logo */}
        <div style={logoContainerStyles}>
          <div style={logoSvgContainerStyles}>
            <GlitchText intensity="low" playMode="always">
              <Terminal size={24} color="var(--primary)" />
            </GlitchText>
            <h1 style={logoTextStyles}>Robot Resources</h1>
          </div>
          <p style={versionStyles}>// Terminal Theme v1.0</p>
        </div>

        {/* Navigation */}
        <nav style={navStyles}>
          {/* Home */}
          <Link
            to="/"
            style={homeItemStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--background-tertiary)';
              e.currentTarget.style.borderLeftColor = 'var(--primary)';
              e.currentTarget.style.color = 'var(--primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderLeftColor = 'transparent';
              e.currentTarget.style.color = 'var(--foreground)';
            }}
          >
            <Home size={18} />
            <span>Home</span>
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

          {/* Terminal Group */}
          <SidebarGroup
            title="Terminal"
            icon={Terminal}
            items={terminalItems}
            isExpanded={expandedGroup === 'terminal'}
            onToggle={() => handleToggleGroup('terminal')}
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
