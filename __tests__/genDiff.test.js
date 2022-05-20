import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/gendiffFunction.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '../', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('genDiff compare files in JSON format', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = readFile('compareValidResult.txt');
  const actual = genDiff(file1, file2);

  expect(actual).toEqual(expected);
});

test('genDiff compare files in YAML format', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  const expected = readFile('compareValidResult.txt');
  const actual = genDiff(file1, file2);

  expect(actual).toBe(expected);
});

test('genDiff compare files in different formats', () => {
  const fileJSON = getFixturePath('file1.json');
  const fileYAML = getFixturePath('file2.yml');
  const expected = readFile('compareValidResult.txt');
  const actual = genDiff(fileJSON, fileYAML);

  expect(actual).toBe(expected);
});
