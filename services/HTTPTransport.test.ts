import HTTPTransport from "./HTTPTransport";
import xhrMock from 'xhr-mock';

describe('HTTPTransport', () => {
  let http;

  beforeEach(() => {
    // Инициализация xhr-mock
    xhrMock.setup();

    // Создаем экземпляр HTTPTransport
    http = new HTTPTransport();

    // Мокаем GET-запросы
    xhrMock.get(/https:\/\/jsonplaceholder\.typicode\.com\/comments\?.*/, (req, res) => {
      const urlString = req.url().toString(); // или просто req.url().href
      const url = new URL(urlString);
      const postId = url.searchParams.get('postId');
      // Возвращаем ответ с массивом объектов
      return res.status(200).body(
        JSON.stringify({ postId: Number(postId), id: 1, name: 'test', email: 'test@example.com', body: 'test body' })
      );
    });

    // Мокаем POST-запросы
    xhrMock.post('https://jsonplaceholder.typicode.com/posts', (req, res) => {
      // Можно проверить тело запроса, если нужно
      return res.status(201).body(
        JSON.stringify({ id: 101, title: 'foo', body: 'bar', userId: 1 })
      );
    });
  });

  afterEach(() => {
    // Очищаем мок после каждого теста
    xhrMock.reset();
    xhrMock.teardown();
  });

  test('гет запрос', (done) => {
    http.get(
      'https://jsonplaceholder.typicode.com/comments',
      { data: { postId: 1 } }
    ).then(({ response }) => {
      const responseObject = JSON.parse(response) || [];

      if (responseObject.postId === 1) {
        done();
      } else {
        done(new Error('Ожидался массив объектов с ключом postId и значением 1'));
      }
    }).catch(done);
  });

  test('пост запрос', (done) => {
    http.post(
      'https://jsonplaceholder.typicode.com/posts',
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        data: JSON.stringify({
          title: 'foo',
          body: 'bar',
          userId: 1,
        }),
      }
    ).then(({ response }) => {
      const { title } = JSON.parse(response) || {};
      if (title === 'foo') {
        done();
      } else {
        done(new Error('Ожидался объект с ключом title и значением \'foo\''));
      }
    }).catch(done);
  });
});
