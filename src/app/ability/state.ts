import { AbilityDTO } from './../../shared/dto/AbilityDTO';

export interface IAbilityState {
  record: AbilityDTO | null;
  isFetching: boolean;
  error: string;
}
