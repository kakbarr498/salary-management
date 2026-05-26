import React from 'react';

export default function DeleteEmployeeButton({ id, onDeleted }: { id: number; onDeleted?: () => void }) {
  const handleDelete = async () => {
    const res = await fetch(`/api/employees/${id}`, { method: 'DELETE' });
    if (res.ok && onDeleted) onDeleted();
  };

  return <button className="btn-secondary" onClick={handleDelete}>Delete</button>;
}
