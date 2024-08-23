import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser, TAuth } from '@utils-types';
import {
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  getUserApi,
  updateUserApi,
  TAuthResponse,
  TUserResponse
} from '../utils/burger-api';
import { getCookie, setCookie } from '../utils/cookie';

const initialState: TAuth = {
  user: {
    email: '',
    name: ''
  },
  isAuth: false,
  isFetching: false
};

export const fetchUserRegistration = createAsyncThunk(
  'auth/fetchUserRegistration',
  async (dataUser: TRegisterData) => registerUserApi(dataUser)
);
export const fetchUserUpdate = createAsyncThunk(
  'auth/fetchUserUpdate',
  async (dataUser: TRegisterData) => updateUserApi(dataUser)
);

export const fetchUserLogin = createAsyncThunk(
  'auth/fetchUserLogin',
  async (dataUser: TLoginData) => loginUserApi(dataUser)
);

export const fetchUserLogout = createAsyncThunk(
  'auth/fetchUserLogout',
  async () => logoutApi()
);

export const fetchUserLoginWithRefresh = createAsyncThunk(
  'auth/fetchUserLoginWithRefresh',
  async () => getUserApi()
);

const login = (
  sliceState: TAuth,
  action: PayloadAction<TAuthResponse | TUserResponse>
) => {
  sliceState.user.name = action.payload.user.name;
  sliceState.user.email = action.payload.user.email;
  sliceState.isAuth = true;
  sliceState.isFetching = false;
};
const logout = (sliceState: TAuth) => {
  setCookie('accessToken', '');
  localStorage.setItem('refreshToken', '');
  sliceState.user.name = '';
  sliceState.user.email = '';
  sliceState.error = '';
  sliceState.isAuth = false;
  sliceState.isFetching = false;
};

const refreshToken = (refreshToken: string) => {
  localStorage.setItem('refreshToken', refreshToken);
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  selectors: {
    getIsAuth: (sliceState): boolean => sliceState.isAuth,
    getUser: (sliceState): TUser => sliceState.user,
    getIsAuthChecked: (sliceState): boolean => sliceState.isFetching
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRegistration.pending, (sliceState) => {
        sliceState.isFetching = true;
      })
      .addCase(fetchUserRegistration.rejected, (sliceState, action) => {
        sliceState.error = 'Регистрация не удалась: ' + action.error.message;
        alert('Регистрация не удалась: ' + action.error.message);
        sliceState.isFetching = false;
      })
      .addCase(
        fetchUserRegistration.fulfilled,
        (sliceState, action: PayloadAction<TAuthResponse>) => {
          refreshToken(action.payload.refreshToken);
          setCookie('accessToken', action.payload.accessToken);
          login(sliceState, action);
        }
      )
      //////////////////////////////
      .addCase(fetchUserLogin.pending, (sliceState) => {
        sliceState.isFetching = true;
      })
      .addCase(fetchUserLogin.rejected, (sliceState, action) => {
        sliceState.error = 'Вход не удался: ' + action.error.message;
        alert('Вход не удался: ' + action.error.message);
        sliceState.isFetching = false;
      })
      .addCase(
        fetchUserLogin.fulfilled,
        (sliceState, action: PayloadAction<TAuthResponse>) => {
          refreshToken(action.payload.refreshToken);
          setCookie('accessToken', action.payload.accessToken);
          login(sliceState, action);
        }
      )
      //////////////////////////////
      .addCase(fetchUserLogout.pending, (sliceState) => {
        sliceState.isFetching = true;
      })
      .addCase(fetchUserLogout.rejected, (sliceState, action) => {
        sliceState.error = 'Выход не удался: ' + action.error.message;
        alert('Выход не удался: ' + action.error.message);
        sliceState.isFetching = false;
      })
      .addCase(fetchUserLogout.fulfilled, (sliceState) => {
        logout(sliceState);
        sliceState.isFetching = false;
      })
      //////////////////////////////
      .addCase(fetchUserLoginWithRefresh.pending, (sliceState) => {
        sliceState.isFetching = true;
      })
      .addCase(fetchUserLoginWithRefresh.rejected, (sliceState, action) => {
        sliceState.error = 'Вход не удался: ' + action.error.message;
        alert('вход не удался: ' + action.error.message);
        sliceState.isFetching = false;
      })
      .addCase(fetchUserLoginWithRefresh.fulfilled, (sliceState, action) => {
        login(sliceState, action);
      })
      //////////////////////////////
      .addCase(fetchUserUpdate.pending, (sliceState) => {
        sliceState.isFetching = true;
      })
      .addCase(fetchUserUpdate.rejected, (sliceState, action) => {
        sliceState.error =
          'Не удалось обновить данные: ' + action.error.message;
        alert('Не удалось обновить данные: ' + action.error.message);
        sliceState.isFetching = false;
      })
      .addCase(
        fetchUserUpdate.fulfilled,
        (sliceState, action: PayloadAction<TUserResponse>) => {
          login(sliceState, action);
        }
      );
  }
});

export const { getIsAuth, getUser, getIsAuthChecked } = authSlice.selectors;

export default authSlice.reducer;
