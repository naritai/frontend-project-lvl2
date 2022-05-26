import parseFiles from './parsers.js';
import getFormatter from './formatters.js';
import astBuilder from './astBuilder.js';

function genDiff(filepath1, filepath2, format = 'stylish') {
  const [parsedObj1, parsedObj2] = parseFiles(filepath1, filepath2);
  const ast = astBuilder(parsedObj1, parsedObj2);

  // console.log('AST set3', ast.common.children.setting3);
  // console.log('AST set6', ast.common.children.setting6);

  // console.log('AST', ast);
  // console.log('AST CHILDS', ast.common.children);

  // console.log('AST COMMON SETTING 3 CHILDREN', ast.common.children.setting3.children[0]);
  // console.log('GROUP1 CHILDREN BAZ', ast.group1);
  // console.log('GROUP2', ast.group2);
  // console.log('GROUP3', ast.group3);

  const formatter = getFormatter(format);
  const result = formatter(ast);

  console.log(result);
  return result;
}

export default genDiff;
