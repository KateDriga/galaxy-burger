import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
import { IFetchUserAdmissionState } from '../../utils/ts-types/fetch-state-types';
import { IRegisterData, IToken } from '../../utils/ts-types/api-types';

enum AdmissionEnum {
  PASSWORD_RESET = 'passwordReset',
  SAVE_PASSWORD = 'savePassword',
  REGISTER_USER = 'registerUser',
  USER_LOGIN = 'userLogin',
  USER_LOGOUT = 'userLogout',
  USER_UPDATE = 'userUpdate',
  GET_USER = 'getUser',
}

type IInitialState = {
  [key in AdmissionEnum]: IFetchUserAdmissionState;
} & {
  isLoggedIn: boolean;
  tokenIsLoading: boolean;
};

const initialState: IInitialState = {
  isLoggedIn: false,
  tokenIsLoading: false,
  [AdmissionEnum.PASSWORD_RESET]: {
    isLoading: false,
    errorMessage: null,
  },
  [AdmissionEnum.SAVE_PASSWORD]: {
    isLoading: false,
    errorMessage: null,
  },
  [AdmissionEnum.REGISTER_USER]: {
    isLoading: false,
    errorMessage: null,
  },
  [AdmissionEnum.USER_LOGIN]: {
    isLoading: false,
    errorMessage: null,
  },
  [AdmissionEnum.USER_LOGOUT]: {
    isLoading: false,
    errorMessage: null,
  },
  [AdmissionEnum.USER_UPDATE]: {
    isLoading: false,
    errorMessage: null,
  },
  [AdmissionEnum.GET_USER]: {
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
      .addCase(
        onTokenRefresh.fulfilled,
        (state, action: PayloadAction<IToken>) => {
          setAccessToken(action.payload.accessToken);
          setCookie('refreshToken', action.payload.refreshToken);
          state.tokenIsLoading = false;
          state.isLoggedIn = true;
        }
      )
      .addCase(onTokenRefresh.pending, state => {
        state.tokenIsLoading = true;
      })
      .addCase(onTokenRefresh.rejected, state => {
        state.tokenIsLoading = false;
        state.isLoggedIn = false;
      });
    builder
      .addCase(
        onUserRegister.fulfilled,
        (state, action: PayloadAction<IRegisterData>) => {
          state.registerUser = initialState.registerUser;
          state.isLoggedIn = true;
          setAccessToken(action.payload.accessToken);
          setCookie('refreshToken', action.payload.refreshToken);
        }
      )
      .addCase(onUserRegister.pending, state => {
        state.registerUser.isLoading = true;
        state.registerUser.errorMessage = null;
      })
      .addCase(onUserRegister.rejected, (state, action) => {
        state.registerUser.isLoading = false;
        state.registerUser.errorMessage = action.payload!;
      });
    builder
      .addCase(onLogin.fulfilled, (state, action: PayloadAction<IToken>) => {
        state.userLogin = initialState.userLogin;
        state.isLoggedIn = true;
        setAccessToken(action.payload.accessToken);
        setCookie('refreshToken', action.payload.refreshToken);
      })
      .addCase(onLogin.pending, state => {
        state.userLogin.isLoading = true;
        state.userLogin.errorMessage = null;
      })
      .addCase(onLogin.rejected, (state, action) => {
        state.userLogin.isLoading = false;
        state.userLogin.errorMessage = action.payload!;
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
      .addCase(onGetUserInfo.rejected, (state, action) => {
        state.getUser.isLoading = false;
        state.getUser.errorMessage = action.payload!;
      });
    builder
      .addCase(onUserInfoUpdate.fulfilled, state => {
        state.userUpdate = initialState.userUpdate;
      })
      .addCase(onUserInfoUpdate.pending, state => {
        state.userUpdate.isLoading = true;
        state.userUpdate.errorMessage = null;
      })
      .addCase(onUserInfoUpdate.rejected, (state, action) => {
        state.userUpdate.isLoading = false;
        state.userUpdate.errorMessage = action.payload!;
      });
    builder
      .addCase(onPasswordForgot.fulfilled, state => {
        state.passwordReset = initialState.passwordReset;
      })
      .addCase(onPasswordForgot.pending, state => {
        state.passwordReset.isLoading = true;
        state.passwordReset.errorMessage = null;
      })
      .addCase(onPasswordForgot.rejected, (state, action) => {
        state.passwordReset.isLoading = false;
        state.passwordReset.errorMessage = action.payload!;
      });
    builder
      .addCase(onPasswordReset.fulfilled, state => {
        state.savePassword = initialState.savePassword;
      })
      .addCase(onPasswordReset.pending, state => {
        state.savePassword.isLoading = true;
        state.savePassword.errorMessage = null;
      })
      .addCase(onPasswordReset.rejected, (state, action) => {
        state.savePassword.isLoading = false;
        state.savePassword.errorMessage = action.payload!;
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
