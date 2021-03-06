import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { PageWrapper } from '../../shared/components/pageWrapper';
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
        className='pokemon__info__abilities__ability link'
        to={`/pokemon/${record.id}/ability/${item.ability.name}`}
        key={index}
      >
        {item.ability.name}
      </Link>
    ));

  const renderTypes = () =>
    record?.types.map((item, index) => (
      <span key={index} className='pokemon__info__types__type'>
        {item.type.name}
      </span>
    ));

  const renderRecord = () => (
    <>
      <img
        className='pokemon__image'
        src={`${imagesEntryPoint}/${record?.id}.png`}
        alt=''
      />
      <div className='pokemon__info'>
        <div className='pokemon__info__stats'>
          <h3>Stats</h3>
          {renderStats()}
        </div>
        <div className='pokemon__info__types'>
          <h3>Types</h3>
          {renderTypes()}
        </div>
        <div className='pokemon__info__abilities'>
          <h3>Abilities</h3>
          {renderAbilities()}
        </div>
      </div>
    </>
  );

  return (
    <PageWrapper
      href='/'
      title={record?.name}
      isFetching={isFetching}
      error={error}
      className='pokemon'
    >
      {renderRecord()}
    </PageWrapper>
  );
});
