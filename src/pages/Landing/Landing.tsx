// Path: src/pages/Landing/Landing.tsx
// FING Brand Landing Page - Stone Marble Neumorphism

import { LandingNav, LandingHero } from './components';
import styles from './Landing.module.css';

export function Landing() {
  return (
    <div className={styles.container}>
      {/* Navigation */}
      <LandingNav />

      {/* Main Content */}
      <main className={styles.main}>
        <LandingHero />
      </main>
    </div>
  );
}

export default Landing;
