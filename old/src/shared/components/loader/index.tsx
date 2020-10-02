import React from 'react';
import './index.css';

export const Loader = () => (
  <div className='loader'>
    <p>Loading</p>

    <div className='loader__ring'>
      <span></span>
    </div>
  </div>
);
