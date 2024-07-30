import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { getUser } from '../../slices/authSlice';
import { useSelector } from '../../services/store';
import { getIsAuthChecked } from '../../slices/authSlice';
import { TUser } from '@utils-types';

export const AppHeader: FC = () => {
  const isChecked = useSelector<boolean>(getIsAuthChecked);
  const userName = useSelector<TUser>(getUser).name;

  return <AppHeaderUI userName={userName} isChecked={isChecked} />;
};
