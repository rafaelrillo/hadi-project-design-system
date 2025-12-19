// Path: src/pages/GDM/GestionMateriales.tsx
// Terminal Theme Version
import React, { useState } from 'react';
import { Button } from '../../components/atoms/Button/Button';
import { InputText } from '../../components/atoms/Input/InputText';
import { InputDropdown } from '../../components/atoms/Input/InputDropdown';
import { Checkbox } from '../../components/atoms/Checkbox/Checkbox';
import { Search, Edit, Settings, Info } from 'lucide-react';
import { CACSelectionModal } from './CACSelectionModal';

interface Material {
  codigo: string;
  descripcion: string;
  tipo: string;
  stockMin: number | null;
  stockMax: number | null;
  selected: boolean;
}

export function GestionMateriales() {
  const [showCACModal, setShowCACModal] = useState(false);
  const [selectedCACs, setSelectedCACs] = useState<string[]>([]);
  const [searchDescription, setSearchDescription] = useState('');
  const [searchTipo, setSearchTipo] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [stockMin, setStockMin] = useState('1');
  const [stockMax, setStockMax] = useState('100');
  const [autoasignable, setAutoasignable] = useState('Si');

  const handleSearch = () => {
    // Mock search results
    const mockResults: Material[] = Array.from({ length: 6 }, (_, i) => ({
      codigo: '0000000000',
      descripcion: `Huawei Band ${i + 5}`,
      tipo: 'Accesorio no seriado',
      stockMin: null,
      stockMax: null,
      selected: false
    }));
    setMaterials(mockResults);
    setHasSearched(true);
  };

  const toggleMaterialSelection = (index: number) => {
    const updated = [...materials];
    updated[index].selected = !updated[index].selected;
    setMaterials(updated);
  };

  const selectedCount = materials.filter(m => m.selected).length;
  const hasSelection = selectedCount > 0;

  const pageContainerStyles: React.CSSProperties = {
    position: 'relative'
  };

  const topButtonContainerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '16px'
  };

  const cardStyles: React.CSSProperties = {
    backgroundColor: 'var(--background-secondary)',
    borderRadius: 'var(--radius)',
    boxShadow: 'var(--shadow-md)',
    padding: '24px',
    marginBottom: '16px',
    fontFamily: 'var(--font-mono)',
    border: '1px solid var(--border)'
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 600,
    color: 'var(--foreground)',
    marginBottom: '20px',
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase'
  };

  const searchFormStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '2fr 1.5fr auto auto',
    gap: '12px',
    alignItems: 'end'
  };

  const labelStyles: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--foreground)',
    marginBottom: '8px',
    fontFamily: 'var(--font-mono)'
  };

  const requiredStyles: React.CSSProperties = {
    color: 'var(--destructive)'
  };

  const emptyStateStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    textAlign: 'center'
  };

  const emptyIconStyles: React.CSSProperties = {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: 'var(--background-tertiary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
    border: '1px solid var(--border)'
  };

  const emptyTitleStyles: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--foreground)',
    marginBottom: '8px',
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase'
  };

  const emptyTextStyles: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--foreground-muted)',
    marginBottom: '20px',
    fontFamily: 'var(--font-mono)'
  };

  const filterRowStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '150px 150px 150px auto auto',
    gap: '12px',
    marginBottom: '20px',
    alignItems: 'end'
  };

  const tableStyles: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse'
  };

  const thStyles: React.CSSProperties = {
    textAlign: 'left',
    padding: '12px',
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--foreground)',
    borderBottom: '1px solid var(--border)',
    fontFamily: 'var(--font-mono)'
  };

  const tdStyles: React.CSSProperties = {
    padding: '12px',
    fontSize: '14px',
    color: 'var(--foreground)',
    borderBottom: '1px solid var(--border)',
    fontFamily: 'var(--font-mono)'
  };

  const tipoOptions = [
    { value: 'Todos', label: 'Todos' },
    { value: 'Accesorio no seriado', label: 'Accesorio no seriado' },
    { value: 'Accesorio seriado', label: 'Accesorio seriado' },
    { value: 'Terminal', label: 'Terminal' },
    { value: 'SIM', label: 'SIM' }
  ];

  const autoasignableOptions = [
    { value: 'Si', label: 'Si' },
    { value: 'No', label: 'No' }
  ];

  // Show empty CAC state if no CACs selected
  if (selectedCACs.length === 0) {
    return (
      <>
        <div style={cardStyles}>
          <h1 style={titleStyles}>Gestión de materiales</h1>
          <div style={emptyStateStyles}>
            <div style={emptyIconStyles}>
              <Info size={32} color="var(--foreground-muted)" />
            </div>
            <h2 style={emptyTitleStyles}>Aún no se han seleccionado CACs</h2>
            <p style={emptyTextStyles}>
              Para comenzar seleccione CACs desde el siguiente botón.
            </p>
            <Button
              variant="primary"
              onClick={() => setShowCACModal(true)}
              icon={<Edit size={20} />}
            >
              Seleccionar CACs
            </Button>
          </div>
        </div>
        {showCACModal && (
          <CACSelectionModal
            onClose={() => setShowCACModal(false)}
            onConfirm={(selected) => {
              setSelectedCACs(selected);
              setShowCACModal(false);
            }}
          />
        )}
      </>
    );
  }

  return (
    <div style={pageContainerStyles}>
      <div style={topButtonContainerStyles}>
        <Button
          variant="primary"
          onClick={() => setShowCACModal(true)}
          icon={<Edit size={20} />}
        >
          {selectedCACs.length} CACs seleccionados
        </Button>
      </div>

      {/* Search Card */}
      <div style={cardStyles}>
        <h2 style={titleStyles}>Búsqueda de materiales</h2>
        <div style={searchFormStyles}>
          <div>
            <label style={labelStyles}>
              Descripción<span style={requiredStyles}>*</span>
            </label>
            <InputText
              value={searchDescription}
              onChange={(e) => setSearchDescription(e.target.value)}
              placeholder="Buscar"
              ariaLabel="Descripción del material"
            />
          </div>

          <div>
            <label style={labelStyles}>Tipo de material</label>
            <InputDropdown
              value={searchTipo}
              onChange={setSearchTipo}
              options={tipoOptions}
              placeholder="Seleccionar"
              ariaLabel="Tipo de material"
            />
          </div>

          <Button
            variant="primary"
            onClick={handleSearch}
            disabled={!searchDescription}
            icon={<Search size={20} />}
          >
            Buscar
          </Button>

          <Button
            variant="secondary"
            onClick={() => {}}
            icon={<Settings size={20} />}
            ariaLabel="Filtros avanzados"
          >
            {""}
          </Button>
        </div>
      </div>

      {/* Management Card */}
      <div style={cardStyles}>
        <h2 style={titleStyles}>Gestión de materiales</h2>

        {!hasSearched ? (
          <div style={emptyStateStyles}>
            <div style={emptyIconStyles}>
              <Info size={32} color="var(--foreground-muted)" />
            </div>
            <h3 style={emptyTitleStyles}>Aún no se han hecho búsquedas.</h3>
            <p style={emptyTextStyles}>
              Para comenzar realice una búsqueda desde la barra justo arriba.
            </p>
          </div>
        ) : (
          <>
            <div style={filterRowStyles}>
              <div>
                <label style={labelStyles}>Stock min</label>
                <InputText
                  value={stockMin}
                  onChange={(e) => setStockMin(e.target.value)}
                  type="number"
                  ariaLabel="Stock mínimo"
                />
              </div>

              <div>
                <label style={labelStyles}>Stock max</label>
                <InputText
                  value={stockMax}
                  onChange={(e) => setStockMax(e.target.value)}
                  type="number"
                  ariaLabel="Stock máximo"
                />
              </div>

              <div>
                <label style={labelStyles}>Autoasignable</label>
                <InputDropdown
                  value={autoasignable}
                  onChange={setAutoasignable}
                  options={autoasignableOptions}
                  ariaLabel="Autoasignable"
                />
              </div>

              <Button
                variant="secondary"
                onClick={() => {}}
                disabled={!hasSelection}
                icon={<Edit size={20} />}
              >
                Replicar
              </Button>

              <Button
                variant="primary"
                onClick={() => {}}
                disabled={!hasSelection}
              >
                Guardar
              </Button>
            </div>

            <table style={tableStyles}>
              <thead>
                <tr>
                  <th style={thStyles}></th>
                  <th style={thStyles}>Código</th>
                  <th style={thStyles}>Descripción</th>
                  <th style={thStyles}>Tipo</th>
                  <th style={thStyles}>Stock min</th>
                  <th style={thStyles}>Stock max</th>
                  <th style={thStyles}>Autoasignación</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((material, index) => (
                  <tr key={index}>
                    <td style={tdStyles}>
                      <Checkbox
                        checked={material.selected}
                        onChange={() => toggleMaterialSelection(index)}
                        ariaLabel={`Seleccionar ${material.descripcion}`}
                      />
                    </td>
                    <td style={tdStyles}>{material.codigo}</td>
                    <td style={tdStyles}>{material.descripcion}</td>
                    <td style={tdStyles}>{material.tipo}</td>
                    <td style={tdStyles}>{material.stockMin ?? '-'}</td>
                    <td style={tdStyles}>{material.stockMax ?? '-'}</td>
                    <td style={tdStyles}>-</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      {showCACModal && (
        <CACSelectionModal
          onClose={() => setShowCACModal(false)}
          onConfirm={(selected) => {
            setSelectedCACs(selected);
            setShowCACModal(false);
          }}
          initialSelected={selectedCACs}
        />
      )}
    </div>
  );
}
