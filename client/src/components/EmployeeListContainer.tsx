import React, { useEffect, useState } from 'react';
import EmployeeList, { Employee } from './EmployeeList';
import AddEmployeeForm from './AddEmployeeForm';
import '../styles.css';

export default function EmployeeListContainer() {
  const [employees, setEmployees] = useState<Employee[] | null>(null);
  const [showAdd, setShowAdd] = useState(false);

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

  const refresh = () => {
    setEmployees(null);
    fetch('/api/employees')
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch(() => setEmployees([]));
  };

  if (employees === null) return <div className="loading">Loading...</div>;
  return (
    <div className="container">
      <div className="toolbar">
        <h2>Employees</h2>
        <div>
          <button onClick={() => setShowAdd((s) => !s)}>{showAdd ? 'Hide' : 'Add employee'}</button>
          <button onClick={() => refresh()}>Refresh</button>
        </div>
      </div>
      {showAdd && <AddEmployeeForm onAdded={() => { setShowAdd(false); refresh(); }} />}
      <EmployeeList employees={employees} />
    </div>
  );
}
