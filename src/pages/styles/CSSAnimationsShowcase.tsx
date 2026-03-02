// Path: src/pages/styles/AnimationsShowcase.tsx
// QUAFI Design System - Animations Showcase with Intersection Observer
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ShowcaseSection } from '../../components/showcase';
import { showcase } from '../showcaseStyles';

// ═══════════════════════════════════════════════════════════════════════════════
// INTERSECTION OBSERVER HOOK
// Triggers animation when element enters viewport
// ═══════════════════════════════════════════════════════════════════════════════

function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, {
      threshold: 0.2,
      ...options,
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return { ref, isVisible };
}

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATED BOX COMPONENT
// Plays animation when scrolled into view, can replay
// ═══════════════════════════════════════════════════════════════════════════════

interface AnimatedBoxProps {
  animation: string;
  label: string;
  description: string;
  duration?: string;
  isInfinite?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

function AnimatedBox({ animation, label, description, duration, isInfinite, children, style }: AnimatedBoxProps) {
  const { ref, isVisible } = useInView();
  const [key, setKey] = useState(0);

  const replay = useCallback(() => {
    setKey(k => k + 1);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        padding: '20px',
        background: 'var(--marble-base)',
        borderRadius: '16px',
        boxShadow: 'var(--raised-2)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{
            fontSize: '13px',
            fontWeight: 600,
            fontFamily: 'var(--quafi-font-primary)',
            color: 'var(--quafi-black)',
            marginBottom: '2px',
          }}>
            {label}
          </div>
          <div style={{
            fontSize: '10px',
            fontFamily: 'var(--quafi-font-mono)',
            color: 'var(--quafi-text-muted)',
          }}>
            {duration || 'once'} {isInfinite && '∞'}
          </div>
        </div>
        {!isInfinite && (
          <button
            onClick={replay}
            style={{
              padding: '6px 12px',
              fontSize: '10px',
              fontFamily: 'var(--quafi-font-mono)',
              fontWeight: 500,
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: '6px',
              cursor: 'pointer',
              color: 'var(--quafi-accent)',
              transition: 'all 0.15s ease',
            }}
          >
            Replay
          </button>
        )}
      </div>

      {/* Animation Demo */}
      <div
        style={{
          background: 'var(--marble-dark)',
          borderRadius: '12px',
          boxShadow: 'var(--inset-2)',
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80px',
          overflow: 'hidden',
        }}
      >
        <div
          key={key}
          className={isVisible || isInfinite ? animation : ''}
          style={{
            opacity: isVisible || isInfinite ? 1 : 0,
            ...style,
          }}
        >
          {children || (
            <div style={{
              width: '60px',
              height: '60px',
              background: 'var(--marble-base)',
              borderRadius: '12px',
              boxShadow: 'var(--raised-2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{
                fontFamily: 'var(--quafi-font-mono)',
                fontSize: '20px',
                fontWeight: 700,
                color: 'var(--quafi-accent)',
              }}>
                F
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div style={{
        fontSize: '11px',
        fontFamily: 'var(--quafi-font-primary)',
        color: 'var(--quafi-text-secondary)',
        lineHeight: 1.4,
      }}>
        {description}
      </div>

      {/* Code */}
      <code style={{
        fontSize: '10px',
        fontFamily: 'var(--quafi-font-mono)',
        background: 'var(--quafi-glass-accent)',
        color: 'var(--quafi-accent)',
        padding: '6px 10px',
        borderRadius: '6px',
      }}>
        .{animation}
      </code>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// DATA ATTRIBUTE DEMO
// Shows how to use [data-animate] for scroll-triggered animations
// ═══════════════════════════════════════════════════════════════════════════════

function DataAnimateDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else if ((entry.target as HTMLElement).dataset.animateReplay !== undefined) {
          entry.target.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.2 });

    const elements = container.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [key]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <button
          onClick={() => setKey(k => k + 1)}
          style={{
            padding: '8px 16px',
            fontSize: '11px',
            fontFamily: 'var(--quafi-font-mono)',
            fontWeight: 500,
            background: 'var(--quafi-accent)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            color: 'white',
          }}
        >
          Reset All
        </button>
      </div>

      <div
        ref={containerRef}
        key={key}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
        }}
      >
        {[
          { type: 'emerge', label: 'Emerge' },
          { type: 'fade', label: 'Fade' },
          { type: 'scale', label: 'Scale' },
          { type: 'slide-left', label: 'Slide Left' },
          { type: 'slide-right', label: 'Slide Right' },
          { type: 'pop', label: 'Pop' },
        ].map((item, i) => (
          <div
            key={item.type}
            data-animate={item.type}
            data-animate-replay
            style={{
              padding: '24px',
              background: 'var(--marble-base)',
              borderRadius: '14px',
              boxShadow: 'var(--raised-2)',
              textAlign: 'center',
            }}
          >
            <div style={{
              fontFamily: 'var(--quafi-font-display)',
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--quafi-accent)',
              marginBottom: '8px',
            }}>
              {i + 1}
            </div>
            <div style={{
              fontSize: '12px',
              fontFamily: 'var(--quafi-font-mono)',
              color: 'var(--quafi-text-secondary)',
            }}>
              {item.label}
            </div>
            <code style={{
              fontSize: '9px',
              fontFamily: 'var(--quafi-font-mono)',
              color: 'var(--quafi-text-muted)',
              marginTop: '8px',
              display: 'block',
            }}>
              data-animate="{item.type}"
            </code>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STAGGER DEMO
// Shows staggered animations for lists
// ═══════════════════════════════════════════════════════════════════════════════

function StaggerDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const children = entry.target.querySelectorAll('[data-animate]');
          children.forEach(child => child.classList.add('is-visible'));
        }
      });
    }, { threshold: 0.2 });

    observer.observe(container);
    return () => observer.disconnect();
  }, [key]);

  const stocks = [
    { symbol: 'AAPL', price: '$178.42', change: '+2.34%', positive: true },
    { symbol: 'MSFT', price: '$378.91', change: '+0.87%', positive: true },
    { symbol: 'GOOGL', price: '$141.23', change: '-1.23%', positive: false },
    { symbol: 'AMZN', price: '$178.12', change: '+1.56%', positive: true },
    { symbol: 'NVDA', price: '$721.33', change: '-0.45%', positive: false },
    { symbol: 'TSLA', price: '$245.18', change: '+3.21%', positive: true },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <button
          onClick={() => setKey(k => k + 1)}
          style={{
            padding: '8px 16px',
            fontSize: '11px',
            fontFamily: 'var(--quafi-font-mono)',
            fontWeight: 500,
            background: 'var(--quafi-accent)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            color: 'white',
          }}
        >
          Replay Stagger
        </button>
      </div>

      <div
        ref={containerRef}
        key={key}
        data-animate-stagger
        style={{
          background: 'var(--marble-base)',
          borderRadius: '16px',
          boxShadow: 'var(--raised-2)',
          overflow: 'hidden',
        }}
      >
        {stocks.map((stock, i) => (
          <div
            key={stock.symbol}
            data-animate="emerge"
            style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr 100px 80px',
              gap: '16px',
              alignItems: 'center',
              padding: '16px 24px',
              borderBottom: i < stocks.length - 1 ? '1px solid var(--quafi-border-subtle)' : 'none',
              opacity: 0,
              transform: 'translateY(20px)',
            }}
          >
            <span style={{
              fontFamily: 'var(--quafi-font-mono)',
              fontSize: '14px',
              fontWeight: 700,
              color: 'var(--quafi-accent)',
            }}>
              {stock.symbol}
            </span>
            <span style={{
              fontFamily: 'var(--quafi-font-mono)',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--quafi-black)',
            }}>
              {stock.price}
            </span>
            <span style={{
              fontFamily: 'var(--quafi-font-mono)',
              fontSize: '13px',
              fontWeight: 600,
              color: stock.positive ? 'var(--quafi-positive)' : 'var(--quafi-negative)',
              textAlign: 'right',
            }}>
              {stock.change}
            </span>
            <span style={{
              fontSize: '10px',
              fontFamily: 'var(--quafi-font-mono)',
              color: 'var(--quafi-text-muted)',
              textAlign: 'right',
            }}>
              +{(i + 1) * 50}ms
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN SHOWCASE
// ═══════════════════════════════════════════════════════════════════════════════

export function CSSAnimationsShowcase() {
  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  };

  return (
    <div>
      {/* Header */}
      <header style={showcase.header.container}>
        <h1 style={showcase.header.title}>Animations</h1>
        <p style={showcase.header.description}>
          Scroll-triggered & atmospheric animations
        </p>
      </header>

      {/* Atmospheric */}
      <ShowcaseSection
        title="Atmospheric (Infinite)"
        description="Subtle continuous animations that bring the UI to life"
      >
        <div style={gridStyles}>
          <AnimatedBox
            animation="quafi-animate-breathe"
            label="Breathe"
            description="Very slow, almost imperceptible opacity change. Perfect for backgrounds."
            duration="8s"
            isInfinite
          />
          <AnimatedBox
            animation="quafi-animate-pulse"
            label="Pulse"
            description="Subtle scale and opacity pulse for active elements."
            duration="3s"
            isInfinite
          />
          <AnimatedBox
            animation="quafi-animate-system-pulse"
            label="System Pulse"
            description="Status indicator pulse for system activity."
            duration="2s"
            isInfinite
          >
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: 'var(--quafi-positive)',
            }} />
          </AnimatedBox>
          <AnimatedBox
            animation="quafi-animate-float"
            label="Float"
            description="Gentle floating motion for highlighted elements."
            duration="3s"
            isInfinite
          />
          <AnimatedBox
            animation="quafi-animate-rotate"
            label="Rotate"
            description="Slow rotation for loading indicators."
            duration="20s"
            isInfinite
          >
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid var(--quafi-accent)',
              borderTopColor: 'transparent',
              borderRadius: '50%',
            }} />
          </AnimatedBox>
          <AnimatedBox
            animation="quafi-animate-blink"
            label="Blink"
            description="Cursor or indicator blinking effect."
            duration="1.5s"
            isInfinite
          >
            <div style={{
              width: '2px',
              height: '24px',
              background: 'var(--quafi-accent)',
            }} />
          </AnimatedBox>
        </div>
      </ShowcaseSection>

      {/* Entrance */}
      <ShowcaseSection
        title="Entrance (One-time)"
        description="Animations that play once when elements enter the viewport. Click Replay to see again."
      >
        <div style={gridStyles}>
          <AnimatedBox
            animation="quafi-animate-emerge"
            label="Emerge"
            description="Fade in from below. Great for cards and content blocks."
            duration="400ms"
          />
          <AnimatedBox
            animation="quafi-animate-fade-in"
            label="Fade In"
            description="Simple opacity fade. Most versatile entrance animation."
            duration="250ms"
          />
          <AnimatedBox
            animation="quafi-animate-scale-in"
            label="Scale In"
            description="Subtle scale with fade. Good for modals and dialogs."
            duration="250ms"
          />
          <AnimatedBox
            animation="quafi-animate-slide-left"
            label="Slide Left"
            description="Slide in from the left side."
            duration="400ms"
          />
          <AnimatedBox
            animation="quafi-animate-slide-right"
            label="Slide Right"
            description="Slide in from the right side."
            duration="400ms"
          />
          <AnimatedBox
            animation="quafi-animate-pop"
            label="Pop"
            description="Bouncy entrance with overshoot. For attention-grabbing elements."
            duration="400ms"
          />
        </div>
      </ShowcaseSection>

      {/* Effects */}
      <ShowcaseSection
        title="Effects"
        description="Visual feedback and loading state animations"
      >
        <div style={gridStyles}>
          <AnimatedBox
            animation="quafi-animate-glow"
            label="Glow Pulse"
            description="Pulsing glow effect for focused or active elements."
            duration="3s"
            isInfinite
          />
          <AnimatedBox
            animation="quafi-animate-shimmer"
            label="Shimmer"
            description="Loading skeleton shimmer effect."
            duration="2s"
            isInfinite
          >
            <div style={{
              width: '100%',
              height: '40px',
              borderRadius: '8px',
            }} className="quafi-animate-shimmer" />
          </AnimatedBox>
          <AnimatedBox
            animation="quafi-animate-gradient"
            label="Gradient Shift"
            description="Slow gradient movement for backgrounds."
            duration="8s"
            isInfinite
            style={{
              width: '80px',
              height: '60px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--quafi-accent), var(--quafi-accent-dark), var(--quafi-accent))',
              backgroundSize: '200% 200%',
            }}
          >
            <div />
          </AnimatedBox>
        </div>
      </ShowcaseSection>

      {/* Stock Market */}
      <ShowcaseSection
        title="Stock Market"
        description="Specialized animations for financial data"
      >
        <div style={gridStyles}>
          <AnimatedBox
            animation="quafi-animate-value-flash"
            label="Value Flash"
            description="Background flash when a value changes."
            duration="1s"
          >
            <span style={{
              fontFamily: 'var(--quafi-font-mono)',
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--quafi-black)',
              padding: '8px 16px',
              borderRadius: '8px',
            }}>
              $178.42
            </span>
          </AnimatedBox>
          <AnimatedBox
            animation="quafi-animate-value-flash-positive"
            label="Flash Positive"
            description="Green flash for positive changes."
            duration="1s"
          >
            <span style={{
              fontFamily: 'var(--quafi-font-mono)',
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--quafi-positive)',
              padding: '8px 16px',
              borderRadius: '8px',
            }}>
              +2.34%
            </span>
          </AnimatedBox>
          <AnimatedBox
            animation="quafi-animate-value-flash-negative"
            label="Flash Negative"
            description="Red flash for negative changes."
            duration="1s"
          >
            <span style={{
              fontFamily: 'var(--quafi-font-mono)',
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--quafi-negative)',
              padding: '8px 16px',
              borderRadius: '8px',
            }}>
              -1.87%
            </span>
          </AnimatedBox>
          <AnimatedBox
            animation="quafi-animate-data-glow"
            label="Data Glow"
            description="Text glow for active/live data."
            duration="2s"
            isInfinite
          >
            <span style={{
              fontFamily: 'var(--quafi-font-mono)',
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--quafi-accent)',
            }}>
              LIVE
            </span>
          </AnimatedBox>
        </div>
      </ShowcaseSection>

      {/* Data Attribute Demo */}
      <ShowcaseSection
        title="Scroll-Triggered (data-animate)"
        description="Use [data-animate] attribute for scroll-triggered animations. Scroll away and back to replay."
      >
        <DataAnimateDemo />
      </ShowcaseSection>

      {/* Stagger Demo */}
      <ShowcaseSection
        title="Stagger Animation"
        description="Use [data-animate-stagger] on parent to stagger child animations."
      >
        <StaggerDemo />
      </ShowcaseSection>

      {/* Usage Guide */}
      <ShowcaseSection
        title="Usage"
        description="How to implement animations"
      >
        <div style={{
          padding: '24px',
          background: 'var(--marble-base)',
          borderRadius: '20px',
          boxShadow: 'var(--raised-2)',
        }}>
          <pre style={{
            fontFamily: 'var(--quafi-font-mono)',
            fontSize: '12px',
            color: 'var(--quafi-text-secondary)',
            lineHeight: 1.6,
            margin: 0,
            whiteSpace: 'pre-wrap',
          }}>
{`/* 1. Utility Classes (direct) */
<div className="quafi-animate-emerge">Content</div>
<div className="quafi-animate-pulse">Always pulsing</div>

/* 2. Data Attributes (scroll-triggered) */
<div data-animate="emerge">Animates on scroll</div>
<div data-animate="fade" data-animate-replay>Replays each time</div>

/* 3. Stagger (list items) */
<div data-animate-stagger>
  <div data-animate="emerge">Item 1 (0ms)</div>
  <div data-animate="emerge">Item 2 (+50ms)</div>
  <div data-animate="emerge">Item 3 (+100ms)</div>
</div>

/* 4. Intersection Observer (manual) */
const { ref, isVisible } = useInView();
<div ref={ref} className={isVisible ? 'quafi-animate-emerge' : ''}>
  Custom logic
</div>`}
          </pre>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export default CSSAnimationsShowcase;
