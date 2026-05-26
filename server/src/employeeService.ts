import db from './db';

export type Employee = {
  id?: number;
  first_name: string;
  last_name: string;
  job_title: string;
  country: string;
  salary: number;
  email?: string;
};

export function createEmployee(e: Employee) {
  const stmt = db.prepare(`INSERT INTO employees (first_name,last_name,job_title,country,salary,email) VALUES (?,?,?,?,?,?)`);
  const info = stmt.run(e.first_name, e.last_name, e.job_title, e.country, e.salary, e.email || null);
  return { id: info.lastInsertRowid as number, ...e };
}

export function getEmployee(id: number) {
  return db.prepare('SELECT * FROM employees WHERE id = ?').get(id);
}

export function updateEmployee(id: number, e: Partial<Employee>) {
  const current = getEmployee(id);
  if (!current) return null;
  const updated = { ...current, ...e };
  db.prepare(`UPDATE employees SET first_name=?, last_name=?, job_title=?, country=?, salary=?, email=? WHERE id=?`).run(
    updated.first_name,
    updated.last_name,
    updated.job_title,
    updated.country,
    updated.salary,
    updated.email,
    id
  );
  return getEmployee(id);
}

export function deleteEmployee(id: number) {
  const info = db.prepare('DELETE FROM employees WHERE id = ?').run(id);
  return info.changes > 0;
}

export function listEmployees(limit = 100, offset = 0) {
  return db.prepare('SELECT * FROM employees ORDER BY id LIMIT ? OFFSET ?').all(limit, offset);
}

export function countrySalaryInsights(country: string) {
  const min = db.prepare('SELECT MIN(salary) as value FROM employees WHERE country = ?').get(country).value || 0;
  const max = db.prepare('SELECT MAX(salary) as value FROM employees WHERE country = ?').get(country).value || 0;
  const avg = db.prepare('SELECT AVG(salary) as value FROM employees WHERE country = ?').get(country).value || 0;
  return { min, max, avg };
}

export function jobTitleAverageInCountry(job_title: string, country: string) {
  const avg = db.prepare('SELECT AVG(salary) as value FROM employees WHERE job_title = ? AND country = ?').get(job_title, country).value || 0;
  return { job_title, country, avg };
}
