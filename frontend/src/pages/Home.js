import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import NewsCard from '../components/NewsCard';
import Loader from '../components/Loader';
import { getWeather, getTopHeadlines } from '../services/api';

function Home() {
  const [weather, setWeather]   = useState(null);
  const [news, setNews]         = useState([]);
  const [loading, setLoading]   = useState(false);
  const [newsLoad, setNewsLoad] = useState(true);
  const [error, setError]       = useState('');

  // Load default news on startup
  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setNewsLoad(true);
      const data = await getTopHeadlines('in');
      setNews(data.articles || []);
    } catch (err) {
      console.error('News error:', err);
    } finally {
      setNewsLoad(false);
    }
  };

  const handleSearch = async (city) => {
    try {
      setLoading(true);
      setError('');
      const data = await getWeather(city);
      setWeather(data);
    } catch (err) {
      setError(`// error: City "${city}" not found. Check spelling.`);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>

      {/* Search */}
      <SearchBar onSearch={handleSearch} loading={loading} />

      {/* Error */}
      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.layout}>

        {/* LEFT — Weather */}
        <div style={styles.left}>
          <p style={styles.sectionLabel}>// weather.exe</p>
          {loading && <Loader />}
          {!loading && weather && <WeatherCard data={weather} />}
          {!loading && !weather && !error && (
            <div style={styles.empty}>
              <p style={styles.emptyText}>
                &gt; Search a city to see weather data_
              </p>
            </div>
          )}
        </div>

        {/* RIGHT — News */}
        <div style={styles.right}>
          <p style={styles.sectionLabel}>// news_feed.exe</p>
          {newsLoad && <Loader />}
          {!newsLoad && (
            <div style={styles.newsList}>
              {news.slice(0, 6).map((article, i) => (
                <NewsCard key={i} article={article} index={i} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0d0d0d',
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '1px',
    background: 'rgba(0,230,118,0.1)',
    minHeight: 'calc(100vh - 140px)',
  },
  left: {
    background: '#0d0d0d',
    padding: '2rem',
  },
  right: {
    background: '#0d0d0d',
    padding: '2rem',
  },
  sectionLabel: {
    fontFamily: 'monospace',
    fontSize: '0.65rem',
    color: '#ff6d00',
    letterSpacing: '0.15em',
    marginBottom: '1.2rem',
  },
  error: {
    fontFamily: 'monospace',
    fontSize: '0.78rem',
    color: '#ff5252',
    padding: '1rem 2rem',
    background: 'rgba(255,82,82,0.05)',
    borderLeft: '2px solid #ff5252',
    margin: '1rem 2rem',
  },
  empty: {
    padding: '3rem 1rem',
    border: '1px dashed rgba(0,230,118,0.1)',
    textAlign: 'center',
  },
  emptyText: {
    fontFamily: 'monospace',
    fontSize: '0.8rem',
    color: '#333',
  },
  newsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1px',
    background: 'rgba(255,255,255,0.04)',
  },
};

export default Home;