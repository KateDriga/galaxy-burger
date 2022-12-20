import { store } from '../../store';
import {
  IInitialState,
  initialState,
  userProfileReducer,
} from '../user-profile';
import {
  onGetUserInfo,
  onLogout,
  onUserInfoUpdate,
} from '../../thunks/user-admission';

describe('User profile redux slice test', () => {
  it('should return initial state without user data', () => {
    const state = store.getState().userProfile;
    expect(state).toEqual(initialState);
  });
  it('should clear user data on logout success', () => {
    const reducer = userProfileReducer(TEST_USER_PROFILE_STATE, {
      type: onLogout.fulfilled.type,
    });
    expect(reducer).toEqual(initialState);
  });
  it('should clear user data on logout error', () => {
    const reducer = userProfileReducer(TEST_USER_PROFILE_STATE, {
      type: onLogout.rejected.type,
    });
    expect(reducer).toEqual(initialState);
  });
  it('should set personal info on get user info fulfilled', () => {
    const reducer = userProfileReducer(initialState, {
      type: onGetUserInfo.fulfilled.type,
      payload: TEST_USER_PROFILE_STATE.personalInfo,
    });
    expect(reducer).toEqual(TEST_USER_PROFILE_STATE);
  });
  it('should update personal info on user info update fulfilled', () => {
    const updatedPersonalInfo: IInitialState = {
      personalInfo: {
        name: 'new test user',
        email: 'my-new-test.user@test.com',
      },
    };
    const reducer = userProfileReducer(TEST_USER_PROFILE_STATE, {
      type: onUserInfoUpdate.fulfilled.type,
      payload: updatedPersonalInfo.personalInfo,
    });
    expect(reducer).toEqual(updatedPersonalInfo);
  });
});

export const TEST_USER_PROFILE_STATE: IInitialState = {
  personalInfo: {
    name: 'test user',
    email: 'test.user@test.com',
  },
};
