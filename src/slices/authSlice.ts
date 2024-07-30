import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
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
} from '@api';
import { setCookie } from '../utils/cookie';

interface IAuth {
  user: TUser;
  isAuth: boolean;
  isAuthChecked: boolean;
  isFetching: boolean;
}

const initialState: IAuth = {
  user: {
    email: '',
    name: ''
  },
  isAuth: false,
  isAuthChecked: false,
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
  sliceState: IAuth,
  action: PayloadAction<TAuthResponse | TUserResponse>
) => {
  sliceState.user.name = action.payload.user.name;
  sliceState.user.email = action.payload.user.email;
  sliceState.isAuth = true;
};
const logout = (sliceState: IAuth) => {
  setCookie('accessToken', '');
  localStorage.setItem('refreshToken', '');
  sliceState.user.name = '';
  sliceState.user.email = '';
  sliceState.isAuth = false;
  sliceState.isAuthChecked = false;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  selectors: {
    getIsAuth: (sliceState): boolean => sliceState.isAuth,
    getUser: (sliceState): TUser => sliceState.user,
    getIsAuthChecked: (sliceState): boolean => sliceState.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRegistration.pending, (sliceState) => {
        sliceState.isAuthChecked = true;
      })
      .addCase(fetchUserRegistration.rejected, (sliceState, action) => {
        alert('регистрация не удалась: ' + action.error.message);
        sliceState.isAuthChecked = false;
      })
      .addCase(
        fetchUserRegistration.fulfilled,
        (sliceState, action: PayloadAction<TAuthResponse>) => {
          localStorage.setItem('refreshToken', action.payload.refreshToken);
          setCookie('accessToken', action.payload.accessToken);
          login(sliceState, action);
          sliceState.isAuthChecked = false;
        }
      )
      //////////////////////////////
      .addCase(fetchUserLogin.pending, (sliceState) => {
        sliceState.isAuthChecked = true;
      })
      .addCase(fetchUserLogin.rejected, (sliceState, action) => {
        alert('вход не удался: ' + action.error.message);
        sliceState.isAuthChecked = false;
      })
      .addCase(
        fetchUserLogin.fulfilled,
        (sliceState, action: PayloadAction<TAuthResponse>) => {
          localStorage.setItem('refreshToken', action.payload.refreshToken);
          setCookie('accessToken', action.payload.accessToken);
          login(sliceState, action);
          sliceState.isAuthChecked = false;
        }
      )
      //////////////////////////////
      .addCase(fetchUserLogout.pending, (sliceState) => {
        sliceState.isAuthChecked = true;
      })
      .addCase(fetchUserLogout.rejected, (sliceState, action) => {
        alert('выход не удался: ' + action.error.message);
        sliceState.isAuthChecked = false;
      })
      .addCase(fetchUserLogout.fulfilled, (sliceState) => {
        logout(sliceState);
        sliceState.isAuthChecked = false;
      })
      //////////////////////////////
      .addCase(fetchUserLoginWithRefresh.pending, (sliceState) => {
        sliceState.isAuthChecked = true;
      })
      .addCase(fetchUserLoginWithRefresh.rejected, (sliceState, action) => {
        alert('вход не удался: ' + action.error.message);
        sliceState.isAuthChecked = false;
      })
      .addCase(fetchUserLoginWithRefresh.fulfilled, (sliceState, action) => {
        login(sliceState, action);
        sliceState.isAuthChecked = false;
      })
      //////////////////////////////
      .addCase(fetchUserUpdate.pending, (sliceState) => {
        sliceState.isAuthChecked = true;
      })
      .addCase(fetchUserUpdate.rejected, (sliceState, action) => {
        alert('не удалось обновить данные: ' + action.error.message);
        sliceState.isAuthChecked = false;
      })
      .addCase(
        fetchUserUpdate.fulfilled,
        (sliceState, action: PayloadAction<TUserResponse>) => {
          login(sliceState, action);
          sliceState.isAuthChecked = false;
        }
      );
  }
});

export const { getIsAuth, getUser, getIsAuthChecked } = authSlice.selectors;

export default authSlice.reducer;
