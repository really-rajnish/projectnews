import React from 'react';

const Loader = ({ message = 'Loading...' }) => {
  return (
    <div className="loader-container" role="status">
      <div className="loader-spinner"></div>
      <p className="loader-message">{message}</p>
    </div>
  );
};

export default Loader;