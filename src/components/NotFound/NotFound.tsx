import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export const NotFound: React.FC = () => (
  <div className="not-found">
    <p>
      404
      <br />
      Page not found
    </p>
    <Link to="/">Return Home</Link>
  </div>
);
