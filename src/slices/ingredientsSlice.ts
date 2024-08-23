import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../utils/burger-api';
import { TIngredient, TIngredients } from '@utils-types';

const initialState: TIngredients = {
  isFetching: false,
  ingredients: []
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
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
        sliceState.error = 'Ингредиенты пропали: ' + action.error.message;
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
  getIngredients
} = ingredientsSlice.selectors;
export const { setCurrentIngredientFromPath } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
