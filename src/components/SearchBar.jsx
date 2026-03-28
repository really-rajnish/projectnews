import React, { useState } from 'react';

const SearchBar = ({ onSearch, placeholder = 'Search articles...' }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar" role="search">
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="search-input"
          aria-label="Search articles"
        />
        {searchTerm && (
          <button type="button" onClick={handleClear} className="search-clear">×</button>
        )}
        <button type="submit" className="search-button">🔍</button>
      </div>
    </form>
  );
};

export default SearchBar;