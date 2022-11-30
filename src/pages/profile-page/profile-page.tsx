import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { ProfileTabs } from '../../components/profile-tabs/profile-tabs';
import profilePageStyles from './profile-page.module.css';
import cn from 'classnames';

export const ProfilePage: FC = () => {
  return (
    <div
      className={cn(
        profilePageStyles.profile_container,
        'pt-30 pr-10 pl-10 pb-10'
      )}
    >
      <div className={profilePageStyles.profile_content}>
        <ProfileTabs />
        <Outlet />
      </div>
    </div>
  );
};
