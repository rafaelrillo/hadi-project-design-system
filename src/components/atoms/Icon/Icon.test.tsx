// Path: src/components/atoms/Icon/Icon.test.tsx
import { render, screen } from '@testing-library/react';
import { Icon } from './Icon';
import { Search, Home, Bell, User } from 'lucide-react';

describe('Icon Component', () => {
  describe('Rendering', () => {
    it('should render an icon component', () => {
      render(<Icon icon={Search} ariaLabel="Search icon" />);
      const icon = screen.getByLabelText('Search icon');
      expect(icon).toBeInTheDocument();
    });

    it('should render different icon types', () => {
      const { rerender } = render(<Icon icon={Home} ariaLabel="Home" />);
      expect(screen.getByLabelText('Home')).toBeInTheDocument();

      rerender(<Icon icon={Bell} ariaLabel="Bell" />);
      expect(screen.getByLabelText('Bell')).toBeInTheDocument();

      rerender(<Icon icon={User} ariaLabel="User" />);
      expect(screen.getByLabelText('User')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('should render with xs size (16px)', () => {
      render(<Icon icon={Search} size="xs" ariaLabel="Small icon" />);
      const icon = screen.getByLabelText('Small icon');
      expect(icon).toHaveAttribute('width', '16');
      expect(icon).toHaveAttribute('height', '16');
    });

    it('should render with sm size (20px)', () => {
      render(<Icon icon={Search} size="sm" ariaLabel="Small icon" />);
      const icon = screen.getByLabelText('Small icon');
      expect(icon).toHaveAttribute('width', '20');
      expect(icon).toHaveAttribute('height', '20');
    });

    it('should render with md size (24px) as default', () => {
      render(<Icon icon={Search} ariaLabel="Default icon" />);
      const icon = screen.getByLabelText('Default icon');
      expect(icon).toHaveAttribute('width', '24');
      expect(icon).toHaveAttribute('height', '24');
    });

    it('should render with lg size (32px)', () => {
      render(<Icon icon={Search} size="lg" ariaLabel="Large icon" />);
      const icon = screen.getByLabelText('Large icon');
      expect(icon).toHaveAttribute('width', '32');
      expect(icon).toHaveAttribute('height', '32');
    });
  });

  describe('Colors', () => {
    it('should render with default color (#222222)', () => {
      render(<Icon icon={Search} ariaLabel="Default color" />);
      const icon = screen.getByLabelText('Default color');
      expect(icon).toHaveAttribute('stroke', '#222222');
    });

    it('should render with secondary color (#6A6A6A)', () => {
      render(<Icon icon={Search} color="secondary" ariaLabel="Secondary" />);
      const icon = screen.getByLabelText('Secondary');
      expect(icon).toHaveAttribute('stroke', '#6A6A6A');
    });

    it('should render with primary color (#006081)', () => {
      render(<Icon icon={Search} color="primary" ariaLabel="Primary" />);
      const icon = screen.getByLabelText('Primary');
      expect(icon).toHaveAttribute('stroke', '#006081');
    });

    it('should render with brand color (#DA291C)', () => {
      render(<Icon icon={Search} color="brand" ariaLabel="Brand" />);
      const icon = screen.getByLabelText('Brand');
      expect(icon).toHaveAttribute('stroke', '#DA291C');
    });

    it('should render with destructive color (#B50000)', () => {
      render(<Icon icon={Search} color="destructive" ariaLabel="Destructive" />);
      const icon = screen.getByLabelText('Destructive');
      expect(icon).toHaveAttribute('stroke', '#B50000');
    });

    it('should render with success color (#0B7329)', () => {
      render(<Icon icon={Search} color="success" ariaLabel="Success" />);
      const icon = screen.getByLabelText('Success');
      expect(icon).toHaveAttribute('stroke', '#0B7329');
    });

    it('should render with warning color (#FAB400)', () => {
      render(<Icon icon={Search} color="warning" ariaLabel="Warning" />);
      const icon = screen.getByLabelText('Warning');
      expect(icon).toHaveAttribute('stroke', '#FAB400');
    });

    it('should render with muted color (#D0D0D0)', () => {
      render(<Icon icon={Search} color="muted" ariaLabel="Muted" />);
      const icon = screen.getByLabelText('Muted');
      expect(icon).toHaveAttribute('stroke', '#D0D0D0');
    });

    it('should render with custom hex color', () => {
      render(<Icon icon={Search} color="#FF5733" ariaLabel="Custom color" />);
      const icon = screen.getByLabelText('Custom color');
      expect(icon).toHaveAttribute('stroke', '#FF5733');
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label when provided', () => {
      render(<Icon icon={Search} ariaLabel="Search for content" />);
      const icon = screen.getByLabelText('Search for content');
      expect(icon).toBeInTheDocument();
    });

    it('should be accessible without aria-label', () => {
      render(<Icon icon={Search} />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Combinations', () => {
    it('should render with custom size and color', () => {
      render(<Icon icon={Search} size="lg" color="primary" ariaLabel="Large primary" />);
      const icon = screen.getByLabelText('Large primary');
      expect(icon).toHaveAttribute('width', '32');
      expect(icon).toHaveAttribute('stroke', '#006081');
    });

    it('should render xs icon with brand color', () => {
      render(<Icon icon={Bell} size="xs" color="brand" ariaLabel="Small brand" />);
      const icon = screen.getByLabelText('Small brand');
      expect(icon).toHaveAttribute('width', '16');
      expect(icon).toHaveAttribute('stroke', '#DA291C');
    });
  });

  describe('Styling', () => {
    it('should have className attribute applied', () => {
      render(<Icon icon={Search} ariaLabel="Styled icon" />);
      const icon = screen.getByLabelText('Styled icon');
      expect(icon).toHaveAttribute('class');
    });
  });
});
