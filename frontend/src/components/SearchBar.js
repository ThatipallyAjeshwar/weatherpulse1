import React, { useState } from 'react';

function SearchBar({ onSearch, loading }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) onSearch(city.trim());
  };

  return (
    <div style={styles.wrap}>
      <p style={styles.label}>Search City</p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name... (e.g. Hyderabad)"
          style={styles.input}
          disabled={loading}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Searching...' : '🔍 Search'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  wrap: {
    padding: '1.5rem 2rem',
    background: '#ffffff',
    borderBottom: '1px solid #eef2ee',
  },
  label: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.72rem',
    color: '#ff6d00',
    fontWeight: '600',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: '0.7rem',
  },
  form: {
    display: 'flex',
    gap: '0.8rem',
    flexWrap: 'wrap',
  },
  input: {
    flex: 1,
    minWidth: '250px',
    padding: '0.75rem 1.2rem',
    background: '#f9fafb',
    border: '1.5px solid #e2e8e2',
    borderRadius: '8px',
    color: '#1a1a1a',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.9rem',
    transition: 'all 0.2s',
  },
  button: {
    padding: '0.75rem 2rem',
    background: 'linear-gradient(135deg, #00c853, #00b450)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'pointer',
    letterSpacing: '0.03em',
    boxShadow: '0 4px 12px rgba(0,180,80,0.25)',
    transition: 'all 0.2s',
  },
};

export default SearchBar;