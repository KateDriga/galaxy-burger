import {
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavRoutesEnum } from '../ts-types/route-types';
import { IFormAction, IFormInputs } from '../ts-types/form-types';

export const FORM_INPUTS: IFormInputs = {
  name: {
    tagType: Input,
    name: 'name',
    placeholder: 'Имя',
  },
  code: {
    tagType: Input,
    name: 'code',
    placeholder: 'Введите код из письма',
  },
  email: {
    tagType: EmailInput,
    name: 'email',
    placeholder: 'E-mail',
  },
  password: {
    tagType: PasswordInput,
    name: 'password',
    placeholder: 'Пароль',
  },
};

export const LOGIN_ACTIONS: Array<IFormAction> = [
  {
    path: NavRoutesEnum.REGISTER_ROUTE,
    description: 'Вы - новый пользователь?',
    title: 'Зарегистрироваться',
  },
  {
    path: NavRoutesEnum.FORGOT_PASSWORD_ROUTE,
    description: 'Забыли пароль?',
    title: 'Восстановить пароль',
  },
];

export const REGISTER_ACTIONS: Array<IFormAction> = [
  {
    path: NavRoutesEnum.LOGIN_ROUTE,
    description: 'Уже зарегистрированы?',
    title: 'Войти',
  },
];

export const FORGOT_RESET_PASSWORD_ACTIONS: Array<IFormAction> = [
  {
    path: NavRoutesEnum.LOGIN_ROUTE,
    description: 'Вспомнили пароль?',
    title: 'Войти',
  },
];
