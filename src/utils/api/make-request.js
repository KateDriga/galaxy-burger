import axios from 'axios';
import { BASE_URL } from '../const-variables/app-variables';
import { store } from '../../services/store';
import { onTokenRefresh } from '../../services/thunks/user-admission';

export const axiosInstance = axios.create({ baseURL: BASE_URL });

let accessToken = '';
export const setAccessToken = token => (accessToken = token);

axiosInstance.interceptors.request.use(
  config => {
    if (config.method === 'post' && !config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }
    if (config.headers.authorization) {
      config.headers.authorization = accessToken;
    }
    return config;
  },
  err => Promise.reject(err)
);

axiosInstance.interceptors.response.use(
  res => res,
  async err => {
    const originalConfig = err.config;
    if (
      ['/auth/user', '/orders'].includes(originalConfig.url) &&
      (err.response.status === 401 || err.response.status === 403) &&
      !originalConfig._retry
    ) {
      originalConfig._retry = true;
      store
        .dispatch(onTokenRefresh())
        .then(() => axiosInstance(originalConfig))
        .catch(err => Promise.reject(err));
    }
    return Promise.reject(err);
  }
);
