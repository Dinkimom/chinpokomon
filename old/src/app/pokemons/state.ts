import { PokemonDTO } from './../../shared/dto/PokemonDTO';

export interface IPokemonsState {
  list: PokemonDTO[];
  isFetching: boolean;
  error: string;
  queryString: string;
  query: PokemonDTO[];
}
