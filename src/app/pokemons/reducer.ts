import { IActionPayloaded } from '../../store/IAction';
import { IReducerPayloaded } from '../../store/IReducer';
import { IPokemonsState } from './state';
import * as types from './types';

const initialState: IPokemonsState = {
  list: [],
  isFetching: false,
  error: '',
  queryString: '',
  query: [],
};

export class PokemonsReducer implements IReducerPayloaded<IPokemonsState> {
  constructor() {
    this.reduce = this.reduce.bind(this);
  }

  public static Create() {
    const reducer = new PokemonsReducer();
    return reducer.reduce;
  }

  public reduce(
    state: IPokemonsState = initialState,
    action: IActionPayloaded<any>,
  ): IPokemonsState {
    let newState = { ...state };

    switch (action.type) {
      case types.POKEMONS_DATA_LOADED:
        newState.list = [...action.payload];
        newState.query = [...action.payload];
        break;
      case types.POKEMONS_SET_FETCHING:
        newState.isFetching = action.payload;
        break;
      case types.POKEMONS_SET_QUERY_STRING:
        newState.queryString = action.payload;
        newState.query = newState.list.filter((item) =>
          new RegExp(`^${newState.queryString}`, 'i').test(item.name),
        );
        break;
    }

    return newState;
  }
}
