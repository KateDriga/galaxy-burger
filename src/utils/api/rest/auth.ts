import { axiosInstance } from '../make-request';
import { getCookie } from '../../cookie';
import { AxiosPromise } from 'axios';
import { IFormState } from '../../ts-types/form-types';
import {
  ApiMethodsEnum,
  AppUrlsEnum,
  IAdmissionMessage,
  IProfileData,
  IRegisterData,
  IToken,
} from '../../ts-types/api-types';

export const register = (
  email: string,
  password: string,
  name: string
): AxiosPromise<IRegisterData> => {
  return axiosInstance({
    url: AppUrlsEnum.AUTH_REGISTER,
    method: ApiMethodsEnum.POST,
    data: { email, password, name },
  });
};

export const resetPassword = (
  email: string
): AxiosPromise<IAdmissionMessage> => {
  return axiosInstance({
    url: AppUrlsEnum.AUTH_PASSWORD_RESET,
    method: ApiMethodsEnum.POST,
    data: { email },
  });
};

export const savePassword = (
  password: string,
  code: string
): AxiosPromise<IAdmissionMessage> => {
  return axiosInstance({
    url: AppUrlsEnum.AUTH_PASSWORD_SAVE,
    method: ApiMethodsEnum.POST,
    data: { password, token: code },
  });
};

export const refreshToken = (): AxiosPromise<IToken> => {
  return axiosInstance({
    url: AppUrlsEnum.AUTH_TOKEN,
    method: ApiMethodsEnum.POST,
    data: { token: getCookie('refreshToken') },
  });
};

export const login = (
  email: string,
  password: string
): AxiosPromise<IToken> => {
  return axiosInstance({
    url: AppUrlsEnum.AUTH_LOGIN,
    method: ApiMethodsEnum.POST,
    data: { email, password },
  });
};

export const logout = (): AxiosPromise<IAdmissionMessage> => {
  return axiosInstance({
    url: AppUrlsEnum.AUTH_LOGOUT,
    method: ApiMethodsEnum.POST,
    data: { token: getCookie('refreshToken') },
  });
};

export const getUserProfileInfo = (): AxiosPromise<IProfileData> => {
  return axiosInstance({
    url: AppUrlsEnum.AUTH_USER,
    headers: { authorization: true },
  });
};

export const updateUserProfileInfo = (
  data: IFormState
): AxiosPromise<IProfileData> => {
  return axiosInstance({
    url: AppUrlsEnum.AUTH_USER,
    method: ApiMethodsEnum.PATCH,
    headers: { authorization: true },
    data,
  });
};
