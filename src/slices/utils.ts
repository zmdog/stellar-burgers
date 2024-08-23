import { jest, expect } from '@jest/globals';
import { IOrders, TAuth, TIngredients } from '@utils-types';
export const spyOnAlert = () => {
  jest.spyOn(window, 'alert').mockReturnValue();
};

type TFetchExtends = TIngredients | TAuth | IOrders;

export const testFetchPending = <initialStateType extends TFetchExtends>(
  initialState: initialStateType,
  slice: Function,
  actionType: string
) => {
  const action = {
    type: actionType
  };

  const expectedState = { ...initialState, isFetching: true };
  const newState = slice(initialState, action);

  expect(newState).toEqual(expectedState);
};

export const testFetchRejected = <initialStateType extends TFetchExtends>(
  initialState: initialStateType,
  slice: Function,
  actionType: string,
  error: string
) => {
  const action = {
    type: actionType,
    error: { message: 'Ошибка' }
  };

  const expectedState = {
    ...initialState,
    error: error + action.error.message,
    isFetching: false
  };
  const newState = slice(initialState, action);

  expect(newState).toEqual(expectedState);
};
