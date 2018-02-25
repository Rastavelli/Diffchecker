import { keys, has, union, isObject } from 'lodash';

const buildAst = (beforeObj, afterObj) => union(keys(beforeObj), keys(afterObj))
  .map((key) => {
    const beforeValue = beforeObj[key];
    const afterValue = afterObj[key];

    const node = {
      name: key,
      before: beforeValue,
      after: afterValue,
    };

    if (has(beforeObj, key) && has(afterObj, key)) {
      if (isObject(beforeValue) && isObject(afterValue)) {
        return { ...node, type: 'nested', children: buildAst(beforeValue, afterValue) };
      }
      return { ...node, type: (beforeValue === afterValue) ? 'notChanged' : 'changed' };
    } else if (has(beforeObj, key)) {
      return { ...node, type: 'deleted' };
    }
    return { ...node, type: 'added' };
  });

export default buildAst;
