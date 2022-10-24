import {
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
  FORGOT_PASSWORD_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
} from './route-variables';

export const FORM_INPUTS = {
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

export const LOGIN_ACTIONS = [
  {
    path: REGISTER_ROUTE,
    description: 'Вы - новый пользователь?',
    title: 'Зарегистрироваться',
  },
  {
    path: FORGOT_PASSWORD_ROUTE,
    description: 'Забыли пароль?',
    title: 'Восстановить пароль',
  },
];

export const REGISTER_ACTIONS = [
  {
    path: LOGIN_ROUTE,
    description: 'Уже зарегистрированы?',
    title: 'Войти',
  },
];

export const FORGOT_RESET_PASSWORD_ACTIONS = [
  {
    path: LOGIN_ROUTE,
    description: 'Вспомнили пароль?',
    title: 'Войти',
  },
];
