import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { TIngredient, TConstructor } from '@utils-types';

const initialState: TConstructor = {
  ingredients: [],
  bun: null
};

const constructorSlice = createSlice({
  name: 'constructorItems',
  initialState,
  reducers: {
    setBurgerConstructor: {
      reducer: (
        sliceState,
        action: PayloadAction<{ ingredient: TIngredient }>
      ) => {
        const ingredient = action.payload.ingredient;

        if (ingredient && ingredient.type === 'bun')
          sliceState.bun = ingredient;
        if (ingredient && ['sauce', 'main'].includes(ingredient.type)) {
          sliceState.ingredients.push(ingredient);
        }
      },
      prepare: (ingredient: TIngredient) => {
        ingredient = { ...ingredient, key: nanoid() };
        return { payload: { ingredient } };
      }
    },
    moveIngredientUp: (sliceState, action: PayloadAction<number>) => {
      [
        sliceState.ingredients[action.payload - 1],
        sliceState.ingredients[action.payload]
      ] = [
        sliceState.ingredients[action.payload],
        sliceState.ingredients[action.payload - 1]
      ];
    },
    moveIngredientDown: (sliceState, action: PayloadAction<number>) => {
      [
        sliceState.ingredients[action.payload],
        sliceState.ingredients[action.payload + 1]
      ] = [
        sliceState.ingredients[action.payload + 1],
        sliceState.ingredients[action.payload]
      ];
    },
    moveIngredientDnd: (sliceState, action: PayloadAction<string[]>) => {
      const firstIngredient = sliceState.ingredients.find(
        (ingredient: TIngredient) => ingredient.key === action.payload[0]
      );
      const secondIngredient = sliceState.ingredients.find(
        (ingredient: TIngredient) => ingredient.key === action.payload[1]
      );
      const indexFirstIngredient = sliceState.ingredients.indexOf(
        firstIngredient as TIngredient
      );
      const indexSecondIngredient = sliceState.ingredients.indexOf(
        secondIngredient as TIngredient
      );
      sliceState.ingredients[indexFirstIngredient] = secondIngredient!;
      sliceState.ingredients[indexSecondIngredient] = firstIngredient!;
    },
    deleteIngredient: (sliceState, action: PayloadAction<string>) => {
      sliceState.ingredients = sliceState.ingredients.filter(
        (ingredient: TIngredient) => ingredient.key !== action.payload
      );
    },
    clearBurgerConstructor: (sliceState) => {
      sliceState.ingredients = [];
      sliceState.bun = null;
    }
  },
  selectors: {
    getConstructorItems: (sliceState): TConstructor => sliceState
  }
});

export const { getConstructorItems } = constructorSlice.selectors;
export const {
  setBurgerConstructor,
  moveIngredientUp,
  moveIngredientDown,
  deleteIngredient,
  moveIngredientDnd,
  clearBurgerConstructor
} = constructorSlice.actions;
export default constructorSlice.reducer;
