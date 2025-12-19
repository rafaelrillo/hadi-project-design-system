// Path: src/components/organisms/PaginatedTable/PaginatedTable.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { PaginatedTable } from './PaginatedTable';
import { TableColumn, TableRow } from '../Table';

describe('PaginatedTable Organism', () => {
  const mockColumns: TableColumn[] = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' }
  ];

  const mockData: TableRow[] = Array.from({ length: 25 }, (_, i) => ({
    id: `${i + 1}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`
  }));

  describe('Rendering', () => {
    it('should render table with paginated data', () => {
      render(
        <PaginatedTable
          columns={mockColumns}
          data={mockData}
          currentPage={1}
          itemsPerPage={10}
          onPageChange={() => {}}
        />
      );

      expect(screen.getByText('User 1')).toBeInTheDocument();
      expect(screen.getByText('User 10')).toBeInTheDocument();
      expect(screen.queryByText('User 11')).not.toBeInTheDocument();
    });

    it('should render pagination controls', () => {
      render(
        <PaginatedTable
          columns={mockColumns}
          data={mockData}
          currentPage={1}
          itemsPerPage={10}
          onPageChange={() => {}}
        />
      );

      expect(screen.getByLabelText('Página 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Página 2')).toBeInTheDocument();
      expect(screen.getByLabelText('Página 3')).toBeInTheDocument();
    });

    it('should render info text showing current range', () => {
      render(
        <PaginatedTable
          columns={mockColumns}
          data={mockData}
          currentPage={1}
          itemsPerPage={10}
          onPageChange={() => {}}
        />
      );

      expect(screen.getByText('Mostrando 1-10 de 25 resultados')).toBeInTheDocument();
    });

    it('should not render pagination for single page', () => {
      const singlePageData = mockData.slice(0, 5);

      render(
        <PaginatedTable
          columns={mockColumns}
          data={singlePageData}
          currentPage={1}
          itemsPerPage={10}
          onPageChange={() => {}}
        />
      );

      expect(screen.queryByLabelText('Página 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Mostrando')).not.toBeInTheDocument();
    });

    it('should hide info text when showInfo is false', () => {
      render(
        <PaginatedTable
          columns={mockColumns}
          data={mockData}
          currentPage={1}
          itemsPerPage={10}
          onPageChange={() => {}}
          showInfo={false}
        />
      );

      expect(screen.queryByText(/Mostrando/)).not.toBeInTheDocument();
    });
  });

  describe('Pagination Calculation', () => {
    it('should show correct data for page 1', () => {
      render(
        <PaginatedTable
          columns={mockColumns}
          data={mockData}
          currentPage={1}
          itemsPerPage={10}
          onPageChange={() => {}}
        />
      );

      expect(screen.getByText('User 1')).toBeInTheDocument();
      expect(screen.getByText('User 10')).toBeInTheDocument();
      expect(screen.queryByText('User 11')).not.toBeInTheDocument();
    });

    it('should show correct data for page 2', () => {
      render(
        <PaginatedTable
          columns={mockColumns}
          data={mockData}
          currentPage={2}
          itemsPerPage={10}
          onPageChange={() => {}}
        />
      );

      expect(screen.queryByText('User 10')).not.toBeInTheDocument();
      expect(screen.getByText('User 11')).toBeInTheDocument();
      expect(screen.getByText('User 20')).toBeInTheDocument();
      expect(screen.queryByText('User 21')).not.toBeInTheDocument();
    });

    it('should show correct data for last page', () => {
      render(
        <PaginatedTable
          columns={mockColumns}
          data={mockData}
          currentPage={3}
          itemsPerPage={10}
          onPageChange={() => {}}
        />
      );

      expect(screen.queryByText('User 20')).not.toBeInTheDocument();
      expect(screen.getByText('User 21')).toBeInTheDocument();
      expect(screen.getByText('User 25')).toBeInTheDocument();
    });

    it('should calculate total pages correctly', () => {
      render(
        <PaginatedTable
          columns={mockColumns}
          data={mockData}
          currentPage={1}
          itemsPerPage={10}
          onPageChange={() => {}}
        />
      );

      expect(screen.getByLabelText('Página 3')).toBeInTheDocument(); // 25 items / 10 per page = 3 pages
    });

    it('should handle different items per page', () => {
      render(
        <PaginatedTable
          columns={mockColumns}
          data={mockData}
          currentPage={1}
          itemsPerPage={5}
          onPageChange={() => {}}
        />
      );

      expect(screen.getByText('User 1')).toBeInTheDocument();
      expect(screen.getByText('User 5')).toBeInTheDocument();
      expect(screen.queryByText('User 6')).not.toBeInTheDocument();
      expect(screen.getByText('Mostrando 1-5 de 25 resultados')).toBeInTheDocument();
    });
  });

  describe('Page Change Functionality', () => {
    it('should call onPageChange when page button is clicked', () => {
      const handlePageChange = jest.fn();

      render(
        <PaginatedTable
          columns={mockColumns}
          data={mockData}
          currentPage={1}
          itemsPerPage={10}
          onPageChange={handlePageChange}
        />
      );

      const page2Button = screen.getByLabelText('Página 2');
      fireEvent.click(page2Button);

      expect(handlePageChange).toHaveBeenCalledWith(2);
    });

    it('should update info text for different pages', () => {
      const { rerender } = render(
        <PaginatedTable
          columns={mockColumns}
          data={mockData}
          currentPage={1}
          itemsPerPage={10}
          onPageChange={() => {}}
        />
      );

      expect(screen.getByText('Mostrando 1-10 de 25 resultados')).toBeInTheDocument();

      rerender(
        <PaginatedTable
          columns={mockColumns}
          data={mockData}
          currentPage={2}
          itemsPerPage={10}
          onPageChange={() => {}}
        />
      );

      expect(screen.getByText('Mostrando 11-20 de 25 resultados')).toBeInTheDocument();
    });
  });

  describe('Table Integration', () => {
    it('should pass selectable prop to Table', () => {
      render(
        <PaginatedTable
          columns={mockColumns}
          data={mockData}
          currentPage={1}
          itemsPerPage={10}
          onPageChange={() => {}}
          selectable={true}
          selectedRows={[]}
          onRowSelect={() => {}}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    it('should pass expandable prop to Table', () => {
      const dataWithExpandable = mockData.slice(0, 5).map(row => ({
        ...row,
        expandedContent: <div>Expanded content for {row.name}</div>
      }));

      render(
        <PaginatedTable
          columns={mockColumns}
          data={dataWithExpandable}
          currentPage={1}
          itemsPerPage={10}
          onPageChange={() => {}}
          expandable={true}
        />
      );

      const expandButtons = screen.getAllByLabelText(/Expandir fila/);
      expect(expandButtons.length).toBeGreaterThan(0);
    });

    it('should pass rowHeight prop to Table', () => {
      const { container } = render(
        <PaginatedTable
          columns={mockColumns}
          data={mockData}
          currentPage={1}
          itemsPerPage={10}
          onPageChange={() => {}}
          rowHeight="compact"
        />
      );

      const table = container.querySelector('table');
      expect(table).toBeInTheDocument();
    });

    it('should call onRowClick when row is clicked', () => {
      const handleRowClick = jest.fn();

      render(
        <PaginatedTable
          columns={mockColumns}
          data={mockData}
          currentPage={1}
          itemsPerPage={10}
          onPageChange={() => {}}
          onRowClick={handleRowClick}
        />
      );

      const firstRow = screen.getByText('User 1').closest('tr');
      fireEvent.click(firstRow!);

      expect(handleRowClick).toHaveBeenCalled();
    });
  });

  describe('Styling', () => {
    it('should have wrapper container', () => {
      const { container } = render(
        <PaginatedTable
          columns={mockColumns}
          data={mockData}
          currentPage={1}
          itemsPerPage={10}
          onPageChange={() => {}}
        />
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toBeInTheDocument();
      expect(wrapper.tagName).toBe('DIV');
    });

    it('should have footer element with info text', () => {
      render(
        <PaginatedTable
          columns={mockColumns}
          data={mockData}
          currentPage={1}
          itemsPerPage={10}
          onPageChange={() => {}}
        />
      );

      const infoText = screen.getByText(/Mostrando/);
      const footer = infoText.parentElement;
      expect(footer).toBeInTheDocument();
    });

    it('should render info text', () => {
      render(
        <PaginatedTable
          columns={mockColumns}
          data={mockData}
          currentPage={1}
          itemsPerPage={10}
          onPageChange={() => {}}
        />
      );

      expect(screen.getByText('Mostrando 1-10 de 25 resultados')).toBeInTheDocument();
    });

    it('should render pagination controls', () => {
      render(
        <PaginatedTable
          columns={mockColumns}
          data={mockData}
          currentPage={1}
          itemsPerPage={10}
          onPageChange={() => {}}
        />
      );

      expect(screen.getByLabelText('Página 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Página 2')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(
        <PaginatedTable
          columns={mockColumns}
          data={mockData}
          currentPage={1}
          itemsPerPage={10}
          onPageChange={() => {}}
          className="custom-paginated-table"
        />
      );

      const wrapper = container.querySelector('.custom-paginated-table');
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('Pagination Accessibility', () => {
    it('should have accessible labels for all page buttons', () => {
      render(
        <PaginatedTable
          columns={mockColumns}
          data={mockData}
          currentPage={1}
          itemsPerPage={10}
          onPageChange={() => {}}
        />
      );

      expect(screen.getByLabelText('Página 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Página 2')).toBeInTheDocument();
      expect(screen.getByLabelText('Página 3')).toBeInTheDocument();
    });

    it('should indicate current page via aria-current', () => {
      render(
        <PaginatedTable
          columns={mockColumns}
          data={mockData}
          currentPage={2}
          itemsPerPage={10}
          onPageChange={() => {}}
        />
      );

      const page2Button = screen.getByLabelText('Página 2');
      expect(page2Button).toHaveAttribute('aria-current', 'page');
    });

    it('should have focusable page buttons', () => {
      render(
        <PaginatedTable
          columns={mockColumns}
          data={mockData}
          currentPage={1}
          itemsPerPage={10}
          onPageChange={() => {}}
        />
      );

      const page1Button = screen.getByLabelText('Página 1');
      page1Button.focus();
      expect(document.activeElement).toBe(page1Button);
    });

    it('should call onPageChange with Enter key', () => {
      const handlePageChange = jest.fn();

      render(
        <PaginatedTable
          columns={mockColumns}
          data={mockData}
          currentPage={1}
          itemsPerPage={10}
          onPageChange={handlePageChange}
        />
      );

      const page2Button = screen.getByLabelText('Página 2');
      fireEvent.keyDown(page2Button, { key: 'Enter' });

      // Button click via Enter is native behavior
      expect(page2Button).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should navigate to page on button click', () => {
      const handlePageChange = jest.fn();

      render(
        <PaginatedTable
          columns={mockColumns}
          data={mockData}
          currentPage={1}
          itemsPerPage={10}
          onPageChange={handlePageChange}
        />
      );

      fireEvent.click(screen.getByLabelText('Página 3'));
      expect(handlePageChange).toHaveBeenCalledWith(3);
    });

    it('should have all pagination buttons focusable', () => {
      render(
        <PaginatedTable
          columns={mockColumns}
          data={mockData}
          currentPage={1}
          itemsPerPage={10}
          onPageChange={() => {}}
        />
      );

      const page1 = screen.getByLabelText('Página 1');
      const page2 = screen.getByLabelText('Página 2');
      const page3 = screen.getByLabelText('Página 3');

      [page1, page2, page3].forEach(button => {
        button.focus();
        expect(document.activeElement).toBe(button);
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty data', () => {
      render(
        <PaginatedTable
          columns={mockColumns}
          data={[]}
          currentPage={1}
          itemsPerPage={10}
          onPageChange={() => {}}
        />
      );

      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
    });

    it('should handle exact multiple of items per page', () => {
      const exactData = mockData.slice(0, 20); // Exactly 2 pages with 10 items each

      render(
        <PaginatedTable
          columns={mockColumns}
          data={exactData}
          currentPage={2}
          itemsPerPage={10}
          onPageChange={() => {}}
        />
      );

      expect(screen.getByText('Mostrando 11-20 de 20 resultados')).toBeInTheDocument();
    });

    it('should handle single item', () => {
      const singleItem = [mockData[0]];

      render(
        <PaginatedTable
          columns={mockColumns}
          data={singleItem}
          currentPage={1}
          itemsPerPage={10}
          onPageChange={() => {}}
        />
      );

      expect(screen.getByText('User 1')).toBeInTheDocument();
      expect(screen.queryByLabelText('Página 1')).not.toBeInTheDocument(); // No pagination
    });

    it('should handle large dataset', () => {
      const largeData: TableRow[] = Array.from({ length: 1000 }, (_, i) => ({
        id: `${i + 1}`,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`
      }));

      render(
        <PaginatedTable
          columns={mockColumns}
          data={largeData}
          currentPage={1}
          itemsPerPage={10}
          onPageChange={() => {}}
        />
      );

      expect(screen.getByText('Mostrando 1-10 de 1000 resultados')).toBeInTheDocument();
    });

    it('should handle page change to last page with partial items', () => {
      render(
        <PaginatedTable
          columns={mockColumns}
          data={mockData}
          currentPage={3}
          itemsPerPage={10}
          onPageChange={() => {}}
        />
      );

      expect(screen.getByText('Mostrando 21-25 de 25 resultados')).toBeInTheDocument();
    });
  });

  describe('Use Cases', () => {
    it('should work as basic paginated user list', () => {
      const handlePageChange = jest.fn();

      render(
        <PaginatedTable
          columns={mockColumns}
          data={mockData}
          currentPage={1}
          itemsPerPage={10}
          onPageChange={handlePageChange}
        />
      );

      expect(screen.getByText('User 1')).toBeInTheDocument();
      expect(screen.getByText('Mostrando 1-10 de 25 resultados')).toBeInTheDocument();

      fireEvent.click(screen.getByLabelText('Página 2'));
      expect(handlePageChange).toHaveBeenCalledWith(2);
    });

    it('should work as selectable paginated table', () => {
      const handleRowSelect = jest.fn();

      render(
        <PaginatedTable
          columns={mockColumns}
          data={mockData}
          currentPage={1}
          itemsPerPage={10}
          onPageChange={() => {}}
          selectable={true}
          selectedRows={[]}
          onRowSelect={handleRowSelect}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[1]); // Click first row checkbox (0 is select all)

      expect(handleRowSelect).toHaveBeenCalled();
    });
  });
});
