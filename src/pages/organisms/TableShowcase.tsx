// Path: src/pages/organisms/TableShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism Tables
import React, { useState, useMemo } from 'react';
import { Table, TableColumn, TableRow } from '../../components/organisms/Table';
import { ShowcaseSection } from '../../components/showcase';
import { Edit, Trash2, Eye } from 'lucide-react';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

function TableContent() {
  const { lightAngle } = useLightEngine();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const shadowOffsets = useMemo(() => {
    const shadowAngle = (lightAngle + 180) * (Math.PI / 180);
    return { x: Math.cos(shadowAngle), y: Math.sin(shadowAngle) };
  }, [lightAngle]);

  const LIGHT = {
    base: '#e0e5ec',
    shadowDark: 'hsl(220 15% 72%)',
    shadowLight: 'hsl(0 0% 100%)',
  };

  const getNeuPanelShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `${-x * distance}px ${-y * distance}px ${blur}px ${LIGHT.shadowLight}, ${x * distance}px ${y * distance}px ${blur}px ${LIGHT.shadowDark}`;
  };

  const getNeuInsetShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `inset ${x * distance}px ${y * distance}px ${blur}px ${LIGHT.shadowDark}, inset ${-x * distance}px ${-y * distance}px ${blur}px ${LIGHT.shadowLight}`;
  };

  const pageHeaderStyles: React.CSSProperties = {
    marginBottom: '32px',
    padding: '24px',
    background: LIGHT.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(20, 60),
    transition: 'box-shadow 50ms linear',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--sentinel-accent-primary)',
    marginBottom: '8px',
    fontFamily: 'var(--sentinel-font-display)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  };

  const descStyles: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--sentinel-text-secondary)',
    fontFamily: 'var(--sentinel-font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
  };

  const tableContainerStyles: React.CSSProperties = {
    padding: '20px',
    background: LIGHT.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(8, 24),
    transition: 'box-shadow 50ms linear',
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
    <div style={{ background: LIGHT.base, minHeight: '100%', padding: '24px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Table_</h1>
        <p style={descStyles}>
          // Tabla flexible con selección, expansión, acciones inline y variantes
        </p>
      </header>

      <ShowcaseSection
        title="Tabla Básica"
        description="Tabla simple con datos tabulares"
      >
        <div style={tableContainerStyles}>
          <Table columns={columns} data={data} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Tabla con Selección"
        description="Tabla con checkboxes para seleccionar filas"
      >
        <div style={tableContainerStyles}>
          <div style={{
            marginBottom: '12px',
            fontSize: '13px',
            color: '#636E72',
            fontFamily: 'var(--sentinel-font-mono)',
          }}>
            Filas seleccionadas: <strong style={{ color: 'var(--sentinel-accent-primary)' }}>{selectedRows.length}</strong>
          </div>
          <Table
            columns={columns}
            data={data}
            selectable={true}
            selectedRows={selectedRows}
            onRowSelect={setSelectedRows}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Tabla con Acciones"
        description="Tabla con iconos de acción en la última columna (primera fila tiene acciones)"
      >
        <div style={tableContainerStyles}>
          <Table
            columns={columns}
            data={data}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Tabla Compacta"
        description="Tabla con altura de fila reducida (30px vs 40px)"
      >
        <div style={tableContainerStyles}>
          <Table
            columns={columns}
            data={data.slice(0, 3)}
            rowHeight="compact"
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{
          padding: '20px',
          borderRadius: '15px',
          boxShadow: getNeuInsetShadow(5, 15),
          background: LIGHT.base,
          fontSize: '12px',
          fontFamily: 'var(--sentinel-font-mono)',
          color: '#636E72',
          lineHeight: '1.8',
          transition: 'box-shadow 50ms linear',
        }}>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Altura de fila:</strong> 40px (standard) | 30px (compact)</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Header:</strong> Font-weight 600</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Selección:</strong> Checkbox 14x14px</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Hover:</strong> Background sutil</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Bordes:</strong> Adaptativos según número de columnas</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Acciones:</strong> Iconos 16px en última columna</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export function TableShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <TableContent />
    </LightEngineProvider>
  );
}
