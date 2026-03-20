import React, { useState } from 'react';

function SearchBar({ onSearch, loading }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <div style={styles.wrap}>
      <p style={styles.label}>&gt; search_city.exe</p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name... (e.g. Hyderabad)"
          style={styles.input}
          disabled={loading}
        />
        <button
          type="submit"
          style={styles.button}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  wrap: {
    padding: '2rem',
    borderBottom: '1px solid rgba(0,230,118,0.1)',
  },
  label: {
    fontFamily: 'monospace',
    fontSize: '0.68rem',
    color: '#ff6d00',
    marginBottom: '0.8rem',
    letterSpacing: '0.1em',
  },
  form: {
    display: 'flex',
    gap: '0.8rem',
    flexWrap: 'wrap',
  },
  input: {
    flex: 1,
    minWidth: '250px',
    padding: '0.75rem 1rem',
    background: '#161616',
    border: '1px solid rgba(0,230,118,0.2)',
    color: '#e0e0e0',
    fontFamily: 'monospace',
    fontSize: '0.85rem',
    outline: 'none',
  },
  button: {
    padding: '0.75rem 2rem',
    background: '#00e676',
    color: '#000',
    border: 'none',
    fontFamily: 'monospace',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    letterSpacing: '0.1em',
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
};

export default SearchBar;