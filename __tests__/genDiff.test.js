import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/gendiffFunction.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '../', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('Compare JSON files. Result in default format', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = readFile('resultStylishFormat.txt');
  const actual = genDiff(file1, file2);

  expect(actual).toEqual(expected);
});

test('Compare YAML files. Result in default format', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  const expected = readFile('resultStylishFormat.txt');
  const actual = genDiff(file1, file2);

  expect(actual).toBe(expected);
});

test('Compare JSON files. Result in plain format', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = readFile('resultPlainFormat.txt');
  const actual = genDiff(file1, file2, { format: 'plain' });

  expect(actual).toEqual(expected);
});
