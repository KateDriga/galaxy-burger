export const selectUserPasswordResetState = state => {
  return {
    isLoading: state.userAdmission.passwordReset.isLoading,
    errorMessage: state.userAdmission.passwordReset.errorMessage,
  };
};

export const selectRegisterUserState = state => {
  return {
    isLoading: state.userAdmission.registerUser.isLoading,
    errorMessage: state.userAdmission.registerUser.errorMessage,
  };
};

export const selectSaveNewPasswordState = state => {
  return {
    isLoading: state.userAdmission.savePassword.isLoading,
    errorMessage: state.userAdmission.savePassword.errorMessage,
  };
};

export const selectUserLogInState = state => {
  return {
    isLoading: state.userAdmission.userLogin.isLoading,
    errorMessage: state.userAdmission.userLogin.errorMessage,
  };
};

export const selectUpdateUserState = state => {
  return {
    isLoading: state.userAdmission.userUpdate.isLoading,
    errorMessage: state.userAdmission.userUpdate.errorMessage,
  };
};
