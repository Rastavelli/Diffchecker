import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

import { keys, has, union, join } from 'lodash';

const lineTypes =
  {
    notChanged: ({ name, after }) => `  ${name}: ${after}`,
    changed: ({ name, after, before }) => `+ ${name}: ${after}
    - ${name}: ${before}`,
    deleted: ({ name, before }) => `- ${name}: ${before}`,
    added: ({ name, after }) => `+ ${name}: ${after}`,
  };

const fileExtensionMapping =
  {
    '.json': JSON.parse,
    '.yaml': yaml.safeLoad,
  };

const fileDataToObj = (pathToFile) => {
  const extension = path.extname(pathToFile);
  const content = fs.readFileSync(pathToFile);
  return fileExtensionMapping[extension](content);
};

const genDiff = (pathToFile1, pathToFile2) => {
  const beforeObj = fileDataToObj(pathToFile1);
  const afterObj = fileDataToObj(pathToFile2);

  const ast = union(keys(beforeObj), keys(afterObj))
    .map((key) => {
      const node = {
        name: [key],
        type: '',
        before: beforeObj[key],
        after: afterObj[key],
      };

      if (has(beforeObj, node.name) && has(afterObj, node.name)) {
        return { ...node, type: (node.after === node.before) ? 'notChanged' : 'changed' };
      } else if (has(beforeObj, node.name)) {
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
