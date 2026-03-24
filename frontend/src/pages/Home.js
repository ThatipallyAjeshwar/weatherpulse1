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
      setError(`// error: City "${city}" not found. Check spelling.`);
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
      setSaveMsg(`// ${weather.name} saved successfully!`);
      loadCities();
    } catch (err) {
      setSaveMsg(`// ${weather.name} is already saved.`);
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
      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.layout}>

        {/* ── LEFT: Weather ── */}
        <div style={styles.left}>
          <p style={styles.sectionLabel}>// weather.exe</p>

          {loading && <Loader />}

          {!loading && weather && (
            <>
              <WeatherCard data={weather} />
              <button onClick={handleSaveCity} style={styles.saveBtn}>
                ⭐ Save City
              </button>
              {saveMsg && <p style={styles.saveMsg}>{saveMsg}</p>}
            </>
          )}

          {!loading && !weather && !error && (
            <div style={styles.empty}>
              <p style={styles.emptyText}>
                &gt; Search a city to see weather data_
              </p>
            </div>
          )}

          {/* Saved Cities */}
          {cities.length > 0 && (
            <div style={styles.citiesBox}>
              <p style={styles.citiesLabel}>
                // saved_cities [{cities.length}]
              </p>
              {cities.map(city => (
                <div key={city.id} style={styles.cityRow}>
                  <span
                    style={styles.cityName}
                    onClick={() => handleSearch(city.name)}
                  >
                    {city.favourite ? '⭐' : '○'} {city.name},{' '}
                    {city.country}
                  </span>
                  <div style={styles.cityActions}>
                    <button
                      style={styles.iconBtn}
                      onClick={() => handleFavourite(city.id)}
                      title="Toggle Favourite"
                    >★</button>
                    <button
                      style={{ ...styles.iconBtn, color: '#ff5252' }}
                      onClick={() => handleDelete(city.id)}
                      title="Delete"
                    >✕</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT: News ── */}
        <div style={styles.right}>

          {/* News Tabs */}
          <div style={styles.tabs}>
            <button
              style={activeTab === 'headlines'
                ? { ...styles.tab, ...styles.tabActive }
                : styles.tab}
              onClick={() => {
                setActiveTab('headlines');
                loadHeadlines();
              }}
            >
              Top Headlines
            </button>
            <button
              style={activeTab === 'technology'
                ? { ...styles.tab, ...styles.tabActive }
                : styles.tab}
              onClick={() => loadTabNews('technology', 'technology')}
            >
              Technology
            </button>
            <button
              style={activeTab === 'sports'
                ? { ...styles.tab, ...styles.tabActive }
                : styles.tab}
              onClick={() => loadTabNews('sports', 'sports')}
            >
              Sports
            </button>
            <button
              style={activeTab === 'business'
                ? { ...styles.tab, ...styles.tabActive }
                : styles.tab}
              onClick={() => loadTabNews('business', 'business')}
            >
              Business
            </button>
          </div>

          {newsLoad && <Loader />}

          {!newsLoad && news.length === 0 && (
            <div style={styles.empty}>
              <p style={styles.emptyText}>
                &gt; No news found. Check API key in api.js_
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
    background: '#0d0d0d',
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '340px 1fr',
    gap: '1px',
    background: 'rgba(0,230,118,0.08)',
    minHeight: 'calc(100vh - 120px)',
  },
  left: {
    background: '#0d0d0d',
    padding: '2rem 1.5rem',
    borderRight: '1px solid rgba(0,230,118,0.1)',
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
  saveBtn: {
    width: '100%',
    marginTop: '1rem',
    padding: '0.7rem',
    background: 'transparent',
    border: '1px solid rgba(0,230,118,0.3)',
    color: '#00e676',
    fontFamily: 'monospace',
    fontSize: '0.75rem',
    cursor: 'pointer',
    letterSpacing: '0.1em',
  },
  saveMsg: {
    fontFamily: 'monospace',
    fontSize: '0.68rem',
    color: '#00e676',
    marginTop: '0.5rem',
    padding: '0.4rem 0.6rem',
    background: 'rgba(0,230,118,0.05)',
  },
  citiesBox: {
    marginTop: '2rem',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    paddingTop: '1.2rem',
  },
  citiesLabel: {
    fontFamily: 'monospace',
    fontSize: '0.62rem',
    color: '#ff6d00',
    letterSpacing: '0.1em',
    marginBottom: '0.8rem',
  },
  cityRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.6rem 0.5rem',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
  },
  cityName: {
    fontFamily: 'monospace',
    fontSize: '0.75rem',
    color: '#e0e0e0',
    cursor: 'pointer',
  },
  cityActions: {
    display: 'flex',
    gap: '0.4rem',
  },
  iconBtn: {
    background: 'transparent',
    border: 'none',
    color: '#ff6d00',
    cursor: 'pointer',
    fontSize: '0.85rem',
    padding: '0.2rem 0.4rem',
  },
  tabs: {
    display: 'flex',
    gap: '0.3rem',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    paddingBottom: '0.8rem',
  },
  tab: {
    fontFamily: 'monospace',
    fontSize: '0.68rem',
    letterSpacing: '0.08em',
    padding: '0.4rem 1rem',
    background: 'transparent',
    color: '#555',
    border: '1px solid rgba(255,255,255,0.07)',
    cursor: 'pointer',
    textTransform: 'uppercase',
    transition: 'all 0.2s',
  },
  tabActive: {
    color: '#00e676',
    borderColor: 'rgba(0,230,118,0.3)',
    background: 'rgba(0,230,118,0.05)',
  },
  newsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '1px',
    background: 'rgba(255,255,255,0.04)',
  },
};

export default Home;