import { Navigate, useLocation } from 'react-router-dom';
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
} from '../../utils/const-variables/route-variables';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../services/selectors/user-admission';

export const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();
  return isLoggedIn ? (
    children
  ) : (
    <Navigate to={LOGIN_ROUTE} replace={true} state={{ from: location }} />
  );
};

export const ProtectedAuthRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();
  return isLoggedIn ? (
    <Navigate to={location.state?.from ?? HOME_ROUTE} replace={true} />
  ) : (
    children
  );
};
