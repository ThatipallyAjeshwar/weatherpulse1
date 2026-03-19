import React from 'react';

function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        🌦️ <span style={styles.logoText}>WeatherPulse</span>
      </div>
      <div style={styles.links}>
        <span style={styles.badge}>● LIVE</span>
        <span style={styles.tag}>Full Stack App</span>
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
    background: '#111111',
    borderBottom: '1px solid rgba(0,230,118,0.2)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.3rem',
  },
  logoText: {
    fontFamily: 'monospace',
    color: '#00e676',
    fontWeight: 'bold',
    letterSpacing: '0.05em',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
  },
  badge: {
    fontFamily: 'monospace',
    fontSize: '0.72rem',
    color: '#00e676',
    border: '1px solid rgba(0,230,118,0.4)',
    padding: '0.2rem 0.6rem',
  },
  tag: {
    fontFamily: 'monospace',
    fontSize: '0.68rem',
    color: '#555',
    border: '1px solid rgba(255,255,255,0.08)',
    padding: '0.2rem 0.6rem',
  },
};

export default Navbar;