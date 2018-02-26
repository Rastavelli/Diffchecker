import { flatten, compact } from 'lodash';

const valueRepr = {
  boolean: value => `${value}`,
  string: value => `'${value}'`,
  object: () => 'complex value',
};

const toString = value => valueRepr[typeof value](value);

const getFullPathName = (...names) => compact(names).join('.');

const nodeRepr =
  {
    deleted: (node, fullName) => `Property '${fullName}' was removed`,
    added: ({ after }, fullName) => `Property '${fullName}' was added with ${toString(after)}`,
    notChanged: () => '',
    changed: ({ after, before }, fullName) => `Property '${fullName}' was updated. From ${toString(before)} to ${toString(after)}`,
    nested: (node, pathName, func) => func(node.children, pathName),
  };

const getNodeRepr = ({ type }) => nodeRepr[type];

const render = (ast) => {
  const iter = (tree, pathName) =>
    flatten(compact(tree.map((node) => {
      const fullPathName = getFullPathName(pathName, node.name);
      return getNodeRepr(node)(node, fullPathName, iter);
    }))).join('\n');

  return iter(ast, '');
};

export default render;
