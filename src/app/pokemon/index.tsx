import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store/state';
import { pokemonActions } from './actions';
import { useParams } from 'react-router-dom';
import { Loader } from '../../shared/components/loader';
import { ErrorMessage } from '../../shared/components/errorMessage';

export const Pokemon = React.memo(() => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { record, isFetching, error } = useSelector(
    (state: IRootState) => state.pokemon,
  );

  useEffect(() => {
    dispatch(pokemonActions.loadData(id));
  }, [dispatch, id]);

  const renderRecord = () => {
    if (isFetching) {
      return <Loader />;
    }

    if (null) {
      return <p>Requested pokemon has not yet been discovered</p>;
    }
  };

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className='pokemon'>
      <h2>Pokemon</h2>
      <img src='' alt='' />
    </div>
  );
});
