import { useMatch } from 'react-router-dom';
import { NavRoutesEnum } from '../utils/ts-types/route-types';

export const useIsProfileFeed = (): boolean =>
  useMatch(NavRoutesEnum.PROFILE_ORDERS_ROUTE) !== null;

export const useIsProfileOrderFeed = (): boolean =>
  useMatch(NavRoutesEnum.PROFILE_ORDER_ROUTE) !== null;
