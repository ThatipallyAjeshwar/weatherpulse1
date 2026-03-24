import React from 'react';

function NewsCard({ article, index }) {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <span style={styles.index}>#{String(index + 1).padStart(2, '0')}</span>
        <span style={styles.source}>{article.source?.name || 'Unknown'}</span>
      </div>

      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          style={styles.image}
          onError={(e) => e.target.style.display = 'none'}
        />
      )}

      <h3 style={styles.title}>{article.title}</h3>

      {article.description && (
        <p style={styles.desc}>{article.description}</p>
      )}

      <div style={styles.footer}>
        <span style={styles.date}>
          {new Date(article.publishedAt).toLocaleDateString()}
        </span>
        
          href={article.url}
          target="_blank"
          rel="noreferrer"
          style={styles.link}
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: '#111111',
    border: '1px solid rgba(255,255,255,0.06)',
    padding: '1.2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    transition: 'border-color 0.2s',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
  },
  index: {
    fontFamily: 'monospace',
    fontSize: '0.65rem',
    color: '#ff6d00',
  },
  source: {
    fontFamily: 'monospace',
    fontSize: '0.62rem',
    color: '#555',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  image: {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
    borderRadius: '2px',
  },
  title: {
    fontFamily: 'monospace',
    fontSize: '0.85rem',
    color: '#e0e0e0',
    lineHeight: 1.5,
  },
  desc: {
    fontFamily: 'monospace',
    fontSize: '0.72rem',
    color: '#555',
    lineHeight: 1.6,
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: '0.5rem',
    borderTop: '1px solid rgba(255,255,255,0.04)',
  },
  date: {
    fontFamily: 'monospace',
    fontSize: '0.62rem',
    color: '#444',
  },
  link: {
    fontFamily: 'monospace',
    fontSize: '0.68rem',
    color: '#00e676',
    textDecoration: 'none',
    letterSpacing: '0.05em',
  },
};

export default NewsCard;