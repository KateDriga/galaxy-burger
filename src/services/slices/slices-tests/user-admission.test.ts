import { store } from '../../store';
import {
  clearGetUserErrorMessage,
  clearPasswordResetErrorMessage,
  clearRegisterUserErrorMessage,
  clearSavePasswordErrorMessage,
  clearUserLogInErrorMessage,
  clearUserUpdateErrorMessage,
  initialState,
  TInitialState,
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
import {
  AppUrlsEnum,
  IRegisterData,
  IToken,
} from '../../../utils/ts-types/api-types';

describe('User admission redux slice test', () => {
  let mock: MockAdapter;
  beforeAll(() => (mock = new MockAdapter(axiosInstance)));
  afterAll(() => mock.reset());

  it('should return initial state', () => {
    const state = store.getState().userAdmission;
    expect(state).toEqual(initialState);
  });
  it('should clear password reset error message', () => {
    const reducer = userAdmissionReducer(
      {
        ...initialState,
        passwordReset: {
          ...initialState.passwordReset,
          errorMessage: 'Some password reset error message text',
        },
      },
      { type: clearPasswordResetErrorMessage }
    );
    expect(reducer).toEqual(initialState);
  });
  it('should clear save password error message', () => {
    const reducer = userAdmissionReducer(
      {
        ...initialState,
        savePassword: {
          ...initialState.savePassword,
          errorMessage: 'Some save password error message text',
        },
      },
      { type: clearSavePasswordErrorMessage }
    );
    expect(reducer).toEqual(initialState);
  });
  it('should clear register user error message', () => {
    const reducer = userAdmissionReducer(
      {
        ...initialState,
        registerUser: {
          ...initialState.registerUser,
          errorMessage: 'Some register user error message text',
        },
      },
      { type: clearRegisterUserErrorMessage }
    );
    expect(reducer).toEqual(initialState);
  });
  it('should clear user login error message', () => {
    const reducer = userAdmissionReducer(
      {
        ...initialState,
        userLogin: {
          ...initialState.userLogin,
          errorMessage: 'Some user login error message text',
        },
      },
      { type: clearUserLogInErrorMessage }
    );
    expect(reducer).toEqual(initialState);
  });
  it('should clear user update error message', () => {
    const reducer = userAdmissionReducer(
      {
        ...initialState,
        userUpdate: {
          ...initialState.userUpdate,
          errorMessage: 'Some user update error message text',
        },
      },
      { type: clearUserUpdateErrorMessage }
    );
    expect(reducer).toEqual(initialState);
  });
  it('should clear get user error message', () => {
    const reducer = userAdmissionReducer(
      {
        ...initialState,
        getUser: {
          ...initialState.getUser,
          errorMessage: 'Some get user error message text',
        },
      },
      { type: clearGetUserErrorMessage }
    );
    expect(reducer).toEqual(initialState);
  });
  it('should set logged in state on token refresh fulfilled', () => {
    const reducer = userAdmissionReducer(initialState, {
      type: onTokenRefresh.fulfilled.type,
      payload: TEST_TOKEN_REFRESHED_RESPONSE,
    });
    expect(reducer).toEqual({ ...initialState, isLoggedIn: true });
  });
  it('should set loading state on token refresh pending', () => {
    const reducer = userAdmissionReducer(initialState, {
      type: onTokenRefresh.pending.type,
    });
    expect(reducer).toEqual({ ...initialState, tokenIsLoading: true });
  });
  it('should reset logged in state on token refresh rejected', () => {
    const reducer = userAdmissionReducer(
      {
        ...initialState,
        isLoggedIn: true,
        tokenIsLoading: true,
      },
      {
        type: onTokenRefresh.rejected.type,
      }
    );
    expect(reducer).toEqual({
      ...initialState,
      isLoggedIn: false,
      tokenIsLoading: false,
    });
  });
  it('should fire pending and fulfilled on token refresh actions', async () => {
    const mockedOrderStore = mockStore({
      userAdmission: initialState,
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
      userAdmission: initialState,
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
    const reducer = userAdmissionReducer(
      {
        ...initialState,
        registerUser: { isLoading: true, errorMessage: 'error' },
      },
      {
        type: onUserRegister.fulfilled.type,
        payload: TEST_REGISTER_USER_RESPONSE,
      }
    );
    expect(reducer).toEqual({ ...initialState, isLoggedIn: true });
  });
  it('should set loading state on user register pending', () => {
    const reducer = userAdmissionReducer(initialState, {
      type: onUserRegister.pending.type,
    });
    expect(reducer).toEqual({
      ...initialState,
      registerUser: { ...initialState.registerUser, isLoading: true },
    });
  });
  it('should set error message on user register rejected', () => {
    const expectedError: string = 'some register user error text';
    const reducer = userAdmissionReducer(
      {
        ...initialState,
        registerUser: { ...initialState.registerUser, isLoading: true },
      },
      {
        type: onUserRegister.rejected.type,
        payload: expectedError,
      }
    );
    expect(reducer).toEqual({
      ...initialState,
      registerUser: {
        ...initialState.registerUser,
        errorMessage: expectedError,
      },
    });
  });
  it('should set logged in state on user login fulfilled', () => {
    const reducer = userAdmissionReducer(
      {
        ...initialState,
        userLogin: { isLoading: true, errorMessage: 'error' },
      },
      {
        type: onLogin.fulfilled.type,
        payload: TEST_TOKEN_REFRESHED_RESPONSE,
      }
    );
    expect(reducer).toEqual({ ...initialState, isLoggedIn: true });
  });
  it('should set loading state on user login pending', () => {
    const reducer = userAdmissionReducer(
      {
        ...initialState,
        userLogin: { ...initialState.userLogin, errorMessage: 'login error' },
      },
      {
        type: onLogin.pending.type,
      }
    );
    expect(reducer).toEqual({
      ...initialState,
      userLogin: { ...initialState.userLogin, isLoading: true },
    });
  });
  it('should set error message on user login rejected', () => {
    const expectedErrorMessage = 'incorrect email or password';
    const reducer = userAdmissionReducer(
      {
        ...initialState,
        userLogin: { ...initialState.userLogin, isLoading: true },
      },
      {
        type: onLogin.rejected.type,
        payload: expectedErrorMessage,
      }
    );
    expect(reducer).toEqual({
      ...initialState,
      userLogin: {
        ...initialState.userLogin,
        errorMessage: expectedErrorMessage,
      },
    });
  });
  it('should set logged in state to false on user logout fulfilled', () => {
    const reducer = userAdmissionReducer(
      { ...initialState, isLoggedIn: true },
      {
        type: onLogout.fulfilled.type,
      }
    );
    expect(reducer).toEqual(initialState);
  });
  it('should set loading logout state on user logout pending', () => {
    const testInitialState = { ...initialState, isLoggedIn: true };
    const reducer = userAdmissionReducer(testInitialState, {
      type: onLogout.pending.type,
    });
    expect(reducer).toEqual({
      ...testInitialState,
      userLogout: { ...testInitialState.userLogout, isLoading: true },
    });
  });
  it('should set logged in state to false on user logout rejected', () => {
    const reducer = userAdmissionReducer(
      {
        ...initialState,
        isLoggedIn: true,
        userLogout: { ...initialState.userLogout, isLoading: true },
      },
      {
        type: onLogout.rejected.type,
      }
    );
    expect(reducer).toEqual(initialState);
  });
  it('should set logged in state on get user info fulfilled', () => {
    const reducer = userAdmissionReducer(
      {
        ...initialState,
        getUser: { isLoading: true, errorMessage: 'some get user error' },
      },
      {
        type: onGetUserInfo.fulfilled.type,
      }
    );
    expect(reducer).toEqual({ ...initialState, isLoggedIn: true });
  });
  it('should set loading state on get user info pending', () => {
    const reducer = userAdmissionReducer(initialState, {
      type: onGetUserInfo.pending.type,
    });
    expect(reducer).toEqual({
      ...initialState,
      getUser: { ...initialState.getUser, isLoading: true },
    });
  });
  it('should set error message on get user info rejected', () => {
    const expectedError: string = 'get user info error message';
    const testInitialState: TInitialState = {
      ...initialState,
      isLoggedIn: true,
      getUser: { ...initialState.getUser, isLoading: true },
    };
    const reducer = userAdmissionReducer(testInitialState, {
      type: onGetUserInfo.rejected.type,
      payload: expectedError,
    });
    expect(reducer).toEqual({
      ...testInitialState,
      getUser: { isLoading: false, errorMessage: expectedError },
    });
  });
  it('should set initial password reset state on password forgot fulfilled', () => {
    const reducer = userAdmissionReducer(
      {
        ...initialState,
        passwordReset: {
          isLoading: true,
          errorMessage: 'password reset error message',
        },
      },
      {
        type: onPasswordForgot.fulfilled.type,
      }
    );
    expect(reducer).toEqual(initialState);
  });
  it('should set loading state on password forgot pending', () => {
    const reducer = userAdmissionReducer(initialState, {
      type: onPasswordForgot.pending.type,
    });
    expect(reducer).toEqual({
      ...initialState,
      passwordReset: { ...initialState.passwordReset, isLoading: true },
    });
  });
  it('should set error message on password forgot rejected', () => {
    const expectedError: string = 'password forgot error message';
    const reducer = userAdmissionReducer(
      {
        ...initialState,
        passwordReset: { ...initialState.passwordReset, isLoading: true },
      },
      {
        type: onPasswordForgot.rejected.type,
        payload: expectedError,
      }
    );
    expect(reducer).toEqual({
      ...initialState,
      passwordReset: {
        ...initialState.passwordReset,
        errorMessage: expectedError,
      },
    });
  });
  it('should set initial save password state on password reset fulfilled', () => {
    const reducer = userAdmissionReducer(
      {
        ...initialState,
        savePassword: { isLoading: true, errorMessage: 'error message' },
      },
      {
        type: onPasswordReset.fulfilled.type,
      }
    );
    expect(reducer).toEqual(initialState);
  });
  it('should set loading state on password reset pending', () => {
    const reducer = userAdmissionReducer(initialState, {
      type: onPasswordReset.pending.type,
    });
    expect(reducer).toEqual({
      ...initialState,
      savePassword: { ...initialState.savePassword, isLoading: true },
    });
  });
  it('should set error message on password reset rejected', () => {
    const expectedError: string = 'password reset error message';
    const reducer = userAdmissionReducer(
      {
        ...initialState,
        savePassword: { ...initialState.savePassword, isLoading: true },
      },
      {
        type: onPasswordReset.rejected.type,
        payload: expectedError,
      }
    );
    expect(reducer).toEqual({
      ...initialState,
      savePassword: {
        ...initialState.savePassword,
        errorMessage: expectedError,
      },
    });
  });
});

const TEST_TOKEN_REFRESHED_RESPONSE: IToken = {
  success: true,
  accessToken: 'Bearer access token',
  refreshToken: 'refresh token',
};

const TEST_REGISTER_USER_RESPONSE: IRegisterData = {
  ...TEST_TOKEN_REFRESHED_RESPONSE,
  user: {
    email: 'email.address@here.com',
    name: 'User Name',
  },
};
