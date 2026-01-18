// Path: src/pages/atoms/ButtonShowcase.tsx
// SENTINEL Design System - Complete Button System Showcase
import React, { useState } from 'react';
import {
  Button,
  IconButton,
  ToggleButton,
  ButtonGroup,
  TabGroup,
  Stepper,
} from '../../components/atoms/Button';
import { ShowcaseSection } from '../../components/showcase';
import {
  Save,
  Trash2,
  Plus,
  Download,
  Settings,
  Bell,
  Heart,
  Star,
  Share2,
  Copy,
  Filter,
  RefreshCw,
  Send,
  Check,
  ChevronRight,
  Play,
  SkipForward,
  Volume2,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  ArrowRight,
  Briefcase,
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

  const pageHeaderStyles: React.CSSProperties = {
    marginBottom: '32px',
    padding: '24px',
    background: 'var(--marble-base)',
    borderRadius: '15px',
    boxShadow: 'var(--raised-3)',
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

  const categoryTitleStyles: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 700,
    color: 'var(--sentinel-accent-primary)',
    marginBottom: '8px',
    marginTop: '48px',
    fontFamily: 'var(--sentinel-font-display)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderBottom: '2px solid var(--sentinel-accent-primary)',
    paddingBottom: '8px',
  };

  const variantLabelStyles: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 500,
    color: 'var(--sentinel-text-tertiary)',
    fontFamily: 'var(--sentinel-font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginTop: '8px',
    textAlign: 'center',
  };

  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: '24px',
    alignItems: 'start',
  };

  const variantCardStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  };

  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <div
        style={{ background: 'var(--marble-base)', minHeight: '100%', padding: '24px' }}
      >
        {/* Page Header */}
        <header style={pageHeaderStyles}>
          <h1 style={titleStyles}>&gt; Button System_</h1>
          <p style={descStyles}>
            // 36 variantes: 20 Stone Marble + 8 Glass + 8 Glass-Neu Hybrid
          </p>
        </header>

        {/* ═══════════════════════════════════════════════════════════════════════
            STONE MARBLE VARIANTS (20)
            ═══════════════════════════════════════════════════════════════════════ */}
        <h2 style={categoryTitleStyles}>Stone Marble Variants (20)</h2>

        <ShowcaseSection
          title="Marble-Raised & Marble-Soft"
          description="Clásicos elevados - Uso general y secundario"
        >
          <div style={gridStyles}>
            <div style={variantCardStyles}>
              <Button variant="marble-raised">Raised</Button>
              <span style={variantLabelStyles}>marble-raised</span>
            </div>
            <div style={variantCardStyles}>
              <Button variant="marble-soft">Soft</Button>
              <span style={variantLabelStyles}>marble-soft</span>
            </div>
            <div style={variantCardStyles}>
              <Button variant="marble-outline">Outline</Button>
              <span style={variantLabelStyles}>marble-outline</span>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Marble-Deep & Marble-Pillow"
          description="Sombras fuertes - CTAs importantes y premium"
        >
          <div style={gridStyles}>
            <div style={variantCardStyles}>
              <Button variant="marble-deep">Deep</Button>
              <span style={variantLabelStyles}>marble-deep</span>
            </div>
            <div style={variantCardStyles}>
              <Button variant="marble-pillow">Pillow</Button>
              <span style={variantLabelStyles}>marble-pillow</span>
            </div>
            <div style={variantCardStyles}>
              <Button variant="marble-layered">Layered</Button>
              <span style={variantLabelStyles}>marble-layered</span>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Marble-Ridge & Marble-Sharp"
          description="Efectos especiales - Media controls y retro"
        >
          <div style={gridStyles}>
            <div style={variantCardStyles}>
              <Button variant="marble-ridge">Ridge</Button>
              <span style={variantLabelStyles}>marble-ridge</span>
            </div>
            <div style={variantCardStyles}>
              <Button variant="marble-sharp">Sharp</Button>
              <span style={variantLabelStyles}>marble-sharp</span>
            </div>
            <div style={variantCardStyles}>
              <Button variant="marble-float">Float</Button>
              <span style={variantLabelStyles}>marble-float</span>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Marble-Carved & Marble-Embossed"
          description="Texto con relieve - Elegante y premium"
        >
          <div style={gridStyles}>
            <div style={variantCardStyles}>
              <Button variant="marble-carved">Carved</Button>
              <span style={variantLabelStyles}>marble-carved</span>
            </div>
            <div style={variantCardStyles}>
              <Button variant="marble-embossed">Embossed</Button>
              <span style={variantLabelStyles}>marble-embossed</span>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Marble-Inset"
          description="Estados hundidos - Toggles activos e inputs"
        >
          <div style={gridStyles}>
            <div style={variantCardStyles}>
              <Button variant="marble-inset">Inset</Button>
              <span style={variantLabelStyles}>marble-inset</span>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Marble-Accent & Marble-Glow"
          description="Con color - Primary action y highlights"
        >
          <div style={gridStyles}>
            <div style={variantCardStyles}>
              <Button variant="marble-accent">Accent</Button>
              <span style={variantLabelStyles}>marble-accent</span>
            </div>
            <div style={variantCardStyles}>
              <Button variant="marble-accent-inset">Accent Inset</Button>
              <span style={variantLabelStyles}>marble-accent-inset</span>
            </div>
            <div style={variantCardStyles}>
              <Button variant="marble-glow">Glow</Button>
              <span style={variantLabelStyles}>marble-glow</span>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Decorative Variants"
          description="Formas y efectos especiales"
        >
          <div style={gridStyles}>
            <div style={variantCardStyles}>
              <Button variant="marble-diamond">Diamond</Button>
              <span style={variantLabelStyles}>marble-diamond</span>
            </div>
            <div style={variantCardStyles}>
              <Button variant="marble-frame">Frame</Button>
              <span style={variantLabelStyles}>marble-frame</span>
            </div>
            <div style={variantCardStyles}>
              <Button variant="marble-seal">Seal</Button>
              <span style={variantLabelStyles}>marble-seal</span>
            </div>
            <div style={variantCardStyles}>
              <Button variant="marble-pill">Pill</Button>
              <span style={variantLabelStyles}>marble-pill</span>
            </div>
            <div style={variantCardStyles}>
              <Button variant="marble-stadium">Stadium</Button>
              <span style={variantLabelStyles}>marble-stadium</span>
            </div>
          </div>
        </ShowcaseSection>

        {/* ═══════════════════════════════════════════════════════════════════════
            GLASS VARIANTS (8)
            ═══════════════════════════════════════════════════════════════════════ */}
        <h2 style={categoryTitleStyles}>Glass Variants (8)</h2>

        <ShowcaseSection
          title="Glass Colors"
          description="Botones translúcidos con backdrop-blur y colores semánticos"
        >
          <div style={gridStyles}>
            <div style={variantCardStyles}>
              <Button variant="glass-teal">Glass Teal</Button>
              <span style={variantLabelStyles}>glass-teal (Primary)</span>
            </div>
            <div style={variantCardStyles}>
              <Button variant="glass-emerald">Glass Emerald</Button>
              <span style={variantLabelStyles}>glass-emerald (Success)</span>
            </div>
            <div style={variantCardStyles}>
              <Button variant="glass-amber">Glass Amber</Button>
              <span style={variantLabelStyles}>glass-amber (Warning)</span>
            </div>
            <div style={variantCardStyles}>
              <Button variant="glass-rose">Glass Rose</Button>
              <span style={variantLabelStyles}>glass-rose (Danger)</span>
            </div>
            <div style={variantCardStyles}>
              <Button variant="glass-sky">Glass Sky</Button>
              <span style={variantLabelStyles}>glass-sky (Info)</span>
            </div>
            <div style={variantCardStyles}>
              <Button variant="glass-violet">Glass Violet</Button>
              <span style={variantLabelStyles}>glass-violet (Premium)</span>
            </div>
            <div style={variantCardStyles}>
              <Button variant="glass-smoke">Glass Smoke</Button>
              <span style={variantLabelStyles}>glass-smoke (Neutral)</span>
            </div>
            <div style={variantCardStyles}>
              <Button variant="glass-frost">Glass Frost</Button>
              <span style={variantLabelStyles}>glass-frost (Ice)</span>
            </div>
          </div>
        </ShowcaseSection>

        {/* ═══════════════════════════════════════════════════════════════════════
            GLASS-NEU HYBRID VARIANTS (8)
            ═══════════════════════════════════════════════════════════════════════ */}
        <h2 style={categoryTitleStyles}>Glass-Neu Hybrid Variants (8)</h2>

        <ShowcaseSection
          title="Glass-Neu Colors"
          description="Combinación de glass translúcido + sombras neumórficas - Efecto premium"
        >
          <div style={gridStyles}>
            <div style={variantCardStyles}>
              <Button variant="glass-neu-teal">Glass-Neu Teal</Button>
              <span style={variantLabelStyles}>glass-neu-teal</span>
            </div>
            <div style={variantCardStyles}>
              <Button variant="glass-neu-emerald">Glass-Neu Emerald</Button>
              <span style={variantLabelStyles}>glass-neu-emerald</span>
            </div>
            <div style={variantCardStyles}>
              <Button variant="glass-neu-amber">Glass-Neu Amber</Button>
              <span style={variantLabelStyles}>glass-neu-amber</span>
            </div>
            <div style={variantCardStyles}>
              <Button variant="glass-neu-rose">Glass-Neu Rose</Button>
              <span style={variantLabelStyles}>glass-neu-rose</span>
            </div>
            <div style={variantCardStyles}>
              <Button variant="glass-neu-sky">Glass-Neu Sky</Button>
              <span style={variantLabelStyles}>glass-neu-sky</span>
            </div>
            <div style={variantCardStyles}>
              <Button variant="glass-neu-violet">Glass-Neu Violet</Button>
              <span style={variantLabelStyles}>glass-neu-violet</span>
            </div>
            <div style={variantCardStyles}>
              <Button variant="glass-neu-smoke">Glass-Neu Smoke</Button>
              <span style={variantLabelStyles}>glass-neu-smoke</span>
            </div>
            <div style={variantCardStyles}>
              <Button variant="glass-neu-frost">Glass-Neu Frost</Button>
              <span style={variantLabelStyles}>glass-neu-frost</span>
            </div>
          </div>
        </ShowcaseSection>

        {/* ═══════════════════════════════════════════════════════════════════════
            SIZES
            ═══════════════════════════════════════════════════════════════════════ */}
        <h2 style={categoryTitleStyles}>Sizes (5)</h2>

        <ShowcaseSection
          title="Todos los tamaños"
          description="xs (30px) | sm (36px) | md (44px) | lg (52px) | xl (60px)"
        >
          <div
            style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}
          >
            <div style={variantCardStyles}>
              <Button variant="marble-accent" size="xs">XS</Button>
              <span style={variantLabelStyles}>xs - 30px</span>
            </div>
            <div style={variantCardStyles}>
              <Button variant="marble-accent" size="sm">Small</Button>
              <span style={variantLabelStyles}>sm - 36px</span>
            </div>
            <div style={variantCardStyles}>
              <Button variant="marble-accent" size="md">Medium</Button>
              <span style={variantLabelStyles}>md - 44px</span>
            </div>
            <div style={variantCardStyles}>
              <Button variant="marble-accent" size="lg">Large</Button>
              <span style={variantLabelStyles}>lg - 52px</span>
            </div>
            <div style={variantCardStyles}>
              <Button variant="marble-accent" size="xl">Extra Large</Button>
              <span style={variantLabelStyles}>xl - 60px</span>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Tamaños con Glass"
          description="Glass-teal en todos los tamaños"
        >
          <div
            style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}
          >
            <Button variant="glass-teal" size="xs">XS</Button>
            <Button variant="glass-teal" size="sm">Small</Button>
            <Button variant="glass-teal" size="md">Medium</Button>
            <Button variant="glass-teal" size="lg">Large</Button>
            <Button variant="glass-teal" size="xl">Extra Large</Button>
          </div>
        </ShowcaseSection>

        {/* ═══════════════════════════════════════════════════════════════════════
            MODIFIERS
            ═══════════════════════════════════════════════════════════════════════ */}
        <h2 style={categoryTitleStyles}>Modifiers</h2>

        <ShowcaseSection
          title="Pill Shape"
          description="Border radius completo (9999px)"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <Button variant="marble-soft" pill>Marble Pill</Button>
            <Button variant="glass-teal" pill>Glass Pill</Button>
            <Button variant="marble-accent" pill>Accent Pill</Button>
            <Button variant="glass-violet" pill>Violet Pill</Button>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Full Width"
          description="Botón que ocupa el 100% del contenedor"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
            <Button variant="marble-accent" fullWidth>Full Width Accent</Button>
            <Button variant="glass-teal" fullWidth>Full Width Glass</Button>
            <Button variant="marble-raised" fullWidth>Full Width Raised</Button>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="With Icons"
          description="Botones con íconos a la izquierda o derecha"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <Button variant="glass-teal" leftIcon={<Save size={18} />}>Guardar</Button>
            <Button variant="glass-emerald" leftIcon={<Check size={18} />}>Confirmar</Button>
            <Button variant="glass-rose" leftIcon={<Trash2 size={18} />}>Eliminar</Button>
            <Button variant="marble-soft" leftIcon={<Download size={18} />}>Exportar</Button>
            <Button variant="marble-accent" rightIcon={<ChevronRight size={18} />}>Siguiente</Button>
            <Button variant="glass-sky" leftIcon={<Send size={18} />}>Enviar</Button>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Loading State"
          description="Estado de carga con spinner"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <Button variant="marble-accent" loading>Cargando...</Button>
            <Button variant="glass-teal" loading>Procesando</Button>
            <Button variant="marble-soft" loading>Guardando</Button>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Disabled State"
          description="Estado deshabilitado (opacity 0.35)"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <Button variant="marble-accent" disabled>Disabled Accent</Button>
            <Button variant="glass-teal" disabled>Disabled Glass</Button>
            <Button variant="marble-soft" disabled>Disabled Soft</Button>
            <Button variant="glass-rose" disabled>Disabled Rose</Button>
          </div>
        </ShowcaseSection>

        {/* ═══════════════════════════════════════════════════════════════════════
            SPECIAL COMPONENTS
            ═══════════════════════════════════════════════════════════════════════ */}
        <h2 style={categoryTitleStyles}>Special Components</h2>

        <ShowcaseSection
          title="IconButton"
          description="Botones circulares solo con ícono - Con badge y tooltip opcionales"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'start' }}>
            <div style={variantCardStyles}>
              <IconButton
                icon={<Settings size={20} />}
                variant="marble-raised"
                aria-label="Settings"
                tooltip="Configuración"
              />
              <span style={variantLabelStyles}>marble-raised</span>
            </div>
            <div style={variantCardStyles}>
              <IconButton
                icon={<Bell size={20} />}
                variant="glass-teal"
                aria-label="Notifications"
                badge={5}
                tooltip="Notificaciones"
              />
              <span style={variantLabelStyles}>with badge</span>
            </div>
            <div style={variantCardStyles}>
              <IconButton
                icon={<Heart size={20} />}
                variant="glass-rose"
                aria-label="Favorite"
              />
              <span style={variantLabelStyles}>glass-rose</span>
            </div>
            <div style={variantCardStyles}>
              <IconButton
                icon={<Star size={20} />}
                variant="glass-amber"
                aria-label="Star"
              />
              <span style={variantLabelStyles}>glass-amber</span>
            </div>
            <div style={variantCardStyles}>
              <IconButton
                icon={<Share2 size={20} />}
                variant="glass-sky"
                aria-label="Share"
              />
              <span style={variantLabelStyles}>glass-sky</span>
            </div>
            <div style={variantCardStyles}>
              <IconButton
                icon={<Copy size={20} />}
                variant="marble-soft"
                aria-label="Copy"
              />
              <span style={variantLabelStyles}>marble-soft</span>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="IconButton Sizes"
          description="Tamaños de IconButton: xs, sm, md, lg, xl"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
            <IconButton icon={<Plus size={14} />} variant="marble-accent" size="xs" aria-label="Add" />
            <IconButton icon={<Plus size={16} />} variant="marble-accent" size="sm" aria-label="Add" />
            <IconButton icon={<Plus size={20} />} variant="marble-accent" size="md" aria-label="Add" />
            <IconButton icon={<Plus size={24} />} variant="marble-accent" size="lg" aria-label="Add" />
            <IconButton icon={<Plus size={28} />} variant="marble-accent" size="xl" aria-label="Add" />
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="ToggleButton"
          description="Switch on/off con efecto neumórfico"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'center' }}>
            <div style={variantCardStyles}>
              <ToggleButton
                isOn={toggleStates.toggle1}
                onToggle={() =>
                  setToggleStates((s) => ({ ...s, toggle1: !s.toggle1 }))
                }
                size="sm"
                aria-label="Toggle small"
              />
              <span style={variantLabelStyles}>sm - {toggleStates.toggle1 ? 'ON' : 'OFF'}</span>
            </div>
            <div style={variantCardStyles}>
              <ToggleButton
                isOn={toggleStates.toggle2}
                onToggle={() =>
                  setToggleStates((s) => ({ ...s, toggle2: !s.toggle2 }))
                }
                size="md"
                aria-label="Toggle medium"
              />
              <span style={variantLabelStyles}>md - {toggleStates.toggle2 ? 'ON' : 'OFF'}</span>
            </div>
            <div style={variantCardStyles}>
              <ToggleButton
                isOn={toggleStates.toggle3}
                onToggle={() =>
                  setToggleStates((s) => ({ ...s, toggle3: !s.toggle3 }))
                }
                size="lg"
                aria-label="Toggle large"
              />
              <span style={variantLabelStyles}>lg - {toggleStates.toggle3 ? 'ON' : 'OFF'}</span>
            </div>
            <div style={variantCardStyles}>
              <ToggleButton isOn={false} onToggle={() => {}} size="md" disabled />
              <span style={variantLabelStyles}>disabled</span>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="ButtonGroup"
          description="Contenedor para agrupar botones relacionados"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <p style={{ ...variantLabelStyles, marginBottom: '12px', textAlign: 'left' }}>
                Variant: neu
              </p>
              <ButtonGroup variant="neu" gap={4}>
                <Button variant="marble-raised" size="sm">Cancelar</Button>
                <Button variant="marble-accent" size="sm">Guardar</Button>
              </ButtonGroup>
            </div>
            <div>
              <p style={{ ...variantLabelStyles, marginBottom: '12px', textAlign: 'left' }}>
                Variant: glass
              </p>
              <ButtonGroup variant="glass" gap={4}>
                <Button variant="glass-smoke" size="sm">Cancelar</Button>
                <Button variant="glass-teal" size="sm">Confirmar</Button>
              </ButtonGroup>
            </div>
            <div>
              <p style={{ ...variantLabelStyles, marginBottom: '12px', textAlign: 'left' }}>
                Toolbar con IconButtons
              </p>
              <ButtonGroup variant="neu" gap={2}>
                <IconButton icon={<Bold size={16} />} variant="marble-raised" size="sm" aria-label="Bold" />
                <IconButton icon={<Italic size={16} />} variant="marble-raised" size="sm" aria-label="Italic" />
                <IconButton icon={<Underline size={16} />} variant="marble-raised" size="sm" aria-label="Underline" />
                <IconButton icon={<AlignLeft size={16} />} variant="marble-raised" size="sm" aria-label="Align" />
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
              <p style={{ ...variantLabelStyles, marginBottom: '12px', textAlign: 'left' }}>
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
              <p style={{ ...variantLabelStyles, marginBottom: '12px', textAlign: 'left' }}>
                Size: sm
              </p>
              <TabGroup
                tabs={['Tab 1', 'Tab 2', 'Tab 3']}
                activeTab={0}
                onChange={() => {}}
                size="sm"
              />
            </div>
            <div>
              <p style={{ ...variantLabelStyles, marginBottom: '12px', textAlign: 'left' }}>
                Size: lg
              </p>
              <TabGroup
                tabs={['Dashboard', 'Portfolio', 'News']}
                activeTab={1}
                onChange={() => {}}
                size="lg"
              />
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Stepper"
          description="Control de incremento/decremento"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'start' }}>
            <div style={variantCardStyles}>
              <Stepper
                value={stepperValue}
                onChange={setStepperValue}
                min={0}
                max={10}
                variant="neu"
                size="md"
              />
              <span style={variantLabelStyles}>neu - md</span>
            </div>
            <div style={variantCardStyles}>
              <Stepper
                value={3}
                onChange={() => {}}
                min={1}
                max={99}
                variant="glass"
                size="md"
              />
              <span style={variantLabelStyles}>glass - md</span>
            </div>
            <div style={variantCardStyles}>
              <Stepper
                value={1}
                onChange={() => {}}
                variant="neu"
                size="sm"
              />
              <span style={variantLabelStyles}>neu - sm</span>
            </div>
            <div style={variantCardStyles}>
              <Stepper
                value={10}
                onChange={() => {}}
                variant="neu"
                size="lg"
              />
              <span style={variantLabelStyles}>neu - lg</span>
            </div>
          </div>
        </ShowcaseSection>

        {/* ═══════════════════════════════════════════════════════════════════════
            USE CASES
            ═══════════════════════════════════════════════════════════════════════ */}
        <h2 style={categoryTitleStyles}>Use Cases</h2>

        <ShowcaseSection
          title="Form Actions"
          description="Combinaciones comunes para formularios"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Button variant="marble-raised">Cancelar</Button>
              <Button variant="marble-accent">Guardar cambios</Button>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Button variant="glass-smoke">Cancelar</Button>
              <Button variant="glass-teal" leftIcon={<Check size={18} />}>Confirmar</Button>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Destructive Actions"
          description="Confirmaciones de eliminación"
        >
          <div style={{ display: 'flex', gap: '16px' }}>
            <Button variant="marble-raised">No, volver</Button>
            <Button variant="glass-rose" leftIcon={<Trash2 size={18} />}>
              Sí, eliminar
            </Button>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Media Controls"
          description="Controles de reproducción"
        >
          <ButtonGroup variant="neu" gap={4}>
            <IconButton icon={<SkipForward size={18} style={{ transform: 'rotate(180deg)' }} />} variant="marble-ridge" aria-label="Previous" />
            <IconButton icon={<Play size={20} />} variant="marble-accent" size="lg" aria-label="Play" />
            <IconButton icon={<SkipForward size={18} />} variant="marble-ridge" aria-label="Next" />
            <IconButton icon={<Volume2 size={18} />} variant="marble-raised" aria-label="Volume" />
          </ButtonGroup>
        </ShowcaseSection>

        <ShowcaseSection
          title="Action Bar"
          description="Barra de acciones con múltiples botones"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <Button variant="glass-teal" leftIcon={<Plus size={18} />}>
              Nuevo
            </Button>
            <Button variant="marble-raised" leftIcon={<Filter size={18} />}>
              Filtros
            </Button>
            <Button variant="marble-raised" leftIcon={<Download size={18} />}>
              Exportar
            </Button>
            <Button variant="marble-raised" leftIcon={<RefreshCw size={18} />}>
              Actualizar
            </Button>
          </div>
        </ShowcaseSection>

        {/* ═══════════════════════════════════════════════════════════════════════
            PILL FRAME BUTTONS (CSS Pattern)
            ═══════════════════════════════════════════════════════════════════════ */}
        <h2 style={categoryTitleStyles}>Pill Frame Buttons (CSS Pattern)</h2>

        <ShowcaseSection
          title="Jerarquía de Botones Stone Marble"
          description="Dos variantes según el contexto: RAISED standalone o Pill Frame (INSET → RAISED)"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Variant 1: RAISED Standalone */}
            <div>
              <p style={{ ...variantLabelStyles, marginBottom: '16px', textAlign: 'left', fontSize: '12px' }}>
                VARIANTE 1: RAISED Button (standalone) - Para botones sobre contenedores RAISED
              </p>
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
                  cursor: 'pointer',
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  boxShadow: `
                    inset 0 0 0 1px rgba(255, 255, 255, 0.8),
                    inset 0 0 0 2px rgba(168, 172, 179, 0.3),
                    4px 4px 8px rgba(147, 157, 170, 0.55),
                    -4px -4px 8px rgba(255, 255, 255, 0.95)
                  `,
                  color: 'var(--sentinel-accent-primary)',
                  textShadow: '1px 1px 0px rgba(255, 255, 255, 0.85), -1px -1px 0px rgba(74, 154, 156, 0.3)',
                  transition: 'all 150ms ease',
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
                    boxShadow: 'inset 1px 1px 2px rgba(147, 157, 170, 0.55), inset -1px -1px 2px rgba(255, 255, 255, 0.95)',
                  }}
                >
                  <Briefcase
                    size={12}
                    style={{
                      color: 'var(--sentinel-accent-primary)',
                      filter: 'drop-shadow(-0.5px -0.5px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0.5px 0.5px 0px rgba(130, 140, 155, 0.4))',
                    }}
                  />
                </span>
              </button>
            </div>

            {/* Variant 2: Pill Frame */}
            <div>
              <p style={{ ...variantLabelStyles, marginBottom: '16px', textAlign: 'left', fontSize: '12px' }}>
                VARIANTE 2: Pill Frame (INSET → RAISED) - Para botones en cards, forms, headers
              </p>
              <div
                style={{
                  display: 'inline-block',
                  padding: '4px',
                  borderRadius: '28px',
                  background: 'var(--marble-base)',
                  boxShadow: 'var(--inset-1)',
                }}
              >
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '12px 24px',
                    background: 'var(--marble-base)',
                    borderRadius: '24px',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--sentinel-font-primary)',
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    boxShadow: `
                      inset 0 0 0 1px rgba(255, 255, 255, 0.8),
                      inset 0 0 0 2px rgba(168, 172, 179, 0.25),
                      2px 2px 4px rgba(147, 157, 170, 0.55),
                      -2px -2px 4px rgba(255, 255, 255, 0.95)
                    `,
                    color: 'var(--sentinel-accent-primary)',
                    textShadow: '1px 1px 0px rgba(255, 255, 255, 0.85), -1px -1px 0px rgba(74, 154, 156, 0.3)',
                    transition: 'all 200ms ease',
                  }}
                >
                  Access System
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: 'var(--marble-base)',
                      boxShadow: 'inset 1px 1px 2px rgba(147, 157, 170, 0.55), inset -1px -1px 2px rgba(255, 255, 255, 0.95)',
                    }}
                  >
                    <ChevronRight
                      size={14}
                      style={{
                        color: 'var(--sentinel-accent-primary)',
                        filter: 'drop-shadow(-0.5px -0.5px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0.5px 0.5px 0px rgba(130, 140, 155, 0.4))',
                      }}
                    />
                  </span>
                </button>
              </div>
            </div>

            {/* Small Pill Frame */}
            <div>
              <p style={{ ...variantLabelStyles, marginBottom: '16px', textAlign: 'left', fontSize: '12px' }}>
                VARIANTE 2 (Small): Pill Frame pequeño - Para card headers
              </p>
              <div
                style={{
                  display: 'inline-block',
                  padding: '3px',
                  borderRadius: '24px',
                  background: 'var(--marble-base)',
                  boxShadow: 'var(--inset-1)',
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
                    borderRadius: '20px',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--sentinel-font-primary)',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    boxShadow: `
                      inset 0 0 0 1px rgba(255, 255, 255, 0.8),
                      inset 0 0 0 2px rgba(168, 172, 179, 0.25),
                      1px 1px 2px rgba(147, 157, 170, 0.55),
                      -1px -1px 2px rgba(255, 255, 255, 0.95)
                    `,
                    color: 'var(--sentinel-accent-primary)',
                    textShadow: '0.75px 0.75px 0px rgba(255, 255, 255, 0.85), -0.75px -0.75px 0px rgba(74, 154, 156, 0.25)',
                    transition: 'all 200ms ease',
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
                      boxShadow: 'inset 1px 1px 2px rgba(147, 157, 170, 0.55), inset -1px -1px 2px rgba(255, 255, 255, 0.95)',
                    }}
                  >
                    <ArrowRight
                      size={11}
                      style={{
                        color: 'var(--sentinel-accent-primary)',
                        filter: 'drop-shadow(-0.5px -0.5px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0.5px 0.5px 0px rgba(130, 140, 155, 0.4))',
                      }}
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Anatomía del Pill Frame Button"
          description="Estructura y propiedades de cada elemento"
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '16px',
              fontSize: '13px',
              fontFamily: 'var(--sentinel-font-mono)',
            }}
          >
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.3)', borderRadius: '12px' }}>
              <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Wrapper INSET:</strong>
              <p style={{ margin: '8px 0 0', color: 'var(--sentinel-text-secondary)', fontSize: '11px' }}>
                padding: 4px (lg) / 3px (sm)<br />
                border-radius: 28px / 24px<br />
                box-shadow: var(--inset-1)
              </p>
            </div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.3)', borderRadius: '12px' }}>
              <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Button RAISED:</strong>
              <p style={{ margin: '8px 0 0', color: 'var(--sentinel-text-secondary)', fontSize: '11px' }}>
                border-radius: 24px / 20px<br />
                shadow: inner borders + outer raised<br />
                color: --sentinel-accent-primary
              </p>
            </div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.3)', borderRadius: '12px' }}>
              <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Icon Circle INSET:</strong>
              <p style={{ margin: '8px 0 0', color: 'var(--sentinel-text-secondary)', fontSize: '11px' }}>
                width/height: 22px / 20px<br />
                border-radius: 50%<br />
                box-shadow: inset shadows
              </p>
            </div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.3)', borderRadius: '12px' }}>
              <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Icon RAISED:</strong>
              <p style={{ margin: '8px 0 0', color: 'var(--sentinel-text-secondary)', fontSize: '11px' }}>
                color: --sentinel-accent-primary<br />
                filter: drop-shadow (carved effect)<br />
                hover: --sentinel-accent-secondary
              </p>
            </div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.3)', borderRadius: '12px' }}>
              <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Hover States:</strong>
              <p style={{ margin: '8px 0 0', color: 'var(--sentinel-text-secondary)', fontSize: '11px' }}>
                Button: teal gradient bg + glow<br />
                Icon circle: teal gradient fill<br />
                Icon: lighter teal color
              </p>
            </div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.3)', borderRadius: '12px' }}>
              <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Active State:</strong>
              <p style={{ margin: '8px 0 0', color: 'var(--sentinel-text-secondary)', fontSize: '11px' }}>
                Button shadow: fully inset<br />
                Creates "pressed" appearance
              </p>
            </div>
          </div>
        </ShowcaseSection>

        {/* ═══════════════════════════════════════════════════════════════════════
            QUICK REFERENCE
            ═══════════════════════════════════════════════════════════════════════ */}
        <h2 style={categoryTitleStyles}>Quick Reference</h2>

        <ShowcaseSection
          title="Guía de Uso por Contexto"
          description="Recomendaciones de variantes según el caso de uso"
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '16px',
              fontSize: '13px',
              fontFamily: 'var(--sentinel-font-mono)',
            }}
          >
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.3)', borderRadius: '12px' }}>
              <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Primary Actions:</strong>
              <p style={{ margin: '8px 0 0', color: 'var(--sentinel-text-secondary)' }}>
                glass-teal, marble-accent, glass-neu-teal
              </p>
            </div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.3)', borderRadius: '12px' }}>
              <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Secondary Actions:</strong>
              <p style={{ margin: '8px 0 0', color: 'var(--sentinel-text-secondary)' }}>
                marble-soft, marble-raised, glass-smoke
              </p>
            </div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.3)', borderRadius: '12px' }}>
              <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Destructive:</strong>
              <p style={{ margin: '8px 0 0', color: 'var(--sentinel-text-secondary)' }}>
                glass-rose, glass-neu-rose
              </p>
            </div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.3)', borderRadius: '12px' }}>
              <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Success/Confirm:</strong>
              <p style={{ margin: '8px 0 0', color: 'var(--sentinel-text-secondary)' }}>
                glass-emerald, glass-neu-emerald
              </p>
            </div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.3)', borderRadius: '12px' }}>
              <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Warning:</strong>
              <p style={{ margin: '8px 0 0', color: 'var(--sentinel-text-secondary)' }}>
                glass-amber, glass-neu-amber
              </p>
            </div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.3)', borderRadius: '12px' }}>
              <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Info/Links:</strong>
              <p style={{ margin: '8px 0 0', color: 'var(--sentinel-text-secondary)' }}>
                glass-sky, glass-neu-sky
              </p>
            </div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.3)', borderRadius: '12px' }}>
              <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Premium/Special:</strong>
              <p style={{ margin: '8px 0 0', color: 'var(--sentinel-text-secondary)' }}>
                glass-violet, glass-neu-violet, marble-pillow
              </p>
            </div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.3)', borderRadius: '12px' }}>
              <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Toolbars:</strong>
              <p style={{ margin: '8px 0 0', color: 'var(--sentinel-text-secondary)' }}>
                marble-raised, marble-outline, marble-ridge
              </p>
            </div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.3)', borderRadius: '12px' }}>
              <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Toggle Active:</strong>
              <p style={{ margin: '8px 0 0', color: 'var(--sentinel-text-secondary)' }}>
                marble-inset, marble-embossed
              </p>
            </div>
          </div>
        </ShowcaseSection>
      </div>
    </LightEngineProvider>
  );
}
