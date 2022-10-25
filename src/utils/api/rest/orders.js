import { axiosInstance } from '../make-request';

export const createOrder = ingredientIds => {
  return axiosInstance({
    url: '/orders',
    method: 'post',
    data: { ingredients: ingredientIds },
  });
};
