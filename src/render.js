import { keys, flatten, isObject } from 'lodash';

const getIndent = depth => '  '.repeat(depth);


const toString = (value, depth) => {
  if (isObject(value)) {
    const newValue = keys(value).map(key => `${getIndent(depth + 2)}  ${key}: ${value[key]}`).join('\n');
    return `{\n${newValue}\n${getIndent(depth + 1)}}`;
  }
  return value;
};

const nodeTypes =
  {
    deleted: ({ name, before }, depth) => `${getIndent(depth)}- ${name}: ${toString(before, depth)}`,
    added: ({ name, after }, depth) => `${getIndent(depth)}+ ${name}: ${toString(after, depth)}`,
    notChanged: ({ name, after }, depth) => `${getIndent(depth)}  ${name}: ${after}`,
    changed: ({ name, after, before }, depth) =>
      [
        `${getIndent(depth)}- ${name}: ${toString(before, depth)}`,
        `${getIndent(depth)}+ ${name}: ${toString(after, depth)}`,
      ],
    nested: (node, depth, func) =>
      `${getIndent(depth)}  ${node.name}: {\n${func(node.children, depth + 2)}\n${getIndent(depth + 1)}}`,
  };

const render = (ast) => {
  const iter = (tree, depth) =>
    flatten(tree.map(node => nodeTypes[node.type](node, depth, iter)))
      .join('\n');

  return `{\n${iter(ast, 1)}\n}`;
};

export default render;
