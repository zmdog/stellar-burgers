import { expect, test, describe } from '@jest/globals';
import ordersSlice, {
  fetchOrder,
  fetchOrders,
  fetchOrdersUser,
  clearCurrentOrder,
  setCurrentOrderFromPath,
  clearOrders
} from './ordersSlice';
import { spyOnAlert, testFetchPending, testFetchRejected } from './utils';
import { IOrders, TOrder } from '@utils-types';

describe('Тесты над ordersSlice', () => {
  const initialState: IOrders = {
    orders: [],
    feed: {
      total: 0,
      totalToday: 0
    },
    currentOrder: null,
    isFetching: false
  };

  const mockOrders: TOrder[] = [
    {
      createdAt: '2024-08-22T11:13:10.920Z',
      ingredients: [],
      name: 'Флюоресцентный люминесцентный бургер',
      number: 50528,
      status: 'done',
      updatedAt: '2024-08-22T11:13:11.388Z',
      _id: '66c71d46119d45001b5015a5'
    },
    {
      createdAt: '2024-08-22T11:13:10.920Z',
      ingredients: [],
      name: 'Флюоресцентный люминесцентный бургер',
      number: 50528,
      status: 'done',
      updatedAt: '2024-08-22T11:13:11.388Z',
      _id: '66c71d46119d45001b5015a5'
    }
  ];

  describe('Тесты над fetchOrder-формирование заказа', () => {
    spyOnAlert();
    test('fetchOrder-pending', () => {
      testFetchPending<IOrders>(
        initialState,
        ordersSlice,
        fetchOrder.pending.type
      );
    });
    test('fetchOrder-rejected', () => {
      testFetchRejected<IOrders>(
        initialState,
        ordersSlice,
        fetchOrder.rejected.type,
        'Не смогли оформить заказ: '
      );
    });
    test('fetchOrder-fulfilled', () => {
      const action = {
        type: fetchOrder.fulfilled.type,
        payload: { order: mockOrders[0] }
      };

      const expectedState = {
        ...initialState,
        isFetching: false,
        currentOrder: action.payload.order
      };
      const newState = ordersSlice(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });

  describe('Тесты над fetchOrders-запрос общих заказов и кол-ва', () => {
    test('fetchOrders-rejected', () => {
      testFetchRejected<IOrders>(
        initialState,
        ordersSlice,
        fetchOrders.rejected.type,
        'Заказы не дошли: '
      );
    });
    test('fetchOrders-fulfilled', () => {
      const action = {
        type: fetchOrders.fulfilled.type,
        payload: { orders: mockOrders, total: 2, totalToday: 11 }
      };

      const expectedState = {
        ...initialState,
        orders: action.payload.orders,
        feed: {
          total: action.payload.total,
          totalToday: action.payload.totalToday
        }
      };
      const newState = ordersSlice(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });

  describe('Тесты над fetchOrdersUser-запрос персональных заказов', () => {
    test('fetchOrdersUser-pending', () => {
      testFetchPending<IOrders>(
        initialState,
        ordersSlice,
        fetchOrdersUser.pending.type
      );
    });
    test('fetchOrdersUser-rejected', () => {
      testFetchRejected<IOrders>(
        initialState,
        ordersSlice,
        fetchOrdersUser.rejected.type,
        'Заказы не дошли: '
      );
    });
    test('fetchOrdersUser-fulfilled', () => {
      const action = {
        type: fetchOrdersUser.fulfilled.type,
        payload: mockOrders
      };

      const expectedState = {
        ...initialState,
        orders: action.payload,
        isFetching: false
      };
      const newState = ordersSlice(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });

  describe('Тесты над actions', () => {
    test('Очистка заказа после оформления', () => {
      const expectedState = {
        ...initialState,
        currentOrder: null
      };

      initialState.currentOrder = {
        createdAt: '2024-08-22T11:13:10.920Z',
        ingredients: [],
        name: 'Флюоресцентный люминесцентный бургер',
        number: 50528,
        status: 'done',
        updatedAt: '2024-08-22T11:13:11.388Z',
        _id: '66c71d46119d45001b5015a5'
      };

      Object.assign(
        initialState,
        ordersSlice(initialState, clearCurrentOrder())
      );

      expect(initialState).toEqual(expectedState);
    });

    test('Установка ингредиента для модального окна', () => {
      const expectedState = {
        ...initialState,
        currentOrderFromPath: {
          createdAt: '2024-08-22T11:13:10.920Z',
          ingredients: [],
          name: 'бургер1',
          number: 50528,
          status: 'done',
          updatedAt: '2024-08-22T11:13:11.388Z',
          _id: '66c71d46119d45001b5015a5'
        },
        orders: [
          {
            createdAt: '2024-08-22T11:13:10.920Z',
            ingredients: [],
            name: 'бургер1',
            number: 50528,
            status: 'done',
            updatedAt: '2024-08-22T11:13:11.388Z',
            _id: '66c71d46119d45001b5015a5'
          },
          {
            createdAt: '2024-08-22T11:13:10.920Z',
            ingredients: [],
            name: 'бургер2',
            number: 50529,
            status: 'done',
            updatedAt: '2024-08-22T11:13:11.388Z',
            _id: '66c71d46119d45001b5015a5'
          },
          {
            createdAt: '2024-08-22T11:13:10.920Z',
            ingredients: [],
            name: 'бургер3',
            number: 505,
            status: 'done',
            updatedAt: '2024-08-22T11:13:11.388Z',
            _id: '66c71d46119d45001b5015a5'
          },
          {
            createdAt: '2024-08-22T11:13:10.920Z',
            ingredients: [],
            name: 'бургер4',
            number: 50,
            status: 'done',
            updatedAt: '2024-08-22T11:13:11.388Z',
            _id: '66c71d46119d45001b5015a5'
          }
        ]
      };

      initialState.orders = [
        {
          createdAt: '2024-08-22T11:13:10.920Z',
          ingredients: [],
          name: 'бургер1',
          number: 50528,
          status: 'done',
          updatedAt: '2024-08-22T11:13:11.388Z',
          _id: '66c71d46119d45001b5015a5'
        },
        {
          createdAt: '2024-08-22T11:13:10.920Z',
          ingredients: [],
          name: 'бургер2',
          number: 50529,
          status: 'done',
          updatedAt: '2024-08-22T11:13:11.388Z',
          _id: '66c71d46119d45001b5015a5'
        },
        {
          createdAt: '2024-08-22T11:13:10.920Z',
          ingredients: [],
          name: 'бургер3',
          number: 505,
          status: 'done',
          updatedAt: '2024-08-22T11:13:11.388Z',
          _id: '66c71d46119d45001b5015a5'
        },
        {
          createdAt: '2024-08-22T11:13:10.920Z',
          ingredients: [],
          name: 'бургер4',
          number: 50,
          status: 'done',
          updatedAt: '2024-08-22T11:13:11.388Z',
          _id: '66c71d46119d45001b5015a5'
        }
      ];

      Object.assign(
        initialState,
        ordersSlice(initialState, setCurrentOrderFromPath('50528'))
      );

      expect(initialState).toEqual(expectedState);
    });

    test('Очистка списка заказов перед заполнением', () => {
      const expectedState = {
        ...initialState,
        orders: []
      };

      initialState.orders = [
        {
          createdAt: '2024-08-22T11:13:10.920Z',
          ingredients: [],
          name: 'бургер1',
          number: 50528,
          status: 'done',
          updatedAt: '2024-08-22T11:13:11.388Z',
          _id: '66c71d46119d45001b5015a5'
        },
        {
          createdAt: '2024-08-22T11:13:10.920Z',
          ingredients: [],
          name: 'бургер2',
          number: 50529,
          status: 'done',
          updatedAt: '2024-08-22T11:13:11.388Z',
          _id: '66c71d46119d45001b5015a5'
        },
        {
          createdAt: '2024-08-22T11:13:10.920Z',
          ingredients: [],
          name: 'бургер3',
          number: 505,
          status: 'done',
          updatedAt: '2024-08-22T11:13:11.388Z',
          _id: '66c71d46119d45001b5015a5'
        },
        {
          createdAt: '2024-08-22T11:13:10.920Z',
          ingredients: [],
          name: 'бургер4',
          number: 50,
          status: 'done',
          updatedAt: '2024-08-22T11:13:11.388Z',
          _id: '66c71d46119d45001b5015a5'
        }
      ];

      Object.assign(initialState, ordersSlice(initialState, clearOrders()));

      expect(initialState).toEqual(expectedState);
    });
  });
});
