import { IOrder } from './order-types';
import { IUser } from './user-types';
import { IBurgerIngredient } from './ingredient-types';

export enum AppUrlsEnum {
  AUTH_USER = '/auth/user',
  AUTH_REGISTER = '/auth/register',
  AUTH_LOGOUT = '/auth/logout',
  AUTH_LOGIN = '/auth/login',
  AUTH_TOKEN = '/auth/token',
  AUTH_PASSWORD_RESET = '/password-reset',
  AUTH_PASSWORD_SAVE = '/password-reset/reset',
  ORDERS = '/orders',
  INGREDIENTS = '/ingredients',
}

export enum ApiMethodsEnum {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
}

interface IResponse {
  readonly success: boolean;
}

export interface IToken extends IResponse {
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface IRegisterData extends IToken {
  readonly user: IUser;
}

export interface IProfileData extends IResponse {
  readonly user: IUser;
}

export interface IAdmissionMessage extends IResponse {
  readonly message: string;
}

export interface IOrderData extends IResponse {
  readonly name: string;
  readonly order: IOrder;
}

export interface IIngredientsData extends IResponse {
  data: Array<IBurgerIngredient>;
}
