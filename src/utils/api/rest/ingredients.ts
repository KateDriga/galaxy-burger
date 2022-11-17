import { axiosInstance } from '../make-request';
import { AxiosPromise } from 'axios';
import { AppUrlsEnum, IIngredientsData } from '../../ts-types/api-types';

export const getIngredients = (): AxiosPromise<IIngredientsData> => {
  return axiosInstance(AppUrlsEnum.INGREDIENTS);
};
