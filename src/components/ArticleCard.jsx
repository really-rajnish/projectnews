import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = memo(({ article }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hours ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <article className="article-card">
      <Link to={`/article/${article.id}`} className="article-link">
        <div className="article-image-wrapper">
          <img 
            src={article.imageUrl} 
            alt="" 
            className="article-image"
            loading="lazy"
            onError={(e) => e.target.src = 'https://via.placeholder.com/400x200?text=No+Image'}
          />
        </div>
        <div className="article-content">
          <h3 className="article-title">{article.title}</h3>
          <p className="article-description">{article.description}</p>
          <div className="article-meta">
            <span className="article-source">{article.source}</span>
            <span className="article-time">{formatDate(article.publishedAt)}</span>
          </div>
        </div>
      </Link>
    </article>
  );
});

ArticleCard.displayName = 'ArticleCard';
export default ArticleCard;