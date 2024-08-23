import { expect, test, describe, jest } from '@jest/globals';
import ingredientsSlice, {
  setCurrentIngredientFromPath,
  fetchIngredients
} from './ingredientsSlice';
import { TIngredients } from '@utils-types';
import { testFetchPending, testFetchRejected, spyOnAlert } from './utils';

describe('Тесты над ingredientsSlice', () => {
  const initialState: TIngredients = {
    isFetching: false,
    ingredients: [
      {
        calories: 99,
        carbohydrates: 42,
        fat: 24,
        image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
        name: 'Соус традиционный галактический',
        price: 15,
        proteins: 42,
        type: 'sauce',
        _id: '643d69a5c3f7b9001cfa0944'
      }
    ]
  };

  spyOnAlert();

  describe('Тесты над fetchIngredients-получение ингредиентов', () => {
    test('fetchIngredients-pending', () => {
      testFetchPending<TIngredients>(
        initialState,
        ingredientsSlice,
        fetchIngredients.pending.type
      );
    });

    test('fetchIngredients-rejected', () => {
      testFetchRejected<TIngredients>(
        initialState,
        ingredientsSlice,
        fetchIngredients.rejected.type,
        'Ингредиенты пропали: '
      );
    });

    test('fetchIngredients-fulfilled', () => {
      const action = {
        type: fetchIngredients.fulfilled.type,
        payload: [
          {
            calories: 99,
            carbohydrates: 42,
            fat: 24,
            image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-03-large.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
            name: 'Соус традиционный галактический',
            price: 15,
            proteins: 42,
            type: 'sauce',
            _id: '643d69a5c3f7b9001cfa0944'
          },
          {
            calories: 189,
            carbohydrates: 111,
            fat: 432,
            image: 'https://code.s3.yandex.net/react/code/core.png',
            image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/core-mobile.png',
            name: 'Кристаллы марсианских альфа-сахаридов',
            price: 762,
            proteins: 234,
            type: 'main',
            _id: '643d69a5c3f7b9001cfa0948'
          },
          {
            calories: 420,
            carbohydrates: 53,
            fat: 24,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_large:
              'https://code.s3.yandex.net/react/code/bun-02-large.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            name: 'Краторная булка N-200i',
            price: 1255,
            proteins: 80,
            type: 'bun',
            _id: '643d69a5c3f7b9001cfa093c'
          }
        ]
      };

      const expectedState = {
        ...initialState,
        ingredients: action.payload,
        isFetching: false
      };
      const newState = ingredientsSlice(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });

  describe('Тесты над actions', () => {
    test('Установка текущего ингредиента для модального окна', () => {
      const expectedState: TIngredients = {
        ...initialState,
        currentIngredientFromPath: {
          calories: 99,
          carbohydrates: 42,
          fat: 24,
          image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-03-large.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
          name: 'Соус традиционный галактический',
          price: 15,
          proteins: 42,
          type: 'sauce',
          _id: '643d69a5c3f7b9001cfa0944'
        }
      };

      Object.assign(
        initialState,
        ingredientsSlice(
          initialState,
          setCurrentIngredientFromPath(
            expectedState.currentIngredientFromPath!._id
          )
        )
      );

      expect(expectedState).toEqual(initialState);
    });
  });
});
