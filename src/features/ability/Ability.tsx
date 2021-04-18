import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../app/store';
import { PageWrapper } from '../../components/PageWrapper/PageWrapper';
import './Ability.css';
import { abilityFetch } from './abilitySlice';

export const Ability: React.FC = () => {
  const dispatch = useDispatch();

  const { pokemon_id, ability_name } = useParams<{
    pokemon_id: string;
    ability_name: string;
  }>();

  const { record, isFetching, error } = useSelector(
    (state: RootState) => state.ability
  );

  useEffect(() => {
    dispatch(abilityFetch(ability_name));
  }, [dispatch, ability_name]);

  const renderAbility = useMemo(
    () =>
      record?.effect_entries
        .filter((item) => item.language.name === 'en')
        .map((item, index) => (
          <p className="ability__description" key={index}>
            {item.effect}
          </p>
        )),
    [record]
  );

  return (
    <PageWrapper
      href={`/pokemon/${pokemon_id}`}
      title={record?.name}
      isFetching={isFetching}
      error={error}
      className="ability"
    >
      {renderAbility}
    </PageWrapper>
  );
};
