import express from 'express';
import * as svc from './employeeService';

const router = express.Router();

router.use(express.json());

router.post('/api/employees', (req, res) => {
  const id = svc.createEmployee(req.body);
  res.status(201).json({ id });
});

router.get('/api/employees', (req, res) => {
  const limit = Number(req.query.limit || 100);
  const offset = Number(req.query.offset || 0);
  res.json(svc.listEmployees(limit, offset));
});

router.get('/api/employees/:id', (req, res) => {
  const e = svc.getEmployee(Number(req.params.id));
  if (!e) return res.status(404).send();
  res.json(e);
});

router.put('/api/employees/:id', (req, res) => {
  const changes = svc.updateEmployee(Number(req.params.id), req.body);
  res.json({ changes });
});

router.delete('/api/employees/:id', (req, res) => {
  const changes = svc.deleteEmployee(Number(req.params.id));
  res.json({ changes });
});

router.get('/api/insights/country/:country', (req, res) => {
  res.json(svc.countrySalaryInsights(req.params.country));
});

router.get('/api/insights/job/:title/country/:country', (req, res) => {
  res.json(svc.jobTitleAverageInCountry(req.params.title, req.params.country));
});

export default router;
