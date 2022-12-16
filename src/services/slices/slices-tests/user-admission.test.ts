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
import { onTokenRefresh } from '../../thunks/user-admission';
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
