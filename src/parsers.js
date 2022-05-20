import fs from 'fs';
import path from 'path';
import process from 'process';
import yaml from 'js-yaml';

function readFile(filePath) {
  return fs.readFileSync(filePath, { encoding: 'utf-8' });
}

function parseJSON(filePath) {
  return JSON.parse(readFile(filePath));
}

function parseYAML(filePath) {
  return yaml.load(readFile(filePath));
}

function parseFiles(path1, path2) {
  const resolvedPath1 = path.resolve(process.cwd(), path1);
  const resolvedPath2 = path.resolve(process.cwd(), path2);
  const paths = [resolvedPath1, resolvedPath2];

  const parsedData = paths.map((filePath) => {
    const ext = path.extname(filePath);

    if (ext === '.json') {
      return parseJSON(filePath);
    }
    if (ext === '.yml' || ext === '.yaml') {
      return parseYAML(filePath);
    }

    return path;
  });

  return parsedData;
}

export default parseFiles;
