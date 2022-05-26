import stylish from './stylish.js';
import plain from './plain.js';

function getFormatter(formatterType = 'stylish') {
  switch (formatterType) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    default:
      return stylish;
  }
}

export default getFormatter;
