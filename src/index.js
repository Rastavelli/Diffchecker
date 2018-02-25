import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import ini from 'ini';
import render from './render';
import buildAst from './buildAst';

const parsers =
  {
    '.json': JSON.parse,
    '.yaml': yaml.safeLoad,
    '.ini': ini.parse,
  };

const parse = (pathToFile) => {
  const fileExtension = path.extname(pathToFile);
  const fileContent = fs.readFileSync(pathToFile, 'utf-8');
  return parsers[fileExtension](fileContent);
};

const genDiff = (pathToFile1, pathToFile2) => {
  const beforeObj = parse(pathToFile1);
  const afterObj = parse(pathToFile2);
  const ast = buildAst(beforeObj, afterObj);

  return render(ast);
};

export default genDiff;
