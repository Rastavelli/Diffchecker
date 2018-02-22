import fs from 'fs';
import { keys, intersection, isEqual, has, difference, concat, join } from 'lodash';

const genDiff = (pathToFile1, pathToFile2) => {
  const beforeData = JSON.parse(fs.readFileSync(pathToFile1));
  const afterData = JSON.parse(fs.readFileSync(pathToFile2));

  const notChanged = intersection(keys(beforeData), keys(afterData))
    .filter(key => isEqual(beforeData[key], afterData[key]))
    .map(key => `  ${key}: ${afterData[key]}`);

  const changed = intersection(keys(beforeData), keys(afterData))
    .filter(key => has(beforeData, key) && has(afterData, key))
    .filter(key => !isEqual(beforeData[key], afterData[key]))
    .map(key => `+ ${key}: ${afterData[key]}
    - ${key}: ${beforeData[key]}`);

  const deleted = difference(keys(beforeData), keys(afterData))
    .map(key => `- ${key}: ${beforeData[key]}`);

  const added = difference(keys(afterData), keys(beforeData))
    .map(key => `+ ${key}: ${afterData[key]}`);

  const all = concat(notChanged, changed, deleted, added);

  const result = `
  {
    ${join(all, '\n    ')}
  }`;
  return result;
};

export default genDiff;
