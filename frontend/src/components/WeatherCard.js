import React from 'react';

function WeatherCard({ data }) {
  if (!data) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <span style={styles.tag}>// weather.data</span>
      </div>

      <div style={styles.top}>
        <div>
          <h2 style={styles.city}>
            {data.name}, {data.sys.country}
          </h2>
          <p style={styles.desc}>
            {data.weather[0].description}
          </p>
        </div>
        <img src={iconUrl} alt="weather icon" style={styles.icon} />
      </div>

      <div style={styles.tempRow}>
        <span style={styles.temp}>
          {Math.round(data.main.temp)}°C
        </span>
        <span style={styles.feels}>
          Feels like {Math.round(data.main.feels_like)}°C
        </span>
      </div>

      <div style={styles.grid}>
        <div style={styles.stat}>
          <span style={styles.statLabel}>Humidity</span>
          <span style={styles.statVal}>{data.main.humidity}%</span>
        </div>
        <div style={styles.stat}>
          <span style={styles.statLabel}>Wind</span>
          <span style={styles.statVal}>{data.wind.speed} m/s</span>
        </div>
        <div style={styles.stat}>
          <span style={styles.statLabel}>Pressure</span>
          <span style={styles.statVal}>{data.main.pressure} hPa</span>
        </div>
        <div style={styles.stat}>
          <span style={styles.statLabel}>Min / Max</span>
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
    background: '#111111',
    border: '1px solid rgba(0,230,118,0.15)',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  header: { marginBottom: '0.5rem' },
  tag: {
    fontFamily: 'monospace',
    fontSize: '0.62rem',
    color: '#ff6d00',
    letterSpacing: '0.1em',
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  city: {
    fontFamily: 'monospace',
    fontSize: '1.4rem',
    color: '#00e676',
    marginBottom: '0.3rem',
  },
  desc: {
    fontFamily: 'monospace',
    fontSize: '0.8rem',
    color: '#888',
    textTransform: 'capitalize',
  },
  icon: { width: '70px', height: '70px' },
  tempRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '1rem',
  },
  temp: {
    fontFamily: 'monospace',
    fontSize: '3rem',
    color: '#e0e0e0',
    fontWeight: 'bold',
  },
  feels: {
    fontFamily: 'monospace',
    fontSize: '0.78rem',
    color: '#555',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.8rem',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    paddingTop: '1rem',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem',
  },
  statLabel: {
    fontFamily: 'monospace',
    fontSize: '0.6rem',
    color: '#555',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  statVal: {
    fontFamily: 'monospace',
    fontSize: '0.9rem',
    color: '#e0e0e0',
  },
};

export default WeatherCard;