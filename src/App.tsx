import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { NotFound } from './components/NotFound/NotFound';
import { Ability } from './features/ability/Ability';
import { Pokemon } from './features/pokemon/Pokemon';
import { Pokemons } from './features/pokemons/Pokemons';
import { PokeClient } from './services/PokeClient';

export const pokeClient = new PokeClient();

const App: React.FC = () => {
  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route exact={true} path="/" component={Pokemons} />
          <Route exact={true} path="/pokemon/:id" component={Pokemon} />
          <Route
            exact={true}
            path="/pokemon/:pokemon_id/ability/:ability_name"
            component={Ability}
          />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
