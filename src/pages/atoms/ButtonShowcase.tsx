// Path: src/pages/atoms/ButtonShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism Buttons
import React from 'react';
import { Button } from '../../components/atoms/Button';
import { ShowcaseSection } from '../../components/showcase';
import { Search, Save, Trash2, Plus, Download, Sparkles, Zap, Crown, Check, X, Settings, Bell } from 'lucide-react';
import { LightEngineProvider } from '@/contexts/LightEngineContext';

export function ButtonShowcase() {
  const pageHeaderStyles: React.CSSProperties = {
    marginBottom: '32px',
    padding: '24px',
    background: 'var(--neu-base)',
    borderRadius: '15px',
    boxShadow: '-20px -20px 60px var(--neu-shadow-light), 20px 20px 60px var(--neu-shadow-dark)',
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

  const sectionLabelStyles: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 600,
    marginBottom: '12px',
    color: 'var(--sentinel-text-secondary)',
    fontFamily: 'var(--sentinel-font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  };

  const specTextStyles: React.CSSProperties = {
    fontSize: '12px',
    color: 'var(--sentinel-text-secondary)',
    lineHeight: '1.8',
    fontFamily: 'var(--sentinel-font-mono)',
  };

  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <div style={{ background: 'var(--neu-base)', minHeight: '100%', padding: '24px' }}>
        {/* Page Header */}
        <header style={pageHeaderStyles}>
          <h1 style={titleStyles}>&gt; Button_</h1>
          <p style={descStyles}>
            // Glass-Neumorphism buttons con sombras dinámicas
          </p>
        </header>

        {/* Primary Buttons */}
        <ShowcaseSection
          title="Primary Buttons"
          description="Acción principal - Glass con acento teal y glow"
        >
          <div>
            <Button variant="primary">Guardar</Button>
            <Button variant="primary">Confirmar</Button>
            <Button variant="primary">Aceptar</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </div>
        </ShowcaseSection>

        {/* Secondary Buttons */}
        <ShowcaseSection
          title="Secondary Buttons"
          description="Acción secundaria - Glass sutil con borde neutral"
        >
          <div>
            <Button variant="secondary">Cancelar</Button>
            <Button variant="secondary">Volver</Button>
            <Button variant="secondary">Cerrar</Button>
            <Button variant="secondary" disabled>Disabled</Button>
          </div>
        </ShowcaseSection>

        {/* Destructive Buttons */}
        <ShowcaseSection
          title="Destructive Buttons"
          description="Acciones irreversibles - Glass con acento rojo"
        >
          <div>
            <Button variant="destructive">Eliminar</Button>
            <Button variant="destructive">Borrar</Button>
            <Button variant="destructive">Rechazar</Button>
            <Button variant="destructive" disabled>Disabled</Button>
          </div>
        </ShowcaseSection>

        {/* Success Buttons */}
        <ShowcaseSection
          title="Success Buttons"
          description="Acciones positivas - Glass con acento verde"
        >
          <div>
            <Button variant="success">Aprobar</Button>
            <Button variant="success">Completar</Button>
            <Button variant="success">Confirmar</Button>
            <Button variant="success" disabled>Disabled</Button>
          </div>
        </ShowcaseSection>

        {/* Glass Buttons */}
        <ShowcaseSection
          title="Glass Buttons (Dynamic Light Engine)"
          description="Glassmorphism puro con sombras que siguen la luz global"
        >
          <div>
            <Button variant="glass">Glass Button</Button>
            <Button variant="glass" icon={<Sparkles size={18} />}>
              Premium
            </Button>
            <Button variant="glass" icon={<Zap size={18} />}>
              Upgrade
            </Button>
            <Button variant="glass" icon={<Crown size={18} />}>
              Pro Plan
            </Button>
            <Button variant="glass" disabled>Disabled</Button>
          </div>
        </ShowcaseSection>

        {/* Ghost Buttons */}
        <ShowcaseSection
          title="Ghost Buttons"
          description="Botones minimalistas sin fondo glass"
        >
          <div>
            <Button variant="ghost">Ghost</Button>
            <Button variant="ghost">Minimal</Button>
            <Button variant="ghost">Texto</Button>
            <Button variant="ghost" disabled>Disabled</Button>
          </div>
        </ShowcaseSection>

        {/* With Icon Buttons */}
        <ShowcaseSection
          title="Buttons With Icon"
          description="Primary glass con íconos integrados"
        >
          <div>
            <Button variant="with-icon" icon={<Search size={20} />}>
              Buscar
            </Button>
            <Button variant="with-icon" icon={<Save size={20} />}>
              Guardar
            </Button>
            <Button variant="with-icon" icon={<Plus size={20} />}>
              Nuevo
            </Button>
            <Button variant="with-icon" icon={<Download size={20} />}>
              Exportar
            </Button>
            <Button variant="with-icon" icon={<Trash2 size={20} />} disabled>
              Disabled
            </Button>
          </div>
        </ShowcaseSection>

        {/* Button Sizes */}
        <ShowcaseSection
          title="Tamaños"
          description="Small, Medium (default), Large"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <Button variant="secondary" size="sm">Small</Button>
              <Button variant="secondary" size="md">Medium</Button>
              <Button variant="secondary" size="lg">Large</Button>
            </div>
          </div>
        </ShowcaseSection>

        {/* Icon Only Buttons */}
        <ShowcaseSection
          title="Icon Only"
          description="Botones circulares solo con ícono"
        >
          <div>
            <Button variant="primary" iconOnly icon={<Plus size={20} />} ariaLabel="Agregar">{''}</Button>
            <Button variant="secondary" iconOnly icon={<Settings size={20} />} ariaLabel="Configuración">{''}</Button>
            <Button variant="glass" iconOnly icon={<Bell size={20} />} ariaLabel="Notificaciones">{''}</Button>
            <Button variant="success" iconOnly icon={<Check size={20} />} ariaLabel="Confirmar">{''}</Button>
            <Button variant="destructive" iconOnly icon={<X size={20} />} ariaLabel="Cerrar">{''}</Button>
          </div>
        </ShowcaseSection>

        {/* Use Cases */}
        <ShowcaseSection
          title="Casos de Uso"
          description="Combinaciones comunes de botones"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
            {/* Form Actions */}
            <div>
              <h4 style={sectionLabelStyles}>Formulario</h4>
              <div style={{ display: 'flex', gap: '16px' }}>
                <Button variant="secondary">Cancelar</Button>
                <Button variant="primary">Guardar</Button>
              </div>
            </div>

            {/* Delete Confirmation */}
            <div>
              <h4 style={sectionLabelStyles}>Confirmación de Eliminación</h4>
              <div style={{ display: 'flex', gap: '16px' }}>
                <Button variant="secondary">No, volver</Button>
                <Button variant="destructive">Sí, eliminar</Button>
              </div>
            </div>

            {/* Action Bar */}
            <div>
              <h4 style={sectionLabelStyles}>Barra de Acciones</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <Button variant="with-icon" icon={<Plus size={20} />}>
                  Nuevo Usuario
                </Button>
                <Button variant="with-icon" icon={<Download size={20} />}>
                  Exportar
                </Button>
                <Button variant="secondary">Filtros</Button>
              </div>
            </div>
          </div>
        </ShowcaseSection>

        {/* Technical Specifications */}
        <ShowcaseSection title="Especificaciones Técnicas">
          <div style={specTextStyles}>
            <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Estilo:</strong> Glass-Neumorphism con backdrop-filter blur</p>
            <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Altura:</strong> 36px (sm), 44px (md), 52px (lg)</p>
            <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Border radius:</strong> 15px (estándar)</p>
            <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Background:</strong> HSLA colored glass gradients</p>
            <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Sombras:</strong> Neumorphic elevated + inset highlight</p>
            <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Hover:</strong> translateY(-1px) + sombra más profunda</p>
            <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Active:</strong> translateY(1px) + sombra pressed</p>
            <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Light Engine:</strong> Sombras dinámicas que siguen el ángulo de luz</p>
          </div>
        </ShowcaseSection>
      </div>
    </LightEngineProvider>
  );
}
