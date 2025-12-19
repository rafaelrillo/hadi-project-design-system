// Path: src/components/molecules/Pagination/Pagination.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';

describe('Pagination Component', () => {
  describe('Rendering', () => {
    it('should render pagination with page numbers', () => {
      render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />);
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('should render previous and next buttons', () => {
      render(<Pagination currentPage={2} totalPages={5} onPageChange={() => {}} />);
      expect(screen.getByLabelText('Página anterior')).toBeInTheDocument();
      expect(screen.getByLabelText('Página siguiente')).toBeInTheDocument();
    });

    it('should render first and last buttons when totalPages > maxVisiblePages', () => {
      render(<Pagination currentPage={5} totalPages={10} onPageChange={() => {}} showFirstLast={true} />);
      expect(screen.getByText('Primera')).toBeInTheDocument();
      expect(screen.getByText('Última')).toBeInTheDocument();
    });

    it('should not render first and last buttons when totalPages <= maxVisiblePages', () => {
      render(<Pagination currentPage={2} totalPages={5} onPageChange={() => {}} />);
      expect(screen.queryByText('Primera')).not.toBeInTheDocument();
      expect(screen.queryByText('Última')).not.toBeInTheDocument();
    });

    it('should not render first and last buttons when showFirstLast is false', () => {
      render(<Pagination currentPage={5} totalPages={10} onPageChange={() => {}} showFirstLast={false} />);
      expect(screen.queryByText('Primera')).not.toBeInTheDocument();
      expect(screen.queryByText('Última')).not.toBeInTheDocument();
    });
  });

  describe('Page Number Calculation', () => {
    it('should show all pages when totalPages <= maxVisiblePages', () => {
      render(<Pagination currentPage={2} totalPages={5} onPageChange={() => {}} />);
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('should show ellipsis when there are many pages', () => {
      render(<Pagination currentPage={5} totalPages={20} onPageChange={() => {}} />);
      const ellipses = screen.getAllByText('...');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should show first page and ellipsis when on later pages', () => {
      render(<Pagination currentPage={10} totalPages={20} onPageChange={() => {}} />);
      expect(screen.getByText('1')).toBeInTheDocument();
      const ellipses = screen.getAllByText('...');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should show last page and ellipsis when on earlier pages', () => {
      render(<Pagination currentPage={3} totalPages={20} onPageChange={() => {}} />);
      expect(screen.getByText('20')).toBeInTheDocument();
    });

    it('should respect maxVisiblePages prop', () => {
      render(<Pagination currentPage={3} totalPages={10} onPageChange={() => {}} maxVisiblePages={3} />);
      // Should show fewer page numbers (maxVisiblePages controls the number shown, not total buttons)
      const pageButtons = screen.getAllByRole('button').filter(button =>
        /^\d+$/.test(button.textContent || '')
      );
      // With ellipsis logic, might show up to maxVisiblePages + first + last
      expect(pageButtons.length).toBeLessThanOrEqual(5);
    });
  });

  describe('Click Handlers', () => {
    it('should call onPageChange when clicking a page number', () => {
      const handlePageChange = jest.fn();
      render(<Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange} />);

      const page3Button = screen.getByText('3');
      fireEvent.click(page3Button);

      expect(handlePageChange).toHaveBeenCalledWith(3);
    });

    it('should call onPageChange with previous page when clicking previous', () => {
      const handlePageChange = jest.fn();
      render(<Pagination currentPage={3} totalPages={5} onPageChange={handlePageChange} />);

      const prevButton = screen.getByLabelText('Página anterior');
      fireEvent.click(prevButton);

      expect(handlePageChange).toHaveBeenCalledWith(2);
    });

    it('should call onPageChange with next page when clicking next', () => {
      const handlePageChange = jest.fn();
      render(<Pagination currentPage={3} totalPages={5} onPageChange={handlePageChange} />);

      const nextButton = screen.getByLabelText('Página siguiente');
      fireEvent.click(nextButton);

      expect(handlePageChange).toHaveBeenCalledWith(4);
    });

    it('should call onPageChange with page 1 when clicking first', () => {
      const handlePageChange = jest.fn();
      render(<Pagination currentPage={5} totalPages={10} onPageChange={handlePageChange} showFirstLast={true} />);

      const firstButton = screen.getByText('Primera');
      fireEvent.click(firstButton);

      expect(handlePageChange).toHaveBeenCalledWith(1);
    });

    it('should call onPageChange with last page when clicking last', () => {
      const handlePageChange = jest.fn();
      render(<Pagination currentPage={5} totalPages={10} onPageChange={handlePageChange} showFirstLast={true} />);

      const lastButton = screen.getByText('Última');
      fireEvent.click(lastButton);

      expect(handlePageChange).toHaveBeenCalledWith(10);
    });

    it('should not call onPageChange when clicking current page', () => {
      const handlePageChange = jest.fn();
      render(<Pagination currentPage={3} totalPages={5} onPageChange={handlePageChange} />);

      const currentPageButton = screen.getByText('3');
      fireEvent.click(currentPageButton);

      expect(handlePageChange).not.toHaveBeenCalled();
    });
  });

  describe('Active State', () => {
    it('should have className on active page', () => {
      render(<Pagination currentPage={3} totalPages={5} onPageChange={() => {}} />);
      const page3Button = screen.getByText('3');
      expect(page3Button).toHaveAttribute('class');
    });

    it('should have aria-current on active page', () => {
      render(<Pagination currentPage={3} totalPages={5} onPageChange={() => {}} />);
      const page3Button = screen.getByText('3');
      expect(page3Button).toHaveAttribute('aria-current', 'page');
    });

    it('should not have aria-current on inactive pages', () => {
      render(<Pagination currentPage={3} totalPages={5} onPageChange={() => {}} />);
      const page2Button = screen.getByText('2');
      expect(page2Button).not.toHaveAttribute('aria-current');
    });
  });

  describe('Disabled State', () => {
    it('should disable all buttons when disabled prop is true', () => {
      render(<Pagination currentPage={3} totalPages={5} onPageChange={() => {}} disabled />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toBeDisabled();
      });
    });

    it('should not call onPageChange when disabled', () => {
      const handlePageChange = jest.fn();
      render(<Pagination currentPage={3} totalPages={5} onPageChange={handlePageChange} disabled />);

      const page4Button = screen.getByText('4');
      fireEvent.click(page4Button);

      expect(handlePageChange).not.toHaveBeenCalled();
    });

    it('should disable previous button on first page', () => {
      render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />);
      const prevButton = screen.getByLabelText('Página anterior');
      expect(prevButton).toBeDisabled();
    });

    it('should disable next button on last page', () => {
      render(<Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />);
      const nextButton = screen.getByLabelText('Página siguiente');
      expect(nextButton).toBeDisabled();
    });

    it('should not call onPageChange when clicking disabled previous', () => {
      const handlePageChange = jest.fn();
      render(<Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange} />);

      const prevButton = screen.getByLabelText('Página anterior');
      fireEvent.click(prevButton);

      expect(handlePageChange).not.toHaveBeenCalled();
    });

    it('should not call onPageChange when clicking disabled next', () => {
      const handlePageChange = jest.fn();
      render(<Pagination currentPage={5} totalPages={5} onPageChange={handlePageChange} />);

      const nextButton = screen.getByLabelText('Página siguiente');
      fireEvent.click(nextButton);

      expect(handlePageChange).not.toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle single page', () => {
      render(<Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />);
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByLabelText('Página anterior')).toBeDisabled();
      expect(screen.getByLabelText('Página siguiente')).toBeDisabled();
    });

    it('should handle two pages', () => {
      render(<Pagination currentPage={1} totalPages={2} onPageChange={() => {}} />);
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('should handle large number of pages', () => {
      render(<Pagination currentPage={50} totalPages={100} onPageChange={() => {}} />);
      expect(screen.getByText('50')).toBeInTheDocument();
      const ellipses = screen.getAllByText('...');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should navigate correctly from first to second page', () => {
      const handlePageChange = jest.fn();
      render(<Pagination currentPage={1} totalPages={10} onPageChange={handlePageChange} />);

      const nextButton = screen.getByLabelText('Página siguiente');
      fireEvent.click(nextButton);

      expect(handlePageChange).toHaveBeenCalledWith(2);
    });

    it('should navigate correctly from second to last to last page', () => {
      const handlePageChange = jest.fn();
      render(<Pagination currentPage={9} totalPages={10} onPageChange={handlePageChange} />);

      const nextButton = screen.getByLabelText('Página siguiente');
      fireEvent.click(nextButton);

      expect(handlePageChange).toHaveBeenCalledWith(10);
    });
  });

  describe('Styling', () => {
    it('should have className on page buttons', () => {
      render(<Pagination currentPage={2} totalPages={5} onPageChange={() => {}} />);
      const page1Button = screen.getByText('1');
      expect(page1Button).toHaveAttribute('class');
    });

    it('should have className on active button', () => {
      render(<Pagination currentPage={2} totalPages={5} onPageChange={() => {}} />);
      const page2Button = screen.getByText('2');
      expect(page2Button).toHaveAttribute('class');
    });

    it('should render disabled button', () => {
      render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />);
      const prevButton = screen.getByLabelText('Página anterior');
      expect(prevButton).toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible labels for navigation buttons', () => {
      render(<Pagination currentPage={2} totalPages={5} onPageChange={() => {}} />);
      expect(screen.getByLabelText('Página anterior')).toBeInTheDocument();
      expect(screen.getByLabelText('Página siguiente')).toBeInTheDocument();
    });

    it('should have accessible labels for page numbers', () => {
      render(<Pagination currentPage={2} totalPages={5} onPageChange={() => {}} />);
      expect(screen.getByLabelText('Página 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Página 2')).toBeInTheDocument();
      expect(screen.getByLabelText('Página 3')).toBeInTheDocument();
    });

    it('should have accessible labels for first and last buttons', () => {
      render(<Pagination currentPage={5} totalPages={10} onPageChange={() => {}} showFirstLast={true} />);
      expect(screen.getByLabelText('Primera página')).toBeInTheDocument();
      expect(screen.getByLabelText('Última página')).toBeInTheDocument();
    });

    it('should have button type', () => {
      render(<Pagination currentPage={2} totalPages={5} onPageChange={() => {}} />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveAttribute('type', 'button');
      });
    });
  });

  describe('Use Cases', () => {
    it('should work for table pagination', () => {
      const handlePageChange = jest.fn();
      render(<Pagination currentPage={1} totalPages={20} onPageChange={handlePageChange} />);

      const nextButton = screen.getByLabelText('Página siguiente');
      fireEvent.click(nextButton);

      expect(handlePageChange).toHaveBeenCalledWith(2);
    });

    it('should work for search results pagination', () => {
      const handlePageChange = jest.fn();
      render(<Pagination currentPage={5} totalPages={50} onPageChange={handlePageChange} />);

      const page10Button = screen.getAllByRole('button').find(btn => btn.textContent === '10');
      if (page10Button) {
        fireEvent.click(page10Button);
        expect(handlePageChange).toHaveBeenCalled();
      }
    });

    it('should work for small result sets', () => {
      render(<Pagination currentPage={1} totalPages={3} onPageChange={() => {}} />);
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle navigation through multiple pages', () => {
      const handlePageChange = jest.fn();
      const { rerender } = render(
        <Pagination currentPage={1} totalPages={10} onPageChange={handlePageChange} />
      );

      const nextButton = screen.getByLabelText('Página siguiente');
      fireEvent.click(nextButton);
      expect(handlePageChange).toHaveBeenCalledWith(2);

      rerender(<Pagination currentPage={2} totalPages={10} onPageChange={handlePageChange} />);
      fireEvent.click(nextButton);
      expect(handlePageChange).toHaveBeenCalledWith(3);
    });

    it('should show correct pages when jumping to middle', () => {
      render(<Pagination currentPage={10} totalPages={20} onPageChange={() => {}} />);
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('should handle maxVisiblePages with large totalPages', () => {
      render(<Pagination currentPage={50} totalPages={100} onPageChange={() => {}} maxVisiblePages={7} />);

      const pageButtons = screen.getAllByRole('button').filter(button =>
        /^\d+$/.test(button.textContent || '')
      );

      // Should have at most 7 page number buttons (plus first/last shown separately)
      expect(pageButtons.length).toBeLessThanOrEqual(9); // 7 visible + first + last
    });
  });
});
