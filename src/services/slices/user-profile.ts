import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { onLogout, onUserInfoUpdate } from '../thunks/user-admission';
import { onGetUserInfo } from '../thunks/user-admission';
import { IUser } from '../../utils/ts-types/user-types';

interface IInitialState {
  personalInfo: IUser;
}

const initialState: IInitialState = {
  personalInfo: {
    name: null,
    email: null,
  },
};

const userProfileSlice = createSlice({
  name: 'user-profile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(onLogout.fulfilled, _ => initialState)
      .addCase(onLogout.rejected, _ => initialState);
    builder.addCase(
      onGetUserInfo.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.personalInfo.name = action.payload.name;
        state.personalInfo.email = action.payload.email;
      }
    );
    builder.addCase(
      onUserInfoUpdate.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.personalInfo.name = action.payload.name;
        state.personalInfo.email = action.payload.email;
      }
    );
  },
});

export const userProfileReducer = userProfileSlice.reducer;
