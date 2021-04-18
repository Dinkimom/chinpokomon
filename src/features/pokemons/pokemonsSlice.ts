import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PokemonDTO } from '../../dtos/PokemonDTO';
import { pokeClient } from './../../App';
import { AppThunk } from './../../app/store';
import { PokemonsDTO } from './../../dtos/PokemonsDTO';
import { IPageState } from './../../types/IPageState';

interface IPokemonsState extends IPageState {
  list: PokemonDTO[];
  count: number;
}

const initialState: IPokemonsState = {
  list: [],
  count: 0,
  isFetching: false,
  error: null,
};

export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    pokemonsFetchStart: (state) => {
      state.list = [];
      state.count = 0;
      state.isFetching = true;
      state.error = null;
    },
    pokemonsFetchFailure: (state, action: PayloadAction<string>) => {
      state.list = [];
      state.count = 0;
      state.isFetching = false;
      state.error = action.payload;
    },
    pokemonsFetchSuccess: (state, action: PayloadAction<PokemonsDTO>) => {
      state.list = action.payload.results;
      state.count = action.payload.count;
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

export const pokemonsFetch = (
  limit: string,
  currentPage: string
): AppThunk => async (dispatch) => {
  try {
    dispatch(pokemonsFetchStart());

    const response = await pokeClient.getAll(limit, currentPage);

    dispatch(pokemonsFetchSuccess(response.data));
  } catch (error) {
    dispatch(pokemonsFetchFailure(error));
  }
};

export default pokemonsSlice.reducer;
