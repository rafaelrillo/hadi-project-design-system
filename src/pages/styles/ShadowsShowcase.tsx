// Path: src/pages/styles/ShadowsShowcase.tsx
// QUAFI Design System — Shadow Catalog
// Catalogo definitivo: sombras + jerarquia + uso
// Referencia: QuafiHome.module.css + DashboardPage.module.css

import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import { ShowcaseSection } from '../../components/showcase';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';
import { Label, Heading4, Paragraph } from '../../components/atoms/Typography';
import { Sun } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════════
// REUSABLE STYLE HELPERS (same pattern as TypographyCatalogShowcase)
// ═══════════════════════════════════════════════════════════════════════════════

const raised = (level: 1 | 2 | 3 | 4 | 5 = 2): CSSProperties => ({
  background: 'var(--marble-base)',
  boxShadow: `var(--raised-${level})`,
  borderRadius: '16px',
  padding: '24px',
});

const inset = (level: 1 | 2 | 3 | 4 | 5 = 2): CSSProperties => ({
  background: 'var(--marble-base)',
  boxShadow: `var(--inset-${level})`,
  borderRadius: '12px',
  padding: '20px',
});

const glass: CSSProperties = {
  background: 'var(--glass-bg)',
  backdropFilter: 'blur(8px)',
  border: '1px solid var(--glass-border)',
  borderRadius: '12px',
  padding: '16px',
};

const specLabel: CSSProperties = {
  fontSize: '10px',
  fontFamily: 'var(--quafi-font-mono)',
  color: 'var(--foreground-muted)',
  marginTop: '8px',
  textAlign: 'center' as const,
};

const varName: CSSProperties = {
  fontSize: '11px',
  fontFamily: 'var(--quafi-font-mono)',
  color: 'var(--quafi-accent)',
  textAlign: 'center' as const,
};

const demoBox: CSSProperties = {
  width: '120px',
  height: '120px',
  background: 'var(--marble-base)',
  borderRadius: '15px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  transition: 'box-shadow 50ms linear',
};

// ═══════════════════════════════════════════════════════════════════════════════
// SHADOW CATALOG CONTENT
// ═══════════════════════════════════════════════════════════════════════════════

function ShadowsCatalogContent() {
  const { lightAngle } = useLightEngine();

  const shadowOffsets = useMemo(() => {
    const shadowAngle = (lightAngle + 180) * (Math.PI / 180);
    const x = Math.cos(shadowAngle);
    const y = Math.sin(shadowAngle);
    return { x, y };
  }, [lightAngle]);

  // Use CSS variables instead of hardcoded values
  const MARBLE_BASE = 'var(--marble-base)';

  const getNeuPanelShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    const hlX = -x * distance;
    const hlY = -y * distance;
    const shX = x * distance;
    const shY = y * distance;
    return `${hlX}px ${hlY}px ${blur}px var(--shadow-light), ${shX}px ${shY}px ${blur}px var(--shadow-dark)`;
  };

  const getNeuInsetShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    const shX = x * distance;
    const shY = y * distance;
    return `inset ${shX}px ${shY}px ${blur}px var(--shadow-dark), inset ${-shX}px ${-shY}px ${blur}px var(--shadow-light)`;
  };

  const pageHeaderStyles: CSSProperties = {
    marginBottom: '32px',
    padding: '24px',
    background: MARBLE_BASE,
    borderRadius: '20px',
    boxShadow: 'var(--raised-3)',
  };

  const titleStyles: CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--quafi-accent)',
    marginBottom: '8px',
    fontFamily: 'var(--quafi-font-display)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    // Standard: RAISED container → carved text (using CSS variable)
    textShadow: 'var(--lp-petrol-whisper)',
  };

  const descStyles: CSSProperties = {
    fontSize: '14px',
    color: 'var(--quafi-text-muted)',
    fontFamily: 'var(--quafi-font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
    // Standard: RAISED container → carved text (using CSS variable)
    textShadow: 'var(--lp-muted)',
  };

  // Shadow level specs
  const raisedLevels = [
    { level: 1, offset: '2px', blur: '4px', use: 'Badges, small buttons' },
    { level: 2, offset: '4px', blur: '8px', use: 'Buttons, small cards' },
    { level: 3, offset: '6px', blur: '12px', use: 'Cards, panels (default)' },
    { level: 4, offset: '8px', blur: '16px', use: 'Hover states, dropdowns' },
    { level: 5, offset: '12px', blur: '24px', use: 'Modals, hero elements' },
  ];

  const insetLevels = [
    { level: 1, offset: '2px', blur: '4px', use: 'Subtle depressions, rank badges' },
    { level: 2, offset: '3px', blur: '6px', use: 'Inputs, content areas (default)' },
    { level: 3, offset: '4px', blur: '8px', use: 'Deep containers, logo areas' },
    { level: 4, offset: '6px', blur: '12px', use: 'Large recessed panels' },
    { level: 5, offset: '8px', blur: '16px', use: 'Deepest carved areas' },
  ];

  return (
    <div style={{ background: MARBLE_BASE, minHeight: '100%', padding: '24px' }}>
      {/* Page Header */}
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Shadow_Catalog_</h1>
        <p style={descStyles}>
          // Catalogo definitivo: sombras + jerarquia + uso
        </p>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════
           1. RAISED LEVELS (1-5) — Referencia: shadows.css + QuafiHome
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="RAISED Shadows (5 Levels)"
        description="Elementos que flotan sobre la superficie de marmol. Referencia: QuafiHome buttons, cards"
      >
        <div style={raised(3)}>
          <Label effect="carved-muted" style={{ color: 'var(--foreground-muted)' }}>
            RAISED — External dual shadows creating elevation
          </Label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center', marginTop: '20px' }}>
            {raisedLevels.map(({ level, offset, blur, use }) => (
              <div key={level} style={{ textAlign: 'center', maxWidth: '140px' }}>
                <div style={{ ...demoBox, boxShadow: `var(--raised-${level})` }}>
                  <Heading4 effect="carved-accent-strong" style={{ color: 'var(--quafi-accent)', fontSize: '24px' }}>
                    {level}
                  </Heading4>
                  <span style={{ fontSize: '10px', color: 'var(--foreground-muted)', fontFamily: 'var(--quafi-font-mono)' }}>
                    Level
                  </span>
                </div>
                <div style={varName}>--raised-{level}</div>
                <div style={specLabel}>{offset} / {blur} blur</div>
                <div style={{ ...specLabel, fontSize: '9px' }}>{use}</div>
              </div>
            ))}
          </div>

          {/* QuafiHome reference */}
          <div style={{ marginTop: '24px', ...inset(1), padding: '16px' }}>
            <Label effect="embossed" style={{ fontSize: '10px' }}>
              QuafiHome: btnPrimary=raised-3, btnPrimary:hover=raised-4, btnSecondary=raised-2, cards=raised-3
            </Label>
          </div>
        </div>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           2. INSET LEVELS (1-5) — Referencia: shadows.css + QuafiHome
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="INSET Shadows (5 Levels)"
        description="Cavidades talladas en la superficie de marmol. Referencia: QuafiHome logo, synthesis, voice"
      >
        <div style={inset(2)}>
          <Label effect="embossed" style={{ fontSize: '11px' }}>
            INSET — Internal dual shadows creating depth
          </Label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center', marginTop: '20px' }}>
            {insetLevels.map(({ level, offset, blur, use }) => (
              <div key={level} style={{ textAlign: 'center', maxWidth: '140px' }}>
                <div style={{ ...demoBox, boxShadow: `var(--inset-${level})` }}>
                  <Heading4 effect="embossed-subtle" style={{ fontSize: '24px' }}>
                    {level}
                  </Heading4>
                  <span style={{ fontSize: '10px', fontFamily: 'var(--quafi-font-mono)' }}>
                    Level
                  </span>
                </div>
                <div style={varName}>--inset-{level}</div>
                <div style={specLabel}>{offset} / {blur} blur</div>
                <div style={{ ...specLabel, fontSize: '9px' }}>{use}</div>
              </div>
            ))}
          </div>

          {/* QuafiHome reference */}
          <div style={{ marginTop: '24px', ...raised(1), padding: '16px' }}>
            <Label effect="carved-muted" style={{ fontSize: '10px' }}>
              QuafiHome: heroLogo=inset-3, synthesisCard=inset-3, voiceExamples=inset-2, antiPill=inset-2
            </Label>
          </div>
        </div>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           3. HIERARCHY — RAISED > INSET > GLASS
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Stone Marble Hierarchy"
        description="RAISED > INSET > GLASS — Nunca anidar mismo nivel, nunca saltar niveles"
      >
        {/* RAISED container */}
        <div style={{ ...raised(3), position: 'relative' }}>
          <Label effect="carved-steel" style={{ color: 'var(--quafi-text-accent)', fontSize: '10px' }}>
            LEVEL 1: RAISED (--raised-3)
          </Label>
          <Paragraph effect="carved-muted" style={{ color: 'var(--foreground-muted)', fontSize: '12px', marginTop: '4px' }}>
            Container principal flotando sobre fondo. Texto: carved (hundido)
          </Paragraph>

          {/* INSET inside RAISED */}
          <div style={{ ...inset(2), marginTop: '16px' }}>
            <Label effect="embossed" style={{ fontSize: '10px' }}>
              LEVEL 2: INSET (--inset-2)
            </Label>
            <Paragraph effect="embossed-subtle" style={{ fontSize: '12px', marginTop: '4px' }}>
              Seccion tallada dentro del raised. Texto: embossed (elevado)
            </Paragraph>

            {/* GLASS inside INSET */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <div style={{ ...glass, flex: 1 }}>
                <Label effect="carved-whisper" style={{ fontSize: '10px' }}>
                  LEVEL 3: GLASS
                </Label>
                <Paragraph effect="carved-whisper" style={{ fontSize: '11px', marginTop: '2px' }}>
                  Item flotando dentro del inset
                </Paragraph>
              </div>
              <div style={{ ...glass, flex: 1, background: 'var(--glass-bg-hover)' }}>
                <Label effect="carved-whisper" style={{ fontSize: '10px' }}>
                  GLASS :hover
                </Label>
                <Paragraph effect="carved-whisper" style={{ fontSize: '11px', marginTop: '2px' }}>
                  --glass-bg-hover
                </Paragraph>
              </div>
              <div style={{ ...glass, flex: 1, background: 'var(--glass-bg-active)' }}>
                <Label effect="carved-whisper" style={{ fontSize: '10px' }}>
                  GLASS :active
                </Label>
                <Paragraph effect="carved-whisper" style={{ fontSize: '11px', marginTop: '2px' }}>
                  --glass-bg-active
                </Paragraph>
              </div>
            </div>
          </div>

          {/* Rules */}
          <div style={{ marginTop: '16px', display: 'flex', gap: '12px', fontSize: '10px', fontFamily: 'var(--quafi-font-mono)' }}>
            <Label effect="carved-positive" style={{ color: 'var(--quafi-positive)', fontSize: '10px' }}>
              DO: RAISED &gt; INSET &gt; GLASS
            </Label>
            <Label effect="carved-negative" style={{ color: 'var(--quafi-negative)', fontSize: '10px' }}>
              NO: RAISED &gt; RAISED (same level)
            </Label>
            <Label effect="carved-negative" style={{ color: 'var(--quafi-negative)', fontSize: '10px' }}>
              NO: FONDO &gt; GLASS (skip level)
            </Label>
          </div>
        </div>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           4. DASHBOARD HEADER — Referencia DashboardPage
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Dashboard Header Shadows"
        description="Uso real de sombras en DashboardPage. Referencia: DashboardPage.module.css"
      >
        <div style={raised(3)}>
          <Label effect="carved-muted" style={{ color: 'var(--foreground-muted)', fontSize: '10px' }}>
            .greetingFrame — box-shadow: var(--raised-3)
          </Label>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '12px' }}>
            {/* Avatar */}
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%',
              background: 'var(--marble-base)', boxShadow: 'var(--raised-3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{
                fontSize: '20px', fontWeight: 600, color: 'var(--quafi-accent)',
                textShadow: 'var(--lp-petrol-strong)', fontFamily: 'var(--quafi-font-mono)',
              }}>
                JD
              </span>
            </div>
            <div>
              <Heading4 effect="carved-accent-strong" style={{ color: 'var(--quafi-accent)', fontSize: '24px' }}>
                Welcome, John
              </Heading4>
              <Label effect="carved-muted" style={{ fontSize: '10px', marginTop: '2px' }}>
                .headerAvatar — box-shadow: var(--raised-3)
              </Label>
            </div>
          </div>

          {/* Balance pill */}
          <div style={{ marginTop: '20px', ...raised(3), padding: '20px', borderRadius: '20px' }}>
            <Label effect="carved-muted" style={{ fontSize: '10px' }}>
              .balancePill — box-shadow: var(--raised-3)
            </Label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginTop: '8px' }}>
              <div>
                <span style={{
                  fontSize: '32px', fontWeight: 700, color: 'var(--foreground)',
                  textShadow: 'var(--lp-carved-lg)', fontFamily: 'var(--quafi-font-mono)',
                }}>
                  $124,500.00
                </span>
              </div>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'var(--marble-base)', boxShadow: 'var(--inset-2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: '14px' }}>💎</span>
              </div>
              <Label effect="carved-muted" style={{ fontSize: '10px' }}>
                .balancePillIcon — var(--inset-2)
              </Label>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           5. SPECIALTY SHADOWS — Referencia: QuafiHome / shadows.css
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Specialty Shadows"
        description="Sombras compuestas extraidas de QuafiHome. Definidas en shadows.css"
      >
        <div style={raised(2)}>
              <Label effect="carved-muted" style={{ color: 'var(--foreground-muted)' }}>
                Specialty — Shadows with multiple layers or unique compositions
              </Label>

              {/* Ridge Frame buttons */}
              <div style={{ marginTop: '20px' }}>
                <Label effect="carved-steel" style={{ color: 'var(--quafi-text-accent)', fontSize: '10px' }}>
                  RIDGE FRAME — Double inner border + raised effect (buttons)
                </Label>
                <div style={{ display: 'flex', gap: '20px', marginTop: '12px', alignItems: 'flex-end' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      ...demoBox, width: '140px', height: '48px',
                      boxShadow: 'var(--shadow-ridge-frame)',
                      borderRadius: '12px',
                    }}>
                      <Paragraph effect="carved-petrol" style={{ color: 'var(--quafi-accent)', fontSize: '13px', fontWeight: 600 }}>
                        Normal
                      </Paragraph>
                    </div>
                    <div style={varName}>--shadow-ridge-frame</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      ...demoBox, width: '140px', height: '48px',
                      boxShadow: 'var(--shadow-ridge-frame-hover)',
                      borderRadius: '12px',
                    }}>
                      <Paragraph effect="carved-petrol" style={{ color: 'var(--quafi-accent)', fontSize: '13px', fontWeight: 600 }}>
                        Hover
                      </Paragraph>
                    </div>
                    <div style={varName}>--shadow-ridge-frame-hover</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      ...demoBox, width: '140px', height: '48px',
                      boxShadow: 'var(--shadow-ridge-frame-active)',
                      borderRadius: '12px',
                    }}>
                      <Paragraph effect="carved-muted" style={{ color: 'var(--foreground-muted)', fontSize: '13px', fontWeight: 600 }}>
                        Active
                      </Paragraph>
                    </div>
                    <div style={varName}>--shadow-ridge-frame-active</div>
                  </div>
                </div>
              </div>

              {/* Card specialty shadows */}
              <div style={{ marginTop: '28px' }}>
                <Label effect="carved-steel" style={{ color: 'var(--quafi-text-accent)', fontSize: '10px' }}>
                  CARD SHADOWS — Content containers from QuafiHome
                </Label>
                <div style={{ display: 'flex', gap: '20px', marginTop: '12px', flexWrap: 'wrap' }}>
                  {[
                    { name: '--shadow-etymology-card', label: 'Etymology', desc: 'Raised 4/10px' },
                    { name: '--shadow-voice-card', label: 'Voice Card', desc: 'Raised 5/12px' },
                    { name: '--shadow-anti-pill', label: 'Anti Pill', desc: 'Raised 2/5px' },
                    { name: '--shadow-demo-raised', label: 'Demo Raised', desc: 'Raised 8/16px' },
                  ].map((item) => (
                    <div key={item.name} style={{ textAlign: 'center' }}>
                      <div style={{ ...demoBox, width: '110px', height: '80px', boxShadow: `var(${item.name})` }}>
                        <Heading4 effect="carved-muted" style={{ fontSize: '12px' }}>{item.label}</Heading4>
                      </div>
                      <div style={{ ...varName, fontSize: '9px' }}>{item.name}</div>
                      <div style={specLabel}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inset specialty shadows */}
              <div style={{ marginTop: '28px' }}>
                <Label effect="carved-steel" style={{ color: 'var(--quafi-text-accent)', fontSize: '10px' }}>
                  INSET SPECIALTY — Carved containers from QuafiHome
                </Label>
                <div style={{ display: 'flex', gap: '20px', marginTop: '12px', flexWrap: 'wrap' }}>
                  {[
                    { name: '--shadow-pill-frame', label: 'Pill Frame', desc: 'Inset 2/4px' },
                    { name: '--shadow-synthesis-card', label: 'Synthesis', desc: 'Inset 4/10px' },
                    { name: '--shadow-voice-example', label: 'Voice Example', desc: 'Inset 2/5px' },
                    { name: '--shadow-demo-inset', label: 'Demo Inset', desc: 'Inset 6/12px' },
                  ].map((item) => (
                    <div key={item.name} style={{ textAlign: 'center' }}>
                      <div style={{ ...demoBox, width: '110px', height: '80px', boxShadow: `var(${item.name})` }}>
                        <Heading4 effect="embossed-subtle" style={{ fontSize: '12px' }}>{item.label}</Heading4>
                      </div>
                      <div style={{ ...varName, fontSize: '9px' }}>{item.name}</div>
                      <div style={specLabel}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
        </div>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           6. GLASS SYSTEM — Referencia: DashboardPage
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Glass System"
        description="Items semi-transparentes dentro de contenedores INSET. Referencia: DashboardPage glass cards"
      >
        <div style={raised(2)}>
              <Label effect="carved-muted" style={{ color: 'var(--foreground-muted)' }}>
                Glass items float INSIDE inset containers — never directly on RAISED
              </Label>

              {/* Glass backgrounds */}
              <div style={{ ...inset(2), marginTop: '16px' }}>
                <Label effect="embossed" style={{ fontSize: '10px' }}>
                  GLASS BACKGROUNDS
                </Label>
                <div style={{ display: 'flex', gap: '16px', marginTop: '12px', flexWrap: 'wrap' }}>
                  {[
                    { name: '--glass-bg', label: 'Default', value: 'rgba(255,255,255,0.25)', bg: 'var(--glass-bg)' },
                    { name: '--glass-bg-hover', label: 'Hover', value: 'rgba(255,255,255,0.35)', bg: 'var(--glass-bg-hover)' },
                    { name: '--glass-bg-active', label: 'Active', value: 'rgba(255,255,255,0.45)', bg: 'var(--glass-bg-active)' },
                    { name: '--glass-bg-strong', label: 'Strong', value: 'rgba(255,255,255,0.40)', bg: 'var(--glass-bg-strong)' },
                  ].map((item) => (
                    <div key={item.name} style={{ textAlign: 'center', flex: 1, minWidth: '120px' }}>
                      <div style={{
                        background: item.bg,
                        backdropFilter: 'blur(8px)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '12px',
                        padding: '20px',
                        height: '80px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Heading4 effect="carved-whisper" style={{ fontSize: '13px' }}>{item.label}</Heading4>
                      </div>
                      <div style={{ ...varName, fontSize: '9px' }}>{item.name}</div>
                      <div style={specLabel}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Glass borders */}
              <div style={{ ...inset(1), marginTop: '16px' }}>
                <Label effect="embossed" style={{ fontSize: '10px' }}>
                  GLASS BORDERS
                </Label>
                <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                  {[
                    { name: '--glass-border', label: 'Default', value: 'rgba(255,255,255,0.35)', border: 'var(--glass-border)' },
                    { name: '--glass-border-strong', label: 'Strong', value: 'rgba(255,255,255,0.50)', border: 'var(--glass-border-strong)' },
                    { name: '--glass-border-hover', label: 'Hover', value: 'rgba(255,255,255,0.60)', border: 'var(--glass-border-hover)' },
                  ].map((item) => (
                    <div key={item.name} style={{ textAlign: 'center', flex: 1 }}>
                      <div style={{
                        background: 'var(--glass-bg)',
                        backdropFilter: 'blur(8px)',
                        border: `2px solid ${item.border}`,
                        borderRadius: '12px',
                        padding: '16px',
                        height: '60px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Heading4 effect="carved-whisper" style={{ fontSize: '12px' }}>{item.label}</Heading4>
                      </div>
                      <div style={{ ...varName, fontSize: '9px' }}>{item.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Glass Teal */}
              <div style={{ ...inset(2), marginTop: '16px' }}>
                <Label effect="embossed" style={{ fontSize: '10px' }}>
                  GLASS TEAL — Dashboard glass cards with Petrol accent
                </Label>
                <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                  <div style={{
                    flex: 1,
                    background: 'var(--glass-teal-gradient)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: 'var(--glass-teal-shadow)',
                  }}>
                    <Heading4 effect="carved-petrol" style={{ color: 'var(--quafi-accent)', fontSize: '14px' }}>
                      Glass Teal Card
                    </Heading4>
                    <Paragraph effect="carved-muted" style={{ color: 'var(--foreground-muted)', fontSize: '11px', marginTop: '4px' }}>
                      --glass-teal-gradient + --glass-teal-shadow
                    </Paragraph>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '11px', fontFamily: 'var(--quafi-font-mono)', color: 'var(--foreground-muted)', lineHeight: '1.8' }}>
                      <p><strong>gradient:</strong> 135deg, white 25% → petrol 12%</p>
                      <p><strong>shadow:</strong> 0 4px 24px gray + 1px petrol ring</p>
                      <p><strong>use:</strong> Dashboard KPI cards</p>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           7. SEMANTIC ALIASES — theme.css (Light Engine dependent)
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Semantic Shadow Aliases"
        description="Aliases semanticos que apuntan a --quafi-neu-* (Light Engine). Definidos en theme.css"
      >
        <div style={raised(2)}>
              <Label effect="carved-muted" style={{ color: 'var(--foreground-muted)' }}>
                Semantic names for component shadows — Reference Light Engine tokens
              </Label>

              <table style={{ width: '100%', marginTop: '16px', borderCollapse: 'collapse', fontFamily: 'var(--quafi-font-mono)' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid var(--border)', fontSize: '10px', color: 'var(--foreground-muted)' }}>ALIAS</th>
                    <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid var(--border)', fontSize: '10px', color: 'var(--foreground-muted)' }}>RESOLVES TO</th>
                    <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid var(--border)', fontSize: '10px', color: 'var(--foreground-muted)' }}>USE CASE</th>
                    <th style={{ textAlign: 'center', padding: '8px', borderBottom: '1px solid var(--border)', fontSize: '10px', color: 'var(--foreground-muted)' }}>PREVIEW</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { alias: '--quafi-shadow-card', resolves: '--quafi-neu-elevated-md', use: 'Card default', shadow: 'var(--quafi-shadow-card)' },
                    { alias: '--quafi-shadow-card-hover', resolves: '--quafi-neu-hover-md', use: 'Card hover', shadow: 'var(--quafi-shadow-card-hover)' },
                    { alias: '--quafi-shadow-card-sm', resolves: '--quafi-neu-elevated-sm', use: 'Small card', shadow: 'var(--quafi-shadow-card-sm)' },
                    { alias: '--quafi-shadow-card-lg', resolves: '--quafi-neu-elevated-lg', use: 'Large card', shadow: 'var(--quafi-shadow-card-lg)' },
                    { alias: '--quafi-shadow-button', resolves: '--quafi-neu-elevated-sm', use: 'Button default', shadow: 'var(--quafi-shadow-button)' },
                    { alias: '--quafi-shadow-button-hover', resolves: '--quafi-neu-hover-sm', use: 'Button hover', shadow: 'var(--quafi-shadow-button-hover)' },
                    { alias: '--quafi-shadow-button-active', resolves: '--quafi-neu-active', use: 'Button active', shadow: 'var(--quafi-shadow-button-active)' },
                    { alias: '--quafi-shadow-input', resolves: '--quafi-neu-pressed-sm', use: 'Input field', shadow: 'var(--quafi-shadow-input)' },
                    { alias: '--quafi-shadow-dropdown', resolves: '--quafi-neu-elevated-lg', use: 'Dropdown menu', shadow: 'var(--quafi-shadow-dropdown)' },
                    { alias: '--quafi-shadow-modal', resolves: '--quafi-neu-elevated-xl', use: 'Modal dialog', shadow: 'var(--quafi-shadow-modal)' },
                  ].map((item) => (
                    <tr key={item.alias}>
                      <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}>
                        <Label effect="carved-petrol" style={{ color: 'var(--quafi-accent)', fontSize: '11px' }}>{item.alias}</Label>
                      </td>
                      <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}>
                        <Label effect="carved-muted" style={{ fontSize: '10px' }}>{item.resolves}</Label>
                      </td>
                      <td style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}>
                        <Label effect="carved-muted" style={{ fontSize: '10px' }}>{item.use}</Label>
                      </td>
                      <td style={{ padding: '8px', borderBottom: '1px solid var(--border)', textAlign: 'center' }}>
                        <div style={{
                          width: '48px', height: '32px', background: 'var(--marble-base)',
                          borderRadius: '8px', boxShadow: item.shadow, margin: '0 auto',
                          transition: 'box-shadow 50ms linear',
                        }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
        </div>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           8. GLOW EFFECTS
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Glow Effects"
        description="Brillos de acento y estado semantico. Definidos en shadows.css"
      >
        <div style={raised(2)}>
              {/* Accent glows */}
              <Label effect="carved-steel" style={{ color: 'var(--quafi-text-accent)', fontSize: '10px' }}>
                ACCENT GLOW — Petrol color glow (3 sizes)
              </Label>
              <div style={{ display: 'flex', gap: '24px', marginTop: '12px', justifyContent: 'center' }}>
                {[
                  { name: '--quafi-shadow-glow-sm', label: 'SM', blur: '10px' },
                  { name: '--quafi-shadow-glow-md', label: 'MD', blur: '20px' },
                  { name: '--quafi-shadow-glow-lg', label: 'LG', blur: '30px' },
                ].map((item) => (
                  <div key={item.name} style={{ textAlign: 'center' }}>
                    <div style={{
                      ...demoBox, width: '90px', height: '90px',
                      boxShadow: `var(${item.name})`, borderRadius: '50%',
                    }}>
                      <Heading4 effect="carved-accent-strong" style={{ color: 'var(--quafi-accent)', fontSize: '14px' }}>
                        {item.label}
                      </Heading4>
                    </div>
                    <div style={{ ...varName, fontSize: '9px' }}>{item.name}</div>
                    <div style={specLabel}>{item.blur}</div>
                  </div>
                ))}
              </div>

              {/* Status glows */}
              <div style={{ marginTop: '28px' }}>
                <Label effect="carved-steel" style={{ color: 'var(--quafi-text-accent)', fontSize: '10px' }}>
                  SEMANTIC STATUS GLOWS — Natural Mineral colors
                </Label>
                <div style={{ display: 'flex', gap: '24px', marginTop: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {[
                    { name: '--quafi-glow-positive', label: 'Jade', color: 'var(--quafi-positive)', effect: 'carved-positive' as const },
                    { name: '--quafi-glow-negative', label: 'Rust', color: 'var(--quafi-negative)', effect: 'carved-negative' as const },
                    { name: '--quafi-glow-warning', label: 'Gold', color: 'var(--quafi-warning)', effect: 'carved-warning' as const },
                    { name: '--quafi-glow-info', label: 'Steel', color: 'var(--quafi-info)', effect: 'carved-info' as const },
                  ].map((item) => (
                    <div key={item.name} style={{ textAlign: 'center' }}>
                      <div style={{
                        ...demoBox, width: '90px', height: '90px',
                        boxShadow: `var(${item.name})`, borderRadius: '50%',
                      }}>
                        <Heading4 effect={item.effect} style={{ color: item.color, fontSize: '12px' }}>
                          {item.label}
                        </Heading4>
                      </div>
                      <div style={{ ...varName, fontSize: '9px' }}>{item.name}</div>
                      <div style={specLabel}>15px blur, 25% opacity</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Large glows */}
              <div style={{ marginTop: '28px' }}>
                <Label effect="carved-steel" style={{ color: 'var(--quafi-text-accent)', fontSize: '10px' }}>
                  LARGE GLOWS — Wider radius for emphasis
                </Label>
                <div style={{ display: 'flex', gap: '24px', marginTop: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {[
                    { name: '--quafi-glow-positive-lg', label: 'Jade LG', color: 'var(--quafi-positive)', effect: 'carved-positive' as const },
                    { name: '--quafi-glow-negative-lg', label: 'Rust LG', color: 'var(--quafi-negative)', effect: 'carved-negative' as const },
                    { name: '--quafi-glow-warning-lg', label: 'Gold LG', color: 'var(--quafi-warning)', effect: 'carved-warning' as const },
                    { name: '--quafi-glow-info-lg', label: 'Steel LG', color: 'var(--quafi-info)', effect: 'carved-info' as const },
                  ].map((item) => (
                    <div key={item.name} style={{ textAlign: 'center' }}>
                      <div style={{
                        ...demoBox, width: '90px', height: '90px',
                        boxShadow: `var(${item.name})`, borderRadius: '50%',
                      }}>
                        <Heading4 effect={item.effect} style={{ color: item.color, fontSize: '12px' }}>
                          {item.label}
                        </Heading4>
                      </div>
                      <div style={{ ...varName, fontSize: '9px' }}>{item.name}</div>
                      <div style={specLabel}>30px blur, 15% opacity</div>
                    </div>
                  ))}
                </div>
              </div>
        </div>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           9. TRADITIONAL SHADOWS
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Traditional Shadows"
        description="Sombras unidireccionales (no-neumorficas) para casos especificos. Definidas en shadows.css"
      >
        <div style={raised(2)}>
              <Label effect="carved-muted" style={{ color: 'var(--foreground-muted)' }}>
                Unidirectional drop shadows — Based on --quafi-border-base-rgb (163, 177, 198)
              </Label>

              {/* Drop shadows scale */}
              <div style={{ display: 'flex', gap: '20px', marginTop: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {[
                  { name: '--quafi-shadow-xs', label: 'XS', spec: '0 1px 2px / 25%' },
                  { name: '--quafi-shadow-sm', label: 'SM', spec: '0 2px 8px / 30%' },
                  { name: '--quafi-shadow-md', label: 'MD', spec: '0 4px 16px / 35%' },
                  { name: '--quafi-shadow-lg', label: 'LG', spec: '0 8px 24px / 40%' },
                  { name: '--quafi-shadow-xl', label: 'XL', spec: '0 12px 32px / 45%' },
                  { name: '--quafi-shadow-2xl', label: '2XL', spec: '0 24px 48px / 50%' },
                ].map((item) => (
                  <div key={item.name} style={{ textAlign: 'center' }}>
                    <div style={{
                      ...demoBox, width: '90px', height: '70px',
                      boxShadow: `var(${item.name})`,
                      background: '#fff',
                    }}>
                      <Heading4 style={{ fontSize: '14px', color: 'var(--quafi-text-primary)' }}>
                        {item.label}
                      </Heading4>
                    </div>
                    <div style={{ ...varName, fontSize: '9px' }}>{item.name}</div>
                    <div style={specLabel}>{item.spec}</div>
                  </div>
                ))}
              </div>

              {/* Inner shadows */}
              <div style={{ marginTop: '28px' }}>
                <Label effect="carved-steel" style={{ color: 'var(--quafi-text-accent)', fontSize: '10px' }}>
                  INNER & HIGHLIGHT — Focus rings and light lines
                </Label>
                <div style={{ display: 'flex', gap: '20px', marginTop: '12px', justifyContent: 'center' }}>
                  {[
                    { name: '--quafi-shadow-inner', label: 'Inner', spec: 'inset 0 2px 4px / 30%' },
                    { name: '--quafi-shadow-inner-strong', label: 'Inner Strong', spec: 'inset 0 4px 8px / 40%' },
                    { name: '--quafi-shadow-highlight', label: 'Highlight', spec: 'inset 0 1px 0 / white 60%' },
                    { name: '--quafi-shadow-highlight-strong', label: 'Highlight Strong', spec: 'inset 0 1px 0 / white 80%' },
                  ].map((item) => (
                    <div key={item.name} style={{ textAlign: 'center' }}>
                      <div style={{
                        ...demoBox, width: '110px', height: '60px',
                        boxShadow: `var(${item.name})`,
                        background: 'var(--marble-dark)',
                      }}>
                        <span style={{ fontSize: '10px', fontFamily: 'var(--quafi-font-mono)', color: 'var(--foreground-muted)' }}>
                          {item.label}
                        </span>
                      </div>
                      <div style={{ ...varName, fontSize: '8px' }}>{item.name}</div>
                      <div style={{ ...specLabel, fontSize: '8px' }}>{item.spec}</div>
                    </div>
                  ))}
                </div>
              </div>
        </div>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           10. LIGHT ENGINE DYNAMIC — Referencia: ShadowsShowcase original
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Light Engine Dynamic"
        description="Sombras calculadas en tiempo real basadas en angulo de luz"
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }}>
          {[1, 2, 3, 4, 5].map((level) => (
            <div key={level} style={{ textAlign: 'center' }}>
              <div style={{
                ...demoBox,
                boxShadow: getNeuPanelShadow(level * 4, level * 12),
              }}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--quafi-text-primary)', fontFamily: 'var(--quafi-font-mono)' }}>
                  {level}
                </div>
                <div style={{ fontSize: '10px', color: '#636E72', fontFamily: 'var(--quafi-font-mono)' }}>
                  Dynamic
                </div>
              </div>
              <div style={{ marginTop: '12px', fontSize: '11px', color: '#636E72', fontFamily: 'var(--quafi-font-mono)' }}>
                {level * 4}px / {level * 12}px blur
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic inset */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center', marginTop: '24px' }}>
          {[
            { label: 'Small', dist: 3, blur: 8 },
            { label: 'Medium', dist: 5, blur: 15 },
            { label: 'Large', dist: 8, blur: 20 },
          ].map((config) => (
            <div key={config.label} style={{ textAlign: 'center' }}>
              <div style={{
                ...demoBox,
                boxShadow: getNeuInsetShadow(config.dist, config.blur),
              }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--quafi-text-primary)', fontFamily: 'var(--quafi-font-mono)' }}>
                  {config.label}
                </div>
                <div style={{ fontSize: '10px', color: '#636E72', fontFamily: 'var(--quafi-font-mono)' }}>
                  Inset
                </div>
              </div>
              <div style={{ marginTop: '12px', fontSize: '11px', color: '#636E72', fontFamily: 'var(--quafi-font-mono)' }}>
                {config.dist}px / {config.blur}px blur
              </div>
            </div>
          ))}
        </div>

        {/* Light angle indicator */}
        <div style={{
          marginTop: '16px', padding: '12px', borderRadius: '12px',
          boxShadow: getNeuInsetShadow(3, 10), background: MARBLE_BASE,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          transition: 'box-shadow 50ms linear',
        }}>
          <Sun size={16} style={{ color: '#F59E0B' }} />
          <span style={{ fontSize: '12px', color: '#636E72', fontFamily: 'var(--quafi-font-mono)' }}>
            Light Angle: {Math.round(lightAngle)}°
          </span>
        </div>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           11. REGLAS DE USO
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Reglas de Uso"
        description="Como elegir la sombra correcta segun el contexto"
      >
        <div style={{ fontSize: '12px', color: 'var(--foreground)', lineHeight: '2', fontFamily: 'var(--quafi-font-mono)' }}>
          <p><strong style={{ color: 'var(--quafi-accent)' }}>JERARQUIA (regla critica):</strong></p>
          <p>FONDO (#d5d8dc) → RAISED → INSET → GLASS</p>
          <p>Nunca anidar mismo nivel. Nunca saltar niveles.</p>

          <p style={{ marginTop: '16px' }}><strong style={{ color: 'var(--quafi-accent)' }}>TIPOGRAFIA:</strong></p>
          <p>Container RAISED → texto CARVED (hundido en superficie)</p>
          <p>Container INSET  → texto EMBOSSED (elevado desde superficie)</p>
          <p>Container GLASS  → texto CARVED-WHISPER o GLOW</p>

          <p style={{ marginTop: '16px' }}><strong style={{ color: 'var(--quafi-accent)' }}>NIVELES POR COMPONENTE:</strong></p>
          <p>Badges, toggles  → raised-1 / inset-1</p>
          <p>Buttons, inputs  → raised-2 / inset-2</p>
          <p>Cards, panels    → raised-3 / inset-3 (default)</p>
          <p>Dropdowns, hover → raised-4 / inset-4</p>
          <p>Modals, hero     → raised-5 / inset-5</p>

          <p style={{ marginTop: '16px' }}><strong style={{ color: 'var(--quafi-accent)' }}>SHADOW COLORS:</strong></p>
          <p>--shadow-light: rgba(255, 255, 255, 0.95) — highlight top-left</p>
          <p>--shadow-dark:  rgba(147, 157, 170, 0.55) — shadow bottom-right</p>
          <p>--shadow-darker: rgba(130, 140, 155, 0.65) — for inset-5 depth</p>

          <p style={{ marginTop: '16px' }}><strong style={{ color: 'var(--quafi-accent)' }}>TRANSITIONS:</strong></p>
          <p>box-shadow: 50ms linear (--transition-shadow)</p>
          <p>Usar transition en elementos con sombras dinamicas o hover</p>

          <p style={{ marginTop: '16px' }}><strong style={{ color: 'var(--quafi-accent)' }}>BORDER RADIUS POR NIVEL:</strong></p>
          <p>--radius-sm: 8px   (badges, small elements)</p>
          <p>--radius-md: 12px  (inputs, items)</p>
          <p>--radius-lg: 15px  (cards, sections)</p>
          <p>--radius-xl: 20px  (containers, panels)</p>
          <p>--radius-full: 9999px (pills, avatars)</p>

          <p style={{ marginTop: '16px' }}><strong style={{ color: 'var(--quafi-accent)' }}>ARCHIVOS FUENTE:</strong></p>
          <p>shadows.css → raised, inset, glass, specialty, traditional, glows</p>
          <p>theme.css   → --quafi-neu-* (light engine), semantic aliases</p>
          <p>letterpress.css → text-shadow effects (carved, embossed, glow)</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}

// Main component with provider
export function ShadowsShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <ShadowsCatalogContent />
    </LightEngineProvider>
  );
}
