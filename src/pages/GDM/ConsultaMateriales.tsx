// Path: src/pages/GDM/ConsultaMateriales.tsx
// Terminal Theme Version
import React, { useState } from 'react';
import { InputText } from '../../components/atoms/Input/InputText';
import { InputDropdown } from '../../components/atoms/Input/InputDropdown';
import { Table } from '../../components/organisms/Table/Table';
import { Pagination } from '../../components/molecules/Pagination/Pagination';
import { CheckCircle, XCircle } from 'lucide-react';

export function ConsultaMateriales() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCAC, setSelectedCAC] = useState('CBA - Córdoba');
  const [selectedTipo, setSelectedTipo] = useState('Accesorios no seriados');
  const [selectedAutoasignacion, setSelectedAutoasignacion] = useState('Todos');
  const [selectedStock, setSelectedStock] = useState('Todos');
  const [currentPage, setCurrentPage] = useState(1);

  const containerStyles: React.CSSProperties = {
    backgroundColor: 'var(--background-secondary)',
    borderRadius: 'var(--radius)',
    boxShadow: 'var(--shadow-md)',
    padding: '24px',
    fontFamily: 'var(--font-mono)',
    border: '1px solid var(--border)'
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 600,
    color: 'var(--foreground)',
    marginBottom: '24px',
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase'
  };

  const filterContainerStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '2fr 1.5fr 1.5fr 1fr 1fr',
    gap: '16px',
    marginBottom: '24px',
    alignItems: 'end'
  };

  const labelStyles: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--foreground)',
    marginBottom: '8px',
    fontFamily: 'var(--font-mono)'
  };

  // Mock data
  const mockData = Array.from({ length: 14 }, (_, i) => ({
    id: `material-${i}`,
    codigo: '0000000000',
    descripcion: `Huawei Band ${i + 1}`,
    tipo: 'Accesorio no seriado',
    stockMin: 1,
    stockMax: 100,
    autosignable: i % 3 === 0
  }));

  const columns = [
    {
      key: 'codigo',
      header: 'Código'
    },
    {
      key: 'descripcion',
      header: 'Descripción'
    },
    {
      key: 'tipo',
      header: 'Tipo'
    },
    {
      key: 'stockMin',
      header: 'Stock Min'
    },
    {
      key: 'stockMax',
      header: 'Stock Max'
    },
    {
      key: 'autosignable',
      header: 'Autosignable',
      render: (value: boolean) => value ? (
        <CheckCircle size={20} color="#0B7329" />
      ) : (
        <XCircle size={20} color="#B50000" />
      )
    }
  ];

  const cacOptions = [
    { value: 'CBA - Córdoba', label: 'CBA - Córdoba' },
    { value: 'ROS - Rosario', label: 'ROS - Rosario' },
    { value: 'BEL - Belgrano', label: 'BEL - Belgrano' }
  ];

  const tipoOptions = [
    { value: 'Todos', label: 'Todos' },
    { value: 'Terminales', label: 'Terminales' },
    { value: 'Accesorios', label: 'Accesorios' },
    { value: 'Accesorios no seriados', label: 'Accesorios no seriados' },
    { value: 'SIM', label: 'SIM' }
  ];

  const autoasignacionOptions = [
    { value: 'Todos', label: 'Todos' },
    { value: 'Si', label: 'Si' },
    { value: 'No', label: 'No' }
  ];

  const stockOptions = [
    { value: 'Todos', label: 'Todos' },
    { value: 'Bajo', label: 'Bajo' },
    { value: 'Medio', label: 'Medio' },
    { value: 'Alto', label: 'Alto' }
  ];

  return (
    <div style={containerStyles}>
      <h1 style={titleStyles}>Consulta de materiales</h1>

      <div style={filterContainerStyles}>
        <div>
          <label style={labelStyles}>Filtrar</label>
          <InputText
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar"
            ariaLabel="Filtrar materiales"
          />
        </div>

        <div>
          <label style={labelStyles}>CAC</label>
          <InputDropdown
            value={selectedCAC}
            onChange={setSelectedCAC}
            options={cacOptions}
            ariaLabel="Seleccionar CAC"
          />
        </div>

        <div>
          <label style={labelStyles}>Tipo</label>
          <InputDropdown
            value={selectedTipo}
            onChange={setSelectedTipo}
            options={tipoOptions}
            ariaLabel="Seleccionar tipo"
          />
        </div>

        <div>
          <label style={labelStyles}>Autoasignación</label>
          <InputDropdown
            value={selectedAutoasignacion}
            onChange={setSelectedAutoasignacion}
            options={autoasignacionOptions}
            ariaLabel="Seleccionar autoasignación"
          />
        </div>

        <div>
          <label style={labelStyles}>Stock</label>
          <InputDropdown
            value={selectedStock}
            onChange={setSelectedStock}
            options={stockOptions}
            ariaLabel="Seleccionar stock"
          />
        </div>
      </div>

      <Table
        columns={columns}
        data={mockData}
      />

      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
