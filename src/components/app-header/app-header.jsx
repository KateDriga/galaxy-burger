import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { MENU_ITEMS } from '../../utils/appConstVariables';
import cn from 'classnames';
import appHeaderStyles from './app-header.module.css';

export const AppHeader = () => {
  const selectedMenuItem = 'Конструктор';

  return (
    <header className={cn(appHeaderStyles.header, 'p-10')}>
      <nav className={appHeaderStyles.nav}>
        <ul className={appHeaderStyles.nav_list}>
          <li className={appHeaderStyles.nav_item}>
            {/*TODO add router link*/}
            {/*eslint-disable-next-line*/}
            <a href="#" className={appHeaderStyles.nav_item_link}>
              <Logo />
            </a>
          </li>
          {MENU_ITEMS.map(i => {
            const isSelected = i.label === selectedMenuItem;
            const IconTag = i.iconTag;
            return (
              <li key={i.label} className={appHeaderStyles.nav_item}>
                {/*TODO add router link*/}
                {/*eslint-disable-next-line*/}
                <a
                  href="#"
                  className={cn(appHeaderStyles.nav_item_link, {
                    [appHeaderStyles.nav_item_link_selected]: isSelected,
                  })}
                >
                  <IconTag type={isSelected ? 'primary' : 'secondary'} />
                  <p className="text text_type_main-default p-2">{i.label}</p>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
