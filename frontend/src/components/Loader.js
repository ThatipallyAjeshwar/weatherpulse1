import React from 'react';

function Loader() {
  return (
    <div style={styles.wrap}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>Loading...</p>
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
    width: '36px',
    height: '36px',
    border: '3px solid #e8f5e9',
    borderTop: '3px solid #00b450',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  text: {
    fontFamily: 'Inter, sans-serif',
    color: '#aaa',
    fontSize: '0.82rem',
  },
};

export default Loader;