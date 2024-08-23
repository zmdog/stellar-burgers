import { configureStore } from '@reduxjs/toolkit';
import ingredientsSlice from '../slices/ingredientsSlice';
import ordersSlice from '../slices/ordersSlice';
import authSlice from '../slices/authSlice';
import constructorSlice from '../slices/constructorSlice';
import { combineReducers } from 'redux';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  constructorItems: constructorSlice,
  ingredients: ingredientsSlice,
  orders: ordersSlice,
  auth: authSlice
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
