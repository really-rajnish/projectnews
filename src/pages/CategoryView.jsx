import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { newsApi, categories } from '../api/newsApi';
import ArticleCard from '../components/ArticleCard';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const CategoryView = () => {
  const { categoryId } = useParams();
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const category = categories.find(c => c.id === categoryId);

  const fetchArticles = useCallback(async (pageNum = 1) => {
    try {
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);

      const data = await newsApi.getArticlesByCategory(categoryId, pageNum);
      
      setArticles(prev => pageNum === 1 ? data.articles : [...prev, ...data.articles]);
      setHasMore(data.hasMore);
      setPage(pageNum);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchArticles(1);
  }, [categoryId, fetchArticles]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(articles);
    }
  }, [searchTerm, articles]);

  if (loading) return <Loader message={`Loading ${category?.name} news...`} />;
  if (error) return <ErrorMessage message={error} onRetry={() => fetchArticles(1)} />;

  return (
    <div className="category-view">
      <div className="category-header">
        <h1 className="category-title">
          <span className="category-icon">{category?.icon}</span>
          {category?.name} News
        </h1>
        <SearchBar onSearch={setSearchTerm} placeholder={`Search in ${category?.name}...`} />
      </div>

      {filteredArticles.length > 0 ? (
        <>
          <div className="articles-grid">
            {filteredArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          
          {hasMore && !searchTerm && (
            <div className="load-more-container">
              <button 
                onClick={() => fetchArticles(page + 1)} 
                className="load-more-button"
                disabled={loadingMore}
              >
                {loadingMore ? 'Loading...' : 'Load More Articles'}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="no-results">
          <p>No articles found</p>
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="clear-search-button">
              Clear Search
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryView;