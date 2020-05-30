import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { abilityActions } from './actions';
import { useParams } from 'react-router-dom';
import { PageWrapper } from '../../shared/components/pageWrapper';
import { IRootState } from '../../store/state';
import './index.css';

export const Ability = () => {
  const dispatch = useDispatch();

  const { pokemon_id, ability_name } = useParams();

  const { record, isFetching, error } = useSelector(
    (state: IRootState) => state.ability,
  );

  useEffect(() => {
    dispatch(abilityActions.loadData(ability_name));
  }, [dispatch, ability_name]);

  if (record === null) {
    return null;
  }

  return (
    <PageWrapper
      href={`/pokemon/${pokemon_id}`}
      title={record?.name}
      isFetching={isFetching}
      error={error}
      className='ability'
    >
      {record?.effect_entries.map((item, index) => (
        <p className='ability__description' key={index}>
          {item.effect}
        </p>
      ))}
    </PageWrapper>
  );
};
