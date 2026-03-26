import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import NewsCard from '../components/NewsCard';
import Loader from '../components/Loader';
import {
  getWeather,
  getTopHeadlines,
  searchNews,
  saveCity,
  getAllCities,
  deleteCity,
  toggleFavourite,
} from '../services/api';

function Home() {
  const [weather, setWeather]     = useState(null);
  const [news, setNews]           = useState([]);
  const [cities, setCities]       = useState([]);
  const [loading, setLoading]     = useState(false);
  const [newsLoad, setNewsLoad]   = useState(true);
  const [error, setError]         = useState('');
  const [saveMsg, setSaveMsg]     = useState('');
  const [activeTab, setActiveTab] = useState('headlines');

  useEffect(() => {
    loadHeadlines();
    loadCities();
  }, []);

  const loadHeadlines = async () => {
    try {
      setNewsLoad(true);
      const data = await getTopHeadlines();
      setNews(data.articles || []);
    } catch (err) {
      console.error('News error:', err);
    } finally {
      setNewsLoad(false);
    }
  };

  const loadTabNews = async (keyword, tab) => {
    try {
      setActiveTab(tab);
      setNewsLoad(true);
      const data = await searchNews(keyword);
      setNews(data.articles || []);
    } catch (err) {
      console.error('Tab news error:', err);
    } finally {
      setNewsLoad(false);
    }
  };

  const loadCities = async () => {
    try {
      const data = await getAllCities();
      setCities(data);
    } catch (err) {
      console.error('Cities error:', err);
    }
  };

  const handleSearch = async (city) => {
    try {
      setLoading(true);
      setError('');
      setSaveMsg('');
      const data = await getWeather(city);
      setWeather(data);
    } catch (err) {
      setError(`City "${city}" not found. Check spelling.`);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCity = async () => {
    if (!weather) return;
    try {
      await saveCity({
        name: weather.name,
        country: weather.sys.country,
        favourite: false,
      });
      setSaveMsg(`✅ ${weather.name} saved successfully!`);
      loadCities();
    } catch (err) {
      setSaveMsg(`⚠️ ${weather.name} is already saved.`);
    }
  };

  const handleDelete = async (id) => {
    await deleteCity(id);
    loadCities();
  };

  const handleFavourite = async (id) => {
    await toggleFavourite(id);
    loadCities();
  };

  return (
    <div style={styles.page}>

      {/* Search */}
      <SearchBar onSearch={handleSearch} loading={loading} />

      {/* Error */}
      {error && <p style={styles.error}>⚠️ {error}</p>}

      <div style={styles.layout}>

        {/* LEFT — Weather */}
        <div style={styles.left}>
          <p style={styles.sectionLabel}>🌤 Weather</p>

          {loading && <Loader />}

          {!loading && weather && (
            <div>
              <WeatherCard data={weather} />
              <button onClick={handleSaveCity} style={styles.saveBtn}>
                ⭐ Save City
              </button>
              {saveMsg && <p style={styles.saveMsg}>{saveMsg}</p>}
            </div>
          )}

          {!loading && !weather && !error && (
            <div style={styles.empty}>
              <p style={styles.emptyText}>
                Search a city to see weather 🌍
              </p>
            </div>
          )}

          {/* Saved Cities */}
          {cities.length > 0 && (
            <div style={styles.citiesBox}>
              <p style={styles.citiesLabel}>
                📌 Saved Cities ({cities.length})
              </p>
              {cities.map(city => (
                <div key={city.id} style={styles.cityRow}>
                  <span
                    style={styles.cityName}
                    onClick={() => handleSearch(city.name)}
                  >
                    {city.favourite ? '⭐' : '○'} {city.name}, {city.country}
                  </span>
                  <div style={styles.cityActions}>
                    <button
                      style={styles.iconBtn}
                      onClick={() => handleFavourite(city.id)}
                      title="Favourite"
                    >★</button>
                    <button
                      style={{ ...styles.iconBtn, color: '#e53935' }}
                      onClick={() => handleDelete(city.id)}
                      title="Delete"
                    >✕</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT — News */}
        <div style={styles.right}>

          {/* Tabs */}
          <div style={styles.tabs}>
            <button
              style={activeTab === 'headlines'
                ? { ...styles.tab, ...styles.tabActive }
                : styles.tab}
              onClick={() => { setActiveTab('headlines'); loadHeadlines(); }}
            >
              🗞 Top Headlines
            </button>
            <button
              style={activeTab === 'technology'
                ? { ...styles.tab, ...styles.tabActive }
                : styles.tab}
              onClick={() => loadTabNews('technology', 'technology')}
            >
              💻 Technology
            </button>
            <button
              style={activeTab === 'sports'
                ? { ...styles.tab, ...styles.tabActive }
                : styles.tab}
              onClick={() => loadTabNews('sports', 'sports')}
            >
              ⚽ Sports
            </button>
            <button
              style={activeTab === 'business'
                ? { ...styles.tab, ...styles.tabActive }
                : styles.tab}
              onClick={() => loadTabNews('business', 'business')}
            >
              💼 Business
            </button>
          </div>

          {newsLoad && <Loader />}

          {!newsLoad && news.length === 0 && (
            <div style={styles.empty}>
              <p style={styles.emptyText}>
                No news found. Check your GNews API key 🔑
              </p>
            </div>
          )}

          {!newsLoad && news.length > 0 && (
            <div style={styles.newsList}>
              {news.slice(0, 9).map((article, i) => (
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
    background: '#f5f7f5',
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '340px 1fr',
    minHeight: 'calc(100vh - 120px)',
  },
  left: {
    background: '#f9fbf9',
    padding: '2rem 1.5rem',
    borderRight: '1px solid #e8f0e8',
  },
  right: {
    background: '#f5f7f5',
    padding: '2rem',
  },
  sectionLabel: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.75rem',
    color: '#ff6d00',
    fontWeight: '700',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: '1.2rem',
  },
  error: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.82rem',
    color: '#e53935',
    padding: '0.9rem 1.5rem',
    background: '#fff5f5',
    border: '1px solid #ffcdd2',
    borderRadius: '8px',
    margin: '1rem 2rem',
  },
  empty: {
    padding: '2.5rem 1rem',
    border: '2px dashed #e0ebe0',
    borderRadius: '10px',
    textAlign: 'center',
    background: '#fafcfa',
  },
  emptyText: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.85rem',
    color: '#bbb',
  },
  saveBtn: {
    width: '100%',
    marginTop: '1rem',
    padding: '0.75rem',
    background: '#f0faf4',
    border: '1.5px solid #c8ecd6',
    borderRadius: '8px',
    color: '#00b450',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.8rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  saveMsg: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.72rem',
    color: '#00b450',
    marginTop: '0.5rem',
    padding: '0.4rem 0.8rem',
    background: '#f0faf4',
    borderRadius: '6px',
  },
  citiesBox: {
    marginTop: '2rem',
    borderTop: '1px solid #eef2ee',
    paddingTop: '1.2rem',
  },
  citiesLabel: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.68rem',
    color: '#ff6d00',
    fontWeight: '700',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: '0.8rem',
  },
  cityRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.6rem 0.8rem',
    borderRadius: '8px',
    marginBottom: '0.3rem',
    background: '#ffffff',
    border: '1px solid #f0f0f0',
  },
  cityName: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.8rem',
    color: '#333',
    cursor: 'pointer',
    fontWeight: '500',
  },
  cityActions: {
    display: 'flex',
    gap: '0.3rem',
  },
  iconBtn: {
    background: 'transparent',
    border: 'none',
    color: '#ff6d00',
    cursor: 'pointer',
    fontSize: '0.9rem',
    padding: '0.2rem 0.4rem',
    borderRadius: '4px',
  },
  tabs: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
  },
  tab: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.75rem',
    fontWeight: '500',
    padding: '0.5rem 1.1rem',
    background: '#ffffff',
    color: '#888',
    border: '1.5px solid #e8e8e8',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  tabActive: {
    color: '#00b450',
    borderColor: '#00b450',
    background: '#f0faf4',
    fontWeight: '600',
  },
  newsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
    gap: '1rem',
  },
};

export default Home;