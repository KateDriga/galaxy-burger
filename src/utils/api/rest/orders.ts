import { axiosInstance } from '../make-request';
import { AxiosPromise } from 'axios';
import {
  ApiMethodsEnum,
  AppUrlsEnum,
  IOrderData,
} from '../../ts-types/api-types';

export const createOrder = (
  ingredientIds: Array<string>
): AxiosPromise<IOrderData> => {
  return axiosInstance({
    url: AppUrlsEnum.ORDERS,
    method: ApiMethodsEnum.POST,
    data: { ingredients: ingredientIds },
    headers: { authorization: true },
  });
};
