// Path: src/pages/styles/ColorsShowcase.tsx
// Terminal Theme Version
import React from 'react';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function ColorsShowcase() {
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

  interface ColorToken {
    name: string;
    variable: string;
    hex: string;
    rgb: string;
    description?: string;
  }

  const ColorSwatch = ({ color }: { color: ColorToken }) => {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px',
        backgroundColor: 'var(--background-secondary)',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
        marginBottom: '12px'
      }}>
        {/* Color Square */}
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: color.hex,
          border: '1px solid var(--border)',
          flexShrink: 0,
          boxShadow: color.hex === '#FF6600' ? '0 0 15px rgba(255, 102, 0, 0.5)' : 'none'
        }} />

        {/* Color Info */}
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--foreground)',
            marginBottom: '4px',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase'
          }}>
            {color.name}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--foreground-muted)', marginBottom: '2px', fontFamily: 'var(--font-mono)' }}>
            <code style={{
              backgroundColor: 'var(--background-tertiary)',
              padding: '2px 6px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)',
              color: 'var(--primary)'
            }}>
              var({color.variable})
            </code>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--foreground-muted)', marginBottom: '2px', fontFamily: 'var(--font-mono)' }}>
            {color.hex}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>
            {color.rgb}
          </div>
          {color.description && (
            <div style={{
              fontSize: '11px',
              color: 'var(--foreground-subtle)',
              marginTop: '4px',
              fontStyle: 'italic',
              fontFamily: 'var(--font-mono)'
            }}>
              {color.description}
            </div>
          )}
        </div>
      </div>
    );
  };

  const primaryColors: ColorToken[] = [
    {
      name: 'Primary (Orange)',
      variable: '--primary',
      hex: '#FF6600',
      rgb: 'rgba(255, 102, 0, 1)',
      description: 'Color principal del tema terminal - Acentos y elementos interactivos'
    },
    {
      name: 'Accent',
      variable: '--accent',
      hex: '#1A0A00',
      rgb: 'rgba(26, 10, 0, 1)',
      description: 'Fondo de elementos activos - Variante oscura del primario'
    },
    {
      name: 'Accent Glow',
      variable: '--accent-glow',
      hex: 'rgba(255, 102, 0, 0.4)',
      rgb: 'rgba(255, 102, 0, 0.4)',
      description: 'Efecto glow para elementos primarios'
    }
  ];

  const backgroundColors: ColorToken[] = [
    {
      name: 'Background',
      variable: '--background',
      hex: '#000000',
      rgb: 'rgba(0, 0, 0, 1)',
      description: 'Fondo principal - Negro puro'
    },
    {
      name: 'Background Secondary',
      variable: '--background-secondary',
      hex: '#0D0D0D',
      rgb: 'rgba(13, 13, 13, 1)',
      description: 'Fondo de cards y paneles'
    },
    {
      name: 'Background Tertiary',
      variable: '--background-tertiary',
      hex: '#1A1A1A',
      rgb: 'rgba(26, 26, 26, 1)',
      description: 'Fondo de inputs y elementos interactivos'
    }
  ];

  const foregroundColors: ColorToken[] = [
    {
      name: 'Foreground',
      variable: '--foreground',
      hex: '#FFFFFF',
      rgb: 'rgba(255, 255, 255, 1)',
      description: 'Texto principal - Blanco puro'
    },
    {
      name: 'Foreground Muted',
      variable: '--foreground-muted',
      hex: '#B3B3B3',
      rgb: 'rgba(179, 179, 179, 1)',
      description: 'Texto secundario'
    },
    {
      name: 'Foreground Subtle',
      variable: '--foreground-subtle',
      hex: '#666666',
      rgb: 'rgba(102, 102, 102, 1)',
      description: 'Texto terciario y placeholders'
    }
  ];

  const statusColors: ColorToken[] = [
    {
      name: 'Success',
      variable: '--success',
      hex: '#00FF00',
      rgb: 'rgba(0, 255, 0, 1)',
      description: 'Estados de éxito - Verde terminal'
    },
    {
      name: 'Destructive',
      variable: '--destructive',
      hex: '#FF0000',
      rgb: 'rgba(255, 0, 0, 1)',
      description: 'Errores y acciones destructivas'
    },
    {
      name: 'Warning',
      variable: '--warning',
      hex: '#FFFF00',
      rgb: 'rgba(255, 255, 0, 1)',
      description: 'Advertencias - Amarillo terminal'
    }
  ];

  const borderColors: ColorToken[] = [
    {
      name: 'Border',
      variable: '--border',
      hex: '#333333',
      rgb: 'rgba(51, 51, 51, 1)',
      description: 'Bordes de componentes'
    },
    {
      name: 'Border Hover',
      variable: '--border-hover',
      hex: '#FF6600',
      rgb: 'rgba(255, 102, 0, 1)',
      description: 'Bordes en estado hover'
    }
  ];

  return (
    <div>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Colors_</h1>
        <p style={descStyles}>
          // Paleta de colores del tema terminal
        </p>
      </header>

      <ShowcaseSection
        title="Colores Primarios"
        description="Orange (#FF6600) - Color principal del sistema"
      >
        <ComponentPreview>
          <div>
            {primaryColors.map((color) => (
              <ColorSwatch key={color.variable} color={color} />
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Fondos"
        description="Escala de negros para fondos y paneles"
      >
        <ComponentPreview>
          <div>
            {backgroundColors.map((color) => (
              <ColorSwatch key={color.variable} color={color} />
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Texto"
        description="Escala de blancos y grises para texto"
      >
        <ComponentPreview>
          <div>
            {foregroundColors.map((color) => (
              <ColorSwatch key={color.variable} color={color} />
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Estados"
        description="Colores para feedback y estados del sistema"
      >
        <ComponentPreview>
          <div>
            {statusColors.map((color) => (
              <ColorSwatch key={color.variable} color={color} />
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Bordes"
        description="Colores para bordes y separadores"
      >
        <ComponentPreview>
          <div>
            {borderColors.map((color) => (
              <ColorSwatch key={color.variable} color={color} />
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection title="Uso de Variables CSS">
        <div style={{
          padding: '24px',
          backgroundColor: 'var(--background-secondary)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          fontSize: '12px',
          lineHeight: '1.8',
          fontFamily: 'var(--font-mono)'
        }}>
          <div style={{
            marginBottom: '12px',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: 'var(--font-mono)',
            color: 'var(--foreground)',
            textTransform: 'uppercase'
          }}>
            // Ejemplo de uso:
          </div>
          <pre style={{ margin: 0, color: 'var(--foreground-muted)' }}>
{`.terminal-button {
  background-color: var(--primary);
  color: var(--background);
  border: 1px solid var(--primary);
  box-shadow: var(--shadow-glow-sm);
}

.terminal-card {
  background-color: var(--background-secondary);
  border: 1px solid var(--border);
  color: var(--foreground);
}

.error-state {
  color: var(--destructive);
  text-shadow: 0 0 10px var(--destructive-glow);
}`}
          </pre>
        </div>
      </ShowcaseSection>
    </div>
  );
}
