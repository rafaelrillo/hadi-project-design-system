// Path: src/pages/Landing/Landing.tsx
import { useNavigate } from 'react-router-dom';
import { AtmosphericBackground } from '@/components/atoms/sentinel';
import { Button } from '@/components/atoms/Button';
import styles from './Landing.module.css';

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <AtmosphericBackground variant="subtle" />

      {/* Hero Section */}
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.logoMark}>
            <span className={styles.logoIcon}>S</span>
          </div>
          <h1 className={styles.title}>SENTINEL</h1>
          <p className={styles.subtitle}>Investment Observatory</p>
          <p className={styles.description}>
            Professional design system for financial analysis applications.
            Silent complexity. Deliberate revelation. Confident precision.
          </p>
          <div className={styles.heroActions}>
            <Button
              variant="primary"
              onClick={() => navigate('/showcase/sentinel')}
            >
              View Components
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/showcase')}
            >
              Full Showcase
            </Button>
          </div>
        </div>
      </header>

      {/* Status Indicators Section */}
      <section className={styles.demoSection}>
        <h2 className={styles.sectionTitle}>Core Indicators</h2>
        <p className={styles.sectionSubtitle}>
          Designed for financial data visualization
        </p>

        <div className={styles.indicatorGrid}>
          <div className={styles.indicatorCard}>
            <div className={styles.indicatorIcon}>
              <span className={styles.pulseRing}></span>
              <span className={styles.pulseDot}></span>
            </div>
            <div className={styles.indicatorInfo}>
              <span className={styles.indicatorLabel}>Market State</span>
              <span className={styles.indicatorValue}>BULLISH</span>
            </div>
          </div>

          <div className={styles.indicatorCard}>
            <div className={styles.gaugeContainer}>
              <svg viewBox="0 0 60 60" className={styles.gaugeSvg}>
                <circle
                  cx="30"
                  cy="30"
                  r="26"
                  fill="none"
                  stroke="var(--sentinel-bg-subtle)"
                  strokeWidth="4"
                />
                <circle
                  cx="30"
                  cy="30"
                  r="26"
                  fill="none"
                  stroke="var(--sentinel-accent-primary)"
                  strokeWidth="4"
                  strokeDasharray="163.4"
                  strokeDashoffset="65"
                  strokeLinecap="round"
                  transform="rotate(-90 30 30)"
                />
              </svg>
              <span className={styles.gaugeValue}>42%</span>
            </div>
            <span className={styles.indicatorLabel}>Risk Level</span>
          </div>

          <div className={styles.indicatorCard}>
            <div className={styles.confidenceBar}>
              <div className={styles.confidenceTrack}>
                <div className={styles.confidenceFill} style={{ width: '85%' }}></div>
              </div>
              <span className={styles.confidenceValue}>85%</span>
            </div>
            <span className={styles.indicatorLabel}>Signal Confidence</span>
          </div>

          <div className={styles.indicatorCard}>
            <div className={styles.statusIndicator}>
              <span className={styles.statusDot}></span>
              <span className={styles.statusText}>ACTIVE</span>
            </div>
            <span className={styles.indicatorLabel}>Analysis Engine</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Design Philosophy</h2>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>01</div>
            <h3 className={styles.featureTitle}>Silent Complexity</h3>
            <p className={styles.featureText}>
              Sophisticated analysis presented through minimal interface.
              Data-rich without visual noise.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>02</div>
            <h3 className={styles.featureTitle}>Slow Revelation</h3>
            <p className={styles.featureText}>
              Information unfolds gradually with 400-700ms animations.
              Deliberate pacing builds comprehension.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>03</div>
            <h3 className={styles.featureTitle}>Desaturated Confidence</h3>
            <p className={styles.featureText}>
              Muted colors that convey expertise without alarm.
              Professional palette for financial contexts.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>04</div>
            <h3 className={styles.featureTitle}>Information Hierarchy</h3>
            <p className={styles.featureText}>
              Three levels: Core (what), Context (why), Action (what to do).
              Clear cognitive flow.
            </p>
          </div>
        </div>
      </section>

      {/* Component Hierarchy Section */}
      <section className={styles.hierarchySection}>
        <h2 className={styles.sectionTitle}>Component Architecture</h2>

        <div className={styles.hierarchyGrid}>
          <div className={styles.levelCard}>
            <div className={styles.levelHeader}>
              <span className={styles.levelNumber}>Level 1</span>
              <span className={styles.levelName}>Core</span>
            </div>
            <p className={styles.levelQuestion}>What is the market doing?</p>
            <ul className={styles.componentList}>
              <li>MarketStateIndicator</li>
              <li>RiskGauge</li>
              <li>ConfidenceLevel</li>
              <li>SystemPulse</li>
            </ul>
          </div>

          <div className={styles.levelCard}>
            <div className={styles.levelHeader}>
              <span className={styles.levelNumber}>Level 2</span>
              <span className={styles.levelName}>Context</span>
            </div>
            <p className={styles.levelQuestion}>Why is the market this way?</p>
            <ul className={styles.componentList}>
              <li>FactorWeight</li>
              <li>TrendIndicator</li>
              <li>HistoricalAlignment</li>
              <li>CyclePosition</li>
            </ul>
          </div>

          <div className={styles.levelCard}>
            <div className={styles.levelHeader}>
              <span className={styles.levelNumber}>Level 3</span>
              <span className={styles.levelName}>Action</span>
            </div>
            <p className={styles.levelQuestion}>What should I do?</p>
            <ul className={styles.componentList}>
              <li>RecommendationCard</li>
              <li>StockSuggestion</li>
              <li>RiskProfileSelector</li>
              <li>AllocationSummary</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <span className={styles.footerBrand}>SENTINEL v2.0.0</span>
          <span className={styles.footerSeparator}>|</span>
          <span className={styles.footerText}>Investment Observatory Design System</span>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
