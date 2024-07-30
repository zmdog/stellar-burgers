import { useEffect } from 'react';
import { fetchOrders, fetchOrdersUser } from '../slices/ordersSlice';
import { useDispatch, useSelector } from '../services/store';
import { getIsAuth } from '../slices/authSlice';

export const useOrders = (path: string) => {
  const dispatch = useDispatch();
  const isAuth: boolean = useSelector<boolean>(getIsAuth);

  useEffect(() => {
    path.includes('feed') && dispatch(fetchOrders());
    if (isAuth) path.includes('profile/orders') && dispatch(fetchOrdersUser());
  }, [path]);
};
