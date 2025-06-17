import HTTPTransport from "./HTTPTransport";

describe('HTTPTransport', () => {
  let http;

  beforeEach(() => {
    http = new HTTPTransport();

    // Мокаем глобальный XMLHttpRequest
    (global as any).XMLHttpRequest = jest.fn(() => {
      const xhrMock = {
        open: jest.fn(),
        setRequestHeader: jest.fn(),
        send: jest.fn(function() {
          // Симуляция ответа через короткий таймаут
          setTimeout(() => {
            if (xhrMock.onload) xhrMock.onload();
          }, 10);
        }),
        abort: jest.fn(),
        onload: null,
        onerror: null,
        onabort: null,
        ontimeout: null,
        timeout: 0,
        readyState: 0,
        status: 200,
        response: JSON.stringify({ title: 'foo' }),
        responseArray: JSON.stringify([{ postId: 1 }]),
      };
      return xhrMock;
    });
  });

  test('гет запрос', (done) => {
    http.get(
      'https://jsonplaceholder.typicode.com/comments',
      { data: { postId: 1 } }
    ).then(({ responseArray }) => {
      const [{ postId }] = JSON.parse(responseArray) || [];
      if (postId === 1) {
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
