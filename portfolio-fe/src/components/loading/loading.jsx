import React from 'react';
import './loading.scss';

const Loading = ({ size = 'medium', text = 'Đang tải...', overlay = false }) => {
  return (
    <div className={`loading-container ${overlay ? 'loading-overlay' : ''}`}>
      <div className="loading-content">
        <div className={`loading-spinner ${size}`}>
          <div className="loading-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        {text && <p className="loading-text">{text}</p>}
      </div>
    </div>
  );
};

export default Loading;