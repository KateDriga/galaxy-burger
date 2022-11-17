import { FC } from 'react';
import { Location, Navigate, useLocation } from 'react-router-dom';
import { NavRoutesEnum } from '../../utils/ts-types/route-types';
import { useAppSelector } from '../../hooks/useStore';
import {
  selectIsLoggedIn,
  selectTokenIsLoading,
} from '../../services/selectors/user-admission';
import { Loader } from '../loader/loader';

interface IRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute: FC<IRouteProps> = ({ children }) => {
  const isLoggedIn: boolean = useAppSelector(selectIsLoggedIn);
  const location: Location = useLocation();
  return isLoggedIn ? (
    children
  ) : (
    <Navigate
      to={NavRoutesEnum.LOGIN_ROUTE}
      replace={true}
      state={{ from: location }}
    />
  );
};

export const ProtectedAuthRoute: FC<IRouteProps> = ({ children }) => {
  const isLoggedIn: boolean = useAppSelector(selectIsLoggedIn);
  const tokenIsLoading: boolean = useAppSelector(selectTokenIsLoading);
  const location: Location = useLocation();
  return tokenIsLoading ? (
    <Loader />
  ) : isLoggedIn ? (
    <Navigate
      to={location.state?.from ?? NavRoutesEnum.HOME_ROUTE}
      replace={true}
    />
  ) : (
    children
  );
};
