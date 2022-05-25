function stylish() {
  // const result = rows.reduce((acc, item, idx, arr) => {
  //   if (idx === 0) {
  //     acc += `{\n  ${item}`;
  //     return acc;
  //   }

  //   if (idx === arr.length - 1) {
  //     acc += `\n  ${item}\n}`;
  //     return acc;
  //   }

  //   acc += `\n  ${item}`;
  //   return acc;
  // }, '');
}

function getFormatter(formatterType = 'stylish') {
  switch (formatterType) {
    case 'stylish':
      return stylish;
    default:
      return stylish;
  }
}

export default getFormatter;
