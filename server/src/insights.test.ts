import request from 'supertest';
import express from 'express';
import routes from './routes';
import { initDb } from './db';
import db from './db';

const app = express();
app.use(express.json());
app.use('/api', routes);

beforeEach(() => {
  // reset DB table
  db.exec('DELETE FROM employees');
});

afterAll(() => {
  try { db.close(); } catch (e) {}
});

test('country insights return correct min, max, avg', async () => {
  // insert known rows
  db.prepare('INSERT INTO employees (first_name,last_name,job_title,country,salary) VALUES (?,?,?,?,?)').run('A','A','Eng','Testland',1000);
  db.prepare('INSERT INTO employees (first_name,last_name,job_title,country,salary) VALUES (?,?,?,?,?)').run('B','B','Eng','Testland',3000);
  db.prepare('INSERT INTO employees (first_name,last_name,job_title,country,salary) VALUES (?,?,?,?,?)').run('C','C','Eng','Testland',2000);

  const res = await request(app).get('/api/insights/country/Testland');
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty('min');
  expect(res.body).toHaveProperty('max');
  expect(res.body).toHaveProperty('avg');
  expect(Number(res.body.min)).toBe(1000);
  expect(Number(res.body.max)).toBe(3000);
  expect(Number(res.body.avg)).toBe(2000);
  // New expectations for TDD: count and median
  expect(res.body).toHaveProperty('count');
  expect(res.body).toHaveProperty('median');
  expect(Number(res.body.count)).toBe(3);
  expect(Number(res.body.median)).toBe(2000);
});

test('job title average in country is computed correctly', async () => {
  db.prepare('INSERT INTO employees (first_name,last_name,job_title,country,salary) VALUES (?,?,?,?,?)').run('D','D','SWE','USA',50000);
  db.prepare('INSERT INTO employees (first_name,last_name,job_title,country,salary) VALUES (?,?,?,?,?)').run('E','E','SWE','USA',70000);

  const res = await request(app).get('/api/insights/job/SWE/country/USA');
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty('avg');
  expect(Math.round(Number(res.body.avg))).toBe(60000);
});
