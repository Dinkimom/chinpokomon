import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from '../shared/components/header';
import { Pokemon } from './pokemon';
import { Pokemons } from './pokemons/';

export const App = () => {
  return (
    <div className='app'>
      <Router>
        <Header />
        <Switch>
          <Route exact={true} path='/' component={Pokemons} />
          <Route exact={true} path='/pokemon/:id' component={Pokemon} />
        </Switch>
      </Router>
    </div>
  );
};
