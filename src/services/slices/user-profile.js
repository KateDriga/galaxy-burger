import { createSlice } from '@reduxjs/toolkit';
import { onLogout, onUserInfoUpdate } from '../thunks/user-admission';
import { onGetUserInfo } from '../thunks/user-admission';

const initialState = {
  personalInfo: {
    name: null,
    email: null,
  },
};

const userProfileSlice = createSlice({
  name: 'user-profile',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(onLogout.fulfilled, _ => initialState)
      .addCase(onLogout.rejected, _ => initialState);
    builder.addCase(
      onGetUserInfo.fulfilled,
      (state, { payload: { name, email } }) => {
        state.personalInfo.name = name;
        state.personalInfo.email = email;
      }
    );
    builder.addCase(
      onUserInfoUpdate.fulfilled,
      (state, { payload: { name, email } }) => {
        state.personalInfo.name = name;
        state.personalInfo.email = email;
      }
    );
  },
});

export const userProfileReducer = userProfileSlice.reducer;
