import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavRoutesEnum } from '../ts-types/route-types';
import { IMenuItem } from '../ts-types/menu-types';
import { ProfileTabsEnum, TProfileTabs } from '../ts-types/profile-types';
import { AppUrlsEnum } from '../ts-types/api-types';

export const BASE_URL: string = 'https://norma.nomoreparties.space/api';

export const AUTH_URLS: Array<string> = [
  AppUrlsEnum.AUTH_USER,
  AppUrlsEnum.ORDERS,
];

export const MODAL_ROOT: HTMLElement = document.getElementById('modal')!;

export const MENU_ITEMS: Array<IMenuItem> = [
  {
    label: 'Конструктор',
    iconTag: BurgerIcon,
    route: NavRoutesEnum.HOME_ROUTE,
    end: true,
  },
  {
    label: 'Лента заказов',
    iconTag: ListIcon,
    route: NavRoutesEnum.ORDERS_ROUTE,
    end: false,
  },
  {
    label: 'Личный кабинет',
    iconTag: ProfileIcon,
    route: NavRoutesEnum.PROFILE_ROUTE,
    end: false,
  },
];

export const PROFILE_TABS: TProfileTabs = {
  [ProfileTabsEnum.PROFILE]: {
    label: 'Профиль',
    description: 'В этом разделе вы можете изменить свои персональные данные',
    route: NavRoutesEnum.PROFILE_ROUTE,
  },
  [ProfileTabsEnum.HISTORY]: {
    label: 'История заказов',
    description: 'В этом разделе вы можете просмотреть свою историю заказов',
    route: NavRoutesEnum.PROFILE_ORDERS_ROUTE,
  },
  [ProfileTabsEnum.LOGOUT]: { label: 'Выход', route: NavRoutesEnum.HOME_ROUTE },
};
