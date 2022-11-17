import { NavRoutesEnum } from './route-types';
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';

export interface IMenuItem {
  readonly label: string;
  readonly iconTag: ({ type }: TIconProps) => JSX.Element;
  readonly route: NavRoutesEnum;
  readonly end: boolean;
}
