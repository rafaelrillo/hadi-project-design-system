// Path: src/pages/Landing/Landing.tsx
import { useEffect } from 'react';
import { AtmosphericBackground } from '@/components/atoms/sentinel';
import { ScrollProgress } from '@/components/atoms/ScrollProgress';
import { useMarketStore } from '@/store';
import {
  LandingNav,
  LandingHero,
  NoiseToSignal,
  HistoricalTimeline,
  FeatureShowcase,
  LiveDemoWidget,
  TrustSection,
  CTASection,
  LandingFooter,
} from './components';
import styles from './Landing.module.css';

export function Landing() {
  const { fetchStocks } = useMarketStore();

  // Initialize market data when component mounts
  useEffect(() => {
    fetchStocks();
  }, [fetchStocks]);

  return (
    <div className={styles.container}>
      {/* Background Effects - TEMPORARILY DISABLED */}
      {/* <AtmosphericBackground variant="subtle" /> */}
      <ScrollProgress />

      {/* Navigation */}
      <LandingNav />

      {/* Main Content */}
      <main className={styles.main}>
        {/* Hero Section */}
        <LandingHero />

        {/* Noise to Signal Transformation */}
        <NoiseToSignal />

        {/* Historical Timeline */}
        <HistoricalTimeline />

        {/* Feature Showcase */}
        <FeatureShowcase />

        {/* Live Demo Widget */}
        <LiveDemoWidget />

        {/* Trust Section */}
        <TrustSection />

        {/* Call to Action */}
        <CTASection />
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}

export default Landing;
