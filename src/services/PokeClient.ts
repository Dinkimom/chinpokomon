import { AbilityDTO } from './../shared/dto/AbilityDTO';
import axios, { AxiosResponse } from 'axios';
import { PokemonDTO } from './../shared/dto/PokemonDTO';

export class PokeClient {
  public URL: string;
  public axios: any;

  public constructor(serverEntryPoint: string) {
    this.URL = serverEntryPoint;
    this.axios = axios.create({
      timeout: 20000,
    });
  }

  getAll = (): AxiosResponse<PokemonDTO[]> | string => {
    return this.axios.get(`${this.URL}/pokemon?limit=20?`);
  };

  getPokemon = (id: number): AxiosResponse<PokemonDTO> | string => {
    return this.axios.get(`${this.URL}/pokemon/${id}`);
  };

  getAbility = (name: string): AxiosResponse<AbilityDTO> | string => {
    return this.axios.get(`${this.URL}/ability/${name}`);
  };
}
