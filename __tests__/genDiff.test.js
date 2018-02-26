import fs from 'fs';
import genDiff from '../src';

describe('Flat diff', () => {
  const flatJsonFilePath1 = '__tests__/__fixtures__/flat/before.json';
  const flatJsonFilePath2 = '__tests__/__fixtures__/flat/after.json';
  const flatYamlFilePath1 = '__tests__/__fixtures__/flat/before.yaml';
  const flatYamlFilePath2 = '__tests__/__fixtures__/flat/after.yaml';
  const flatIniFilePath1 = '__tests__/__fixtures__/flat/before.ini';
  const flatIniFilePath2 = '__tests__/__fixtures__/flat/after.ini';

  const nestedJsonFilePath1 = '__tests__/__fixtures__/nested/before.json';
  const nestedJsonFilePath2 = '__tests__/__fixtures__/nested/after.json';
  const nestedYamlFilePath1 = '__tests__/__fixtures__/nested/before.yaml';
  const nestedYamlFilePath2 = '__tests__/__fixtures__/nested/after.yaml';
  const nestedIniFilePath1 = '__tests__/__fixtures__/nested/before.ini';
  const nestedIniFilePath2 = '__tests__/__fixtures__/nested/after.ini';

  const expectedFlatDiff = fs.readFileSync('__tests__/__fixtures__/flat/result', 'utf-8');
  const expectedNestedDiff = fs.readFileSync('__tests__/__fixtures__/nested/result', 'utf-8');
  const expectedPlainDiff = fs.readFileSync('__tests__/__fixtures__/plain/result', 'utf-8');

  it('json flat diff', () => {
    expect(genDiff(flatJsonFilePath1, flatJsonFilePath2, 'tree')).toBe(expectedFlatDiff);
  });

  it('yaml flat diff', () => {
    expect(genDiff(flatYamlFilePath1, flatYamlFilePath2, 'tree')).toBe(expectedFlatDiff);
  });

  it('ini flat diff', () => {
    expect(genDiff(flatIniFilePath1, flatIniFilePath2, 'tree')).toBe(expectedFlatDiff);
  });

  it('json nested diff', () => {
    expect(genDiff(nestedJsonFilePath1, nestedJsonFilePath2, 'tree')).toBe(expectedNestedDiff);
  });

  it('yaml nested diff', () => {
    expect(genDiff(nestedYamlFilePath1, nestedYamlFilePath2, 'tree')).toBe(expectedNestedDiff);
  });

  it('ini nested diff', () => {
    expect(genDiff(nestedIniFilePath1, nestedIniFilePath2, 'tree')).toBe(expectedNestedDiff);
  });

  it('json plain diff', () => {
    expect(genDiff(nestedJsonFilePath1, nestedIniFilePath2, 'plain')).toBe(expectedPlainDiff);
  });
});
