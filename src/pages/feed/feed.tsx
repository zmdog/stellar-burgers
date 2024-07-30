import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from '../../services/store';
import {
  getOrdersAll,
  fetchOrders,
  clearOrders
} from '../../slices/ordersSlice';
import { useDispatch } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector<TOrder[]>(getOrdersAll);
  const handleGetFeeds = () => {
    dispatch(fetchOrders());
  };

  useEffect(() => {
    dispatch(clearOrders());
  }, []);

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
