import { NavRoutesEnum } from './route-types';

export enum ProfileTabsEnum {
  PROFILE = 'profile',
  HISTORY = 'history',
  LOGOUT = 'logout',
}

interface ITab {
  readonly label: string;
  readonly description?: string;
  readonly route: NavRoutesEnum;
}

export type TProfileTabs = {
  readonly [key in ProfileTabsEnum as string]: ITab;
};
