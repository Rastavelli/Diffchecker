import genDiff from '../src';

test('json difference', () => {
  const filePath1 = '__tests__/__fixtures__/before.json';
  const filePath2 = '__tests__/__fixtures__/after.json';
  const diffResult = `
  {
      host: hexlet.io
    + timeout: 20
    - timeout: 50
    - proxy: 123.234.53.22
    + verbose: true
  }`;
  expect(genDiff(filePath1, filePath2)).toBe(diffResult);
});

test('yaml difference', () => {
  const filePath1 = '__tests__/__fixtures__/before.yaml';
  const filePath2 = '__tests__/__fixtures__/after.yaml';
  const diffResult = `
  {
      host: hexlet.io
    + timeout: 20
    - timeout: 50
    - proxy: 123.234.53.22
    + verbose: true
  }`;
  expect(genDiff(filePath1, filePath2)).toBe(diffResult);
});

test('ini difference', () => {
  const filePath1 = '__tests__/__fixtures__/before.ini';
  const filePath2 = '__tests__/__fixtures__/after.ini';
  const diffResult = `
  {
      host: hexlet.io
    + timeout: 20
    - timeout: 50
    - proxy: 123.234.53.22
    + verbose: true
  }`;
  expect(genDiff(filePath1, filePath2)).toBe(diffResult);
});
