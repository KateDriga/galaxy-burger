import axios from 'axios';
import { BASE_URL } from '../const-variables/app-variables';
import { refreshToken } from './rest/auth';
import { setCookie } from '../cookie';

let accessToken = null;

export const setAccessToken = token => (accessToken = token);

export const axiosInstance = axios.create({ baseURL: BASE_URL });

axiosInstance.interceptors.request.use(
  config => {
    if (config.method === 'post' && !config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }
    if (config.headers.authorization) {
      config.headers['Authorization'] = accessToken;
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
      !['/auth/login', '/auth/register', '/auth/token'].includes(
        originalConfig.url
      ) &&
      err.response
    ) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        refreshToken()
          .then(res => {
            setAccessToken(res.data.accessToken);
            setCookie('refreshToken', res.data.refreshToken);
            return axiosInstance(originalConfig);
          })
          .catch(err => Promise.reject(err));
      }
    }
    return Promise.reject(err);
  }
);
