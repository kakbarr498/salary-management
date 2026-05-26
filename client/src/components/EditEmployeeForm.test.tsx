import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditEmployeeForm from './EditEmployeeForm';

const employee = { id: 42, first_name: 'Old', last_name: 'Name', job_title: 'Engineer', country: 'US', salary: 70000 };

beforeEach(() => {
  (global as any).fetch = jest.fn(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve({ changes: 1 }) })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test('submits edit form and calls PUT /api/employees/:id', async () => {
  render(<EditEmployeeForm employee={employee} />);

  const firstName = screen.getByLabelText(/First name/i);
  fireEvent.change(firstName, { target: { value: 'New' } });

  fireEvent.click(screen.getByText(/Save Changes/i));

  await waitFor(() => expect((global as any).fetch).toHaveBeenCalledTimes(1));
  const [[url, options]] = (global as any).fetch.mock.calls;
  expect(url).toMatch(/\/api\/employees\/42$/);
  expect(options.method).toBe('PUT');
  const body = JSON.parse(options.body);
  expect(body.first_name).toBe('New');
});
