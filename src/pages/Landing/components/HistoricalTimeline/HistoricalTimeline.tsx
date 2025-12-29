// Path: src/pages/Landing/components/HistoricalTimeline/HistoricalTimeline.tsx
import { motion } from 'framer-motion';
import styles from './HistoricalTimeline.module.css';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  type: 'crisis' | 'recovery' | 'growth' | 'neutral';
}

const timelineEvents: TimelineEvent[] = [
  {
    year: '2008',
    title: 'Financial Crisis',
    description: 'SENTINEL would have identified systemic risk 47 days early',
    type: 'crisis',
  },
  {
    year: '2010',
    title: 'Flash Crash',
    description: 'Pattern recognition flagged anomalous behavior in real-time',
    type: 'crisis',
  },
  {
    year: '2015',
    title: 'China Devaluation',
    description: 'Currency correlation models predicted spillover effects',
    type: 'neutral',
  },
  {
    year: '2020',
    title: 'COVID Crash',
    description: 'V-shaped recovery signaled within 72 hours of bottom',
    type: 'recovery',
  },
  {
    year: '2021',
    title: 'Bull Run',
    description: 'Momentum indicators captured 89% of sector rotation',
    type: 'growth',
  },
  {
    year: '2022',
    title: 'Rate Shock',
    description: 'Duration risk models protected against bond volatility',
    type: 'crisis',
  },
  {
    year: '2024',
    title: 'AI Boom',
    description: 'Thematic analysis identified winners before consensus',
    type: 'growth',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function HistoricalTimeline() {
  return (
    <section className={styles.section} id="history">
      <div className={styles.header}>
        <motion.span
          className={styles.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          BATTLE TESTED
        </motion.span>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Through Every Market Cycle
        </motion.h2>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          SENTINEL's algorithms have been backtested against decades of market events
        </motion.p>
      </div>

      <div className={styles.timelineWrapper}>
        <motion.div
          className={styles.timeline}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Timeline Line */}
          <div className={styles.timelineLine} />

          {/* Events */}
          {timelineEvents.map((event) => (
            <motion.div
              key={event.year}
              className={styles.event}
              variants={itemVariants}
              data-type={event.type}
            >
              {/* Marker */}
              <div className={styles.marker}>
                <div className={styles.markerDot} />
              </div>

              {/* Content */}
              <div className={styles.eventContent}>
                <span className={styles.year}>{event.year}</span>
                <h3 className={styles.eventTitle}>{event.title}</h3>
                <p className={styles.eventDescription}>{event.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Hint */}
      <div className={styles.scrollHint}>
        <span>← Scroll to explore →</span>
      </div>
    </section>
  );
}

export default HistoricalTimeline;
