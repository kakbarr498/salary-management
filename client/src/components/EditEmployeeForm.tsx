import React, { useState } from 'react';
import { Employee } from './EmployeeList';

export default function EditEmployeeForm({ employee, onSaved }: { employee: Employee; onSaved?: () => void }) {
  const [first_name, setFirstName] = useState(employee.first_name);
  const [last_name, setLastName] = useState(employee.last_name);
  const [job_title, setJobTitle] = useState(employee.job_title);
  const [country, setCountry] = useState(employee.country);
  const [salary, setSalary] = useState(String(employee.salary));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = { first_name, last_name, job_title, country, salary: Number(salary) };
  const res = await fetch(`/api/employees/${employee.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (res.ok && onSaved) onSaved();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>First name<input aria-label="First name" value={first_name} onChange={(e) => setFirstName(e.target.value)} /></label>
      <label>Last name<input aria-label="Last name" value={last_name} onChange={(e) => setLastName(e.target.value)} /></label>
      <label>Job title<input aria-label="Job title" value={job_title} onChange={(e) => setJobTitle(e.target.value)} /></label>
      <label>Country<input aria-label="Country" value={country} onChange={(e) => setCountry(e.target.value)} /></label>
      <label>Salary<input aria-label="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} /></label>
      <button type="submit">Save Changes</button>
    </form>
  );
}
