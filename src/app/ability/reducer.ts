import { IActionPayloaded } from './../../store/IAction';
import { IReducerPayloaded } from './../../store/IReducer';
import { IAbilityState } from './state';
import * as types from './types';

const initialState: IAbilityState = {
  record: null,
  isFetching: false,
  error: '',
};

export class AbilityReducer implements IReducerPayloaded<IAbilityState> {
  constructor() {
    this.reduce = this.reduce.bind(this);
  }

  public static Create() {
    const reducer = new AbilityReducer();
    return reducer.reduce;
  }

  public reduce(
    state: IAbilityState = initialState,
    action: IActionPayloaded<any>,
  ): IAbilityState {
    let newState = { ...state };

    switch (action.type) {
      case types.ABILITY_DATA_LOADED:
        newState.record = { ...action.payload };
        break;
      case types.ABILITY_SET_FETCHING:
        newState.isFetching = action.payload;
        break;
      case types.ABILITY_SET_ERROR:
        newState.error = action.payload;
        break;
    }

    return newState;
  }
}
