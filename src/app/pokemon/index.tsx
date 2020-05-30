import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { ErrorMessage } from '../../shared/components/errorMessage';
import { Loader } from '../../shared/components/loader';
import { imagesEntryPoint } from '../../shared/constants/imagesEntryPoint';
import { IRootState } from '../../store/state';
import { pokemonActions } from './actions';
import './index.css';

export const Pokemon = React.memo(() => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { record, isFetching, error } = useSelector(
    (state: IRootState) => state.pokemon,
  );

  useEffect(() => {
    dispatch(pokemonActions.loadData(id));
  }, [dispatch, id]);

  const renderStats = () => (
    <table cellSpacing='0'>
      <tr>
        {record?.stats.map((item, index) => (
          <th key={index}>{item.stat.name}</th>
        ))}
      </tr>
      <tr>
        {record?.stats.map((item, index) => (
          <td key={index}>{item.base_stat}</td>
        ))}
      </tr>
    </table>
  );

  const renderAbilities = () =>
    record?.abilities.map((item, index) => (
      <Link
        className='pokemon__content__info__abilities__ability link'
        to={`/ability/${item.ability.name}`}
        key={index}
      >
        {item.ability.name}
      </Link>
    ));

  const renderTypes = () =>
    record?.types.map((item, index) => (
      <span key={index} className='pokemon__content__info__types__type'>
        {item.type.name}
      </span>
    ));

  const renderRecord = () => {
    if (isFetching) {
      return <Loader />;
    }

    if (error) {
      return (
        <ErrorMessage error={error} link={<Link to='/'>Return Home</Link>} />
      );
    }

    return (
      <div className='pokemon__container container'>
        <Link to='/' className='pokemon__container__link link'>
          &larr; Home
        </Link>
        <h2 className='pokemon__container__name'>{record?.name}</h2>
        <div className='pokemon__content'>
          <img
            className='pokemon__container__image'
            src={`${imagesEntryPoint}/${record?.id}.png`}
            alt=''
          />
          <div className='pokemon__content__info'>
            <div className='pokemon__content__info__stats'>
              <h3>Stats</h3>
              {renderStats()}
            </div>
            <div className='pokemon__content__info__types'>
              <h3>Types</h3>
              {renderTypes()}
            </div>
            <div className='pokemon__content__info__abilities'>
              <h3>Abilities</h3>
              {renderAbilities()}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <div className='pokemon'>{renderRecord()}</div>;
});
