import { FC } from 'react';
import {
  Location,
  NavigateFunction,
  NavLink,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { PROFILE_TABS } from '../../utils/const-variables/app-variables';
import { useAppDispatch } from '../../hooks/useStore';
import { AppDispatch } from '../../services/store';
import { onLogout } from '../../services/thunks/user-admission';
import { useState } from 'react';
import { NavRoutesEnum } from '../../utils/ts-types/route-types';
import { ProfileTabsEnum } from '../../utils/ts-types/profile-types';
import profileTabsStyles from './profile-tabs.module.css';
import cn from 'classnames';

export const ProfileTabs: FC = () => {
  const [activeTab, setActiveTab] = useState<string>();
  const dispatch: AppDispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();

  const handleTabClick = (value: string): void => {
    if (value === ProfileTabsEnum.LOGOUT) {
      dispatch(onLogout()).then(_ =>
        navigate(NavRoutesEnum.LOGIN_ROUTE, { state: { from: location } })
      );
    }
  };

  return (
    <div className={cn(profileTabsStyles.profile_tabs_container, 'pr-15')}>
      <ul className={cn(profileTabsStyles.profile_tabs, 'pb-20')}>
        {Object.keys(PROFILE_TABS).map(key => (
          <li key={key}>
            <NavLink to={PROFILE_TABS[key].route} end>
              {({ isActive }) => {
                if (isActive) {
                  setTimeout(() => setActiveTab(key));
                }
                return (
                  <Tab
                    active={isActive}
                    value={key}
                    onClick={() => handleTabClick(key)}
                  >
                    {PROFILE_TABS[key].label}
                  </Tab>
                );
              }}
            </NavLink>
          </li>
        ))}
      </ul>
      <p
        className={cn(
          profileTabsStyles.tab_description,
          'pb-10',
          'text text_type_main-small'
        )}
      >
        {activeTab && PROFILE_TABS[activeTab]?.description}
      </p>
    </div>
  );
};
