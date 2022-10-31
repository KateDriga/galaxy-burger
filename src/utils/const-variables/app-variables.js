import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
  HOME_ROUTE,
  ORDERS_ROUTE,
  PROFILE_ORDERS_ROUTE,
  PROFILE_ROUTE,
} from './route-variables';

export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const MODAL_ROOT = document.getElementById('modal');

export const MENU_ITEMS = [
  {
    label: 'Конструктор',
    iconTag: BurgerIcon,
    route: HOME_ROUTE,
    end: true,
  },
  {
    label: 'Лента заказов',
    iconTag: ListIcon,
    route: ORDERS_ROUTE,
    end: false,
  },
  {
    label: 'Личный кабинет',
    iconTag: ProfileIcon,
    route: PROFILE_ROUTE,
    end: false,
  },
];

export const PROFILE_TABS = {
  profile: {
    label: 'Профиль',
    description: 'В этом разделе вы можете изменить свои персональные данные',
    route: PROFILE_ROUTE,
  },
  history: {
    label: 'История заказов',
    description: 'В этом разделе вы можете просмотреть свою историю заказов',
    route: PROFILE_ORDERS_ROUTE,
  },
  logout: { label: 'Выход', route: HOME_ROUTE },
};
