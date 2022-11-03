import {createSlice} from '@reduxjs/toolkit';

import {ProfileState} from 'src/store/profileSlice/types';

const initialState: ProfileState = {
  isSignedIn: false,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    logInUser: state => {
      state.isSignedIn = true;
    },
    logOutUser: state => {
      state.isSignedIn = false;
    },
  },
});

export const {logInUser, logOutUser} = profileSlice.actions;
export default profileSlice.reducer;
