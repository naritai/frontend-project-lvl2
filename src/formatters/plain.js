/* eslint-disable max-len */
import { ORIGINS } from './constants.js';

function getValueDescription(value) {
  const complex = typeof value === 'object' && value !== null;
  const str = typeof value === 'string';
  if (complex) {
    return '[complex value]';
  }
  return str ? `'${value}'` : value;
}

function plain(ast) {
  const iter = (nextNode, lines, prevKeys) => {
    // return primitive value if it's exists. Also return array as is.
    if ('value' in nextNode && !nextNode.children) {
      return `${nextNode.value}`;
    }

    const children = nextNode.children ? nextNode.children : nextNode;
    const iterable = Object.entries(children);

    return iterable.reduce((acc, [key, val]) => {
      const prefix = prevKeys ? `${prevKeys}.` : '';
      if (val.origin === ORIGINS.second) {
        const descr = getValueDescription(val.children ? val.children : val.value);
        return [...acc, `Property '${prefix}${key}' was added with value: ${descr}`];
      }
      if (val.origin === ORIGINS.first) {
        return [...acc, `Property '${prefix}${key}' was removed`];
      }

      if (val.origin === ORIGINS.bothdiff) {
        const { values } = val;
        const descr1 = getValueDescription(values[0].value);
        const descr2 = getValueDescription(values[1].value);
        return [...acc, `Property '${prefix}${key}' was updated. From ${descr1} to ${descr2}`];
      }

      if (val.origin === ORIGINS.bothsame && val.value) {
        return acc;
      }

      return iter(val.children, acc, `${prefix}${key}`);
    }, lines);
  };

  return iter(ast, [], '').join('\n');
}

export default plain;
