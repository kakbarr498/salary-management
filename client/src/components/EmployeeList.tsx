import React, { useState } from 'react';
import DeleteEmployeeButton from './DeleteEmployeeButton';
import EditEmployeeForm from './EditEmployeeForm';

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  salary: number;
  country: string;
  job_title: string;
};

export function EmployeeList({ employees, onChanged }: { employees: Employee[]; onChanged?: () => void }) {
  const [editing, setEditing] = useState<number | null>(null);

  if (!employees || employees.length === 0) return <div>No employees</div>;
  return (
    <ul>
      {employees.map((e) => (
        <li key={e.id} className="employee-row">
          <div className="employee-main">{e.first_name} {e.last_name} — {e.job_title} — ${e.salary.toFixed(2)}</div>
          <div className="employee-actions">
            <button onClick={() => setEditing(e.id)}>Edit</button>
            <DeleteEmployeeButton id={e.id} onDeleted={() => { if (onChanged) onChanged(); }} />
          </div>
          {editing === e.id && (
            <div className="edit-pane">
              <EditEmployeeForm employee={e} />
              <div><button onClick={() => { setEditing(null); if (onChanged) onChanged(); }}>Done</button></div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default EmployeeList;
