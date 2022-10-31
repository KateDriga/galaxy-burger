import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppHeader } from '../app-header/app-header';
import { ErrorBoundary } from '../error-boundary/error-boundary';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  RESET_PASSWORD_ROUTE,
  PROFILE_ROOT,
  PROFILE_ORDERS_ROOT,
  ORDERS_ROOT,
  INGREDIENT_ROOT,
} from '../../utils/const-variables/route-variables';
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
import { clearModalIngredientId } from '../../services/slices/modal';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';

export const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state?.background;

  const handleCloseIngredientModal = () => {
    dispatch(clearModalIngredientId());
    navigate(-1);
  };

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
          <Route path={HOME_ROUTE} element={<IngredientsConstructorPage />} />

          {/*TODO implement orders component*/}
          <Route path={ORDERS_ROOT} element={<p>Лента заказов</p>} />

          <Route
            path={LOGIN_ROUTE}
            element={
              <ProtectedAuthRoute>
                <LoginPage />
              </ProtectedAuthRoute>
            }
          />
          <Route
            path={REGISTER_ROUTE}
            element={
              <ProtectedAuthRoute>
                <RegisterPage />
              </ProtectedAuthRoute>
            }
          />
          <Route
            path={FORGOT_PASSWORD_ROUTE}
            element={
              <ProtectedAuthRoute>
                <ForgotPasswordPage />
              </ProtectedAuthRoute>
            }
          />
          <Route
            path={RESET_PASSWORD_ROUTE}
            element={
              <ProtectedAuthRoute>
                <ResetPasswordPage />
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

          <Route path={INGREDIENT_ROOT} element={<IngredientDetails />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path={INGREDIENT_ROOT}
              element={
                <Modal onClose={handleCloseIngredientModal}>
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}
      </ErrorBoundary>
    </>
  );
};
