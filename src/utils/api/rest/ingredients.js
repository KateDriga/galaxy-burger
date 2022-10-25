import { axiosInstance } from '../make-request';

export const getIngredients = () => {
  return axiosInstance('/ingredients');
};
