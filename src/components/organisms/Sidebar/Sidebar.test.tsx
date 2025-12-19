// Path: src/components/organisms/Sidebar/Sidebar.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Sidebar, SidebarMenuItem } from './Sidebar';
import { Home, Settings, Users, BarChart, User } from 'lucide-react';

const mockMenuItems: SidebarMenuItem[] = [
  { icon: Home, label: 'Inicio', href: '/' },
  { icon: Users, label: 'Usuarios', href: '/users' },
  { icon: Settings, label: 'Configuración', href: '/settings' }
];

const mockLogo = <div data-testid="mock-logo">Logo</div>;
const mockUserIcon = <User size={24} data-testid="user-icon" />;

describe('Sidebar Organism', () => {
  describe('Rendering', () => {
    it('should render sidebar container', () => {
      render(<Sidebar productLogo={mockLogo} menuItems={mockMenuItems} />);
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveAttribute('aria-label', 'Navegación principal');
    });

    it('should render product logo', () => {
      render(<Sidebar productLogo={mockLogo} menuItems={mockMenuItems} />);
      expect(screen.getByTestId('mock-logo')).toBeInTheDocument();
    });

    it('should render all menu items', () => {
      render(<Sidebar productLogo={mockLogo} menuItems={mockMenuItems} />);
      expect(screen.getByLabelText('Inicio')).toBeInTheDocument();
      expect(screen.getByLabelText('Usuarios')).toBeInTheDocument();
      expect(screen.getByLabelText('Configuración')).toBeInTheDocument();
    });

    it('should render user icon when provided', () => {
      render(
        <Sidebar
          productLogo={mockLogo}
          menuItems={mockMenuItems}
          userIcon={mockUserIcon}
        />
      );
      expect(screen.getByTestId('user-icon')).toBeInTheDocument();
    });

    it('should not render user icon when not provided', () => {
      render(<Sidebar productLogo={mockLogo} menuItems={mockMenuItems} />);
      expect(screen.queryByTestId('user-icon')).not.toBeInTheDocument();
    });

    it('should render logs button when onLogsClick provided', () => {
      render(
        <Sidebar
          productLogo={mockLogo}
          menuItems={mockMenuItems}
          onLogsClick={() => {}}
        />
      );
      expect(screen.getByLabelText('Historial de logs')).toBeInTheDocument();
    });

    it('should not render logs button when onLogsClick not provided', () => {
      render(<Sidebar productLogo={mockLogo} menuItems={mockMenuItems} />);
      expect(screen.queryByLabelText('Historial de logs')).not.toBeInTheDocument();
    });

    it('should render logout button when onLogoutClick provided', () => {
      render(
        <Sidebar
          productLogo={mockLogo}
          menuItems={mockMenuItems}
          onLogoutClick={() => {}}
        />
      );
      expect(screen.getByLabelText('Cerrar sesión')).toBeInTheDocument();
    });

    it('should not render logout button when onLogoutClick not provided', () => {
      render(<Sidebar productLogo={mockLogo} menuItems={mockMenuItems} />);
      expect(screen.queryByLabelText('Cerrar sesión')).not.toBeInTheDocument();
    });
  });

  describe('Menu Items as Links', () => {
    it('should render menu items with href as links', () => {
      render(<Sidebar productLogo={mockLogo} menuItems={mockMenuItems} />);
      const homeLink = screen.getByLabelText('Inicio');
      expect(homeLink).toHaveAttribute('href', '/');
    });

    it('should render menu items without href as buttons', () => {
      const itemsWithoutHref: SidebarMenuItem[] = [
        { icon: Home, label: 'Inicio', onClick: () => {} }
      ];
      render(<Sidebar productLogo={mockLogo} menuItems={itemsWithoutHref} />);
      const homeButton = screen.getByLabelText('Inicio');
      expect(homeButton).toHaveAttribute('type', 'button');
    });
  });

  describe('Click Handlers', () => {
    it('should call onClick when menu item is clicked', () => {
      const handleClick = jest.fn();
      const items: SidebarMenuItem[] = [
        { icon: Home, label: 'Inicio', onClick: handleClick }
      ];
      render(<Sidebar productLogo={mockLogo} menuItems={items} />);

      fireEvent.click(screen.getByLabelText('Inicio'));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled menu item is clicked', () => {
      const handleClick = jest.fn();
      const items: SidebarMenuItem[] = [
        { icon: Home, label: 'Inicio', onClick: handleClick, disabled: true }
      ];
      render(<Sidebar productLogo={mockLogo} menuItems={items} />);

      fireEvent.click(screen.getByLabelText('Inicio'));

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should call onLogsClick when logs button is clicked', () => {
      const handleLogsClick = jest.fn();
      render(
        <Sidebar
          productLogo={mockLogo}
          menuItems={mockMenuItems}
          onLogsClick={handleLogsClick}
        />
      );

      fireEvent.click(screen.getByLabelText('Historial de logs'));

      expect(handleLogsClick).toHaveBeenCalledTimes(1);
    });

    it('should call onLogoutClick when logout button is clicked', () => {
      const handleLogoutClick = jest.fn();
      render(
        <Sidebar
          productLogo={mockLogo}
          menuItems={mockMenuItems}
          onLogoutClick={handleLogoutClick}
        />
      );

      fireEvent.click(screen.getByLabelText('Cerrar sesión'));

      expect(handleLogoutClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Keyboard Navigation', () => {
    it('should call onClick when Enter is pressed on menu item', () => {
      const handleClick = jest.fn();
      const items: SidebarMenuItem[] = [
        { icon: Home, label: 'Inicio', onClick: handleClick }
      ];
      render(<Sidebar productLogo={mockLogo} menuItems={items} />);

      fireEvent.keyDown(screen.getByLabelText('Inicio'), { key: 'Enter' });

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should call onClick when Space is pressed on menu item', () => {
      const handleClick = jest.fn();
      const items: SidebarMenuItem[] = [
        { icon: Home, label: 'Inicio', onClick: handleClick }
      ];
      render(<Sidebar productLogo={mockLogo} menuItems={items} />);

      fireEvent.keyDown(screen.getByLabelText('Inicio'), { key: ' ' });

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick on disabled menu item with keyboard', () => {
      const handleClick = jest.fn();
      const items: SidebarMenuItem[] = [
        { icon: Home, label: 'Inicio', onClick: handleClick, disabled: true }
      ];
      render(<Sidebar productLogo={mockLogo} menuItems={items} />);

      fireEvent.keyDown(screen.getByLabelText('Inicio'), { key: 'Enter' });
      fireEvent.keyDown(screen.getByLabelText('Inicio'), { key: ' ' });

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should have tabIndex 0 on enabled menu items', () => {
      render(<Sidebar productLogo={mockLogo} menuItems={mockMenuItems} />);
      expect(screen.getByLabelText('Inicio')).toHaveAttribute('tabIndex', '0');
    });

    it('should have tabIndex -1 on disabled menu items', () => {
      const items: SidebarMenuItem[] = [
        { icon: Home, label: 'Inicio', disabled: true }
      ];
      render(<Sidebar productLogo={mockLogo} menuItems={items} />);
      expect(screen.getByLabelText('Inicio')).toHaveAttribute('tabIndex', '-1');
    });
  });

  describe('Active State', () => {
    it('should have aria-current when menu item is active', () => {
      const items: SidebarMenuItem[] = [
        { icon: Home, label: 'Inicio', isActive: true }
      ];
      render(<Sidebar productLogo={mockLogo} menuItems={items} />);
      expect(screen.getByLabelText('Inicio')).toHaveAttribute('aria-current', 'page');
    });

    it('should not have aria-current when menu item is not active', () => {
      render(<Sidebar productLogo={mockLogo} menuItems={mockMenuItems} />);
      expect(screen.getByLabelText('Inicio')).not.toHaveAttribute('aria-current');
    });

    it('should render active item with aria-current', () => {
      const items: SidebarMenuItem[] = [
        { icon: Home, label: 'Inicio', isActive: true }
      ];
      render(<Sidebar productLogo={mockLogo} menuItems={items} />);
      const item = screen.getByLabelText('Inicio');
      expect(item).toHaveAttribute('aria-current', 'page');
    });

    it('should not have aria-current when not active', () => {
      render(<Sidebar productLogo={mockLogo} menuItems={mockMenuItems} />);
      const item = screen.getByLabelText('Inicio');
      expect(item).not.toHaveAttribute('aria-current');
    });
  });

  describe('Disabled State', () => {
    it('should have disabled attribute when disabled', () => {
      const items: SidebarMenuItem[] = [
        { icon: Home, label: 'Inicio', disabled: true }
      ];
      render(<Sidebar productLogo={mockLogo} menuItems={items} />);
      expect(screen.getByLabelText('Inicio')).toBeDisabled();
    });

    it('should have aria-disabled when disabled', () => {
      const items: SidebarMenuItem[] = [
        { icon: Home, label: 'Inicio', disabled: true }
      ];
      render(<Sidebar productLogo={mockLogo} menuItems={items} />);
      expect(screen.getByLabelText('Inicio')).toHaveAttribute('aria-disabled', 'true');
    });

    it('should be visually indicated as disabled', () => {
      const items: SidebarMenuItem[] = [
        { icon: Home, label: 'Inicio', disabled: true }
      ];
      render(<Sidebar productLogo={mockLogo} menuItems={items} />);
      const item = screen.getByLabelText('Inicio');
      expect(item).toBeDisabled();
    });

    it('should not be disabled when enabled', () => {
      render(<Sidebar productLogo={mockLogo} menuItems={mockMenuItems} />);
      const item = screen.getByLabelText('Inicio');
      expect(item).not.toBeDisabled();
    });
  });

  describe('Styling', () => {
    it('should render nav element for sidebar', () => {
      render(<Sidebar productLogo={mockLogo} menuItems={mockMenuItems} />);
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
      expect(nav.tagName).toBe('NAV');
    });

    it('should render menu items as links', () => {
      render(<Sidebar productLogo={mockLogo} menuItems={mockMenuItems} />);
      const item = screen.getByLabelText('Inicio');
      expect(item).toBeInTheDocument();
      expect(item.tagName).toBe('A');
    });

    it('should render icons with correct size', () => {
      const { container } = render(
        <Sidebar productLogo={mockLogo} menuItems={mockMenuItems} />
      );
      const icons = container.querySelectorAll('svg');
      icons.forEach(icon => {
        expect(icon).toHaveAttribute('width', '24');
        expect(icon).toHaveAttribute('height', '24');
      });
    });

    it('should render logo container', () => {
      render(<Sidebar productLogo={mockLogo} menuItems={mockMenuItems} />);
      // Logo is rendered in a container with aria-label
      const logoContainer = screen.getByLabelText('Logo del producto');
      expect(logoContainer).toBeInTheDocument();
    });

    it('should render menu items', () => {
      const { container } = render(
        <Sidebar productLogo={mockLogo} menuItems={mockMenuItems} />
      );
      // Menu items are anchor elements
      const links = container.querySelectorAll('a');
      expect(links.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('should have navigation landmark', () => {
      render(<Sidebar productLogo={mockLogo} menuItems={mockMenuItems} />);
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label', 'Navegación principal');
    });

    it('should have accessible labels for all menu items', () => {
      render(<Sidebar productLogo={mockLogo} menuItems={mockMenuItems} />);
      mockMenuItems.forEach(item => {
        expect(screen.getByLabelText(item.label)).toBeInTheDocument();
      });
    });

    it('should have accessible label for logs button', () => {
      render(
        <Sidebar
          productLogo={mockLogo}
          menuItems={mockMenuItems}
          onLogsClick={() => {}}
        />
      );
      expect(screen.getByLabelText('Historial de logs')).toBeInTheDocument();
    });

    it('should have accessible label for logout button', () => {
      render(
        <Sidebar
          productLogo={mockLogo}
          menuItems={mockMenuItems}
          onLogoutClick={() => {}}
        />
      );
      expect(screen.getByLabelText('Cerrar sesión')).toBeInTheDocument();
    });

    it('should be keyboard navigable', () => {
      render(<Sidebar productLogo={mockLogo} menuItems={mockMenuItems} />);
      mockMenuItems.forEach(item => {
        expect(screen.getByLabelText(item.label)).toHaveAttribute('tabIndex', '0');
      });
    });
  });

  describe('Use Cases', () => {
    it('should work as main navigation', () => {
      const items: SidebarMenuItem[] = [
        { icon: Home, label: 'Dashboard', href: '/', isActive: true },
        { icon: Users, label: 'Usuarios', href: '/users' },
        { icon: BarChart, label: 'Analytics', href: '/analytics' },
        { icon: Settings, label: 'Configuración', href: '/settings' }
      ];

      render(
        <Sidebar
          productLogo={mockLogo}
          menuItems={items}
          userIcon={mockUserIcon}
          onLogsClick={() => {}}
          onLogoutClick={() => {}}
        />
      );

      expect(screen.getByLabelText('Dashboard')).toHaveAttribute('aria-current', 'page');
      expect(screen.getByLabelText('Usuarios')).toBeInTheDocument();
      expect(screen.getByLabelText('Analytics')).toBeInTheDocument();
      expect(screen.getByLabelText('Configuración')).toBeInTheDocument();
    });

    it('should work with minimal configuration', () => {
      const items: SidebarMenuItem[] = [
        { icon: Home, label: 'Inicio', href: '/' }
      ];

      render(<Sidebar productLogo={mockLogo} menuItems={items} />);

      expect(screen.getByLabelText('Inicio')).toBeInTheDocument();
      expect(screen.queryByLabelText('Historial de logs')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Cerrar sesión')).not.toBeInTheDocument();
    });

    it('should work with all features enabled', () => {
      render(
        <Sidebar
          productLogo={mockLogo}
          menuItems={mockMenuItems}
          userIcon={mockUserIcon}
          onLogsClick={() => {}}
          onLogoutClick={() => {}}
        />
      );

      expect(screen.getByTestId('mock-logo')).toBeInTheDocument();
      expect(screen.getByLabelText('Inicio')).toBeInTheDocument();
      expect(screen.getByTestId('user-icon')).toBeInTheDocument();
      expect(screen.getByLabelText('Historial de logs')).toBeInTheDocument();
      expect(screen.getByLabelText('Cerrar sesión')).toBeInTheDocument();
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle multiple active states', () => {
      const items: SidebarMenuItem[] = [
        { icon: Home, label: 'Inicio', isActive: true },
        { icon: Users, label: 'Usuarios', isActive: false },
        { icon: Settings, label: 'Configuración', isActive: false }
      ];

      render(<Sidebar productLogo={mockLogo} menuItems={items} />);

      expect(screen.getByLabelText('Inicio')).toHaveAttribute('aria-current', 'page');
      expect(screen.getByLabelText('Usuarios')).not.toHaveAttribute('aria-current');
      expect(screen.getByLabelText('Configuración')).not.toHaveAttribute('aria-current');
    });

    it('should handle mixed disabled states', () => {
      const items: SidebarMenuItem[] = [
        { icon: Home, label: 'Inicio' },
        { icon: Users, label: 'Usuarios', disabled: true },
        { icon: Settings, label: 'Configuración' }
      ];

      render(<Sidebar productLogo={mockLogo} menuItems={items} />);

      expect(screen.getByLabelText('Inicio')).not.toBeDisabled();
      expect(screen.getByLabelText('Usuarios')).toBeDisabled();
      expect(screen.getByLabelText('Configuración')).not.toBeDisabled();
    });

    it('should handle many menu items', () => {
      const manyItems: SidebarMenuItem[] = Array.from({ length: 10 }, (_, i) => ({
        icon: Home,
        label: `Item ${i + 1}`,
        href: `/item-${i + 1}`
      }));

      render(<Sidebar productLogo={mockLogo} menuItems={manyItems} />);

      manyItems.forEach(item => {
        expect(screen.getByLabelText(item.label)).toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty menu items array', () => {
      render(<Sidebar productLogo={mockLogo} menuItems={[]} />);
      expect(screen.getByTestId('mock-logo')).toBeInTheDocument();
    });

    it('should handle custom className', () => {
      const { container } = render(
        <Sidebar
          productLogo={mockLogo}
          menuItems={mockMenuItems}
          className="custom-sidebar"
        />
      );
      const nav = container.querySelector('nav');
      expect(nav).toHaveClass('custom-sidebar');
    });
  });
});
