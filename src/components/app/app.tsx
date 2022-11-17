import { useEffect, FC } from 'react';
import { useAppDispatch } from '../../hooks/useStore';
import { AppDispatch } from '../../services/store';
import { AppHeader } from '../app-header/app-header';
import { ErrorBoundary } from '../error-boundary/error-boundary';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  Location,
} from 'react-router-dom';
import { NavRoutesEnum } from '../../utils/ts-types/route-types';
import { LoginPage } from '../../pages/user-admission-pages/login-page';
import { RegisterPage } from '../../pages/user-admission-pages/register-page';
import { ForgotPasswordPage } from '../../pages/user-admission-pages/forgot-password-page';
import { ResetPasswordPage } from '../../pages/user-admission-pages/reset-password-page';
import { ProfilePage } from '../../pages/profile-page/profile-page';
import { ProfileDetails } from '../profile-details/profile-details';
import {
  ProtectedRoute,
  ProtectedAuthRoute,
} from '../protected-route/protected-route';
import { getCookie } from '../../utils/cookie';
import { onTokenRefresh } from '../../services/thunks/user-admission';
import { IngredientsConstructorPage } from '../../pages/ingredients-constructor-page/ingredients-constructor-page';
import { loadIngredients } from '../../services/thunks/ingredients';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';
import { IngredientPage } from '../../pages/ingredient-page/ingredient-page';

export const App: FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const location: Location = useLocation();

  const background: Location | undefined = location.state?.background;

  useEffect(() => {
    dispatch(loadIngredients());
    if (getCookie('refreshToken')) {
      dispatch(onTokenRefresh());
    }
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <ErrorBoundary>
        <Routes location={background || location}>
          <Route
            path={NavRoutesEnum.HOME_ROUTE}
            element={<IngredientsConstructorPage />}
          />

          {/*TODO implement orders component*/}
          <Route
            path={NavRoutesEnum.ORDERS_ROUTE}
            element={<p>Лента заказов</p>}
          />

          <Route
            path={NavRoutesEnum.LOGIN_ROUTE}
            element={
              <ProtectedAuthRoute>
                <LoginPage />
              </ProtectedAuthRoute>
            }
          />
          <Route
            path={NavRoutesEnum.REGISTER_ROUTE}
            element={
              <ProtectedAuthRoute>
                <RegisterPage />
              </ProtectedAuthRoute>
            }
          />
          <Route
            path={NavRoutesEnum.FORGOT_PASSWORD_ROUTE}
            element={
              <ProtectedAuthRoute>
                <ForgotPasswordPage />
              </ProtectedAuthRoute>
            }
          />
          <Route
            path={NavRoutesEnum.RESET_PASSWORD_ROUTE}
            element={
              <ProtectedAuthRoute>
                <ResetPasswordPage />
              </ProtectedAuthRoute>
            }
          />

          <Route
            path={NavRoutesEnum.PROFILE_ROUTE}
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          >
            <Route
              path={NavRoutesEnum.PROFILE_ROUTE}
              element={
                <ProtectedRoute>
                  <ProfileDetails />
                </ProtectedRoute>
              }
            />
            {/*TODO implement user orders component*/}
            <Route
              path={NavRoutesEnum.PROFILE_ORDERS_ROUTE}
              element={
                <ProtectedRoute>
                  <p>Orders</p>
                </ProtectedRoute>
              }
            />
            <Route
              path={`${NavRoutesEnum.PROFILE_ROUTE}/*`}
              element={
                <ProtectedRoute>
                  <Navigate to={NavRoutesEnum.PROFILE_ROUTE} replace={true} />
                </ProtectedRoute>
              }
            />
          </Route>
          {/*TODO implement order details*/}
          <Route
            path={NavRoutesEnum.PROFILE_ORDER_ROUTE}
            element={
              <ProtectedRoute>
                <p>Order Details</p>
              </ProtectedRoute>
            }
          />

          <Route
            path={NavRoutesEnum.INGREDIENT_ROUTE}
            element={<IngredientDetails />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path={NavRoutesEnum.INGREDIENT_ROUTE}
              element={<IngredientPage />}
            />
          </Routes>
        )}
      </ErrorBoundary>
    </>
  );
};
