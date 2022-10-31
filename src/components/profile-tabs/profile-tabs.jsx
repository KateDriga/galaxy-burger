import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { PROFILE_TABS } from '../../utils/const-variables/app-variables';
import profileTabsStyles from './profile-tabs.module.css';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { onLogout } from '../../services/thunks/user-admission';
import { useState } from 'react';
import { LOGIN_ROUTE } from '../../utils/const-variables/route-variables';

export const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabClick = value => {
    if (value === 'logout') {
      dispatch(onLogout()).then(_ =>
        navigate(LOGIN_ROUTE, { state: { from: location } })
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
                    onClick={() => handleTabClick(key, isActive)}
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
        {PROFILE_TABS[activeTab]?.description}
      </p>
    </div>
  );
};