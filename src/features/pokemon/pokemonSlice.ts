import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pokeClient } from './../../App';
import { AppThunk } from './../../app/store';
import { PokemonDTO } from './../../dtos/PokemonDTO';
import { IPageState } from './../../types/IPageState';

interface IPokemonState extends IPageState {
  record: PokemonDTO | null;
}

const initialState: IPokemonState = {
  record: null,
  isFetching: false,
  error: null,
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    pokemonFetchStart: (state) => {
      state.record = null;
      state.isFetching = true;
      state.error = null;
    },
    pokemonFetchFailure: (state, action: PayloadAction<string>) => {
      state.record = null;
      state.isFetching = false;
      state.error = action.payload;
    },
    pokemonFetchSuccess: (state, action: PayloadAction<PokemonDTO>) => {
      state.record = action.payload;
      state.isFetching = false;
      state.error = null;
    },
  },
});

export const {
  pokemonFetchStart,
  pokemonFetchFailure,
  pokemonFetchSuccess,
} = pokemonSlice.actions;

export const pokemonFetch = (data: string): AppThunk => async (dispatch) => {
  try {
    dispatch(pokemonFetchStart());

    const response = await pokeClient.getPokemon(data);

    dispatch(pokemonFetchSuccess(response.data));
  } catch (error) {
    dispatch(pokemonFetchFailure(error));
  }
};

export default pokemonSlice.reducer;
