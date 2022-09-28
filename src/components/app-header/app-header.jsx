import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import appHeaderStyles from './app-header.module.css';
import { useState } from 'react';
import { menuItems } from '../../utils/menu';

export const AppHeader = () => {
  const [selectedMenuId, setSelectedMenuId] = useState(menuItems[0]._id);

  return (
    <header className={cn(appHeaderStyles.header, 'p-10')}>
      <nav className={appHeaderStyles.nav}>
        <ul className={appHeaderStyles.nav_list}>
          <li className={appHeaderStyles.nav_item}>
            <Logo />
          </li>
          {menuItems.map(i => {
            const isSelected = i._id === selectedMenuId;
            const IconTag = i.iconTag;
            return (
              <li
                key={i._id}
                onClick={() => setSelectedMenuId(i._id)}
                className={cn(appHeaderStyles.nav_item, {
                  [appHeaderStyles.nav_item_selected]: isSelected,
                })}
              >
                <IconTag type={isSelected ? 'primary' : 'secondary'} />
                <p className="text text_type_main-default p-2">{i.label}</p>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
