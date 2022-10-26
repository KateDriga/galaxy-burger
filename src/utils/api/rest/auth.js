import { axiosInstance } from '../make-request';
import { getCookie } from '../../cookie';

export const registerUser = (email, password, name) => {
  return axiosInstance({
    url: '/auth/register',
    method: 'post',
    data: { email, password, name },
  });
};

export const resetPassword = email => {
  return axiosInstance({
    url: '/password-reset',
    method: 'post',
    data: { email },
  });
};

export const savePassword = (password, code) => {
  return axiosInstance({
    url: '/password-reset/reset',
    method: 'post',
    data: { password, token: code },
  });
};

export const refreshToken = () => {
  return axiosInstance({
    url: '/auth/token',
    method: 'post',
    data: { token: getCookie('refreshToken') },
  });
};

export const login = (email, password) => {
  return axiosInstance({
    url: '/auth/login',
    method: 'post',
    data: { email, password },
  });
};

export const logout = () => {
  return axiosInstance({
    url: '/auth/logout',
    method: 'post',
    data: { token: getCookie('refreshToken') },
  });
};
