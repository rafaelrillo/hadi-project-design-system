// Path: src/pages/Home.tsx
// FING Design System - Home Page

import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { FingEmblem } from '@/components/atoms/FingEmblem';
import { FingWordmarkText } from '@/components/atoms/FingWordmark';

export function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#d5d8dc',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* Centered Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        {/* FING Emblem */}
        <FingEmblem size={180} animation="none" svgScale={0.85} />

        {/* FING Wordmark */}
        <FingWordmarkText variant="carved" size={96} />

        {/* Design System Label */}
        <p
          style={{
            fontSize: '18px',
            fontFamily: 'var(--sentinel-font-mono)',
            color: '#636E72',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginTop: '8px',
          }}
        >
          Design System
        </p>
      </div>

      {/* Launch App Button - Bottom Right */}
      <Link
        to="/app/login"
        style={{
          position: 'absolute',
          bottom: '40px',
          right: '40px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '14px 28px',
          background: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          borderRadius: '15px',
          color: 'var(--sentinel-text-primary)',
          fontSize: '14px',
          fontWeight: 600,
          fontFamily: 'var(--sentinel-font-mono)',
          textDecoration: 'none',
          cursor: 'pointer',
          boxShadow: `
            inset 0 -1px 0 rgba(255, 255, 255, 0.6),
            inset -1px 0 0 rgba(255, 255, 255, 0.4),
            2px 4px 8px rgba(147, 157, 170, 0.25)
          `,
          transition: 'transform 200ms ease, box-shadow 200ms ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = `
            inset 0 -1px 0 rgba(255, 255, 255, 0.6),
            inset -1px 0 0 rgba(255, 255, 255, 0.4),
            4px 8px 16px rgba(147, 157, 170, 0.35)
          `;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = `
            inset 0 -1px 0 rgba(255, 255, 255, 0.6),
            inset -1px 0 0 rgba(255, 255, 255, 0.4),
            2px 4px 8px rgba(147, 157, 170, 0.25)
          `;
        }}
      >
        <LogIn size={18} />
        Launch App
      </Link>
    </div>
  );
}
