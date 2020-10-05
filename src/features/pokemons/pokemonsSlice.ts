import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { PokemonDTO } from '../../dtos/PokemonDTO';
import { pokeClient } from './../../App';
import { AppThunk } from './../../app/store';
import { IPageState } from './../../types/IPageState';

interface IPokemonsState extends IPageState {
  list: PokemonDTO[];
}

const initialState: IPokemonsState = {
  list: [],
  isFetching: false,
  error: null,
};

export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    pokemonsFetchStart: (state) => {
      state.list = [];
      state.isFetching = true;
      state.error = null;
    },
    pokemonsFetchFailure: (state, action: PayloadAction<string>) => {
      state.list = [];
      state.isFetching = false;
      state.error = action.payload;
    },
    pokemonsFetchSuccess: (state, action: PayloadAction<PokemonDTO[]>) => {
      state.list = action.payload;
      state.isFetching = false;
      state.error = null;
    },
  },
});

export const {
  pokemonsFetchStart,
  pokemonsFetchFailure,
  pokemonsFetchSuccess,
} = pokemonsSlice.actions;

export const pokemonsFetch = (): AppThunk => async (dispatch) => {
  try {
    dispatch(pokemonsFetchStart());

    const response = (await pokeClient.getAll()) as AxiosResponse<{
      results: PokemonDTO[];
    }>;

    dispatch(pokemonsFetchSuccess(response.data.results));
  } catch (error) {
    dispatch(pokemonsFetchFailure(error));
  }
};

export default pokemonsSlice.reducer;
