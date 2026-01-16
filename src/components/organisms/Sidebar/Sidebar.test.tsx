// Path: src/components/organisms/Sidebar/Sidebar.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Sidebar, SidebarMenuItem, SidebarSection } from './Sidebar';
import { Home, Settings, Users, BarChart } from 'lucide-react';

const mockMenuItems: SidebarMenuItem[] = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Users, label: 'Users', href: '/users' },
  { icon: Settings, label: 'Settings', href: '/settings' }
];

const mockSections: SidebarSection[] = [
  {
    title: 'Navigation',
    items: [
      { icon: Home, label: 'Dashboard', href: '/' },
      { icon: Users, label: 'Users', href: '/users' },
    ],
  },
];

const mockLogo = <div data-testid="mock-logo">Logo</div>;

const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
};

describe('Sidebar Organism', () => {
  describe('Rendering', () => {
    it('should render sidebar container', () => {
      render(<Sidebar productLogo={mockLogo} menuItems={mockMenuItems} />);
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveAttribute('aria-label', 'Main navigation');
    });

    it('should render product logo', () => {
      render(<Sidebar productLogo={mockLogo} menuItems={mockMenuItems} />);
      expect(screen.getByTestId('mock-logo')).toBeInTheDocument();
    });

    it('should render all menu items', () => {
      render(<Sidebar productLogo={mockLogo} menuItems={mockMenuItems} />);
      expect(screen.getByLabelText('Home')).toBeInTheDocument();
      expect(screen.getByLabelText('Users')).toBeInTheDocument();
      expect(screen.getByLabelText('Settings')).toBeInTheDocument();
    });

    it('should render user profile when provided', () => {
      render(
        <Sidebar
          productLogo={mockLogo}
          menuItems={mockMenuItems}
          user={mockUser}
        />
      );
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });

    it('should not render user profile when not provided', () => {
      render(<Sidebar productLogo={mockLogo} menuItems={mockMenuItems} />);
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });

    it('should render settings button when onSettingsClick provided', () => {
      render(
        <Sidebar
          productLogo={mockLogo}
          menuItems={mockMenuItems}
          onSettingsClick={() => {}}
        />
      );
      expect(screen.getByLabelText('Settings')).toBeInTheDocument();
    });

    it('should render logout button when onLogoutClick provided', () => {
      render(
        <Sidebar
          productLogo={mockLogo}
          menuItems={mockMenuItems}
          onLogoutClick={() => {}}
        />
      );
      expect(screen.getByLabelText('Logout')).toBeInTheDocument();
    });

    it('should render sections when provided', () => {
      render(
        <Sidebar
          productLogo={mockLogo}
          sections={mockSections}
        />
      );
      expect(screen.getByText('Navigation')).toBeInTheDocument();
      expect(screen.getByLabelText('Dashboard')).toBeInTheDocument();
    });
  });

  describe('Menu Items as Links', () => {
    it('should render menu items with href as links', () => {
      render(<Sidebar productLogo={mockLogo} menuItems={mockMenuItems} />);
      const homeLink = screen.getByLabelText('Home');
      expect(homeLink).toHaveAttribute('href', '/');
    });

    it('should render menu items without href as buttons', () => {
      const itemsWithoutHref: SidebarMenuItem[] = [
        { icon: Home, label: 'Home', onClick: () => {} }
      ];
      render(<Sidebar productLogo={mockLogo} menuItems={itemsWithoutHref} />);
      const homeButton = screen.getByLabelText('Home');
      expect(homeButton).toHaveAttribute('type', 'button');
    });
  });

  describe('Click Handlers', () => {
    it('should call onClick when menu item is clicked', () => {
      const handleClick = jest.fn();
      const items: SidebarMenuItem[] = [
        { icon: Home, label: 'Home', onClick: handleClick }
      ];
      render(<Sidebar productLogo={mockLogo} menuItems={items} />);

      fireEvent.click(screen.getByLabelText('Home'));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled menu item is clicked', () => {
      const handleClick = jest.fn();
      const items: SidebarMenuItem[] = [
        { icon: Home, label: 'Home', onClick: handleClick, disabled: true }
      ];
      render(<Sidebar productLogo={mockLogo} menuItems={items} />);

      fireEvent.click(screen.getByLabelText('Home'));

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should call onSettingsClick when settings button is clicked', () => {
      const handleSettingsClick = jest.fn();
      render(
        <Sidebar
          productLogo={mockLogo}
          menuItems={mockMenuItems}
          onSettingsClick={handleSettingsClick}
        />
      );

      fireEvent.click(screen.getByLabelText('Settings'));

      expect(handleSettingsClick).toHaveBeenCalledTimes(1);
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

      fireEvent.click(screen.getByLabelText('Logout'));

      expect(handleLogoutClick).toHaveBeenCalledTimes(1);
    });

    it('should call onUserClick when user profile is clicked', () => {
      const handleUserClick = jest.fn();
      render(
        <Sidebar
          productLogo={mockLogo}
          menuItems={mockMenuItems}
          user={mockUser}
          onUserClick={handleUserClick}
        />
      );

      fireEvent.click(screen.getByLabelText(`User profile: ${mockUser.name}`));

      expect(handleUserClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Keyboard Navigation', () => {
    it('should call onClick when Enter is pressed on menu item', () => {
      const handleClick = jest.fn();
      const items: SidebarMenuItem[] = [
        { icon: Home, label: 'Home', onClick: handleClick }
      ];
      render(<Sidebar productLogo={mockLogo} menuItems={items} />);

      fireEvent.keyDown(screen.getByLabelText('Home'), { key: 'Enter' });

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should call onClick when Space is pressed on menu item', () => {
      const handleClick = jest.fn();
      const items: SidebarMenuItem[] = [
        { icon: Home, label: 'Home', onClick: handleClick }
      ];
      render(<Sidebar productLogo={mockLogo} menuItems={items} />);

      fireEvent.keyDown(screen.getByLabelText('Home'), { key: ' ' });

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick on disabled menu item with keyboard', () => {
      const handleClick = jest.fn();
      const items: SidebarMenuItem[] = [
        { icon: Home, label: 'Home', onClick: handleClick, disabled: true }
      ];
      render(<Sidebar productLogo={mockLogo} menuItems={items} />);

      fireEvent.keyDown(screen.getByLabelText('Home'), { key: 'Enter' });
      fireEvent.keyDown(screen.getByLabelText('Home'), { key: ' ' });

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should have tabIndex 0 on enabled menu items', () => {
      render(<Sidebar productLogo={mockLogo} menuItems={mockMenuItems} />);
      expect(screen.getByLabelText('Home')).toHaveAttribute('tabIndex', '0');
    });

    it('should have tabIndex -1 on disabled menu items', () => {
      const items: SidebarMenuItem[] = [
        { icon: Home, label: 'Home', disabled: true }
      ];
      render(<Sidebar productLogo={mockLogo} menuItems={items} />);
      expect(screen.getByLabelText('Home')).toHaveAttribute('tabIndex', '-1');
    });
  });

  describe('Active State', () => {
    it('should have aria-current when menu item is active', () => {
      const items: SidebarMenuItem[] = [
        { icon: Home, label: 'Home', isActive: true }
      ];
      render(<Sidebar productLogo={mockLogo} menuItems={items} />);
      expect(screen.getByLabelText('Home')).toHaveAttribute('aria-current', 'page');
    });

    it('should not have aria-current when menu item is not active', () => {
      render(<Sidebar productLogo={mockLogo} menuItems={mockMenuItems} />);
      expect(screen.getByLabelText('Home')).not.toHaveAttribute('aria-current');
    });
  });

  describe('Disabled State', () => {
    it('should have disabled attribute when disabled', () => {
      const items: SidebarMenuItem[] = [
        { icon: Home, label: 'Home', disabled: true }
      ];
      render(<Sidebar productLogo={mockLogo} menuItems={items} />);
      expect(screen.getByLabelText('Home')).toBeDisabled();
    });

    it('should have aria-disabled when disabled', () => {
      const items: SidebarMenuItem[] = [
        { icon: Home, label: 'Home', disabled: true }
      ];
      render(<Sidebar productLogo={mockLogo} menuItems={items} />);
      expect(screen.getByLabelText('Home')).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Collapsed Mode', () => {
    it('should hide labels in collapsed mode', () => {
      render(
        <Sidebar
          productLogo={mockLogo}
          menuItems={mockMenuItems}
          collapsed={true}
        />
      );
      // Items should still be accessible via aria-label (title attribute)
      expect(screen.getByTitle('Home')).toBeInTheDocument();
    });

    it('should hide user profile in collapsed mode', () => {
      render(
        <Sidebar
          productLogo={mockLogo}
          menuItems={mockMenuItems}
          user={mockUser}
          collapsed={true}
        />
      );
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });

    it('should hide search in collapsed mode', () => {
      render(
        <Sidebar
          productLogo={mockLogo}
          menuItems={mockMenuItems}
          onSearch={() => {}}
          collapsed={true}
        />
      );
      expect(screen.queryByLabelText('Search')).not.toBeInTheDocument();
    });
  });

  describe('Search', () => {
    it('should render search input when onSearch provided', () => {
      render(
        <Sidebar
          productLogo={mockLogo}
          menuItems={mockMenuItems}
          onSearch={() => {}}
        />
      );
      expect(screen.getByLabelText('Search')).toBeInTheDocument();
    });

    it('should call onSearch when input changes', () => {
      const handleSearch = jest.fn();
      render(
        <Sidebar
          productLogo={mockLogo}
          menuItems={mockMenuItems}
          onSearch={handleSearch}
        />
      );

      fireEvent.change(screen.getByLabelText('Search'), { target: { value: 'test' } });

      expect(handleSearch).toHaveBeenCalledWith('test');
    });

    it('should use custom placeholder', () => {
      render(
        <Sidebar
          productLogo={mockLogo}
          menuItems={mockMenuItems}
          onSearch={() => {}}
          searchPlaceholder="Find something..."
        />
      );
      expect(screen.getByPlaceholderText('Find something...')).toBeInTheDocument();
    });
  });

  describe('Badges', () => {
    it('should render badge when provided', () => {
      const items: SidebarMenuItem[] = [
        { icon: Home, label: 'Home', badge: 5 }
      ];
      render(<Sidebar productLogo={mockLogo} menuItems={items} />);
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('should not render badge when value is 0', () => {
      const items: SidebarMenuItem[] = [
        { icon: Home, label: 'Home', badge: 0 }
      ];
      render(<Sidebar productLogo={mockLogo} menuItems={items} />);
      expect(screen.queryByText('0')).not.toBeInTheDocument();
    });

    it('should render string badge', () => {
      const items: SidebarMenuItem[] = [
        { icon: Home, label: 'Home', badge: 'New' }
      ];
      render(<Sidebar productLogo={mockLogo} menuItems={items} />);
      expect(screen.getByText('New')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have navigation landmark', () => {
      render(<Sidebar productLogo={mockLogo} menuItems={mockMenuItems} />);
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label', 'Main navigation');
    });

    it('should have accessible labels for all menu items', () => {
      render(<Sidebar productLogo={mockLogo} menuItems={mockMenuItems} />);
      mockMenuItems.forEach(item => {
        expect(screen.getByLabelText(item.label)).toBeInTheDocument();
      });
    });

    it('should be keyboard navigable', () => {
      render(<Sidebar productLogo={mockLogo} menuItems={mockMenuItems} />);
      mockMenuItems.forEach(item => {
        expect(screen.getByLabelText(item.label)).toHaveAttribute('tabIndex', '0');
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

    it('should work with sections and no menu items', () => {
      render(
        <Sidebar
          productLogo={mockLogo}
          sections={mockSections}
        />
      );
      expect(screen.getByText('Navigation')).toBeInTheDocument();
    });
  });

  describe('Use Cases', () => {
    it('should work as main navigation', () => {
      const items: SidebarMenuItem[] = [
        { icon: Home, label: 'Dashboard', href: '/', isActive: true },
        { icon: Users, label: 'Users', href: '/users' },
        { icon: BarChart, label: 'Analytics', href: '/analytics' },
        { icon: Settings, label: 'Settings', href: '/settings' }
      ];

      render(
        <Sidebar
          productLogo={mockLogo}
          menuItems={items}
          user={mockUser}
          onSettingsClick={() => {}}
          onLogoutClick={() => {}}
        />
      );

      expect(screen.getByLabelText('Dashboard')).toHaveAttribute('aria-current', 'page');
      expect(screen.getByLabelText('Users')).toBeInTheDocument();
      expect(screen.getByLabelText('Analytics')).toBeInTheDocument();
    });

    it('should work with minimal configuration', () => {
      const items: SidebarMenuItem[] = [
        { icon: Home, label: 'Home', href: '/' }
      ];

      render(<Sidebar productLogo={mockLogo} menuItems={items} />);

      expect(screen.getByLabelText('Home')).toBeInTheDocument();
      expect(screen.queryByLabelText('Logout')).not.toBeInTheDocument();
    });
  });
});
