import { AbilityDTO } from '../../shared/dto/AbilityDTO';
import * as types from './types';

export const abilityActions = {
  loadData: (payload: string) => ({
    type: types.ABILITY_LOAD_DATA,
    payload,
  }),

  dataLoaded: (payload: AbilityDTO) => ({
    type: types.ABILITY_DATA_LOADED,
    payload,
  }),

  setFetching: (payload: boolean) => ({
    type: types.ABILITY_SET_FETCHING,
    payload,
  }),

  setError: (payload: string) => ({
    type: types.ABILITY_SET_ERROR,
    payload,
  }),

  execute: () => ({
    type: types.ABILITY_EXECUTE,
  }),
};
