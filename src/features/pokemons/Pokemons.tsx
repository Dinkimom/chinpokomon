import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../app/store';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { Loader } from '../../components/Loader/Loader';
import { imagesEntryPoint } from '../../constants/imagesEntryPoint';
import { PokemonDTO } from '../../dtos/PokemonDTO';
import './Pokemons.css';
import { pokemonsFetch } from './pokemonsSlice';

export const Pokemons: React.FC = () => {
  const dispatch = useDispatch();

  const { list, error, isFetching } = useSelector(
    (state: RootState) => state.pokemons
  );

  useEffect(() => {
    dispatch(pokemonsFetch());
  }, [dispatch]);

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
        const id = ++index;

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
        <div className="pokemons__content">{renderList()}</div>
      </div>
    );
  }, [list, error, isFetching]);

  return renderInner;
};
