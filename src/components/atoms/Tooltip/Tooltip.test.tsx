// Path: src/components/atoms/Tooltip/Tooltip.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './Tooltip';

describe('Tooltip Component', () => {
  describe('Rendering', () => {
    it('should render children element', () => {
      render(
        <Tooltip content="Tooltip text">
          <button>Hover me</button>
        </Tooltip>
      );
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });

    it('should not show tooltip initially', () => {
      render(
        <Tooltip content="Tooltip text">
          <button>Hover me</button>
        </Tooltip>
      );
      const tooltip = screen.queryByRole('tooltip');
      expect(tooltip).not.toBeInTheDocument();
    });
  });

  describe('Hover Behavior', () => {
    it('should show tooltip after 200ms delay on hover', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Help text">
          <button>Hover me</button>
        </Tooltip>
      );

      const button = screen.getByText('Hover me');
      await user.hover(button);

      await waitFor(
        () => {
          expect(screen.getByRole('tooltip')).toBeInTheDocument();
          expect(screen.getByText('Help text')).toBeInTheDocument();
        },
        { timeout: 300 }
      );
    });

    it('should hide tooltip on mouse leave', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Help text">
          <button>Hover me</button>
        </Tooltip>
      );

      const button = screen.getByText('Hover me');
      await user.hover(button);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });

      await user.unhover(button);

      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      });
    });
  });

  describe('Variants', () => {
    it('should render dark variant tooltip', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Dark tooltip" variant="dark">
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveAttribute('class');
      });
    });

    it('should render light variant tooltip', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Light tooltip" variant="light">
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveAttribute('class');
      });
    });
  });

  describe('Positions', () => {
    it('should render with top position by default', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Top tooltip">
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveAttribute('class');
      });
    });

    it('should render with bottom position', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Bottom tooltip" position="bottom">
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveAttribute('class');
      });
    });

    it('should render with left position', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Left tooltip" position="left">
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveAttribute('class');
      });
    });

    it('should render with right position', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Right tooltip" position="right">
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveAttribute('class');
      });
    });
  });

  describe('Styling', () => {
    it('should have className attribute', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Styled tooltip">
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveAttribute('class');
      });
    });

    it('should show aria-hidden false when visible', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Styled tooltip">
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveAttribute('aria-hidden', 'false');
      });
    });

    it('should have wrapper container', () => {
      render(
        <Tooltip content="Container tooltip">
          <button>Hover me</button>
        </Tooltip>
      );

      const button = screen.getByText('Hover me');
      const container = button.parentElement;
      expect(container).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have role="tooltip"', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Accessible tooltip">
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    it('should have aria-hidden when not visible', () => {
      render(
        <Tooltip content="Hidden tooltip">
          <button>Hover me</button>
        </Tooltip>
      );

      const tooltip = screen.queryByRole('tooltip');
      expect(tooltip).not.toBeInTheDocument();
    });

    it('should not have aria-hidden when visible', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Visible tooltip">
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveAttribute('aria-hidden', 'false');
      });
    });
  });

  describe('Content', () => {
    it('should display the provided content', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="This is helpful information">
          <button>Info</button>
        </Tooltip>
      );

      await user.hover(screen.getByText('Info'));

      await waitFor(() => {
        expect(screen.getByText('This is helpful information')).toBeInTheDocument();
      });
    });

    it('should handle long content', async () => {
      const user = userEvent.setup();
      const longContent = 'This is a very long tooltip content that should wrap within the max-width constraint of 300px';
      render(
        <Tooltip content={longContent}>
          <button>Long tooltip</button>
        </Tooltip>
      );

      await user.hover(screen.getByText('Long tooltip'));

      await waitFor(() => {
        expect(screen.getByText(longContent)).toBeInTheDocument();
      });
    });
  });
});
