import React, { useEffect, useState } from 'react';
import EmployeeList, { Employee } from './EmployeeList';

export default function EmployeeListContainer() {
  const [employees, setEmployees] = useState<Employee[] | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch('/api/employees')
      .then((res) => res.json())
      .then((data) => {
        if (mounted) setEmployees(data);
      })
      .catch(() => {
        if (mounted) setEmployees([]);
      });
    return () => { mounted = false; };
  }, []);

  if (employees === null) return <div>Loading...</div>;
  return <EmployeeList employees={employees} />;
}
