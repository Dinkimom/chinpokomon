import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import { AbilityDTO } from '../../dtos/AbilityDTO';
import { pokeClient } from './../../App';

interface AbilityState {
  record: AbilityDTO | null;
  isFetching: boolean;
  error: string | null;
}

const initialState: AbilityState = {
  record: null,
  isFetching: false,
  error: null,
};

export const abilitySlice = createSlice({
  name: 'ability',
  initialState,
  reducers: {
    abilityFetchStart: (state) => {
      state.record = null;
      state.isFetching = true;
      state.error = null;
    },
    abilityFetchFailure: (state, action: PayloadAction<string>) => {
      state.record = null;
      state.isFetching = false;
      state.error = action.payload;
    },
    abilityFetchSuccess: (state, action: PayloadAction<AbilityDTO>) => {
      state.record = action.payload;
      state.isFetching = false;
      state.error = null;
    },
  },
});

export const {
  abilityFetchStart,
  abilityFetchFailure,
  abilityFetchSuccess,
} = abilitySlice.actions;

export const abilityFetch = (data: string): AppThunk => async (dispatch) => {
  try {
    dispatch(abilityFetchStart());

    const response = await pokeClient.getAbility(data);

    dispatch(abilityFetchSuccess(response.data));
  } catch (error) {
    dispatch(abilityFetchFailure(error));
  }
};

export default abilitySlice.reducer;
