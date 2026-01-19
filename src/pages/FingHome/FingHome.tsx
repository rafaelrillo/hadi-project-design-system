// Path: src/pages/FingHome/FingHome.tsx
// FING Home Page - Stone Marble Neumorphism with Natural Color Palette

import { useNavigate } from 'react-router-dom';
import { FingWordmarkText } from '@/components/atoms/FingWordmark';
import { FingEmblem } from '@/components/atoms/FingEmblem';
import styles from './FingHome.module.css';

// ═══════════════════════════════════════════════════════════════════════════════
// FING HOME PAGE
// 5 Sections: Hero, Etymology, Voice, System, Access
// ═══════════════════════════════════════════════════════════════════════════════

export function FingHome() {
  const navigate = useNavigate();

  return (
    <div className={styles.home}>
      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1: HERO
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className={`${styles.section} ${styles.hero}`}>
        {/* Radar Logo with ripple animation */}
        <FingEmblem size={180} animation="none" svgScale={0.85} />

        {/* Wordmark - Cormorant Garamond with Carved Effect */}
        <FingWordmarkText variant="carved" size={120} />

        {/* Descriptor */}
        <p className={styles.heroDescriptor}>Finance engine.</p>

        {/* CTAs */}
        <div className={styles.heroCtas}>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => navigate('/app/dashboard')}
          >
            Enter App
          </button>
          <button
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={() => navigate('/showcase')}
          >
            Design System
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className={styles.scrollIndicator}>
          <span>scroll</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <path
              d="M8 4V20M8 20L2 14M8 20L14 14"
              stroke="#9a9fa6"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2: THE NAME (Etymology)
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className={styles.section}>
        <span className={styles.sectionLabel}>The Name</span>

        {/* Etymology Grid - Two RAISED Cards */}
        <div className={styles.etymologyGrid}>
          {/* FIN - finis */}
          <div className={styles.etymologyCard}>
            <div className={styles.etymologyRoot}>FIN</div>
            <div className={styles.etymologyWord}>finis</div>
            <div className={styles.etymologyMeaning}>to conclude, to settle</div>
            <div className={styles.etymologyModern}>root of FINANCE</div>
          </div>

          {/* ING - ingenium */}
          <div className={styles.etymologyCard}>
            <div className={styles.etymologyRoot}>ING</div>
            <div className={styles.etymologyWord}>ingenium</div>
            <div className={styles.etymologyMeaning}>innate talent, ingenuity</div>
            <div className={styles.etymologyModern}>root of ENGINE</div>
          </div>
        </div>

        {/* Synthesis Card - INSET */}
        <div className={styles.synthesisCard}>
          <div className={styles.synthesisFormula}>
            <span className={styles.synthesisHighlight}>FIN</span>ance + eng
            <span className={styles.synthesisHighlight}>INE</span>
          </div>
          <div className={styles.synthesisResult}>The financial engine.</div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3: THE VOICE
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className={styles.section}>
        <span className={styles.sectionLabel}>The Voice</span>

        <div className={styles.voiceContainer}>
          {/* Headline */}
          <h2 className={styles.voiceHeadline}>
            FING is the senior analyst.
            <br />
            Speaks little. Means every word.
          </h2>

          {/* Voice Examples - RAISED Card with INSET Examples */}
          <div className={styles.voiceCard}>
            <div className={styles.voiceExamples}>
              <div className={styles.voiceExample}>
                "The market shows signs of consolidation."
              </div>
              <div className={styles.voiceExample}>
                "We observe moderate risk."
              </div>
              <div className={styles.voiceExample}>
                "Analysis suggests a neutral position."
              </div>
            </div>
          </div>

          {/* Anti-Examples */}
          <div className={styles.antiExamples}>
            <span className={styles.antiPill}>Not: "BUY NOW!"</span>
            <span className={styles.antiPill}>Not: "Don't miss this!"</span>
            <span className={styles.antiPill}>Not: "..."</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 4: THE SYSTEM
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className={styles.section}>
        <span className={styles.sectionLabel}>The System</span>

        <div className={styles.systemContainer}>
          <div className={styles.systemName}>STONE MARBLE NEUMORPHISM</div>
          <h2 className={styles.systemTitle}>
            Interfaces carved from digital marble
          </h2>
          <p className={styles.systemPhilosophy}>
            Cold. Polished. Enduring.
            <br />
            Every element emerges from or recedes into the same surface.
          </p>

          {/* RAISED to INSET Demo */}
          <div className={styles.systemDemo}>
            <div style={{ textAlign: 'center' }}>
              <div className={styles.demoRaised}>
                <div className={styles.demoInset}></div>
              </div>
              <div className={styles.demoLabel}>RAISED - INSET</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 5: ACCESS
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className={styles.section}>
        <div className={styles.accessContainer}>
          <h2 className={styles.accessTitle}>Built for the long term</h2>

          <div className={styles.accessCtas}>
            <button
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={() => navigate('/app/dashboard')}
            >
              Enter App
            </button>
            <button
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={() => navigate('/showcase')}
            >
              Explore Design System
            </button>
            <button
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={() => navigate('/showcase/styles/brand')}
            >
              Brand Guidelines
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════════════════════════════════ */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>FING 2025 - Finance engine.</p>
      </footer>
    </div>
  );
}

export default FingHome;
