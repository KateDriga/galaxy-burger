import axios from 'axios';
import { BASE_URL } from '../const-variables/app-variables';
import { refreshToken } from './rest/auth';
import { setCookie } from '../cookie';

export const axiosInstance = axios.create({ baseURL: BASE_URL });

axiosInstance.interceptors.request.use(
  config => {
    if (config.method === 'post' && !config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }
    if (config.headers.authorization) {
      config.headers.authorization = localStorage.getItem('accessToken');
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

      try {
        const { data: tokenInfo } = await refreshToken();
        localStorage.setItem('accessToken', tokenInfo.accessToken);
        setCookie('refreshToken', tokenInfo.refreshToken);
        originalConfig.headers.authorization =
          localStorage.getItem('accessToken');
        return axiosInstance(originalConfig);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(err);
  }
);
