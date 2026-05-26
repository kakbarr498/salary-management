import React from 'react';

export default function DeleteEmployeeButton({ id }: { id: number }) {
  const handleDelete = async () => {
    await fetch(`/api/employees/${id}`, { method: 'DELETE' });
  };

  return <button onClick={handleDelete}>Delete</button>;
}
