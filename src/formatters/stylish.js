/* eslint-disable max-len */
import { ORIGINS, ORIGINS_STYLISH_MARKS } from './constants.js';

function stylish(ast) {
  const space = ' ';
  const spacesCount = 2;

  const iter = (nextNode, depth) => {
    // return primitive value if it's exists. Also return array as is.
    if ('value' in nextNode && !nextNode.children) {
      return `${nextNode.value}`;
    }

    const children = nextNode.children ? nextNode.children : nextNode;
    const iterable = Object.entries(children);

    return iterable.reduce((acc, [key, val], idx, arr) => {
      const offset = space.repeat(spacesCount * depth);
      const offsetLast = space.repeat(spacesCount * depth - (spacesCount));
      let nextLine;

      if (val.origin === ORIGINS.bothdiff) {
        nextLine = val.values.map((raw, id, arrVals) => {
          const mark = ORIGINS_STYLISH_MARKS[raw.origin];
          const nl = id > 0 && id === arrVals.length - 1 ? '\n' : '';
          const childrs = typeof raw.value === 'object' && raw.value !== null && raw.value.children ? raw.value.children : null;
          return `${nl}${offset}${mark} ${raw.key}: ${childrs ? iter(childrs, depth + 2) : raw.value}`;
        }).join('');
      } else {
        const mark = ORIGINS_STYLISH_MARKS[val.origin];
        nextLine = `${offset}${mark} ${key}: ${iter(val, depth + 2)}`;
      }

      if (arr.length === 1) {
        return `{\n${nextLine}\n${offsetLast}}`;
      }

      if (idx === 0) { // first line
        return `{\n${nextLine}`;
      }
      if (idx === arr.length - 1) { // last line
        return `${acc}\n${nextLine}\n${offsetLast}}`;
      }
      return `${acc}\n${nextLine}`;
    }, '');
  };

  return iter(ast, 1);
}

export default stylish;
