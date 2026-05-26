import request from 'supertest';
import app from './index';
import seed from './seed';

jest.setTimeout(30000);

describe('e2e: basic CRUD and insights', () => {
  beforeAll(async () => {
    // seed small dataset
    await seed(50);
  });

  test('list, create, update, insights and delete', async () => {
    const listRes = await request(app).get('/api/employees?limit=10&offset=0');
    expect(listRes.status).toBe(200);
    expect(Array.isArray(listRes.body)).toBe(true);

    const newEmp = { first_name: 'E2E', last_name: 'User', job_title: 'Tester', country: 'USA', salary: 12345 };
    const createRes = await request(app).post('/api/employees').send(newEmp).set('Content-Type', 'application/json');
    expect(createRes.status).toBe(201);
    expect(createRes.body.id).toBeDefined();
    const id = createRes.body.id;

    const getRes = await request(app).get(`/api/employees/${id}`);
    expect(getRes.status).toBe(200);
    expect(getRes.body.first_name).toBe('E2E');

    const updRes = await request(app).put(`/api/employees/${id}`).send({ ...newEmp, first_name: 'E2E2' }).set('Content-Type', 'application/json');
    expect(updRes.status).toBe(200);

    const insightsRes = await request(app).get('/api/insights/country/USA');
    expect(insightsRes.status).toBe(200);
    expect(insightsRes.body).toBeDefined();

    const delRes = await request(app).delete(`/api/employees/${id}`);
    expect(delRes.status).toBe(200);
    expect(typeof delRes.body.changes).toBe('number');
  });
});
