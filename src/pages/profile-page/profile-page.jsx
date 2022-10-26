import { Routes, Route } from 'react-router-dom';
import { ProfileTabs } from '../../components/profile-tabs/profile-tabs';
import { ProfileDetails } from '../../components/profile-details/profile-details';
import profilePageStyles from './profile-page.module.css';
import cn from 'classnames';

export const ProfilePage = () => {
  return (
    <div
      className={cn(profilePageStyles.profile_container, 'pt-30 pr-10 pl-10')}
    >
      <div className={profilePageStyles.profile_content}>
        <ProfileTabs />
        <Routes>
          {/*TODO: implement order history, logout functionality, error*/}
          <Route path={'/'} element={<ProfileDetails />} />
          <Route path={'/orders'} element={<p>Orders</p>} />
          <Route path={'*'} element={<p>Not found</p>} />
        </Routes>
      </div>
    </div>
  );
};
