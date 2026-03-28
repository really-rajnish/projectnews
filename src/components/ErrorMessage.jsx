import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-container" role="alert">
      <div className="error-icon">⚠️</div>
      <h3 className="error-title">Something went wrong</h3>
      <p className="error-message">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="retry-button">
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;