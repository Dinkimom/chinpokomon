import { put, takeEvery } from 'redux-saga/effects';
import { safeSagaExecute } from '../../middleware/saga';
import { pokeClient } from './../../index';
import { PokemonDTO } from './../../shared/dto/PokemonDTO';
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

  public *loadData() {
    yield put(pokemonsActions.setError(''));
    yield put(pokemonsActions.setFetching(true));

    try {
      const response = yield pokeClient.getAll();

      const list = response.data.results.map(
        (item: PokemonDTO, index: number) => ({
          ...item,
          id: index + 1,
        }),
      );

      yield put(pokemonsActions.dataLoaded(list));
    } catch (error) {
      yield put(pokemonsActions.setError(error.message));
    }

    yield put(pokemonsActions.setFetching(false));
  }
}
