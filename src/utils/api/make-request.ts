import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { AUTH_URLS, BASE_URL } from '../const-variables/app-variables';
import { onTokenRefresh } from '../../services/thunks/user-admission';
import { EnhancedStore } from '@reduxjs/toolkit';
import { ApiMethodsEnum } from '../ts-types/api-types';

export const axiosInstance: AxiosInstance = axios.create({ baseURL: BASE_URL });

let accessToken: string = '';
export const setAccessToken = (token: string): void => {
  accessToken = token;
};

let store: EnhancedStore;
export const injectStore = (_store: EnhancedStore): void => {
  store = _store;
};

interface IRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (
      config.method === ApiMethodsEnum.POST &&
      !config.headers!['Content-Type']
    ) {
      config.headers!['Content-Type'] = 'application/json';
    }
    if (config.headers!.authorization) {
      config.headers!.authorization = accessToken;
    }
    return config;
  },
  err => Promise.reject(err)
);

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (err: AxiosError) => {
    const originalConfig: IRequestConfig = err.config;
    if (
      originalConfig.url &&
      AUTH_URLS.includes(originalConfig.url) &&
      (err.response?.status === 401 || err.response?.status === 403) &&
      !originalConfig._retry
    ) {
      originalConfig._retry = true;
      store
        .getState()
        .dispatch(onTokenRefresh())
        .then(() => axiosInstance(originalConfig))
        .catch((err: any) => Promise.reject(err));
    }
    return Promise.reject(err);
  }
);
