import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const MODAL_ROOT = document.getElementById('modal');

export const MENU_ITEMS = [
  {
    label: 'Конструктор',
    iconTag: BurgerIcon,
  },
  {
    label: 'Лента заказов',
    iconTag: ListIcon,
  },
  {
    label: 'Личный кабинет',
    iconTag: ProfileIcon,
  },
];
