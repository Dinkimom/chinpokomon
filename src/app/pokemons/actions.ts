import * as types from './types';
import { PokemonDTO } from '../../shared/dto/PokemonDTO';

export const pokemonsActions = {
  loadData: (payload?: { [key: string]: any }) => ({
    type: types.POKEMONS_LOAD_DATA,
    payload,
  }),

  dataLoaded: (payload: PokemonDTO[]) => ({
    type: types.POKEMONS_DATA_LOADED,
    payload,
  }),

  setFetching: (payload: boolean) => ({
    type: types.POKEMONS_SET_FETCHING,
    payload,
  }),

  setQuery: (payload: string) => ({
    type: types.POKEMONS_SET_QUERY_STRING,
    payload,
  }),

  setError: (payload: string) => ({
    type: types.POKEMONS_SET_ERROR,
    payload,
  }),
};
