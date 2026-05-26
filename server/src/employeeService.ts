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
  const stmt = db.prepare('INSERT INTO employees (first_name,last_name,job_title,country,salary,email) VALUES (?,?,?,?,?,?)');
  const info = stmt.run(e.first_name, e.last_name, e.job_title, e.country, e.salary, e.email || null);
  return info.lastInsertRowid as number;
}

export function listEmployees(limit = 100, offset = 0) {
  const stmt = db.prepare('SELECT * FROM employees LIMIT ? OFFSET ?');
  return stmt.all(limit, offset);
}

export function getEmployee(id: number) {
  const stmt = db.prepare('SELECT * FROM employees WHERE id = ?');
  return stmt.get(id);
}

export function updateEmployee(id: number, e: Partial<Employee>) {
  const stmt = db.prepare('UPDATE employees SET first_name=?, last_name=?, job_title=?, country=?, salary=?, email=? WHERE id=?');
  const info = stmt.run(e.first_name, e.last_name, e.job_title, e.country, e.salary, e.email, id);
  return info.changes;
}

export function deleteEmployee(id: number) {
  const stmt = db.prepare('DELETE FROM employees WHERE id = ?');
  const info = stmt.run(id);
  return info.changes;
}

export function countrySalaryInsights(country: string) {
  const stmt = db.prepare('SELECT MIN(salary) as min, MAX(salary) as max, AVG(salary) as avg FROM employees WHERE country = ?');
  return stmt.get(country);
}

export function jobTitleAverageInCountry(job: string, country: string) {
  const stmt = db.prepare('SELECT AVG(salary) as avg FROM employees WHERE job_title = ? AND country = ?');
  return stmt.get(job, country);
}
