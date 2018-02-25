import fs from 'fs';
import genDiff from '../src';

describe('Flat difference', () => {
  const expectedFlatDiff = fs.readFileSync('__tests__/__fixtures__/flat/result', 'utf-8');

  it('json flat difference', () => {
    const jsonFilePath1 = '__tests__/__fixtures__/flat/before.json';
    const jsonFilePath2 = '__tests__/__fixtures__/flat/after.json';
    expect(genDiff(jsonFilePath1, jsonFilePath2)).toBe(expectedFlatDiff);
  });

  it('yaml flat difference', () => {
    const yamlFilePath1 = '__tests__/__fixtures__/flat/before.yaml';
    const yamlFilePath2 = '__tests__/__fixtures__/flat/after.yaml';
    expect(genDiff(yamlFilePath1, yamlFilePath2)).toBe(expectedFlatDiff);
  });

  it('ini flat difference', () => {
    const flatIniFilePath1 = '__tests__/__fixtures__/flat/before.ini';
    const flatIniFilePath2 = '__tests__/__fixtures__/flat/after.ini';
    expect(genDiff(flatIniFilePath1, flatIniFilePath2)).toBe(expectedFlatDiff);
  });
});

describe('nested diff', () => {
  const expectedNestedDiff = fs.readFileSync('__tests__/__fixtures__/nested/result', 'utf-8');
  it('json nested difference', () => {
    const nestedJsonFilePath1 = '__tests__/__fixtures__/nested/before.json';
    const nestedJsonFilePath2 = '__tests__/__fixtures__/nested/after.json';
    expect(genDiff(nestedJsonFilePath1, nestedJsonFilePath2)).toBe(expectedNestedDiff);
  });

  it('yaml flat difference', () => {
    const yamlFilePath1 = '__tests__/__fixtures__/nested/before.yaml';
    const yamlFilePath2 = '__tests__/__fixtures__/nested/after.yaml';
    expect(genDiff(yamlFilePath1, yamlFilePath2)).toBe(expectedNestedDiff);
  });

  it('ini flat difference', () => {
    const flatIniFilePath1 = '__tests__/__fixtures__/nested/before.ini';
    const flatIniFilePath2 = '__tests__/__fixtures__/nested/after.ini';
    expect(genDiff(flatIniFilePath1, flatIniFilePath2)).toBe(expectedNestedDiff);
  });
});
