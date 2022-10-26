import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  passwordReset: {
    isLoading: false,
    errorMessage: null,
  },
  savePassword: {
    isLoading: false,
    errorMessage: null,
  },
  registerUser: {
    isLoading: false,
    errorMessage: null,
  },
  userLogin: {
    isLoading: false,
    errorMessage: null,
  },
};

const userAdmissionSlice = createSlice({
  name: 'user-admission',
  initialState,
  reducers: {
    startResettingPassword: state => {
      state.passwordReset.isLoading = true;
      state.passwordReset.errorMessage = null;
      return state;
    },
    successResettingPassword: state => {
      state.passwordReset = initialState.passwordReset;
      return state;
    },
    failResettingPassword: (state, { payload: { errorText } }) => {
      state.passwordReset.isLoading = false;
      state.passwordReset.errorMessage = errorText;
      return state;
    },
    clearPasswordResetErrorMessage: state => {
      state.passwordReset.errorMessage = null;
      return state;
    },
    startSavingPassword: state => {
      state.savePassword.isLoading = true;
      state.savePassword.errorMessage = null;
      return state;
    },
    successSavingPassword: state => {
      state.savePassword = initialState.savePassword;
      return state;
    },
    failSavingPassword: (state, { payload: { errorText } }) => {
      state.savePassword.isLoading = false;
      state.savePassword.errorMessage = errorText;
      return state;
    },
    clearSavePasswordErrorMessage: state => {
      state.savePassword.errorMessage = null;
      return state;
    },
    startCreatingUser: state => {
      state.registerUser.isLoading = true;
      state.registerUser.errorMessage = null;
      return state;
    },
    successCreatingUser: state => {
      state.registerUser = initialState.registerUser;
      return state;
    },
    failCreatingUser: (state, { payload: { errorText } }) => {
      state.registerUser.isLoading = false;
      state.registerUser.errorMessage = errorText;
      return state;
    },
    clearRegisterUserErrorMessage: state => {
      state.registerUser.errorMessage = null;
      return state;
    },
    startLoggingIn: state => {
      state.userLogin.isLoading = true;
      state.userLogin.errorMessage = null;
      return state;
    },
    successUserLogIn: state => {
      state.userLogin = initialState.userLogin;
      return state;
    },
    failUserLogIn: (state, { payload: { errorText } }) => {
      state.userLogin.isLoading = false;
      state.userLogin.errorMessage = errorText;
      return state;
    },
    clearUserLogInErrorMessage: state => {
      state.userLogin.errorMessage = null;
      return state;
    },
  },
});

export const {
  startResettingPassword,
  successResettingPassword,
  failResettingPassword,
  clearPasswordResetErrorMessage,
  startCreatingUser,
  successCreatingUser,
  failCreatingUser,
  clearRegisterUserErrorMessage,
  startSavingPassword,
  successSavingPassword,
  failSavingPassword,
  clearSavePasswordErrorMessage,
  startLoggingIn,
  successUserLogIn,
  failUserLogIn,
  clearUserLogInErrorMessage,
} = userAdmissionSlice.actions;
export const userAdmissionReducer = userAdmissionSlice.reducer;
