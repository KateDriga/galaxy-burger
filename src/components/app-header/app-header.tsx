import { FC } from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { MENU_ITEMS } from '../../utils/const-variables/app-variables';
import { NavLink } from 'react-router-dom';
import { NavRoutesEnum } from '../../utils/ts-types/route-types';
import appHeaderStyles from './app-header.module.css';
import cn from 'classnames';

export const AppHeader: FC = () => {
  return (
    <header className={cn(appHeaderStyles.header, 'p-10')}>
      <nav className={appHeaderStyles.nav}>
        <ul className={appHeaderStyles.nav_list}>
          <li className={appHeaderStyles.nav_item}>
            <NavLink
              to={NavRoutesEnum.HOME_ROUTE}
              className={appHeaderStyles.nav_item_link}
            >
              <Logo />
            </NavLink>
          </li>
          {MENU_ITEMS.map(i => {
            const IconTag = i.iconTag;
            return (
              <li key={i.label} className={appHeaderStyles.nav_item}>
                <NavLink
                  to={i.route}
                  end={i.end}
                  className={({ isActive }) =>
                    cn(appHeaderStyles.nav_item_link, {
                      [appHeaderStyles.nav_item_link_selected]: isActive,
                    })
                  }
                >
                  {({ isActive }) => (
                    <>
                      <IconTag type={isActive ? 'primary' : 'secondary'} />
                      <p className="text text_type_main-default p-2">
                        {i.label}
                      </p>
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
