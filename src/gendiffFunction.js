/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
import { uniq, sortBy } from 'lodash-es';
import parseFiles from './parsers.js';

function genDiff(filepath1, filepath2) {
  const [parsedObj1, parsedObj2] = parseFiles(filepath1, filepath2);
  const allUniqKeys = uniq([...Object.keys(parsedObj1), ...Object.keys(parsedObj2)]);
  const allSortedKeys = sortBy(allUniqKeys);

  const rows = [];

  allSortedKeys.forEach((key) => {
    const obj1Value = parsedObj1[key];
    const obj2Value = parsedObj2[key];

    // prop exists in both objects
    if (parsedObj1.hasOwnProperty(key) && parsedObj2.hasOwnProperty(key)) {
      if (obj1Value === obj2Value) {
        rows.push(`  ${key}: ${obj1Value}`);
      } else {
        rows.push(`- ${key}: ${obj1Value}`);
        rows.push(`+ ${key}: ${obj2Value}`);
      }
    } else if (parsedObj1.hasOwnProperty(key)) {
      rows.push(`- ${key}: ${obj1Value}`);
    } else {
      rows.push(`+ ${key}: ${obj2Value}`);
    }
  });

  const result = rows.reduce((acc, item, idx, arr) => {
    if (idx === 0) {
      acc += `{\n  ${item}`;
      return acc;
    }

    if (idx === arr.length - 1) {
      acc += `\n  ${item}\n}`;
      return acc;
    }

    acc += `\n  ${item}`;
    return acc;
  }, '');

  return result;
}

export default genDiff;
