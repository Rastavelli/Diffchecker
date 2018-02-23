import fs from 'fs';
import { keys, intersection, isEqual, has, difference, concat, join } from 'lodash';

const showNotChanged = (before, after) =>
  intersection(keys(before), keys(after))
    .filter(key => isEqual(before[key], after[key]))
    .map(key => `  ${key}: ${after[key]}`);

const showChanged = (before, after) =>
  intersection(keys(before), keys(after))
    .filter(key => has(before, key) && has(after, key))
    .filter(key => !isEqual(before[key], after[key]))
    .map(key => `+ ${key}: ${after[key]}
    - ${key}: ${before[key]}`);

const showDiff = (before, after, sign) =>
  difference(keys(before), keys(after))
    .map(key => `${sign} ${key}: ${before[key]}`);

const genDiff = (pathToFile1, pathToFile2) => {
  const beforeData = JSON.parse(fs.readFileSync(pathToFile1));
  const afterData = JSON.parse(fs.readFileSync(pathToFile2));

  const notChanged = showNotChanged(beforeData, afterData);

  const changed = showChanged(beforeData, afterData);

  const deleted = showDiff(beforeData, afterData, '-');

  const added = showDiff(afterData, beforeData, '+');

  const all = concat(notChanged, changed, deleted, added);

  const result = `
  {
    ${join(all, '\n    ')}
  }`;
  return result;
};

export default genDiff;
