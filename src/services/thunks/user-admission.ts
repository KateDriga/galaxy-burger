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
import { IFormState } from '../../utils/ts-types/form-types';
import {
  IAdmissionMessage,
  IProfileData,
  IRegisterData,
  IToken,
} from '../../utils/ts-types/api-types';
import { IUser } from '../../utils/ts-types/user-types';
import { RootState } from '../store';
import { AxiosResponse } from 'axios';

export const onUserRegister = createAsyncThunk<
  IRegisterData,
  IFormState,
  { rejectValue: string }
>(
  'user-admission/onUserRegister',
  async ({ email, password, name }: IFormState, { rejectWithValue }) => {
    try {
      const { data }: AxiosResponse<IRegisterData> = await register(
        email,
        password,
        name
      );
      return data;
    } catch (err) {
      console.error('Register user error:', err);
      return rejectWithValue(
        'Возникла ошибка. Пожалуйста, убедитесь, что все поля заполнены корректно.'
      );
    }
  }
);

export const onLogin = createAsyncThunk<
  IToken,
  IFormState,
  { rejectValue: string }
>(
  'user-admission/onLogin',
  async ({ email, password }: IFormState, { rejectWithValue }) => {
    try {
      const { data }: AxiosResponse<IToken> = await login(email, password);
      return data;
    } catch (err) {
      console.error('Attempt to login failed:', err);
      return rejectWithValue(
        'Неверный e-mail или пароль. Проверьте правильность введенных данных.'
      );
    }
  }
);

export const onLogout = createAsyncThunk<IAdmissionMessage>(
  'user-admission/onLogout',
  async () => {
    try {
      const { data }: AxiosResponse<IAdmissionMessage> = await logout();
      return data;
    } catch (err: any) {
      console.error('Failed to logout:', err);
      throw new Error(err);
    }
  }
);

export const onGetUserInfo = createAsyncThunk<
  IUser,
  void,
  { state: RootState; rejectValue: string }
>('user-admission/onGetUserInfo', async (_, { getState, rejectWithValue }) => {
  const state: RootState = getState();
  const personalInfo: IUser = state.userProfile.personalInfo;
  if (personalInfo.name && personalInfo.email) {
    return { name: personalInfo.name, email: personalInfo.email };
  }
  try {
    const { data }: AxiosResponse<IProfileData> = await getUserProfileInfo();
    return data.user;
  } catch (err) {
    console.error('Unable to load personal information', err);
    return rejectWithValue('Не удалось загрузить информацию о пользователе.');
  }
});

export const onUserInfoUpdate = createAsyncThunk<
  IUser,
  IFormState,
  { rejectValue: string }
>(
  'user-admission/onUserInfoUpdate',
  async (form: IFormState, { rejectWithValue }) => {
    Object.keys(form).forEach(key => {
      if (form[key] === '') {
        delete form[key];
      }
    });
    try {
      const { data }: AxiosResponse<IProfileData> = await updateUserProfileInfo(
        form
      );
      return data.user;
    } catch (err) {
      console.error('Unable to refresh user personal info', err);
      return rejectWithValue('Возникла ошибка при попытке обновления данных.');
    }
  }
);

export const onTokenRefresh = createAsyncThunk<IToken>(
  'user-admission/onTokenRefresh',
  async () => {
    try {
      const { data }: AxiosResponse<IToken> = await refreshToken();
      return data;
    } catch (err: any) {
      console.error('Token update error:', err);
      throw new Error(err);
    }
  }
);

export const onPasswordForgot = createAsyncThunk<
  IAdmissionMessage,
  IFormState,
  { rejectValue: string }
>(
  'user-admission/onPasswordForgot',
  async ({ email }: IFormState, { rejectWithValue }) => {
    try {
      const { data }: AxiosResponse<IAdmissionMessage> = await resetPassword(
        email
      );
      return data;
    } catch (err) {
      console.error('Resetting password error:', err);
      return rejectWithValue(
        'При попытке восстановления пароля возникла ошибка. Убедитесь, что все поля заполнены корректно.'
      );
    }
  }
);

export const onPasswordReset = createAsyncThunk<
  IAdmissionMessage,
  IFormState,
  { rejectValue: string }
>(
  'user-admission/onPasswordReset',
  async ({ password, code }: IFormState, { rejectWithValue }) => {
    try {
      const { data }: AxiosResponse<IAdmissionMessage> = await savePassword(
        password,
        code
      );
      return data;
    } catch (err) {
      console.error('Attempt to save password failed:', err);
      return rejectWithValue(
        'Возникла ошибка. Убедитесь, что введен верный код.'
      );
    }
  }
);
