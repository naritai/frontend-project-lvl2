/* eslint-disable max-len */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
import { uniq, sortBy } from 'lodash-es';

export function isObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function bothObjectsHaveProp(prop, obj1, obj2) {
  return obj1.hasOwnProperty(prop) && obj2.hasOwnProperty(prop);
}

function bothValuesAreObjects(value1, value2) {
  return isObject(value1) && isObject(value2);
}

function createNode(name, origin, value, children) {
  return {
    key: name,
    origin,
    ...(!isObject(value) && { value }),
    ...(children && { children }),
  };
}

function buildDiffAST(obj1, obj2) {
  const iter = (currentAST, deepObj1, deepObj2) => {
    // SORT UNIQ KEYS IN ABC ORDER
    const allUniqKeys = uniq([...Object.keys(deepObj1), ...Object.keys(deepObj2)]);
    const allSortedKeys = sortBy(allUniqKeys);

    const subTree = {};

    allSortedKeys.forEach((key) => {
      const obj1Value = deepObj1[key];
      const obj2Value = deepObj2[key];

      if (bothObjectsHaveProp(key, deepObj1, deepObj2)) {
        if (bothValuesAreObjects(obj1Value, obj2Value)) {
          // RECURSIVE CALL
          subTree[key] = createNode(key, 'bothsame', obj1Value, buildDiffAST(obj1Value, obj2Value));
        } else if (obj1Value === obj2Value) {
          // BOTH VALUES SAME TYPES
          subTree[key] = createNode(key, 'bothsame', obj1Value);
        } else {
          // BOTH VALUES EXIST, BUT THEY ARE DIFFERENT TYPES
          subTree[key] = {
            key,
            origin: 'bothdiff',
            values: [
              {
                key,
                origin: 'first',
                value: isObject(obj1Value) ? createNode(key, 'first', obj1Value, buildDiffAST(obj1Value, {})) : obj1Value,
              },
              {
                key,
                origin: 'second',
                value: isObject(obj2Value) ? createNode(key, 'second', obj2Value, buildDiffAST(obj2Value, {})) : obj2Value,
              },
            ],
          };
        }
      } else if (deepObj1.hasOwnProperty(key)) { // ONLY FIRST OBJECT HAS NODE
        const origin = Object.keys(deepObj2).length ? 'first' : 'none';
        subTree[key] = isObject(obj1Value) ? createNode(key, origin, obj1Value, buildDiffAST(obj1Value, {})) : createNode(key, origin, obj1Value);
      } else if (deepObj2.hasOwnProperty(key)) { // ONLY SECOND OBJECT HAS NODE
        const origin = Object.keys(deepObj1).length ? 'second' : 'none';
        subTree[key] = isObject(obj2Value) ? createNode(key, origin, obj2Value, buildDiffAST(obj2Value, {})) : createNode(key, origin, obj2Value);
      }
    });

    return Object.assign(currentAST, subTree);
  };

  return iter({}, obj1, obj2);
}

export default buildDiffAST;
