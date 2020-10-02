import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

export const NotFound = () => (
  <div className='not-found'>
    <p>
      404
      <br />
      Page not found
    </p>
    <Link to='/'>Return Home</Link>
  </div>
);
