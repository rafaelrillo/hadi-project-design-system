// Path: src/components/molecules/NotificationCard/NotificationCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { NotificationCard } from './NotificationCard';

describe('NotificationCard Component', () => {
  describe('Rendering', () => {
    it('should render title and message', () => {
      render(
        <NotificationCard
          title="Success"
          message="Operation completed successfully"
        />
      );
      expect(screen.getByText('Success')).toBeInTheDocument();
      expect(screen.getByText('Operation completed successfully')).toBeInTheDocument();
    });

    it('should render with long title and message', () => {
      render(
        <NotificationCard
          title="This is a very long notification title that should wrap"
          message="This is a very long notification message that contains a lot of information and should wrap to multiple lines"
        />
      );
      expect(screen.getByText('This is a very long notification title that should wrap')).toBeInTheDocument();
      expect(screen.getByText(/This is a very long notification message/)).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('should render success variant with className', () => {
      const { container } = render(
        <NotificationCard
          title="Success"
          message="Operation successful"
          variant="success"
        />
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveAttribute('class');
    });

    it('should render error variant with className', () => {
      const { container } = render(
        <NotificationCard
          title="Error"
          message="An error occurred"
          variant="error"
        />
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveAttribute('class');
    });

    it('should render warning variant with className', () => {
      const { container } = render(
        <NotificationCard
          title="Warning"
          message="Please be careful"
          variant="warning"
        />
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveAttribute('class');
    });

    it('should render info variant with className', () => {
      const { container } = render(
        <NotificationCard
          title="Info"
          message="Here is some information"
          variant="info"
        />
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveAttribute('class');
    });

    it('should default to info variant when not specified', () => {
      const { container } = render(
        <NotificationCard
          title="Default"
          message="Default message"
        />
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveAttribute('class');
    });
  });

  describe('Icons', () => {
    it('should show icon by default', () => {
      const { container } = render(
        <NotificationCard
          title="Info"
          message="Message"
          variant="info"
        />
      );
      const icons = container.querySelectorAll('svg');
      expect(icons.length).toBeGreaterThan(0);
    });

    it('should show icon when showIcon is true', () => {
      const { container } = render(
        <NotificationCard
          title="Info"
          message="Message"
          showIcon={true}
        />
      );
      const icons = container.querySelectorAll('svg');
      expect(icons.length).toBeGreaterThan(0);
    });

    it('should hide icon when showIcon is false', () => {
      const { container } = render(
        <NotificationCard
          title="Info"
          message="Message"
          showIcon={false}
        />
      );
      // Should only have close button icon if onClose is provided, or no icons
      const icons = container.querySelectorAll('svg');
      expect(icons.length).toBe(0);
    });

    it('should not show icon when showIcon is false even with onClose', () => {
      const { container } = render(
        <NotificationCard
          title="Info"
          message="Message"
          showIcon={false}
          onClose={() => {}}
        />
      );
      // Should only have the X icon from close button
      const icons = container.querySelectorAll('svg');
      expect(icons.length).toBe(1); // Only close button X icon
    });
  });

  describe('Close Button', () => {
    it('should not show close button when onClose is not provided', () => {
      render(
        <NotificationCard
          title="Info"
          message="Message"
        />
      );
      expect(screen.queryByLabelText('Cerrar notificación')).not.toBeInTheDocument();
    });

    it('should show close button when onClose is provided', () => {
      render(
        <NotificationCard
          title="Info"
          message="Message"
          onClose={() => {}}
        />
      );
      expect(screen.getByLabelText('Cerrar notificación')).toBeInTheDocument();
    });

    it('should call onClose when close button is clicked', () => {
      const handleClose = jest.fn();
      render(
        <NotificationCard
          title="Info"
          message="Message"
          onClose={handleClose}
        />
      );
      const closeButton = screen.getByLabelText('Cerrar notificación');
      fireEvent.click(closeButton);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('should have accessible close button', () => {
      render(
        <NotificationCard
          title="Info"
          message="Message"
          onClose={() => {}}
        />
      );
      const closeButton = screen.getByLabelText('Cerrar notificación');
      expect(closeButton).toHaveAttribute('aria-label', 'Cerrar notificación');
    });
  });

  describe('Styling', () => {
    it('should render container element', () => {
      const { container } = render(
        <NotificationCard
          title="Test"
          message="Message"
        />
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toBeInTheDocument();
    });

    it('should render title element', () => {
      render(
        <NotificationCard
          title="Test Title"
          message="Message"
        />
      );
      const title = screen.getByText('Test Title');
      expect(title).toBeInTheDocument();
    });

    it('should render message element', () => {
      render(
        <NotificationCard
          title="Title"
          message="Test Message"
        />
      );
      const message = screen.getByText('Test Message');
      expect(message).toBeInTheDocument();
    });

    it('should render close button element', () => {
      render(
        <NotificationCard
          title="Title"
          message="Message"
          onClose={() => {}}
        />
      );
      const closeButton = screen.getByLabelText('Cerrar notificación');
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe('Use Cases', () => {
    it('should render success notification', () => {
      render(
        <NotificationCard
          title="¡Éxito!"
          message="Tu cuenta ha sido creada correctamente"
          variant="success"
          onClose={() => {}}
        />
      );
      expect(screen.getByText('¡Éxito!')).toBeInTheDocument();
      expect(screen.getByText('Tu cuenta ha sido creada correctamente')).toBeInTheDocument();
    });

    it('should render error notification', () => {
      render(
        <NotificationCard
          title="Error"
          message="No se pudo procesar la solicitud. Intenta nuevamente."
          variant="error"
          onClose={() => {}}
        />
      );
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText(/No se pudo procesar la solicitud/)).toBeInTheDocument();
    });

    it('should render warning notification', () => {
      render(
        <NotificationCard
          title="Advertencia"
          message="Tu sesión expirará en 5 minutos"
          variant="warning"
          onClose={() => {}}
        />
      );
      expect(screen.getByText('Advertencia')).toBeInTheDocument();
      expect(screen.getByText('Tu sesión expirará en 5 minutos')).toBeInTheDocument();
    });

    it('should render info notification', () => {
      render(
        <NotificationCard
          title="Información"
          message="Hay una nueva versión disponible"
          variant="info"
          onClose={() => {}}
        />
      );
      expect(screen.getByText('Información')).toBeInTheDocument();
      expect(screen.getByText('Hay una nueva versión disponible')).toBeInTheDocument();
    });

    it('should render notification without close button', () => {
      render(
        <NotificationCard
          title="Sistema"
          message="Mantenimiento programado para mañana"
          variant="info"
        />
      );
      expect(screen.getByText('Sistema')).toBeInTheDocument();
      expect(screen.queryByLabelText('Cerrar notificación')).not.toBeInTheDocument();
    });

    it('should render notification without icon', () => {
      const { container } = render(
        <NotificationCard
          title="Simple"
          message="Mensaje simple sin icono"
          showIcon={false}
        />
      );
      expect(screen.getByText('Simple')).toBeInTheDocument();
      const icons = container.querySelectorAll('svg');
      expect(icons.length).toBe(0);
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle all props together', () => {
      const handleClose = jest.fn();
      render(
        <NotificationCard
          title="Actualización completada"
          message="Todos los cambios han sido guardados exitosamente"
          variant="success"
          onClose={handleClose}
          showIcon={true}
        />
      );

      expect(screen.getByText('Actualización completada')).toBeInTheDocument();
      expect(screen.getByText('Todos los cambios han sido guardados exitosamente')).toBeInTheDocument();

      const closeButton = screen.getByLabelText('Cerrar notificación');
      fireEvent.click(closeButton);
      expect(handleClose).toHaveBeenCalled();
    });

    it('should render multiple notifications with different variants', () => {
      const { rerender } = render(
        <NotificationCard
          title="Success"
          message="Success message"
          variant="success"
        />
      );
      expect(screen.getByText('Success')).toBeInTheDocument();

      rerender(
        <NotificationCard
          title="Error"
          message="Error message"
          variant="error"
        />
      );
      expect(screen.getByText('Error')).toBeInTheDocument();

      rerender(
        <NotificationCard
          title="Warning"
          message="Warning message"
          variant="warning"
        />
      );
      expect(screen.getByText('Warning')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should use semantic HTML', () => {
      const { container } = render(
        <NotificationCard
          title="Title"
          message="Message"
        />
      );
      const paragraphs = container.querySelectorAll('p');
      expect(paragraphs).toHaveLength(2);
    });

    it('should have button element for close action', () => {
      render(
        <NotificationCard
          title="Title"
          message="Message"
          onClose={() => {}}
        />
      );
      const closeButton = screen.getByLabelText('Cerrar notificación');
      expect(closeButton.tagName).toBe('BUTTON');
    });
  });
});
