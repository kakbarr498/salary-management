import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddEmployeeForm from './AddEmployeeForm';

beforeEach(() => {
  (global as any).fetch = jest.fn(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 123 }) })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test('submits form and calls POST /api/employees', async () => {
  render(<AddEmployeeForm />);

  fireEvent.change(screen.getByLabelText(/First name/i), { target: { value: 'Test' } });
  fireEvent.change(screen.getByLabelText(/Last name/i), { target: { value: 'User' } });
  fireEvent.change(screen.getByLabelText(/Job title/i), { target: { value: 'Engineer' } });
  fireEvent.change(screen.getByLabelText(/Country/i), { target: { value: 'US' } });
  fireEvent.change(screen.getByLabelText(/Salary/i), { target: { value: '75000' } });

  fireEvent.click(screen.getByText(/Add Employee/i));

  await waitFor(() => expect((global as any).fetch).toHaveBeenCalledTimes(1));
  const [[url, options]] = (global as any).fetch.mock.calls;
  expect(url).toMatch(/\/api\/employees$/);
  expect(options.method).toBe('POST');
  const body = JSON.parse(options.body);
  expect(body.first_name).toBe('Test');
  expect(body.salary).toBe(75000);
});
