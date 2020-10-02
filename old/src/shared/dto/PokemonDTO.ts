import { ShortAbilityDTO } from './ShortAbilityDTO';
import { StatDTO } from './StatDTO';
import { TypeDTO } from './TypeDTO';

export interface PokemonDTO {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: ShortAbilityDTO[];
  types: TypeDTO[];
  stats: StatDTO[];
}
