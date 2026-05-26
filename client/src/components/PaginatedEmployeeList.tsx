import React, { useEffect, useState } from 'react';
import EmployeeList from './EmployeeList';

export default function PaginatedEmployeeList({ pageSize = 50 }: { pageSize?: number }) {
  const [page, setPage] = useState(0);
  const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    fetch(`/api/employees?limit=${pageSize}&offset=${page * pageSize}`)
      .then((r) => r.json())
      .then((data) => { if (mounted) setEmployees(data); })
      .catch(() => { if (mounted) setEmployees([]); });
    return () => { mounted = false; };
  }, [page, pageSize]);

  return (
    <div>
      <EmployeeList employees={employees} />
      <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>Prev</button>
      <button onClick={() => setPage((p) => p + 1)}>Next</button>
    </div>
  );
}
