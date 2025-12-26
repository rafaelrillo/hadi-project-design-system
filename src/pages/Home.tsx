// Path: src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Layers, BarChart3, ArrowRight, LineChart, Sparkles } from 'lucide-react';

export function Home() {
  const headerStyles: React.CSSProperties = {
    marginBottom: '20px'
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--primary)',
    marginBottom: '8px',
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    textShadow: '0 0 20px var(--accent-glow)'
  };

  const subtitleStyles: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--foreground-muted)',
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  };

  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px'
  };

  const cardStyles: React.CSSProperties = {
    backgroundColor: 'var(--background-secondary)',
    padding: '20px',
    borderRadius: 'var(--radius)',
    border: '1px solid var(--border)',
    textDecoration: 'none',
    color: 'var(--foreground)',
    transition: 'all 0.2s ease',
    cursor: 'pointer'
  };

  const iconContainerStyles: React.CSSProperties = {
    width: '36px',
    height: '36px',
    borderRadius: 'var(--radius)',
    backgroundColor: 'var(--accent)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '12px',
    boxShadow: 'var(--shadow-glow-sm)'
  };

  const cardTitleStyles: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '6px',
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--foreground)'
  };

  const cardDescStyles: React.CSSProperties = {
    fontSize: '12px',
    color: 'var(--foreground-muted)',
    marginBottom: '12px',
    lineHeight: '1.5',
    fontFamily: 'var(--font-mono)'
  };

  const cardCountStyles: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 700,
    color: 'var(--primary)',
    fontFamily: 'var(--font-mono)',
    textShadow: '0 0 10px var(--accent-glow)'
  };

  const linkStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    color: 'var(--primary)',
    fontSize: '12px',
    fontWeight: 600,
    textDecoration: 'none',
    marginTop: '8px',
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.03em'
  };

  const statsContainerStyles: React.CSSProperties = {
    backgroundColor: 'var(--background-secondary)',
    padding: '20px',
    borderRadius: 'var(--radius)',
    border: '1px solid var(--border)',
    marginBottom: '20px'
  };

  const categories = [
    {
      title: 'Atoms',
      description: 'Componentes básicos e indivisibles del sistema. Botones, inputs, badges, tipografía, iconos.',
      count: 7,
      icon: Box,
      link: '/atoms/button',
      color: 'var(--primary)',
      glow: 'var(--accent-glow)'
    },
    {
      title: 'Molecules',
      description: 'Combinaciones de átomos que forman componentes más complejos. Cards, form fields, menu items.',
      count: 8,
      icon: Layers,
      link: '/molecules/card',
      color: 'var(--primary)',
      glow: 'var(--accent-glow)'
    },
    {
      title: 'Organisms',
      description: 'Componentes complejos formados por moléculas y átomos. Sidebars, tablas, modales, formularios.',
      count: 6,
      icon: BarChart3,
      link: '/organisms/table',
      color: 'var(--primary)',
      glow: 'var(--accent-glow)'
    },
    {
      title: 'Charts',
      description: 'Visualizaciones de datos financieros. Line charts, bar charts, stat cards, sparklines.',
      count: 14,
      icon: LineChart,
      link: '/charts',
      color: 'var(--warning)',
      glow: 'var(--warning-glow)'
    },
    {
      title: 'Animations',
      description: 'Sistema de animaciones y transiciones. Efectos de entrada, salida, hover y microinteracciones.',
      count: 7,
      icon: Sparkles,
      link: '/animations',
      color: 'var(--warning)',
      glow: 'var(--warning-glow)'
    }
  ];

  return (
    <div>
      {/* Header */}
      <header style={headerStyles}>
        <h1 style={titleStyles}>
          SENTINEL Design System
        </h1>
        <p style={subtitleStyles}>
          Investment Observatory v2.0.0
        </p>
      </header>

      {/* Stats */}
      <div style={statsContainerStyles}>
        <h2 style={{
          fontSize: '14px',
          fontWeight: 600,
          marginBottom: '12px',
          fontFamily: 'var(--font-mono)',
          color: 'var(--foreground)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          &gt; System Status_
        </h2>
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--warning)', fontFamily: 'var(--font-mono)', textShadow: '0 0 10px var(--warning-glow)' }}>46</div>
            <div style={{ fontSize: '11px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Components</div>
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--warning)', fontFamily: 'var(--font-mono)', textShadow: '0 0 10px var(--warning-glow)' }}>666</div>
            <div style={{ fontSize: '11px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Tests Passing</div>
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--warning)', fontFamily: 'var(--font-mono)', textShadow: '0 0 10px var(--warning-glow)' }}>676</div>
            <div style={{ fontSize: '11px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Tests Total</div>
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--warning)', fontFamily: 'var(--font-mono)', textShadow: '0 0 10px var(--warning-glow)' }}>24.9%</div>
            <div style={{ fontSize: '11px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Coverage</div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div style={gridStyles}>
        {categories.map((category) => {
          const cardContent = (
            <>
              <div style={{
                ...iconContainerStyles,
                backgroundColor: `color-mix(in srgb, ${category.color} 20%, transparent)`,
                boxShadow: `0 0 10px ${category.glow}`
              }}>
                <category.icon size={18} color={category.color} />
              </div>
              <h3 style={{
                ...cardTitleStyles,
                color: category.color
              }}>&gt; {category.title}_</h3>
              <p style={cardDescStyles}>{category.description}</p>
              <div style={{
                ...cardCountStyles,
                color: category.color,
                textShadow: `0 0 10px ${category.glow}`
              }}>{category.count} components</div>
              <div style={{
                ...linkStyles,
                color: category.color
              }}>
                [Enter] <ArrowRight size={12} />
              </div>
            </>
          );

          return (
            <Link
              key={category.title}
              to={category.link}
              style={{
                ...cardStyles,
                borderTop: `3px solid ${category.color}`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = category.color;
                e.currentTarget.style.boxShadow = `0 0 20px ${category.glow}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.borderTopColor = category.color;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {cardContent}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
