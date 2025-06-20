import Store, { TState } from './Store';
import EventBus from './EventBus';

jest.mock('./EventBus');

describe('Store', () => {
  let mockEmit: jest.Mock;
  let mockOn: jest.Mock;

  beforeEach(() => {
    // Мокаем EventBus
    (EventBus as jest.Mock).mockImplementation(() => {
      mockEmit = jest.fn();
      mockOn = jest.fn();
      return {
        emit: mockEmit,
        on: mockOn,
      };
    });
  });

  test('инициализация вызывает событие init', () => {
    new Store();

    expect(mockEmit).toHaveBeenCalledWith('init');
  });

  test('подписка вызывает подписчика с текущим состоянием', () => {
    const store = new Store();
    const subscriber = jest.fn();

    store.subscribe(subscriber);

    // Подписчик вызывается сразу с текущим состоянием
    expect(subscriber).toHaveBeenCalledWith(store.state);
  });

  test('setState обновляет состояние', () => {
    const store = new Store();

    const newState: Partial<TState> = { chatId: '123' };
    store.setState(newState as TState);

    expect(store.state.chatId).toBe('123');
  });

  test('проксированный state вызывает событие при изменении', () => {
    const store = new Store();

    // Изменяем свойство через прокси
    store.state.chatId = 'abc';

    expect(mockEmit).toHaveBeenCalledWith(
      'flow:store-did-update',
      expect.anything(),
      expect.anything()
    );
  });

  test('_storeDidUpdate вызывает событие flow:use при возвращаемом true', () => {
    const store = new Store();

    // Мокаем _storeDidUpdate, чтобы вернуть true
    const spyUpdate = jest.spyOn(store, 'storeDidUpdate').mockReturnValue(true);

    store._callbackWrapper({} as TState);

    expect(mockEmit).toHaveBeenCalledWith('flow:use');

    spyUpdate.mockRestore();
  });

  test('_storeDidUpdate не вызывает событие flow:use при возвращаемом false', () => {
    const store = new Store();

    const spyUpdate = jest.spyOn(store, 'storeDidUpdate').mockReturnValue(false);
    store._callbackWrapper({} as TState);

    expect(mockEmit).not.toHaveBeenCalledWith('flow:use');

    spyUpdate.mockRestore();
  });

  test('_callbackWrapper обрабатывает два аргумента', () => {
    const store = new Store();

    const oldState = { chatId: 'old' } as TState;
    const newState = { chatId: 'new' } as TState;

    // Мокаем _storeDidUpdate чтобы проверить вызов
    const spyUpdate = jest.spyOn(store, 'storeDidUpdate');

    store._callbackWrapper(oldState, newState);

    expect(spyUpdate).toHaveBeenCalledWith(oldState, newState);

    spyUpdate.mockRestore();
  });
});
