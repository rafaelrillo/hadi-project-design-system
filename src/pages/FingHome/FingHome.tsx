// Path: src/pages/FingHome/FingHome.tsx
// FING Home Page - Coming Soon (Presentation Mode)

import { FingWordmarkText } from '@/components/atoms/FingWordmark';
import { FingEmblem } from '@/components/atoms/FingEmblem';
import styles from './FingHome.module.css';

// ═══════════════════════════════════════════════════════════════════════════════
// FING HOME PAGE - COMING SOON
// Minimal landing with logo only for presentation
// ═══════════════════════════════════════════════════════════════════════════════

export function FingHome() {
  return (
    <div className={styles.home}>
      <section className={`${styles.section} ${styles.comingSoon}`}>
        {/* Radar Logo with subtle animation */}
        <FingEmblem size={200} animation="breathe" svgScale={0.85} />

        {/* Wordmark - Cormorant Garamond with Carved Effect */}
        <FingWordmarkText variant="carved" size={140} />

        {/* Coming Soon text */}
        <p className={styles.comingSoonText}>Coming soon</p>
      </section>
    </div>
  );
}

export default FingHome;
