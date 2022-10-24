import { AppHeader } from '../app-header/app-header';
import { MainArea } from '../main-area/main-area';
import { ErrorBoundary } from '../error-boundary/error-boundary';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  FORGOT_PASSWORD_ROUTE,
} from '../../utils/const-variables/route-variables';
import { LoginPage } from '../../pages/user-admission/login-page';
import { RegisterPage } from '../../pages/user-admission/register-page';
import { ForgotPasswordPage } from '../../pages/user-admission/forgot-password-page';

export const App = () => {
  return (
    <>
      <AppHeader />
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path={HOME_ROUTE} element={<MainArea />} />
            <Route path={LOGIN_ROUTE} element={<LoginPage />} />
            <Route path={REGISTER_ROUTE} element={<RegisterPage />} />
            <Route
              path={FORGOT_PASSWORD_ROUTE}
              element={<ForgotPasswordPage />}
            />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
};
