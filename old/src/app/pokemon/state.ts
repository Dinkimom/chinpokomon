import { PokemonDTO } from './../../shared/dto/PokemonDTO';

export interface IPokemonState {
  record: PokemonDTO | null;
  isFetching: boolean;
  error: string;
}
