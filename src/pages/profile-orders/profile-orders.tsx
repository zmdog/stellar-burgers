import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from '../../services/store';
import { clearOrders, getOrdersAll } from '../../slices/ordersSlice';
import { useDispatch } from '../../services/store';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector<TOrder[]>(getOrdersAll);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
