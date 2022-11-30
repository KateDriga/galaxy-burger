import { useEffect, FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { AppDispatch } from '../../services/store';
import { AppHeader } from '../app-header/app-header';
import { ErrorBoundary } from '../error-boundary/error-boundary';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  Location,
  useMatch,
} from 'react-router-dom';
import { NavRoutesEnum } from '../../utils/ts-types/route-types';
import { LoginPage } from '../../pages/user-admission-pages/login-page';
import { RegisterPage } from '../../pages/user-admission-pages/register-page';
import { ForgotPasswordPage } from '../../pages/user-admission-pages/forgot-password-page';
import { ResetPasswordPage } from '../../pages/user-admission-pages/reset-password-page';
import { ProfilePage } from '../../pages/profile-page/profile-page';
import { ProfileDetails } from '../profile-details/profile-details';
import { ProtectedRoute, ProtectedAuthRoute } from '../routes/protected-routes';
import { getCookie } from '../../utils/cookie';
import { onTokenRefresh } from '../../services/thunks/user-admission';
import { IngredientsConstructorPage } from '../../pages/ingredients-constructor-page/ingredients-constructor-page';
import { loadIngredients } from '../../services/thunks/ingredients';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';
import { IngredientPage } from '../../pages/ingredient-page/ingredient-page';
import { FeedPage } from '../../pages/feed-page/feed-page';
import { FeedOrderPage } from '../../pages/feed-order-page/feed-order-page';
import { FeedOrderDetails } from '../feed-order-details/feed-order-details';
import { FeedOrdersList } from '../feed-orders-list/feed-orders-list';
import { WebSocketRoute } from '../routes/web-socket-route';
import { Modal } from '../modal/modal';
import { OrderError } from '../order-error/order-error';
import { OrderDetails } from '../order-details/order-details';
import {
  selectOrderState,
  selectShowOrderModal,
} from '../../services/selectors/order';
import { IFetchState } from '../../utils/ts-types/fetch-state-types';
import { closeOrderModal } from '../../services/slices/order';

export const App: FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const location: Location = useLocation();
  const background: Location | undefined = location.state?.background;

  const isFeedOrderRoute: boolean =
    useMatch(NavRoutesEnum.FEED_ORDER_ROUTE) !== null;

  useEffect(() => {
    dispatch(loadIngredients());
    if (getCookie('refreshToken')) {
      dispatch(onTokenRefresh());
    }
  }, [dispatch]);

  useEffect(() => {
    return () => {
      // TODO apply for profile feed
      if (isFeedOrderRoute) {
        location.state = null;
      }
    };
  }, [location, isFeedOrderRoute]);

  // order modal window
  const showOrderModal: boolean = useAppSelector(selectShowOrderModal);
  const { isFailed: orderFailed }: IFetchState =
    useAppSelector(selectOrderState);
  const handleCloseOrderModal = () => dispatch(closeOrderModal());

  return (
    <>
      <AppHeader />
      <ErrorBoundary>
        <Routes location={background || location}>
          <Route
            path={NavRoutesEnum.HOME_ROUTE}
            element={<IngredientsConstructorPage />}
          />

          <Route
            path={NavRoutesEnum.FEED_ROUTE}
            element={
              <WebSocketRoute>
                <FeedPage />
              </WebSocketRoute>
            }
          />

          <Route
            path={NavRoutesEnum.FEED_ORDER_ROUTE}
            element={
              <WebSocketRoute>
                <FeedOrderDetails />
              </WebSocketRoute>
            }
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
            <Route
              path={NavRoutesEnum.PROFILE_ORDERS_ROUTE}
              element={
                <ProtectedRoute>
                  <WebSocketRoute>
                    <FeedOrdersList />
                  </WebSocketRoute>
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

          <Route
            path={NavRoutesEnum.PROFILE_ORDER_ROUTE}
            element={
              <ProtectedRoute>
                <WebSocketRoute>
                  <FeedOrderDetails />
                </WebSocketRoute>
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
            <Route
              path={NavRoutesEnum.FEED_ORDER_ROUTE}
              element={<FeedOrderPage />}
            />
            <Route
              path={NavRoutesEnum.PROFILE_ORDER_ROUTE}
              element={
                <ProtectedRoute>
                  <FeedOrderPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
        {showOrderModal && (
          <Modal onClose={handleCloseOrderModal}>
            {orderFailed ? <OrderError /> : <OrderDetails />}
          </Modal>
        )}
      </ErrorBoundary>
    </>
  );
};
