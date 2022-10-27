import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personalInfo: {
    name: null,
    email: null,
    isLoading: false,
    errorMessage: null,
  },
};

const userProfileSlice = createSlice({
  name: 'user-profile',
  initialState,
  reducers: {
    startLoadingPersonalInfo: state => {
      state.personalInfo.isLoading = true;
      state.personalInfo.errorMessage = null;
      return state;
    },
    setPersonalInfo: (state, { payload: { name, email } }) => {
      state.personalInfo = {
        name,
        email,
        isLoading: false,
        errorMessage: null,
      };
      return state;
    },
    failLoadingPersonalInfo: (state, { payload: { errorText } }) => {
      state.personalInfo = {
        name: null,
        email: null,
        isLoading: false,
        errorMessage: errorText,
      };
      return state;
    },
    clearPersonalInfoErrorMessage: state => {
      state.personalInfo.errorMessage = null;
      return state;
    },
  },
});

export const {
  startLoadingPersonalInfo,
  setPersonalInfo,
  failLoadingPersonalInfo,
  clearPersonalInfoErrorMessage,
} = userProfileSlice.actions;
export const userProfileReducer = userProfileSlice.reducer;
