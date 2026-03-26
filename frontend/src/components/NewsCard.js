import React from 'react';

function NewsCard({ article, index }) {
  return (
    <div style={styles.card}>
      {(article.image || article.urlToImage) && (
        <img
          src={article.image || article.urlToImage}
          alt={article.title}
          style={styles.image}
          onError={(e) => e.target.style.display = 'none'}
        />
      )}

      <div style={styles.body}>
        <div style={styles.header}>
          <span style={styles.index}>#{String(index + 1).padStart(2, '0')}</span>
          <span style={styles.source}>
            {article.source?.name || 'News'}
          </span>
        </div>

        <h3 style={styles.title}>{article.title}</h3>

        {article.description && (
          <p style={styles.desc}>{article.description}</p>
        )}

        <div style={styles.footer}>
          <span style={styles.date}>
            📅 {new Date(article.publishedAt).toLocaleDateString()}
          </span>
          
            href={article.url}
            target="_blank"
            rel="noreferrer"
            style={styles.link}
        </div>
      </div>
    </div>

)}

const styles = {
  card: {
    background: '#ffffff',
    border: '1px solid #f0f0f0',
    borderRadius: '10px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
  },
  body: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
    flex: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
  },
  index: {
    fontFamily: 'monospace',
    fontSize: '0.62rem',
    color: '#ff6d00',
    fontWeight: '600',
  },
  source: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.62rem',
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
  title: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.88rem',
    fontWeight: '600',
    color: '#e50d0d',
    lineHeight: 1.5,
  },
  desc: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.75rem',
    color: '#888',
    lineHeight: 1.6,
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: '0.6rem',
    borderTop: '1px solid #f5f5f5',
  },
  date: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.65rem',
    color: '#bbb',
  },
  link: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.72rem',
    color: '#00b450',
    textDecoration: 'none',
    fontWeight: '600',
  },
};

export default NewsCard;