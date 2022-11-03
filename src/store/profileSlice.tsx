import {createSlice} from '@reduxjs/toolkit';
import type {RootState} from 'src/store/index';

interface ProfileState {
  isSignedIn: boolean;
}

const initialState: ProfileState = {
  isSignedIn: false,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    logUser: state => {
      state.isSignedIn = true;
    },
  },
});

export const selectProfile = (state: RootState) => state.profile;

export const {logUser} = profileSlice.actions;
export default profileSlice.reducer;
