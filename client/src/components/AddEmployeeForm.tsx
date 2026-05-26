import React, { useState } from 'react';

export default function AddEmployeeForm() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [job_title, setJobTitle] = useState('');
  const [country, setCountry] = useState('');
  const [salary, setSalary] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      first_name,
      last_name,
      job_title,
      country,
      salary: Number(salary)
    };
    await fetch('/api/employees', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>First name<input aria-label="First name" value={first_name} onChange={(e) => setFirstName(e.target.value)} /></label>
      <label>Last name<input aria-label="Last name" value={last_name} onChange={(e) => setLastName(e.target.value)} /></label>
      <label>Job title<input aria-label="Job title" value={job_title} onChange={(e) => setJobTitle(e.target.value)} /></label>
      <label>Country<input aria-label="Country" value={country} onChange={(e) => setCountry(e.target.value)} /></label>
      <label>Salary<input aria-label="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} /></label>
      <button type="submit">Add Employee</button>
    </form>
  );
}
