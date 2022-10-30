import { createSlice } from '@reduxjs/toolkit';
import {
  onLogin,
  onLogout,
  onPasswordForgot,
  onPasswordReset,
  onTokenRefresh,
  onUserInfoUpdate,
  onUserRegister,
} from '../thunks/user-admission';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { onGetUserInfo } from '../thunks/user-admission';
import { setAccessToken } from '../../utils/api/make-request';

const initialState = {
  isLoggedIn: false,
  tokenIsLoading: false,
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
  userLogout: {
    isLoading: false,
  },
  userUpdate: {
    isLoading: false,
    errorMessage: null,
  },
  getUser: {
    isLoading: false,
    errorMessage: null,
  },
};

const userAdmissionSlice = createSlice({
  name: 'user-admission',
  initialState,
  reducers: {
    clearPasswordResetErrorMessage: state => {
      state.passwordReset.errorMessage = null;
      return state;
    },
    clearSavePasswordErrorMessage: state => {
      state.savePassword.errorMessage = null;
      return state;
    },
    clearRegisterUserErrorMessage: state => {
      state.registerUser.errorMessage = null;
      return state;
    },
    clearUserLogInErrorMessage: state => {
      state.userLogin.errorMessage = null;
      return state;
    },
    clearUserUpdateErrorMessage: state => {
      state.userUpdate.errorMessage = null;
      return state;
    },
    clearGetUserErrorMessage: state => {
      state.getUser.errorMessage = null;
      return state;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(onTokenRefresh.fulfilled, (state, { payload: data }) => {
        setAccessToken(data.accessToken);
        setCookie('refreshToken', data.refreshToken);
        state.tokenIsLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(onTokenRefresh.pending, state => {
        state.tokenIsLoading = true;
      })
      .addCase(onTokenRefresh.rejected, state => {
        state.tokenIsLoading = false;
        state.isLoggedIn = false;
      });
    builder
      .addCase(onUserRegister.fulfilled, (state, { payload: data }) => {
        state.registerUser = initialState.registerUser;
        state.isLoggedIn = true;
        setAccessToken(data.accessToken);
        setCookie('refreshToken', data.refreshToken);
      })
      .addCase(onUserRegister.pending, state => {
        state.registerUser.isLoading = true;
        state.registerUser.errorMessage = null;
      })
      .addCase(onUserRegister.rejected, (state, { payload: errorText }) => {
        state.registerUser.isLoading = false;
        state.registerUser.errorMessage = errorText;
      });
    builder
      .addCase(onLogin.fulfilled, (state, { payload: data }) => {
        state.userLogin = initialState.userLogin;
        state.isLoggedIn = true;
        setAccessToken(data.accessToken);
        setCookie('refreshToken', data.refreshToken);
      })
      .addCase(onLogin.pending, state => {
        state.userLogin.isLoading = true;
        state.userLogin.errorMessage = null;
      })
      .addCase(onLogin.rejected, (state, { payload: errorText }) => {
        state.userLogin.isLoading = false;
        state.userLogin.errorMessage = errorText;
      });
    builder
      .addCase(onLogout.fulfilled, _ => {
        setAccessToken('');
        deleteCookie('refreshToken');
        return initialState;
      })
      .addCase(onLogout.pending, state => {
        state.userLogout.isLoading = true;
      })
      .addCase(onLogout.rejected, _ => {
        setAccessToken('');
        deleteCookie('refreshToken');
        return initialState;
      });
    builder
      .addCase(onGetUserInfo.fulfilled, state => {
        state.getUser.isLoading = false;
        state.getUser.errorMessage = null;
        state.isLoggedIn = true;
      })
      .addCase(onGetUserInfo.pending, state => {
        state.getUser.isLoading = true;
        state.getUser.errorMessage = null;
      })
      .addCase(onGetUserInfo.rejected, (state, { payload: errorText }) => {
        state.getUser.isLoading = false;
        state.getUser.errorMessage = errorText;
      });
    builder
      .addCase(onUserInfoUpdate.fulfilled, state => {
        state.userUpdate = initialState.userUpdate;
      })
      .addCase(onUserInfoUpdate.pending, state => {
        state.userUpdate.isLoading = true;
        state.userUpdate.errorMessage = null;
      })
      .addCase(onUserInfoUpdate.rejected, (state, { payload: errorText }) => {
        state.userUpdate.isLoading = false;
        state.userUpdate.errorMessage = errorText;
      });
    builder
      .addCase(onPasswordForgot.fulfilled, state => {
        state.passwordReset = initialState.passwordReset;
      })
      .addCase(onPasswordForgot.pending, state => {
        state.passwordReset.isLoading = true;
        state.passwordReset.errorMessage = null;
      })
      .addCase(onPasswordForgot.rejected, (state, { payload: errorText }) => {
        state.passwordReset.isLoading = false;
        state.passwordReset.errorMessage = errorText;
      });
    builder
      .addCase(onPasswordReset.fulfilled, state => {
        state.savePassword = initialState.savePassword;
      })
      .addCase(onPasswordReset.pending, state => {
        state.savePassword.isLoading = true;
        state.savePassword.errorMessage = null;
      })
      .addCase(onPasswordReset.rejected, (state, { payload: errorText }) => {
        state.savePassword.isLoading = false;
        state.savePassword.errorMessage = errorText;
      });
  },
});

export const {
  clearPasswordResetErrorMessage,
  clearRegisterUserErrorMessage,
  clearSavePasswordErrorMessage,
  clearUserLogInErrorMessage,
  clearUserUpdateErrorMessage,
  clearGetUserErrorMessage,
} = userAdmissionSlice.actions;
export const userAdmissionReducer = userAdmissionSlice.reducer;
