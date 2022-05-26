import parseFiles from './parsers.js';
import getFormatter from './formatters/index.js';
import astBuilder from './astBuilder.js';

function genDiff(filepath1, filepath2, formatName = { format: 'stylish' }) {
  const { format } = formatName;
  const [parsedObj1, parsedObj2] = parseFiles(filepath1, filepath2);
  const ast = astBuilder(parsedObj1, parsedObj2);
  const formatter = getFormatter(format);
  const result = formatter(ast);
  return result;
}

export default genDiff;
