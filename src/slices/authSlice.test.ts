import { expect, test, describe, jest } from '@jest/globals';
import authSlice, {
  fetchUserLogin,
  fetchUserLogout,
  fetchUserRegistration,
  fetchUserLoginWithRefresh,
  fetchUserUpdate
} from './authSlice';
import { TAuth } from '@utils-types';
import { TAuthResponse, TUserResponse } from '@api';
import { getCookie } from '../utils/cookie';
import { spyOnAlert, testFetchPending, testFetchRejected } from './utils';

describe('Тесты над authSlice', () => {
  const initialState: TAuth = {
    user: {
      email: '',
      name: ''
    },
    isAuth: false,
    isFetching: false,
    error: ''
  };

  const mockAuthUser: TAuthResponse = {
    success: true,
    refreshToken: '123456',
    accessToken: '654321',
    user: {
      email: 'Juri@mail.ru',
      name: 'Juri'
    }
  };
  const mockLogoutUser: TAuth = {
    user: {
      email: '',
      name: ''
    },
    isAuth: false,
    isFetching: false,
    error: ''
  };

  const testTokens = (refreshToken: string, accessToken: string) => {
    expect(localStorage.getItem('refreshToken')).toBe(refreshToken);
    expect(getCookie('accessToken')).toBe(accessToken);
  };
  const testFulfilledAuthUser = (
    actionType: string,
    user: TAuthResponse | TUserResponse
  ) => {
    const action = {
      type: actionType,
      payload: user
    };

    const expectedState = {
      ...initialState,
      user: user.user,
      isFetching: false,
      isAuth: true
    };
    const newState = authSlice(initialState, action);

    expect(newState).toEqual(expectedState);
  };

  spyOnAlert();

  describe('Тесты над fetchUserRegistration-регистрация', () => {
    test('fetchUserRegistration-pending', () => {
      testFetchPending<TAuth>(
        initialState,
        authSlice,
        fetchUserRegistration.pending.type
      );
    });

    test('fetchUserRegistration-rejected', () => {
      testFetchRejected<TAuth>(
        initialState,
        authSlice,
        fetchUserRegistration.rejected.type,
        'Регистрация не удалась: '
      );
    });

    test('fetchUserRegistration-fulfilled', () => {
      testFulfilledAuthUser(fetchUserRegistration.fulfilled.type, mockAuthUser);
      testTokens('123456', '654321');
    });
  });

  describe('Тесты над fetchUserLogin-авторизация', () => {
    test('fetchUserLogin-pending', () => {
      testFetchPending<TAuth>(
        initialState,
        authSlice,
        fetchUserLogin.pending.type
      );
    });

    test('fetchUserLogin-rejected', () => {
      testFetchRejected<TAuth>(
        initialState,
        authSlice,
        fetchUserLogin.rejected.type,
        'Вход не удался: '
      );
    });

    test('fetchUserLogin-fulfilled', () => {
      testFulfilledAuthUser(fetchUserLogin.fulfilled.type, mockAuthUser);
      testTokens('123456', '654321');
    });
  });

  describe('Тесты над fetchUserLogout-выход', () => {
    test('fetchUserLogout-pending', () => {
      testFetchPending<TAuth>(
        initialState,
        authSlice,
        fetchUserLogout.pending.type
      );
    });

    test('fetchUserLogout-rejected', () => {
      testFetchRejected<TAuth>(
        initialState,
        authSlice,
        fetchUserLogout.rejected.type,
        'Выход не удался: '
      );
    });

    test('fetchUserLogout-fulfilled', () => {
      const action = {
        type: fetchUserLogout.fulfilled.type
      };

      const expectedState = {
        ...initialState,
        ...mockLogoutUser,
        isFetching: false
      };
      const newState = authSlice(initialState, action);

      expect(newState).toEqual(expectedState);
      testTokens('', '');
    });
  });

  describe('Тесты над fetchUserLoginWithRefresh-обновление при перезагрузке', () => {
    test('fetchUserLoginWithRefresh-pending', () => {
      testFetchPending<TAuth>(
        initialState,
        authSlice,
        fetchUserLoginWithRefresh.pending.type
      );
    });

    test('fetchUserLoginWithRefresh-rejected', () => {
      testFetchRejected<TAuth>(
        initialState,
        authSlice,
        fetchUserLoginWithRefresh.rejected.type,
        'Вход не удался: '
      );
    });

    test('fetchUserLoginWithRefresh-fulfilled', () => {
      testFulfilledAuthUser(
        fetchUserLoginWithRefresh.fulfilled.type,
        mockAuthUser
      );
    });
  });

  describe('Тесты над fetchUserUpdate-обновление данных', () => {
    test('fetchUserUpdate-pending', () => {
      testFetchPending<TAuth>(
        initialState,
        authSlice,
        fetchUserUpdate.pending.type
      );
    });

    test('fetchUserUpdate-rejected', () => {
      testFetchRejected<TAuth>(
        initialState,
        authSlice,
        fetchUserUpdate.rejected.type,
        'Не удалось обновить данные: '
      );
    });

    test('fetchUserUpdate-fulfilled', () => {
      const mockNewUserState: TUserResponse = {
        success: true,
        user: {
          email: 'Juri@mail.ru',
          name: 'Jora'
        }
      };

      testFulfilledAuthUser(
        fetchUserLoginWithRefresh.fulfilled.type,
        mockNewUserState
      );
    });
  });
});
