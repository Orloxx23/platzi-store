import getData from '../../utils/getData';

describe('Fetch API', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  test('Llamar una API y retornar datos', () => {
    fetch.mockResponseOnce(JSON.stringify({ data: '12345' }));
    getData('https://google.com').then(response => {
      expect(response.data).toEqual('12345');
    });
    expect(fetch.mock.calls[0][0]).toEqual('https://google.com');
  });

  test('Llamar una API y retornar error', () => {
    fetch.mockReject(() => Promise.reject('API is down'));
    getData('https://google.com')
      .then(response => {
        expect(response.data).toEqual('12345');
      })
      .catch(error => {
        expect(error).toEqual('API is down');
      });
  });

  test('Llamar una API y retornar datos', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: '12345' }));
    const response = await getData('https://google.com');
    expect(response.data).toEqual('12345');
    expect(fetch.mock.calls[0][0]).toEqual('https://google.com');
  });

  test('Llamar una API y retornar error', async () => {
    fetch.mockReject(() => Promise.reject('API is down'));
    try {
      const response = await getData('https://google.com');
    } catch (error) {
      expect(error).toEqual('API is down');
    }
  });
});
