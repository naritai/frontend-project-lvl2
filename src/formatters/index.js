import stylish from './stylish.js';
import plain from './plain.js';
import toJSON from './json.js';

function getFormatter(formatterType = 'stylish') {
  switch (formatterType) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    case 'json':
      return toJSON;
    default:
      return stylish;
  }
}

export default getFormatter;
