import { IAbilityState } from './../app/ability/state';
import { IPokemonState } from './../app/pokemon/state';
import { IPokemonsState } from './../app/pokemons/state';

export interface IRootState {
  pokemons: IPokemonsState;
  pokemon: IPokemonState;
  ability: IAbilityState;
}
