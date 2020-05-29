import React, { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '../../shared/components/errorMessage';
import { Loader } from '../../shared/components/loader';
import { imagesEntryPoint } from '../../shared/constants/imagesEntryPoint';
import { PokemonDTO } from '../../shared/dto/PokemonDTO';
import { IRootState } from '../../store/state';
import { pokemonsActions } from './actions';
import './index.css';

export const Pokemons = React.memo(() => {
  const dispatch = useDispatch();

  const { query, error, isFetching } = useSelector(
    (state: IRootState) => state.pokemons,
  );

  useEffect(() => {
    dispatch(pokemonsActions.loadData());
  }, [dispatch]);

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(pokemonsActions.setQuery(e.target.value));
  };

  const renderList = () => {
    if (isFetching) {
      return <Loader />;
    }

    if (query.length === 0) {
      return <p className='pokemons__content__no-data'>No data</p>;
    }

    return query.map((item: PokemonDTO, index) => (
      <Link
        to={`/pokemon/${item.id}`}
        className='pokemons__content__card'
        key={item.id}
      >
        <p>{item.name}</p>
        <img src={`${imagesEntryPoint}/${item.id}.png`} alt={item.name} />
      </Link>
    ));
  };

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className='pokemons'>
      <div className='pokemons__query'>
        <input
          type='text'
          placeholder='Search...'
          onChange={handleQueryChange}
        />
      </div>
      <div className='pokemons__content'>{renderList()}</div>
    </div>
  );
});
