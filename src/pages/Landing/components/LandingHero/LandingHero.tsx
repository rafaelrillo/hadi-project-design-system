// Path: src/pages/Landing/components/LandingHero/LandingHero.tsx
// FING Brand Landing Page - Stone Marble Neumorphism

import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Monitor, ArrowRight, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FingEmblem } from '@/components/atoms/FingEmblem';
import { useIsMobile } from '@/hooks/useBreakpoint';
import styles from './LandingHero.module.css';

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export function LandingHero() {
  const navigate = useNavigate();
  const controls = useAnimation();
  const isMobile = useIsMobile();

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.45, 0, 0.15, 1] as const,
      },
    },
  };

  // Brand data
  const traits = [
    { name: 'Silent', desc: 'Speaks little, but with weight' },
    { name: 'Patient', desc: 'Observes the long term' },
    { name: 'Precise', desc: 'Every word counts' },
    { name: 'Institutional', desc: 'Serious, professional' },
    { name: 'Intelligent', desc: 'Sophisticated, not pretentious' },
  ];

  const taglines = [
    { text: 'Quiet intelligence', emphasis: 'The personality' },
    { text: 'Resolve', emphasis: 'The action' },
    { text: 'The long view', emphasis: 'The patience' },
  ];

  return (
    <section className={styles.hero}>
      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* ═══════════════════════════════════════════════════════════════════════
            HERO SECTION - Direct on marble surface
            ═══════════════════════════════════════════════════════════════════════ */}
        <motion.div className={styles.heroSection} variants={itemVariants}>
          {/* Emblem */}
          <div className={styles.emblemContainer}>
            <FingEmblem size={isMobile ? 100 : 140} animation="rippleSlow" />
          </div>

          {/* Wordmark */}
          <h1 className={styles.brandName}>fing</h1>

          {/* Subtitle */}
          <p className={styles.heroSubtitle}>Investment Analysis System</p>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════════════
            NAME ORIGIN - RAISED Container
            ═══════════════════════════════════════════════════════════════════════ */}
        <motion.div className={styles.nameCard} variants={itemVariants}>
          <div className={styles.sectionLabel}>The Name</div>

          {/* Name Grid - Two INSET containers */}
          <div className={styles.nameGrid}>
            {/* FINIS */}
            <div className={styles.nameInset}>
              <span className={styles.nameAccentLabel}>FIN</span>
              <span className={styles.nameTitle}>is</span>
              <p className={styles.nameDesc}>
                From Latin <em>fīnis</em> — to resolve, to conclude.
                The root of "finance."
              </p>
            </div>

            {/* INGENIUM */}
            <div className={styles.nameInset}>
              <span className={styles.nameAccentLabel}>ING</span>
              <span className={styles.nameTitle}>enium</span>
              <p className={styles.nameDesc}>
                From Latin <em>ingenium</em> — innate talent, ingenuity.
                The root of "engine."
              </p>
            </div>
          </div>

          {/* Synthesis - Deep INSET */}
          <div className={styles.synthesisInset}>
            <div className={styles.synthesisFormula}>
              <span className={styles.synthesisAccent}>FIN</span>
              <span className={styles.synthesisText}>is</span>
              <span className={styles.synthesisPlus}>+</span>
              <span className={styles.synthesisAccent}>ING</span>
              <span className={styles.synthesisText}>enium</span>
            </div>
            <p className={styles.synthesisMeaning}>
              The engine of conclusions. Intelligence that doesn't speculate — it resolves.
            </p>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════════════
            DESIGN PHILOSOPHY - RAISED Container
            ═══════════════════════════════════════════════════════════════════════ */}
        <motion.div className={styles.philosophyCard} variants={itemVariants}>
          <div className={styles.sectionLabel}>Design Philosophy</div>

          <div className={styles.philosophyContent}>
            <h3 className={styles.philosophyTitle}>Stone Marble Neumorphism</h3>
            <p className={styles.philosophyText}>
              Our interface is crafted from digital marble — cold, polished, enduring.
              Every surface emerges from stone through subtle shadows and highlights,
              creating depth without artifice.
            </p>
            <p className={styles.philosophyText}>
              This aesthetic isn't decorative. It's a statement:
              <strong> investments made with FING are solid and stable</strong>.
              Like marble that has endured centuries, our analysis is built on
              foundations that don't crack under pressure.
            </p>
          </div>

          {/* Design Principles - INSET containers */}
          <div className={styles.principlesGrid}>
            <div className={styles.principleInset}>
              <span className={styles.principleIcon}>◆</span>
              <span className={styles.principleName}>Solid</span>
              <span className={styles.principleDesc}>Built on enduring foundations</span>
            </div>
            <div className={styles.principleInset}>
              <span className={styles.principleIcon}>◆</span>
              <span className={styles.principleName}>Stable</span>
              <span className={styles.principleDesc}>Unwavering in volatile markets</span>
            </div>
            <div className={styles.principleInset}>
              <span className={styles.principleIcon}>◆</span>
              <span className={styles.principleName}>Timeless</span>
              <span className={styles.principleDesc}>Long-term vision, not trends</span>
            </div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════════════
            BRAND PERSONALITY - RAISED Container
            ═══════════════════════════════════════════════════════════════════════ */}
        <motion.div className={styles.personalityCard} variants={itemVariants}>
          <div className={styles.sectionLabel}>Brand Voice</div>

          {/* Taglines - INSET containers */}
          <div className={styles.taglinesGrid}>
            {taglines.map((item) => (
              <div key={item.text} className={styles.taglineInset}>
                <span className={styles.taglineText}>{item.text}</span>
                <span className={styles.taglineEmphasis}>{item.emphasis}</span>
              </div>
            ))}
          </div>

          {/* Traits Grid - INSET containers */}
          <div className={styles.traitsGrid}>
            {traits.map((trait) => (
              <div key={trait.name} className={styles.traitInset}>
                <span className={styles.traitName}>{trait.name}</span>
                <span className={styles.traitDesc}>{trait.desc}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════════════
            CTA SECTION
            ═══════════════════════════════════════════════════════════════════════ */}
        <motion.div className={styles.ctaSection} variants={itemVariants}>
          {isMobile ? (
            <div className={styles.ctaDisabledWrapper}>
              <button className={styles.ctaButtonPrimary} disabled>
                Explore Design System
                <span className={styles.ctaIconCircle}>
                  <ArrowRight size={14} className={styles.ctaIcon} />
                </span>
              </button>
              <div className={styles.ctaDesktopHint}>
                <Monitor size={12} />
                <span>Desktop only</span>
              </div>
            </div>
          ) : (
            <button
              className={styles.ctaButtonPrimary}
              onClick={() => navigate('/showcase')}
            >
              Explore Design System
              <span className={styles.ctaIconCircle}>
                <ArrowRight size={14} className={styles.ctaIcon} />
              </span>
            </button>
          )}

          <button
            className={styles.ctaButtonSecondary}
            onClick={() => navigate('/app/dashboard')}
          >
            Open App
            <span className={styles.ctaIconCircle}>
              <Briefcase size={12} className={styles.ctaIcon} />
            </span>
          </button>
        </motion.div>

      </motion.div>
    </section>
  );
}

export default LandingHero;
