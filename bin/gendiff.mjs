#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/gendiffFunction.js';

program
  .description('Compares two configuration files and shows a difference.');

program
  .option('-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((file1, file2, options) => {
    const { format } = options;
    const diff = genDiff(file1, file2, format);
    console.log(diff);
  });

program.parse();

export default genDiff;
