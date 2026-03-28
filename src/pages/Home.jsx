import React, { useState, useEffect } from 'react';
import { newsApi } from '../api/newsApi';
import CategoryCard from '../components/CategoryCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await newsApi.getCategoriesWithCounts();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <Loader message="Loading categories..." />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="home-page">
      <section className="hero-section">
        <h1 className="hero-title">Welcome to NewsAggregator</h1>
        <p className="hero-subtitle">Real-time news from trusted sources</p>
      </section>

      <section className="categories-section">
        <h2 className="section-title">Browse by Category</h2>
        <div className="categories-grid">
          {categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;