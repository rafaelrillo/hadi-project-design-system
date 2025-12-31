// Path: src/pages/Landing/components/LandingHero/LandingHero.tsx
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ChevronDown, Monitor } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MarketStateIndicator, RiskGauge, ConfidenceLevel } from '@/components/organisms/sentinel';
import { Button } from '@/components/atoms/Button';
import { useMarketStore } from '@/store';
import { useIsMobile } from '@/hooks/useBreakpoint';
import styles from './LandingHero.module.css';

export function LandingHero() {
  const navigate = useNavigate();
  const controls = useAnimation();
  const isMobile = useIsMobile();

  const { indicators, fetchStocks } = useMarketStore();

  useEffect(() => {
    // Fetch real data on mount
    fetchStocks();

    // Start animation sequence
    controls.start('visible');
  }, [controls, fetchStocks]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.45, 0, 0.15, 1] as const,
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.45, 0, 0.15, 1] as const,
      },
    },
  };

  const scrollToFeatures = () => {
    const element = document.querySelector('#features');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero}>

      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Logo */}
        <motion.div className={styles.logoContainer} variants={logoVariants}>
          <svg
            className={styles.logo}
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer ring */}
            <circle
              cx="60"
              cy="60"
              r="55"
              stroke="var(--sentinel-accent-primary)"
              strokeWidth="1"
              strokeOpacity="0.3"
            />
            {/* Middle ring */}
            <circle
              cx="60"
              cy="60"
              r="42"
              stroke="var(--sentinel-accent-primary)"
              strokeWidth="1.5"
              strokeOpacity="0.5"
            />
            {/* Inner ring */}
            <circle
              cx="60"
              cy="60"
              r="28"
              stroke="var(--sentinel-accent-primary)"
              strokeWidth="2"
              strokeOpacity="0.8"
            />
            {/* Center dot */}
            <circle
              cx="60"
              cy="60"
              r="8"
              fill="var(--sentinel-accent-primary)"
            />
            {/* Scanning line */}
            <line
              x1="60"
              y1="5"
              x2="60"
              y2="60"
              stroke="var(--sentinel-accent-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              className={styles.scanLine}
            />
          </svg>
        </motion.div>

        {/* Title */}
        <motion.h1 className={styles.title} variants={itemVariants}>
          SENTINEL
        </motion.h1>

        {/* Subtitle */}
        <motion.p className={styles.subtitle} variants={itemVariants}>
          Investment Analysis System
        </motion.p>

        {/* Tagline */}
        <motion.p className={styles.tagline} variants={itemVariants}>
          Observa. Analiza. Recomienda. En silencio.
        </motion.p>

        {/* CTA */}
        <motion.div className={styles.ctaContainer} variants={itemVariants}>
          {isMobile ? (
            <div className={styles.disabledButtonWrapper}>
              <Button
                variant="primary"
                disabled
                onClick={() => {}}
                className={styles.mobileButton}
              >
                Explore Design System
              </Button>
              <div className={styles.desktopOnlyHint}>
                <Monitor size={12} />
                <span>Desktop only</span>
              </div>
            </div>
          ) : (
            <Button
              variant="primary"
              onClick={() => navigate('/showcase')}
            >
              Explore Design System
            </Button>
          )}
          <Button
            variant="secondary"
            onClick={() => navigate('/app/dashboard')}
            className={isMobile ? styles.mobileButton : undefined}
          >
            Open App
          </Button>
        </motion.div>

        {/* Live Indicators */}
        <motion.div
          className={styles.indicators}
          variants={itemVariants}
        >
          <div className={styles.indicatorWrapper}>
            <MarketStateIndicator state={indicators.state} size="sm" />
          </div>
          <div className={styles.indicatorWrapper}>
            <RiskGauge level={indicators.riskLevel} value={indicators.riskValue} size="sm" />
          </div>
          <div className={styles.indicatorWrapper}>
            <ConfidenceLevel
              level={indicators.confidenceLevel}
              percentage={indicators.confidencePercent}
              size="sm"
            />
          </div>
        </motion.div>

        {/* Live badge */}
        <motion.div className={styles.liveBadge} variants={itemVariants}>
          <span className={styles.liveDot} />
          <span>Live Data</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        className={styles.scrollIndicator}
        onClick={scrollToFeatures}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <ChevronDown size={24} />
        <span>Scroll</span>
      </motion.button>
    </section>
  );
}

export default LandingHero;
