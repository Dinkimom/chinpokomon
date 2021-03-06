import { AbilityReducer } from './../app/ability/reducer';
import { PokemonReducer } from './../app/pokemon/reducer';
import { combineReducers } from 'redux';
import { PokemonsReducer } from '../app/pokemons/reducer';
import { IRootState } from './state';

export const rootReducer = combineReducers<IRootState>({
  pokemons: PokemonsReducer.Create(),
  pokemon: PokemonReducer.Create(),
  ability: AbilityReducer.Create(),
});
