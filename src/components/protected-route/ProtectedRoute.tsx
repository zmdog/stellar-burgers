import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  children: ReactElement;
  isState: boolean;
  isChecked?: boolean;
  route: string;
};
export const ProtectedRoute = ({
  children,
  isState,
  isChecked,
  route
}: ProtectedRouteProps) => {
  if (isChecked) return <Preloader />;
  return isState ? <Navigate to={route} /> : <>{children}</>;
};
