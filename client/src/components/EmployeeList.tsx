import React from 'react';

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  salary: number;
  country: string;
  job_title: string;
};

export function EmployeeList({ employees }: { employees: Employee[] }) {
  if (!employees || employees.length === 0) return <div>No employees</div>;
  return (
    <ul>
      {employees.map((e) => (
        <li key={e.id}>{e.first_name} {e.last_name} — {e.job_title} — ${e.salary}</li>
      ))}
    </ul>
  );
}

export default EmployeeList;
