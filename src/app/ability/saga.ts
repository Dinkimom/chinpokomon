import { abilityActions } from './actions';
import { put, takeEvery } from 'redux-saga/effects';
import { safeSagaExecute } from '../../middleware/saga';
import { pokeClient } from './../../index';
import { IActionPayloaded } from './../../store/IAction';
import * as types from './types';

export class AbilityApiSaga {
  public constructor() {
    this.loadData = this.loadData.bind(this);
  }

  public static Initialize() {
    const saga = new AbilityApiSaga();
    return saga.watch();
  }

  public *watch() {
    yield takeEvery(types.ABILITY_LOAD_DATA, (a) =>
      safeSagaExecute(a, this.loadData),
    );
  }

  public *loadData(action: IActionPayloaded<string>) {
    yield put(abilityActions.setError(''));
    yield put(abilityActions.setFetching(true));
    yield put(abilityActions.execute());

    try {
      const response = yield pokeClient.getAbility(action.payload);

      yield put(abilityActions.dataLoaded(response.data));
    } catch (error) {
      yield put(abilityActions.setError(error.message));
    }

    yield put(abilityActions.setFetching(false));
  }
}
