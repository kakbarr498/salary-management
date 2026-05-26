import seed from './seed';

jest.setTimeout(20000);

test('seed inserts requested number of employees and returns count', async () => {
  // Expect seed to return the number of inserted rows
  const inserted = await seed(200);
  expect(typeof inserted).toBe('number');
  expect(inserted).toBe(200);
});
