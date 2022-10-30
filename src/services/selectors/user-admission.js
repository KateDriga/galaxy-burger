export const selectIsLoggedIn = state => state.userAdmission.isLoggedIn;

export const selectTokenIsLoading = state => state.userAdmission.tokenIsLoading;

export const selectUserPasswordResetState = state =>
  state.userAdmission.passwordReset;

export const selectRegisterUserState = state =>
  state.userAdmission.registerUser;

export const selectSaveNewPasswordState = state =>
  state.userAdmission.savePassword;

export const selectUserLogInState = state => state.userAdmission.userLogin;

export const selectGetUserState = state => state.userAdmission.getUser;

export const selectUpdateUserState = state => state.userAdmission.userUpdate;

export const selectUserLogoutState = state => state.userAdmission.userLogout;
