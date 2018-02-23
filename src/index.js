import fs from 'fs';
import { keys, has, union, join } from 'lodash';

const lineTypes =
  {
    notChanged: ({ name, after }) => `  ${name}: ${after}`,
    changed: ({ name, after, before }) => `+ ${name}: ${after}
    - ${name}: ${before}`,
    deleted: ({ name, before }) => `- ${name}: ${before}`,
    added: ({ name, after }) => `+ ${name}: ${after}`,
  };

const genDiff = (pathToFile1, pathToFile2) => {
  const beforeData = JSON.parse(fs.readFileSync(pathToFile1));
  const afterData = JSON.parse(fs.readFileSync(pathToFile2));

  const ast = union(keys(beforeData), keys(afterData))
    .map((key) => {
      const node = {
        name: [key],
        type: '',
        before: beforeData[key],
        after: afterData[key],
      };

      if (has(beforeData, node.name) && has(afterData, node.name)) {
        return { ...node, type: (node.after === node.before) ? 'notChanged' : 'changed' };
      } else if (has(beforeData, node.name)) {
        return { ...node, type: 'deleted' };
      }
      return { ...node, type: 'added' };
    });

  const diffLines = astToRender => astToRender.map(node => lineTypes[node.type](node));

  const result = `
  {
    ${join(diffLines(ast), '\n    ')}
  }`;
  return result;
};

export default genDiff;
