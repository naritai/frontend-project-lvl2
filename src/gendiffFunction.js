import parseFile from './parsers.js';
import getFormatter from './formatters/index.js';
import buildAST from './astBuilder.js';

function genDiff(filepath1, filepath2, formatName = 'stylish') {
  const parsedObj1 = parseFile(filepath1);
  const parsedObj2 = parseFile(filepath2);
  const ast = buildAST(parsedObj1, parsedObj2);
  const format = getFormatter(formatName);
  const result = format(ast);
  return result;
}

export default genDiff;
