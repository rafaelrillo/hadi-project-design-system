// Path: src/pages/styles/ButtonShowcase.tsx
// SENTINEL Design System - Complete Button System Showcase (Stone Marble + Glass)

import React, { useState } from 'react';
import {
  Button,
  IconButton,
  ToggleButton,
  ButtonGroup,
  TabGroup,
  Stepper,
} from '@components/atoms/Button';
import { ShowcaseSection } from '@components/showcase';
import {
  Save,
  Trash2,
  Plus,
  Download,
  Settings,
  Bell,
  Heart,
  Star,
  Check,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Play,
  SkipForward,
  Volume2,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  Filter,
  RefreshCw,
  Shield,
  Zap,
  Crown,
  Target,
  TrendingUp,
  Lock,
  Eye,
  ExternalLink,
  AlertTriangle,
  Copy,
  Edit3,
  Share2,
} from 'lucide-react';
import { LightEngineProvider } from '@/contexts/LightEngineContext';

export function ButtonShowcase() {
  const [toggleStates, setToggleStates] = useState({
    toggle1: false,
    toggle2: true,
    toggle3: false,
  });
  const [activeTab, setActiveTab] = useState(0);
  const [stepperValue, setStepperValue] = useState(5);

  // ═══════════════════════════════════════════════════════════════════════════
  // STONE MARBLE STYLES
  // ═══════════════════════════════════════════════════════════════════════════

  const pageStyles: React.CSSProperties = {
    background: 'var(--marble-base)',
    minHeight: '100%',
    padding: '32px',
  };

  const headerStyles: React.CSSProperties = {
    marginBottom: '40px',
    padding: '32px',
    background: 'var(--marble-base)',
    borderRadius: '20px',
    boxShadow: 'var(--raised-4)',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '8px',
    fontFamily: 'var(--sentinel-font-display)',
    letterSpacing: '0.05em',
    textShadow: `
      1px 1px 0px rgba(255, 255, 255, 0.8),
      -1px -1px 0px rgba(130, 140, 155, 0.5)
    `,
  };

  const subtitleStyles: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    fontFamily: 'var(--sentinel-font-mono)',
    letterSpacing: '0.02em',
    textShadow: `
      0.5px 0.5px 0px rgba(255, 255, 255, 0.6),
      -0.5px -0.5px 0px rgba(130, 140, 155, 0.4)
    `,
  };

  const categoryStyles: React.CSSProperties = {
    fontSize: '22px',
    fontWeight: 700,
    color: 'var(--sentinel-accent-primary)',
    marginBottom: '12px',
    marginTop: '56px',
    fontFamily: 'var(--sentinel-font-display)',
    letterSpacing: '0.08em',
    paddingBottom: '12px',
    borderBottom: '3px solid var(--sentinel-accent-primary)',
    textShadow: `
      -1px -1px 0px rgba(255, 255, 255, 0.9),
      1px 1px 0px rgba(147, 157, 170, 0.5)
    `,
  };

  const labelStyles: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--text-muted)',
    fontFamily: 'var(--sentinel-font-mono)',
    letterSpacing: '0.08em',
    marginTop: '10px',
    textAlign: 'center',
    textTransform: 'uppercase',
  };

  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: '28px',
    alignItems: 'start',
  };

  const cardStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  };

  const insetContainerStyles: React.CSSProperties = {
    background: 'var(--marble-base)',
    borderRadius: '16px',
    boxShadow: 'var(--inset-2)',
    padding: '20px',
    marginTop: '16px',
  };

  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <div style={pageStyles}>
        {/* ═══════════════════════════════════════════════════════════════════
            HEADER
            ═══════════════════════════════════════════════════════════════════ */}
        <header style={headerStyles}>
          <h1 style={titleStyles}>BUTTON SYSTEM</h1>
          <p style={subtitleStyles}>
            36 variantes: 20 Stone Marble + 8 Glass + 8 Glass-Neu Hybrid
          </p>
        </header>

        {/* ═══════════════════════════════════════════════════════════════════
            STONE MARBLE VARIANTS (20)
            ═══════════════════════════════════════════════════════════════════ */}
        <h2 style={categoryStyles}>STONE MARBLE VARIANTS</h2>

        {/* Basic Elevation */}
        <ShowcaseSection
          title="Elevación Básica"
          description="Raised, Soft, Deep - Niveles de elevación para diferentes jerarquías"
        >
          <div style={gridStyles}>
            <div style={cardStyles}>
              <Button variant="marble-raised">Raised</Button>
              <span style={labelStyles}>marble-raised</span>
            </div>
            <div style={cardStyles}>
              <Button variant="marble-soft">Soft</Button>
              <span style={labelStyles}>marble-soft</span>
            </div>
            <div style={cardStyles}>
              <Button variant="marble-deep">Deep</Button>
              <span style={labelStyles}>marble-deep</span>
            </div>
            <div style={cardStyles}>
              <Button variant="marble-float">Float</Button>
              <span style={labelStyles}>marble-float</span>
            </div>
            <div style={cardStyles}>
              <Button variant="marble-layered">Layered</Button>
              <span style={labelStyles}>marble-layered</span>
            </div>
          </div>
        </ShowcaseSection>

        {/* Letterpress Typography */}
        <ShowcaseSection
          title="Tipografía Tallada"
          description="Carved (texto hundido) y Embossed (texto en relieve) - Efecto letterpress"
        >
          <div style={gridStyles}>
            <div style={cardStyles}>
              <Button variant="marble-carved">CARVED</Button>
              <span style={labelStyles}>marble-carved</span>
            </div>
            <div style={cardStyles}>
              <Button variant="marble-embossed">EMBOSSED</Button>
              <span style={labelStyles}>marble-embossed</span>
            </div>
            <div style={cardStyles}>
              <Button variant="marble-inset">Inset</Button>
              <span style={labelStyles}>marble-inset</span>
            </div>
          </div>
          <div style={insetContainerStyles}>
            <p style={{ ...labelStyles, marginBottom: '16px', marginTop: 0, textAlign: 'left' }}>
              Demo en contenedor INSET (texto debe verse embossed):
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Button variant="marble-embossed">EMBOSSED</Button>
              <Button variant="marble-inset">Inset Button</Button>
            </div>
          </div>
        </ShowcaseSection>

        {/* Special Shapes */}
        <ShowcaseSection
          title="Formas Especiales"
          description="Pill, Stadium, Diamond, Frame, Seal - Formas elegantes y decorativas"
        >
          <div style={gridStyles}>
            <div style={cardStyles}>
              <Button variant="marble-pill">Pill Shape</Button>
              <span style={labelStyles}>marble-pill</span>
            </div>
            <div style={cardStyles}>
              <Button variant="marble-stadium">Stadium</Button>
              <span style={labelStyles}>marble-stadium</span>
            </div>
            <div style={cardStyles}>
              <Button variant="marble-diamond">Diamond</Button>
              <span style={labelStyles}>marble-diamond</span>
            </div>
            <div style={cardStyles}>
              <Button variant="marble-frame">FRAME</Button>
              <span style={labelStyles}>marble-frame</span>
            </div>
            <div style={cardStyles}>
              <div style={{ width: '60px', height: '60px' }}>
                <Button variant="marble-seal">S</Button>
              </div>
              <span style={labelStyles}>marble-seal</span>
            </div>
          </div>
        </ShowcaseSection>

        {/* ═══════════════════════════════════════════════════════════════════
            FORMAS GEOMÉTRICAS - DECORATIVE SHAPE BUTTONS
            ═══════════════════════════════════════════════════════════════════ */}
        <ShowcaseSection
          title="Formas Geométricas - Raised"
          description="Botones decorativos con formas geométricas y sombras elevadas"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'flex-start', justifyContent: 'center' }}>
            {/* Circle Button */}
            <div style={cardStyles}>
              <button
                style={{
                  width: '56px',
                  height: '56px',
                  background: 'var(--marble-base)',
                  borderRadius: '50%',
                  boxShadow: 'var(--raised-2)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  textShadow: '0.75px 0.75px 0px rgba(255, 255, 255, 0.7), -0.75px -0.75px 0px rgba(130, 140, 155, 0.5)',
                  transition: 'all 150ms ease',
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--inset-2)';
                  e.currentTarget.style.textShadow = '-1px -1px 0px rgba(255, 255, 255, 0.95), 1px 1px 0px rgba(147, 157, 170, 0.55)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--raised-2)';
                  e.currentTarget.style.textShadow = '0.75px 0.75px 0px rgba(255, 255, 255, 0.7), -0.75px -0.75px 0px rgba(130, 140, 155, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--raised-2)';
                  e.currentTarget.style.textShadow = '0.75px 0.75px 0px rgba(255, 255, 255, 0.7), -0.75px -0.75px 0px rgba(130, 140, 155, 0.5)';
                }}
              >
                <Plus size={20} />
              </button>
              <span style={labelStyles}>Circle</span>
            </div>

            {/* Square Button */}
            <div style={cardStyles}>
              <button
                style={{
                  width: '56px',
                  height: '56px',
                  background: 'var(--marble-base)',
                  borderRadius: '12px',
                  boxShadow: 'var(--raised-2)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  textShadow: '0.75px 0.75px 0px rgba(255, 255, 255, 0.7), -0.75px -0.75px 0px rgba(130, 140, 155, 0.5)',
                  transition: 'all 150ms ease',
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--inset-2)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--raised-2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--raised-2)';
                }}
              >
                <Settings size={20} />
              </button>
              <span style={labelStyles}>Square</span>
            </div>

            {/* Pill Horizontal Button */}
            <div style={cardStyles}>
              <button
                style={{
                  width: '100px',
                  height: '44px',
                  background: 'var(--marble-base)',
                  borderRadius: '100px',
                  boxShadow: 'var(--raised-2)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  textShadow: '0.75px 0.75px 0px rgba(255, 255, 255, 0.7), -0.75px -0.75px 0px rgba(130, 140, 155, 0.5)',
                  transition: 'all 150ms ease',
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--inset-2)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--raised-2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--raised-2)';
                }}
              >
                <Save size={16} />
                Save
              </button>
              <span style={labelStyles}>Pill H</span>
            </div>

            {/* Diamond Button */}
            <div style={cardStyles}>
              <button
                style={{
                  width: '48px',
                  height: '48px',
                  background: 'var(--marble-base)',
                  transform: 'rotate(45deg)',
                  borderRadius: '8px',
                  boxShadow: 'var(--raised-2)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 150ms ease',
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--inset-2)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--raised-2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--raised-2)';
                }}
              >
                <Star size={18} style={{ transform: 'rotate(-45deg)' }} />
              </button>
              <span style={labelStyles}>Diamond</span>
            </div>

            {/* Hexagon Button */}
            <div style={cardStyles}>
              <button
                style={{
                  width: '60px',
                  height: '52px',
                  background: 'var(--marble-base)',
                  clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                  filter: 'drop-shadow(3px 3px 6px var(--shadow-dark)) drop-shadow(-3px -3px 6px var(--shadow-light))',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 150ms ease',
                }}
              >
                <Crown size={20} />
              </button>
              <span style={labelStyles}>Hexagon</span>
            </div>

            {/* Octagon Button */}
            <div style={cardStyles}>
              <button
                style={{
                  width: '56px',
                  height: '56px',
                  background: 'var(--marble-base)',
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                  filter: 'drop-shadow(3px 3px 6px var(--shadow-dark)) drop-shadow(-3px -3px 6px var(--shadow-light))',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 150ms ease',
                }}
              >
                <Target size={20} />
              </button>
              <span style={labelStyles}>Octagon</span>
            </div>

            {/* Shield Button */}
            <div style={cardStyles}>
              <button
                style={{
                  width: '52px',
                  height: '60px',
                  background: 'var(--marble-base)',
                  clipPath: 'polygon(50% 0%, 100% 15%, 100% 65%, 50% 100%, 0% 65%, 0% 15%)',
                  filter: 'drop-shadow(3px 3px 6px var(--shadow-dark)) drop-shadow(-3px -3px 6px var(--shadow-light))',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 150ms ease',
                }}
              >
                <Shield size={20} />
              </button>
              <span style={labelStyles}>Shield</span>
            </div>
          </div>
        </ShowcaseSection>

        {/* ═══════════════════════════════════════════════════════════════════
            BORDES CON PILL FRAME - ELEGANT FRAME BORDERS
            ═══════════════════════════════════════════════════════════════════ */}
        <ShowcaseSection
          title="Bordes con Pill Frame"
          description="Botones con bordes elegantes tipo marco - Simple, Double, Ridge, Groove, Bevel, Pill Frame"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start', justifyContent: 'center' }}>
            {/* Simple Frame */}
            <div style={cardStyles}>
              <button
                style={{
                  width: '120px',
                  height: '48px',
                  background: 'var(--marble-base)',
                  borderRadius: '12px',
                  border: '2px solid var(--marble-base)',
                  boxShadow: '0 0 0 2px var(--shadow-dark), 0 0 0 4px var(--shadow-light), var(--raised-1)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  textShadow: '0.75px 0.75px 0px rgba(255, 255, 255, 0.7), -0.75px -0.75px 0px rgba(130, 140, 155, 0.5)',
                  transition: 'all 150ms ease',
                }}
              >
                Simple
              </button>
              <span style={labelStyles}>Simple Frame</span>
            </div>

            {/* Double Frame */}
            <div style={cardStyles}>
              <button
                style={{
                  width: '120px',
                  height: '48px',
                  background: 'var(--marble-base)',
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: `
                    inset 0 0 0 3px var(--marble-base),
                    inset 0 0 0 4px var(--shadow-dark),
                    inset 0 0 0 6px var(--shadow-light),
                    var(--raised-2)
                  `,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  textShadow: '0.75px 0.75px 0px rgba(255, 255, 255, 0.7), -0.75px -0.75px 0px rgba(130, 140, 155, 0.5)',
                  transition: 'all 150ms ease',
                }}
              >
                Double
              </button>
              <span style={labelStyles}>Double Frame</span>
            </div>

            {/* Ridge Frame */}
            <div style={cardStyles}>
              <button
                style={{
                  width: '120px',
                  height: '48px',
                  background: 'var(--marble-base)',
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: `
                    inset 0 0 0 1px var(--shadow-light),
                    inset 0 0 0 3px var(--marble-dark),
                    inset 0 0 0 4px var(--shadow-light),
                    var(--raised-2)
                  `,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  textShadow: '0.75px 0.75px 0px rgba(255, 255, 255, 0.7), -0.75px -0.75px 0px rgba(130, 140, 155, 0.5)',
                  transition: 'all 150ms ease',
                }}
              >
                Ridge
              </button>
              <span style={labelStyles}>Ridge Frame</span>
            </div>

            {/* Groove Frame */}
            <div style={cardStyles}>
              <button
                style={{
                  width: '120px',
                  height: '48px',
                  background: 'var(--marble-base)',
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: `
                    inset 2px 2px 4px var(--shadow-dark),
                    inset -2px -2px 4px var(--shadow-light),
                    inset 0 0 0 8px var(--marble-base),
                    inset 0 0 0 10px var(--shadow-dark),
                    inset 0 0 0 12px var(--shadow-light)
                  `,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  textShadow: '0.75px 0.75px 0px rgba(255, 255, 255, 0.7), -0.75px -0.75px 0px rgba(130, 140, 155, 0.5)',
                  transition: 'all 150ms ease',
                }}
              >
                Groove
              </button>
              <span style={labelStyles}>Groove Frame</span>
            </div>

            {/* Bevel Frame */}
            <div style={cardStyles}>
              <button
                style={{
                  width: '120px',
                  height: '48px',
                  background: 'var(--marble-base)',
                  borderRadius: '4px',
                  border: 'none',
                  boxShadow: `
                    inset 1px 1px 0 var(--shadow-light),
                    inset -1px -1px 0 var(--shadow-dark),
                    3px 3px 6px var(--shadow-dark),
                    -3px -3px 6px var(--shadow-light)
                  `,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  textShadow: '0.75px 0.75px 0px rgba(255, 255, 255, 0.7), -0.75px -0.75px 0px rgba(130, 140, 155, 0.5)',
                  transition: 'all 150ms ease',
                }}
              >
                Bevel
              </button>
              <span style={labelStyles}>Bevel Frame</span>
            </div>

            {/* Pill Frame */}
            <div style={cardStyles}>
              <button
                style={{
                  width: '140px',
                  height: '50px',
                  background: 'var(--marble-base)',
                  borderRadius: '25px',
                  border: 'none',
                  boxShadow: `
                    inset 0 0 0 2px var(--marble-light),
                    inset 0 0 0 4px var(--shadow-dark),
                    var(--raised-2)
                  `,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  textShadow: '0.75px 0.75px 0px rgba(255, 255, 255, 0.7), -0.75px -0.75px 0px rgba(130, 140, 155, 0.5)',
                  transition: 'all 150ms ease',
                }}
              >
                Pill Frame
              </button>
              <span style={labelStyles}>Pill Frame</span>
            </div>
          </div>
        </ShowcaseSection>

        {/* ═══════════════════════════════════════════════════════════════════
            FORMAS GEOMÉTRICAS - INSET (CAVADAS)
            ═══════════════════════════════════════════════════════════════════ */}
        <ShowcaseSection
          title="Formas Geométricas - Inset"
          description="Botones con formas geométricas cavadas - efecto presionado"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'flex-start', justifyContent: 'center' }}>
            {/* Circle Inset */}
            <div style={cardStyles}>
              <button
                style={{
                  width: '56px',
                  height: '56px',
                  background: 'var(--marble-base)',
                  borderRadius: '50%',
                  boxShadow: 'var(--inset-2)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-primary)',
                  transition: 'all 150ms ease',
                }}
              >
                <Bell size={20} />
              </button>
              <span style={labelStyles}>Circle Inset</span>
            </div>

            {/* Square Inset */}
            <div style={cardStyles}>
              <button
                style={{
                  width: '56px',
                  height: '56px',
                  background: 'var(--marble-base)',
                  borderRadius: '12px',
                  boxShadow: 'var(--inset-2)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-primary)',
                  transition: 'all 150ms ease',
                }}
              >
                <Heart size={20} />
              </button>
              <span style={labelStyles}>Square Inset</span>
            </div>

            {/* Pill Inset */}
            <div style={cardStyles}>
              <button
                style={{
                  width: '100px',
                  height: '44px',
                  background: 'var(--marble-base)',
                  borderRadius: '100px',
                  boxShadow: 'var(--inset-2)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  textShadow: '-1px -1px 0px rgba(255, 255, 255, 0.95), 1px 1px 0px rgba(147, 157, 170, 0.55)',
                  transition: 'all 150ms ease',
                }}
              >
                <Check size={16} />
                Done
              </button>
              <span style={labelStyles}>Pill Inset</span>
            </div>

            {/* Stadium Inset */}
            <div style={cardStyles}>
              <button
                style={{
                  width: '120px',
                  height: '48px',
                  background: 'var(--marble-base)',
                  borderRadius: '24px',
                  boxShadow: 'var(--inset-2)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  textShadow: '-1px -1px 0px rgba(255, 255, 255, 0.95), 1px 1px 0px rgba(147, 157, 170, 0.55)',
                  transition: 'all 150ms ease',
                }}
              >
                <TrendingUp size={16} />
                Track
              </button>
              <span style={labelStyles}>Stadium Inset</span>
            </div>

            {/* Squircle Inset */}
            <div style={cardStyles}>
              <button
                style={{
                  width: '56px',
                  height: '56px',
                  background: 'var(--marble-base)',
                  borderRadius: '35%',
                  boxShadow: 'var(--inset-2)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-primary)',
                  transition: 'all 150ms ease',
                }}
              >
                <Zap size={20} />
              </button>
              <span style={labelStyles}>Squircle Inset</span>
            </div>
          </div>
        </ShowcaseSection>

        {/* ═══════════════════════════════════════════════════════════════════
            BOTONES CON ICONOS Y FRAMES
            ═══════════════════════════════════════════════════════════════════ */}
        <ShowcaseSection
          title="Combinaciones con Íconos"
          description="Botones geométricos con íconos y texto - aplicaciones prácticas"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start', justifyContent: 'center' }}>
            {/* Action Button - Pill Frame + Icon */}
            <div style={cardStyles}>
              <button
                style={{
                  width: '160px',
                  height: '52px',
                  background: 'var(--marble-base)',
                  borderRadius: '26px',
                  border: 'none',
                  boxShadow: `
                    inset 0 0 0 2px var(--marble-light),
                    inset 0 0 0 4px var(--shadow-dark),
                    var(--raised-2)
                  `,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  textShadow: '0.75px 0.75px 0px rgba(255, 255, 255, 0.7), -0.75px -0.75px 0px rgba(130, 140, 155, 0.5)',
                  transition: 'all 150ms ease',
                }}
              >
                <Download size={18} />
                Download
              </button>
              <span style={labelStyles}>Pill Frame + Icon</span>
            </div>

            {/* Accent Circle */}
            <div style={cardStyles}>
              <button
                style={{
                  width: '60px',
                  height: '60px',
                  background: 'rgba(58, 106, 114, 0.15)',
                  borderRadius: '50%',
                  boxShadow: 'var(--raised-2), inset 0 0 0 2px rgba(58, 106, 114, 0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--sentinel-accent-primary)',
                  transition: 'all 150ms ease',
                }}
              >
                <Plus size={24} />
              </button>
              <span style={labelStyles}>Accent Circle</span>
            </div>

            {/* Double Frame Action */}
            <div style={cardStyles}>
              <button
                style={{
                  width: '150px',
                  height: '50px',
                  background: 'var(--marble-base)',
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: `
                    inset 0 0 0 3px var(--marble-base),
                    inset 0 0 0 4px var(--shadow-dark),
                    inset 0 0 0 6px var(--shadow-light),
                    var(--raised-2)
                  `,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  textShadow: '0.75px 0.75px 0px rgba(255, 255, 255, 0.7), -0.75px -0.75px 0px rgba(130, 140, 155, 0.5)',
                  transition: 'all 150ms ease',
                }}
              >
                <Lock size={16} />
                Secure
              </button>
              <span style={labelStyles}>Double Frame</span>
            </div>

            {/* Shield Badge */}
            <div style={cardStyles}>
              <button
                style={{
                  width: '70px',
                  height: '80px',
                  background: 'rgba(58, 106, 114, 0.1)',
                  clipPath: 'polygon(50% 0%, 100% 15%, 100% 65%, 50% 100%, 0% 65%, 0% 15%)',
                  filter: 'drop-shadow(3px 3px 6px var(--shadow-dark)) drop-shadow(-3px -3px 6px var(--shadow-light))',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '2px',
                  fontFamily: 'var(--sentinel-font-mono)',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: 'var(--sentinel-accent-primary)',
                  transition: 'all 150ms ease',
                }}
              >
                <Shield size={22} />
                PRO
              </button>
              <span style={labelStyles}>Shield Badge</span>
            </div>
          </div>
        </ShowcaseSection>

        {/* Decorative Styles */}
        <ShowcaseSection
          title="Estilos Decorativos"
          description="Pillow, Ridge, Outline, Sharp - Variaciones de relieve y borde"
        >
          <div style={gridStyles}>
            <div style={cardStyles}>
              <Button variant="marble-pillow">Pillow</Button>
              <span style={labelStyles}>marble-pillow</span>
            </div>
            <div style={cardStyles}>
              <Button variant="marble-ridge">Ridge</Button>
              <span style={labelStyles}>marble-ridge</span>
            </div>
            <div style={cardStyles}>
              <Button variant="marble-outline">Outline</Button>
              <span style={labelStyles}>marble-outline</span>
            </div>
            <div style={cardStyles}>
              <Button variant="marble-sharp">Sharp</Button>
              <span style={labelStyles}>marble-sharp</span>
            </div>
          </div>
        </ShowcaseSection>

        {/* Accent Variants */}
        <ShowcaseSection
          title="Con Accent Color"
          description="Accent, Accent-Inset, Glow - Botones con color de acento teal"
        >
          <div style={gridStyles}>
            <div style={cardStyles}>
              <Button variant="marble-accent">Accent</Button>
              <span style={labelStyles}>marble-accent</span>
            </div>
            <div style={cardStyles}>
              <Button variant="marble-accent-inset">Accent Inset</Button>
              <span style={labelStyles}>marble-accent-inset</span>
            </div>
            <div style={cardStyles}>
              <Button variant="marble-glow">Glow</Button>
              <span style={labelStyles}>marble-glow</span>
            </div>
          </div>
        </ShowcaseSection>

        {/* All 20 Marble Variants Grid */}
        <ShowcaseSection
          title="Todas las 20 Variantes Stone Marble"
          description="Vista completa de todas las variantes neumórficas"
        >
          <div style={{ ...gridStyles, gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}>
            {[
              'marble-raised', 'marble-soft', 'marble-deep', 'marble-inset',
              'marble-carved', 'marble-embossed', 'marble-pillow', 'marble-ridge',
              'marble-layered', 'marble-outline', 'marble-accent', 'marble-accent-inset',
              'marble-diamond', 'marble-frame', 'marble-pill', 'marble-stadium',
              'marble-sharp', 'marble-float', 'marble-glow',
            ].map((variant) => (
              <div key={variant} style={cardStyles}>
                <Button variant={variant as any} size="sm">
                  {variant.replace('marble-', '').charAt(0).toUpperCase() + variant.replace('marble-', '').slice(1)}
                </Button>
                <span style={{ ...labelStyles, fontSize: '9px' }}>{variant}</span>
              </div>
            ))}
            <div style={cardStyles}>
              <Button variant="marble-seal" size="sm">S</Button>
              <span style={{ ...labelStyles, fontSize: '9px' }}>marble-seal</span>
            </div>
          </div>
        </ShowcaseSection>

        {/* ═══════════════════════════════════════════════════════════════════
            GLASS VARIANTS (8)
            ═══════════════════════════════════════════════════════════════════ */}
        <h2 style={categoryStyles}>GLASS VARIANTS</h2>

        <ShowcaseSection
          title="Glass Colors"
          description="Botones translúcidos con backdrop-blur - 8 colores semánticos"
        >
          <div style={gridStyles}>
            <div style={cardStyles}>
              <Button variant="glass-teal">Glass Teal</Button>
              <span style={labelStyles}>Primary</span>
            </div>
            <div style={cardStyles}>
              <Button variant="glass-emerald">Glass Emerald</Button>
              <span style={labelStyles}>Success</span>
            </div>
            <div style={cardStyles}>
              <Button variant="glass-amber">Glass Amber</Button>
              <span style={labelStyles}>Warning</span>
            </div>
            <div style={cardStyles}>
              <Button variant="glass-rose">Glass Rose</Button>
              <span style={labelStyles}>Danger</span>
            </div>
            <div style={cardStyles}>
              <Button variant="glass-sky">Glass Sky</Button>
              <span style={labelStyles}>Info</span>
            </div>
            <div style={cardStyles}>
              <Button variant="glass-violet">Glass Violet</Button>
              <span style={labelStyles}>Premium</span>
            </div>
            <div style={cardStyles}>
              <Button variant="glass-smoke">Glass Smoke</Button>
              <span style={labelStyles}>Neutral</span>
            </div>
            <div style={cardStyles}>
              <Button variant="glass-frost">Glass Frost</Button>
              <span style={labelStyles}>Ice</span>
            </div>
          </div>
        </ShowcaseSection>

        {/* ═══════════════════════════════════════════════════════════════════
            GLASS-NEU HYBRID VARIANTS (8)
            ═══════════════════════════════════════════════════════════════════ */}
        <h2 style={categoryStyles}>GLASS-NEU HYBRID VARIANTS</h2>

        <ShowcaseSection
          title="Glass-Neu Colors"
          description="Combinación de glass translúcido + sombras neumórficas - Efecto premium"
        >
          <div style={gridStyles}>
            <div style={cardStyles}>
              <Button variant="glass-neu-teal">Glass-Neu Teal</Button>
              <span style={labelStyles}>glass-neu-teal</span>
            </div>
            <div style={cardStyles}>
              <Button variant="glass-neu-emerald">Glass-Neu Emerald</Button>
              <span style={labelStyles}>glass-neu-emerald</span>
            </div>
            <div style={cardStyles}>
              <Button variant="glass-neu-amber">Glass-Neu Amber</Button>
              <span style={labelStyles}>glass-neu-amber</span>
            </div>
            <div style={cardStyles}>
              <Button variant="glass-neu-rose">Glass-Neu Rose</Button>
              <span style={labelStyles}>glass-neu-rose</span>
            </div>
            <div style={cardStyles}>
              <Button variant="glass-neu-sky">Glass-Neu Sky</Button>
              <span style={labelStyles}>glass-neu-sky</span>
            </div>
            <div style={cardStyles}>
              <Button variant="glass-neu-violet">Glass-Neu Violet</Button>
              <span style={labelStyles}>glass-neu-violet</span>
            </div>
            <div style={cardStyles}>
              <Button variant="glass-neu-smoke">Glass-Neu Smoke</Button>
              <span style={labelStyles}>glass-neu-smoke</span>
            </div>
            <div style={cardStyles}>
              <Button variant="glass-neu-frost">Glass-Neu Frost</Button>
              <span style={labelStyles}>glass-neu-frost</span>
            </div>
          </div>
        </ShowcaseSection>

        {/* ═══════════════════════════════════════════════════════════════════
            SIZES
            ═══════════════════════════════════════════════════════════════════ */}
        <h2 style={categoryStyles}>TAMAÑOS</h2>

        <ShowcaseSection
          title="5 Tamaños Disponibles"
          description="xs (30px) | sm (36px) | md (44px) | lg (52px) | xl (60px)"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
            <div style={cardStyles}>
              <Button variant="marble-accent" size="xs">XS</Button>
              <span style={labelStyles}>xs - 30px</span>
            </div>
            <div style={cardStyles}>
              <Button variant="marble-accent" size="sm">Small</Button>
              <span style={labelStyles}>sm - 36px</span>
            </div>
            <div style={cardStyles}>
              <Button variant="marble-accent" size="md">Medium</Button>
              <span style={labelStyles}>md - 44px</span>
            </div>
            <div style={cardStyles}>
              <Button variant="marble-accent" size="lg">Large</Button>
              <span style={labelStyles}>lg - 52px</span>
            </div>
            <div style={cardStyles}>
              <Button variant="marble-accent" size="xl">Extra Large</Button>
              <span style={labelStyles}>xl - 60px</span>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Tamaños Stone Marble vs Glass"
          description="Comparación de tamaños entre sistemas"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <p style={{ ...labelStyles, marginBottom: '12px', marginTop: 0, textAlign: 'left' }}>Stone Marble:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                <Button variant="marble-carved" size="xs">XS</Button>
                <Button variant="marble-carved" size="sm">SM</Button>
                <Button variant="marble-carved" size="md">MD</Button>
                <Button variant="marble-carved" size="lg">LG</Button>
                <Button variant="marble-carved" size="xl">XL</Button>
              </div>
            </div>
            <div>
              <p style={{ ...labelStyles, marginBottom: '12px', marginTop: 0, textAlign: 'left' }}>Glass:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                <Button variant="glass-teal" size="xs">XS</Button>
                <Button variant="glass-teal" size="sm">SM</Button>
                <Button variant="glass-teal" size="md">MD</Button>
                <Button variant="glass-teal" size="lg">LG</Button>
                <Button variant="glass-teal" size="xl">XL</Button>
              </div>
            </div>
          </div>
        </ShowcaseSection>

        {/* ═══════════════════════════════════════════════════════════════════
            MODIFIERS
            ═══════════════════════════════════════════════════════════════════ */}
        <h2 style={categoryStyles}>MODIFICADORES</h2>

        <ShowcaseSection
          title="Pill Shape"
          description="Border radius completo (100px) - prop: pill"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <Button variant="marble-raised" pill>Marble Pill</Button>
            <Button variant="marble-accent" pill>Accent Pill</Button>
            <Button variant="glass-teal" pill>Glass Pill</Button>
            <Button variant="glass-violet" pill>Violet Pill</Button>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Full Width"
          description="Botón que ocupa el 100% del contenedor - prop: fullWidth"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
            <Button variant="marble-accent" fullWidth>Full Width Accent</Button>
            <Button variant="marble-carved" fullWidth>Full Width Carved</Button>
            <Button variant="glass-teal" fullWidth>Full Width Glass</Button>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Con Iconos"
          description="leftIcon y rightIcon props para agregar iconos"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <Button variant="marble-accent" leftIcon={<Save size={18} />}>Guardar</Button>
            <Button variant="marble-carved" leftIcon={<Shield size={18} />}>Proteger</Button>
            <Button variant="glass-emerald" leftIcon={<Check size={18} />}>Confirmar</Button>
            <Button variant="glass-rose" leftIcon={<Trash2 size={18} />}>Eliminar</Button>
            <Button variant="marble-raised" leftIcon={<Download size={18} />}>Exportar</Button>
            <Button variant="marble-frame" rightIcon={<ChevronRight size={18} />}>Siguiente</Button>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Estados de Loading"
          description="prop: loading - Muestra spinner y deshabilita interacción"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <Button variant="marble-accent" loading>Procesando...</Button>
            <Button variant="marble-carved" loading>Guardando</Button>
            <Button variant="glass-teal" loading>Cargando</Button>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Estado Disabled"
          description="prop: disabled - Opacity 0.35 y sin interacción"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <Button variant="marble-accent" disabled>Disabled Accent</Button>
            <Button variant="marble-raised" disabled>Disabled Raised</Button>
            <Button variant="glass-teal" disabled>Disabled Glass</Button>
            <Button variant="marble-carved" disabled>Disabled Carved</Button>
          </div>
        </ShowcaseSection>

        {/* ═══════════════════════════════════════════════════════════════════
            SPECIAL COMPONENTS
            ═══════════════════════════════════════════════════════════════════ */}
        <h2 style={categoryStyles}>COMPONENTES ESPECIALES</h2>

        <ShowcaseSection
          title="IconButton"
          description="Botones circulares con solo ícono - badge y tooltip opcionales"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'start' }}>
            <div style={cardStyles}>
              <IconButton
                icon={<Settings size={20} />}
                variant="marble-raised"
                aria-label="Settings"
                tooltip="Configuración"
              />
              <span style={labelStyles}>marble-raised</span>
            </div>
            <div style={cardStyles}>
              <IconButton
                icon={<Bell size={20} />}
                variant="marble-accent"
                aria-label="Notifications"
                badge={5}
                tooltip="Notificaciones"
              />
              <span style={labelStyles}>with badge</span>
            </div>
            <div style={cardStyles}>
              <IconButton
                icon={<Heart size={20} />}
                variant="glass-rose"
                aria-label="Favorite"
              />
              <span style={labelStyles}>glass-rose</span>
            </div>
            <div style={cardStyles}>
              <IconButton
                icon={<Star size={20} />}
                variant="glass-amber"
                aria-label="Star"
              />
              <span style={labelStyles}>glass-amber</span>
            </div>
            <div style={cardStyles}>
              <IconButton
                icon={<Crown size={20} />}
                variant="marble-carved"
                aria-label="Premium"
              />
              <span style={labelStyles}>marble-carved</span>
            </div>
            <div style={cardStyles}>
              <IconButton
                icon={<Zap size={20} />}
                variant="marble-glow"
                aria-label="Power"
              />
              <span style={labelStyles}>marble-glow</span>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="ToggleButton"
          description="Switch on/off con efecto neumórfico"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'center' }}>
            <div style={cardStyles}>
              <ToggleButton
                isOn={toggleStates.toggle1}
                onToggle={() => setToggleStates((s) => ({ ...s, toggle1: !s.toggle1 }))}
                size="sm"
                aria-label="Toggle small"
              />
              <span style={labelStyles}>sm - {toggleStates.toggle1 ? 'ON' : 'OFF'}</span>
            </div>
            <div style={cardStyles}>
              <ToggleButton
                isOn={toggleStates.toggle2}
                onToggle={() => setToggleStates((s) => ({ ...s, toggle2: !s.toggle2 }))}
                size="md"
                aria-label="Toggle medium"
              />
              <span style={labelStyles}>md - {toggleStates.toggle2 ? 'ON' : 'OFF'}</span>
            </div>
            <div style={cardStyles}>
              <ToggleButton
                isOn={toggleStates.toggle3}
                onToggle={() => setToggleStates((s) => ({ ...s, toggle3: !s.toggle3 }))}
                size="lg"
                aria-label="Toggle large"
              />
              <span style={labelStyles}>lg - {toggleStates.toggle3 ? 'ON' : 'OFF'}</span>
            </div>
            <div style={cardStyles}>
              <ToggleButton isOn={false} onToggle={() => {}} size="md" disabled />
              <span style={labelStyles}>disabled</span>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="ButtonGroup"
          description="Contenedor para agrupar botones relacionados"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <p style={{ ...labelStyles, marginBottom: '12px', marginTop: 0, textAlign: 'left' }}>
                Stone Marble Group:
              </p>
              <ButtonGroup variant="neu" gap={4}>
                <Button variant="marble-soft" size="sm">Cancelar</Button>
                <Button variant="marble-accent" size="sm">Guardar</Button>
              </ButtonGroup>
            </div>
            <div>
              <p style={{ ...labelStyles, marginBottom: '12px', marginTop: 0, textAlign: 'left' }}>
                Glass Group:
              </p>
              <ButtonGroup variant="glass" gap={4}>
                <Button variant="glass-smoke" size="sm">Cancelar</Button>
                <Button variant="glass-teal" size="sm">Confirmar</Button>
              </ButtonGroup>
            </div>
            <div>
              <p style={{ ...labelStyles, marginBottom: '12px', marginTop: 0, textAlign: 'left' }}>
                Toolbar con IconButtons:
              </p>
              <ButtonGroup variant="neu" gap={2}>
                <IconButton icon={<Bold size={16} />} variant="marble-soft" size="sm" aria-label="Bold" />
                <IconButton icon={<Italic size={16} />} variant="marble-soft" size="sm" aria-label="Italic" />
                <IconButton icon={<Underline size={16} />} variant="marble-soft" size="sm" aria-label="Underline" />
                <IconButton icon={<AlignLeft size={16} />} variant="marble-soft" size="sm" aria-label="Align" />
              </ButtonGroup>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="TabGroup"
          description="Tabs de navegación con efecto neumórfico"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <p style={{ ...labelStyles, marginBottom: '12px', marginTop: 0, textAlign: 'left' }}>
                Size: md (default)
              </p>
              <TabGroup
                tabs={['Overview', 'Analytics', 'Reports', 'Settings']}
                activeTab={activeTab}
                onChange={setActiveTab}
                size="md"
              />
            </div>
            <div>
              <p style={{ ...labelStyles, marginBottom: '12px', marginTop: 0, textAlign: 'left' }}>
                Size: sm
              </p>
              <TabGroup
                tabs={['Tab 1', 'Tab 2', 'Tab 3']}
                activeTab={0}
                onChange={() => {}}
                size="sm"
              />
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Stepper"
          description="Control de incremento/decremento"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'start' }}>
            <div style={cardStyles}>
              <Stepper
                value={stepperValue}
                onChange={setStepperValue}
                min={0}
                max={10}
                variant="neu"
                size="md"
              />
              <span style={labelStyles}>neu - md</span>
            </div>
            <div style={cardStyles}>
              <Stepper
                value={3}
                onChange={() => {}}
                min={1}
                max={99}
                variant="glass"
                size="md"
              />
              <span style={labelStyles}>glass - md</span>
            </div>
            <div style={cardStyles}>
              <Stepper
                value={1}
                onChange={() => {}}
                variant="neu"
                size="sm"
              />
              <span style={labelStyles}>neu - sm</span>
            </div>
            <div style={cardStyles}>
              <Stepper
                value={10}
                onChange={() => {}}
                variant="neu"
                size="lg"
              />
              <span style={labelStyles}>neu - lg</span>
            </div>
          </div>
        </ShowcaseSection>

        {/* ═══════════════════════════════════════════════════════════════════
            USE CASES
            ═══════════════════════════════════════════════════════════════════ */}
        <h2 style={categoryStyles}>CASOS DE USO</h2>

        <ShowcaseSection
          title="Form Actions"
          description="Combinaciones comunes para formularios"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Button variant="marble-soft">Cancelar</Button>
              <Button variant="marble-accent">Guardar cambios</Button>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Button variant="marble-outline">Cancelar</Button>
              <Button variant="marble-carved" leftIcon={<Check size={18} />}>Confirmar</Button>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Button variant="glass-smoke">Cancelar</Button>
              <Button variant="glass-teal" leftIcon={<Save size={18} />}>Guardar</Button>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Destructive Actions"
          description="Confirmaciones de eliminación y acciones destructivas"
        >
          <div style={{ display: 'flex', gap: '16px' }}>
            <Button variant="marble-soft">No, volver</Button>
            <Button variant="glass-rose" leftIcon={<Trash2 size={18} />}>
              Sí, eliminar
            </Button>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Media Controls"
          description="Controles de reproducción con Stone Marble"
        >
          <ButtonGroup variant="neu" gap={4}>
            <IconButton icon={<SkipForward size={18} style={{ transform: 'rotate(180deg)' }} />} variant="marble-ridge" aria-label="Previous" />
            <IconButton icon={<Play size={20} />} variant="marble-accent" size="lg" aria-label="Play" />
            <IconButton icon={<SkipForward size={18} />} variant="marble-ridge" aria-label="Next" />
            <IconButton icon={<Volume2 size={18} />} variant="marble-soft" aria-label="Volume" />
          </ButtonGroup>
        </ShowcaseSection>

        <ShowcaseSection
          title="Action Bar"
          description="Barra de acciones con múltiples botones"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <Button variant="marble-accent" leftIcon={<Plus size={18} />}>Nuevo</Button>
            <Button variant="marble-raised" leftIcon={<Filter size={18} />}>Filtros</Button>
            <Button variant="marble-raised" leftIcon={<Download size={18} />}>Exportar</Button>
            <Button variant="marble-raised" leftIcon={<RefreshCw size={18} />}>Actualizar</Button>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Premium Actions"
          description="Acciones premium con variantes especiales"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <Button variant="marble-frame" leftIcon={<Crown size={18} />}>PREMIUM</Button>
            <Button variant="marble-stadium" leftIcon={<Target size={18} />}>Objetivo</Button>
            <Button variant="marble-pillow" leftIcon={<TrendingUp size={18} />}>Analizar</Button>
            <Button variant="glass-violet" leftIcon={<Lock size={18} />}>Desbloquear</Button>
          </div>
        </ShowcaseSection>

        {/* ═══════════════════════════════════════════════════════════════════
            PILL FRAME DASHBOARD BUTTONS
            ═══════════════════════════════════════════════════════════════════ */}
        <h2 style={categoryStyles}>PILL FRAME DASHBOARD BUTTONS</h2>

        <ShowcaseSection
          title="Pill Frame RAISED"
          description="Botón elevado con marco pill y efecto carved en texto. Usar directamente sobre fondo marble-base."
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'flex-start', justifyContent: 'center' }}>
            <div style={cardStyles}>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  background: 'var(--marble-base)',
                  borderRadius: '24px',
                  border: 'none',
                  boxShadow: `
                    inset 0 0 0 1px var(--shadow-light),
                    inset 0 0 0 2px rgba(168, 172, 179, 0.3),
                    4px 4px 8px var(--shadow-dark),
                    -4px -4px 8px var(--shadow-light)
                  `,
                  cursor: 'pointer',
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  color: 'var(--marble-dark)',
                  textShadow: '1px 1px 0px rgba(255, 255, 255, 0.85), -1px -1px 0px rgba(130, 140, 155, 0.65)',
                  transition: 'all 150ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = 'inset 0 0 0 1px var(--shadow-light), inset 0 0 0 2px rgba(168, 172, 179, 0.3), 6px 6px 12px var(--shadow-dark), -6px -6px 12px var(--shadow-light)';
                  e.currentTarget.style.color = 'var(--sentinel-accent-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'inset 0 0 0 1px var(--shadow-light), inset 0 0 0 2px rgba(168, 172, 179, 0.3), 4px 4px 8px var(--shadow-dark), -4px -4px 8px var(--shadow-light)';
                  e.currentTarget.style.color = 'var(--marble-dark)';
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.boxShadow = 'inset 2px 2px 4px var(--shadow-dark), inset -2px -2px 4px var(--shadow-light)';
                  e.currentTarget.style.textShadow = '-1px -1px 0px rgba(255, 255, 255, 0.95), 1px 1px 0px rgba(147, 157, 170, 0.55)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.boxShadow = 'inset 0 0 0 1px var(--shadow-light), inset 0 0 0 2px rgba(168, 172, 179, 0.3), 4px 4px 8px var(--shadow-dark), -4px -4px 8px var(--shadow-light)';
                  e.currentTarget.style.textShadow = '1px 1px 0px rgba(255, 255, 255, 0.85), -1px -1px 0px rgba(130, 140, 155, 0.65)';
                }}
              >
                Portfolio
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: 'var(--marble-base)',
                    boxShadow: 'inset 1px 1px 2px var(--shadow-dark), inset -1px -1px 2px var(--shadow-light)',
                  }}
                >
                  <ChevronRight
                    size={12}
                    style={{
                      color: 'inherit',
                      filter: 'drop-shadow(-0.5px -0.5px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0.5px 0.5px 0px rgba(130, 140, 155, 0.4))',
                    }}
                  />
                </span>
              </button>
              <span style={labelStyles}>Pill Frame RAISED</span>
            </div>

            <div style={cardStyles}>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'var(--marble-base)',
                  borderRadius: '20px',
                  border: 'none',
                  boxShadow: `
                    inset 0 0 0 1px var(--shadow-light),
                    inset 0 0 0 2px rgba(168, 172, 179, 0.3),
                    3px 3px 6px var(--shadow-dark),
                    -3px -3px 6px var(--shadow-light)
                  `,
                  cursor: 'pointer',
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  color: 'var(--marble-dark)',
                  textShadow: '1px 1px 0px rgba(255, 255, 255, 0.85), -1px -1px 0px rgba(130, 140, 155, 0.65)',
                  transition: 'all 150ms ease',
                }}
              >
                View All
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: 'var(--marble-base)',
                    boxShadow: 'inset 1px 1px 2px var(--shadow-dark), inset -1px -1px 2px var(--shadow-light)',
                  }}
                >
                  <ChevronRight
                    size={10}
                    style={{
                      color: 'inherit',
                      filter: 'drop-shadow(-0.5px -0.5px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0.5px 0.5px 0px rgba(130, 140, 155, 0.4))',
                    }}
                  />
                </span>
              </button>
              <span style={labelStyles}>Pill Frame SM</span>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Pill Frame INSET → RAISED"
          description="Para botones dentro de cards RAISED: contenedor INSET envuelve botón RAISED. Respeta jerarquía Stone Marble."
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'flex-start', justifyContent: 'center' }}>
            {/* Simulación de Card RAISED */}
            <div
              style={{
                background: 'var(--marble-base)',
                borderRadius: '20px',
                boxShadow: 'var(--raised-3)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <span style={{ ...labelStyles, marginTop: 0, color: 'var(--text-secondary)' }}>Card RAISED</span>

              {/* Contenedor INSET */}
              <div
                style={{
                  padding: '4px',
                  borderRadius: '24px',
                  background: 'var(--marble-base)',
                  boxShadow: 'var(--inset-1)',
                }}
              >
                {/* Pill Frame RAISED interior */}
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    background: 'var(--marble-base)',
                    borderRadius: '20px',
                    border: 'none',
                    boxShadow: `
                      inset 0 0 0 1px var(--shadow-light),
                      inset 0 0 0 2px rgba(168, 172, 179, 0.25),
                      1px 1px 2px var(--shadow-dark),
                      -1px -1px 2px var(--shadow-light)
                    `,
                    cursor: 'pointer',
                    fontFamily: 'var(--sentinel-font-primary)',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    color: 'var(--marble-dark)',
                    textShadow: '1px 1px 0px rgba(255, 255, 255, 0.85), -1px -1px 0px rgba(130, 140, 155, 0.65)',
                    transition: 'all 150ms ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--sentinel-accent-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--marble-dark)';
                  }}
                >
                  View All
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: 'var(--marble-base)',
                      boxShadow: 'inset 1px 1px 2px var(--shadow-dark), inset -1px -1px 2px var(--shadow-light)',
                    }}
                  >
                    <ChevronRight
                      size={11}
                      style={{
                        color: 'inherit',
                        filter: 'drop-shadow(-0.5px -0.5px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0.5px 0.5px 0px rgba(130, 140, 155, 0.4))',
                      }}
                    />
                  </span>
                </button>
              </div>
              <span style={labelStyles}>INSET wrapper → RAISED button</span>
            </div>
          </div>

          {/* Código de referencia */}
          <div style={{ ...insetContainerStyles, marginTop: '24px' }}>
            <p style={{ ...labelStyles, marginBottom: '12px', marginTop: 0, textAlign: 'left', color: 'var(--sentinel-accent-primary)' }}>
              ESTRUCTURA DE JERARQUÍA:
            </p>
            <pre style={{
              fontFamily: 'var(--sentinel-font-mono)',
              fontSize: '11px',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              margin: 0,
            }}>
{`Card RAISED
  └── Contenedor INSET (padding: 4px, boxShadow: var(--inset-1))
        └── Pill Frame RAISED (boxShadow: inset borders + raised-1)
              └── Circle INSET (icon container)
                    └── Icon RAISED (drop-shadow filter)`}
            </pre>
          </div>
        </ShowcaseSection>

        {/* ═══════════════════════════════════════════════════════════════════
            PILL FRAME SIZE VARIATIONS
            ═══════════════════════════════════════════════════════════════════ */}
        <ShowcaseSection
          title="Pill Frame - Tamaños"
          description="Variaciones de tamaño manteniendo las proporciones del Pill Frame."
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-end', justifyContent: 'center' }}>
            {[
              { label: 'XS', padding: '6px 12px', fontSize: '10px', iconSize: 14, circleSize: 16 },
              { label: 'SM', padding: '8px 16px', fontSize: '11px', iconSize: 16, circleSize: 18 },
              { label: 'MD', padding: '10px 20px', fontSize: '12px', iconSize: 18, circleSize: 20 },
              { label: 'LG', padding: '12px 24px', fontSize: '13px', iconSize: 20, circleSize: 22 },
              { label: 'XL', padding: '14px 28px', fontSize: '14px', iconSize: 22, circleSize: 26 },
            ].map((size) => (
              <div key={size.label} style={cardStyles}>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: size.padding,
                    background: 'var(--marble-base)',
                    borderRadius: '24px',
                    border: 'none',
                    boxShadow: `
                      inset 0 0 0 1px var(--shadow-light),
                      inset 0 0 0 2px rgba(168, 172, 179, 0.25),
                      2px 2px 4px var(--shadow-dark),
                      -2px -2px 4px var(--shadow-light)
                    `,
                    cursor: 'pointer',
                    fontFamily: 'var(--sentinel-font-primary)',
                    fontSize: size.fontSize,
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    color: 'var(--marble-dark)',
                    textShadow: '1px 1px 0px rgba(255, 255, 255, 0.85), -1px -1px 0px rgba(130, 140, 155, 0.65)',
                    transition: 'all 150ms ease',
                  }}
                >
                  Action
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: `${size.circleSize}px`,
                      height: `${size.circleSize}px`,
                      borderRadius: '50%',
                      background: 'var(--marble-base)',
                      boxShadow: 'inset 1px 1px 2px var(--shadow-dark), inset -1px -1px 2px var(--shadow-light)',
                    }}
                  >
                    <ChevronRight
                      size={size.iconSize * 0.6}
                      style={{
                        color: 'inherit',
                        filter: 'drop-shadow(-0.5px -0.5px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0.5px 0.5px 0px rgba(130, 140, 155, 0.4))',
                      }}
                    />
                  </span>
                </button>
                <span style={labelStyles}>{size.label}</span>
              </div>
            ))}
          </div>
        </ShowcaseSection>

        {/* ═══════════════════════════════════════════════════════════════════
            PILL FRAME SHAPE VARIATIONS
            ═══════════════════════════════════════════════════════════════════ */}
        <ShowcaseSection
          title="Pill Frame - Formas"
          description="Variaciones de border-radius para diferentes contextos."
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start', justifyContent: 'center' }}>
            {/* Sharp */}
            <div style={cardStyles}>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'var(--marble-base)',
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: `
                    inset 0 0 0 1px var(--shadow-light),
                    inset 0 0 0 2px rgba(168, 172, 179, 0.25),
                    2px 2px 4px var(--shadow-dark),
                    -2px -2px 4px var(--shadow-light)
                  `,
                  cursor: 'pointer',
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  color: 'var(--marble-dark)',
                  textShadow: '1px 1px 0px rgba(255, 255, 255, 0.85), -1px -1px 0px rgba(130, 140, 155, 0.65)',
                }}
              >
                Sharp
                <ChevronRight size={14} style={{ color: 'inherit' }} />
              </button>
              <span style={labelStyles}>8px radius</span>
            </div>

            {/* Rounded */}
            <div style={cardStyles}>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'var(--marble-base)',
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: `
                    inset 0 0 0 1px var(--shadow-light),
                    inset 0 0 0 2px rgba(168, 172, 179, 0.25),
                    2px 2px 4px var(--shadow-dark),
                    -2px -2px 4px var(--shadow-light)
                  `,
                  cursor: 'pointer',
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  color: 'var(--marble-dark)',
                  textShadow: '1px 1px 0px rgba(255, 255, 255, 0.85), -1px -1px 0px rgba(130, 140, 155, 0.65)',
                }}
              >
                Rounded
                <ChevronRight size={14} style={{ color: 'inherit' }} />
              </button>
              <span style={labelStyles}>12px radius</span>
            </div>

            {/* Pill */}
            <div style={cardStyles}>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'var(--marble-base)',
                  borderRadius: '100px',
                  border: 'none',
                  boxShadow: `
                    inset 0 0 0 1px var(--shadow-light),
                    inset 0 0 0 2px rgba(168, 172, 179, 0.25),
                    2px 2px 4px var(--shadow-dark),
                    -2px -2px 4px var(--shadow-light)
                  `,
                  cursor: 'pointer',
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  color: 'var(--marble-dark)',
                  textShadow: '1px 1px 0px rgba(255, 255, 255, 0.85), -1px -1px 0px rgba(130, 140, 155, 0.65)',
                }}
              >
                Pill
                <ChevronRight size={14} style={{ color: 'inherit' }} />
              </button>
              <span style={labelStyles}>100px (full pill)</span>
            </div>

            {/* Circle Icon Button */}
            <div style={cardStyles}>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '44px',
                  height: '44px',
                  padding: 0,
                  background: 'var(--marble-base)',
                  borderRadius: '50%',
                  border: 'none',
                  boxShadow: `
                    inset 0 0 0 1px var(--shadow-light),
                    inset 0 0 0 2px rgba(168, 172, 179, 0.25),
                    2px 2px 4px var(--shadow-dark),
                    -2px -2px 4px var(--shadow-light)
                  `,
                  cursor: 'pointer',
                  color: 'var(--marble-dark)',
                }}
              >
                <Plus size={18} style={{ filter: 'drop-shadow(-0.5px -0.5px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0.5px 0.5px 0px rgba(130, 140, 155, 0.4))' }} />
              </button>
              <span style={labelStyles}>Circle</span>
            </div>

            {/* Square Icon Button */}
            <div style={cardStyles}>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '44px',
                  height: '44px',
                  padding: 0,
                  background: 'var(--marble-base)',
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: `
                    inset 0 0 0 1px var(--shadow-light),
                    inset 0 0 0 2px rgba(168, 172, 179, 0.25),
                    2px 2px 4px var(--shadow-dark),
                    -2px -2px 4px var(--shadow-light)
                  `,
                  cursor: 'pointer',
                  color: 'var(--marble-dark)',
                }}
              >
                <Settings size={18} style={{ filter: 'drop-shadow(-0.5px -0.5px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0.5px 0.5px 0px rgba(130, 140, 155, 0.4))' }} />
              </button>
              <span style={labelStyles}>Square</span>
            </div>
          </div>
        </ShowcaseSection>

        {/* ═══════════════════════════════════════════════════════════════════
            ICON POSITIONS
            ═══════════════════════════════════════════════════════════════════ */}
        <ShowcaseSection
          title="Pill Frame - Posición de Iconos"
          description="Variaciones de iconos: izquierda, derecha, con circle inset, solo icono."
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start', justifyContent: 'center' }}>
            {/* Left Icon */}
            <div style={cardStyles}>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'var(--marble-base)',
                  borderRadius: '24px',
                  border: 'none',
                  boxShadow: `
                    inset 0 0 0 1px var(--shadow-light),
                    inset 0 0 0 2px rgba(168, 172, 179, 0.25),
                    2px 2px 4px var(--shadow-dark),
                    -2px -2px 4px var(--shadow-light)
                  `,
                  cursor: 'pointer',
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  color: 'var(--marble-dark)',
                  textShadow: '1px 1px 0px rgba(255, 255, 255, 0.85), -1px -1px 0px rgba(130, 140, 155, 0.65)',
                }}
              >
                <Download size={14} style={{ filter: 'drop-shadow(-0.5px -0.5px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0.5px 0.5px 0px rgba(130, 140, 155, 0.4))' }} />
                Download
              </button>
              <span style={labelStyles}>Left Icon</span>
            </div>

            {/* Right Icon */}
            <div style={cardStyles}>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'var(--marble-base)',
                  borderRadius: '24px',
                  border: 'none',
                  boxShadow: `
                    inset 0 0 0 1px var(--shadow-light),
                    inset 0 0 0 2px rgba(168, 172, 179, 0.25),
                    2px 2px 4px var(--shadow-dark),
                    -2px -2px 4px var(--shadow-light)
                  `,
                  cursor: 'pointer',
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  color: 'var(--marble-dark)',
                  textShadow: '1px 1px 0px rgba(255, 255, 255, 0.85), -1px -1px 0px rgba(130, 140, 155, 0.65)',
                }}
              >
                Continue
                <ArrowRight size={14} style={{ filter: 'drop-shadow(-0.5px -0.5px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0.5px 0.5px 0px rgba(130, 140, 155, 0.4))' }} />
              </button>
              <span style={labelStyles}>Right Icon</span>
            </div>

            {/* Right Icon with Circle Inset */}
            <div style={cardStyles}>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'var(--marble-base)',
                  borderRadius: '24px',
                  border: 'none',
                  boxShadow: `
                    inset 0 0 0 1px var(--shadow-light),
                    inset 0 0 0 2px rgba(168, 172, 179, 0.25),
                    2px 2px 4px var(--shadow-dark),
                    -2px -2px 4px var(--shadow-light)
                  `,
                  cursor: 'pointer',
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  color: 'var(--marble-dark)',
                  textShadow: '1px 1px 0px rgba(255, 255, 255, 0.85), -1px -1px 0px rgba(130, 140, 155, 0.65)',
                }}
              >
                View All
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'var(--marble-base)',
                    boxShadow: 'inset 1px 1px 2px var(--shadow-dark), inset -1px -1px 2px var(--shadow-light)',
                  }}
                >
                  <ChevronRight size={11} style={{ color: 'inherit', filter: 'drop-shadow(-0.5px -0.5px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0.5px 0.5px 0px rgba(130, 140, 155, 0.4))' }} />
                </span>
              </button>
              <span style={labelStyles}>Circle Inset Icon</span>
            </div>

            {/* Left Icon with Circle Inset */}
            <div style={cardStyles}>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'var(--marble-base)',
                  borderRadius: '24px',
                  border: 'none',
                  boxShadow: `
                    inset 0 0 0 1px var(--shadow-light),
                    inset 0 0 0 2px rgba(168, 172, 179, 0.25),
                    2px 2px 4px var(--shadow-dark),
                    -2px -2px 4px var(--shadow-light)
                  `,
                  cursor: 'pointer',
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  color: 'var(--marble-dark)',
                  textShadow: '1px 1px 0px rgba(255, 255, 255, 0.85), -1px -1px 0px rgba(130, 140, 155, 0.65)',
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'var(--marble-base)',
                    boxShadow: 'inset 1px 1px 2px var(--shadow-dark), inset -1px -1px 2px var(--shadow-light)',
                  }}
                >
                  <Plus size={11} style={{ color: 'inherit', filter: 'drop-shadow(-0.5px -0.5px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0.5px 0.5px 0px rgba(130, 140, 155, 0.4))' }} />
                </span>
                Add New
              </button>
              <span style={labelStyles}>Left Circle Inset</span>
            </div>

            {/* Both Icons */}
            <div style={cardStyles}>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'var(--marble-base)',
                  borderRadius: '24px',
                  border: 'none',
                  boxShadow: `
                    inset 0 0 0 1px var(--shadow-light),
                    inset 0 0 0 2px rgba(168, 172, 179, 0.25),
                    2px 2px 4px var(--shadow-dark),
                    -2px -2px 4px var(--shadow-light)
                  `,
                  cursor: 'pointer',
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  color: 'var(--marble-dark)',
                  textShadow: '1px 1px 0px rgba(255, 255, 255, 0.85), -1px -1px 0px rgba(130, 140, 155, 0.65)',
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'var(--marble-base)',
                    boxShadow: 'inset 1px 1px 2px var(--shadow-dark), inset -1px -1px 2px var(--shadow-light)',
                  }}
                >
                  <Eye size={11} style={{ color: 'inherit', filter: 'drop-shadow(-0.5px -0.5px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0.5px 0.5px 0px rgba(130, 140, 155, 0.4))' }} />
                </span>
                Preview
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'var(--marble-base)',
                    boxShadow: 'inset 1px 1px 2px var(--shadow-dark), inset -1px -1px 2px var(--shadow-light)',
                  }}
                >
                  <ExternalLink size={10} style={{ color: 'inherit', filter: 'drop-shadow(-0.5px -0.5px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0.5px 0.5px 0px rgba(130, 140, 155, 0.4))' }} />
                </span>
              </button>
              <span style={labelStyles}>Both Icons</span>
            </div>
          </div>
        </ShowcaseSection>

        {/* ═══════════════════════════════════════════════════════════════════
            ACCENT VARIATIONS
            ═══════════════════════════════════════════════════════════════════ */}
        <ShowcaseSection
          title="Pill Frame - Acentos de Color"
          description="Variaciones con color de marca y estados semánticos aplicados al icono."
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start', justifyContent: 'center' }}>
            {/* Neutral */}
            <div style={cardStyles}>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'var(--marble-base)',
                  borderRadius: '24px',
                  border: 'none',
                  boxShadow: `
                    inset 0 0 0 1px var(--shadow-light),
                    inset 0 0 0 2px rgba(168, 172, 179, 0.25),
                    2px 2px 4px var(--shadow-dark),
                    -2px -2px 4px var(--shadow-light)
                  `,
                  cursor: 'pointer',
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  color: 'var(--marble-dark)',
                  textShadow: '1px 1px 0px rgba(255, 255, 255, 0.85), -1px -1px 0px rgba(130, 140, 155, 0.65)',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--marble-base)', boxShadow: 'inset 1px 1px 2px var(--shadow-dark), inset -1px -1px 2px var(--shadow-light)' }}>
                  <Settings size={11} style={{ color: 'var(--marble-dark)', filter: 'drop-shadow(-0.5px -0.5px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0.5px 0.5px 0px rgba(130, 140, 155, 0.4))' }} />
                </span>
                Settings
              </button>
              <span style={labelStyles}>Neutral</span>
            </div>

            {/* Teal Accent */}
            <div style={cardStyles}>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'var(--marble-base)',
                  borderRadius: '24px',
                  border: 'none',
                  boxShadow: `
                    inset 0 0 0 1px var(--shadow-light),
                    inset 0 0 0 2px rgba(168, 172, 179, 0.25),
                    2px 2px 4px var(--shadow-dark),
                    -2px -2px 4px var(--shadow-light)
                  `,
                  cursor: 'pointer',
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  color: 'var(--marble-dark)',
                  textShadow: '1px 1px 0px rgba(255, 255, 255, 0.85), -1px -1px 0px rgba(130, 140, 155, 0.65)',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--marble-base)', boxShadow: 'inset 1px 1px 2px var(--shadow-dark), inset -1px -1px 2px var(--shadow-light)' }}>
                  <TrendingUp size={11} style={{ color: 'var(--sentinel-accent-primary)', filter: 'drop-shadow(-0.5px -0.5px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0.5px 0.5px 0px rgba(130, 140, 155, 0.4))' }} />
                </span>
                Portfolio
              </button>
              <span style={labelStyles}>Teal Accent</span>
            </div>

            {/* Success */}
            <div style={cardStyles}>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'var(--marble-base)',
                  borderRadius: '24px',
                  border: 'none',
                  boxShadow: `
                    inset 0 0 0 1px var(--shadow-light),
                    inset 0 0 0 2px rgba(168, 172, 179, 0.25),
                    2px 2px 4px var(--shadow-dark),
                    -2px -2px 4px var(--shadow-light)
                  `,
                  cursor: 'pointer',
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  color: 'var(--marble-dark)',
                  textShadow: '1px 1px 0px rgba(255, 255, 255, 0.85), -1px -1px 0px rgba(130, 140, 155, 0.65)',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--marble-base)', boxShadow: 'inset 1px 1px 2px var(--shadow-dark), inset -1px -1px 2px var(--shadow-light)' }}>
                  <Check size={11} style={{ color: 'var(--sentinel-status-positive)', filter: 'drop-shadow(-0.5px -0.5px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0.5px 0.5px 0px rgba(130, 140, 155, 0.4))' }} />
                </span>
                Confirm
              </button>
              <span style={labelStyles}>Success</span>
            </div>

            {/* Warning */}
            <div style={cardStyles}>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'var(--marble-base)',
                  borderRadius: '24px',
                  border: 'none',
                  boxShadow: `
                    inset 0 0 0 1px var(--shadow-light),
                    inset 0 0 0 2px rgba(168, 172, 179, 0.25),
                    2px 2px 4px var(--shadow-dark),
                    -2px -2px 4px var(--shadow-light)
                  `,
                  cursor: 'pointer',
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  color: 'var(--marble-dark)',
                  textShadow: '1px 1px 0px rgba(255, 255, 255, 0.85), -1px -1px 0px rgba(130, 140, 155, 0.65)',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--marble-base)', boxShadow: 'inset 1px 1px 2px var(--shadow-dark), inset -1px -1px 2px var(--shadow-light)' }}>
                  <AlertTriangle size={11} style={{ color: 'var(--sentinel-status-warning)', filter: 'drop-shadow(-0.5px -0.5px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0.5px 0.5px 0px rgba(130, 140, 155, 0.4))' }} />
                </span>
                Review
              </button>
              <span style={labelStyles}>Warning</span>
            </div>

            {/* Danger */}
            <div style={cardStyles}>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'var(--marble-base)',
                  borderRadius: '24px',
                  border: 'none',
                  boxShadow: `
                    inset 0 0 0 1px var(--shadow-light),
                    inset 0 0 0 2px rgba(168, 172, 179, 0.25),
                    2px 2px 4px var(--shadow-dark),
                    -2px -2px 4px var(--shadow-light)
                  `,
                  cursor: 'pointer',
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  color: 'var(--marble-dark)',
                  textShadow: '1px 1px 0px rgba(255, 255, 255, 0.85), -1px -1px 0px rgba(130, 140, 155, 0.65)',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--marble-base)', boxShadow: 'inset 1px 1px 2px var(--shadow-dark), inset -1px -1px 2px var(--shadow-light)' }}>
                  <Trash2 size={11} style={{ color: 'var(--sentinel-status-negative)', filter: 'drop-shadow(-0.5px -0.5px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0.5px 0.5px 0px rgba(130, 140, 155, 0.4))' }} />
                </span>
                Delete
              </button>
              <span style={labelStyles}>Danger</span>
            </div>
          </div>
        </ShowcaseSection>

        {/* ═══════════════════════════════════════════════════════════════════
            BUTTON GROUPS
            ═══════════════════════════════════════════════════════════════════ */}
        <ShowcaseSection
          title="Pill Frame - Grupos de Botones"
          description="Combinaciones de botones para acciones relacionadas."
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center' }}>
            {/* Segmented Control */}
            <div style={cardStyles}>
              <div
                style={{
                  padding: '4px',
                  borderRadius: '28px',
                  background: 'var(--marble-base)',
                  boxShadow: 'var(--inset-2)',
                  display: 'flex',
                  gap: '4px',
                }}
              >
                {['Day', 'Week', 'Month', 'Year'].map((label, i) => (
                  <button
                    key={label}
                    style={{
                      padding: '8px 16px',
                      background: i === 1 ? 'var(--marble-base)' : 'transparent',
                      borderRadius: '24px',
                      border: 'none',
                      boxShadow: i === 1 ? '1px 1px 2px var(--shadow-dark), -1px -1px 2px var(--shadow-light)' : 'none',
                      cursor: 'pointer',
                      fontFamily: 'var(--sentinel-font-primary)',
                      fontSize: '11px',
                      fontWeight: i === 1 ? 600 : 500,
                      letterSpacing: '0.05em',
                      color: i === 1 ? 'var(--sentinel-accent-primary)' : 'var(--marble-dark)',
                      textShadow: i === 1 ? '1px 1px 0px rgba(255, 255, 255, 0.85), -1px -1px 0px rgba(130, 140, 155, 0.65)' : 'none',
                      transition: 'all 150ms ease',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <span style={labelStyles}>Segmented Control</span>
            </div>

            {/* Split Button */}
            <div style={cardStyles}>
              <div style={{ display: 'flex', gap: '2px' }}>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    background: 'var(--marble-base)',
                    borderRadius: '24px 0 0 24px',
                    border: 'none',
                    boxShadow: `
                      inset 0 0 0 1px var(--shadow-light),
                      2px 2px 4px var(--shadow-dark),
                      -2px -2px 4px var(--shadow-light)
                    `,
                    cursor: 'pointer',
                    fontFamily: 'var(--sentinel-font-primary)',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    color: 'var(--marble-dark)',
                    textShadow: '1px 1px 0px rgba(255, 255, 255, 0.85), -1px -1px 0px rgba(130, 140, 155, 0.65)',
                  }}
                >
                  <Save size={14} style={{ filter: 'drop-shadow(-0.5px -0.5px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0.5px 0.5px 0px rgba(130, 140, 155, 0.4))' }} />
                  Save
                </button>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '10px 12px',
                    background: 'var(--marble-base)',
                    borderRadius: '0 24px 24px 0',
                    border: 'none',
                    boxShadow: `
                      inset 0 0 0 1px var(--shadow-light),
                      2px 2px 4px var(--shadow-dark),
                      -2px -2px 4px var(--shadow-light)
                    `,
                    cursor: 'pointer',
                    color: 'var(--marble-dark)',
                  }}
                >
                  <ChevronDown size={14} style={{ filter: 'drop-shadow(-0.5px -0.5px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0.5px 0.5px 0px rgba(130, 140, 155, 0.4))' }} />
                </button>
              </div>
              <span style={labelStyles}>Split Button</span>
            </div>

            {/* Action Bar */}
            <div style={cardStyles}>
              <div
                style={{
                  padding: '8px',
                  borderRadius: '16px',
                  background: 'var(--marble-base)',
                  boxShadow: 'var(--raised-2)',
                  display: 'flex',
                  gap: '8px',
                }}
              >
                {[
                  { icon: Copy, label: 'Copy' },
                  { icon: Edit3, label: 'Edit' },
                  { icon: Share2, label: 'Share' },
                  { icon: Trash2, label: 'Delete', color: 'var(--sentinel-status-negative)' },
                ].map(({ icon: Icon, label, color }) => (
                  <button
                    key={label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '36px',
                      height: '36px',
                      padding: 0,
                      background: 'var(--marble-base)',
                      borderRadius: '10px',
                      border: 'none',
                      boxShadow: 'inset 1px 1px 2px var(--shadow-dark), inset -1px -1px 2px var(--shadow-light)',
                      cursor: 'pointer',
                      color: color || 'var(--marble-dark)',
                    }}
                    title={label}
                  >
                    <Icon size={16} style={{ filter: 'drop-shadow(-0.5px -0.5px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0.5px 0.5px 0px rgba(130, 140, 155, 0.4))' }} />
                  </button>
                ))}
              </div>
              <span style={labelStyles}>Action Bar (RAISED → INSET icons)</span>
            </div>
          </div>
        </ShowcaseSection>

        {/* ═══════════════════════════════════════════════════════════════════
            HIERARCHY EXAMPLES
            ═══════════════════════════════════════════════════════════════════ */}
        <ShowcaseSection
          title="Pill Frame - Jerarquía en Contexto"
          description="Ejemplos de botones en diferentes niveles de la jerarquía Stone Marble."
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {/* Direct on Background */}
            <div
              style={{
                padding: '24px',
                borderRadius: '16px',
                background: 'var(--marble-base)',
                boxShadow: 'var(--inset-2)',
              }}
            >
              <p style={{ ...labelStyles, marginTop: 0, marginBottom: '16px', textAlign: 'left', color: 'var(--sentinel-accent-primary)' }}>
                Sobre fondo marble-base:
              </p>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'var(--marble-base)',
                  borderRadius: '24px',
                  border: 'none',
                  boxShadow: `
                    inset 0 0 0 1px var(--shadow-light),
                    inset 0 0 0 2px rgba(168, 172, 179, 0.25),
                    2px 2px 4px var(--shadow-dark),
                    -2px -2px 4px var(--shadow-light)
                  `,
                  cursor: 'pointer',
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  color: 'var(--marble-dark)',
                  textShadow: '1px 1px 0px rgba(255, 255, 255, 0.85), -1px -1px 0px rgba(130, 140, 155, 0.65)',
                }}
              >
                Pill Frame RAISED
                <ChevronRight size={14} />
              </button>
              <p style={{ ...labelStyles, marginTop: '12px', textAlign: 'left' }}>
                Usar directamente RAISED
              </p>
            </div>

            {/* Inside RAISED Card */}
            <div
              style={{
                padding: '24px',
                borderRadius: '16px',
                background: 'var(--marble-base)',
                boxShadow: 'var(--raised-3)',
              }}
            >
              <p style={{ ...labelStyles, marginTop: 0, marginBottom: '16px', textAlign: 'left', color: 'var(--sentinel-accent-primary)' }}>
                Dentro de Card RAISED:
              </p>
              <div
                style={{
                  padding: '4px',
                  borderRadius: '28px',
                  background: 'var(--marble-base)',
                  boxShadow: 'var(--inset-1)',
                  display: 'inline-block',
                }}
              >
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    background: 'var(--marble-base)',
                    borderRadius: '24px',
                    border: 'none',
                    boxShadow: `
                      inset 0 0 0 1px var(--shadow-light),
                      inset 0 0 0 2px rgba(168, 172, 179, 0.25),
                      1px 1px 2px var(--shadow-dark),
                      -1px -1px 2px var(--shadow-light)
                    `,
                    cursor: 'pointer',
                    fontFamily: 'var(--sentinel-font-primary)',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    color: 'var(--marble-dark)',
                    textShadow: '1px 1px 0px rgba(255, 255, 255, 0.85), -1px -1px 0px rgba(130, 140, 155, 0.65)',
                  }}
                >
                  View All
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', background: 'var(--marble-base)', boxShadow: 'inset 1px 1px 2px var(--shadow-dark), inset -1px -1px 2px var(--shadow-light)' }}>
                    <ChevronRight size={10} />
                  </span>
                </button>
              </div>
              <p style={{ ...labelStyles, marginTop: '12px', textAlign: 'left' }}>
                INSET wrapper → RAISED button
              </p>
            </div>

            {/* Inside INSET section */}
            <div
              style={{
                padding: '24px',
                borderRadius: '16px',
                background: 'var(--marble-base)',
                boxShadow: 'var(--inset-3)',
              }}
            >
              <p style={{ ...labelStyles, marginTop: 0, marginBottom: '16px', textAlign: 'left', color: 'var(--sentinel-accent-primary)' }}>
                Dentro de sección INSET:
              </p>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '24px',
                  border: '1px solid var(--glass-border)',
                  boxShadow: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  color: 'var(--marble-dark)',
                  textShadow: '1px 1px 0px rgba(255, 255, 255, 0.85), -1px -1px 0px rgba(130, 140, 155, 0.65)',
                }}
              >
                Glass Button
                <ChevronRight size={14} />
              </button>
              <p style={{ ...labelStyles, marginTop: '12px', textAlign: 'left' }}>
                Usar GLASS variant
              </p>
            </div>
          </div>
        </ShowcaseSection>

        {/* ═══════════════════════════════════════════════════════════════════
            QUICK REFERENCE
            ═══════════════════════════════════════════════════════════════════ */}
        <h2 style={categoryStyles}>REFERENCIA RÁPIDA</h2>

        <ShowcaseSection
          title="Guía de Uso por Contexto"
          description="Recomendaciones de variantes según el caso de uso"
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '16px',
            }}
          >
            {[
              { title: 'Primary Actions', variants: 'marble-accent, glass-teal' },
              { title: 'Secondary Actions', variants: 'marble-raised, marble-soft, marble-outline' },
              { title: 'Destructive', variants: 'glass-rose, glass-neu-rose' },
              { title: 'Success/Confirm', variants: 'glass-emerald, marble-carved' },
              { title: 'Warning', variants: 'glass-amber, glass-neu-amber' },
              { title: 'Info/Links', variants: 'glass-sky, marble-glow' },
              { title: 'Premium/Special', variants: 'marble-frame, marble-stadium, glass-violet' },
              { title: 'Toolbars', variants: 'marble-soft, marble-ridge' },
              { title: 'Toggle Active', variants: 'marble-inset, marble-embossed, marble-accent-inset' },
              { title: 'Decorative', variants: 'marble-pillow, marble-diamond, marble-seal' },
            ].map(({ title, variants }) => (
              <div
                key={title}
                style={{
                  padding: '16px',
                  background: 'var(--marble-base)',
                  borderRadius: '12px',
                  boxShadow: 'var(--inset-1)',
                }}
              >
                <strong style={{
                  color: 'var(--sentinel-accent-primary)',
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '13px',
                  textShadow: '-0.5px -0.5px 0px rgba(255,255,255,0.8), 0.5px 0.5px 0px rgba(147,157,170,0.4)',
                }}>
                  {title}:
                </strong>
                <p style={{
                  margin: '8px 0 0',
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--sentinel-font-mono)',
                  fontSize: '11px',
                }}>
                  {variants}
                </p>
              </div>
            ))}
          </div>
        </ShowcaseSection>
      </div>
    </LightEngineProvider>
  );
}
