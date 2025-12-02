import request from 'supertest';
import server from './index';

describe('GET /', () => {
  it('should return hello world7', async () => {
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('hello world7');
  });

  it('should return 404 for unknown routes', async () => {
    const response = await request(server).get('/unknown');
    expect(response.status).toBe(404);
  });
});
