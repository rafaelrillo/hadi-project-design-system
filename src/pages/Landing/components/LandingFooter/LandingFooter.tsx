// Path: src/pages/Landing/components/LandingFooter/LandingFooter.tsx
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter } from 'lucide-react';
import styles from './LandingFooter.module.css';

const footerLinks = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'Demo', href: '#demo' },
    { label: 'Pricing', href: '#pricing' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
  ],
  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Security', href: '/security' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
];

export function LandingFooter() {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoMark}>S</span>
              <span className={styles.logoText}>SENTINEL</span>
            </div>
            <p className={styles.tagline}>
              Investment Observatory
            </p>
            <p className={styles.description}>
              Observa. Analiza. Recomienda. En silencio.
            </p>

            {/* Social Links */}
            <div className={styles.socialLinks}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div className={styles.linkColumn}>
            <h4 className={styles.columnTitle}>Product</h4>
            <ul className={styles.linkList}>
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('#') ? (
                    <button
                      className={styles.link}
                      onClick={() => handleLinkClick(link.href)}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link to={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className={styles.linkColumn}>
            <h4 className={styles.columnTitle}>Company</h4>
            <ul className={styles.linkList}>
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className={styles.linkColumn}>
            <h4 className={styles.columnTitle}>Legal</h4>
            <ul className={styles.linkList}>
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {currentYear} SENTINEL. All rights reserved.
          </p>
          <p className={styles.version}>
            v2.0.0
          </p>
        </div>
      </div>
    </footer>
  );
}

export default LandingFooter;
