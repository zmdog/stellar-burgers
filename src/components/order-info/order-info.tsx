import { FC, useMemo, useEffect } from 'react';
import { Preloader, OrderInfoUI } from '@ui';
import { TIngredient, TOrder } from '@utils-types';
import { useSelector } from '../../services/store';
import {
  getOrderData,
  getOrdersAll,
  setCurrentOrderFromPath
} from '../../slices/ordersSlice';
import { getIngredients } from '../../slices/ingredientsSlice';
import { useDispatch } from '../../services/store';
import { useParams } from 'react-router-dom';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const orderNumber = useParams().number!.toString();
  const orderData: TOrder | undefined = useSelector<TOrder | undefined>(
    getOrderData
  );
  const ordersAll: TOrder[] = useSelector<TOrder[]>(getOrdersAll);

  const ingredients: TIngredient[] = useSelector<TIngredient[]>(getIngredients);
  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  useEffect(() => {
    dispatch(setCurrentOrderFromPath(orderNumber));
  }, [ordersAll]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
