import { Navigate, useLocation } from 'react-router-dom';
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
} from '../../utils/const-variables/route-variables';
import { useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  selectTokenIsLoading,
} from '../../services/selectors/user-admission';
import { Loader } from '../loader/loader';
import PropTypes from 'prop-types';

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
  const tokenIsLoading = useSelector(selectTokenIsLoading);
  const location = useLocation();
  return tokenIsLoading ? (
    <Loader />
  ) : isLoggedIn ? (
    <Navigate to={location.state?.from ?? HOME_ROUTE} replace={true} />
  ) : (
    children
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.any,
};

ProtectedAuthRoute.propTypes = {
  children: PropTypes.any,
};
