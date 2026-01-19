// Path: src/pages/Landing/components/LandingNav/LandingNav.tsx
// FING Brand Navigation - Stone Marble Neumorphism

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { FingEmblem } from '@/components/atoms/FingEmblem';
import styles from './LandingNav.module.css';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Design System', href: '/showcase' },
  { label: 'App', href: '/app/dashboard' },
];

export function LandingNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(href);
    }
  };

  return (
    <motion.nav
      className={styles.nav}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.45, 0, 0.15, 1] }}
    >
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <FingEmblem size={32} animation="none" />
          <span className={styles.logoText}>fing</span>
        </Link>

        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          {navLinks.map((link) => (
            <button
              key={link.label}
              className={styles.navLink}
              onClick={() => handleNavClick(link.href)}
            >
              {link.label}
            </button>
          ))}
          <button
            className={styles.ctaButton}
            onClick={() => navigate('/showcase')}
          >
            <span>Explore</span>
            <span className={styles.ctaIconCircle}>
              <ArrowRight size={12} className={styles.ctaIcon} />
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, index) => (
              <motion.button
                key={link.label}
                className={styles.mobileNavLink}
                onClick={() => handleNavClick(link.href)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              className={styles.mobileCta}
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate('/showcase');
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span>Explore Design System</span>
              <ArrowRight size={14} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default LandingNav;
