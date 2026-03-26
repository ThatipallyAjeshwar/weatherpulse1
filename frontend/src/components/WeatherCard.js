import React from 'react';

function WeatherCard({ data }) {
  if (!data) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <div style={styles.card}>
      <div style={styles.top}>
        <div>
          <h2 style={styles.city}>
            {data.name}, {data.sys.country}
          </h2>
          <p style={styles.desc}>{data.weather[0].description}</p>
        </div>
        <img src={iconUrl} alt="icon" style={styles.icon} />
      </div>

      <div style={styles.tempRow}>
        <span style={styles.temp}>{Math.round(data.main.temp)}°C</span>
        <span style={styles.feels}>
          Feels like {Math.round(data.main.feels_like)}°C
        </span>
      </div>

      <div style={styles.grid}>
        <div style={styles.stat}>
          <span style={styles.statLabel}>💧 Humidity</span>
          <span style={styles.statVal}>{data.main.humidity}%</span>
        </div>
        <div style={styles.stat}>
          <span style={styles.statLabel}>💨 Wind</span>
          <span style={styles.statVal}>{data.wind.speed} m/s</span>
        </div>
        <div style={styles.stat}>
          <span style={styles.statLabel}>🌡️ Pressure</span>
          <span style={styles.statVal}>{data.main.pressure} hPa</span>
        </div>
        <div style={styles.stat}>
          <span style={styles.statLabel}>🌡️ Min / Max</span>
          <span style={styles.statVal}>
            {Math.round(data.main.temp_min)}° / {Math.round(data.main.temp_max)}°
          </span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: '#ffffff',
    border: '1px solid #e8f5e9',
    borderRadius: '12px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
    animation: 'fadeIn 0.5s ease forwards',
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  city: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#00b450',
    marginBottom: '0.3rem',
  },
  desc: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.82rem',
    color: '#888',
    textTransform: 'capitalize',
  },
  icon: { width: '70px', height: '70px' },
  tempRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '0.8rem',
  },
  temp: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '3rem',
    fontWeight: '700',
    color: '#1a1a1a',
  },
  feels: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.78rem',
    color: '#aaa',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.8rem',
    borderTop: '1px solid #f0f4f0',
    paddingTop: '1rem',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
    background: '#f9fafb',
    padding: '0.6rem 0.8rem',
    borderRadius: '8px',
  },
  statLabel: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.62rem',
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  statVal: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#333',
  },
};

export default WeatherCard;