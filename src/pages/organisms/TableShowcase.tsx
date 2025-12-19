// Path: src/pages/organisms/TableShowcase.tsx
// Terminal Theme Version
import { useState } from 'react';
import { Table, TableColumn, TableRow } from '../../components/organisms/Table';
import { ShowcaseSection } from '../../components/showcase';
import { Edit, Trash2, Eye } from 'lucide-react';

export function TableShowcase() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const pageHeaderStyles: React.CSSProperties = {
    marginBottom: '32px'
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--primary)',
    marginBottom: '8px',
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    textShadow: '0 0 15px var(--accent-glow)'
  };

  const descStyles: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--foreground-muted)',
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.03em'
  };

  const columns: TableColumn[] = [
    { key: 'id', header: 'ID', width: '80px' },
    { key: 'name', header: 'Nombre', width: '200px' },
    { key: 'email', header: 'Email', width: '250px' },
    { key: 'role', header: 'Rol', width: '150px' },
    { key: 'status', header: 'Estado', width: '120px' }
  ];

  const data: TableRow[] = [
    {
      id: '1',
      name: 'Juan Pérez',
      email: 'juan.perez@example.com',
      role: 'Admin',
      status: 'Activo',
      actions: [
        {
          icon: Eye,
          label: 'Ver',
          onClick: () => alert('Ver usuario 1')
        },
        {
          icon: Edit,
          label: 'Editar',
          onClick: () => alert('Editar usuario 1')
        },
        {
          icon: Trash2,
          label: 'Eliminar',
          onClick: () => alert('Eliminar usuario 1'),
          variant: 'destructive'
        }
      ]
    },
    {
      id: '2',
      name: 'María García',
      email: 'maria.garcia@example.com',
      role: 'Usuario',
      status: 'Activo'
    },
    {
      id: '3',
      name: 'Carlos López',
      email: 'carlos.lopez@example.com',
      role: 'Usuario',
      status: 'Inactivo'
    },
    {
      id: '4',
      name: 'Ana Martínez',
      email: 'ana.martinez@example.com',
      role: 'Editor',
      status: 'Activo'
    }
  ];

  return (
    <div>
      {/* Page Header */}
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Table_</h1>
        <p style={descStyles}>
          // Tabla flexible con selección, expansión, acciones inline y variantes
        </p>
      </header>

      {/* Basic Table */}
      <ShowcaseSection
        title="Tabla Básica"
        description="Tabla simple con datos tabulares"
      >
        <Table columns={columns} data={data} />
      </ShowcaseSection>

      {/* Selectable Table */}
      <ShowcaseSection
        title="Tabla con Selección"
        description="Tabla con checkboxes para seleccionar filas"
      >
        <div style={{ marginBottom: '12px', fontSize: '13px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>
          Filas seleccionadas: <strong style={{ color: 'var(--primary)' }}>{selectedRows.length}</strong>
        </div>
        <Table
          columns={columns}
          data={data}
          selectable={true}
          selectedRows={selectedRows}
          onRowSelect={setSelectedRows}
        />
      </ShowcaseSection>

      {/* Table with Actions */}
      <ShowcaseSection
        title="Tabla con Acciones"
        description="Tabla con iconos de acción en la última columna (primera fila tiene acciones)"
      >
        <Table
          columns={columns}
          data={data}
        />
      </ShowcaseSection>

      {/* Compact Table */}
      <ShowcaseSection
        title="Tabla Compacta"
        description="Tabla con altura de fila reducida (30px vs 40px)"
      >
        <Table
          columns={columns}
          data={data.slice(0, 3)}
          rowHeight="compact"
        />
      </ShowcaseSection>

      {/* Technical Specifications */}
      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{ fontSize: '12px', color: 'var(--foreground)', lineHeight: '1.8', fontFamily: 'var(--font-mono)' }}>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Altura de fila:</strong> 40px (standard) | 30px (compact)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Header:</strong> Font-weight 600</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Selección:</strong> Checkbox 14x14px</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Hover:</strong> Background var(--background-tertiary)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Bordes:</strong> Adaptativos según número de columnas</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Acciones:</strong> Iconos 16px en última columna</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}
