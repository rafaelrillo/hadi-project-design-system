// Path: src/pages/Landing/components/LandingNav/LandingNav.tsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import styles from './LandingNav.module.css';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Demo', href: '#demo' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Login', href: '/app/login' },
];

export function LandingNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.45, 0, 0.15, 1] }}
    >
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <svg
            className={styles.logoSvg}
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="60"
              cy="60"
              r="55"
              stroke="var(--sentinel-accent-primary)"
              strokeWidth="1"
              strokeOpacity="0.3"
            />
            <circle
              cx="60"
              cy="60"
              r="42"
              stroke="var(--sentinel-accent-primary)"
              strokeWidth="1.5"
              strokeOpacity="0.5"
            />
            <circle
              cx="60"
              cy="60"
              r="28"
              stroke="var(--sentinel-accent-primary)"
              strokeWidth="2"
              strokeOpacity="0.8"
            />
            <circle
              cx="60"
              cy="60"
              r="8"
              fill="var(--sentinel-accent-primary)"
            />
          </svg>
          <span className={styles.logoText}>SENTINEL</span>
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
          <Button
            variant="primary"
            onClick={() => navigate('/app/login')}
          >
            Get Access
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                variant="primary"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate('/app/login');
                }}
              >
                Get Access
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default LandingNav;
