import { store } from './store';

import { expect, test, describe } from '@jest/globals';
import { rootReducer } from './store';

describe('Тесты над rootReducer', () => {
  test('Проверка инициализации rootReducer', () => {
    expect(store.getState()).toEqual(
      rootReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );
  });
});
