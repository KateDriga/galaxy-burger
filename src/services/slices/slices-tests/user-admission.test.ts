import { store } from '../../store';
import {
  clearGetUserErrorMessage,
  clearPasswordResetErrorMessage,
  clearRegisterUserErrorMessage,
  clearSavePasswordErrorMessage,
  clearUserLogInErrorMessage,
  clearUserUpdateErrorMessage,
  userAdmissionReducer,
} from '../user-admission';
import {
  onGetUserInfo,
  onLogin,
  onLogout,
  onPasswordForgot,
  onPasswordReset,
  onTokenRefresh,
  onUserRegister,
} from '../../thunks/user-admission';
import { mockStore } from './mock-store-config';
import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '../../../utils/api/make-request';
import { BASE_URL } from '../../../utils/const-variables/app-variables';
import { AppUrlsEnum } from '../../../utils/ts-types/api-types';

describe('User admission redux slice test', () => {
  let mock: MockAdapter;
  beforeAll(() => (mock = new MockAdapter(axiosInstance)));
  afterAll(() => mock.reset());

  it('should return initial state', () => {
    const state = store.getState().userAdmission;
    expect(state).toEqual(TEST_DEFAULT_USER_ADMISSION_STATE);
  });
  it('should clear password reset error message', () => {
    const reducer = userAdmissionReducer(
      {
        ...TEST_DEFAULT_USER_ADMISSION_STATE,
        passwordReset: {
          isLoading: false,
          errorMessage: 'Some error message text',
        },
      },
      { type: clearPasswordResetErrorMessage }
    );
    expect(reducer.passwordReset).toEqual(
      TEST_DEFAULT_USER_ADMISSION_STATE.passwordReset
    );
  });
  it('should clear save password error message', () => {
    const reducer = userAdmissionReducer(
      {
        ...TEST_DEFAULT_USER_ADMISSION_STATE,
        savePassword: {
          isLoading: false,
          errorMessage: 'Some error message text',
        },
      },
      { type: clearSavePasswordErrorMessage }
    );
    expect(reducer.savePassword).toEqual(
      TEST_DEFAULT_USER_ADMISSION_STATE.savePassword
    );
  });
  it('should clear register user error message', () => {
    const reducer = userAdmissionReducer(
      {
        ...TEST_DEFAULT_USER_ADMISSION_STATE,
        registerUser: {
          isLoading: false,
          errorMessage: 'Some error message text',
        },
      },
      { type: clearRegisterUserErrorMessage }
    );
    expect(reducer.registerUser).toEqual(
      TEST_DEFAULT_USER_ADMISSION_STATE.registerUser
    );
  });
  it('should clear user login error message', () => {
    const reducer = userAdmissionReducer(
      {
        ...TEST_DEFAULT_USER_ADMISSION_STATE,
        userLogin: {
          isLoading: false,
          errorMessage: 'Some error message text',
        },
      },
      { type: clearUserLogInErrorMessage }
    );
    expect(reducer.userLogin).toEqual(
      TEST_DEFAULT_USER_ADMISSION_STATE.userLogin
    );
  });
  it('should clear user update error message', () => {
    const reducer = userAdmissionReducer(
      {
        ...TEST_DEFAULT_USER_ADMISSION_STATE,
        userUpdate: {
          isLoading: false,
          errorMessage: 'Some error message text',
        },
      },
      { type: clearUserUpdateErrorMessage }
    );
    expect(reducer.userUpdate).toEqual(
      TEST_DEFAULT_USER_ADMISSION_STATE.userUpdate
    );
  });
  it('should clear get user error message', () => {
    const reducer = userAdmissionReducer(
      {
        ...TEST_DEFAULT_USER_ADMISSION_STATE,
        getUser: {
          isLoading: false,
          errorMessage: 'Some error message text',
        },
      },
      { type: clearGetUserErrorMessage }
    );
    expect(reducer.getUser).toEqual(TEST_DEFAULT_USER_ADMISSION_STATE.getUser);
  });
  it('should set logged in state on token refresh fulfilled', () => {
    const reducer = userAdmissionReducer(TEST_DEFAULT_USER_ADMISSION_STATE, {
      type: onTokenRefresh.fulfilled.type,
      payload: {
        success: true,
        accessToken: 'some access token',
        refreshToken: 'some refresh token',
      },
    });
    expect(reducer.isLoggedIn).toEqual(true);
  });
  it('should set loading state on token refresh pending', () => {
    const reducer = userAdmissionReducer(TEST_DEFAULT_USER_ADMISSION_STATE, {
      type: onTokenRefresh.pending.type,
    });
    expect(reducer.tokenIsLoading).toEqual(true);
  });
  it('should reset logged in state on token refresh rejected', () => {
    const reducer = userAdmissionReducer(
      {
        ...TEST_DEFAULT_USER_ADMISSION_STATE,
        isLoggedIn: true,
        tokenIsLoading: true,
      },
      {
        type: onTokenRefresh.rejected.type,
      }
    );
    expect(reducer.isLoggedIn).toEqual(false);
    expect(reducer.tokenIsLoading).toEqual(false);
  });
  it('should fire pending and fulfilled on token refresh actions', async () => {
    const mockedOrderStore = mockStore({
      userAdmission: TEST_DEFAULT_USER_ADMISSION_STATE,
    });
    mock
      .onPost(`${BASE_URL}${AppUrlsEnum.AUTH_TOKEN}`)
      .reply(200, TEST_TOKEN_REFRESHED_RESPONSE);
    const expectedActions = [
      { type: onTokenRefresh.pending.type },
      {
        type: onTokenRefresh.fulfilled.type,
        payload: TEST_TOKEN_REFRESHED_RESPONSE,
      },
    ];

    await mockedOrderStore.dispatch(onTokenRefresh());
    const actions = mockedOrderStore.getActions();

    expect(actions[0].type).toEqual(expectedActions[0].type);
    expect(actions[1].type).toEqual(expectedActions[1].type);
    expect(actions[1].payload).toEqual(expectedActions[1].payload);
  });
  it('should fire pending and rejected on token refresh actions', async () => {
    const mockedOrderStore = mockStore({
      userAdmission: TEST_DEFAULT_USER_ADMISSION_STATE,
    });
    mock.onPost(`${BASE_URL}${AppUrlsEnum.AUTH_TOKEN}`).reply(401);
    const expectedActions = [
      { type: onTokenRefresh.pending.type },
      { type: onTokenRefresh.rejected.type },
    ];

    await mockedOrderStore.dispatch(onTokenRefresh());
    const actions = mockedOrderStore.getActions();

    expect(actions[0].type).toEqual(expectedActions[0].type);
    expect(actions[1].type).toEqual(expectedActions[1].type);
  });
  it('should set logged in state on user register fulfilled', () => {
    const reducer = userAdmissionReducer(TEST_DEFAULT_USER_ADMISSION_STATE, {
      type: onUserRegister.fulfilled.type,
      payload: TEST_REGISTER_LOGIN_USER_RESPONSE,
    });
    expect(reducer.isLoggedIn).toEqual(true);
    expect(reducer.registerUser.isLoading).toEqual(false);
    expect(reducer.registerUser.errorMessage).toBeNull();
  });
  it('should set loading state on user register pending', () => {
    const reducer = userAdmissionReducer(TEST_DEFAULT_USER_ADMISSION_STATE, {
      type: onUserRegister.pending.type,
    });
    expect(reducer.registerUser.isLoading).toEqual(true);
  });
  it('should set error message on user register rejected', () => {
    const expectedError: string = 'some error text';
    const reducer = userAdmissionReducer(
      {
        ...TEST_DEFAULT_USER_ADMISSION_STATE,
        registerUser: { isLoading: true, errorMessage: null },
      },
      {
        type: onUserRegister.rejected.type,
        payload: expectedError,
      }
    );
    expect(reducer.registerUser.isLoading).toEqual(false);
    expect(reducer.registerUser.errorMessage).toEqual(expectedError);
    expect(reducer.isLoggedIn).toEqual(false);
  });
  it('should set logged in state on user login fulfilled', () => {
    const reducer = userAdmissionReducer(TEST_DEFAULT_USER_ADMISSION_STATE, {
      type: onLogin.fulfilled.type,
      payload: TEST_REGISTER_LOGIN_USER_RESPONSE,
    });
    expect(reducer.isLoggedIn).toEqual(true);
    expect(reducer.userLogin.isLoading).toEqual(false);
    expect(reducer.userLogin.errorMessage).toBeNull();
  });
  it('should set loading state on user login pending', () => {
    const reducer = userAdmissionReducer(TEST_DEFAULT_USER_ADMISSION_STATE, {
      type: onLogin.pending.type,
    });
    expect(reducer.userLogin.isLoading).toEqual(true);
  });
  it('should set error message on user login rejected', () => {
    const reducer = userAdmissionReducer(
      {
        ...TEST_DEFAULT_USER_ADMISSION_STATE,
        userLogin: { isLoading: true, errorMessage: null },
      },
      {
        type: onLogin.rejected.type,
        payload: { success: false, message: 'incorrect email or password' },
      }
    );
    expect(reducer.userLogin.isLoading).toEqual(false);
    expect(reducer.userLogin.errorMessage).not.toBeNull();
    expect(reducer.isLoggedIn).toEqual(false);
  });
  it('should set logged in state to false on user logout fulfilled', () => {
    const reducer = userAdmissionReducer(
      { ...TEST_DEFAULT_USER_ADMISSION_STATE, isLoggedIn: true },
      {
        type: onLogout.fulfilled.type,
      }
    );
    expect(reducer.isLoggedIn).toEqual(false);
    expect(reducer.userLogout).toEqual(
      TEST_DEFAULT_USER_ADMISSION_STATE.userLogout
    );
  });
  it('should set loading logout state on user logout pending', () => {
    const reducer = userAdmissionReducer(
      { ...TEST_DEFAULT_USER_ADMISSION_STATE, isLoggedIn: true },
      {
        type: onLogout.pending.type,
      }
    );
    expect(reducer.userLogout.isLoading).toEqual(true);
  });
  it('should set logged in state to false on user logout rejected', () => {
    const reducer = userAdmissionReducer(
      {
        ...TEST_DEFAULT_USER_ADMISSION_STATE,
        isLoggedIn: true,
        userLogout: { isLoading: true, errorMessage: null },
      },
      {
        type: onLogout.rejected.type,
      }
    );
    expect(reducer.isLoggedIn).toEqual(false);
    expect(reducer.userLogout).toEqual(
      TEST_DEFAULT_USER_ADMISSION_STATE.userLogout
    );
  });
  it('should set logged in state on get user info fulfilled', () => {
    const reducer = userAdmissionReducer(
      {
        ...TEST_DEFAULT_USER_ADMISSION_STATE,
        getUser: { isLoading: true, errorMessage: null },
      },
      {
        type: onGetUserInfo.fulfilled.type,
      }
    );
    expect(reducer.isLoggedIn).toEqual(true);
    expect(reducer.getUser.isLoading).toEqual(false);
    expect(reducer.getUser.errorMessage).toBeNull();
  });
  it('should set loading state on get user info pending', () => {
    const reducer = userAdmissionReducer(TEST_DEFAULT_USER_ADMISSION_STATE, {
      type: onGetUserInfo.pending.type,
    });
    expect(reducer.getUser.isLoading).toEqual(true);
  });
  it('should set error message on get user info rejected', () => {
    const expectedError: string = 'error message';
    const reducer = userAdmissionReducer(
      {
        ...TEST_DEFAULT_USER_ADMISSION_STATE,
        isLoggedIn: true,
        getUser: { isLoading: true, errorMessage: null },
      },
      {
        type: onGetUserInfo.rejected.type,
        payload: expectedError,
      }
    );
    expect(reducer.getUser.isLoading).toEqual(false);
    expect(reducer.getUser.errorMessage).toEqual(expectedError);
  });
  it('should set initial password reset state on password forgot fulfilled', () => {
    const reducer = userAdmissionReducer(
      {
        ...TEST_DEFAULT_USER_ADMISSION_STATE,
        passwordReset: { isLoading: true, errorMessage: 'message' },
      },
      {
        type: onPasswordForgot.fulfilled.type,
      }
    );
    expect(reducer.passwordReset.isLoading).toEqual(false);
    expect(reducer.passwordReset.errorMessage).toBeNull();
  });
  it('should set loading state on password forgot pending', () => {
    const reducer = userAdmissionReducer(TEST_DEFAULT_USER_ADMISSION_STATE, {
      type: onPasswordForgot.pending.type,
    });
    expect(reducer.passwordReset.isLoading).toEqual(true);
  });
  it('should set error message on password forgot rejected', () => {
    const expectedError: string = 'password forgot error message';
    const reducer = userAdmissionReducer(
      {
        ...TEST_DEFAULT_USER_ADMISSION_STATE,
        passwordReset: { isLoading: true, errorMessage: null },
      },
      {
        type: onPasswordForgot.rejected.type,
        payload: expectedError,
      }
    );
    expect(reducer.passwordReset.isLoading).toEqual(false);
    expect(reducer.passwordReset.errorMessage).toEqual(expectedError);
  });
  it('should set initial save password state on password reset fulfilled', () => {
    const reducer = userAdmissionReducer(
      {
        ...TEST_DEFAULT_USER_ADMISSION_STATE,
        savePassword: { isLoading: true, errorMessage: 'message' },
      },
      {
        type: onPasswordReset.fulfilled.type,
      }
    );
    expect(reducer.savePassword).toEqual(
      TEST_DEFAULT_USER_ADMISSION_STATE.savePassword
    );
  });
  it('should set loading state on password reset pending', () => {
    const reducer = userAdmissionReducer(TEST_DEFAULT_USER_ADMISSION_STATE, {
      type: onPasswordReset.pending.type,
    });
    expect(reducer.savePassword.isLoading).toEqual(true);
  });
  it('should set error message on password reset rejected', () => {
    const expectedError: string = 'password reset error message';
    const reducer = userAdmissionReducer(
      {
        ...TEST_DEFAULT_USER_ADMISSION_STATE,
        savePassword: { isLoading: true, errorMessage: null },
      },
      {
        type: onPasswordReset.rejected.type,
        payload: expectedError,
      }
    );
    expect(reducer.savePassword.isLoading).toEqual(false);
    expect(reducer.savePassword.errorMessage).toEqual(expectedError);
  });
});

const TEST_DEFAULT_USER_ADMISSION_STATE = {
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
    errorMessage: null,
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

const TEST_TOKEN_REFRESHED_RESPONSE = {
  success: true,
  accessToken: 'Bearer access token',
  refreshToken: 'refresh token',
};

const TEST_REGISTER_LOGIN_USER_RESPONSE = {
  ...TEST_TOKEN_REFRESHED_RESPONSE,
  user: {
    email: 'email.address@here.com',
    name: 'User Name',
  },
};
