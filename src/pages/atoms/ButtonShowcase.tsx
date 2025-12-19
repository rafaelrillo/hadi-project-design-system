// Path: src/pages/atoms/ButtonShowcase.tsx
// Terminal Theme Version
import React from 'react';
import { Button } from '../../components/atoms/Button';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { Search, Save, Trash2, Plus, Download } from 'lucide-react';

export function ButtonShowcase() {
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

  return (
    <div>
      {/* Page Header */}
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Button_</h1>
        <p style={descStyles}>
          // Componente básico para acciones del usuario
        </p>
      </header>

      {/* Primary Buttons */}
      <ShowcaseSection
        title="Primary Buttons"
        description="Acción principal - Background naranja con glow"
      >
        <ComponentPreview>
          <Button variant="primary">Guardar</Button>
          <Button variant="primary">Confirmar</Button>
          <Button variant="primary">Aceptar</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Secondary Buttons */}
      <ShowcaseSection
        title="Secondary Buttons"
        description="Acción secundaria - Borde naranja, fondo transparente"
      >
        <ComponentPreview>
          <Button variant="secondary">Cancelar</Button>
          <Button variant="secondary">Volver</Button>
          <Button variant="secondary">Cerrar</Button>
          <Button variant="secondary" disabled>Disabled</Button>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Destructive Buttons */}
      <ShowcaseSection
        title="Destructive Buttons"
        description="Acciones irreversibles - Rojo terminal"
      >
        <ComponentPreview>
          <Button variant="destructive">Eliminar</Button>
          <Button variant="destructive">Borrar</Button>
          <Button variant="destructive">Rechazar</Button>
          <Button variant="destructive" disabled>Disabled</Button>
        </ComponentPreview>
      </ShowcaseSection>

      {/* With Icon Buttons */}
      <ShowcaseSection
        title="Buttons With Icon"
        description="Con ícono - Gap 10px, icono 24px"
      >
        <ComponentPreview>
          <Button variant="with-icon" icon={<Search size={24} />}>
            Buscar
          </Button>
          <Button variant="with-icon" icon={<Save size={24} />}>
            Guardar
          </Button>
          <Button variant="with-icon" icon={<Plus size={24} />}>
            Nuevo
          </Button>
          <Button variant="with-icon" icon={<Download size={24} />}>
            Exportar
          </Button>
          <Button variant="with-icon" icon={<Trash2 size={24} />} disabled>
            Disabled
          </Button>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Use Cases */}
      <ShowcaseSection
        title="Casos de Uso Comunes"
        description="Ejemplos prácticos de combinaciones de botones"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
          {/* Form Actions */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: 'var(--foreground)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Formulario</h4>
            <ComponentPreview>
              <Button variant="secondary">Cancelar</Button>
              <Button variant="primary">Guardar</Button>
            </ComponentPreview>
          </div>

          {/* Delete Confirmation */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: 'var(--foreground)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Confirmación de Eliminación</h4>
            <ComponentPreview>
              <Button variant="secondary">No, volver</Button>
              <Button variant="destructive">Sí, eliminar</Button>
            </ComponentPreview>
          </div>

          {/* Action Bar */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: 'var(--foreground)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Barra de Acciones</h4>
            <ComponentPreview>
              <Button variant="with-icon" icon={<Plus size={24} />}>
                Nuevo Usuario
              </Button>
              <Button variant="with-icon" icon={<Download size={24} />}>
                Exportar
              </Button>
              <Button variant="secondary">Filtros</Button>
            </ComponentPreview>
          </div>
        </div>
      </ShowcaseSection>

      {/* Technical Specifications */}
      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{ fontSize: '12px', color: 'var(--foreground)', lineHeight: '1.8', fontFamily: 'var(--font-mono)' }}>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Altura:</strong> 40px (fija)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Padding:</strong> 7.5px 20px</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Border radius:</strong> 4px (angular)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Tipografía:</strong> 16px Semibold, JetBrains Mono</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Transición:</strong> all 200ms ease</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Glow:</strong> box-shadow con --shadow-glow-sm en hover</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}
