import { expect, test, describe, afterEach } from '@jest/globals';
import { TConstructor } from '@utils-types';
import {
  setBurgerConstructor,
  deleteIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearBurgerConstructor,
  moveIngredientDnd
} from './constructorSlice';
import constructorSlice from './constructorSlice';

describe('Тесты над constructorSlice и actions', () => {
  const initialState: TConstructor = {
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
        key: '123456',
        _id: '643d69a5c3f7b9001cfa0944'
      },
      {
        calories: 189,
        carbohydrates: 111,
        fat: 432,
        image: 'https://code.s3.yandex.net/react/code/core.png',
        image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
        name: 'Кристаллы марсианских альфа-сахаридов',
        price: 762,
        proteins: 234,
        key: '1234567',
        type: 'main',
        _id: '643d69a5c3f7b9001cfa0948'
      }
    ],
    bun: null
  };

  const mockIngredients = [
    {
      calories: 99,
      carbohydrates: 42,
      fat: 24,
      image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
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
      image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
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
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      name: 'Краторная булка N-200i',
      price: 1255,
      proteins: 80,
      type: 'bun',
      _id: '643d69a5c3f7b9001cfa093c'
    }
  ];

  afterEach(() => {
    Object.assign(initialState, {
      ingredients: [
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
          key: '123456',
          _id: '643d69a5c3f7b9001cfa0944'
        },
        {
          calories: 189,
          carbohydrates: 111,
          fat: 432,
          image: 'https://code.s3.yandex.net/react/code/core.png',
          image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
          name: 'Кристаллы марсианских альфа-сахаридов',
          price: 762,
          proteins: 234,
          key: '1234567',
          type: 'main',
          _id: '643d69a5c3f7b9001cfa0948'
        }
      ],
      bun: null
    });
  });

  test('Добавление ингредиентов', () => {
    const expectedState: TConstructor = {
      ingredients: [
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
          key: '123456',
          _id: '643d69a5c3f7b9001cfa0944'
        },
        {
          calories: 189,
          carbohydrates: 111,
          fat: 432,
          image: 'https://code.s3.yandex.net/react/code/core.png',
          image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
          name: 'Кристаллы марсианских альфа-сахаридов',
          price: 762,
          proteins: 234,
          key: '1234567',
          type: 'main',
          _id: '643d69a5c3f7b9001cfa0948'
        },
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
          image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
          name: 'Кристаллы марсианских альфа-сахаридов',
          price: 762,
          proteins: 234,
          type: 'main',
          _id: '643d69a5c3f7b9001cfa0948'
        }
      ],
      bun: {
        calories: 420,
        carbohydrates: 53,
        fat: 24,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        name: 'Краторная булка N-200i',
        price: 1255,
        proteins: 80,
        type: 'bun',
        _id: '643d69a5c3f7b9001cfa093c'
      }
    };

    for (const mockIngredient of mockIngredients)
      Object.assign(
        initialState,
        constructorSlice(initialState, setBurgerConstructor(mockIngredient))
      );

    expectedState.ingredients.forEach(
      (ingredient, index) =>
        (ingredient.key = initialState.ingredients[index].key)
    );
    expectedState.bun!.key = initialState.bun!.key;

    expect(expectedState).toEqual(initialState);
  });

  test('Удаление ингредиента', () => {
    const expectedState: TConstructor = {
      ingredients: [
        {
          calories: 189,
          carbohydrates: 111,
          fat: 432,
          image: 'https://code.s3.yandex.net/react/code/core.png',
          image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
          name: 'Кристаллы марсианских альфа-сахаридов',
          price: 762,
          proteins: 234,
          key: '1234567',
          type: 'main',
          _id: '643d69a5c3f7b9001cfa0948'
        }
      ],
      bun: null
    };

    Object.assign(
      initialState,
      constructorSlice(initialState, deleteIngredient('123456'))
    );

    expect(expectedState).toEqual(initialState);
  });

  test('Изменение порядка ингредиента в начинке', () => {
    const expectedState: TConstructor = {
      ingredients: [
        {
          calories: 189,
          carbohydrates: 111,
          fat: 432,
          image: 'https://code.s3.yandex.net/react/code/core.png',
          image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
          name: 'Кристаллы марсианских альфа-сахаридов',
          price: 762,
          proteins: 234,
          key: '1234567',
          type: 'main',
          _id: '643d69a5c3f7b9001cfa0948'
        },
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
          key: '123456',
          _id: '643d69a5c3f7b9001cfa0944'
        }
      ],
      bun: null
    };

    Object.assign(
      initialState,
      constructorSlice(initialState, moveIngredientUp(1))
    );
    expect(initialState).toEqual(expectedState);
    Object.assign(
      initialState,
      constructorSlice(initialState, moveIngredientDown(0))
    );
    expect(initialState).not.toEqual(expectedState);
    Object.assign(
      initialState,
      constructorSlice(initialState, moveIngredientDnd(['123456', '1234567']))
    );
    expect(initialState).toEqual(expectedState);
  });

  test('Очистка конструктора', () => {
    const expectedState: TConstructor = {
      ingredients: [],
      bun: null
    };

    Object.assign(
      initialState,
      constructorSlice(initialState, clearBurgerConstructor())
    );

    expect(expectedState).toEqual(initialState);
  });
});
