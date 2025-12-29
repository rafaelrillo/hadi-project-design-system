// Path: src/components/atoms/ScrollProgress/ScrollProgress.tsx
import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import styles from './ScrollProgress.module.css';

export interface ScrollProgressProps {
  position?: 'left' | 'right';
  className?: string;
}

export function ScrollProgress({
  position = 'right',
  className = '',
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className={`${styles.scrollProgress} ${styles[position]} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.track}>
        <motion.div className={styles.fill} style={{ scaleY, originY: 0 }} />
      </div>
    </motion.div>
  );
}

export default ScrollProgress;
