import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CountryInsights from './CountryInsights';

const mockResponse = { min: 30000, max: 200000, avg: 85000, count: 5000, median: 80000 };

beforeEach(() => {
  (global as any).fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve(mockResponse) })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test('fetches and displays country insights', async () => {
  render(<CountryInsights country="US" />);
  await waitFor(() => expect((global as any).fetch).toHaveBeenCalled());
  expect(await screen.findByText(/Minimum:\s*30000/)).toBeInTheDocument();
  expect(screen.getByText(/Maximum:\s*200000/)).toBeInTheDocument();
  expect(screen.getByText(/Average:\s*85000/)).toBeInTheDocument();
  expect(screen.getByText(/Count:\s*5000/)).toBeInTheDocument();
  expect(screen.getByText(/Median:\s*80000/)).toBeInTheDocument();
});
