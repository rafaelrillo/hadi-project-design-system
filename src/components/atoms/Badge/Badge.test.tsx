// Path: src/components/atoms/Badge/Badge.test.tsx
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge Component', () => {
  describe('Rendering', () => {
    it('should render a badge with text content', () => {
      render(<Badge>Activo</Badge>);
      expect(screen.getByText('Activo')).toBeInTheDocument();
    });

    it('should render badge with default neutral variant', () => {
      render(<Badge>Default</Badge>);
      const badge = screen.getByText('Default');
      expect(badge).toBeInTheDocument();
    });

    it('should render badge with role="status"', () => {
      render(<Badge>Status</Badge>);
      const badge = screen.getByRole('status');
      expect(badge).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('should render success variant', () => {
      render(<Badge variant="success">Completado</Badge>);
      const badge = screen.getByText('Completado');
      expect(badge).toBeInTheDocument();
    });

    it('should render error variant', () => {
      render(<Badge variant="error">Error</Badge>);
      const badge = screen.getByText('Error');
      expect(badge).toBeInTheDocument();
    });

    it('should render warning variant', () => {
      render(<Badge variant="warning">Advertencia</Badge>);
      const badge = screen.getByText('Advertencia');
      expect(badge).toBeInTheDocument();
    });

    it('should render info variant', () => {
      render(<Badge variant="info">Información</Badge>);
      const badge = screen.getByText('Información');
      expect(badge).toBeInTheDocument();
    });

    it('should render neutral variant', () => {
      render(<Badge variant="neutral">Neutral</Badge>);
      const badge = screen.getByText('Neutral');
      expect(badge).toBeInTheDocument();
    });
  });

  describe('Content', () => {
    it('should render text content', () => {
      render(<Badge>Texto</Badge>);
      expect(screen.getByText('Texto')).toBeInTheDocument();
    });

    it('should render numbers', () => {
      render(<Badge>99</Badge>);
      expect(screen.getByText('99')).toBeInTheDocument();
    });

    it('should render mixed content', () => {
      render(<Badge>Item 5</Badge>);
      expect(screen.getByText('Item 5')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label when provided', () => {
      render(<Badge ariaLabel="Status badge">Active</Badge>);
      const badge = screen.getByLabelText('Status badge');
      expect(badge).toBeInTheDocument();
    });

    it('should have role status', () => {
      render(<Badge>Test</Badge>);
      const badge = screen.getByRole('status');
      expect(badge).toBeInTheDocument();
    });

    it('should be accessible without aria-label', () => {
      render(<Badge>Test</Badge>);
      const badge = screen.getByRole('status');
      expect(badge).toBeInTheDocument();
    });
  });

  describe('Use Cases', () => {
    it('should render multiple badges together', () => {
      render(
        <>
          <Badge variant="success">Activo</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="warning">Advertencia</Badge>
        </>
      );

      expect(screen.getByText('Activo')).toBeInTheDocument();
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText('Advertencia')).toBeInTheDocument();
    });

    it('should handle long text', () => {
      render(<Badge>Texto muy largo que no debe hacer wrap</Badge>);
      const badge = screen.getByText('Texto muy largo que no debe hacer wrap');
      expect(badge).toBeInTheDocument();
    });
  });
});
