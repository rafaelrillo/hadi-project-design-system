// Path: src/pages/atoms/BadgeShowcase.tsx
// SENTINEL Design System
import React from 'react';
import { Badge } from '../../components/atoms/Badge';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function BadgeShowcase() {
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
        <h1 style={titleStyles}>&gt; Badge_</h1>
        <p style={descStyles}>
          // Indicador visual de estado o categoría
        </p>
      </header>

      {/* Success Badge */}
      <ShowcaseSection
        title="Success Badge"
        description="Para estados exitosos o activos"
      >
        <ComponentPreview>
          <Badge variant="success">Activo</Badge>
          <Badge variant="success">Completado</Badge>
          <Badge variant="success">Aprobado</Badge>
          <Badge variant="success">Éxito</Badge>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Error Badge */}
      <ShowcaseSection
        title="Error Badge"
        description="Para estados de error o rechazados"
      >
        <ComponentPreview>
          <Badge variant="error">Error</Badge>
          <Badge variant="error">Rechazado</Badge>
          <Badge variant="error">Inactivo</Badge>
          <Badge variant="error">Fallido</Badge>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Warning Badge */}
      <ShowcaseSection
        title="Warning Badge"
        description="Para advertencias o pendientes"
      >
        <ComponentPreview>
          <Badge variant="warning">Pendiente</Badge>
          <Badge variant="warning">Advertencia</Badge>
          <Badge variant="warning">En espera</Badge>
          <Badge variant="warning">Atención</Badge>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Info Badge */}
      <ShowcaseSection
        title="Info Badge"
        description="Para información o estados en progreso"
      >
        <ComponentPreview>
          <Badge variant="info">En progreso</Badge>
          <Badge variant="info">Información</Badge>
          <Badge variant="info">Nuevo</Badge>
          <Badge variant="info">Beta</Badge>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Neutral Badge */}
      <ShowcaseSection
        title="Neutral Badge"
        description="Para estados generales o neutrales"
      >
        <ComponentPreview>
          <Badge variant="neutral">Borrador</Badge>
          <Badge variant="neutral">Archivado</Badge>
          <Badge variant="neutral">General</Badge>
          <Badge variant="neutral">Otro</Badge>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Use Cases */}
      <ShowcaseSection
        title="Casos de Uso Comunes"
        description="Ejemplos de badges en contexto"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
          {/* User Status */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: 'var(--foreground)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Estados de Usuario</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', padding: '16px', backgroundColor: 'var(--background-secondary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>Juan Pérez</span>
                <Badge variant="success">Activo</Badge>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>María García</span>
                <Badge variant="error">Inactivo</Badge>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>Carlos López</span>
                <Badge variant="warning">Pendiente</Badge>
              </div>
            </div>
          </div>

          {/* Order Status */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: 'var(--foreground)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Estados de Orden</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', padding: '16px', backgroundColor: 'var(--background-secondary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>Orden #1234</span>
                <Badge variant="success">Entregado</Badge>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>Orden #1235</span>
                <Badge variant="info">En camino</Badge>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>Orden #1236</span>
                <Badge variant="warning">Procesando</Badge>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>Orden #1237</span>
                <Badge variant="error">Cancelado</Badge>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Technical Specifications */}
      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{ fontSize: '12px', color: 'var(--foreground)', lineHeight: '1.8', fontFamily: 'var(--font-mono)' }}>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Padding:</strong> 4px 8px</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Border radius:</strong> 2px (angular)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Tipografía:</strong> 12px Semibold, JetBrains Mono</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Display:</strong> inline-flex, align-items center</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}
