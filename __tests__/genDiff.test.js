import genDiff from '../src';

test('genDiff', () => {
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
