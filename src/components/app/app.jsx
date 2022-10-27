import { AppHeader } from '../app-header/app-header';
import { MainArea } from '../main-area/main-area';
import { ErrorBoundary } from '../error-boundary/error-boundary';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  RESET_PASSWORD_ROUTE,
  PROFILE_ROOT,
  PROFILE_ORDERS_ROOT,
  ORDERS_ROOT,
} from '../../utils/const-variables/route-variables';
import { LoginPage } from '../../pages/user-admission/login-page';
import { RegisterPage } from '../../pages/user-admission/register-page';
import { ForgotPasswordPage } from '../../pages/user-admission/forgot-password-page';
import { ResetPasswordPage } from '../../pages/user-admission/reset-password-page';
import { ProfilePage } from '../../pages/profile-page/profile-page';
import { ProfileDetails } from '../profile-details/profile-details';

export const App = () => {
  return (
    <BrowserRouter>
      <AppHeader />
      <ErrorBoundary>
        <Routes>
          <Route path={HOME_ROUTE} element={<MainArea />} />
          {/*TODO implement orders component*/}
          <Route path={ORDERS_ROOT} element={<p>Лента заказов</p>} />
          <Route path={LOGIN_ROUTE} element={<LoginPage />} />
          <Route path={REGISTER_ROUTE} element={<RegisterPage />} />
          <Route
            path={FORGOT_PASSWORD_ROUTE}
            element={<ForgotPasswordPage />}
          />
          <Route path={RESET_PASSWORD_ROUTE} element={<ResetPasswordPage />} />
          <Route path={PROFILE_ROOT} element={<ProfilePage />}>
            <Route path={PROFILE_ROOT} element={<ProfileDetails />} />
            {/*TODO implement user orders component*/}
            <Route path={PROFILE_ORDERS_ROOT} element={<p>Orders</p>} />
            <Route
              path={`${PROFILE_ROOT}/*`}
              element={<Navigate to={PROFILE_ROOT} replace={true} />}
            />
          </Route>
          {/*TODO implement order details*/}
          <Route
            path={`${PROFILE_ROOT}/orders/:id`}
            element={<p>Order Details</p>}
          />
          {/*TODO implement not-found component*/}
          <Route path="*" element={<p>Not found</p>} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};
