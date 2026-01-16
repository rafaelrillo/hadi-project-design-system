// Path: src/pages/styles/IconsShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism Icons
import React, { useMemo } from 'react';
import { ShowcaseSection } from '../../components/showcase';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';
import { Terminal, Code, Database, Cpu, Home, Search, Settings, User, Check, X, TrendingUp, DollarSign, BarChart2, Activity } from 'lucide-react';

function IconsContent() {
  const { lightAngle } = useLightEngine();

  const shadowOffsets = useMemo(() => {
    const shadowAngle = (lightAngle + 180) * (Math.PI / 180);
    return { x: Math.cos(shadowAngle), y: Math.sin(shadowAngle) };
  }, [lightAngle]);

  const LIGHT = {
    base: '#e0e5ec',
    shadowDark: 'hsl(220 15% 72%)',
    shadowLight: 'hsl(0 0% 100%)',
  };

  const getNeuPanelShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `${-x * distance}px ${-y * distance}px ${blur}px ${LIGHT.shadowLight}, ${x * distance}px ${y * distance}px ${blur}px ${LIGHT.shadowDark}`;
  };

  const getNeuInsetShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `inset ${x * distance}px ${y * distance}px ${blur}px ${LIGHT.shadowDark}, inset ${-x * distance}px ${-y * distance}px ${blur}px ${LIGHT.shadowLight}`;
  };

  const getGlassReflection = (): string => {
    const { x, y } = shadowOffsets;
    const topHighlight = -y < 0 ? 0.6 : 0.2;
    const leftHighlight = -x < 0 ? 0.4 : 0.15;
    return `inset 0 ${-y < 0 ? '-1px' : '1px'} 0 hsla(0, 0%, 100%, ${topHighlight}), inset ${-x < 0 ? '-1px' : '1px'} 0 0 hsla(0, 0%, 100%, ${leftHighlight})`;
  };

  const pageHeaderStyles: React.CSSProperties = {
    marginBottom: '32px',
    padding: '24px',
    background: LIGHT.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(20, 60),
    transition: 'box-shadow 50ms linear',
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

  const iconSizes = [
    { name: 'Extra Small', variable: '--icon-size-xs', pixels: 16, usage: 'Indicadores inline' },
    { name: 'Small', variable: '--icon-size-sm', pixels: 20, usage: 'Inputs, botones pequeños' },
    { name: 'Medium (Estándar)', variable: '--icon-size-md', pixels: 24, usage: 'Navegación, menús' },
    { name: 'Large', variable: '--icon-size-lg', pixels: 32, usage: 'Headers, ilustraciones' },
  ];

  const glassIconBox = (hue: number, sat: number): React.CSSProperties => ({
    width: '48px',
    height: '48px',
    background: `linear-gradient(${lightAngle + 45}deg, hsla(${hue}, ${sat}%, 70%, 0.28) 0%, hsla(${hue}, ${sat}%, 65%, 0.12) 50%, hsla(${hue}, ${sat}%, 60%, 0.20) 100%)`,
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    borderRadius: '15px',
    border: `1px solid hsla(${hue}, ${sat}%, 80%, 0.35)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `${getGlassReflection()}, ${shadowOffsets.x * 2}px ${shadowOffsets.y * 3}px 6px hsla(${hue}, ${sat * 0.6}%, 35%, 0.12)`,
    transition: 'box-shadow 50ms linear, background 100ms linear',
  });

  return (
    <div style={{ background: LIGHT.base, minHeight: '100%', padding: '24px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Icons_</h1>
        <p style={descStyles}>// Lucide React con estilo Glass-Neumorphism</p>
      </header>

      <ShowcaseSection
        title="Tamaños de Iconos"
        description="Escala de 16px a 32px, estándar 24px"
      >
        <div>
          {iconSizes.map((size) => (
            <div key={size.variable} style={{
              padding: '20px',
              background: LIGHT.base,
              borderRadius: '15px',
              boxShadow: getNeuInsetShadow(3, 10),
              marginBottom: '16px',
              transition: 'box-shadow 50ms linear',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  padding: '16px',
                  background: LIGHT.base,
                  borderRadius: '15px',
                  boxShadow: getNeuPanelShadow(8, 24),
                  minWidth: '180px',
                  transition: 'box-shadow 50ms linear',
                }}>
                  <Terminal size={size.pixels} color="#4A9A9C" />
                  <Code size={size.pixels} color="#4A9A9C" />
                  <Database size={size.pixels} color="#4A9A9C" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#2D3436', marginBottom: '4px', fontFamily: 'var(--sentinel-font-display)' }}>
                    {size.name}
                  </div>
                  <code style={{
                    fontSize: '11px',
                    backgroundColor: 'rgba(74, 154, 156, 0.15)',
                    padding: '2px 8px',
                    borderRadius: '15px',
                    color: 'var(--sentinel-accent-primary)',
                    fontFamily: 'var(--sentinel-font-mono)'
                  }}>
                    {size.pixels}px
                  </code>
                  <div style={{ fontSize: '11px', color: '#9BA4B0', marginTop: '4px', fontFamily: 'var(--sentinel-font-mono)' }}>
                    {size.usage}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Iconos con Glass Effect"
        description="Iconos dentro de contenedores glassmorphism coloreados"
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }}>
          {[
            { icon: TrendingUp, hue: 145, sat: 45, label: 'Success' },
            { icon: Activity, hue: 175, sat: 35, label: 'Primary' },
            { icon: DollarSign, hue: 215, sat: 50, label: 'Info' },
            { icon: BarChart2, hue: 355, sat: 35, label: 'Error' },
            { icon: Settings, hue: 35, sat: 55, label: 'Warning' },
            { icon: Cpu, hue: 280, sat: 40, label: 'Premium' },
          ].map((item) => (
            <div key={item.label} style={{ textAlign: 'center' }}>
              <div style={glassIconBox(item.hue, item.sat)}>
                <item.icon size={24} color={`hsl(${item.hue}, ${item.sat * 0.8}%, 30%)`} />
              </div>
              <div style={{ marginTop: '8px', fontSize: '11px', color: '#636E72', fontFamily: 'var(--sentinel-font-mono)' }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Iconos Neumórficos"
        description="Iconos en contenedores neumórficos elevados"
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }}>
          {[Home, Search, Settings, User, Check, X, Terminal, Code, Database, Cpu].map((Icon, i) => (
            <div key={i} style={{
              width: '52px',
              height: '52px',
              background: LIGHT.base,
              borderRadius: '15px',
              boxShadow: getNeuPanelShadow(8, 24),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'box-shadow 50ms linear',
            }}>
              <Icon size={24} color="#4A9A9C" />
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Iconos Inset"
        description="Iconos en contenedores hundidos/cavados"
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }}>
          {[TrendingUp, DollarSign, BarChart2, Activity].map((Icon, i) => (
            <div key={i} style={{
              width: '52px',
              height: '52px',
              background: LIGHT.base,
              borderRadius: '15px',
              boxShadow: getNeuInsetShadow(5, 15),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'box-shadow 50ms linear',
            }}>
              <Icon size={24} color="#636E72" />
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{
          padding: '20px',
          borderRadius: '15px',
          boxShadow: getNeuInsetShadow(5, 15),
          background: LIGHT.base,
          fontSize: '12px',
          fontFamily: 'var(--sentinel-font-mono)',
          color: '#636E72',
          lineHeight: '1.8',
          transition: 'box-shadow 50ms linear',
        }}>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Librería:</strong> Lucide React (MIT)</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Tamaño estándar:</strong> 24px</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Escala:</strong> 16px, 20px, 24px, 32px</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Color primario:</strong> var(--sentinel-accent-primary)</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Stroke width:</strong> 2px</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Contenedores:</strong> Elevated, Inset, Glass</p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Código de Ejemplo">
        <div style={{
          padding: '20px',
          borderRadius: '15px',
          boxShadow: getNeuInsetShadow(5, 15),
          background: LIGHT.base,
          fontSize: '12px',
          fontFamily: 'var(--sentinel-font-mono)',
          color: '#636E72',
          transition: 'box-shadow 50ms linear',
        }}>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`import { Terminal, Code } from 'lucide-react';

// Tamaños
<Terminal size={24} /> // Estándar
<Code size={20} />     // Pequeño
<Database size={16} /> // Extra pequeño

// Con colores del tema
<Terminal color="var(--sentinel-accent-primary)" />
<Check color="var(--sentinel-status-positive)" />
<X color="var(--sentinel-status-negative)" />

// En contenedor neumórfico
<div style={{ boxShadow: getNeuPanelShadow(8, 24) }}>
  <Terminal size={24} />
</div>`}</pre>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export function IconsShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <IconsContent />
    </LightEngineProvider>
  );
}
