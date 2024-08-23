export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
  key?: string;
};

export type TIngredients = {
  ingredients: TIngredient[];
  error?: string;
  isFetching: boolean;
  currentIngredientFromPath?: TIngredient;
};

export type TConstructorIngredient = TIngredient & {
  id: string;
};

export type TOrder = {
  _id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
  key?: string;
};

export type TOrdersData = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export type TUser = {
  email: string;
  name: string;
};

export type TTabMode = 'bun' | 'sauce' | 'main';

export type TConstructor = {
  bun: TIngredient | null;
  ingredients: TIngredient[];
};

export type TFeed = {
  total: number;
  totalToday: number;
};

export interface IOrders {
  orders: TOrder[];
  feed: TFeed;
  currentOrder: TOrder | null;
  isFetching: boolean;
  error?: string;
  currentOrderFromPath?: TOrder;
}

export type TCurrentOrder = {
  name: string;
  number: number;
};

export type TAuth = {
  user: TUser;
  isAuth: boolean;
  error?: string;
  isFetching: boolean;
};
