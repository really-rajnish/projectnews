import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/category/${category.id}`} className="category-card">
      <div className="category-icon">{category.icon}</div>
      <h3 className="category-name">{category.name}</h3>
      <span className="article-count">
        {category.articleCount.toLocaleString()} articles
      </span>
    </Link>
  );
};

export default CategoryCard;