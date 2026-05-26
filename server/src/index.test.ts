import request from 'supertest';
import express from 'express';
import routes from './routes';
import { initDb } from './db';
import db from './db';

const app = express();
app.use(express.json());
app.use('/api', routes);

beforeAll(() => {
  // Use a clean in-memory DB for tests
  initDb();
});

afterAll(() => {
  try { db.close(); } catch (e) {}
});

test('create -> get -> update -> delete employee', async () => {
  const createRes = await request(app).post('/api/employees').send({ first_name: 'Test', last_name: 'User', job_title: 'Engineer', country: 'USA', salary: 50000, email: 't@example.com' });
  expect(createRes.status).toBe(201);
  const id = createRes.body.id;

  const getRes = await request(app).get(`/api/employees/${id}`);
  expect(getRes.status).toBe(200);
  expect(getRes.body.first_name).toBe('Test');

  const updateRes = await request(app).put(`/api/employees/${id}`).send({ salary: 60000 });
  expect(updateRes.status).toBe(200);
  expect(updateRes.body.salary).toBe(60000);

  const delRes = await request(app).delete(`/api/employees/${id}`);
  expect(delRes.body.deleted).toBe(true);
});
