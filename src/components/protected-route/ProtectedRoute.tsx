import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import { useSelector } from '../../services/store';
import { getIsAuth } from '../../slices/authSlice';

type ProtectedRouteProps = {
  anonymous: boolean;
  children: ReactElement;
  isChecked?: boolean;
};
export const ProtectedRoute = ({
  anonymous,
  children,
  isChecked
}: ProtectedRouteProps) => {
  const isAuth = useSelector<boolean>(getIsAuth);
  const location = useLocation();
  const from = location.state?.from || '/';

  if (isChecked) return <Preloader />;

  if (anonymous && isAuth) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
