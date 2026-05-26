import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import PaginatedEmployeeList from './PaginatedEmployeeList';

const page1 = [
  { id: 1, first_name: 'A', last_name: 'One', job_title: 'X', country: 'US', salary: 50000 },
  { id: 2, first_name: 'B', last_name: 'Two', job_title: 'Y', country: 'US', salary: 60000 }
];
const page2 = [
  { id: 3, first_name: 'C', last_name: 'Three', job_title: 'Z', country: 'US', salary: 70000 }
];

beforeEach(() => {
  (global as any).fetch = jest.fn((url: string) => {
    if (url.includes('offset=0')) return Promise.resolve({ json: () => Promise.resolve(page1) });
    if (url.includes('offset=2')) return Promise.resolve({ json: () => Promise.resolve(page2) });
    return Promise.resolve({ json: () => Promise.resolve([]) });
  });
});

afterEach(() => jest.resetAllMocks());

test('fetches first page and navigates to next page', async () => {
  render(<PaginatedEmployeeList pageSize={2} />);
  await waitFor(() => expect((global as any).fetch).toHaveBeenCalled());
  expect(await screen.findByText(/A One/)).toBeInTheDocument();
  expect(screen.getByText(/B Two/)).toBeInTheDocument();

  fireEvent.click(screen.getByText(/Next/));
  await waitFor(() => expect((global as any).fetch).toHaveBeenCalledTimes(2));
  expect(await screen.findByText(/C Three/)).toBeInTheDocument();
});
