import { PokemonTypesEnum } from '../enums/PokemonTypesEnum';

export interface TypeDTO {
  slot: number;
  type: {
    name: keyof typeof PokemonTypesEnum;
  };
}
