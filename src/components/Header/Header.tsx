import React from 'react';
import './Header.css';
import pokeball from './pokeball.png';

export const Header: React.FC = () => (
  <div className="header">
    <h1>
      Pokedesk <span>mini</span>
    </h1>

    <img src={pokeball} alt="pokeball" width="30px" height="30px" />
  </div>
);
