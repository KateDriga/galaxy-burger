import {
  resetPassword,
  register,
  savePassword,
  login,
  logout,
  updateUserProfileInfo,
  refreshToken,
  getUserProfileInfo,
} from '../../utils/api/rest/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const onUserRegister = createAsyncThunk(
  'user-admission/onUserRegister',
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const { data } = await register(email, password, name);
      return data;
    } catch (err) {
      console.error('Register user error:', err);
      return rejectWithValue(
        'Возникла ошибка. Пожалуйста, убедитесь, что все поля заполнены корректно.'
      );
    }
  }
);

export const onLogin = createAsyncThunk(
  'user-admission/onLogin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await login(email, password);
      return data;
    } catch (err) {
      console.error('Attempt to login failed:', err);
      return rejectWithValue(
        'Неверный e-mail или пароль. Проверьте правильность введенных данных.'
      );
    }
  }
);

export const onLogout = createAsyncThunk(
  'user-admission/onLogout',
  async () => {
    try {
      const { data } = await logout();
      return data;
    } catch (err) {
      console.error('Failed to logout:', err);
      throw new Error(err);
    }
  }
);

export const onGetUserInfo = createAsyncThunk(
  'user-admission/onGetUserInfo',
  async (_, { getState, rejectWithValue }) => {
    const {
      userProfile: { personalInfo },
    } = getState();
    if (personalInfo.name && personalInfo.email) {
      return { name: personalInfo.name, email: personalInfo.email };
    }
    try {
      const { data } = await getUserProfileInfo();
      return data.user;
    } catch (err) {
      console.error('Unable to load personal information', err);
      return rejectWithValue('Не удалось загрузить информацию о пользователе.');
    }
  }
);

export const onUserInfoUpdate = createAsyncThunk(
  'user-admission/onUserInfoUpdate',
  async ({ name, email, password }, { rejectWithValue }) => {
    const requestBody = Object.assign(
      {},
      name && { name },
      email && { email },
      password && { password }
    );
    try {
      const { data } = await updateUserProfileInfo(requestBody);
      return data.user;
    } catch (err) {
      console.error('Unable to refresh user personal info', err);
      return rejectWithValue('Возникла ошибка при попытке обновления данных.');
    }
  }
);

export const onTokenRefresh = createAsyncThunk(
  'user-admission/onTokenRefresh',
  async () => {
    try {
      const { data } = await refreshToken();
      return data;
    } catch (err) {
      console.error('Token update error:', err);
      throw new Error(err);
    }
  }
);

export const onPasswordForgot = createAsyncThunk(
  'user-admission/onPasswordForgot',
  async ({ email }, { rejectWithValue }) => {
    try {
      const { data } = await resetPassword(email);
      return data;
    } catch (err) {
      console.error('Resetting password error:', err);
      return rejectWithValue(
        'При попытке восстановления пароля возникла ошибка. Убедитесь, что все поля заполнены корректно.'
      );
    }
  }
);

export const onPasswordReset = createAsyncThunk(
  'user-admission/onPasswordReset',
  async ({ password, code }, { rejectWithValue }) => {
    try {
      const { data } = await savePassword(password, code);
      return data;
    } catch (err) {
      console.error('Attempt to save password failed:', err);
      return rejectWithValue(
        'Возникла ошибка. Убедитесь, что введен верный код.'
      );
    }
  }
);
