import { PokemonDTO } from './../../shared/dto/PokemonDTO';
import * as types from './types';

export const pokemonActions = {
  loadData: (payload: number) => ({
    type: types.POKEMON_LOAD_DATA,
    payload,
  }),

  dataLoaded: (payload: PokemonDTO) => ({
    type: types.POKEMON_DATA_LOADED,
    payload,
  }),

  execute: () => ({
    type: types.POKEMN_EXECUTE,
  }),

  setFetching: (payload: boolean) => ({
    type: types.POKEMON_SET_FETCHING,
    payload,
  }),

  setError: (payload: string) => ({
    type: types.POKEMON_SET_ERROR,
    payload,
  }),
};
