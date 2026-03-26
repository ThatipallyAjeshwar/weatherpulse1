import React from 'react';

function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <span style={styles.emoji}>🌦️</span>
        <span style={styles.logoText}>WeatherPulse</span>
      </div>
      <div style={styles.links}>
        <span style={styles.badge}>● LIVE</span>
        <span style={styles.tag}>Full Stack</span>
        <span style={styles.tag}>By Ajeshwar</span>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    background: '#ffffff',
    borderBottom: '1px solid #e8f5e9',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 1px 12px rgba(0,0,0,0.06)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
  },
  emoji: { fontSize: '1.4rem' },
  logoText: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '1.2rem',
    color: '#00b450',
    fontWeight: '700',
    letterSpacing: '-0.02em',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    flexWrap: 'wrap',
  },
  badge: {
    fontFamily: 'monospace',
    fontSize: '0.68rem',
    color: '#00b450',
    background: '#f0faf4',
    border: '1px solid #c8ecd6',
    padding: '0.25rem 0.7rem',
    borderRadius: '4px',
    letterSpacing: '0.05em',
    animation: 'pulse 2s ease-in-out infinite',
  },
  tag: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.68rem',
    color: '#888',
    background: '#f8f8f8',
    border: '1px solid #eee',
    padding: '0.25rem 0.7rem',
    borderRadius: '4px',
  },
};

export default Navbar;