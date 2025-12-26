// Path: src/pages/atoms/IconTooltipShowcase.tsx
// SENTINEL Design System
import React from 'react';
import { Icon } from '../../components/atoms/Icon';
import { Tooltip } from '../../components/atoms/Tooltip';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { Home, Search, Settings, User, Bell, Mail, Star, Download, Edit, Trash2, Eye, Check, X, AlertCircle, Info, HelpCircle, Terminal, Code, Database, Cpu } from 'lucide-react';

export function IconTooltipShowcase() {
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
        <h1 style={titleStyles}>&gt; Icon & Tooltip_</h1>
        <p style={descStyles}>
          // Iconos Lucide con 4 tamaños y Tooltip con variantes
        </p>
      </header>

      {/* Icon Sizes */}
      <ShowcaseSection
        title="Tamaños de Iconos"
        description="xs (16px), sm (20px), md (24px), lg (32px)"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon icon={Terminal} size="xs" />
              <span style={{ fontSize: '12px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>xs (16px)</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon icon={Terminal} size="sm" />
              <span style={{ fontSize: '12px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>sm (20px)</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon icon={Terminal} size="md" />
              <span style={{ fontSize: '12px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>md (24px)</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon icon={Terminal} size="lg" />
              <span style={{ fontSize: '12px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>lg (32px)</span>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Icon Colors */}
      <ShowcaseSection
        title="Colores de Iconos"
        description="Colores predefinidos del tema SENTINEL"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon icon={Star} color="default" size="md" />
              <span style={{ fontSize: '12px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>default</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon icon={Star} color="secondary" size="md" />
              <span style={{ fontSize: '12px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>secondary</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon icon={Star} color="primary" size="md" />
              <span style={{ fontSize: '12px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>primary</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon icon={Star} color="destructive" size="md" />
              <span style={{ fontSize: '12px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>destructive</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon icon={Star} color="success" size="md" />
              <span style={{ fontSize: '12px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>success</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon icon={Star} color="warning" size="md" />
              <span style={{ fontSize: '12px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>warning</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon icon={Star} color="info" size="md" />
              <span style={{ fontSize: '12px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>info</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon icon={Star} color="muted" size="md" />
              <span style={{ fontSize: '12px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>muted</span>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Common Icons */}
      <ShowcaseSection
        title="Iconos Comunes"
        description="Colección de iconos más utilizados"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '20px', width: '100%' }}>
            {[
              { icon: Terminal, label: 'Terminal' },
              { icon: Code, label: 'Code' },
              { icon: Database, label: 'Database' },
              { icon: Cpu, label: 'Cpu' },
              { icon: Home, label: 'Home' },
              { icon: Search, label: 'Search' },
              { icon: Settings, label: 'Settings' },
              { icon: User, label: 'User' },
              { icon: Bell, label: 'Bell' },
              { icon: Mail, label: 'Mail' },
              { icon: Download, label: 'Download' },
              { icon: Edit, label: 'Edit' },
              { icon: Trash2, label: 'Trash' },
              { icon: Eye, label: 'Eye' },
              { icon: Check, label: 'Check' },
              { icon: X, label: 'Close' },
              { icon: AlertCircle, label: 'Alert' },
              { icon: Info, label: 'Info' }
            ].map(({ icon, label }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <Icon icon={icon} size="md" color="primary" />
                <span style={{ fontSize: '11px', textAlign: 'center', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>{label}</span>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Tooltip Variants */}
      <ShowcaseSection
        title="Tooltip - Variantes"
        description="Dark (default) y Light - Hover sobre los iconos"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Tooltip content="Tooltip oscuro con fondo oscuro" variant="dark">
                <Icon icon={Info} size="md" color="primary" />
              </Tooltip>
              <span style={{ fontSize: '12px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Dark (hover)</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Tooltip content="Tooltip claro" variant="light">
                <Icon icon={HelpCircle} size="md" color="primary" />
              </Tooltip>
              <span style={{ fontSize: '12px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Light (hover)</span>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Tooltip Positions */}
      <ShowcaseSection
        title="Tooltip - Posiciones"
        description="Top, Right, Bottom, Left - Hover sobre cada icono"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px', padding: '40px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Tooltip content="Tooltip arriba" position="top">
                <Icon icon={AlertCircle} size="md" color="primary" />
              </Tooltip>
              <span style={{ fontSize: '12px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Top</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Tooltip content="Tooltip a la derecha" position="right">
                <Icon icon={AlertCircle} size="md" color="primary" />
              </Tooltip>
              <span style={{ fontSize: '12px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Right</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Tooltip content="Tooltip abajo" position="bottom">
                <Icon icon={AlertCircle} size="md" color="primary" />
              </Tooltip>
              <span style={{ fontSize: '12px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Bottom</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Tooltip content="Tooltip a la izquierda" position="left">
                <Icon icon={AlertCircle} size="md" color="primary" />
              </Tooltip>
              <span style={{ fontSize: '12px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Left</span>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Use Cases */}
      <ShowcaseSection
        title="Casos de Uso: Iconos con Tooltip"
        description="Ejemplos de iconos con tooltips informativos"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', gap: '24px', padding: '20px', backgroundColor: 'var(--background-secondary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', alignItems: 'center' }}>
            <Tooltip content="Editar información del usuario">
              <button style={{ background: 'none', border: '1px solid var(--border)', cursor: 'pointer', padding: '8px', borderRadius: 'var(--radius-sm)' }}>
                <Icon icon={Edit} size="md" color="primary" />
              </button>
            </Tooltip>
            <Tooltip content="Eliminar permanentemente">
              <button style={{ background: 'none', border: '1px solid var(--border)', cursor: 'pointer', padding: '8px', borderRadius: 'var(--radius-sm)' }}>
                <Icon icon={Trash2} size="md" color="destructive" />
              </button>
            </Tooltip>
            <Tooltip content="Ver detalles completos">
              <button style={{ background: 'none', border: '1px solid var(--border)', cursor: 'pointer', padding: '8px', borderRadius: 'var(--radius-sm)' }}>
                <Icon icon={Eye} size="md" color="secondary" />
              </button>
            </Tooltip>
            <Tooltip content="Descargar reporte">
              <button style={{ background: 'none', border: '1px solid var(--border)', cursor: 'pointer', padding: '8px', borderRadius: 'var(--radius-sm)' }}>
                <Icon icon={Download} size="md" color="primary" />
              </button>
            </Tooltip>
            <Tooltip content="Ayuda y soporte" variant="light" position="bottom">
              <button style={{ background: 'none', border: '1px solid var(--border)', cursor: 'pointer', padding: '8px', borderRadius: 'var(--radius-sm)' }}>
                <Icon icon={HelpCircle} size="md" color="primary" />
              </button>
            </Tooltip>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Technical Specifications */}
      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{ fontSize: '12px', color: 'var(--foreground)', lineHeight: '1.8', fontFamily: 'var(--font-mono)' }}>
          <p><strong style={{ color: 'var(--primary)' }}>Icon:</strong></p>
          <p>✓ <strong>Basado en:</strong> Lucide React</p>
          <p>✓ <strong>Tamaños:</strong> xs (16px), sm (20px), md (24px), lg (32px)</p>
          <p>✓ <strong>Colores:</strong> default (#E0E0E0), secondary (#888888), primary (#FF6600)</p>
          <p>✓ <strong>Estados:</strong> destructive (#FF3333), success (#00FF41), warning (#FFB800), info (#00BFFF), muted (#555555)</p>

          <p style={{ marginTop: '16px' }}><strong style={{ color: 'var(--primary)' }}>Tooltip:</strong></p>
          <p>✓ <strong>Padding:</strong> 5px 10px</p>
          <p>✓ <strong>Border radius:</strong> 4px</p>
          <p>✓ <strong>Font:</strong> JetBrains Mono</p>
          <p>✓ <strong>Dark:</strong> bg var(--background-tertiary)</p>
          <p>✓ <strong>Light:</strong> bg var(--foreground)</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}
