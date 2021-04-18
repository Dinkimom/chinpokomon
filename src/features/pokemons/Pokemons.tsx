import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { RootState } from '../../app/store';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { Image } from '../../components/Image/Image';
import { Loader } from '../../components/Loader/Loader';
import { Pagination } from '../../components/Pagination/Pagination';
import { imagesEntryPoint } from '../../constants/imagesEntryPoint';
import { PokemonDTO } from '../../dtos/PokemonDTO';
import { IPaginationState } from '../../types/IPaginationState';
import './Pokemons.css';
import { pokemonsFetch } from './pokemonsSlice';

export const Pokemons: React.FC = () => {
  const dispatch = useDispatch();

  const { list, error, isFetching, count } = useSelector(
    (state: RootState) => state.pokemons
  );

  const { limit, currentPage } = useParams<IPaginationState>();

  const handleFetch = useCallback(
    (limit: string, currentPage: string) => {
      dispatch(pokemonsFetch(limit, currentPage));
    },
    [limit, currentPage]
  );

  useEffect(() => {
    handleFetch(limit, currentPage);
  }, [limit, currentPage, handleFetch]);

  const renderInner = useMemo(() => {
    if (isFetching) {
      return <Loader />;
    }

    if (error) {
      return <ErrorMessage error={error} />;
    }

    if (list.length === 0) {
      return <p className="pokemons__content__no-data">No data</p>;
    }

    return (
      <div className="pokemons__content">
        {list.map((item: PokemonDTO) => {
          // poke api doesn't contain id property for pokemon dto :(
          // so we can rely only on url, because the end of it contains id!
          let match = (item.url.match(/\d+\/$/) || [])[0];
          match = match.replace('/', '');

          const id = Number(match);

          const location = {
            pathname: `/pokemon/${id}`,
            state: { fromPokemons: true, prev: `/${limit}&${currentPage}` },
          };

          return (
            <Link to={location} className="pokemons__content__card" key={id}>
              <p className="pokemons__content__card__name">{item.name}</p>
              <Image
                className="pokemons__content__card__image"
                src={`${imagesEntryPoint}/${id}.png`}
                alt={item.name}
              />
            </Link>
          );
        })}
      </div>
    );
  }, [list, error, isFetching, currentPage, limit]);

  return (
    <div className="pokemons container">
      <Pagination count={count} />
      {renderInner}
      {list.length >= 6 && <Pagination count={count} />}
    </div>
  );
};
