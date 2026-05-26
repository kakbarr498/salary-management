import React from 'react';
import { render, screen } from '@testing-library/react';
import EmployeeList from './EmployeeList';

test('renders no employees message', () => {
  render(<EmployeeList employees={[]} />);
  expect(screen.getByText(/No employees/i)).toBeInTheDocument();
});
