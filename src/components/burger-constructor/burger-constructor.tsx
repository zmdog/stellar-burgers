import { FC, useMemo } from 'react';
import { TConstructorItems, TIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  getConstructorItems,
  clearBurgerConstructor,
  setBurgerConstructor
} from '../../slices/ingredientsSlice';
import {
  getCurrentOrder,
  getOrderStatus,
  fetchOrder,
  clearCurrentOrder
} from '../../slices/ordersSlice';
import { getIsAuth } from '../../slices/authSlice';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { useDrop } from 'react-dnd';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems: TConstructorItems =
    useSelector<TConstructorItems>(getConstructorItems);
  const onDropHandler = (id: string) => dispatch(setBurgerConstructor(id));
  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(ingredient: TIngredient) {
      onDropHandler(ingredient._id);
    }
  });

  const orderRequest: boolean = useSelector<boolean>(getOrderStatus);

  const orderModalData: TOrder | null = useSelector<TOrder | null>(
    getCurrentOrder
  );
  const isAuth: boolean = useSelector<boolean>(getIsAuth);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuth) {
      navigate('/login');
      return;
    }
    const ingredients: string[] = [];
    ingredients.push(constructorItems.bun!._id);
    ingredients.push(constructorItems.bun!._id);
    for (const ingredient of constructorItems.ingredients) {
      ingredients.push(ingredient._id);
    }
    dispatch(fetchOrder(ingredients));
    dispatch(clearBurgerConstructor());
  };
  const closeOrderModal = () => {
    dispatch(clearCurrentOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun?.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      ref={dropTarget}
    />
  );
};
