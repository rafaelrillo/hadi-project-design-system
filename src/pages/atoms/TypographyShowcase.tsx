// Path: src/pages/atoms/TypographyShowcase.tsx
// FING Design System
import type { CSSProperties } from 'react';
import { Heading1, Heading2, Heading3, Heading4, Paragraph, Label, ProductKey } from '../../components/atoms/Typography';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { showcase } from '../showcaseStyles';

export function TypographyShowcase() {
  return (
    <div style={{ background: 'var(--marble-base)', minHeight: '100%', padding: '24px' }}>
      {/* Page Header */}
      <header style={showcase.header.container}>
        <h1 style={showcase.header.title}>&gt; Typography_</h1>
        <p style={showcase.header.description}>
          // Sistema tipográfico con componentes semánticos
        </p>
      </header>

      {/* Headings */}
      <ShowcaseSection
        title="Headings"
        description="Jerarquía de títulos - Todos con JetBrains Mono"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
            <Heading1>Heading 1 - 18px Bold</Heading1>
            <Heading2>Heading 2 - 16px Bold</Heading2>
            <Heading3>Heading 3 - 16px Semibold</Heading3>
            <Heading4>Heading 4 - 14px Semibold</Heading4>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Body Text */}
      <ShowcaseSection
        title="Body Text"
        description="Paragraph - 14px Regular para contenido de texto"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '600px' }}>
            <Paragraph>
              Este es un párrafo de ejemplo. El componente Paragraph usa 14px Regular con line-height 1.2.
              Ideal para contenido de texto general en la aplicación.
            </Paragraph>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua.
            </Paragraph>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Labels */}
      <ShowcaseSection
        title="Label"
        description="Label - 12px Regular para etiquetas de formularios"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '400px' }}>
            <div>
              <Label htmlFor="example-input-1">Nombre completo</Label>
              <input
                id="example-input-1"
                type="text"
                placeholder="Juan Pérez"
                style={{
                  width: '100%',
                  height: '40px',
                  padding: '8px 12px',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  fontSize: '14px',
                  marginTop: '4px',
                  backgroundColor: 'var(--background-secondary)',
                  color: 'var(--foreground)',
                  fontFamily: 'var(--fing-font-mono)'
                }}
              />
            </div>
            <div>
              <Label htmlFor="example-input-2">Correo electrónico</Label>
              <input
                id="example-input-2"
                type="email"
                placeholder="correo@ejemplo.com"
                style={{
                  width: '100%',
                  height: '40px',
                  padding: '8px 12px',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  fontSize: '14px',
                  marginTop: '4px',
                  backgroundColor: 'var(--background-secondary)',
                  color: 'var(--foreground)',
                  fontFamily: 'var(--fing-font-mono)'
                }}
              />
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* ProductKey */}
      <ShowcaseSection
        title="ProductKey"
        description="ProductKey - 24px Bold, Color accent para branding"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
            <ProductKey>FING</ProductKey>
            <ProductKey>Design System v2.0.0</ProductKey>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ProductKey>SNT</ProductKey>
              <Paragraph>Investment Observatory</Paragraph>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Typography Hierarchy */}
      <ShowcaseSection
        title="Jerarquía Completa"
        description="Todos los componentes tipográficos juntos"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '700px' }}>
            <div>
              <ProductKey>FING</ProductKey>
              <Paragraph style={{ marginTop: '8px', color: 'var(--foreground-muted)' }}>Design System v2.0.0</Paragraph>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
              <Heading1>Introducción al Sistema</Heading1>
              <Paragraph style={{ marginTop: '12px' }}>
                Este es un sistema de diseño completo que incluye componentes atómicos, moleculares y organismos.
              </Paragraph>
            </div>

            <div>
              <Heading2>Componentes Principales</Heading2>
              <Paragraph style={{ marginTop: '12px' }}>
                Los componentes están organizados siguiendo la metodología Atomic Design.
              </Paragraph>
            </div>

            <div>
              <Heading3>Átomos y Moléculas</Heading3>
              <Paragraph style={{ marginTop: '12px' }}>
                Los átomos son los elementos más básicos, mientras que las moléculas combinan varios átomos.
              </Paragraph>
            </div>

            <div>
              <Heading4>Especificaciones Técnicas</Heading4>
              <Paragraph style={{ marginTop: '12px' }}>
                Todos los componentes siguen las guías de estilo definidas en el design system.
              </Paragraph>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           CARVED - Escala de Intensidad
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Carved — Escala de Intensidad"
        description="Texto cavado en containers RAISED. De ultra-sutil a fuerte"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <div
              style={{
                background: 'var(--marble-base)',
                boxShadow: 'var(--raised-2)',
                borderRadius: '16px',
                padding: '24px',
              }}
            >
              <Label effect="carved-muted">RAISED Container</Label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                <div>
                  <Label effect="carved-muted">whisper — var(--lp-whisper)</Label>
                  <Heading3 effect="carved-whisper" style={{ marginTop: '4px' }}>Ultra-sutil para mobile y vistas compactas</Heading3>
                </div>
                <div>
                  <Label effect="carved-muted">standard — var(--lp-primary)</Label>
                  <Heading3 effect="carved" style={{ marginTop: '4px' }}>Intensidad base para texto general</Heading3>
                </div>
                <div>
                  <Label effect="carved-muted">strong — var(--lp-primary-strong)</Label>
                  <Heading3 effect="carved-strong" style={{ marginTop: '4px' }}>Enfasis fuerte para valores y titulos hero</Heading3>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           CARVED - Colores Semánticos
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Carved — Colores Semánticos"
        description="Cada color semantico en 3 intensidades: standard (0.5px), medium (0.75px), strong (1px)"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <div
              style={{
                background: 'var(--marble-base)',
                boxShadow: 'var(--raised-2)',
                borderRadius: '16px',
                padding: '24px',
              }}
            >
              <Label effect="carved-muted">RAISED Container — Carved Semántico</Label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '16px' }}>
                {/* Petrol */}
                <div>
                  <Label effect="carved-muted">Petrol (Accent)</Label>
                  <Heading4 effect="carved-petrol" style={{ color: 'var(--fing-accent)', marginTop: '4px' }}>Standard</Heading4>
                  <Heading4 effect="carved-petrol-md" style={{ color: 'var(--fing-accent)', marginTop: '4px' }}>Medium</Heading4>
                  <Heading4 effect="carved-accent-strong" style={{ color: 'var(--fing-accent)', marginTop: '4px' }}>Strong</Heading4>
                </div>
                {/* Positive */}
                <div>
                  <Label effect="carved-muted">Positive (Jade)</Label>
                  <Heading4 effect="carved-positive" style={{ color: 'var(--fing-positive)', marginTop: '4px' }}>Standard</Heading4>
                  <Heading4 effect="carved-positive-md" style={{ color: 'var(--fing-positive)', marginTop: '4px' }}>Medium</Heading4>
                  <Heading4 effect="carved-positive-strong" style={{ color: 'var(--fing-positive)', marginTop: '4px' }}>Strong</Heading4>
                </div>
                {/* Warning */}
                <div>
                  <Label effect="carved-muted">Warning (Gold)</Label>
                  <Heading4 effect="carved-warning" style={{ color: 'var(--fing-warning)', marginTop: '4px' }}>Standard</Heading4>
                  <Heading4 effect="carved-warning-md" style={{ color: 'var(--fing-warning)', marginTop: '4px' }}>Medium</Heading4>
                  <Heading4 effect="carved-warning-strong" style={{ color: 'var(--fing-warning)', marginTop: '4px' }}>Strong</Heading4>
                </div>
                {/* Negative */}
                <div>
                  <Label effect="carved-muted">Negative (Rust)</Label>
                  <Heading4 effect="carved-negative" style={{ color: 'var(--fing-negative)', marginTop: '4px' }}>Standard</Heading4>
                  <Heading4 effect="carved-negative-md" style={{ color: 'var(--fing-negative)', marginTop: '4px' }}>Medium</Heading4>
                  <Heading4 effect="carved-negative-strong" style={{ color: 'var(--fing-negative)', marginTop: '4px' }}>Strong</Heading4>
                </div>
                {/* Info / Steel */}
                <div>
                  <Label effect="carved-muted">Info (Steel)</Label>
                  <Heading4 effect="carved-info" style={{ color: 'var(--fing-info)', marginTop: '4px' }}>Standard</Heading4>
                  <Heading4 effect="carved-info-strong" style={{ color: 'var(--fing-info)', marginTop: '4px' }}>Strong</Heading4>
                </div>
                {/* Muted */}
                <div>
                  <Label effect="carved-muted">Muted</Label>
                  <Heading4 effect="carved-muted" style={{ color: 'var(--foreground-muted)', marginTop: '4px' }}>Standard</Heading4>
                  <Heading4 effect="carved-whisper" style={{ color: 'var(--foreground-muted)', marginTop: '4px' }}>Whisper</Heading4>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           EMBOSSED - En Containers INSET
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Embossed — Containers INSET"
        description="Texto en relieve dentro de containers hundidos. De small a strong"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <div
              style={{
                background: 'var(--marble-base)',
                boxShadow: 'var(--inset-2)',
                borderRadius: '16px',
                padding: '24px',
              }}
            >
              <Label effect="embossed">INSET Container — Escala de Intensidad</Label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                <div>
                  <Label effect="embossed">sm — var(--lp-embossed-sm)</Label>
                  <Heading3 effect="embossed-petrol-sm" style={{ color: 'var(--fing-accent)', marginTop: '4px' }}>Small para labels y captions</Heading3>
                </div>
                <div>
                  <Label effect="embossed">subtle — var(--lp-embossed-subtle)</Label>
                  <Heading3 effect="embossed-subtle" style={{ marginTop: '4px' }}>Sutil para texto secundario</Heading3>
                </div>
                <div>
                  <Label effect="embossed">standard — var(--lp-embossed)</Label>
                  <Heading3 effect="embossed" style={{ marginTop: '4px' }}>Base para texto general en inset</Heading3>
                </div>
                <div>
                  <Label effect="embossed">strong — var(--lp-embossed-strong)</Label>
                  <Heading3 effect="embossed-strong" style={{ marginTop: '4px' }}>Fuerte para titulos principales</Heading3>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>

        {/* Embossed semantic colors */}
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <div
              style={{
                background: 'var(--marble-base)',
                boxShadow: 'var(--inset-2)',
                borderRadius: '16px',
                padding: '24px',
              }}
            >
              <Label effect="embossed">INSET Container — Colores Semánticos</Label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
                <div>
                  <Label effect="embossed">Petrol</Label>
                  <Heading4 effect="embossed-petrol" style={{ color: 'var(--fing-accent)', marginTop: '4px' }}>Standard</Heading4>
                  <Heading4 effect="embossed-petrol-sm" style={{ color: 'var(--fing-accent)', marginTop: '4px' }}>Small</Heading4>
                </div>
                <div>
                  <Label effect="embossed">Positive (Jade)</Label>
                  <Heading4 effect="embossed-positive" style={{ color: 'var(--fing-positive)', marginTop: '4px' }}>Standard</Heading4>
                  <Heading4 effect="embossed-positive-sm" style={{ color: 'var(--fing-positive)', marginTop: '4px' }}>Small</Heading4>
                </div>
                <div>
                  <Label effect="embossed">Warning (Gold)</Label>
                  <Heading4 effect="embossed-warning" style={{ color: 'var(--fing-warning)', marginTop: '4px' }}>Standard</Heading4>
                  <Heading4 effect="embossed-warning-sm" style={{ color: 'var(--fing-warning)', marginTop: '4px' }}>Small</Heading4>
                </div>
                <div>
                  <Label effect="embossed">Negative (Rust)</Label>
                  <Heading4 effect="embossed-negative" style={{ color: 'var(--fing-negative)', marginTop: '4px' }}>Standard</Heading4>
                  <Heading4 effect="embossed-negative-sm" style={{ color: 'var(--fing-negative)', marginTop: '4px' }}>Small</Heading4>
                </div>
                <div>
                  <Label effect="embossed">Info (Steel)</Label>
                  <Heading4 effect="embossed-info" style={{ color: 'var(--fing-info)', marginTop: '4px' }}>Standard</Heading4>
                  <Heading4 effect="embossed-info-sm" style={{ color: 'var(--fing-info)', marginTop: '4px' }}>Small</Heading4>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           GLOW - Efectos de brillo
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Glow — Efectos de Brillo"
        description="Brillo no-direccional para elementos activos o destacados"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <div
              style={{
                background: 'var(--marble-base)',
                boxShadow: 'var(--raised-2)',
                borderRadius: '16px',
                padding: '24px',
              }}
            >
              <Label effect="carved-muted">Glow Effects</Label>
              <div style={{ display: 'flex', gap: '32px', marginTop: '16px', flexWrap: 'wrap' }}>
                <Heading2 effect="glow-petrol" style={{ color: 'var(--fing-accent)' }}>Petrol Glow</Heading2>
                <Heading2 effect="glow-positive" style={{ color: 'var(--fing-positive)' }}>Positive Glow</Heading2>
                <Heading2 effect="glow-negative" style={{ color: 'var(--fing-negative)' }}>Negative Glow</Heading2>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           USO REAL: FingHome
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Uso Real: FingHome"
        description="Patrones tipograficos extraidos de la landing page. 100% usa variables --lp-*"
      >
        {/* Hero section */}
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <div
              style={{
                background: 'var(--marble-base)',
                boxShadow: 'var(--raised-3)',
                borderRadius: '20px',
                padding: '32px',
              }}
            >
              <Label effect="carved-muted">Hero Section</Label>
              <div style={{ marginTop: '16px' }}>
                <Heading1 effect="carved-petrol" style={{ color: 'var(--fing-accent)', fontSize: '24px' }}>
                  FING
                </Heading1>
                <Paragraph effect="carved-muted" style={{ color: 'var(--foreground-muted)', marginTop: '8px' }}>
                  Quiet intelligence. The long view.
                </Paragraph>
              </div>

              <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                <div style={{
                  padding: '8px 20px',
                  background: 'var(--marble-base)',
                  boxShadow: 'var(--raised-1)',
                  borderRadius: '8px',
                }}>
                  <Paragraph effect="carved-petrol" style={{ color: 'var(--fing-accent)' }}>
                    btnPrimary → --lp-petrol
                  </Paragraph>
                </div>
                <div style={{
                  padding: '8px 20px',
                  background: 'var(--marble-base)',
                  boxShadow: 'var(--raised-1)',
                  borderRadius: '8px',
                }}>
                  <Paragraph effect="carved-muted" style={{ color: 'var(--foreground-muted)' }}>
                    btnSecondary → --lp-muted
                  </Paragraph>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>

        {/* Etymology + Synthesis */}
        <ComponentPreview>
          <div style={{ width: '100%', display: 'flex', gap: '16px' }}>
            {/* Etymology (RAISED) */}
            <div
              style={{
                flex: 1,
                background: 'var(--marble-base)',
                boxShadow: 'var(--raised-2)',
                borderRadius: '16px',
                padding: '24px',
              }}
            >
              <Label effect="carved-steel" style={{ color: 'var(--fing-text-accent)' }}>Secciones RAISED</Label>
              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Heading4 effect="carved-steel" style={{ color: 'var(--fing-text-accent)' }}>sectionLabel → --lp-steel</Heading4>
                <Heading3 effect="carved-petrol" style={{ color: 'var(--fing-accent)' }}>etymologyWord → --lp-petrol-whisper</Heading3>
                <Paragraph effect="carved-muted" style={{ color: 'var(--foreground-muted)' }}>etymologyMeaning → --lp-muted</Paragraph>
              </div>
            </div>

            {/* Synthesis (INSET) */}
            <div
              style={{
                flex: 1,
                background: 'var(--marble-base)',
                boxShadow: 'var(--inset-2)',
                borderRadius: '16px',
                padding: '24px',
              }}
            >
              <Label effect="embossed">Secciones INSET</Label>
              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Heading3 effect="embossed-subtle">synthesisFormula → --lp-embossed-subtle</Heading3>
                <Heading3 effect="embossed-petrol" style={{ color: 'var(--fing-accent)' }}>synthesisHighlight → --lp-embossed-petrol</Heading3>
                <Paragraph effect="embossed-petrol-sm" style={{ color: 'var(--fing-accent)' }}>voiceExample → --lp-embossed-petrol-sm</Paragraph>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           USO REAL: Dashboard — KPIs
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Uso Real: Dashboard — KPIs"
        description="Valores KPI en containers RAISED con labels en containers INSET"
      >
        <ComponentPreview>
          <div style={{ width: '100%', display: 'flex', gap: '16px' }}>
            {/* KPI Petrol */}
            <div style={{ flex: 1 }}>
              <div style={{
                background: 'var(--marble-base)',
                boxShadow: 'var(--raised-2)',
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'center',
              }}>
                <Heading1 effect="carved-accent-strong" style={{ color: 'var(--fing-accent)', fontSize: '28px' }}>
                  $124,500
                </Heading1>
                <Label effect="carved-muted" style={{ marginTop: '4px' }}>carved-accent-strong</Label>
              </div>
              <div style={{
                background: 'var(--marble-base)',
                boxShadow: 'var(--inset-1)',
                borderRadius: '12px',
                padding: '12px',
                marginTop: '8px',
                textAlign: 'center',
              }}>
                <Label effect="embossed-petrol-sm" style={{ color: 'var(--fing-accent)' }}>PORTFOLIO VALUE</Label>
                <Label effect="embossed" style={{ marginTop: '2px', display: 'block' }}>embossed-petrol-sm</Label>
              </div>
            </div>

            {/* KPI Positive */}
            <div style={{ flex: 1 }}>
              <div style={{
                background: 'var(--marble-base)',
                boxShadow: 'var(--raised-2)',
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'center',
              }}>
                <Heading1 effect="carved-positive-strong" style={{ color: 'var(--fing-positive)', fontSize: '28px' }}>
                  +12.4%
                </Heading1>
                <Label effect="carved-muted" style={{ marginTop: '4px' }}>carved-positive-strong</Label>
              </div>
              <div style={{
                background: 'var(--marble-base)',
                boxShadow: 'var(--inset-1)',
                borderRadius: '12px',
                padding: '12px',
                marginTop: '8px',
                textAlign: 'center',
              }}>
                <Label effect="embossed-positive-sm" style={{ color: 'var(--fing-positive)' }}>RETURN YTD</Label>
                <Label effect="embossed" style={{ marginTop: '2px', display: 'block' }}>embossed-positive-sm</Label>
              </div>
            </div>

            {/* KPI Warning */}
            <div style={{ flex: 1 }}>
              <div style={{
                background: 'var(--marble-base)',
                boxShadow: 'var(--raised-2)',
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'center',
              }}>
                <Heading1 effect="carved-warning-strong" style={{ color: 'var(--fing-warning)', fontSize: '28px' }}>
                  0.78
                </Heading1>
                <Label effect="carved-muted" style={{ marginTop: '4px' }}>carved-warning-strong</Label>
              </div>
              <div style={{
                background: 'var(--marble-base)',
                boxShadow: 'var(--inset-1)',
                borderRadius: '12px',
                padding: '12px',
                marginTop: '8px',
                textAlign: 'center',
              }}>
                <Label effect="embossed-warning-sm" style={{ color: 'var(--fing-warning)' }}>SHARPE RATIO</Label>
                <Label effect="embossed" style={{ marginTop: '2px', display: 'block' }}>embossed-warning-sm</Label>
              </div>
            </div>

            {/* KPI Negative */}
            <div style={{ flex: 1 }}>
              <div style={{
                background: 'var(--marble-base)',
                boxShadow: 'var(--raised-2)',
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'center',
              }}>
                <Heading1 effect="carved-negative-strong" style={{ color: 'var(--fing-negative)', fontSize: '28px' }}>
                  -3.2%
                </Heading1>
                <Label effect="carved-muted" style={{ marginTop: '4px' }}>carved-negative-strong</Label>
              </div>
              <div style={{
                background: 'var(--marble-base)',
                boxShadow: 'var(--inset-1)',
                borderRadius: '12px',
                padding: '12px',
                marginTop: '8px',
                textAlign: 'center',
              }}>
                <Label effect="embossed-negative-sm" style={{ color: 'var(--fing-negative)' }}>MAX DRAWDOWN</Label>
                <Label effect="embossed" style={{ marginTop: '2px', display: 'block' }}>embossed-negative-sm</Label>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           USO REAL: Dashboard — Tablas y Datos
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Uso Real: Dashboard — Tablas de Datos"
        description="Titulos de cards, tickers, precios y cambios porcentuales"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <div
              style={{
                background: 'var(--marble-base)',
                boxShadow: 'var(--raised-2)',
                borderRadius: '16px',
                padding: '24px',
              }}
            >
              {/* Card title */}
              <Heading3 effect="carved-petrol-md" style={{ color: 'var(--fing-accent)', marginBottom: '16px' }}>
                Top Picks — carved-petrol-md
              </Heading3>

              {/* Data table simulation */}
              <div style={{
                background: 'var(--marble-base)',
                boxShadow: 'var(--inset-1)',
                borderRadius: '12px',
                padding: '16px',
              }}>
                {/* Header row */}
                <div style={{ display: 'grid', gridTemplateColumns: '40px 80px 1fr 100px 80px', gap: '12px', alignItems: 'center', paddingBottom: '8px', borderBottom: '1px solid var(--border)' }}>
                  <Label effect="embossed">#</Label>
                  <Label effect="embossed">Ticker</Label>
                  <Label effect="embossed">Name</Label>
                  <Label effect="embossed" style={{ textAlign: 'right' }}>Price</Label>
                  <Label effect="embossed" style={{ textAlign: 'right' }}>Change</Label>
                </div>

                {/* Row 1 - Positive */}
                <div style={{ display: 'grid', gridTemplateColumns: '40px 80px 1fr 100px 80px', gap: '12px', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                  <Heading4 effect="embossed-petrol-sm" style={{ color: 'var(--fing-accent)' }}>01</Heading4>
                  <Heading4 effect="carved-strong">AAPL</Heading4>
                  <Paragraph effect="carved">Apple Inc.</Paragraph>
                  <Paragraph effect="carved" style={{ textAlign: 'right' }}>$189.84</Paragraph>
                  <Paragraph effect="carved-positive-md" style={{ color: 'var(--fing-positive)', textAlign: 'right' }}>+2.34%</Paragraph>
                </div>

                {/* Row 2 - Negative */}
                <div style={{ display: 'grid', gridTemplateColumns: '40px 80px 1fr 100px 80px', gap: '12px', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                  <Heading4 effect="embossed-petrol-sm" style={{ color: 'var(--fing-accent)' }}>02</Heading4>
                  <Heading4 effect="carved-strong">TSLA</Heading4>
                  <Paragraph effect="carved">Tesla Inc.</Paragraph>
                  <Paragraph effect="carved" style={{ textAlign: 'right' }}>$245.12</Paragraph>
                  <Paragraph effect="carved-negative-md" style={{ color: 'var(--fing-negative)', textAlign: 'right' }}>-1.82%</Paragraph>
                </div>

                {/* Row 3 - Warning */}
                <div style={{ display: 'grid', gridTemplateColumns: '40px 80px 1fr 100px 80px', gap: '12px', alignItems: 'center', padding: '10px 0' }}>
                  <Heading4 effect="embossed-petrol-sm" style={{ color: 'var(--fing-accent)' }}>03</Heading4>
                  <Heading4 effect="carved-strong">NVDA</Heading4>
                  <Paragraph effect="carved">NVIDIA Corp.</Paragraph>
                  <Paragraph effect="carved" style={{ textAlign: 'right' }}>$878.36</Paragraph>
                  <Paragraph effect="carved-warning-md" style={{ color: 'var(--fing-warning)', textAlign: 'right' }}>+0.12%</Paragraph>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           USO REAL: Dashboard — Botones
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Uso Real: Dashboard — Botones"
        description="Texto de botones RAISED con efecto carved petrol"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <div
              style={{
                background: 'var(--marble-base)',
                boxShadow: 'var(--raised-2)',
                borderRadius: '16px',
                padding: '24px',
              }}
            >
              <Label effect="carved-muted">Botones Dashboard</Label>
              <div style={{ display: 'flex', gap: '16px', marginTop: '16px', flexWrap: 'wrap' }}>
                <div style={{
                  padding: '12px 24px',
                  background: 'var(--marble-base)',
                  boxShadow: 'var(--raised-2)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                }}>
                  <Heading4 effect="carved-accent-strong" style={{ color: 'var(--fing-accent)' }}>
                    View Portfolio
                  </Heading4>
                  <Label effect="carved-muted" style={{ marginTop: '4px' }}>raisedButton → carved-accent-strong</Label>
                </div>
                <div style={{
                  padding: '8px 16px',
                  background: 'var(--marble-base)',
                  boxShadow: 'var(--raised-1)',
                  borderRadius: '20px',
                }}>
                  <Paragraph effect="carved-petrol-md" style={{ color: 'var(--fing-accent)' }}>
                    Simulate
                  </Paragraph>
                  <Label effect="carved-muted" style={{ marginTop: '2px' }}>pillFrameButtonSm → carved-petrol-md</Label>
                </div>
                <div style={{
                  padding: '8px 16px',
                  background: 'var(--marble-base)',
                  boxShadow: 'var(--raised-1)',
                  borderRadius: '20px',
                }}>
                  <Paragraph effect="carved-negative-md" style={{ color: 'var(--fing-negative)' }}>
                    Sell
                  </Paragraph>
                  <Label effect="carved-muted" style={{ marginTop: '2px' }}>dataTableTitleSell → carved-negative-md</Label>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           USO REAL: Dashboard — Mobile
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Uso Real: Dashboard — Mobile"
        description="Variantes whisper y compactas usadas en vistas mobile"
      >
        <ComponentPreview>
          <div style={{ width: '100%', maxWidth: '375px', margin: '0 auto' }}>
            <div
              style={{
                background: 'var(--marble-base)',
                boxShadow: 'var(--raised-2)',
                borderRadius: '16px',
                padding: '16px',
              }}
            >
              <Label effect="carved-muted">Mobile View</Label>

              {/* Mobile value card */}
              <div style={{
                background: 'var(--marble-base)',
                boxShadow: 'var(--inset-1)',
                borderRadius: '12px',
                padding: '16px',
                marginTop: '12px',
              }}>
                <Label effect="embossed">PORTFOLIO</Label>
                <Heading2 effect="carved-strong" style={{ marginTop: '4px' }}>$124,500</Heading2>
                <Paragraph effect="carved-positive-md" style={{ color: 'var(--fing-positive)', marginTop: '4px' }}>
                  +2.34% today
                </Paragraph>
              </div>

              {/* Mobile picks */}
              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Heading4 effect="glow-petrol" style={{ color: 'var(--fing-accent)' }}>01</Heading4>
                    <Paragraph effect="carved-whisper">AAPL</Paragraph>
                  </div>
                  <Paragraph effect="carved-positive" style={{ color: 'var(--fing-positive)' }}>+2.34%</Paragraph>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Heading4 effect="glow-petrol" style={{ color: 'var(--fing-accent)' }}>02</Heading4>
                    <Paragraph effect="carved-whisper">TSLA</Paragraph>
                  </div>
                  <Paragraph effect="carved-negative" style={{ color: 'var(--fing-negative)' }}>-1.82%</Paragraph>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           REFERENCIA COMPLETA
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Referencia Completa de Variables"
        description="Todas las variables --lp-* disponibles en letterpress.css"
      >
        <div style={{ fontSize: '12px', color: 'var(--foreground)', lineHeight: '2', fontFamily: 'var(--fing-font-mono)' }}>
          <p style={{ marginBottom: '8px' }}><strong style={{ color: 'var(--primary)' }}>CARVED (texto en containers RAISED):</strong></p>
          <p>--lp-primary .......... standard charcoal (0.5px)</p>
          <p>--lp-primary-strong ... strong charcoal (1px)</p>
          <p>--lp-whisper .......... ultra-sutil (0.5px, low opacity)</p>
          <p>--lp-carved-sm ........ small neutral (0.5px)</p>
          <p>--lp-carved-md ........ medium neutral (0.75px)</p>
          <p>--lp-carved-lg ........ large neutral (1px)</p>
          <p>--lp-petrol ........... standard petrol</p>
          <p>--lp-petrol-strong .... strong petrol (1px)</p>
          <p>--lp-petrol-md ........ medium petrol (0.75px)</p>
          <p>--lp-petrol-whisper ... whisper petrol</p>
          <p>--lp-steel ............ standard steel</p>
          <p>--lp-steel-strong ..... strong steel (1px)</p>
          <p>--lp-muted ............ muted/secondary</p>
          <p>--lp-positive ......... standard jade</p>
          <p>--lp-positive-strong .. strong jade (1px)</p>
          <p>--lp-positive-md ...... medium jade (0.75px)</p>
          <p>--lp-warning .......... standard gold</p>
          <p>--lp-warning-strong ... strong gold (1px)</p>
          <p>--lp-warning-md ....... medium gold (0.75px)</p>
          <p>--lp-negative ......... standard rust</p>
          <p>--lp-negative-strong .. strong rust (1px)</p>
          <p>--lp-negative-md ...... medium rust (0.75px)</p>
          <p>--lp-info ............. standard steel</p>
          <p>--lp-info-strong ...... strong steel (1px)</p>
          <p>--lp-accent ........... standard accent</p>
          <p>--lp-accent-strong .... strong accent (1px)</p>

          <p style={{ marginTop: '16px', marginBottom: '8px' }}><strong style={{ color: 'var(--primary)' }}>EMBOSSED (texto en containers INSET):</strong></p>
          <p>--lp-embossed ......... standard (1.5px)</p>
          <p>--lp-embossed-subtle .. subtle (1px)</p>
          <p>--lp-embossed-strong .. strong (2px)</p>
          <p>--lp-embossed-sm ...... small (0.5px)</p>
          <p>--lp-embossed-petrol .. standard petrol (1.5px)</p>
          <p>--lp-embossed-petrol-sm small petrol (0.75px)</p>
          <p>--lp-embossed-positive  standard jade</p>
          <p>--lp-embossed-positive-sm small jade (0.5px)</p>
          <p>--lp-embossed-warning . standard gold</p>
          <p>--lp-embossed-warning-sm small gold (0.5px)</p>
          <p>--lp-embossed-negative  standard rust</p>
          <p>--lp-embossed-negative-sm small rust (0.5px)</p>
          <p>--lp-embossed-info .... standard steel</p>
          <p>--lp-embossed-info-sm . small steel (0.5px)</p>

          <p style={{ marginTop: '16px', marginBottom: '8px' }}><strong style={{ color: 'var(--primary)' }}>GLOW (brillo no-direccional):</strong></p>
          <p>--lp-glow-petrol ...... petrol glow (6px blur)</p>
          <p>--lp-glow-positive .... jade glow (6px blur)</p>
          <p>--lp-glow-negative .... rust glow (6px blur)</p>

          <p style={{ marginTop: '16px', marginBottom: '8px' }}><strong style={{ color: 'var(--primary)' }}>ICON (filter: drop-shadow):</strong></p>
          <p>--lp-icon ............. carved neutral</p>
          <p>--lp-icon-accent ...... carved petrol</p>
          <p>--lp-icon-negative .... carved rust</p>
          <p>--lp-icon-glow ........ glow petrol</p>
          <p>--lp-icon-glow-negative glow rust</p>

          <p style={{ marginTop: '16px', marginBottom: '8px' }}><strong style={{ color: 'var(--primary)' }}>DASHBOARD SPECIFIC:</strong></p>
          <p>--lp-title-carved ..... card/table title (0.75px neutral)</p>
          <p>--lp-data ............. data cell subtle (0.5px neutral)</p>
          <p>--lp-rank ............. rank number petrol</p>
        </div>
      </ShowcaseSection>

      {/* Technical Specifications */}
      <ShowcaseSection title="Especificaciones Tecnicas">
        <div style={{ fontSize: '12px', color: 'var(--foreground)', lineHeight: '1.8', fontFamily: 'var(--fing-font-mono)' }}>
          <p><strong style={{ color: 'var(--primary)' }}>Font-family:</strong> IBM Plex Mono (var(--fing-font-mono))</p>
          <p><strong style={{ color: 'var(--primary)' }}>Line-height:</strong> 1.2</p>
          <p><strong style={{ color: 'var(--primary)' }}>Color base:</strong> var(--foreground)</p>
          <p style={{ marginTop: '12px' }}><strong style={{ color: 'var(--primary)' }}>Tamanos y pesos:</strong></p>
          <p>Heading1: 18px, 700 (Bold)</p>
          <p>Heading2: 16px, 700 (Bold)</p>
          <p>Heading3: 16px, 600 (Semibold)</p>
          <p>Heading4: 14px, 600 (Semibold)</p>
          <p>Paragraph: 14px, 400 (Regular)</p>
          <p>Label: 12px, 400 (Regular)</p>
          <p>ProductKey: 24px, 700 (Bold), color var(--primary)</p>
          <p style={{ marginTop: '12px' }}><strong style={{ color: 'var(--primary)' }}>Uso del prop effect:</strong></p>
          <p>{`<Heading1 effect="carved">Texto cavado</Heading1>`}</p>
          <p>{`<Paragraph effect="embossed-petrol">Texto relieve</Paragraph>`}</p>
          <p>{`<Label effect="carved-positive-strong">KPI label</Label>`}</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}
