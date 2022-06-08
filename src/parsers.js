import fs from 'fs';
import path from 'path';
import process from 'process';
import yaml from 'js-yaml';

function readFile(filePath) {
  const fullPath = path.resolve(process.cwd(), filePath);
  const data = fs.readFileSync(fullPath, { encoding: 'utf-8' }).toString();
  return data;
}

function parseJSON(data) {
  return JSON.parse(data);
}

function parseYAML(data) {
  return yaml.load(data);
}

function parseFile(filePath) {
  const data = readFile(filePath);
  const ext = path.extname(filePath);

  if (ext === '.json') {
    return parseJSON(data);
  }
  if (ext === '.yml' || ext === '.yaml') {
    return parseYAML(data);
  }
  return path;
}

export default parseFile;
