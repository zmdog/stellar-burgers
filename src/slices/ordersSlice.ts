import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import {
  getFeedsApi,
  getOrdersApi,
  orderBurgerApi,
  TFeedsResponse,
  TNewOrderResponse
} from '@api';

type TFeed = {
  total: number;
  totalToday: number;
};
interface IOrders {
  orders: TOrder[];
  feed: TFeed;
  currentOrder: TOrder | null;
  isFetching: boolean;
  currentOrderFromPath?: TOrder;
}

const initialState: IOrders = {
  orders: [],
  feed: {
    total: 0,
    totalToday: 0
  },
  currentOrder: null,
  isFetching: false
};

export const fetchOrder = createAsyncThunk(
  'orders/fetchOrder',
  async (ingredients: string[]) => orderBurgerApi(ingredients)
);
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () =>
  getFeedsApi()
);
export const fetchOrdersUser = createAsyncThunk(
  'orders/fetchOrdersUser',
  async () => getOrdersApi()
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearCurrentOrder: (sliceState) => {
      sliceState.currentOrder = null;
    },
    setCurrentOrderFromPath: (sliceState, action: PayloadAction<string>) => {
      sliceState.currentOrderFromPath = sliceState.orders!.find(
        (order: TOrder) => order.number.toString() === action.payload
      );
    },
    clearOrders: (sliceState) => {
      sliceState.orders = [];
    }
  },
  selectors: {
    getOrdersAll: (sliceState): TOrder[] => sliceState.orders,
    getFeed: (sliceState): TFeed => sliceState.feed,
    getCurrentOrder: (sliceState): TOrder | null => sliceState.currentOrder,
    getOrderStatus: (sliceState): boolean => sliceState.isFetching,
    getOrderData: (sliceState): TOrder | undefined =>
      sliceState.currentOrderFromPath
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (sliceState: IOrders) => {
        sliceState.isFetching = true;
      })
      .addCase(fetchOrder.rejected, (sliceState, action) => {
        alert('Не смогли оформить заказ: ' + action.error.message);
        sliceState.isFetching = false;
      })
      .addCase(
        fetchOrder.fulfilled,
        (sliceState: IOrders, action: PayloadAction<TNewOrderResponse>) => {
          sliceState.currentOrder = action.payload.order;
          sliceState.isFetching = false;
        }
      )
      //////////////////////////////
      .addCase(fetchOrders.rejected, (sliceState, action) => {
        alert('Заказы не дошли: ' + action.error.message);
        sliceState.isFetching = false;
      })
      .addCase(
        fetchOrders.fulfilled,
        (sliceState: IOrders, action: PayloadAction<TFeedsResponse>) => {
          sliceState.orders = action.payload.orders;
          sliceState.feed!.total = action.payload.total;
          sliceState.feed!.totalToday = action.payload.totalToday;
        }
      )
      //////////////////////////////
      .addCase(fetchOrdersUser.pending, (sliceState: IOrders) => {
        sliceState.isFetching = true;
      })
      .addCase(fetchOrdersUser.rejected, (sliceState, action) => {
        alert('Заказы не дошли: ' + action.error.message);
        sliceState.isFetching = false;
      })
      .addCase(
        fetchOrdersUser.fulfilled,
        (sliceState: IOrders, action: PayloadAction<TOrder[]>) => {
          sliceState.orders = action.payload;
          sliceState.isFetching = false;
        }
      );
  }
});

export const {
  getOrdersAll,
  getCurrentOrder,
  getOrderStatus,
  getOrderData,
  getFeed
} = ordersSlice.selectors;

export const { clearCurrentOrder, setCurrentOrderFromPath, clearOrders } =
  ordersSlice.actions;

export default ordersSlice.reducer;
