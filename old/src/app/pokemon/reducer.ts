import { IActionPayloaded } from '../../store/IAction';
import { IReducerPayloaded } from '../../store/IReducer';
import { IPokemonState } from './state';
import * as types from './types';

const initialState: IPokemonState = {
  record: null,
  isFetching: false,
  error: '',
};

export class PokemonReducer implements IReducerPayloaded<IPokemonState> {
  constructor() {
    this.reduce = this.reduce.bind(this);
  }

  public static Create() {
    const reducer = new PokemonReducer();
    return reducer.reduce;
  }

  public reduce(
    state: IPokemonState = initialState,
    action: IActionPayloaded<any>,
  ): IPokemonState {
    let newState = { ...state };

    switch (action.type) {
      case types.POKEMON_DATA_LOADED:
        newState.record = { ...action.payload };
        break;
      case types.POKEMON_SET_FETCHING:
        newState.isFetching = action.payload;
        break;
      case types.POKEMON_SET_ERROR:
        newState.error = action.payload;
        break;
      case types.POKEMN_EXECUTE:
        newState.record = null;
        break;
    }

    return newState;
  }
}
