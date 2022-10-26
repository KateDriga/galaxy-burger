import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personalInfo: {
    name: null,
    email: null,
    password: null,
  },
};

const userProfileSlice = createSlice({
  name: 'user-profile',
  initialState,
  reducers: {
    setPersonalInfo: (state, { payload: { name, email, password } }) => {
      state.personalInfo.name = name;
      state.personalInfo.email = email;
      state.personalInfo.password = password;
      return state;
    },
  },
});

export const { setPersonalInfo } = userProfileSlice.actions;
export const userProfileReducer = userProfileSlice.reducer;
