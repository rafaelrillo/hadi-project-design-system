// Path: src/pages/organisms/DataGridShowcase.tsx
// FING Design System - Glass-Neumorphism DataGrid
import React, { useState, useMemo } from 'react';
import { DataGrid, sum, avg } from '../../components/organisms/DataGrid';
import type { DataGridColumn } from '../../components/organisms/DataGrid';
import { ShowcaseSection } from '../../components/showcase';
import { Badge } from '../../components/atoms/Badge';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

interface StockData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
  marketCap: number;
  sector: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
}

const stockData: StockData[] = [
  { id: '1', symbol: 'AAPL', name: 'Apple Inc.', price: 178.52, change: 2.34, volume: 52340000, marketCap: 2800000000000, sector: 'Technology' },
  { id: '2', symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.91, change: -1.23, volume: 23450000, marketCap: 2700000000000, sector: 'Technology' },
  { id: '3', symbol: 'GOOGL', name: 'Alphabet Inc.', price: 141.80, change: 0.85, volume: 18760000, marketCap: 1800000000000, sector: 'Technology' },
  { id: '4', symbol: 'AMZN', name: 'Amazon.com Inc.', price: 178.25, change: 3.42, volume: 45230000, marketCap: 1850000000000, sector: 'Consumer' },
  { id: '5', symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.35, change: 15.67, volume: 38920000, marketCap: 2150000000000, sector: 'Technology' },
  { id: '6', symbol: 'META', name: 'Meta Platforms', price: 505.75, change: -2.15, volume: 15670000, marketCap: 1300000000000, sector: 'Technology' },
  { id: '7', symbol: 'TSLA', name: 'Tesla Inc.', price: 248.50, change: -8.32, volume: 98450000, marketCap: 790000000000, sector: 'Automotive' },
  { id: '8', symbol: 'JPM', name: 'JPMorgan Chase', price: 195.40, change: 1.25, volume: 8540000, marketCap: 560000000000, sector: 'Finance' },
  { id: '9', symbol: 'V', name: 'Visa Inc.', price: 275.80, change: 0.95, volume: 6780000, marketCap: 520000000000, sector: 'Finance' },
  { id: '10', symbol: 'JNJ', name: 'Johnson & Johnson', price: 156.25, change: -0.45, volume: 5430000, marketCap: 380000000000, sector: 'Healthcare' },
];

const userData: UserData[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', joinDate: '2023-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active', joinDate: '2023-03-22' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'inactive', joinDate: '2023-05-10' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'pending', joinDate: '2024-01-05' },
  { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'active', joinDate: '2022-11-30' },
];

function DataGridContent() {
  const { lightAngle } = useLightEngine();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const shadowOffsets = useMemo(() => {
    const shadowAngle = (lightAngle + 180) * (Math.PI / 180);
    return { x: Math.cos(shadowAngle), y: Math.sin(shadowAngle) };
  }, [lightAngle]);

  const MARBLE = {
    base: '#d5d8dc',
    shadowDark: '#a8acb3',
    shadowLight: '#ffffff',
  };

  const getNeuPanelShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `${-x * distance}px ${-y * distance}px ${blur}px ${MARBLE.shadowLight}, ${x * distance}px ${y * distance}px ${blur}px ${MARBLE.shadowDark}`;
  };

  const getNeuInsetShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `inset ${x * distance}px ${y * distance}px ${blur}px ${MARBLE.shadowDark}, inset ${-x * distance}px ${-y * distance}px ${blur}px ${MARBLE.shadowLight}`;
  };

  const pageHeaderStyles: React.CSSProperties = {
    marginBottom: '32px',
    padding: '24px',
    background: MARBLE.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(20, 60),
    transition: 'box-shadow 50ms linear',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--fing-accent-primary)',
    marginBottom: '8px',
    fontFamily: 'var(--fing-font-display)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  };

  const descStyles: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--fing-text-secondary)',
    fontFamily: 'var(--fing-font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
  };

  const gridContainerStyles: React.CSSProperties = {
    padding: '20px',
    background: MARBLE.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(8, 24),
    transition: 'box-shadow 50ms linear',
  };

  const stockColumns: DataGridColumn<StockData>[] = [
    { id: 'symbol', header: 'Symbol', accessor: 'symbol', sortable: true, width: 100 },
    { id: 'name', header: 'Company', accessor: 'name', sortable: true, width: 180 },
    {
      id: 'price',
      header: 'Price',
      accessor: 'price',
      sortable: true,
      align: 'right',
      width: 100,
      cell: (value) => `$${(value as number).toFixed(2)}`
    },
    {
      id: 'change',
      header: 'Change',
      accessor: 'change',
      sortable: true,
      align: 'right',
      width: 100,
      cell: (value) => {
        const num = value as number;
        const color = num >= 0 ? 'var(--fing-status-positive)' : 'var(--fing-status-negative)';
        return <span style={{ color }}>{num >= 0 ? '+' : ''}{num.toFixed(2)}%</span>;
      }
    },
    {
      id: 'volume',
      header: 'Volume',
      accessor: 'volume',
      sortable: true,
      align: 'right',
      width: 120,
      cell: (value) => (value as number).toLocaleString()
    },
    {
      id: 'sector',
      header: 'Sector',
      accessor: 'sector',
      sortable: true,
      filterable: true,
      filter: {
        type: 'select',
        options: [
          { value: 'Technology', label: 'Technology' },
          { value: 'Finance', label: 'Finance' },
          { value: 'Healthcare', label: 'Healthcare' },
          { value: 'Consumer', label: 'Consumer' },
          { value: 'Automotive', label: 'Automotive' },
        ]
      },
      width: 120
    },
  ];

  const userColumns: DataGridColumn<UserData>[] = [
    { id: 'name', header: 'Name', accessor: 'name', sortable: true },
    { id: 'email', header: 'Email', accessor: 'email', sortable: true, ellipsis: true },
    { id: 'role', header: 'Role', accessor: 'role', sortable: true, filterable: true },
    {
      id: 'status',
      header: 'Status',
      accessor: 'status',
      sortable: true,
      filterable: true,
      cell: (value) => {
        const status = value as string;
        const variant = status === 'active' ? 'success' : status === 'pending' ? 'warning' : 'neutral';
        return <Badge variant={variant}>{status}</Badge>;
      }
    },
    { id: 'joinDate', header: 'Join Date', accessor: 'joinDate', sortable: true },
  ];

  const stockColumnsWithFooter: DataGridColumn<StockData>[] = [
    ...stockColumns.slice(0, 4),
    {
      id: 'volume',
      header: 'Volume',
      accessor: 'volume',
      sortable: true,
      align: 'right',
      width: 120,
      cell: (value) => (value as number).toLocaleString(),
      footer: (rows) => `Total: ${sum(rows, 'volume').toLocaleString()}`
    },
    {
      id: 'marketCap',
      header: 'Market Cap',
      accessor: 'marketCap',
      sortable: true,
      align: 'right',
      width: 140,
      cell: (value) => `$${((value as number) / 1e9).toFixed(0)}B`,
      footer: (rows) => `Avg: $${(avg(rows, 'marketCap') / 1e9).toFixed(0)}B`
    },
  ];

  return (
    <div style={{ background: MARBLE.base, minHeight: '100%', padding: '24px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; DataGrid_</h1>
        <p style={descStyles}>
          // Tabla avanzada con sorting, filtering, paginación y virtualización
        </p>
      </header>

      <ShowcaseSection
        title="DataGrid Básico"
        description="Tabla simple con sorting"
      >
        <div style={gridContainerStyles}>
          <DataGrid
            data={stockData.slice(0, 5)}
            columns={stockColumns}
            sortable
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Con Selección"
        description="Selección múltiple con checkboxes"
      >
        <div style={gridContainerStyles}>
          <p style={{
            marginBottom: '12px',
            fontSize: '12px',
            color: '#636E72',
            fontFamily: 'var(--fing-font-mono)',
          }}>
            Selected: {selectedRows.length > 0 ? selectedRows.join(', ') : 'None'}
          </p>
          <DataGrid
            data={userData}
            columns={userColumns}
            selectable
            selectedRows={selectedRows}
            onSelectionChange={setSelectedRows}
            sortable
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Con Paginación"
        description="Paginación del lado del cliente"
      >
        <div style={gridContainerStyles}>
          <DataGrid
            data={stockData}
            columns={stockColumns}
            sortable
            pagination
            pageSize={5}
            pageSizeOptions={[5, 10, 25]}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Con Filtros"
        description="Filtros por columna"
      >
        <div style={gridContainerStyles}>
          <DataGrid
            data={stockData}
            columns={stockColumns}
            sortable
            filterable
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Con Footer de Agregaciones"
        description="Footer con sum, avg, count"
      >
        <div style={gridContainerStyles}>
          <DataGrid
            data={stockData}
            columns={stockColumnsWithFooter}
            sortable
            showFooter
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Filas Expandibles"
        description="Contenido adicional en filas expandidas"
      >
        <div style={gridContainerStyles}>
          <DataGrid
            data={stockData.slice(0, 5)}
            columns={stockColumns.slice(0, 4)}
            expandable
            renderExpandedRow={(row) => (
              <div style={{
                padding: '16px',
                fontFamily: 'var(--fing-font-mono)',
                fontSize: '13px',
                background: MARBLE.base,
                borderRadius: '12px',
                boxShadow: getNeuInsetShadow(3, 8),
              }}>
                <h4 style={{ margin: '0 0 12px 0', color: 'var(--fing-accent-primary)' }}>{row.name} Details</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  <div>
                    <span style={{ color: '#636E72' }}>Market Cap:</span>
                    <br />
                    <strong>${(row.marketCap / 1e9).toFixed(0)}B</strong>
                  </div>
                  <div>
                    <span style={{ color: '#636E72' }}>Volume:</span>
                    <br />
                    <strong>{row.volume.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#636E72' }}>Sector:</span>
                    <br />
                    <strong>{row.sector}</strong>
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Con Exportación"
        description="Exportar datos a CSV"
      >
        <div style={gridContainerStyles}>
          <DataGrid
            data={stockData}
            columns={stockColumns}
            sortable
            exportable
            exportFilename="stock-data"
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Estilos: Striped y Compact"
        description="Variaciones visuales"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={gridContainerStyles}>
            <p style={{
              marginBottom: '8px',
              fontSize: '12px',
              color: '#636E72',
              fontFamily: 'var(--fing-font-mono)',
            }}>
              Striped:
            </p>
            <DataGrid
              data={stockData.slice(0, 4)}
              columns={stockColumns.slice(0, 4)}
              striped
            />
          </div>
          <div style={gridContainerStyles}>
            <p style={{
              marginBottom: '8px',
              fontSize: '12px',
              color: '#636E72',
              fontFamily: 'var(--fing-font-mono)',
            }}>
              Compact:
            </p>
            <DataGrid
              data={stockData.slice(0, 4)}
              columns={stockColumns.slice(0, 4)}
              compact
            />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Estado de Carga"
        description="Skeleton loading"
      >
        <div style={gridContainerStyles}>
          <DataGrid
            data={[]}
            columns={stockColumns.slice(0, 4)}
            loading
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Estado Vacío"
        description="Sin datos para mostrar"
      >
        <div style={gridContainerStyles}>
          <DataGrid
            data={[]}
            columns={stockColumns.slice(0, 4)}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Completo"
        description="Todas las features combinadas"
      >
        <div style={gridContainerStyles}>
          <DataGrid
            data={stockData}
            columns={stockColumnsWithFooter}
            selectable
            sortable
            filterable
            pagination
            pageSize={5}
            expandable
            renderExpandedRow={(row) => (
              <div style={{
                padding: '12px',
                fontFamily: 'var(--fing-font-mono)',
                fontSize: '12px',
                color: '#636E72',
              }}>
                Additional details for {row.name}
              </div>
            )}
            showFooter
            exportable
            striped
            onRowClick={(row) => console.log('Row clicked:', row)}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{
          padding: '20px',
          borderRadius: '15px',
          boxShadow: getNeuInsetShadow(5, 15),
          background: MARBLE.base,
          fontSize: '12px',
          fontFamily: 'var(--fing-font-mono)',
          color: '#636E72',
          lineHeight: '1.8',
          transition: 'box-shadow 50ms linear',
        }}>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Sorting:</strong> Click en header, asc → desc → none</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Filtering:</strong> Text, select, number range, date range, boolean</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Selection:</strong> Single o multiple con checkbox</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Pagination:</strong> Client-side con page size configurable</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Expansion:</strong> Filas expandibles con contenido custom</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Footer:</strong> Agregaciones sum, avg, min, max, count</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Export:</strong> CSV con nombre configurable</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Virtualization:</strong> Para +1000 filas</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Column Resize:</strong> Drag para redimensionar</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Keyboard Nav:</strong> Arrow keys, Home, End</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Sticky Header:</strong> Header fijo al hacer scroll</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export function DataGridShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <DataGridContent />
    </LightEngineProvider>
  );
}
