import axios, { AxiosResponse } from 'axios';
import { serverEntryPoint } from './../shared/constants/serverEntryPoint';
import { AbilityDTO } from './../shared/dto/AbilityDTO';
import { PokemonDTO } from './../shared/dto/PokemonDTO';

export class PokeClient {
  public axios: any;

  public constructor() {
    this.axios = axios.create({
      baseURL: serverEntryPoint,
      timeout: 20000,
    });
  }

  getAll = (): AxiosResponse<PokemonDTO[]> | string => {
    return this.axios.get('/pokemon?limit=20?');
  };

  getPokemon = (id: number): AxiosResponse<PokemonDTO> | string => {
    return this.axios.get(`/pokemon/${id}`);
  };

  getAbility = (name: string): AxiosResponse<AbilityDTO> | string => {
    return this.axios.get(`/ability/${name}`);
  };
}
