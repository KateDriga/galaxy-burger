import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import {
  ProtectedRoute,
  ProtectedAuthRoute,
} from '../protected-route/protected-route';
import {
  selectTokenIsLoading,
  selectUserLogoutState,
} from '../../services/selectors/user-admission';
import { Loader } from '../loader/loader';
import { getCookie } from '../../utils/cookie';
import { selectUserPersonalInfo } from '../../services/selectors/user-profile';
import { refreshToken } from '../../utils/api/rest/auth';
import { onTokenRefresh } from '../../services/thunks/user-admission';

export const App = () => {
  const dispatch = useDispatch();
  const tokenIsLoading = useSelector(selectTokenIsLoading);
  const { isLoading: isUserLoading } = useSelector(selectUserPersonalInfo);
  const { isLoading: isLogoutLoading } = useSelector(selectUserLogoutState);

  useEffect(() => {
    if (getCookie('refreshToken')) {
      dispatch(onTokenRefresh());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AppHeader />
      {tokenIsLoading || isLogoutLoading ? (
        <Loader />
      ) : (
        <ErrorBoundary>
          <Routes>
            <Route path={HOME_ROUTE} element={<MainArea />} />

            {/*TODO implement orders component*/}
            <Route path={ORDERS_ROOT} element={<p>Лента заказов</p>} />

            <Route
              path={LOGIN_ROUTE}
              element={
                <ProtectedAuthRoute>
                  {isUserLoading ? <Loader /> : <LoginPage />}
                </ProtectedAuthRoute>
              }
            />
            <Route
              path={REGISTER_ROUTE}
              element={
                <ProtectedAuthRoute>
                  {isUserLoading ? <Loader /> : <RegisterPage />}
                </ProtectedAuthRoute>
              }
            />
            <Route
              path={FORGOT_PASSWORD_ROUTE}
              element={
                <ProtectedAuthRoute>
                  {isUserLoading ? <Loader /> : <ForgotPasswordPage />}
                </ProtectedAuthRoute>
              }
            />
            <Route
              path={RESET_PASSWORD_ROUTE}
              element={
                <ProtectedAuthRoute>
                  {isUserLoading ? <Loader /> : <ResetPasswordPage />}
                </ProtectedAuthRoute>
              }
            />

            <Route
              path={PROFILE_ROOT}
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            >
              <Route
                path={PROFILE_ROOT}
                element={
                  <ProtectedRoute>
                    <ProfileDetails />
                  </ProtectedRoute>
                }
              />
              {/*TODO implement user orders component*/}
              <Route
                path={PROFILE_ORDERS_ROOT}
                element={
                  <ProtectedRoute>
                    <p>Orders</p>
                  </ProtectedRoute>
                }
              />
              <Route
                path={`${PROFILE_ROOT}/*`}
                element={
                  <ProtectedRoute>
                    <Navigate to={PROFILE_ROOT} replace={true} />
                  </ProtectedRoute>
                }
              />
            </Route>
            {/*TODO implement order details*/}
            <Route
              path={`${PROFILE_ROOT}/orders/:id`}
              element={
                <ProtectedRoute>
                  <p>Order Details</p>
                </ProtectedRoute>
              }
            />

            {/*TODO implement not-found component*/}
            <Route path="*" element={<p>Not found</p>} />
          </Routes>
        </ErrorBoundary>
      )}
    </BrowserRouter>
  );
};
