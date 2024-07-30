import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  nanoid
} from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient, TConstructorItems } from '@utils-types';
import { arrayMoveImmutable } from 'array-move';

interface TIngredients {
  ingredients: TIngredient[];
  isFetching: boolean;
  constructorItems: TConstructorItems;
  currentIngredientFromPath?: TIngredient;
}

const initialState: TIngredients = {
  isFetching: false,
  ingredients: [],
  constructorItems: {
    ingredients: []
  }
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setBurgerConstructor: (sliceState, action: PayloadAction<string>) => {
      const ingredient = sliceState.ingredients.find(
        (ingredient: TIngredient) => ingredient._id === action.payload
      );

      if (ingredient && ingredient.type === 'bun')
        sliceState.constructorItems.bun = ingredient;
      if (ingredient && ['sauce', 'main'].includes(ingredient.type)) {
        ingredient.key = nanoid();
        sliceState.constructorItems.ingredients.push(ingredient);
      }
    },
    moveIngredientUp: (sliceState, action: PayloadAction<string>) => {
      const element = sliceState.constructorItems.ingredients.find(
        (ingredient: TIngredient) => ingredient.key === action.payload
      );
      const index = sliceState.constructorItems.ingredients.indexOf(
        element as TIngredient
      );

      sliceState.constructorItems.ingredients = arrayMoveImmutable(
        sliceState.constructorItems.ingredients,
        index,
        index - 1
      );
    },
    moveIngredientDown: (sliceState, action: PayloadAction<string>) => {
      const element = sliceState.constructorItems.ingredients.find(
        (ingredient: TIngredient) => ingredient.key === action.payload
      );
      const index = sliceState.constructorItems.ingredients.indexOf(
        element as TIngredient
      );
      sliceState.constructorItems.ingredients = arrayMoveImmutable(
        sliceState.constructorItems.ingredients,
        index,
        index + 1
      );
    },
    moveIngredientDnd: (sliceState, action: PayloadAction<string[]>) => {
      const firstIngredient = sliceState.constructorItems.ingredients.find(
        (ingredient: TIngredient) => ingredient.key === action.payload[0]
      );
      const secondIngredient = sliceState.constructorItems.ingredients.find(
        (ingredient: TIngredient) => ingredient.key === action.payload[1]
      );
      const indexFirstIngredient =
        sliceState.constructorItems.ingredients.indexOf(
          firstIngredient as TIngredient
        );
      const indexSecondIngredient =
        sliceState.constructorItems.ingredients.indexOf(
          secondIngredient as TIngredient
        );
      sliceState.constructorItems.ingredients[indexFirstIngredient] =
        secondIngredient!;
      sliceState.constructorItems.ingredients[indexSecondIngredient] =
        firstIngredient!;
    },
    deleteIngredient: (sliceState, action: PayloadAction<string>) => {
      sliceState.constructorItems.ingredients =
        sliceState.constructorItems.ingredients.filter(
          (ingredient: TIngredient) => ingredient.key !== action.payload
        );
    },
    clearBurgerConstructor: (sliceState) => {
      sliceState.constructorItems.ingredients = [];
      delete sliceState.constructorItems.bun;
    },
    setCurrentIngredientFromPath: (
      sliceState,
      action: PayloadAction<string>
    ) => {
      sliceState.currentIngredientFromPath = sliceState.ingredients.find(
        (ingredient: TIngredient) => ingredient._id === action.payload
      );
    }
  },
  selectors: {
    getCurrentIngredientFromPath: (sliceState): TIngredient | undefined =>
      sliceState.currentIngredientFromPath,
    getConstructorItems: (sliceState): TConstructorItems =>
      sliceState.constructorItems,
    getIngredients: (sliceState): TIngredient[] => sliceState.ingredients,
    selectBuns: (sliceState): TIngredient[] =>
      sliceState.ingredients.filter(
        (ingredient: TIngredient) => ingredient.type === 'bun'
      ),
    selectMains: (sliceState): TIngredient[] =>
      sliceState.ingredients.filter(
        (ingredient: TIngredient) => ingredient.type === 'main'
      ),
    selectSauces: (sliceState): TIngredient[] =>
      sliceState.ingredients.filter(
        (ingredient: TIngredient) => ingredient.type === 'sauce'
      ),
    selectIsFetching: (sliceState): boolean => sliceState.isFetching
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (sliceState) => {
        sliceState.isFetching = true;
      })
      .addCase(fetchIngredients.rejected, (sliceState, action) => {
        alert('Ингредиенты пропали: ' + action.error.message);
        sliceState.isFetching = false;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (sliceState: TIngredients, action: PayloadAction<TIngredient[]>) => {
          sliceState.ingredients = action.payload;
          sliceState.isFetching = false;
        }
      );
  }
});

export const {
  selectBuns,
  selectMains,
  selectSauces,
  selectIsFetching,
  getCurrentIngredientFromPath,
  getConstructorItems,
  getIngredients
} = ingredientsSlice.selectors;
export const {
  setBurgerConstructor,
  moveIngredientUp,
  moveIngredientDown,
  deleteIngredient,
  moveIngredientDnd,
  clearBurgerConstructor,
  setCurrentIngredientFromPath
} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
