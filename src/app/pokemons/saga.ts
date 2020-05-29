import { put, takeEvery } from 'redux-saga/effects';
import { safeSagaExecute } from '../../middleware/saga';
import { pokeClient } from './../../index';
import { IActionPayloaded } from './../../store/IAction';
import { pokemonsActions } from './actions';
import * as types from './types';

export class PokemonsApiSaga {
  public constructor() {
    this.loadData = this.loadData.bind(this);
  }

  public static Initialize() {
    const saga = new PokemonsApiSaga();
    return saga.watch();
  }

  public *watch() {
    yield takeEvery(types.POKEMONS_LOAD_DATA, (a) =>
      safeSagaExecute(a, this.loadData),
    );
  }

  public *loadData(action: IActionPayloaded<{ [key: string]: any }[]>) {
    yield put(pokemonsActions.setFetching(true));

    try {
      const response = yield pokeClient.getAll();

      yield put(pokemonsActions.dataLoaded(response.data.results));
    } catch (error) {
      yield put(pokemonsActions.setError(error.message));
    }

    yield put(pokemonsActions.setFetching(false));
  }
}
