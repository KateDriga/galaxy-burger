import { RootState } from '../store';
import { IFetchUserAdmissionState } from '../../utils/ts-types/fetch-state-types';

export const selectIsLoggedIn = (state: RootState): boolean =>
  state.userAdmission.isLoggedIn;

export const selectTokenIsLoading = (state: RootState): boolean =>
  state.userAdmission.tokenIsLoading;

export const selectUserPasswordResetState = (
  state: RootState
): IFetchUserAdmissionState => state.userAdmission.passwordReset;

export const selectRegisterUserState = (
  state: RootState
): IFetchUserAdmissionState => state.userAdmission.registerUser;

export const selectSaveNewPasswordState = (
  state: RootState
): IFetchUserAdmissionState => state.userAdmission.savePassword;

export const selectUserLogInState = (
  state: RootState
): IFetchUserAdmissionState => state.userAdmission.userLogin;

export const selectGetUserState = (
  state: RootState
): IFetchUserAdmissionState => state.userAdmission.getUser;

export const selectUpdateUserState = (
  state: RootState
): IFetchUserAdmissionState => state.userAdmission.userUpdate;

export const selectUserLogoutState = (
  state: RootState
): IFetchUserAdmissionState => state.userAdmission.userLogout;
