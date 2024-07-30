import { FC, useEffect } from 'react';
import { Preloader, IngredientDetailsUI } from '@ui';
import { useSelector } from '../../services/store';
import {
  getCurrentIngredientFromPath,
  getIngredients,
  setCurrentIngredientFromPath
} from '../../slices/ingredientsSlice';
import { TIngredient } from '@utils-types';
import { useDispatch } from '../../services/store';
import { useParams } from 'react-router-dom';
export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const ingredientData = useSelector<TIngredient | undefined>(
    getCurrentIngredientFromPath
  );
  const ingredients = useSelector<TIngredient[]>(getIngredients);
  const id = useParams().id!.toString();
  useEffect(() => {
    dispatch(setCurrentIngredientFromPath(id));
  }, [ingredients]);
  return !ingredientData ? (
    <Preloader />
  ) : (
    <IngredientDetailsUI ingredientData={ingredientData} />
  );
};
