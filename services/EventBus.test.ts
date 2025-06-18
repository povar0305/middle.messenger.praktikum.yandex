import EventBus from './EventBus';

describe('EventBus', () => {
  let bus;

  beforeEach(() => {
    bus = new EventBus();
  });

  test('подписка добавляет слушателя', () => {
    const callback = jest.fn();
    bus.on('test', callback);
    expect(bus.listeners['test']).toContain(callback);
  });

  test('отписка удаляет слушателя', () => {
    const callback = jest.fn();
    bus.on('test', callback);
    bus.off('test', callback);
    expect(bus.listeners['test']).not.toContain(callback);
  });

  test('эмит вызывает все подписанные колбэки с аргументами', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    bus.on('event', callback1);
    bus.on('event', callback2);

    bus.emit('event', 'arg1', 'arg2');

    expect(callback1).toHaveBeenCalledWith('arg1', 'arg2');
    expect(callback2).toHaveBeenCalledWith('arg1', 'arg2');
  });

  test('отписка удаляет только указанный колбэк', () => {
    const cb1 = jest.fn();
    const cb2 = jest.fn();

    bus.on('test', cb1);
    bus.on('test', cb2);

    bus.off('test', cb1);

    expect(bus.listeners['test']).toContain(cb2);
    expect(bus.listeners['test']).not.toContain(cb1);
  });

  test('_checkEvent выбрасывает ошибку для несуществующего события', () => {
    expect(() => bus._checkEvent('nonexistent')).toThrow(/Нет события/);
  });
});
