import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage } from '../../shared/components/errorMessage';
import { Loader } from '../../shared/components/loader';
import { PokemonDTO } from '../../shared/dto/PokemonDTO';
import { IRootState } from '../../store/state';
import { pokemonsActions } from './actions';
import './index.css';

export const Pokemons = () => {
  const dispatch = useDispatch();

  const { list, error, isFetching } = useSelector(
    (state: IRootState) => state.pokemons,
  );

  useEffect(() => {
    dispatch(pokemonsActions.loadData());
  }, [dispatch]);

  const renderList = () => {
    if (isFetching) return <Loader />;

    if (list.length === 0) return <p>No data</p>;

    return list.map((item: PokemonDTO, index) => (
      <div className='pokemons__content__card'>
        <p>{item.name}</p>
        <img
          src={`https://pokeres.bastionbot.org/images/pokemon/${index + 1}.png`}
          alt={item.name}
        />
      </div>
    ));
  };

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className='pokemons'>
      <div className='pokemons__params'>
        <input
          type='text'
          className='pokemons__params__name'
          placeholder='Input name here...'
        />
        <button className='pokemons__params__search'>Search</button>
      </div>
      <div className='pokemons__content'>{renderList()}</div>
      {/* <div className='pokemons__pagination'>
        <label className='pokemons__pagination__items'>
          Items{' '}
          <select name='itemsPerPage'>
            <option value='20'>20</option>
            <option value='20'>40</option>
            <option value='20'>80</option>
            <option value='20'>120</option>
          </select>
        </label>
      </div> */}
    </div>
  );
};
