import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import abilityReducer from '../features/ability/abilitySlice';
import pokemonReducer from '../features/pokemon/pokemonSlice';
import pokemonsReducer from '../features/pokemons/pokemonsSlice';

export const store = configureStore({
  reducer: {
    pokemons: pokemonsReducer,
    pokemon: pokemonReducer,
    ability: abilityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
