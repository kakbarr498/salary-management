import express from 'express';
import * as svc from './employeeService';

const router = express.Router();

router.post('/employees', (req, res) => {
  const body = req.body;
  const created = svc.createEmployee(body);
  res.status(201).json(created);
});

router.get('/employees', (req, res) => {
  const limit = Number(req.query.limit || 100);
  const offset = Number(req.query.offset || 0);
  res.json(svc.listEmployees(limit, offset));
});

router.get('/employees/:id', (req, res) => {
  const id = Number(req.params.id);
  const e = svc.getEmployee(id);
  if (!e) return res.status(404).send({ error: 'not found' });
  res.json(e);
});

router.put('/employees/:id', (req, res) => {
  const id = Number(req.params.id);
  const updated = svc.updateEmployee(id, req.body);
  if (!updated) return res.status(404).send({ error: 'not found' });
  res.json(updated);
});

router.delete('/employees/:id', (req, res) => {
  const id = Number(req.params.id);
  const ok = svc.deleteEmployee(id);
  res.json({ deleted: ok });
});

router.get('/insights/country/:country', (req, res) => {
  const country = req.params.country;
  res.json(svc.countrySalaryInsights(country));
});

router.get('/insights/job/:title/country/:country', (req, res) => {
  const title = req.params.title;
  const country = req.params.country;
  res.json(svc.jobTitleAverageInCountry(title, country));
});

export default router;
