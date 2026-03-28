import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { newsApi } from '../api/newsApi';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const ArticleReader = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const data = await newsApi.getArticleById(articleId);
        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return <Loader message="Loading article..." />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
  if (!article) return <ErrorMessage message="Article not found" />;

  return (
    <div className="article-reader">
      <button onClick={() => navigate(-1)} className="back-button">← Back</button>

      <article className="full-article">
        <header className="article-header">
          <h1 className="article-title">{article.title}</h1>
          <div className="article-meta">
            <span>{article.source}</span>
            <span>By {article.author}</span>
            <time>{formatDate(article.publishedAt)}</time>
          </div>
        </header>

        {article.imageUrl && article.imageUrl !== 'https://via.placeholder.com/400x200?text=No+Image' && (
          <figure>
            <img src={article.imageUrl} alt={article.title} className="article-image" />
          </figure>
        )}

        <div className="article-body">
          <p className="article-lead">{article.description}</p>
          <div className="article-content">
            <p>{article.content}</p>
          </div>
        </div>

        <footer className="article-footer">
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="original-link">
            Read Original ↗
          </a>
        </footer>
      </article>
    </div>
  );
};

export default ArticleReader;