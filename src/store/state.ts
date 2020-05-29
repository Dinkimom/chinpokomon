import { IPokemonState } from './../app/pokemon/state';
import { IPokemonsState } from './../app/pokemons/state';

export interface IRootState {
  pokemons: IPokemonsState;
  pokemon: IPokemonState;
}
