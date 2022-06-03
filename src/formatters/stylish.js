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

    const offset = space.repeat(spacesCount * depth);
    const offsetLast = space.repeat(spacesCount * depth - (spacesCount));

    const lines = iterable.map(([key, val]) => {
      if (val.origin === ORIGINS.bothdiff) {
        const line = val.values.map((raw) => {
          const mark = ORIGINS_STYLISH_MARKS[raw.origin];
          const childrs = typeof raw.value === 'object' && raw.value !== null && raw.value.children ? raw.value.children : null;
          return `${offset}${mark} ${raw.key}: ${childrs ? iter(childrs, depth + 2) : raw.value}`;
        }).join('\n');
        return line;
      }

      const mark = ORIGINS_STYLISH_MARKS[val.origin];
      return `${offset}${mark} ${key}: ${iter(val, depth + 2)}`;
    });

    return [
      '{',
      ...lines,
      `${offsetLast}}`,
    ].join('\n');
  };

  return iter(ast, 1);
}

export default stylish;
