import request from 'supertest';
import app from './index';

test('GET /api/employees returns 200', async () => {
  const res = await request(app).get('/api/employees');
  expect(res.status).toBe(200);
});
