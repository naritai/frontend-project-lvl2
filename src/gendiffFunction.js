/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
import { uniq, sortBy } from 'lodash-es';
import parseFiles from './parsers.js';
import getFormatter from './formatters.js';

function isObject(value) {
  return typeof value === 'object' && value !== null;
}

function bothObjectsHaveProp(prop, obj1, obj2) {
  return obj1.hasOwnProperty(prop) && obj2.hasOwnProperty(prop);
}

function bothValuesAreObjects(value1, value2) {
  return isObject(value1) && isObject(value2);
}

function createNode(value, origin, children) {
  return {
    ...(origin && { origin }),
    ...(!isObject(value) && { value }),
    ...(children && { children }),
  };
}

function buildDiffAST(obj1, obj2) {
  const iter = (currentAST, deepObj1, deepObj2) => {
    const allUniqKeys = uniq([...Object.keys(deepObj1), ...Object.keys(deepObj2)]);
    const allSortedKeys = sortBy(allUniqKeys);

    allSortedKeys.forEach((key) => {
      const obj1Value = deepObj1[key];
      const obj2Value = deepObj2[key];

      if (bothObjectsHaveProp(key, deepObj1, deepObj2)) {
        if (bothValuesAreObjects(obj1Value, obj2Value)) {
          // recursive call
          currentAST[key] = createNode(obj1Value, 'bothsame', buildDiffAST(obj1Value, obj2Value));
        } else if (obj1Value === obj2Value) {
          currentAST[key] = createNode(obj1Value, 'bothsame');
        } else {
          // BOTH VALUES EXIST, BUT THEY ARE DIFFERENT TYPES
          currentAST[key] = {
            origin: 'bothdiff',
            first: {},
            second: {},
          };
          if (isObject(obj1Value)) {
            // create AST recirsively for FIRST file
            currentAST[key].first = createNode(obj1Value, null, buildDiffAST(obj1Value, {}));
          } else {
            currentAST[key].first = createNode(obj1Value, null);
          }

          if (isObject(obj2Value)) {
            // create AST recirsively for SECOND file
            currentAST[key].second = createNode(obj2Value, null, buildDiffAST(obj2Value, {}));
          } else {
            currentAST[key].second = createNode(obj2Value, null);
          }
        }
      } else if (deepObj1.hasOwnProperty(key)) { // ONLY FIRST OBJECT HAS NODE
        const origin = Object.keys(deepObj2).length ? 'first' : 'none';
        if (isObject(obj1Value)) {
          // create AST recirsively for FIRST file
          currentAST[key] = createNode(obj1Value, origin, buildDiffAST(obj1Value, {}));
        } else {
          currentAST[key] = createNode(obj1Value, origin);
        }
      } else if (deepObj2.hasOwnProperty(key)) { // ONLY SECOND OBJECT HAS NODE
        const origin = Object.keys(deepObj1).length ? 'second' : 'none';
        if (isObject(obj2Value)) {
          // create AST recirsively for SECOND file
          currentAST[key] = createNode(obj2Value, origin, buildDiffAST(obj2Value, {}));
        } else {
          currentAST[key] = createNode(obj2Value, origin);
        }
      }
    });

    return currentAST;
  };

  return iter({}, obj1, obj2);
}

function genDiff(filepath1, filepath2, format = 'stylish') {
  const [parsedObj1, parsedObj2] = parseFiles(filepath1, filepath2);
  const ast = buildDiffAST(parsedObj1, parsedObj2);

  console.log('AST', ast.common.children.setting6.children.doge);
  const formatter = getFormatter(format);
  const result = formatter(ast);
  return result;
}

export default genDiff;
