// Path: src/pages/styles/TypographyCatalogShowcase.tsx
// QUAFI Design System — Catálogo Tipográfico Definitivo
// Combina Typography components + Letterpress effects + Semantic colors
// Referencia: QuafiHome.module.css + DashboardPage.module.css

import type { CSSProperties } from 'react';
import { Heading1, Heading3, Heading4, Paragraph, Label } from '../../components/atoms/Typography';
import type { TextEffect } from '../../components/atoms/Typography';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { showcase } from '../showcaseStyles';

// Reusable marble container styles using CSS variables
const raised = (level: 1 | 2 | 3 = 2): CSSProperties => ({
  background: 'var(--marble-base)',
  boxShadow: `var(--raised-${level})`,
  borderRadius: '20px',
  padding: '24px',
});

const inset = (level: 1 | 2 | 3 = 2): CSSProperties => ({
  background: 'var(--marble-base)',
  boxShadow: `var(--inset-${level})`,
  borderRadius: '12px',
  padding: '20px',
});

const glass: CSSProperties = {
  background: 'var(--glass-bg)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  border: '1px solid var(--glass-border)',
  borderRadius: '12px',
  padding: '16px',
};

// Semantic color map
const semanticColors = {
  petrol: { color: 'var(--quafi-accent)', label: 'Petrol' },
  steel: { color: 'var(--quafi-text-accent)', label: 'Steel' },
  positive: { color: 'var(--quafi-positive)', label: 'Jade' },
  warning: { color: 'var(--quafi-warning)', label: 'Gold' },
  negative: { color: 'var(--quafi-negative)', label: 'Rust' },
  info: { color: 'var(--quafi-info)', label: 'Steel' },
  muted: { color: 'var(--foreground-muted)', label: 'Muted' },
  primary: { color: 'var(--foreground)', label: 'Charcoal' },
};

export function TypographyCatalogShowcase() {
  return (
    <div>
      <header style={showcase.header.container}>
        <h1 style={showcase.header.title}>&gt; Text_Catalog_</h1>
        <p style={showcase.header.description}>
          // Catalogo definitivo: tipografia + efectos + colores
        </p>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════
           1. HERO & DISPLAY — Referencia QuafiHome
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Hero & Display"
        description="Texto hero y display. Referencia: QuafiHome hero section"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <div style={raised(3)}>
              <Label effect="carved-muted" style={{ color: semanticColors.muted.color }}>
                heroWordmark — 96px Light, Petrol, --lp-petrol-whisper
              </Label>
              <div style={{ marginTop: '12px' }}>
                <span style={{
                  fontSize: '72px', fontWeight: 300, color: 'var(--quafi-accent)',
                  fontFamily: 'var(--quafi-wordmark-font, "Cormorant Garamond", serif)',
                  letterSpacing: '0.06em', textShadow: 'var(--lp-petrol-whisper)',
                }}>
                  QUAFI
                </span>
              </div>

              <Label effect="carved-muted" style={{ color: semanticColors.muted.color, marginTop: '24px' }}>
                heroDescriptor — 14px Regular, Muted, --lp-muted
              </Label>
              <Paragraph effect="carved-muted" style={{ color: semanticColors.muted.color, marginTop: '4px' }}>
                Quiet intelligence. The long view. Resolve.
              </Paragraph>

              <Label effect="carved-muted" style={{ color: semanticColors.muted.color, marginTop: '24px' }}>
                voiceHeadline — 20px Regular, Petrol, --lp-petrol-whisper
              </Label>
              <Heading1 effect="carved-petrol" style={{ color: 'var(--quafi-accent)', fontSize: '20px', fontWeight: 400, marginTop: '4px' }}>
                The market shows signs of consolidation
              </Heading1>

              <Label effect="carved-muted" style={{ color: semanticColors.muted.color, marginTop: '24px' }}>
                accessTitle — 26px Regular, Petrol, --lp-petrol-whisper
              </Label>
              <Heading1 effect="carved-petrol" style={{ color: 'var(--quafi-accent)', fontSize: '26px', fontWeight: 400, marginTop: '4px' }}>
                The Engine of Conclusions
              </Heading1>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           2. SECTION LABELS & NAVIGATION — Referencia QuafiHome
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Section Labels & Navigation"
        description="Etiquetas de seccion, nav items, footer. Referencia: QuafiHome"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <div style={raised(2)}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
                <div>
                  <Label effect="carved-muted" style={{ color: semanticColors.muted.color }}>sectionLabel</Label>
                  <Label effect="carved-steel" style={{ color: 'var(--quafi-text-accent)', marginTop: '8px', display: 'block', fontSize: '10px' }}>
                    ETYMOLOGY
                  </Label>
                  <Paragraph effect="carved-muted" style={{ color: semanticColors.muted.color, fontSize: '12px', marginTop: '2px' }}>
                    10px, 500, Steel, --lp-steel
                  </Paragraph>
                </div>

                <div>
                  <Label effect="carved-muted" style={{ color: semanticColors.muted.color }}>scrollIndicator</Label>
                  <Label effect="carved-steel" style={{ color: 'var(--quafi-text-accent)', marginTop: '8px', display: 'block', fontSize: '10px' }}>
                    SCROLL DOWN
                  </Label>
                  <Paragraph effect="carved-muted" style={{ color: semanticColors.muted.color, fontSize: '12px', marginTop: '2px' }}>
                    10px, 400, Steel, --lp-steel
                  </Paragraph>
                </div>

                <div>
                  <Label effect="carved-muted" style={{ color: semanticColors.muted.color }}>comingSoonText</Label>
                  <Label effect="carved-muted" style={{ color: semanticColors.muted.color, marginTop: '8px', display: 'block', fontSize: '12px' }}>
                    COMING SOON
                  </Label>
                  <Paragraph effect="carved-muted" style={{ color: semanticColors.muted.color, fontSize: '12px', marginTop: '2px' }}>
                    12px, 400, Muted, --lp-muted
                  </Paragraph>
                </div>

                <div>
                  <Label effect="carved-muted" style={{ color: semanticColors.muted.color }}>btnPrimary</Label>
                  <div style={{ ...raised(1), padding: '8px 16px', display: 'inline-block', marginTop: '8px', borderRadius: '8px' }}>
                    <Paragraph effect="carved-petrol" style={{ color: 'var(--quafi-accent)' }}>Explore</Paragraph>
                  </div>
                  <Paragraph effect="carved-muted" style={{ color: semanticColors.muted.color, fontSize: '12px', marginTop: '4px' }}>
                    13px, 500, Petrol, --lp-petrol
                  </Paragraph>
                </div>

                <div>
                  <Label effect="carved-muted" style={{ color: semanticColors.muted.color }}>btnSecondary</Label>
                  <div style={{ ...raised(1), padding: '8px 16px', display: 'inline-block', marginTop: '8px', borderRadius: '8px' }}>
                    <Paragraph effect="carved-muted" style={{ color: semanticColors.muted.color }}>Learn More</Paragraph>
                  </div>
                  <Paragraph effect="carved-muted" style={{ color: semanticColors.muted.color, fontSize: '12px', marginTop: '4px' }}>
                    13px, 500, Muted, --lp-muted
                  </Paragraph>
                </div>

                <div>
                  <Label effect="carved-muted" style={{ color: semanticColors.muted.color }}>footerText</Label>
                  <Label effect="carved-steel" style={{ color: 'var(--quafi-text-accent)', marginTop: '8px', display: 'block' }}>
                    QUAFI 2026
                  </Label>
                  <Paragraph effect="carved-muted" style={{ color: semanticColors.muted.color, fontSize: '12px', marginTop: '2px' }}>
                    12px, 400, Steel, --lp-steel
                  </Paragraph>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           3. ETYMOLOGY & SYNTHESIS — Referencia QuafiHome
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Etymology & Synthesis"
        description="Contenido editorial con carved en RAISED y embossed en INSET. Referencia: QuafiHome"
      >
        <ComponentPreview>
          <div style={{ width: '100%', display: 'flex', gap: '16px' }}>
            {/* Etymology - RAISED */}
            <div style={{ flex: 1, ...raised(2) }}>
              <Label effect="carved-steel" style={{ color: 'var(--quafi-text-accent)' }}>
                RAISED Container
              </Label>
              <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <Label effect="carved-steel" style={{ color: 'var(--quafi-text-accent)', fontSize: '12px' }}>etymologyRoot</Label>
                  <Paragraph effect="carved-muted" style={{ color: semanticColors.muted.color, fontSize: '11px' }}>12px, 600, Steel, --lp-steel</Paragraph>
                </div>
                <div>
                  <span style={{
                    fontSize: '24px', fontStyle: 'italic', color: 'var(--quafi-accent)',
                    fontFamily: 'var(--quafi-font-mono)', textShadow: 'var(--lp-petrol-whisper)',
                  }}>
                    finis
                  </span>
                  <Paragraph effect="carved-muted" style={{ color: semanticColors.muted.color, fontSize: '11px' }}>
                    etymologyWord: 24px, italic, Petrol, --lp-petrol-whisper
                  </Paragraph>
                </div>
                <div>
                  <Paragraph effect="carved-muted" style={{ color: semanticColors.muted.color }}>
                    resolver, concluir, alcanzar objetivos
                  </Paragraph>
                  <Paragraph effect="carved-muted" style={{ color: semanticColors.muted.color, fontSize: '11px' }}>
                    etymologyMeaning: 13px, 400, Muted, --lp-muted
                  </Paragraph>
                </div>
              </div>
            </div>

            {/* Synthesis - INSET */}
            <div style={{ flex: 1, ...inset(2) }}>
              <Label effect="embossed">
                INSET Container
              </Label>
              <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <Heading3 effect="embossed-subtle" style={{ fontSize: '16px' }}>
                    FIN + ING = <span style={{ color: 'var(--quafi-accent)', textShadow: 'var(--lp-embossed-petrol)' }}>QUAFI</span>
                  </Heading3>
                  <Paragraph effect="carved-muted" style={{ color: semanticColors.muted.color, fontSize: '11px' }}>
                    synthesisFormula: 16px, 500, --lp-embossed-subtle + --lp-embossed-petrol
                  </Paragraph>
                </div>
                <div>
                  <Paragraph effect="embossed-petrol-sm" style={{ color: 'var(--quafi-accent)', fontStyle: 'italic' }}>
                    "The market shows signs of consolidation"
                  </Paragraph>
                  <Paragraph effect="carved-muted" style={{ color: semanticColors.muted.color, fontSize: '11px' }}>
                    voiceExample: 14px, italic, Petrol, --lp-embossed-petrol-sm
                  </Paragraph>
                </div>
                <div>
                  <span style={{
                    fontSize: '11px', color: 'var(--quafi-text-accent)', textShadow: 'var(--lp-embossed-sm)',
                    fontFamily: 'var(--quafi-font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em',
                  }}>
                    NOT: "BUY NOW!"
                  </span>
                  <Paragraph effect="carved-muted" style={{ color: semanticColors.muted.color, fontSize: '11px' }}>
                    antiPill: 11px, 400, Steel, --lp-embossed-sm
                  </Paragraph>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           4. DASHBOARD HEADER — Referencia DashboardPage
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Dashboard Header"
        description="Greeting y balance principal. Referencia: DashboardPage"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <div style={raised(3)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* Avatar */}
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  background: 'var(--marble-base)', boxShadow: 'var(--raised-2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{
                    fontSize: '20px', fontWeight: 600, color: 'var(--quafi-accent)',
                    textShadow: 'var(--lp-petrol-strong)',
                    fontFamily: 'var(--quafi-font-mono)',
                  }}>
                    JD
                  </span>
                </div>
                <div>
                  <Heading1 effect="carved-accent-strong" style={{ color: 'var(--quafi-accent)', fontSize: '24px' }}>
                    Welcome, John
                  </Heading1>
                  <Paragraph effect="carved-muted" style={{ color: semanticColors.muted.color, fontSize: '11px' }}>
                    headerTitle: 24px, 600, Petrol, --lp-petrol-strong
                  </Paragraph>
                </div>
              </div>

              {/* Balance pill */}
              <div style={{ marginTop: '20px', ...raised(2), padding: '20px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div>
                  <span style={{
                    fontSize: '32px', fontWeight: 700, color: 'var(--text-primary, var(--foreground))',
                    textShadow: 'var(--lp-carved-lg)', fontFamily: 'var(--quafi-font-mono)',
                  }}>
                    $124,500.00
                  </span>
                  <Paragraph effect="carved-muted" style={{ color: semanticColors.muted.color, fontSize: '11px' }}>
                    balancePillValue: 32px, 700, Charcoal, --lp-carved-lg
                  </Paragraph>
                </div>
                <div>
                  <Label effect="carved-petrol" style={{ color: 'var(--quafi-accent)', fontSize: '10px' }}>
                    PORTFOLIO VALUE
                  </Label>
                  <Paragraph effect="carved-muted" style={{ color: semanticColors.muted.color, fontSize: '11px' }}>
                    balancePillLabel: 10px, 500, Petrol, --lp-petrol
                  </Paragraph>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           5. KPI VALUES — Referencia DashboardPage
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="KPI Values & Labels"
        description="Valores KPI con carved-strong en RAISED, labels con embossed-sm en INSET. Referencia: DashboardPage"
      >
        <ComponentPreview>
          <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {([
              { value: '$124,500', label: 'PORTFOLIO VALUE', effect: 'carved-accent-strong' as TextEffect, labelEffect: 'embossed-petrol-sm' as TextEffect, valueColor: 'var(--quafi-accent)', labelColor: 'var(--quafi-accent)', desc: 'Petrol' },
              { value: '+12.4%', label: 'RETURN YTD', effect: 'carved-positive-strong' as TextEffect, labelEffect: 'embossed-positive-sm' as TextEffect, valueColor: 'var(--quafi-positive)', labelColor: 'var(--quafi-positive)', desc: 'Jade' },
              { value: '0.78', label: 'SHARPE RATIO', effect: 'carved-warning-strong' as TextEffect, labelEffect: 'embossed-warning-sm' as TextEffect, valueColor: 'var(--quafi-warning)', labelColor: 'var(--quafi-warning)', desc: 'Gold' },
              { value: '-3.2%', label: 'MAX DRAWDOWN', effect: 'carved-negative-strong' as TextEffect, labelEffect: 'embossed-negative-sm' as TextEffect, valueColor: 'var(--quafi-negative)', labelColor: 'var(--quafi-negative)', desc: 'Rust' },
            ]).map((kpi) => (
              <div key={kpi.label}>
                <div style={{ ...raised(2), textAlign: 'center' }}>
                  <Heading1 effect={kpi.effect} style={{ color: kpi.valueColor, fontSize: '26px' }}>
                    {kpi.value}
                  </Heading1>
                  <Label effect="carved-muted" style={{ fontSize: '10px', marginTop: '4px' }}>
                    carved-{kpi.desc.toLowerCase()}-strong
                  </Label>
                </div>
                <div style={{ ...inset(1), marginTop: '8px', textAlign: 'center', padding: '12px' }}>
                  <Label effect={kpi.labelEffect} style={{ color: kpi.labelColor }}>
                    {kpi.label}
                  </Label>
                  <Label effect="embossed" style={{ fontSize: '10px', marginTop: '2px', display: 'block' }}>
                    embossed-{kpi.desc.toLowerCase()}-sm
                  </Label>
                </div>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           6. DATA TABLES — Referencia DashboardPage
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Data Tables"
        description="Titulos, tickers, precios y cambios en tablas de datos. Referencia: DashboardPage"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <div style={raised(2)}>
              {/* Buy section title */}
              <div style={{ display: 'flex', gap: '24px', marginBottom: '16px' }}>
                <div>
                  <Heading3 effect="carved-petrol-md" style={{ color: 'var(--quafi-accent)' }}>
                    Top Picks
                  </Heading3>
                  <Label effect="carved-muted" style={{ fontSize: '10px' }}>cardTitle: 14px, 600, Petrol, carved-petrol-md</Label>
                </div>
                <div>
                  <Heading3 effect="carved-negative-md" style={{ color: 'var(--quafi-negative)' }}>
                    Top Sells
                  </Heading3>
                  <Label effect="carved-muted" style={{ fontSize: '10px' }}>dataTableTitleSell: 12px, 600, Rust, carved-negative-md</Label>
                </div>
              </div>

              {/* Table in INSET */}
              <div style={inset(1)}>
                {/* Header */}
                <div style={{ display: 'grid', gridTemplateColumns: '50px 90px 1fr 100px 90px', gap: '12px', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px solid var(--border)' }}>
                  <Label effect="embossed">#</Label>
                  <Label effect="embossed">Ticker</Label>
                  <Label effect="embossed">Name</Label>
                  <Label effect="embossed" style={{ textAlign: 'right' }}>Price</Label>
                  <Label effect="embossed" style={{ textAlign: 'right' }}>Change</Label>
                </div>

                {/* Row 1 */}
                <div style={{ display: 'grid', gridTemplateColumns: '50px 90px 1fr 100px 90px', gap: '12px', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ ...inset(1), width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
                    <Heading4 effect="embossed-petrol-sm" style={{ color: 'var(--quafi-accent)', fontSize: '12px' }}>01</Heading4>
                  </div>
                  <Heading4 effect="carved-strong" style={{ fontSize: '13px' }}>AAPL</Heading4>
                  <Paragraph effect="carved" style={{ fontSize: '12px' }}>Apple Inc.</Paragraph>
                  <Paragraph effect="carved" style={{ fontSize: '12px', textAlign: 'right', color: 'var(--text-secondary, var(--foreground-muted))' }}>$189.84</Paragraph>
                  <Paragraph effect="carved-positive-md" style={{ color: 'var(--quafi-positive)', fontSize: '12px', textAlign: 'right' }}>+2.34%</Paragraph>
                </div>

                {/* Row 2 */}
                <div style={{ display: 'grid', gridTemplateColumns: '50px 90px 1fr 100px 90px', gap: '12px', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ ...inset(1), width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
                    <Heading4 effect="embossed-petrol-sm" style={{ color: 'var(--quafi-accent)', fontSize: '12px' }}>02</Heading4>
                  </div>
                  <Heading4 effect="carved-strong" style={{ fontSize: '13px' }}>NVDA</Heading4>
                  <Paragraph effect="carved" style={{ fontSize: '12px' }}>NVIDIA Corp.</Paragraph>
                  <Paragraph effect="carved" style={{ fontSize: '12px', textAlign: 'right', color: 'var(--text-secondary, var(--foreground-muted))' }}>$878.36</Paragraph>
                  <Paragraph effect="carved-negative-md" style={{ color: 'var(--quafi-negative)', fontSize: '12px', textAlign: 'right' }}>-1.82%</Paragraph>
                </div>

                {/* Row 3 - Sell rank */}
                <div style={{ display: 'grid', gridTemplateColumns: '50px 90px 1fr 100px 90px', gap: '12px', alignItems: 'center', padding: '12px 0' }}>
                  <div style={{ ...inset(1), width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
                    <Heading4 effect="embossed-negative-sm" style={{ color: 'var(--quafi-negative)', fontSize: '12px' }}>03</Heading4>
                  </div>
                  <Heading4 effect="carved-strong" style={{ fontSize: '13px' }}>TSLA</Heading4>
                  <Paragraph effect="carved" style={{ fontSize: '12px' }}>Tesla Inc.</Paragraph>
                  <Paragraph effect="carved" style={{ fontSize: '12px', textAlign: 'right', color: 'var(--text-secondary, var(--foreground-muted))' }}>$245.12</Paragraph>
                  <Paragraph effect="carved-warning-md" style={{ color: 'var(--quafi-warning)', fontSize: '12px', textAlign: 'right' }}>+0.12%</Paragraph>
                </div>
              </div>

              {/* Legend */}
              <div style={{ marginTop: '12px', display: 'flex', gap: '16px', fontSize: '10px', fontFamily: 'var(--quafi-font-mono)' }}>
                <Label effect="carved-muted" style={{ fontSize: '10px' }}>Rank: embossed-petrol-sm / embossed-negative-sm</Label>
                <Label effect="carved-muted" style={{ fontSize: '10px' }}>Ticker: carved-strong 13px</Label>
                <Label effect="carved-muted" style={{ fontSize: '10px' }}>Price: carved 12px</Label>
                <Label effect="carved-muted" style={{ fontSize: '10px' }}>Change: carved-*-md 12px</Label>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           7. BUTTONS — Referencia DashboardPage
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Buttons"
        description="Texto en botones RAISED. Referencia: DashboardPage + QuafiHome"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <div style={raised(2)}>
              <Label effect="carved-muted" style={{ color: semanticColors.muted.color }}>Botones</Label>
              <div style={{ display: 'flex', gap: '16px', marginTop: '16px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                {/* raisedButton */}
                <div>
                  <div style={{ ...raised(2), padding: '12px 24px', borderRadius: '12px', cursor: 'pointer' }}>
                    <Heading4 effect="carved-accent-strong" style={{ color: 'var(--quafi-accent)', fontSize: '13px' }}>
                      View Portfolio
                    </Heading4>
                  </div>
                  <Label effect="carved-muted" style={{ fontSize: '10px', marginTop: '4px', display: 'block' }}>
                    raisedButton: 13px, 600, Petrol, carved-accent-strong
                  </Label>
                </div>

                {/* pillFrameButton */}
                <div>
                  <div style={{ ...raised(2), padding: '10px 20px', borderRadius: '20px', cursor: 'pointer' }}>
                    <Paragraph effect="carved-accent-strong" style={{ color: 'var(--quafi-accent)', fontSize: '13px', fontWeight: 600 }}>
                      Simulate
                    </Paragraph>
                  </div>
                  <Label effect="carved-muted" style={{ fontSize: '10px', marginTop: '4px', display: 'block' }}>
                    pillFrameButton: 13px, 600, Petrol, carved-accent-strong
                  </Label>
                </div>

                {/* pillFrameButtonSm */}
                <div>
                  <div style={{ ...raised(1), padding: '8px 16px', borderRadius: '20px', cursor: 'pointer' }}>
                    <Paragraph effect="carved-petrol-md" style={{ color: 'var(--quafi-accent)', fontSize: '12px', fontWeight: 600 }}>
                      Details
                    </Paragraph>
                  </div>
                  <Label effect="carved-muted" style={{ fontSize: '10px', marginTop: '4px', display: 'block' }}>
                    pillFrameButtonSm: 12px, 600, Petrol, carved-petrol-md
                  </Label>
                </div>

                {/* QuafiHome btnPrimary */}
                <div>
                  <div style={{ ...raised(1), padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>
                    <Paragraph effect="carved-petrol" style={{ color: 'var(--quafi-accent)', fontSize: '13px', fontWeight: 500 }}>
                      Explore
                    </Paragraph>
                  </div>
                  <Label effect="carved-muted" style={{ fontSize: '10px', marginTop: '4px', display: 'block' }}>
                    btnPrimary: 13px, 500, Petrol, carved-petrol
                  </Label>
                </div>

                {/* QuafiHome btnSecondary */}
                <div>
                  <div style={{ ...raised(1), padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>
                    <Paragraph effect="carved-muted" style={{ color: semanticColors.muted.color, fontSize: '13px', fontWeight: 500 }}>
                      Learn More
                    </Paragraph>
                  </div>
                  <Label effect="carved-muted" style={{ fontSize: '10px', marginTop: '4px', display: 'block' }}>
                    btnSecondary: 13px, 500, Muted, carved-muted
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           8. MOBILE / COMPACT — Referencia DashboardPage
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Mobile & Compact"
        description="Variantes whisper y compactas para mobile. Referencia: DashboardPage mobile"
      >
        <ComponentPreview>
          <div style={{ width: '100%', maxWidth: '375px', margin: '0 auto' }}>
            <div style={raised(2)}>
              {/* Mobile header */}
              <div style={{ ...inset(1), padding: '16px' }}>
                <Label effect="embossed" style={{ fontSize: '10px' }}>PORTFOLIO VALUE</Label>
                <div style={{ marginTop: '4px' }}>
                  <span style={{
                    fontSize: '34px', fontWeight: 700, color: 'var(--foreground)',
                    textShadow: 'var(--lp-carved-lg)', fontFamily: 'var(--quafi-font-mono)',
                  }}>
                    $124,500
                  </span>
                </div>
                <Paragraph effect="carved-positive-md" style={{ color: 'var(--quafi-positive)', marginTop: '4px', fontSize: '16px', fontWeight: 600 }}>
                  +2.34% today
                </Paragraph>
                <Label effect="carved-muted" style={{ fontSize: '10px', marginTop: '4px' }}>
                  mobileValueAmount: 34px, 700, --lp-carved-lg
                </Label>
              </div>

              {/* Mobile picks */}
              <div style={{ marginTop: '12px' }}>
                <Heading4 effect="carved-strong" style={{ fontSize: '13px', color: 'var(--marble-dark, var(--foreground-muted))' }}>
                  TOP PICKS
                </Heading4>
                <Label effect="carved-muted" style={{ fontSize: '10px' }}>
                  mobilePicksTitle: 13px, 600, --lp-title-carved
                </Label>
              </div>

              {/* Glass items */}
              <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { rank: '01', ticker: 'AAPL', change: '+2.34%', positive: true },
                  { rank: '02', ticker: 'NVDA', change: '-1.82%', positive: false },
                  { rank: '03', ticker: 'MSFT', change: '+0.67%', positive: true },
                ].map((item) => (
                  <div key={item.ticker} style={glass}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <Heading4 effect="glow-petrol" style={{ color: 'var(--quafi-accent)', fontSize: '11px' }}>
                          {item.rank}
                        </Heading4>
                        <Paragraph effect="carved-whisper" style={{ fontSize: '13px', fontWeight: 600 }}>
                          {item.ticker}
                        </Paragraph>
                      </div>
                      <Paragraph
                        effect={item.positive ? 'carved-positive' : 'carved-negative'}
                        style={{ color: item.positive ? 'var(--quafi-positive)' : 'var(--quafi-negative)', fontSize: '12px', fontWeight: 600 }}
                      >
                        {item.change}
                      </Paragraph>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <Label effect="carved-muted" style={{ fontSize: '10px' }}>mobilePickRank: glow-petrol, 11px, 600</Label>
                <Label effect="carved-muted" style={{ fontSize: '10px' }}>mobilePickTicker: carved-whisper, 13px, 600</Label>
                <Label effect="carved-muted" style={{ fontSize: '10px' }}>mobilePickChange: carved-positive / carved-negative, 12px, 600</Label>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           9. CHART & LEGEND — Referencia DashboardPage
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Chart Elements"
        description="Titulos de chart y leyendas. Referencia: DashboardPage"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <div style={raised(2)}>
              <Heading3 effect="carved-petrol-md" style={{ color: 'var(--marble-dark, var(--foreground-muted))', fontSize: '14px' }}>
                Portfolio Performance
              </Heading3>
              <Label effect="carved-muted" style={{ fontSize: '10px' }}>chartTitle: 14px, 600, marble-dark, carved-petrol-md</Label>

              {/* Chart area simulation */}
              <div style={{ ...inset(2), marginTop: '12px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Paragraph effect="embossed-subtle" style={{ fontStyle: 'italic' }}>[ Chart Area ]</Paragraph>
              </div>

              {/* Floating legend - embossed text over inset */}
              <div style={{ marginTop: '12px', display: 'flex', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--quafi-accent)' }} />
                  <span style={{
                    fontSize: '11px', fontWeight: 600, color: 'var(--marble-base, var(--foreground-muted))',
                    textShadow: 'var(--lp-embossed)', fontFamily: 'var(--quafi-font-mono)',
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                  }}>
                    Portfolio
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--quafi-positive)' }} />
                  <span style={{
                    fontSize: '11px', fontWeight: 600, color: 'var(--marble-base, var(--foreground-muted))',
                    textShadow: 'var(--lp-embossed)', fontFamily: 'var(--quafi-font-mono)',
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                  }}>
                    S&P 500
                  </span>
                </div>
              </div>
              <Label effect="carved-muted" style={{ fontSize: '10px', marginTop: '4px' }}>floatingLegendItem: 11px, 600, --lp-embossed</Label>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           10. MATRIZ COMPLETA: Carved × Color × Intensidad
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Matriz: Carved por Color e Intensidad"
        description="Todas las combinaciones de carved × color en un RAISED container"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <div style={raised(2)}>
              <Label effect="carved-muted">RAISED — Carved Text Matrix</Label>
              <table style={{ width: '100%', marginTop: '16px', borderCollapse: 'collapse', fontFamily: 'var(--quafi-font-mono)' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid var(--border)', fontSize: '10px', color: 'var(--foreground-muted)' }}>COLOR</th>
                    <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid var(--border)', fontSize: '10px', color: 'var(--foreground-muted)' }}>STANDARD (0.5px)</th>
                    <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid var(--border)', fontSize: '10px', color: 'var(--foreground-muted)' }}>MEDIUM (0.75px)</th>
                    <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid var(--border)', fontSize: '10px', color: 'var(--foreground-muted)' }}>STRONG (1px)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Label effect="carved-muted">Primary</Label></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="carved">The quick brown fox</Heading4></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="carved" style={{ textShadow: 'var(--lp-carved-md)' }}>The quick brown fox</Heading4></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="carved-strong">The quick brown fox</Heading4></td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Label effect="carved-muted">Petrol</Label></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="carved-petrol" style={{ color: 'var(--quafi-accent)' }}>The quick brown fox</Heading4></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="carved-petrol-md" style={{ color: 'var(--quafi-accent)' }}>The quick brown fox</Heading4></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="carved-accent-strong" style={{ color: 'var(--quafi-accent)' }}>The quick brown fox</Heading4></td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Label effect="carved-muted">Positive</Label></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="carved-positive" style={{ color: 'var(--quafi-positive)' }}>+12.4% gain</Heading4></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="carved-positive-md" style={{ color: 'var(--quafi-positive)' }}>+12.4% gain</Heading4></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="carved-positive-strong" style={{ color: 'var(--quafi-positive)' }}>+12.4% gain</Heading4></td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Label effect="carved-muted">Warning</Label></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="carved-warning" style={{ color: 'var(--quafi-warning)' }}>0.78 ratio</Heading4></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="carved-warning-md" style={{ color: 'var(--quafi-warning)' }}>0.78 ratio</Heading4></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="carved-warning-strong" style={{ color: 'var(--quafi-warning)' }}>0.78 ratio</Heading4></td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Label effect="carved-muted">Negative</Label></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="carved-negative" style={{ color: 'var(--quafi-negative)' }}>-3.2% loss</Heading4></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="carved-negative-md" style={{ color: 'var(--quafi-negative)' }}>-3.2% loss</Heading4></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="carved-negative-strong" style={{ color: 'var(--quafi-negative)' }}>-3.2% loss</Heading4></td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Label effect="carved-muted">Info</Label></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="carved-info" style={{ color: 'var(--quafi-info)' }}>Risk level: low</Heading4></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="carved-info" style={{ color: 'var(--quafi-info)' }}>—</Heading4></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="carved-info-strong" style={{ color: 'var(--quafi-info)' }}>Risk level: low</Heading4></td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Label effect="carved-muted">Steel</Label></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="carved-steel" style={{ color: 'var(--quafi-text-accent)' }}>Section label</Heading4></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="carved-steel" style={{ color: 'var(--quafi-text-accent)' }}>—</Heading4></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="carved-strong" style={{ color: 'var(--quafi-text-accent)', textShadow: 'var(--lp-steel-strong)' }}>Section label</Heading4></td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px' }}><Label effect="carved-muted">Muted</Label></td>
                    <td style={{ padding: '8px' }}><Heading4 effect="carved-muted" style={{ color: 'var(--foreground-muted)' }}>Secondary text</Heading4></td>
                    <td style={{ padding: '8px' }}><Heading4 effect="carved-whisper" style={{ color: 'var(--foreground-muted)' }}>Whisper</Heading4></td>
                    <td style={{ padding: '8px' }}><Heading4 effect="carved-muted" style={{ color: 'var(--foreground-muted)' }}>—</Heading4></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           11. MATRIZ COMPLETA: Embossed × Color
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Matriz: Embossed por Color e Intensidad"
        description="Todas las combinaciones de embossed × color en un INSET container"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <div style={inset(2)}>
              <Label effect="embossed">INSET — Embossed Text Matrix</Label>
              <table style={{ width: '100%', marginTop: '16px', borderCollapse: 'collapse', fontFamily: 'var(--quafi-font-mono)' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid var(--border)', fontSize: '10px' }}>COLOR</th>
                    <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid var(--border)', fontSize: '10px' }}>SM (0.5px)</th>
                    <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid var(--border)', fontSize: '10px' }}>SUBTLE (1px)</th>
                    <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid var(--border)', fontSize: '10px' }}>STANDARD (1.5px)</th>
                    <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid var(--border)', fontSize: '10px' }}>STRONG (2px)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Label effect="embossed">Neutral</Label></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="embossed" style={{ textShadow: 'var(--lp-embossed-sm)' }}>Embossed sm</Heading4></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="embossed-subtle">Embossed subtle</Heading4></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="embossed">Embossed</Heading4></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="embossed-strong">Embossed strong</Heading4></td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Label effect="embossed">Petrol</Label></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="embossed-petrol-sm" style={{ color: 'var(--quafi-accent)' }}>Petrol sm</Heading4></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="embossed-petrol" style={{ color: 'var(--quafi-accent)', opacity: 0.8 }}>—</Heading4></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="embossed-petrol" style={{ color: 'var(--quafi-accent)' }}>Petrol</Heading4></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="embossed-petrol" style={{ color: 'var(--quafi-accent)' }}>—</Heading4></td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Label effect="embossed">Positive</Label></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="embossed-positive-sm" style={{ color: 'var(--quafi-positive)' }}>+12.4%</Heading4></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="embossed-positive" style={{ color: 'var(--quafi-positive)', opacity: 0.8 }}>—</Heading4></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="embossed-positive" style={{ color: 'var(--quafi-positive)' }}>+12.4%</Heading4></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="embossed-positive" style={{ color: 'var(--quafi-positive)' }}>—</Heading4></td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Label effect="embossed">Warning</Label></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="embossed-warning-sm" style={{ color: 'var(--quafi-warning)' }}>0.78</Heading4></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="embossed-warning" style={{ color: 'var(--quafi-warning)', opacity: 0.8 }}>—</Heading4></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="embossed-warning" style={{ color: 'var(--quafi-warning)' }}>0.78</Heading4></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="embossed-warning" style={{ color: 'var(--quafi-warning)' }}>—</Heading4></td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Label effect="embossed">Negative</Label></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="embossed-negative-sm" style={{ color: 'var(--quafi-negative)' }}>-3.2%</Heading4></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="embossed-negative" style={{ color: 'var(--quafi-negative)', opacity: 0.8 }}>—</Heading4></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="embossed-negative" style={{ color: 'var(--quafi-negative)' }}>-3.2%</Heading4></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}><Heading4 effect="embossed-negative" style={{ color: 'var(--quafi-negative)' }}>—</Heading4></td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px' }}><Label effect="embossed">Info</Label></td>
                    <td style={{ padding: '8px' }}><Heading4 effect="embossed-info-sm" style={{ color: 'var(--quafi-info)' }}>Steel sm</Heading4></td>
                    <td style={{ padding: '8px' }}><Heading4 effect="embossed-info" style={{ color: 'var(--quafi-info)', opacity: 0.8 }}>—</Heading4></td>
                    <td style={{ padding: '8px' }}><Heading4 effect="embossed-info" style={{ color: 'var(--quafi-info)' }}>Steel</Heading4></td>
                    <td style={{ padding: '8px' }}><Heading4 effect="embossed-info" style={{ color: 'var(--quafi-info)' }}>—</Heading4></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           12. GLOW EFFECTS
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Glow Effects"
        description="Brillo no-direccional para elementos activos (ranks, highlights)"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <div style={raised(2)}>
              <Label effect="carved-muted">Glow — para ranks y elementos activos en GLASS</Label>
              <div style={{ marginTop: '16px', display: 'flex', gap: '24px', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ ...glass, width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                    <Heading3 effect="glow-petrol" style={{ color: 'var(--quafi-accent)' }}>01</Heading3>
                  </div>
                  <Label effect="carved-muted" style={{ fontSize: '10px', marginTop: '4px' }}>glow-petrol</Label>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ ...glass, width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                    <Heading3 effect="glow-positive" style={{ color: 'var(--quafi-positive)' }}>02</Heading3>
                  </div>
                  <Label effect="carved-muted" style={{ fontSize: '10px', marginTop: '4px' }}>glow-positive</Label>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ ...glass, width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                    <Heading3 effect="glow-negative" style={{ color: 'var(--quafi-negative)' }}>03</Heading3>
                  </div>
                  <Label effect="carved-muted" style={{ fontSize: '10px', marginTop: '4px' }}>glow-negative</Label>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           REGLA DE USO
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Regla de Uso"
        description="Como elegir el efecto correcto segun el contexto"
      >
        <div style={{ fontSize: '12px', color: 'var(--foreground)', lineHeight: '2', fontFamily: 'var(--quafi-font-mono)' }}>
          <p><strong style={{ color: 'var(--primary)' }}>REGLA BASE:</strong></p>
          <p>Container RAISED → Texto CARVED (hundido en superficie)</p>
          <p>Container INSET  → Texto EMBOSSED (elevado desde superficie)</p>
          <p>Container GLASS  → Texto CARVED-WHISPER o GLOW</p>

          <p style={{ marginTop: '16px' }}><strong style={{ color: 'var(--primary)' }}>INTENSIDAD POR CONTEXTO:</strong></p>
          <p>Hero/Display (24-96px) → whisper o petrol-whisper</p>
          <p>Headings (14-18px) → standard o -md</p>
          <p>KPI Values (20-34px) → -strong (color semantico)</p>
          <p>Body text (12-14px) → standard</p>
          <p>Labels (9-12px) → embossed-*-sm (en INSET) o carved-steel/muted (en RAISED)</p>
          <p>Buttons (12-13px) → carved-petrol o carved-accent-strong</p>
          <p>Data cells (12px) → carved standard</p>
          <p>Change values (12-16px) → carved-positive-md / carved-negative-md</p>
          <p>Mobile compact → carved-whisper, glow-petrol</p>

          <p style={{ marginTop: '16px' }}><strong style={{ color: 'var(--primary)' }}>PALETA SEMANTICA:</strong></p>
          <p>Petrol (#3a6a72) → brand accent, titulos, botones primarios</p>
          <p>Steel (#4a6a7a) → section labels, navigation, descriptores</p>
          <p>Jade (#4a7a6a) → valores positivos, ganancias</p>
          <p>Gold (#a08a4a) → warnings, ratios de cautela</p>
          <p>Rust (#8a5a4a) → valores negativos, perdidas, ventas</p>
          <p>Muted → texto secundario, subtitulos, botones secundarios</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}
