import { PokemonDTO } from './PokemonDTO';

export interface PokemonsDTO {
  results: PokemonDTO[];
  count: number;
}
