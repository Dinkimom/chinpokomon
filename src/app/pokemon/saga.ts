import { ErrorMessage } from './../../shared/components/errorMessage/index';
import { PokemonDTO } from './../../shared/dto/PokemonDTO';
import { put, takeEvery } from 'redux-saga/effects';
import { safeSagaExecute } from '../../middleware/saga';
import { pokeClient } from './../../index';
import { IActionPayloaded } from './../../store/IAction';
import { pokemonActions } from './actions';
import * as types from './types';

export class PokemonApiSaga {
  public constructor() {
    this.loadData = this.loadData.bind(this);
  }

  public static Initialize() {
    const saga = new PokemonApiSaga();
    return saga.watch();
  }

  public *watch() {
    yield takeEvery(types.POKEMON_LOAD_DATA, (a) =>
      safeSagaExecute(a, this.loadData),
    );
  }

  public *loadData(action: IActionPayloaded<number>) {
    yield put(pokemonActions.setFetching(true));

    try {
      const response = yield pokeClient.getPokemon(action.payload);

      yield put(response.data.result);
    } catch (error) {
      console.log(error.message);
      yield put(pokemonActions.setError(error.message));
    }

    yield put(pokemonActions.setFetching(false));
  }
}
