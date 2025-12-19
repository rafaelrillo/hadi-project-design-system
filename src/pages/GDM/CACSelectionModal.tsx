// Path: src/pages/GDM/CACSelectionModal.tsx
// Terminal Theme Version
import React, { useState } from 'react';
import { Modal } from '../../components/organisms/Modal/Modal';
import { Button } from '../../components/atoms/Button/Button';
import { InputText } from '../../components/atoms/Input/InputText';
import { Checkbox } from '../../components/atoms/Checkbox/Checkbox';

interface CAC {
  id: string;
  name: string;
  centro: string;
  almacen: string;
}

interface CACSelectionModalProps {
  onClose: () => void;
  onConfirm: (selectedIds: string[]) => void;
  initialSelected?: string[];
}

export function CACSelectionModal({ onClose, onConfirm, initialSelected = [] }: CACSelectionModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCACs, setSelectedCACs] = useState<Set<string>>(new Set(initialSelected));

  const allCACs: CAC[] = [
    { id: 'cba', name: 'CBA - CAC CORDOBA', centro: 'A000', almacen: 'A111' },
    { id: 'ros', name: 'ROS - CAC ROSARIO', centro: 'B000', almacen: 'B111' },
    { id: 'bel', name: 'BEL - CAC BELGRANO', centro: 'C000', almacen: 'C111' }
  ];

  const filteredCACs = allCACs.filter(cac =>
    cac.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCAC = (id: string) => {
    const newSelected = new Set(selectedCACs);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedCACs(newSelected);
  };

  const handleConfirm = () => {
    onConfirm(Array.from(selectedCACs));
  };

  const contentStyles: React.CSSProperties = {
    fontFamily: 'var(--font-mono)'
  };

  const searchContainerStyles: React.CSSProperties = {
    marginBottom: '20px'
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
    borderBottom: '2px solid var(--border)',
    fontFamily: 'var(--font-mono)'
  };

  const tdStyles: React.CSSProperties = {
    padding: '12px',
    fontSize: '14px',
    color: 'var(--foreground)',
    borderBottom: '1px solid var(--border)',
    fontFamily: 'var(--font-mono)'
  };

  const actionsStyles: React.CSSProperties = {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    marginTop: '24px'
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Selección de CACs"
      maxWidth="800px"
    >
      <div style={contentStyles}>
        <div style={searchContainerStyles}>
          <InputText
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar"
            ariaLabel="Buscar CAC"
          />
        </div>

        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={thStyles}></th>
              <th style={thStyles}>CAC</th>
              <th style={thStyles}>Centro</th>
              <th style={thStyles}>Almacén</th>
            </tr>
          </thead>
          <tbody>
            {filteredCACs.map((cac) => (
              <tr key={cac.id}>
                <td style={tdStyles}>
                  <Checkbox
                    checked={selectedCACs.has(cac.id)}
                    onChange={() => toggleCAC(cac.id)}
                    ariaLabel={`Seleccionar ${cac.name}`}
                  />
                </td>
                <td style={tdStyles}>{cac.name}</td>
                <td style={tdStyles}>{cac.centro}</td>
                <td style={tdStyles}>{cac.almacen}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={actionsStyles}>
          <Button variant="secondary" onClick={onClose}>
            Volver
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirm}
            disabled={selectedCACs.size === 0}
          >
            Confirmar ({selectedCACs.size} CACs)
          </Button>
        </div>
      </div>
    </Modal>
  );
}
