import React from 'react';
import './Loader.css';

export const Loader: React.FC = () => (
  <div className="loader">
    <p>Loading</p>

    <div className="loader__ring">
      <span></span>
    </div>
  </div>
);
