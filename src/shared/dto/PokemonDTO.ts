import { TypeDTO } from './TypeDTO';
import { AbilityDTO } from './AbilityDTO';

export interface PokemonDTO {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: AbilityDTO[];
  types: TypeDTO[];
  stats: any[];
}
