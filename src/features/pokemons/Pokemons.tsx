import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../app/store';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { Loader } from '../../components/Loader/Loader';
import { Pagination } from '../../components/Pagination/Pagination';
import { imagesEntryPoint } from '../../constants/imagesEntryPoint';
import { PokemonDTO } from '../../dtos/PokemonDTO';
import './Pokemons.css';
import { pokemonsFetch } from './pokemonsSlice';

export const Pokemons: React.FC = () => {
  const dispatch = useDispatch();

  const { list, error, isFetching, count } = useSelector(
    (state: RootState) => state.pokemons
  );

  const handleFetch = (limit: string, currentPage: string) => {
    dispatch(pokemonsFetch(limit, currentPage));
  };

  const renderInner = useMemo(() => {
    const renderList = () => {
      if (isFetching) {
        return <Loader />;
      }

      if (list.length === 0) {
        return <p className="pokemons__content__no-data">No data</p>;
      }

      return list.map((item: PokemonDTO, index) => {
        // poke api doesn't contain id property for pokemon dto :(
        // so we can rely only on url, because the end of it contains id!
        let match = (item.url.match(/\d+\/$/) || [])[0];
        match = match.replace('/', '');

        const id = Number(match);

        return (
          <Link
            to={`/pokemon/${id}`}
            className="pokemons__content__card"
            key={item.id}
          >
            <p className="pokemons__content__card__name">{item.name}</p>
            <img
              className="pokemons__content__card__image"
              src={`${imagesEntryPoint}/${id}.png`}
              alt={item.name}
            />
          </Link>
        );
      });
    };

    if (error) {
      return <ErrorMessage error={error} />;
    }

    return (
      <div className="pokemons container">
        <Pagination count={count} onLoad={handleFetch} />
        <div className="pokemons__content">{renderList()}</div>
      </div>
    );
  }, [list, error, isFetching, count]);

  return renderInner;
};
