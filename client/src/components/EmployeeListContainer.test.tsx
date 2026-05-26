import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import EmployeeListContainer from './EmployeeListContainer';

const mockEmployees = [
  { id: 1, first_name: 'Alice', last_name: 'Smith', job_title: 'Engineer', country: 'US', salary: 90000 },
  { id: 2, first_name: 'Bob', last_name: 'Jones', job_title: 'Designer', country: 'US', salary: 80000 }
];

beforeEach(() => {
  // mock fetch to return employees
  (global as any).fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve(mockEmployees) })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test('fetches employees and renders them', async () => {
  render(<EmployeeListContainer />);
  await waitFor(() => expect((global as any).fetch).toHaveBeenCalled());
  expect(await screen.findByText(/Alice Smith/)).toBeInTheDocument();
  expect(await screen.findByText(/Bob Jones/)).toBeInTheDocument();
});
