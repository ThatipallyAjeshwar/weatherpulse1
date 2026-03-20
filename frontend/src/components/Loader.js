import React from 'react';

function Loader() {
  return (
    <div style={styles.wrap}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>// fetching data...</p>
    </div>
  );
}

const styles = {
  wrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem',
    gap: '1rem',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid rgba(0,230,118,0.1)',
    borderTop: '3px solid #00e676',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  text: {
    fontFamily: 'monospace',
    color: '#555',
    fontSize: '0.8rem',
  },
};

export default Loader;