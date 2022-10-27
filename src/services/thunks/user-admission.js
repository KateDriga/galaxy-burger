import {
  failCreatingUser,
  failResettingPassword,
  failSavingPassword,
  failUpdatingUser,
  failUserLogIn,
  startCreatingUser,
  startLoggingIn,
  startResettingPassword,
  startSavingPassword,
  startUpdatingUser,
  successCreatingUser,
  successResettingPassword,
  successSavingPassword,
  successUpdatingUser,
  successUserLogIn,
} from '../slices/user-admission';
import {
  resetPassword,
  register,
  savePassword,
  login,
  logout,
  updateUserProfileInfo,
} from '../../utils/api/rest/auth';
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  RESET_PASSWORD_ROUTE,
} from '../../utils/const-variables/route-variables';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { setPersonalInfo } from '../slices/user-profile';

export function resetUserPassword(email, navigate) {
  return function (dispatch) {
    dispatch(startResettingPassword());
    resetPassword(email)
      .then(res => {
        if (res.data.success) {
          dispatch(successResettingPassword());
          navigate(RESET_PASSWORD_ROUTE);
        } else throw Error('Reset password error');
      })
      .catch(err => {
        console.error('Resetting password error:', err);
        dispatch(
          failResettingPassword({
            errorText:
              'При попытке восстановления пароля возникла ошибка. Убедитесь, что все поля заполнены корректно.',
          })
        );
      });
  };
}

export function registerUser(email, password, name, navigate) {
  return function (dispatch) {
    dispatch(startCreatingUser());
    register(email, password, name)
      .then(res => {
        if (res.data.success) {
          dispatch(successCreatingUser());
          localStorage.setItem('accessToken', res.data.accessToken);
          setCookie('refreshToken', res.data.refreshToken);
          navigate(HOME_ROUTE);
        } else throw Error(res.message);
      })
      .catch(err => {
        console.error('Register user error', err);
        dispatch(
          failCreatingUser({
            errorText:
              'Возникла ошибка. Пожалуйста, убедитесь, что все поля заполнены корректно.',
          })
        );
      });
  };
}

export function saveNewPassword(password, code, navigate) {
  return function (dispatch) {
    dispatch(startSavingPassword());
    savePassword(password, code)
      .then(res => {
        if (res.data.success) {
          dispatch(successSavingPassword());
          navigate(LOGIN_ROUTE);
        } else throw Error(res.message);
      })
      .catch(err => {
        console.error('Saving new password error', err);
        dispatch(
          failSavingPassword({
            errorText: 'Возникла ошибка. Убедитесь, что введен верный код.',
          })
        );
      });
  };
}

export function userLogin(email, password, navigate) {
  return function (dispatch) {
    dispatch(startLoggingIn());
    login(email, password)
      .then(res => {
        dispatch(successUserLogIn());
        localStorage.setItem('accessToken', res.data.accessToken);
        setCookie('refreshToken', res.data.refreshToken);
        navigate(HOME_ROUTE);
      })
      .catch(err => {
        console.error('Attempt to login failed:', err);
        dispatch(
          failUserLogIn({
            errorText:
              'Неверный E-mail или пароль. Проверьте правильность введенных данных.',
          })
        );
      });
  };
}

export function userLogout() {
  return function (dispatch) {
    // TODO dispatch user-profile actions
    logout()
      .then(_ => {
        localStorage.removeItem('accessToken');
        deleteCookie('refreshToken');
      })
      .catch(err => console.error('Failed to logout', err));
  };
}

export function updateUserPersonalInfo(name, email, password) {
  return function (dispatch) {
    const data = Object.assign(
      {},
      name && { name },
      email && { email },
      password && password
    );
    dispatch(startUpdatingUser());
    updateUserProfileInfo(data)
      .then(res => {
        dispatch(successUpdatingUser());
        const { name, email } = res.data.user;
        dispatch(setPersonalInfo({ name, email }));
      })
      .catch(err => {
        console.error('Unable to refresh user personal info', err);
        dispatch(
          failUpdatingUser({
            errorText: 'Возникла ошибка при попытке обновления данных.',
          })
        );
      });
  };
}
