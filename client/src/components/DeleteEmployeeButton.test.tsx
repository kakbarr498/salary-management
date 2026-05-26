import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DeleteEmployeeButton from './DeleteEmployeeButton';

beforeEach(() => {
  (global as any).fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ changes: 1 }) }));
});

afterEach(() => jest.resetAllMocks());

test('calls DELETE /api/employees/:id when clicked', async () => {
  render(<DeleteEmployeeButton id={7} />);
  fireEvent.click(screen.getByText(/Delete/i));
  await waitFor(() => expect((global as any).fetch).toHaveBeenCalledTimes(1));
  const [[url, options]] = (global as any).fetch.mock.calls;
  expect(url).toMatch(/\/api\/employees\/7$/);
  expect(options.method).toBe('DELETE');
});
