import { AbilityApiSaga } from './../app/ability/saga';
import { PokemonApiSaga } from './../app/pokemon/saga';
import { all } from 'redux-saga/effects';
import { PokemonsApiSaga } from '../app/pokemons/saga';

export const rootSaga = function* root() {
  yield all([
    PokemonsApiSaga.Initialize(),
    PokemonApiSaga.Initialize(),
    AbilityApiSaga.Initialize(),
  ]);
};

export function* safeSagaExecute(action: any, func: (a: any) => any) {
  try {
    yield func(action);
  } catch (error) {
    console.error(error);
  }
}
