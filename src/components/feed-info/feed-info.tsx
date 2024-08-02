import { FC } from 'react';

import { TOrder, TFeed } from '@utils-types';
import { FeedInfoUI, Preloader } from '@ui';
import { useSelector } from '../../services/store';
import { getFeed, getOrdersAll } from '../../slices/ordersSlice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useSelector<TOrder[]>(getOrdersAll);
  const feed: TFeed = useSelector<TFeed>(getFeed);

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return !orders.length ? (
    <Preloader />
  ) : (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
