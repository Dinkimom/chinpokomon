import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { RootState } from '../../app/store';
import { Image } from '../../components/Image/Image';
import { PageWrapper } from '../../components/PageWrapper/PageWrapper';
import { imagesEntryPoint } from '../../constants/imagesEntryPoint';
import { PokemonTypesEnum } from '../../enums/PokemonTypesEnum';
import './Pokemon.css';
import { pokemonFetch } from './pokemonSlice';

export const Pokemon: React.FC = () => {
  const dispatch = useDispatch();

  const { id } = useParams<{ id: string }>();

  const { record, isFetching, error } = useSelector(
    (state: RootState) => state.pokemon
  );

  const location = useLocation();

  useEffect(() => {
    dispatch(pokemonFetch(id));
  }, [id]);

  const renderRecord = useMemo(() => {
    const renderStats = () => (
      <table cellSpacing="0">
        <thead>
          <tr>
            {record?.stats.map((item, index) => (
              <th key={index}>{item.stat.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {record?.stats.map((item, index) => (
              <td key={index}>{item.base_stat}</td>
            ))}
          </tr>
        </tbody>
      </table>
    );

    const renderAbilities = () =>
      record?.abilities.map((item, index) => (
        <Link
          className="pokemon__info__abilities__ability link"
          to={`/pokemon/${record.id}/ability/${item.ability.name}`}
          key={index}
        >
          {item.ability.name}
        </Link>
      ));

    const renderTypes = () =>
      record?.types.map((item, index) => (
        <span
          key={index}
          className="pokemon__info__types__type"
          style={{ color: PokemonTypesEnum[item.type.name] }}
        >
          {item.type.name}
        </span>
      ));

    if (record) {
      return (
        <>
          <Image
            className="pokemon__image"
            src={`${imagesEntryPoint}/${record?.id}.png`}
            alt={record.name}
          />
          <div className="pokemon__info">
            <div className="pokemon__info__stats">{renderStats()}</div>
            <div className="pokemon__info__types">
              <h3>Types</h3>
              {renderTypes()}
            </div>
            <div className="pokemon__info__abilities">
              <h3>Abilities</h3>
              {renderAbilities()}
            </div>
          </div>
        </>
      );
    }

    return null;
  }, [record]);

  const calculatePrevLink = useCallback(() => {
    if (location?.state?.fromPokemons) {
      return location.state.prev;
    }

    return '/';
  }, [location]);

  return (
    <PageWrapper
      href={calculatePrevLink()}
      title={record?.name}
      isFetching={isFetching}
      error={error}
      className="pokemon"
    >
      {renderRecord}
    </PageWrapper>
  );
};
