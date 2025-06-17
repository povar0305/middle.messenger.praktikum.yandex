import Route from './Route';
import Block from './Block';

jest.mock('./Block');

describe('Route', () => {
  let newBlock;
  let rootQuery;

  const mockGetContent = jest.fn(() => {
    const element = document.createElement('div');
    element.textContent = 'block content';
    return element;
  });

  const mockDestroy = jest.fn();
  // Создаем мок класса Block
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  (Block as jest.Mock).mockImplementation(() => {
    return {
      getContent: mockGetContent,
      destroy: mockDestroy,
    };

  });

  beforeEach(() => {
    rootQuery = '#app';
    newBlock = new Block()
    // Очистка DOM перед каждым тестом
    document.body.innerHTML = `<div id="${rootQuery.substring(1)}"></div>`;
    // Очистка моков
    jest.clearAllMocks();
  });

  test('match возвращает true для совпадающего пути', () => {
    const route = new Route('/home', newBlock, { rootQuery });
    expect(route.match('/home')).toBe(true);
  });

  test('match возвращает false для несовпадающего пути', () => {
    const route = new Route('/about', newBlock, { rootQuery });
    expect(route.match('/home')).toBe(false);
  });

  test('render вставляет контент в DOM', () => {
    const route = new Route('/home', newBlock, { rootQuery });

    // Перед рендером в DOM нет элементов
    expect(document.querySelector(rootQuery)).not.toBeNull();

    route.render();

    const container = document.querySelector(rootQuery);
    expect(container).not.toBeNull();

    // Проверяем, что getContent вызван
    expect(mockGetContent).toHaveBeenCalled();

    // Проверяем, что содержимое вставлено в DOM
    expect(container?.innerHTML).toContain('block content');
  });
});
