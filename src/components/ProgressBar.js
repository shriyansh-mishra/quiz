import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label={`Quiz progress: ${Math.round(progress)}%`}
        />
      </div>
      <span className="progress-text">
        {Math.round(progress)}%
      </span>
    </div>
  );
};

export default ProgressBar;

