import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TConstructor, TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectIsFetching } from '../../slices/ingredientsSlice';
import { getConstructorItems } from '../../slices/constructorSlice';
import { Preloader } from '@ui';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const burgerConstructor: TConstructor =
    useSelector<TConstructor>(getConstructorItems);
  const isIngredientsLoading: boolean = useSelector<boolean>(selectIsFetching);

  const ingredientsCounters = useMemo(() => {
    const { bun, ingredients } = burgerConstructor;

    const counters: { [key: string]: number } = {};
    ingredients.forEach((ingredient: TIngredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });
    if (bun) counters[bun._id] = 2;
    return counters;
  }, [burgerConstructor]);

  return isIngredientsLoading ? (
    <Preloader />
  ) : (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
