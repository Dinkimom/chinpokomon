import axios, { AxiosError, AxiosResponse } from 'axios';
import { serverEntryPoint } from '../constants/serverEntryPoint';
import { AbilityDTO } from '../dtos/AbilityDTO';
import { PokemonDTO } from '../dtos/PokemonDTO';

export class PokeClient {
  public axios: any;

  public constructor() {
    this.axios = axios.create({
      baseURL: serverEntryPoint,
      timeout: 20000,
    });

    this.axios.interceptors.response.use(
      (res: AxiosResponse) => res,
      this.handleError
    );
  }

  getAll = (): AxiosResponse<{ results: PokemonDTO[] }> | string => {
    return this.axios.get('/pokemon?limit=20?');
  };

  getPokemon = (id: string): AxiosResponse<PokemonDTO> | string => {
    return this.axios.get(`/pokemon/${id}`);
  };

  getAbility = (name: string): AxiosResponse<AbilityDTO> | string => {
    return this.axios.get(`/ability/${name}`);
  };

  handleError = (error: AxiosError) => {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      throw new Error(error.response.data.error);
    } else if (error.request) {
      console.log(error.request);
      throw new Error('No response from the server');
    } else {
      console.log('Error', error.message);
      throw new Error(error.message);
    }
  };
}
