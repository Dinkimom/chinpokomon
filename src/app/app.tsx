import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from '../shared/components/header';
import { NotFound } from '../shared/components/notFound';
import { Pokemon } from './pokemon';
import { Pokemons } from './pokemons/';
import { Ability } from './ability';

export const App = () => {
  return (
    <div className='app'>
      <Router>
        <Header />
        <Switch>
          <Route exact={true} path='/' component={Pokemons} />
          <Route exact={true} path='/pokemon/:id' component={Pokemon} />
          <Route
            exact={true}
            path='/pokemon/:pokemon_id/ability/:ability_name'
            component={Ability}
          />
          <Route path='*' component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};
